import { createWindow } from './windows.js';
import { wakeUpWebsims, or9Items, showcaseItems, certificateItems } from './program_data.js';

// --- LINK INVENTORY FEATURE ---
function normalize(url, base = location.href) {
  try {
    const u = new URL(url, base);
    u.hash = '';
    return u.toString();
  } catch { return null; }
}
function classify(u) {
  try {
    const h = new URL(u).host.toLowerCase();
    if (h.includes('websim.ai') || h.includes('websim.com')) return 'websim';
    return 'external';
  } catch { return 'external'; }
}

async function probeStatus(u) {
  // HEAD requests often get blocked by CORS. Try fetch; fall back to "unknown".
  try {
    const res = await fetch(u, { method:'HEAD', mode:'no-cors' });
    // no-cors masks status → treat as "unknown but reachable"
    return res.status || 'unknown';
  } catch {
    try {
      const r2 = await fetch(u, { method:'GET', mode:'no-cors' });
      return r2.status || 'unknown';
    } catch { return 'error'; }
  }
}

async function buildLinkInventory({ includeStatus = false } = {}) {
  const rows = [];

  // 1) from wakeUpWebsims
  if (Array.isArray(wakeUpWebsims)) {
    for (const item of wakeUpWebsims) {
      const u = normalize(item.url);
      if (!u) continue;
      rows.push({ source: 'WakeUpFolder', name: item.name, url: u, type: classify(u) });
    }
  }

  // 2) from other program maps
  const programMaps = [or9Items, showcaseItems, certificateItems];
  for (const programMap of programMaps) {
      for (const item of programMap) {
          if (item.url) {
            const u = normalize(item.url);
            if (!u) continue;
            rows.push({ source: 'ProgramData', name: item.name, url: u, type: classify(u) });
          }
      }
  }


  // 3) from any DOM anchors (e.g., your fake browser or future content)
  document.querySelectorAll('a[href]').forEach(a => {
    const u = normalize(a.getAttribute('href'));
    if (!u) return;
    rows.push({ source: 'DOM', name: (a.textContent||'').trim().slice(0,80), url: u, type: classify(u) });
  });

  // de-dupe by URL+name
  const dedup = Array.from(new Map(rows.map(r => [`${r.url}___${r.name}`, r])).values());

  // optional status probe (async)
  if (includeStatus) {
    await Promise.all(dedup.map(async r => { r.status = await probeStatus(r.url); }));
  }

  // sort: websim first, then external; alpha by name
  dedup.sort((a,b)=> (a.type===b.type ? (a.name||'').localeCompare(b.name||'') : (a.type==='websim'?-1:1)));
  return dedup;
}

function toCSV(arr) {
  const head = ['source','name','url','type','status'];
  const esc = s => `"${String(s??'').replace(/"/g,'""')}"`;
  return [head.join(','), ...arr.map(r => head.map(k => esc(r[k])).join(','))].join('\n');
}

export async function openLinkInventoryWindow() {
  const win = createWindow({
    title: 'Link Inventory',
    width: 680,
    height: 420,
    content: `
    <div style="height:100%;display:flex;flex-direction:column;">
      <div style="padding:6px;border-bottom:1px solid #848484;background:#c0c0c0;">
        <label style="font-size:11px;"><input type="checkbox" id="inv-status"> Probe HTTP status (slow)</label>
        <button id="inv-run" style="margin-left:6px;">Scan</button>
        <button id="inv-export" style="margin-left:6px;">Export CSV</button>
      </div>
      <div id="inv-body" style="flex:1;overflow:auto;background:#fff;font-size:11px;"></div>
    </div>
  `});

  const body = win.querySelector('#inv-body');
  const run  = win.querySelector('#inv-run');
  const exp  = win.querySelector('#inv-export');
  const chk  = win.querySelector('#inv-status');

  let data = [];

  function renderTable(rows) {
    if (!rows.length) { body.innerHTML = '<div style="padding:8px;">No links found.</div>'; return; }
    const rowsHtml = rows.map(r => `
      <tr>
        <td style="padding:4px;border-bottom:1px solid #eee;">${r.source}</td>
        <td style="padding:4px;border-bottom:1px solid #eee;">${r.name||''}</td>
        <td style="padding:4px;border-bottom:1px solid #eee;word-break:break-all;"><a href="${r.url}" target="_blank" rel="noopener">${r.url}</a></td>
        <td style="padding:4px;border-bottom:1px solid #eee;">${r.type}</td>
        <td style="padding:4px;border-bottom:1px solid #eee;">${r.status??''}</td>
      </tr>`).join('');
    body.innerHTML = `
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#f5f5f5;">
            <th style="text-align:left;padding:4px;">Source</th>
            <th style="text-align:left;padding:4px;">Name</th>
            <th style="text-align:left;padding:4px;">URL</th>
            <th style="text-align:left;padding:4px;">Type</th>
            <th style="text-align:left;padding:4px;">Status</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>`;
  }

  run.onclick = async () => {
    body.innerHTML = `<div style="padding:10px;">Scanning… <span class="loading"></span></div>`;
    data = await buildLinkInventory({ includeStatus: chk.checked });
    renderTable(data);
  };

  exp.onclick = () => {
    const csv = toCSV(data);
    const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'link_inventory.csv'; a.click();
    setTimeout(()=> URL.revokeObjectURL(url), 1000);
  };
}
