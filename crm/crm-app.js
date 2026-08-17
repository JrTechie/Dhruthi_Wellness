// Dhruthi Wellness Dietitian CRM Frontend Application Engine

let state = {
  activePage: 'dashboard',
  leadViewMode: 'kanban',
  leads: [],
  clients: [],
  followups: [],
  consultations: [],
  payments: [],
  metrics: null,
  selectedClient: null,
  selectedLead: null
};

// Initialize App on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupKeyboardShortcuts();
  loadAllData();
});

// Navigation Handling
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = item.getAttribute('data-target');
      switchPage(target);
    });
  });
}

function switchPage(pageId) {
  state.activePage = pageId;
  
  // Update sidebar active link
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const activeNav = document.querySelector(`.nav-item[data-target="${pageId}"]`);
  if (activeNav) activeNav.classList.add('active');

  // Update page views
  document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
  const targetView = document.getElementById(`page-${pageId}`);
  if (targetView) targetView.classList.add('active');

  // Load section-specific data
  if (pageId === 'dashboard') loadDashboard();
  else if (pageId === 'leads') loadLeads();
  else if (pageId === 'clients') loadClients();
  else if (pageId === 'today') loadFollowups();
  else if (pageId === 'consultations') loadConsultations();
  else if (pageId === 'payments') loadPayments();
  else if (pageId === 'templates') renderTemplates();
}

// Global Keyboard Shortcuts (Cmd+K)
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      toggleSearchModal(true);
    }
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

// Data Fetching & Sync
async function loadAllData() {
  await Promise.all([
    loadDashboard(),
    loadLeads(),
    loadClients(),
    loadFollowups(),
    loadPayments()
  ]);
}

// 1. Dashboard Logic
async function loadDashboard() {
  try {
    const res = await fetch('/api/crm/dashboard');
    const data = await res.json();
    state.metrics = data;

    document.getElementById('stat-new-leads').innerText = data.newLeadsToday || 0;
    document.getElementById('stat-hot-leads').innerText = data.hotLeads || 0;
    document.getElementById('stat-followups-due').innerText = data.followupsDue || 0;
    document.getElementById('stat-active-clients').innerText = data.activeClients || 0;
    document.getElementById('stat-total-revenue').innerText = `₹${(data.totalRevenue || 0).toLocaleString()}`;
    document.getElementById('nav-hot-badge').innerText = data.hotLeads || 0;

    // Render Operational Priorities
    const priorityContainer = document.getElementById('dashboard-priority-list');
    if (data.priorities && data.priorities.length > 0) {
      priorityContainer.innerHTML = data.priorities.map(p => `
        <div class="priority-item">
          <div class="priority-text">${p.title}</div>
          <button class="btn btn-sm btn-outline" style="color:white; border-color:white;" onclick="switchPage('${p.action.replace('/crm#', '')}')">Take Action</button>
        </div>
      `).join('');
    } else {
      priorityContainer.innerHTML = `
        <div class="priority-item">
          <div class="priority-text">✨ All follow-ups and inquiries are up to date! Great job.</div>
        </div>
      `;
    }
  } catch (e) {
    console.error('Error loading dashboard metrics:', e);
  }
}

// 2. Leads Logic
async function loadLeads() {
  try {
    const res = await fetch('/api/crm/leads');
    const leads = await res.json();
    state.leads = leads;

    renderLeadsKanban();
    renderLeadsTable();
    renderDashboardRecentLeads();
  } catch (e) {
    console.error('Error loading leads:', e);
  }
}

function setLeadViewMode(mode) {
  state.leadViewMode = mode;
  const kanban = document.getElementById('leads-kanban-view');
  const table = document.getElementById('leads-table-view');

  if (mode === 'kanban') {
    kanban.style.display = 'flex';
    table.style.display = 'none';
  } else {
    kanban.style.display = 'none';
    table.style.display = 'block';
  }
}

function renderLeadsKanban() {
  const cols = {
    'New': document.getElementById('cards-col-new'),
    'Contacted': document.getElementById('cards-col-contacted'),
    'Consultation Booked': document.getElementById('cards-col-booked'),
    'Payment Pending': document.getElementById('cards-col-pending'),
    'Converted': document.getElementById('cards-col-converted')
  };

  const counts = { 'New': 0, 'Contacted': 0, 'Consultation Booked': 0, 'Payment Pending': 0, 'Converted': 0 };

  // Clear existing cards
  Object.values(cols).forEach(c => c ? c.innerHTML = '' : null);

  state.leads.forEach(lead => {
    const statusKey = lead.status === 'Qualified' ? 'Contacted' : (cols[lead.status] ? lead.status : 'New');
    if (counts[statusKey] !== undefined) counts[statusKey]++;

    const card = document.createElement('div');
    card.className = 'lead-card';
    card.onclick = () => openLeadDetail(lead.id);

    const tempClass = `temp-${(lead.temperature || 'cold').toLowerCase()}`;

    card.innerHTML = `
      <div class="lead-card-header">
        <div class="lead-name">${escapeHtml(lead.name)}</div>
        <span class="temp-badge ${tempClass}">${lead.temperature}</span>
      </div>
      <div class="lead-goal"><i class="ri-heart-line"></i> ${escapeHtml(lead.goal || 'Wellness Goal')}</div>
      <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-muted);">
        <span><i class="ri-price-tag-3-line"></i> ${escapeHtml(lead.source)}</span>
        <span style="font-weight:700; color:var(--primary);">Score ${lead.score}</span>
      </div>
    `;

    if (cols[statusKey]) {
      cols[statusKey].appendChild(card);
    }
  });

  document.getElementById('count-col-new').innerText = counts['New'];
  document.getElementById('count-col-contacted').innerText = counts['Contacted'];
  document.getElementById('count-col-booked').innerText = counts['Consultation Booked'];
  document.getElementById('count-col-pending').innerText = counts['Payment Pending'];
  document.getElementById('count-col-converted').innerText = counts['Converted'];
}

function renderLeadsTable() {
  const tbody = document.getElementById('leads-table-body');
  if (!tbody) return;

  tbody.innerHTML = state.leads.map(lead => `
    <tr onclick="openLeadDetail(${lead.id})" style="cursor:pointer;">
      <td><b>${escapeHtml(lead.name)}</b></td>
      <td>${escapeHtml(lead.phone)}<br><span style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(lead.email || '')}</span></td>
      <td>${escapeHtml(lead.goal)}</td>
      <td>${escapeHtml(lead.source)}</td>
      <td><b style="color:var(--primary);">${lead.score}</b>/100</td>
      <td><span class="temp-badge temp-${(lead.temperature || 'cold').toLowerCase()}">${lead.temperature}</span></td>
      <td><b>${lead.status}</b></td>
      <td>
        <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); convertLead(${lead.id})">Convert to Client</button>
      </td>
    </tr>
  `).join('');
}

function renderDashboardRecentLeads() {
  const tbody = document.getElementById('dashboard-recent-leads-body');
  if (!tbody) return;

  tbody.innerHTML = state.leads.slice(0, 5).map(lead => `
    <tr>
      <td><b>${escapeHtml(lead.name)}</b><br><span style="font-size:0.75rem; color:var(--text-muted);">${lead.phone}</span></td>
      <td>${escapeHtml(lead.goal)}</td>
      <td>${escapeHtml(lead.source)}</td>
      <td><b style="color:var(--primary);">${lead.score}</b></td>
      <td><span class="temp-badge temp-${(lead.temperature || 'cold').toLowerCase()}">${lead.temperature}</span></td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="convertLead(${lead.id})">Convert</button>
      </td>
    </tr>
  `).join('');
}

// 3. Clients 360 Logic
async function loadClients() {
  try {
    const res = await fetch('/api/crm/clients');
    const clients = await res.json();
    state.clients = clients;

    renderClientList();
  } catch (e) {
    console.error('Error loading clients:', e);
  }
}

function renderClientList() {
  const container = document.getElementById('client-roster-list');
  const query = (document.getElementById('client-search-input')?.value || '').toLowerCase();

  const filtered = state.clients.filter(c => 
    c.name.toLowerCase().includes(query) || c.phone.includes(query) || (c.goals && c.goals.toLowerCase().includes(query))
  );

  container.innerHTML = filtered.map(client => `
    <div class="nav-item ${state.selectedClient && state.selectedClient.id === client.id ? 'active' : ''}" onclick="selectClient360(${client.id})">
      <div class="avatar" style="width:30px; height:30px; font-size:0.8rem;">${client.name.substring(0,2).toUpperCase()}</div>
      <div>
        <div style="font-weight:700; font-size:0.88rem;">${escapeHtml(client.name)}</div>
        <div style="font-size:0.75rem; opacity:0.8;">${escapeHtml(client.phone)}</div>
      </div>
    </div>
  `).join('');
}

async function selectClient360(clientId) {
  try {
    const res = await fetch(`/api/crm/clients/${clientId}`);
    const client = await res.json();
    state.selectedClient = client;

    renderClientList();
    renderClientProfilePane(client);
  } catch (e) {
    console.error('Error loading client profile:', e);
  }
}

function renderClientProfilePane(c) {
  const pane = document.getElementById('client-detail-pane');
  if (!pane) return;

  const a = c.assessment || {};
  const plans = c.dietPlans || [];

  pane.innerHTML = `
    <!-- Client Quick Action Header -->
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:1rem; margin-bottom:1.5rem;">
      <div style="display:flex; align-items:center; gap:1rem;">
        <div class="avatar" style="width:50px; height:50px; font-size:1.2rem; background:linear-gradient(135deg, #047857, #10b981);">${c.name.substring(0,2).toUpperCase()}</div>
        <div>
          <h2 style="font-weight:700; font-size:1.3rem;">${escapeHtml(c.name)}</h2>
          <div style="font-size:0.85rem; color:var(--text-muted);">
            <span><i class="ri-phone-line"></i> ${c.phone}</span> &nbsp;|&nbsp;
            <span><i class="ri-calendar-line"></i> Age: ${c.age || 30} (${c.gender || 'Female'})</span> &nbsp;|&nbsp;
            <span style="color:var(--primary); font-weight:600;"><i class="ri-shield-check-line"></i> Renewal: ${c.renewal_date || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div style="display:flex; gap:0.5rem;">
        <button class="btn btn-outline btn-sm" onclick="triggerCall('${c.phone}', ${c.id})"><i class="ri-phone-fill"></i> Call</button>
        <button class="btn btn-primary btn-sm" onclick="triggerWhatsApp('${c.phone}', '${escapeHtml(c.name)}')"><i class="ri-whatsapp-fill"></i> WhatsApp</button>
      </div>
    </div>

    <!-- Tabbed Clinical Section -->
    <div style="display:flex; gap:1rem; border-bottom:1px solid var(--border-color); margin-bottom:1.5rem;">
      <button class="btn btn-outline btn-sm" onclick="switchClientTab('overview')">Overview & Metrics</button>
      <button class="btn btn-outline btn-sm" onclick="switchClientTab('assessment')">Dietitian Assessment</button>
      <button class="btn btn-outline btn-sm" onclick="switchClientTab('diet-plans')">Diet Plans (${plans.length})</button>
      <button class="btn btn-outline btn-sm" onclick="switchClientTab('timeline')">Timeline & Notes</button>
    </div>

    <!-- Tab 1: Overview -->
    <div id="ctab-overview">
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
        <div style="background:var(--bg-main); padding:1rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
          <div style="font-size:0.8rem; color:var(--text-muted);">Primary Goals</div>
          <div style="font-weight:700; font-size:1rem; margin-top:0.2rem;">${escapeHtml(c.goals || 'Wellness Goal')}</div>
        </div>
        <div style="background:var(--bg-main); padding:1rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
          <div style="font-size:0.8rem; color:var(--text-muted);">Body Metrics</div>
          <div style="font-weight:700; font-size:1rem; margin-top:0.2rem;">${c.height_cm || 160} cm &nbsp;|&nbsp; ${c.weight_kg || 65} kg (BMI: ${c.bmi || 25.4})</div>
        </div>
      </div>
    </div>

    <!-- Tab 2: Clinical Assessment Form -->
    <div id="ctab-assessment" style="display:none;">
      <form onsubmit="saveAssessmentSubmit(event, ${c.id})">
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
          <div class="form-group">
            <label class="form-label">Food Preference</label>
            <select class="form-select" name="food_preference">
              <option value="Vegetarian" ${a.food_preference === 'Vegetarian' ? 'selected' : ''}>Vegetarian</option>
              <option value="Non-vegetarian" ${a.food_preference === 'Non-vegetarian' ? 'selected' : ''}>Non-vegetarian</option>
              <option value="Eggetarian" ${a.food_preference === 'Eggetarian' ? 'selected' : ''}>Eggetarian</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Water Intake (Liters/day)</label>
            <input type="number" step="0.5" class="form-input" name="water_intake_liters" value="${a.water_intake_liters || 2.5}">
          </div>
          <div class="form-group">
            <label class="form-label">Medical Conditions</label>
            <input type="text" class="form-input" name="medical_conditions" value="${escapeHtml(a.medical_conditions || '')}" placeholder="e.g. Mild PCOS, Insulin resistance">
          </div>
          <div class="form-group">
            <label class="form-label">Allergies / Food Dislikes</label>
            <input type="text" class="form-input" name="allergies" value="${escapeHtml(a.allergies || '')}" placeholder="e.g. Peanut allergy, Dislikes brinjal">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Dietitian Notes & Short-term Goal</label>
          <textarea class="form-textarea" name="short_term_goal" rows="3">${escapeHtml(a.short_term_goal || '')}</textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-sm">Save Assessment</button>
      </form>
    </div>

    <!-- Tab 3: Diet Plans -->
    <div id="ctab-diet-plans" style="display:none;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <h4 style="font-weight:700;">Active & Historical Diet Charts</h4>
        <button class="btn btn-primary btn-sm" onclick="showNewDietPlanForm(${c.id})">+ Create Diet Plan</button>
      </div>

      ${plans.map(p => `
        <div style="background:var(--bg-main); border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-sm); margin-bottom:0.75rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; font-weight:700;">
            <span>${escapeHtml(p.plan_name)} (v${p.version})</span>
            <span class="badge" style="background:${p.status === 'Active' ? 'var(--primary)' : '#64748b'};">${p.status}</span>
          </div>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.4rem;">Target Calories: <b>${p.calories} kcal/day</b></p>
          <div style="background:var(--bg-card); padding:0.75rem; border-radius:4px; font-size:0.82rem; margin-top:0.5rem; border:1px solid var(--border-color);">
            ${escapeHtml(p.meal_structure || 'Standard balanced home cooked meal chart')}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Tab 4: Timeline & Notes -->
    <div id="ctab-timeline" style="display:none;">
      <div class="timeline">
        ${(c.notes || []).map(n => `
          <div class="timeline-item">
            <div style="font-weight:700; font-size:0.9rem;">${escapeHtml(n.title)} <span style="font-size:0.75rem; color:var(--text-muted); font-weight:normal;">— ${new Date(n.created_at).toLocaleString()}</span></div>
            <p style="font-size:0.85rem; color:var(--text-main); margin-top:0.2rem;">${escapeHtml(n.content)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function switchClientTab(tabName) {
  ['overview', 'assessment', 'diet-plans', 'timeline'].forEach(t => {
    const el = document.getElementById(`ctab-${t}`);
    if (el) el.style.display = (t === tabName ? 'block' : 'none');
  });
}

// 4. Follow-ups Logic
async function loadFollowups() {
  try {
    const res = await fetch('/api/crm/followups?status=Pending');
    const data = await res.json();
    state.followups = data;

    const tbody = document.getElementById('followups-table-body');
    if (!tbody) return;

    tbody.innerHTML = data.map(f => `
      <tr>
        <td><b>${escapeHtml(f.reason)}</b></td>
        <td>${escapeHtml(f.lead_name || f.client_name || 'N/A')}</td>
        <td>${new Date(f.due_at).toLocaleString()}</td>
        <td><span class="badge" style="background:${f.priority === 'High' ? '#ef4444' : '#f59e0b'};">${f.priority}</span></td>
        <td><b>${f.status}</b></td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="completeTask(${f.id})">Mark Done</button>
        </td>
      </tr>
    `).join('');
  } catch (e) {
    console.error('Error loading followups:', e);
  }
}

async function completeTask(id) {
  await fetch(`/api/crm/followups/${id}/complete`, { method: 'POST' });
  loadFollowups();
  loadDashboard();
}

// 5. Consultations Logic
async function loadConsultations() {
  const tbody = document.getElementById('consultations-table-body');
  if (!tbody) return;

  try {
    const res = await fetch('/api/crm/leads');
    const leads = await res.json();
    const booked = leads.filter(l => l.status === 'Consultation Booked' || l.status === 'New');

    tbody.innerHTML = booked.map(l => `
      <tr>
        <td><b>Today ${new Date().toLocaleDateString()}</b></td>
        <td><b>${escapeHtml(l.name)}</b> (${l.phone})</td>
        <td>Initial Consultation</td>
        <td>Dr. Akhila Konakalla</td>
        <td><span class="badge" style="background:var(--primary);">Scheduled</span></td>
        <td>${escapeHtml(l.goal)}</td>
      </tr>
    `).join('');
  } catch (e) {
    console.error('Error loading consultations:', e);
  }
}

// 6. Payments Logic
async function loadPayments() {
  const tbody = document.getElementById('payments-table-body');
  if (!tbody) return;

  try {
    const res = await fetch('/api/admin/payments');
    const payments = await res.json();

    tbody.innerHTML = payments.map(p => `
      <tr>
        <td><b>${p.receipt_no}</b></td>
        <td><b>${escapeHtml(p.client_name)}</b></td>
        <td>${escapeHtml(p.plan_name)}</td>
        <td><b style="color:var(--primary);">₹${p.amount_paid}</b></td>
        <td>${p.payment_method} (${p.transaction_id})</td>
        <td>${p.payment_date}</td>
        <td><span class="badge" style="background:#10b981;">Verified</span></td>
      </tr>
    `).join('');
  } catch (e) {
    console.error('Error loading payments:', e);
  }
}

// 7. Modals & Actions
function toggleSearchModal(show) {
  const modal = document.getElementById('modal-search');
  if (show) {
    modal.classList.add('active');
    document.getElementById('cmd-k-input').focus();
  } else {
    modal.classList.remove('active');
  }
}

function openLeadModal() {
  document.getElementById('modal-lead').classList.add('active');
}

function openImportModal() {
  document.getElementById('modal-import').classList.add('active');
}

function openConsultationModal() {
  document.getElementById('modal-consultation').classList.add('active');
}

function openFollowupModal() {
  document.getElementById('modal-followup').classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
}

// Form Handlers
async function handleCreateLeadSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('/api/crm/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      closeModal('modal-lead');
      form.reset();
      loadLeads();
      loadDashboard();
    }
  } catch (err) {
    alert('Error creating lead: ' + err.message);
  }
}

async function handleImportSubmit(e) {
  e.preventDefault();
  const fileInput = document.getElementById('import-file-input');
  const strategy = document.getElementById('import-strategy-select').value;

  if (!fileInput.files || fileInput.files.length === 0) return;

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  formData.append('duplicate_strategy', strategy);

  try {
    const res = await fetch('/api/crm/import-file', {
      method: 'POST',
      body: formData
    });
    const result = await res.json();
    closeModal('modal-import');

    if (res.ok) {
      const container = document.getElementById('import-report-container');
      container.style.display = 'block';
      container.innerHTML = `
        <h4 style="font-weight:700; color:var(--primary);">✅ Import Summary for ${escapeHtml(result.fileName)}</h4>
        <p style="font-size:0.88rem; margin-top:0.4rem;">
          Total Spreadsheet Rows: <b>${result.totalRows}</b> | 
          New Imported: <b style="color:var(--primary);">${result.importedCount}</b> | 
          Updated: <b>${result.updatedCount}</b> | 
          Duplicates Skipped: <b>${result.skippedCount}</b> | 
          Errors: <b style="color:red;">${result.errorCount}</b>
        </p>
      `;
      loadLeads();
      loadDashboard();
      switchPage('imports');
    } else {
      alert('Import error: ' + (result.error || 'Failed to parse file.'));
    }
  } catch (err) {
    alert('Failed to upload file: ' + err.message);
  }
}

async function convertLead(leadId) {
  if (!confirm('Convert this lead into an active Dhruthi Wellness Client profile?')) return;
  try {
    const res = await fetch(`/api/crm/leads/${leadId}/convert`, { method: 'POST' });
    if (res.ok) {
      loadLeads();
      loadClients();
      loadDashboard();
      switchPage('clients');
    }
  } catch (e) {
    alert('Error converting lead: ' + e.message);
  }
}

async function handleGlobalSearch(query) {
  if (!query.trim()) return;
  try {
    const res = await fetch(`/api/crm/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    const container = document.getElementById('cmd-k-results');

    let html = '';
    if (data.leads && data.leads.length > 0) {
      html += `<div style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:0.3rem;">Leads</div>`;
      data.leads.forEach(l => {
        html += `<div class="priority-item" style="cursor:pointer; margin-bottom:0.4rem; background:var(--bg-main);" onclick="closeModal('modal-search'); switchPage('leads');">
          <div><b>${escapeHtml(l.name)}</b> (${l.phone}) - ${escapeHtml(l.goal)}</div>
        </div>`;
      });
    }
    if (data.clients && data.clients.length > 0) {
      html += `<div style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:0.3rem; margin-top:0.8rem;">Clients</div>`;
      data.clients.forEach(c => {
        html += `<div class="priority-item" style="cursor:pointer; margin-bottom:0.4rem; background:var(--bg-main);" onclick="closeModal('modal-search'); switchPage('clients'); selectClient360(${c.id});">
          <div><b>${escapeHtml(c.name)}</b> (${c.phone}) - ${escapeHtml(c.goals || '')}</div>
        </div>`;
      });
    }
    container.innerHTML = html || '<p style="text-align:center; color:var(--text-muted);">No matching leads or clients found.</p>';
  } catch (e) {
    console.error('Search error:', e);
  }
}

function triggerCall(phone, clientId) {
  alert(`[Call Layer Active] Initiating phone call to ${phone}... Logging outcome to client timeline.`);
  fetch('/api/crm/calls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: clientId, outcome: 'Answered', notes: `Outgoing call initiated from CRM dashboard.` })
  }).then(() => selectClient360(clientId));
}

function triggerWhatsApp(phone, name) {
  switchPage('communication');
  document.getElementById('wa-recipient-phone').value = phone;
  document.getElementById('wa-message-content').value = `Namaste ${name}! Dr. Akhila Konakalla here from Dhruthi Wellness. How are you feeling today?`;
}

function fillWaTemplateContent() {
  const val = document.getElementById('wa-template-select').value;
  const content = document.getElementById('wa-message-content');
  if (val === 'New Enquiry Acknowledgement') {
    content.value = 'Namaste! Thank you for reaching out to Dhruthi Wellness. Dr. Akhila Konakalla will guide you on your wellness journey. When is a good time to talk?';
  } else if (val === 'Consultation Reminder') {
    content.value = 'Dear Client, your wellness consultation with Dr. Akhila Konakalla is scheduled for today. Please keep your recent blood reports handy.';
  } else if (val === 'Diet Plan Ready Notification') {
    content.value = 'Hi! Your customized metabolic meal chart has been updated by Dr. Akhila. Please check your attachments or reply to discuss.';
  } else if (val === 'Renewal Reminder') {
    content.value = 'Namaste! Your current wellness plan is due for renewal soon. Let us review your progress and set your next targets!';
  }
}

async function sendWhatsAppMessage() {
  const phone = document.getElementById('wa-recipient-phone').value;
  const content = document.getElementById('wa-message-content').value;
  if (!phone || !content) {
    alert('Please enter recipient phone number and message content.');
    return;
  }

  try {
    await fetch('/api/crm/whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, direction: 'outgoing', status: 'Sent' })
    });
    alert(`WhatsApp Message successfully queued to ${phone}!`);
    document.getElementById('wa-message-content').value = '';
  } catch (e) {
    alert('Failed to send WhatsApp message: ' + e.message);
  }
}

function renderTemplates() {
  const container = document.getElementById('templates-list-container');
  if (!container) return;

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:1rem;">
      <div style="background:var(--bg-main); padding:1rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
        <div style="font-weight:700; color:var(--primary);">New Enquiry Acknowledgement</div>
        <p style="font-size:0.85rem; margin-top:0.3rem;">Namaste {{client_name}}! Thank you for reaching out to Dhruthi Wellness. Dr. Akhila Konakalla will guide you on your {{goal}} journey. When is a convenient time to talk?</p>
      </div>
      <div style="background:var(--bg-main); padding:1rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
        <div style="font-weight:700; color:var(--primary);">Consultation Reminder</div>
        <p style="font-size:0.85rem; margin-top:0.3rem;">Dear {{client_name}}, your wellness consultation with Dr. Akhila Konakalla is scheduled for {{consultation_date}} at {{consultation_time}}. Please keep your recent blood reports handy.</p>
      </div>
    </div>
  `;
}

function toggleDarkMode() {
  const current = document.documentElement.getAttribute('data-theme');
  if (current === 'dark') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

// Utility Helpers
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
