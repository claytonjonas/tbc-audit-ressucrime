/**
 * Rezz Log — dashboard app
 * Handles file intake, aggregation and all rendering (stat cards, charts,
 * rank list, table). No build step, no server — pure browser JS.
 */

(() => {
  const CLASS_COLORS = {
    priest:  '#ffffff',
    paladin: '#f58cba',
    shaman:  '#0070de',
    druid:   '#ff7d0a',
    other:   '#4fb8a6',
  };

  let allEvents = [];       // full parsed dataset
  let loadedFiles = [];     // names of loaded files
  let sortState = { key: 'time', dir: 'asc' };
  let charts = {};          // Chart.js instances, so we can destroy on re-render

  // ---------- DOM refs ----------
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');
  const uploadSection = document.getElementById('uploadSection');
  const uploadError = document.getElementById('uploadError');
  const dashboard = document.getElementById('dashboard');
  const fileBadge = document.getElementById('fileBadge');
  const clearBtn = document.getElementById('clearBtn');
  const spellFilter = document.getElementById('spellFilter');
  const searchInput = document.getElementById('searchInput');
  const tableBody = document.getElementById('eventsTableBody');
  const tableCount = document.getElementById('tableCount');

  // ---------- File intake ----------
  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); }
  });
  ['dragenter', 'dragover'].forEach(evt =>
    dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.add('dragover'); })
  );
  ['dragleave', 'drop'].forEach(evt =>
    dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.remove('dragover'); })
  );
  dropzone.addEventListener('drop', (e) => {
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length) handleFiles(files);
  });
  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) handleFiles(files);
  });
  clearBtn.addEventListener('click', resetAll);

  function showError(msg) {
    uploadError.textContent = msg;
    uploadError.hidden = false;
  }

  function handleFiles(files) {
    uploadError.hidden = true;
    let pending = files.length;
    let newEvents = [];
    let anyOk = false;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const text = reader.result;
          const parsed = RezzParser.parse(text, file.name);
          newEvents = newEvents.concat(parsed);
          loadedFiles.push(file.name);
          anyOk = true;
        } catch (err) {
          console.error('Erro ao processar', file.name, err);
        } finally {
          pending--;
          if (pending === 0) finishLoad(newEvents, anyOk);
        }
      };
      reader.onerror = () => {
        pending--;
        if (pending === 0) finishLoad(newEvents, anyOk);
      };
      reader.readAsText(file);
    });
  }

  function finishLoad(newEvents, anyOk) {
    if (!anyOk) {
      showError('Não foi possível ler o arquivo. Confirme que é um combat log de texto (.txt) do WoW.');
      return;
    }
    allEvents = allEvents.concat(newEvents);
    if (allEvents.length === 0) {
      showError('Nenhum evento SPELL_RESURRECT encontrado nesse(s) arquivo(s). Confira se o log inclui ressurreições.');
      return;
    }
    render();
  }

  function resetAll() {
    allEvents = [];
    loadedFiles = [];
    fileInput.value = '';
    dashboard.hidden = true;
    fileBadge.hidden = true;
    clearBtn.hidden = true;
    uploadSection.hidden = false;
  }

  // ---------- Aggregation helpers ----------
  function countBy(arr, keyFn) {
    const map = new Map();
    for (const item of arr) {
      const k = keyFn(item);
      map.set(k, (map.get(k) || 0) + 1);
    }
    return map;
  }

  function topEntry(map) {
    let bestK = null, bestV = -1;
    for (const [k, v] of map) {
      if (v > bestV) { bestK = k; bestV = v; }
    }
    return bestK ? { key: bestK, count: bestV } : null;
  }

  // ---------- Render orchestration ----------
  function render() {
    uploadSection.hidden = true;
    dashboard.hidden = false;
    clearBtn.hidden = false;
    fileBadge.hidden = false;
    fileBadge.textContent = loadedFiles.length === 1
      ? loadedFiles[0]
      : `${loadedFiles.length} arquivos carregados`;

    renderStats();
    renderCasterChart();
    renderSpellChart();
    renderTargetRank();
    renderTimeline();
    populateSpellFilter();
    renderTable();
  }

  function renderStats() {
    const total = allEvents.length;
    const byCaster = countBy(allEvents, e => e.caster);
    const byTarget = countBy(allEvents, e => e.target);
    const uniqueCasters = byCaster.size;
    const topCaster = topEntry(byCaster);
    const topTarget = topEntry(byTarget);

    const stats = [
      { label: 'Ressurreições totais', value: total, sub: `${loadedFiles.length} arquivo${loadedFiles.length > 1 ? 's' : ''}` },
      { label: 'Curadores distintos', value: uniqueCasters, sub: 'lançaram ao menos 1x' },
      { label: 'Maior curador', value: topCaster ? topCaster.key : '—', sub: topCaster ? `${topCaster.count} ressurreições` : '' },
      { label: 'Mais ressuscitado', value: topTarget ? topTarget.key : '—', sub: topTarget ? `${topTarget.count} vezes` : '' },
    ];

    const row = document.getElementById('statRow');
    row.innerHTML = stats.map(s => `
      <div class="stat-tip">
        <p class="stat-tip-label">${escapeHtml(s.label)}</p>
        <p class="stat-tip-value">${escapeHtml(String(s.value))}</p>
        <p class="stat-tip-sub">${escapeHtml(s.sub)}</p>
      </div>
    `).join('');
  }

  function destroyChart(key) {
    if (charts[key]) { charts[key].destroy(); delete charts[key]; }
  }

  function renderCasterChart() {
    const byCaster = countBy(allEvents, e => e.caster);
    // color each caster bar by the class of the spell they used most
    const entries = Array.from(byCaster.entries()).sort((a, b) => b[1] - a[1]).slice(0, 12);

    const colorForCaster = (caster) => {
      const spellsOfCaster = allEvents.filter(e => e.caster === caster);
      const byToken = countBy(spellsOfCaster, e => e.classToken);
      const top = topEntry(byToken);
      return CLASS_COLORS[top ? top.key : 'other'];
    };

    destroyChart('caster');
    const ctx = document.getElementById('casterChart');
    charts.caster = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: entries.map(([name]) => name),
        datasets: [{
          data: entries.map(([, count]) => count),
          backgroundColor: entries.map(([name]) => colorForCaster(name)),
          borderRadius: 4,
          maxBarThickness: 28,
        }],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: {
          label: (ctx) => ` ${ctx.parsed.x} ressurreições`
        } } },
        scales: {
          x: { beginAtZero: true, ticks: { precision: 0, color: '#a89d89' }, grid: { color: 'rgba(255,255,255,0.05)' } },
          y: { ticks: { color: '#ede6d6', font: { size: 12 } }, grid: { display: false } },
        },
      },
    });
  }

  function renderSpellChart() {
    const bySpell = countBy(allEvents, e => e.spell);
    const entries = Array.from(bySpell.entries()).sort((a, b) => b[1] - a[1]);

    const colorForSpell = (spellName) => {
      const info = RezzParser.classInfoFor(spellName);
      return CLASS_COLORS[info.token];
    };

    destroyChart('spell');
    const ctx = document.getElementById('spellChart');
    charts.spell = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: entries.map(([name]) => name),
        datasets: [{
          data: entries.map(([, count]) => count),
          backgroundColor: entries.map(([name]) => colorForSpell(name)),
          borderColor: '#1e1812',
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: {
          legend: { position: 'bottom', labels: { color: '#a89d89', font: { size: 11.5 }, boxWidth: 10, padding: 12 } },
          tooltip: { callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed}` } },
        },
      },
    });
  }

  function renderTargetRank() {
    const byTarget = countBy(allEvents, e => e.target);
    const entries = Array.from(byTarget.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const max = entries.length ? entries[0][1] : 1;

    const list = document.getElementById('targetList');
    list.innerHTML = entries.map(([name, count], i) => `
      <div class="rank-row">
        <span class="rank-num">${i + 1}</span>
        <span class="rank-name" title="${escapeHtml(name)}">${escapeHtml(name)}</span>
        <span class="rank-bar-track"><span class="rank-bar-fill" style="width:${(count / max) * 100}%"></span></span>
        <span class="rank-count">${count}</span>
      </div>
    `).join('') || '<p class="panel-sub">Sem dados.</p>';
  }

  function renderTimeline() {
    // Bucket events by minute (HH:MM) across the whole dataset, in order encountered.
    const buckets = new Map();
    for (const e of allEvents) {
      const minuteKey = (e.time || '').slice(0, 5); // HH:MM
      buckets.set(minuteKey, (buckets.get(minuteKey) || 0) + 1);
    }
    const labels = Array.from(buckets.keys()).sort();
    const data = labels.map(l => buckets.get(l));

    destroyChart('timeline');
    const ctx = document.getElementById('timelineChart');
    charts.timeline = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data,
          borderColor: '#7fd9c9',
          backgroundColor: 'rgba(79,184,166,0.15)',
          fill: true,
          tension: 0.35,
          pointRadius: 2,
          pointBackgroundColor: '#7fd9c9',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#a89d89', maxTicksLimit: 8, font: { size: 10.5 } }, grid: { display: false } },
          y: { beginAtZero: true, ticks: { precision: 0, color: '#a89d89' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        },
      },
    });
  }

  function populateSpellFilter() {
    const spells = Array.from(new Set(allEvents.map(e => e.spell))).sort();
    spellFilter.innerHTML = '<option value="">Todas as skills</option>' +
      spells.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
  }

  function getFilteredSortedEvents() {
    const spellVal = spellFilter.value;
    const searchVal = searchInput.value.trim().toLowerCase();

    let rows = allEvents.filter(e => {
      if (spellVal && e.spell !== spellVal) return false;
      if (searchVal) {
        const hay = `${e.caster} ${e.target}`.toLowerCase();
        if (!hay.includes(searchVal)) return false;
      }
      return true;
    });

    rows = rows.slice().sort((a, b) => {
      let av, bv;
      switch (sortState.key) {
        case 'spell':  av = a.spell; bv = b.spell; break;
        case 'caster': av = a.caster; bv = b.caster; break;
        case 'target': av = a.target; bv = b.target; break;
        case 'log':    av = a.log; bv = b.log; break;
        default:       av = a.sortKey; bv = b.sortKey;
      }
      if (av < bv) return sortState.dir === 'asc' ? -1 : 1;
      if (av > bv) return sortState.dir === 'asc' ? 1 : -1;
      return 0;
    });

    return rows;
  }

  function renderTable() {
    const rows = getFilteredSortedEvents();
    tableCount.textContent = `${rows.length} de ${allEvents.length} evento${allEvents.length === 1 ? '' : 's'}`;

    tableBody.innerHTML = rows.map(e => {
      const color = CLASS_COLORS[e.classToken];
      return `
        <tr>
          <td class="td-time">${escapeHtml(e.time)}</td>
          <td><span class="spell-pill" style="color:${color}"><span class="spell-dot"></span>${escapeHtml(e.spell)}</span></td>
          <td>${escapeHtml(e.caster)}</td>
          <td>${escapeHtml(e.target)}</td>
          <td class="td-log">${escapeHtml(e.log)}</td>
        </tr>
      `;
    }).join('') || `<tr><td colspan="5" class="panel-sub" style="padding:20px 22px;">Nenhum evento encontrado com esses filtros.</td></tr>`;
  }

  spellFilter.addEventListener('change', renderTable);
  searchInput.addEventListener('input', renderTable);

  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      if (sortState.key === key) {
        sortState.dir = sortState.dir === 'asc' ? 'desc' : 'asc';
      } else {
        sortState = { key, dir: 'asc' };
      }
      renderTable();
    });
  });

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
