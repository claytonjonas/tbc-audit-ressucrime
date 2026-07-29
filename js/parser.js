/**
 * Rezz Log — combat log parser
 *
 * Parses WoW combat log lines and extracts SPELL_RESURRECT events.
 * Works with any resurrection spell (Redemption, Rebirth, Ancestral Spirit,
 * Resurrection, Mass Resurrection, etc.) since it doesn't hardcode names —
 * it reads whatever spell name appears on the SPELL_RESURRECT line.
 *
 * Everything here runs entirely client-side. No log content ever leaves
 * the browser.
 */

const RezzParser = (() => {

  // Map known resurrection spells to their class, for color-coding.
  // Anything not in this table still works fine — it just falls back
  // to a neutral "other" color.
  const SPELL_CLASS_MAP = {
    'Resurrection':        { class: 'Sacerdote',   token: 'priest'  },
    'Mass Resurrection':   { class: 'Sacerdote',   token: 'priest'  },
    'Redemption':          { class: 'Paladino',    token: 'paladin' },
    'Ancestral Spirit':    { class: 'Xamã',         token: 'shaman'  },
    'Rebirth':             { class: 'Druida',      token: 'druid'   },
  };

  function classInfoFor(spellName) {
    return SPELL_CLASS_MAP[spellName] || { class: 'Outra', token: 'other' };
  }

  // Splits a comma-separated combat log field list while respecting
  // double-quoted strings (names can't contain commas in WoW logs, but
  // we stay defensive anyway).
  function splitCsvFields(str) {
    const fields = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        fields.push(cur);
        cur = '';
      } else {
        cur += ch;
      }
    }
    fields.push(cur);
    return fields.map(f => f.trim().replace(/^"|"$/g, ''));
  }

  // Strips the realm suffix WoW appends to names, e.g. "Kaezar-Dreamscythe-US" -> "Kaezar"
  function shortName(fullName) {
    if (!fullName) return fullName;
    const idx = fullName.indexOf('-');
    return idx === -1 ? fullName : fullName.slice(0, idx);
  }

  const LINE_RE = /^(\d{1,2}\/\d{1,2}\/\d{4})\s+([\d:.]+(?:-\d+)?)\s+([A-Z_]+),(.*)$/;

  /**
   * Parses raw combat log text and returns an array of resurrection events.
   * @param {string} text - raw file contents
   * @param {string} logLabel - short label identifying which uploaded file this came from
   * @returns {Array<object>}
   */
  function parse(text, logLabel) {
    const events = [];
    const lines = text.split(/\r?\n/);

    for (const line of lines) {
      if (!line || line.indexOf('SPELL_RESURRECT') === -1) continue;

      const m = LINE_RE.exec(line);
      if (!m) continue;

      const [, dateStr, timeStr, eventType, rest] = m;
      if (eventType !== 'SPELL_RESURRECT') continue;

      const f = splitCsvFields(rest);
      // f[0]=sourceGUID f[1]=sourceName f[2]=sourceFlags f[3]=sourceRaidFlags
      // f[4]=destGUID   f[5]=destName   f[6]=destFlags   f[7]=destRaidFlags
      // f[8]=spellId    f[9]=spellName  f[10]=spellSchool
      if (f.length < 10) continue;

      const sourceName = f[1];
      const destName = f[5];
      const spellName = f[9];
      if (!sourceName || !destName || !spellName) continue;

      const cls = classInfoFor(spellName);

      events.push({
        date: dateStr,
        time: timeStr,
        // sortable timestamp: combine date + time, drop the trailing offset (-3)
        sortKey: `${dateStr} ${timeStr}`.replace(/-\d+$/, ''),
        spell: spellName,
        spellClass: cls.class,
        classToken: cls.token,
        caster: shortName(sourceName),
        casterFull: sourceName,
        target: shortName(destName),
        targetFull: destName,
        log: logLabel,
      });
    }

    return events;
  }

  return { parse, classInfoFor, shortName };
})();
