/* ==========================================================================
   Rezz Log — design tokens
   Palette: obsidian/bronze base, muted quest-gold accent, spirit-teal accent,
   real WoW class colors used as data (Priest/Paladin/Shaman/Druid), because
   the class of the caster IS the information — not decoration.
   Type: Cinzel (display, medieval-carved) + Inter (body) + JetBrains Mono (data)
   ========================================================================== */

:root {
  --bg:            #14100c;
  --bg-elevated:   #1c1610;
  --panel:         #1e1812;
  --panel-border:  #3a2f1f;
  --gold:          #c9a227;
  --gold-bright:   #e8c65a;
  --spirit:        #4fb8a6;
  --spirit-bright: #7fd9c9;
  --text:          #ede6d6;
  --text-muted:    #a89d89;
  --text-faint:    #6f6656;
  --danger:        #c1502e;

  /* WoW class colors — used to encode caster class by spell */
  --c-priest:   #ffffff;
  --c-paladin:  #f58cba;
  --c-shaman:   #0070de;
  --c-druid:    #ff7d0a;
  --c-other:    var(--spirit);

  --radius-sm: 4px;
  --radius-md: 8px;
  --shadow-panel: 0 1px 0 rgba(255,255,255,0.03) inset, 0 8px 24px rgba(0,0,0,0.35);

  --font-display: 'Cinzel', serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', monospace;
}

* { box-sizing: border-box; }

html { -webkit-font-smoothing: antialiased; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

::selection { background: var(--gold); color: #1a1409; }

:focus-visible {
  outline: 2px solid var(--spirit-bright);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}

/* Ambient background: faint radial glow + engraved rune texture */
.bg-runes {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 18% 8%, rgba(79,184,166,0.10), transparent 40%),
    radial-gradient(circle at 85% 30%, rgba(201,162,39,0.08), transparent 45%),
    repeating-linear-gradient(115deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 90px);
}

main { position: relative; z-index: 1; }

/* ============ Header ============ */
.site-header {
  border-bottom: 1px solid var(--panel-border);
  background: linear-gradient(180deg, rgba(30,24,18,0.9), rgba(20,16,12,0.4));
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(8px);
}
.header-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 18px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand { display: flex; align-items: center; gap: 14px; }
.brand-glyph {
  font-size: 26px;
  color: var(--spirit-bright);
  text-shadow: 0 0 14px rgba(127,217,201,0.5);
}
.brand-text h1 {
  font-family: var(--font-display);
  font-size: 21px;
  font-weight: 600;
  letter-spacing: 0.02em;
  margin: 0;
  color: var(--gold-bright);
}
.brand-sub {
  margin: 2px 0 0;
  font-size: 12.5px;
  color: var(--text-muted);
}
.header-actions { display: flex; align-items: center; gap: 12px; }
.file-badge {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--spirit-bright);
  background: rgba(79,184,166,0.1);
  border: 1px solid rgba(79,184,166,0.3);
  padding: 5px 10px;
  border-radius: var(--radius-sm);
}

.btn {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--panel-border);
  background: var(--bg-elevated);
  color: var(--text);
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease;
}
.btn:hover { border-color: var(--gold); color: var(--gold-bright); }
.btn-ghost { background: transparent; }

/* ============ Upload / empty state ============ */
.upload-section {
  max-width: 720px;
  margin: 9vh auto 0;
  padding: 0 24px 60px;
  text-align: center;
}
.upload-inner { display: flex; flex-direction: column; align-items: center; gap: 22px; }

.soulwell {
  width: 100%;
  max-width: 480px;
  padding: 52px 32px;
  border: 1.5px dashed var(--panel-border);
  border-radius: var(--radius-md);
  background: radial-gradient(circle at 50% 20%, rgba(79,184,166,0.07), transparent 60%), var(--panel);
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}
.soulwell:hover, .soulwell:focus-visible, .soulwell.dragover {
  border-color: var(--spirit);
  box-shadow: 0 0 0 1px rgba(79,184,166,0.15), 0 20px 50px rgba(79,184,166,0.08);
  transform: translateY(-2px);
}
.soulwell-ring {
  width: 64px; height: 64px;
  margin: 0 auto 18px;
  border-radius: 50%;
  border: 1.5px solid var(--spirit);
  display: flex; align-items: center; justify-content: center;
  animation: pulse-ring 2.8s ease-in-out infinite;
}
@keyframes pulse-ring {
  0%, 100% { box-shadow: 0 0 0 0 rgba(79,184,166,0.35); }
  50% { box-shadow: 0 0 0 10px rgba(79,184,166,0); }
}
.soulwell-icon { font-size: 24px; color: var(--spirit-bright); }
.soulwell-title {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--text);
  margin: 0 0 6px;
}
.soulwell-sub { margin: 0; font-size: 13px; color: var(--text-muted); }

.upload-hint {
  font-size: 12.5px;
  color: var(--text-faint);
  max-width: 440px;
  line-height: 1.6;
}
.upload-hint strong { color: var(--text-muted); }

.upload-error {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--danger);
  background: rgba(193,80,46,0.1);
  border: 1px solid rgba(193,80,46,0.35);
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  max-width: 480px;
}

/* ============ Dashboard layout ============ */
.dashboard {
  max-width: 1180px;
  margin: 0 auto;
  padding: 32px 28px 80px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
}
@media (max-width: 860px) {
  .grid-2col { grid-template-columns: 1fr; }
}

/* ---- Stat "tooltip" cards — a direct quotation of the in-game item tooltip,
   the signature element for this piece: real spell-tooltip chrome used to
   surface real numbers. ---- */
.stat-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
@media (max-width: 860px) { .stat-row { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .stat-row { grid-template-columns: 1fr; } }

.stat-tip {
  background: linear-gradient(180deg, var(--bg-elevated), var(--panel));
  border: 1px solid var(--panel-border);
  border-top: 1px solid #4a3c26;
  border-radius: var(--radius-sm);
  padding: 16px 18px;
  box-shadow: var(--shadow-panel);
  position: relative;
}
.stat-tip::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--radius-sm);
  padding: 1px;
  background: linear-gradient(160deg, rgba(201,162,39,0.35), transparent 40%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
.stat-tip-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-faint);
  margin: 0 0 8px;
}
.stat-tip-value {
  font-family: var(--font-display);
  font-size: 28px;
  color: var(--gold-bright);
  margin: 0;
  line-height: 1;
}
.stat-tip-sub {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--spirit-bright);
  margin: 8px 0 0;
}

/* ---- Panels ---- */
.panel {
  background: var(--panel);
  border: 1px solid var(--panel-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-panel);
  padding: 20px 22px 22px;
}
.panel-head {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--panel-border);
}
.panel-head h2 {
  font-family: var(--font-display);
  font-size: 15.5px;
  font-weight: 600;
  color: var(--text);
  margin: 0;
  letter-spacing: 0.01em;
}
.panel-sub { font-size: 12px; color: var(--text-faint); }

.chart-wrap { position: relative; height: 260px; }
.chart-wrap--donut { height: 260px; }
.chart-wrap--timeline { height: 260px; }

/* ---- Rank list (most resurrected) ---- */
.rank-list { display: flex; flex-direction: column; gap: 10px; }
.rank-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.rank-num {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-faint);
  width: 18px;
  flex-shrink: 0;
}
.rank-name {
  font-size: 13.5px;
  font-weight: 600;
  width: 140px;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rank-bar-track {
  flex: 1;
  height: 8px;
  background: var(--bg-elevated);
  border-radius: 4px;
  overflow: hidden;
}
.rank-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--spirit), var(--spirit-bright));
  border-radius: 4px;
}
.rank-count {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--text-muted);
  width: 22px;
  text-align: right;
  flex-shrink: 0;
}

/* ---- Table panel ---- */
.panel-table { padding: 20px 0 4px; }
.panel-table .panel-head { padding: 0 22px 12px; }
.panel-head--table {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}
.table-controls { display: flex; gap: 10px; flex-wrap: wrap; }

.select, .search-input {
  font-family: var(--font-body);
  font-size: 12.5px;
  background: var(--bg-elevated);
  border: 1px solid var(--panel-border);
  color: var(--text);
  padding: 7px 10px;
  border-radius: var(--radius-sm);
}
.select:focus, .search-input:focus { border-color: var(--spirit); }
.search-input { width: 180px; }

.table-scroll { overflow-x: auto; max-height: 480px; overflow-y: auto; }

table { width: 100%; border-collapse: collapse; font-size: 13px; }
thead th {
  position: sticky;
  top: 0;
  background: var(--bg-elevated);
  text-align: left;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-faint);
  padding: 10px 22px;
  border-bottom: 1px solid var(--panel-border);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}
thead th:hover { color: var(--gold); }
tbody td {
  padding: 9px 22px;
  border-bottom: 1px solid rgba(58,47,31,0.5);
  white-space: nowrap;
}
tbody tr:hover { background: rgba(79,184,166,0.05); }
.td-time { font-family: var(--font-mono); color: var(--text-faint); font-size: 12px; }
.td-log { font-family: var(--font-mono); color: var(--text-faint); font-size: 11.5px; }

.spell-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 9px 3px 7px;
  border-radius: 20px;
  border: 1px solid currentColor;
  background: color-mix(in srgb, currentColor 12%, transparent);
}
.spell-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex-shrink: 0; }

/* ============ Footer ============ */
.site-footer {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 30px 20px 40px;
  font-size: 11.5px;
  color: var(--text-faint);
  border-top: 1px solid var(--panel-border);
}
