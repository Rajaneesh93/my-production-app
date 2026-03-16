// Your API Gateway URL (you'll update this after setup)
const API_BASE = '/api';

// Load server info and notes when page opens
window.onload = async () => {
  await loadServerInfo();
  await loadNotes();
};

async function loadServerInfo() {
  try {
    const res  = await fetch(`${API_BASE}/info`);
    const data = await res.json();

    document.getElementById('server-info').textContent =
      `AZ: ${data.az} | Instance: ${data.instanceId}`;

    document.getElementById('server-details').innerHTML = `
      <div class="info-row">
        <span>Instance ID</span>
        <span>${data.instanceId}</span>
      </div>
      <div class="info-row">
        <span>Availability Zone</span>
        <span><span class="badge">${data.az}</span></span>
      </div>
      <div class="info-row">
        <span>Region</span>
        <span>${data.region}</span>
      </div>
      <div class="info-row">
        <span>Status</span>
        <span><span class="badge">✅ Healthy</span></span>
      </div>
    `;
  } catch (e) {
    document.getElementById('server-details').textContent = 'Could not load server info';
  }
}

async function loadNotes() {
  try {
    const res   = await fetch(`${API_BASE}/notes`);
    const data  = await res.json();
    const list  = document.getElementById('notes-list');

    if (data.notes && data.notes.length > 0) {
      list.innerHTML = data.notes.map(n =>
        `<div class="note-item">📝 ${n.content} <small>(${n.date})</small></div>`
      ).join('');
    } else {
      list.innerHTML = '<p style="color:#888;font-size:14px;">No notes yet. Add one!</p>';
    }
  } catch (e) {
    document.getElementById('notes-list').textContent = 'Could not load notes';
  }
}

async function saveNote() {
  const input   = document.getElementById('note-input');
  const content = input.value.trim();
  if (!content) { alert('Please type something first!'); return; }

  try {
    await fetch(`${API_BASE}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    input.value = '';
    await loadNotes();
  } catch (e) {
    alert('Could not save note. Please try again.');
  }
}