@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
  --bg: #120f0c;
  --panel: #1e1812;
  --panel-2: #241d16;
  --line: rgba(255,255,255,.08);
  --text: #ede6d6;
  --muted: #a89d89;
  --accent: #7fd9c9;
  --accent-dark: #4fb8a6;
  --gold: #d8b66a;
  --danger: #df7777;
}

* { box-sizing: border-box; }

html, body { margin: 0; min-height: 100%; }

body {
  background:
    radial-gradient(circle at 50% -10%, rgba(127,217,201,.08), transparent 35%),
    linear-gradient(180deg, #17120e 0%, var(--bg) 100%);
  color: var(--text);
  font-family: Inter, sans-serif;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: .035;
  background-image:
    linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px);
  background-size: 42px 42px;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 5;
  border-bottom: 1px solid var(--line);
  background: rgba(18,15,12,.92);
  backdrop-filter: blur(12px);
}

.header-inner {
  width: min(1180px, calc(100% - 32px));
  margin: auto;
  min-height: 74px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.brand { display: flex; align-items: center; gap: 14px; }
.brand-glyph { font-size: 28px; color: var(--accent); }
.brand-text h1 {
  margin: 0;
  font: 700 22px Cinzel, serif;
  letter-spacing: .04em;
}
.brand-sub {
  margin: 2px 0 0;
  color: var(--muted);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .12em;
}

.header-actions { display: flex; align-items: center; gap: 10px; }

.file-badge {
  max-width: 340px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 7px 10px;
  border: 1px solid var(--line);
  border-radius: 7px;
  color: var(--muted);
  font: 11px "JetBrains Mono", monospace;
}

.btn {
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text);
  border-radius: 7px;
  padding: 8px 13px;
  cursor: pointer;
}
.btn:hover { border-color: var(--accent-dark); color: var(--accent); }

main {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
}

.upload-section { min-height: calc(100vh - 150px); display: grid; place-items: center; }
.upload-inner { width: min(650px, 100%); text-align: center; }

.soulwell {
  position: relative;
  min-height: 310px;
  display: grid;
  place-content: center;
  border: 1px dashed rgba(127,217,201,.3);
  border-radius: 18px;
  background: rgba(30,24,18,.72);
  cursor: pointer;
  overflow: hidden;
  transition: .2s ease;
}
.soulwell:hover, .soulwell.dragover {
  border-color: var(--accent);
  background: rgba(79,184,166,.06);
  transform: translateY(-2px);
}

.soulwell-ring {
  position: absolute;
  width: 180px; height: 180px;
  left: 50%; top: 50%;
  transform: translate(-50%, -58%);
  border: 1px solid rgba(127,217,201,.2);
  border-radius: 50%;
  box-shadow: 0 0 70px rgba(79,184,166,.1);
}
.soulwell-core {
  position: relative;
  width: 76px; height: 76px;
  margin: 0 auto 22px;
  display: grid; place-items: center;
  border: 1px solid rgba(127,217,201,.45);
  border-radius: 50%;
  background: #18140f;
}
.soulwell-icon { color: var(--accent); font-size: 26px; }
.soulwell-title {
  margin: 0;
  font: 600 22px Cinzel, serif;
}
.soulwell-sub { margin: 8px 0 0; color: var(--muted); font-size: 13px; }
.upload-hint { color: var(--muted); font-size: 12px; line-height: 1.6; }
.upload-error {
  margin-top: 14px;
  padding: 11px;
  border: 1px solid rgba(223,119,119,.35);
  border-radius: 7px;
  color: var(--danger);
  background: rgba(223,119,119,.06);
}

.dashboard { padding: 28px 0 50px; }
.stat-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 14px;
}
.stat-tip, .panel {
  border: 1px solid var(--line);
  border-radius: 10px;
  background: linear-gradient(145deg, rgba(36,29,22,.95), rgba(25,20,16,.95));
}
.stat-tip { padding: 16px; }
.stat-tip-label, .stat-tip-sub { margin: 0; color: var(--muted); font-size: 11px; }
.stat-tip-value {
  margin: 6px 0 4px;
  font: 600 22px "JetBrains Mono", monospace;
  color: var(--text);
  overflow: hidden;
  text-overflow: ellipsis;
}
.grid-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }

.panel { min-width: 0; padding: 18px; }
.panel-head { margin-bottom: 14px; }
.panel-head--table {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 16px;
}
.panel h2 {
  margin: 0;
  font: 600 16px Cinzel, serif;
}
.panel-sub { display: block; margin-top: 4px; color: var(--muted); font-size: 11px; }

.chart-wrap { height: 300px; position: relative; }
.chart-wrap--donut { height: 300px; }
.chart-wrap--timeline { height: 250px; }

.rank-list { display: grid; gap: 10px; }
.rank-row {
  display: grid;
  grid-template-columns: 26px minmax(80px, 130px) 1fr 32px;
  align-items: center;
  gap: 8px;
}
.rank-num { color: var(--gold); font: 12px "JetBrains Mono", monospace; }
.rank-name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 12px; }
.rank-bar-track { height: 7px; border-radius: 99px; background: rgba(255,255,255,.06); overflow: hidden; }
.rank-bar-fill { display: block; height: 100%; background: var(--accent-dark); border-radius: inherit; }
.rank-count { text-align: right; font: 11px "JetBrains Mono", monospace; color: var(--muted); }

.table-controls { display: flex; gap: 8px; }
.select, .search-input {
  min-height: 34px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: #15110e;
  color: var(--text);
  padding: 7px 9px;
  outline: none;
}
.search-input { width: 190px; }
.select:focus, .search-input:focus { border-color: var(--accent-dark); }

.table-scroll { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 12px; }
th {
  padding: 10px;
  text-align: left;
  color: var(--muted);
  border-bottom: 1px solid var(--line);
  cursor: pointer;
  white-space: nowrap;
}
td { padding: 10px; border-bottom: 1px solid rgba(255,255,255,.045); }
tr:hover td { background: rgba(255,255,255,.018); }
.td-time, .td-log { font-family: "JetBrains Mono", monospace; color: var(--muted); font-size: 10px; }
.td-log { max-width: 260px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.spell-pill { display: inline-flex; align-items: center; gap: 6px; }
.spell-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

.site-footer {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 20px 0 28px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  text-align: center;
  font-size: 10px;
}

@media (max-width: 800px) {
  .stat-row { grid-template-columns: repeat(2, 1fr); }
  .grid-2col { grid-template-columns: 1fr; }
  .panel-head--table { align-items: stretch; flex-direction: column; }
  .table-controls { flex-wrap: wrap; }
  .search-input { flex: 1; }
}

@media (max-width: 500px) {
  .header-inner { min-height: 64px; }
  .brand-sub { display: none; }
  .stat-row { grid-template-columns: 1fr; }
  .rank-row { grid-template-columns: 24px 100px 1fr 28px; }
}
