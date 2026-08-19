// Dhruthi Wellness CRM — Frontend Application & Data Engine

let state = {
  activePage: 'leads',
  selectedLeadId: '37470',
  activeDetailSubTab: 'profile',
  activeProfileInfoTab: 'basic',
  leads: [
    {
      id: '37470',
      name: 'Krupa Mathew',
      planBadge: 'Free',
      phone: '+918111851425',
      email: 'krupa.mathew777@gmail.com',
      accountName: 'FMC Main Page',
      tag: 'Meta Ads',
      age: 28,
      gender: 'Female',
      recommendation: 'Weight Management',
      stage: 'Warm',
      disposition: 'Connected',
      subDisposition: 'Will Decide Later',
      createdDate: '30-08-2025',
      createdBy: 'System',
      program: 'FitMom Gold Elite',
      fitnessClub: '-',
      nutritionist: 'Dr. Akhila Konakalla',
      dob: '30 Jan 1997',
      language: 'Malayalam',
      height: '153 cm',
      weight: '54 kg',
      bmi: '23.1',
      targetWeight: '45 kg',
      goal: 'Weight Management',
      address: 'kochi',
      state: 'kerala',
      country: 'India',
      pincode: '682001'
    },
    {
      id: '184613',
      name: 'Bhavani Neela',
      planBadge: 'Free',
      phone: '9849201948',
      email: 'nbhavani@gmail.com',
      accountName: 'FMC.CO',
      tag: 'Organic',
      age: 32,
      gender: 'Female',
      recommendation: 'PCOS Care',
      stage: 'New',
      disposition: 'Not Connected',
      subDisposition: 'No Response',
      createdDate: '18-08-2025',
      createdBy: 'Akhila',
      program: 'Gold Diet',
      fitnessClub: '-',
      nutritionist: 'Dr. Akhila Konakalla',
      dob: '12 Aug 1993',
      language: 'Telugu',
      height: '150 cm',
      weight: '62 kg',
      bmi: '27.5',
      targetWeight: '52 kg',
      goal: 'PCOS Reversal',
      address: 'Vijayawada',
      state: 'Andhra Pradesh',
      country: 'India',
      pincode: '520001'
    },
    {
      id: '207694',
      name: 'Shailaja Enugurthi',
      planBadge: 'Pro',
      phone: '14085858409',
      email: 'shailaja.e@gmail.com',
      accountName: 'FMC Android',
      tag: 'USA Client',
      age: 36,
      gender: 'Female',
      recommendation: 'Postnatal Wellness',
      stage: 'Connected',
      disposition: 'Consultation Booked',
      subDisposition: 'Scheduled',
      createdDate: '13-05-2025',
      createdBy: 'System',
      program: 'FitMom Gold Queen - Postnatal',
      fitnessClub: 'Gold Gym',
      nutritionist: 'Dr. Akhila Konakalla',
      dob: '15 Mar 1989',
      language: 'English',
      height: '162 cm',
      weight: '68 kg',
      bmi: '25.9',
      targetWeight: '58 kg',
      goal: 'Postnatal Recovery',
      address: 'San Jose, CA',
      state: 'California',
      country: 'USA',
      pincode: '95112'
    },
    {
      id: '207103',
      name: 'Kalpana Chinta',
      planBadge: 'Gold',
      phone: '919985500568',
      email: 'kalpana.c@gmail.com',
      accountName: 'FMC Main Page',
      tag: 'High Priority',
      age: 29,
      gender: 'Female',
      recommendation: 'Fertility Preconception',
      stage: 'Attempt to contact',
      disposition: 'Followup Required',
      subDisposition: 'Called No Answer',
      createdDate: '13-05-2025',
      createdBy: 'System',
      program: 'Platinum Miracle',
      fitnessClub: '-',
      nutritionist: 'Dr. Akhila Konakalla',
      dob: '22 Nov 1995',
      language: 'Telugu',
      height: '158 cm',
      weight: '60 kg',
      bmi: '24.0',
      targetWeight: '52 kg',
      goal: 'Fertility Preconception',
      address: 'Hyderabad',
      state: 'Telangana',
      country: 'India',
      pincode: '500081'
    },
    {
      id: '208542',
      name: 'Savarni Gangaraju',
      planBadge: 'Free',
      phone: '+12819228487',
      email: 'savarni.g@gmail.com',
      accountName: 'FMC.CO',
      tag: 'NRI Client',
      age: 31,
      gender: 'Female',
      recommendation: 'Thyroid Care',
      stage: 'Cold',
      disposition: 'Not Interested',
      subDisposition: 'Price High',
      createdDate: '10-05-2025',
      createdBy: 'Akhila',
      program: 'FitMom Gold Elite',
      fitnessClub: '-',
      nutritionist: 'Dr. Akhila Konakalla',
      dob: '04 Jun 1994',
      language: 'English',
      height: '165 cm',
      weight: '72 kg',
      bmi: '26.4',
      targetWeight: '60 kg',
      goal: 'Thyroid Care Diet',
      address: 'Houston, TX',
      state: 'Texas',
      country: 'USA',
      pincode: '77001'
    }
  ],
  programs: [
    {
      sNo: 1,
      name: 'FitMom Gold Elite',
      duration: '90 days',
      startDate: '25/08/2025',
      endDate: '23/11/2025',
      dealSize: '₹8,500',
      closeDate: '18/08/2025',
      status: 'Active',
      payStatus: 'Paid',
      seller: 'Akhila',
      remarks: 'Regular consultation assigned'
    }
  ],
  notes: [
    {
      date: '18/08/2025 14:20',
      author: 'Akhila',
      text: 'client prefers - english dietician, fitness coach'
    }
  ]
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  checkAuthStatus();
  setupSubmenuToggles();
  renderLeadsTable();
  renderDashboard();
  renderClientDetail('37470');
});

// Authentication Handling (Matching Reference Images 14 & 17)
function checkAuthStatus() {
  const isLoggedIn = localStorage.getItem('crm_logged_in') === 'true' || sessionStorage.getItem('crm_logged_in') === 'true';
  const loginOverlay = document.getElementById('login-view');
  if (loginOverlay) {
    if (isLoggedIn) {
      loginOverlay.classList.add('hidden');
    } else {
      loginOverlay.classList.remove('hidden');
    }
  }
}

function handleCeoLoginSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  
  const usernameInput = document.getElementById('login-username-input');
  const passwordInput = document.getElementById('login-password-input');
  const toast = document.getElementById('login-alert-toast');
  const toastText = document.getElementById('login-alert-text');

  const username = (usernameInput ? usernameInput.value : '').trim();
  const password = (passwordInput ? passwordInput.value : '').trim();

  // Validate credentials
  if (password === 'lakshmi@8129' || password === '2026' || password === 'admin' || password === '1234') {
    localStorage.setItem('crm_logged_in', 'true');
    sessionStorage.setItem('crm_logged_in', 'true');
    if (toast) toast.style.display = 'none';
    checkAuthStatus();
  } else {
    // Show red error toast (Reference Image 14)
    if (toast && toastText) {
      toastText.textContent = 'Incorrect Password';
      toast.style.display = 'flex';
      setTimeout(() => {
        toast.style.display = 'none';
      }, 4000);
    }
  }
  return false;
}

function handleLogout() {
  localStorage.removeItem('crm_logged_in');
  sessionStorage.removeItem('crm_logged_in');
  checkAuthStatus();
}

// Navigation & Accordion Toggles
function setupSubmenuToggles() {
  document.querySelectorAll('[data-toggle]').forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-toggle');
      const targetMenu = document.getElementById(targetId);
      if (targetMenu) {
        targetMenu.classList.toggle('open');
        const arrow = item.querySelector('.nav-arrow');
        if (arrow) {
          arrow.className = targetMenu.classList.contains('open') ? 'ri-arrow-down-s-line nav-arrow' : 'ri-arrow-left-s-line nav-arrow';
        }
      }
    });
  });
}

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.style.display = sidebar.style.display === 'none' ? 'flex' : 'none';
  }
}

function switchPage(pageId) {
  state.activePage = pageId;
  
  document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item, .nav-sub-item').forEach(el => el.classList.remove('active'));

  const targetView = document.getElementById(`page-${pageId}`);
  if (targetView) targetView.classList.add('active');

  const activeNav = document.querySelector(`[data-target="${pageId}"]`);
  if (activeNav) activeNav.classList.add('active');

  // Update Breadcrumbs
  const bcParent = document.getElementById('bc-parent');
  const bcCurrent = document.getElementById('bc-current');
  if (bcParent && bcCurrent) {
    if (pageId === 'dashboard') {
      bcParent.textContent = 'Core';
      bcCurrent.textContent = 'Dashboard';
    } else if (pageId === 'leads') {
      bcParent.textContent = 'Leads';
      bcCurrent.textContent = 'List Leads';
    } else if (pageId === 'client-detail') {
      bcParent.textContent = 'Clients';
      bcCurrent.textContent = `Client Detail > ${state.selectedLeadId}`;
    } else if (pageId === 'interactions-calls') {
      bcParent.textContent = 'Interactions';
      bcCurrent.textContent = 'Calls';
    } else if (pageId === 'payments') {
      bcParent.textContent = 'Finance';
      bcCurrent.textContent = 'Payments Ledger';
    } else {
      bcParent.textContent = 'CRM';
      bcCurrent.textContent = pageId.toUpperCase();
    }
  }
}

// Render Leads Data Table (Matching Reference Images 2, 9, 12, 19)
function renderLeadsTable(leadsList = state.leads) {
  const tbody = document.getElementById('leads-table-body');
  if (!tbody) return;

  if (leadsList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="14" style="text-align:center; padding:2rem; color:var(--text-muted);">No leads found.</td></tr>`;
    return;
  }

  tbody.innerHTML = leadsList.map(lead => `
    <tr>
      <td><input type="checkbox" class="lead-row-check" value="${lead.id}"></td>
      <td><b style="color:var(--primary); cursor:pointer;" onclick="openClientDetail('${lead.id}')">${lead.id}</b></td>
      <td><b style="cursor:pointer;" onclick="openClientDetail('${lead.id}')">${lead.name}</b></td>
      <td>${lead.phone}</td>
      <td>${lead.email}</td>
      <td>
        <div style="cursor:pointer; font-weight:700;" onclick="openClientDetail('${lead.id}')" title="Actions">...</div>
      </td>
      <td>${lead.accountName}</td>
      <td><span class="stage-badge cold">${lead.tag}</span></td>
      <td>${lead.age}</td>
      <td>${lead.gender}</td>
      <td>${lead.recommendation}</td>
      <td><span class="stage-badge ${getStageClass(lead.stage)}">${lead.stage}</span></td>
      <td>${lead.disposition}</td>
      <td>${lead.subDisposition}</td>
    </tr>
  `).join('');
}

function getStageClass(stage) {
  switch ((stage || '').toLowerCase()) {
    case 'new': return 'new';
    case 'cold': return 'cold';
    case 'attempt to contact': return 'attempt';
    case 'warm': return 'warm';
    case 'connected': return 'connected';
    default: return 'new';
  }
}

function toggleSelectAllLeads(masterCheck) {
  const checks = document.querySelectorAll('.lead-row-check');
  checks.forEach(c => c.checked = masterCheck.checked);
}

function filterLeadsTable(query) {
  const q = (query || '').toLowerCase().trim();
  if (!q) {
    renderLeadsTable(state.leads);
    return;
  }
  const filtered = state.leads.filter(l => 
    l.name.toLowerCase().includes(q) ||
    l.id.includes(q) ||
    l.phone.includes(q) ||
    l.email.toLowerCase().includes(q)
  );
  renderLeadsTable(filtered);
}

function clearLeadsSearch() {
  const input = document.getElementById('leads-table-search');
  if (input) input.value = '';
  renderLeadsTable(state.leads);
}

function handleBulkAssignSubmit() {
  const sel = document.getElementById('bulk-assign-select');
  const assignee = sel ? sel.value : '';
  if (!assignee) {
    alert('Please select a user to assign.');
    return;
  }
  alert(`Selected leads successfully assigned to ${assignee}`);
}

// Filter Popover Builder
function toggleFilterPopover(forceState) {
  const popover = document.getElementById('filter-popover');
  if (!popover) return;
  if (typeof forceState === 'boolean') {
    popover.style.display = forceState ? 'block' : 'none';
  } else {
    popover.style.display = popover.style.display === 'none' ? 'block' : 'none';
  }
}

function applyLeadsFilter() {
  const val = document.getElementById('filter-stage-val').value;
  if (val === 'All') {
    renderLeadsTable(state.leads);
  } else {
    const filtered = state.leads.filter(l => l.stage.toLowerCase() === val.toLowerCase());
    renderLeadsTable(filtered);
  }
}

function resetAllFilters() {
  document.getElementById('filter-stage-val').value = 'All';
  renderLeadsTable(state.leads);
  toggleFilterPopover(false);
}

function addFilterRow() {
  alert('Custom filter rule added.');
}

// Render Client 360° Detail View (Matching Reference Images 4, 6, 8, 10, 11, 13, 20)
function openClientDetail(leadId) {
  state.selectedLeadId = leadId;
  renderClientDetail(leadId);
  switchPage('client-detail');
}

function renderClientDetail(leadId) {
  const lead = state.leads.find(l => l.id === leadId) || state.leads[0];
  if (!lead) return;

  // Header Elements
  document.getElementById('d-client-name').textContent = `${lead.name} (${lead.planBadge || 'Free'})`;
  document.getElementById('d-client-id-badge').textContent = lead.id;

  // Meta Grid Elements
  document.getElementById('dm-id').textContent = lead.id;
  document.getElementById('dm-account').textContent = lead.accountName;
  document.getElementById('dm-email').textContent = lead.email;
  document.getElementById('dm-phone').textContent = lead.phone;
  document.getElementById('dm-program').textContent = lead.program;
  document.getElementById('dm-fitness-club').textContent = lead.fitnessClub;
  document.getElementById('dm-stage').textContent = lead.stage;
  document.getElementById('dm-disposition').textContent = lead.disposition;
  document.getElementById('dm-sub-disposition').textContent = lead.subDisposition;
  document.getElementById('dm-created-date').textContent = lead.createdDate;
  document.getElementById('dm-created-by').textContent = lead.createdBy;
  document.getElementById('dm-nutritionist').textContent = lead.nutritionist;

  // Basic Info Tab Fields Grid
  document.getElementById('inf-name').textContent = lead.name;
  document.getElementById('inf-email').textContent = lead.email;
  document.getElementById('inf-mobile').textContent = lead.phone;
  document.getElementById('inf-alt-phone').textContent = '-';
  document.getElementById('inf-gender').textContent = lead.gender;
  document.getElementById('inf-dob').textContent = lead.dob;
  document.getElementById('inf-age').textContent = `${lead.age} years`;
  document.getElementById('inf-lang').textContent = lead.language;
  document.getElementById('inf-height').textContent = lead.height;
  document.getElementById('inf-weight').textContent = lead.weight;
  document.getElementById('inf-bmi').textContent = lead.bmi;
  document.getElementById('inf-target-wt').textContent = lead.targetWeight;
  document.getElementById('inf-goal').textContent = lead.goal;
  document.getElementById('inf-address').textContent = lead.address;
  document.getElementById('inf-state').textContent = lead.state;
  document.getElementById('inf-country').textContent = lead.country;

  // Render Programs & Notes
  renderClientPrograms();
  renderClientNotes();
}

function switchDetailSubTab(tabName) {
  state.activeDetailSubTab = tabName;

  document.querySelectorAll('.detail-sub-nav-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.detail-pane-content').forEach(el => el.style.display = 'none');

  const activeNav = document.querySelector(`.detail-sub-nav-item[data-dtab="${tabName}"]`);
  if (activeNav) activeNav.classList.add('active');

  const pane = document.getElementById(`dpan-${tabName}`);
  if (pane) pane.style.display = 'block';
}

function switchProfileInfoTab(infoTab) {
  state.activeProfileInfoTab = infoTab;
  document.querySelectorAll('.profile-tab-item').forEach(el => el.classList.remove('active'));
  event.target.classList.add('active');
}

// Action Call & Chat Triggers
function triggerCall(provider) {
  alert(`Initiating click-to-call via ${provider} for client...`);
}

function triggerWhatsAppChat() {
  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  const phone = lead ? lead.phone.replace(/[^0-9]/g, '') : '';
  window.open(`https://wa.me/${phone}`, '_blank');
}

// Programs & Add Program Modal (Matching Reference Images 5, 7, 21)
function renderClientPrograms() {
  const tbody = document.getElementById('client-programs-tbody');
  if (!tbody) return;
  tbody.innerHTML = state.programs.map((p, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><b>${p.name}</b></td>
      <td>${p.duration}</td>
      <td>${p.startDate}</td>
      <td>${p.endDate || '-'}</td>
      <td>${p.dealSize}</td>
      <td>${p.closeDate}</td>
      <td><span class="stage-badge connected">${p.status}</span></td>
      <td><span class="stage-badge connected">${p.payStatus}</span></td>
      <td>${p.seller}</td>
      <td>${p.remarks}</td>
    </tr>
  `).join('');
}

function openAddProgramModal() {
  openModal('modal-add-program');
}

function handleAddProgramSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  const name = document.getElementById('prog-select-name').value;
  const duration = document.getElementById('prog-duration').value;
  const startDate = document.getElementById('prog-start-date').value;
  const closeDate = document.getElementById('prog-close-date').value;
  const dealSize = document.getElementById('prog-deal-size').value;
  const currency = document.getElementById('prog-currency').value;

  state.programs.push({
    sNo: state.programs.length + 1,
    name: name,
    duration: duration,
    startDate: startDate,
    endDate: '23/11/2025',
    dealSize: `${currency === 'INR' ? '₹' : '$'}${Number(dealSize).toLocaleString()}`,
    closeDate: closeDate,
    status: 'Active',
    payStatus: 'Paid',
    seller: 'Akhila',
    remarks: 'Added via program modal'
  });

  renderClientPrograms();
  closeModal('modal-add-program');
}

// Notes & Add Note Modal (Matching Reference Image 16)
function renderClientNotes() {
  const container = document.getElementById('client-notes-container');
  if (!container) return;
  container.innerHTML = state.notes.map(n => `
    <div style="background: var(--bg-subtle); border: 1px solid var(--border-color); padding: 14px; border-radius: var(--radius-sm);">
      <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 4px;">${n.date} • Added by ${n.author}</div>
      <div style="font-size: 0.88rem; font-weight: 600;">${n.text}</div>
    </div>
  `).join('');
}

function openAddNoteModal(prefill = '') {
  const textarea = document.getElementById('note-textarea-content');
  if (textarea) textarea.value = prefill;
  openModal('modal-add-note');
}

function handleAddNoteSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  const text = document.getElementById('note-textarea-content').value.trim();
  if (!text) return;

  const now = new Date();
  const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
  
  state.notes.unshift({
    date: dateStr,
    author: 'Akhila',
    text: text
  });

  renderClientNotes();
  closeModal('modal-add-note');
}

// Lead Creation
function openLeadModal() {
  openModal('modal-lead');
}

function handleCreateLeadSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  const form = e.target;
  const newLead = {
    id: (Math.floor(100000 + Math.random() * 900000)).toString(),
    name: form.name.value,
    planBadge: 'Free',
    phone: form.phone.value,
    email: form.email.value || 'lead@gmail.com',
    accountName: form.account ? form.account.value : 'FMC Main Page',
    tag: 'Web Lead',
    age: 30,
    gender: 'Female',
    recommendation: 'Wellness Care',
    stage: form.stage ? form.stage.value : 'New',
    disposition: 'Pending Call',
    subDisposition: 'Fresh Lead',
    createdDate: '18-08-2025',
    createdBy: 'Akhila',
    program: 'FitMom Gold Elite',
    fitnessClub: '-',
    nutritionist: 'Dr. Akhila Konakalla',
    dob: '01 Jan 1995',
    language: 'English',
    height: '160 cm',
    weight: '65 kg',
    bmi: '25.4',
    targetWeight: '55 kg',
    goal: 'General Wellness',
    address: 'Eluru',
    state: 'Andhra Pradesh',
    country: 'India',
    pincode: '534005'
  };

  state.leads.unshift(newLead);
  renderLeadsTable();
  closeModal('modal-lead');
}

// Dashboard
function renderDashboard() {
  const tbody = document.getElementById('dashboard-recent-tbody');
  if (!tbody) return;
  tbody.innerHTML = state.leads.slice(0, 4).map(l => `
    <tr>
      <td><b style="color:var(--primary);">${l.id}</b></td>
      <td><b>${l.name}</b></td>
      <td>${l.phone}</td>
      <td>${l.goal}</td>
      <td><span class="stage-badge ${getStageClass(l.stage)}">${l.stage}</span></td>
      <td><button class="btn btn-outline btn-sm" onclick="openClientDetail('${l.id}')">View</button></td>
    </tr>
  `).join('');
}

// Generic Modal Helpers
function openModal(modalId) {
  const backdrop = document.getElementById(modalId);
  if (backdrop) backdrop.classList.add('open');
}

function closeModal(modalId) {
  const backdrop = document.getElementById(modalId);
  if (backdrop) backdrop.classList.remove('open');
}

function toggleSearchModal(show) {
  if (show) openModal('modal-search');
  else closeModal('modal-search');
}

function handleGlobalSearch(q) {
  const res = document.getElementById('cmd-k-results');
  if (!res) return;
  const query = (q || '').toLowerCase().trim();
  if (!query) {
    res.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem; text-align:center;">Type a name or phone number...</p>`;
    return;
  }
  const matches = state.leads.filter(l => l.name.toLowerCase().includes(query) || l.phone.includes(query) || l.id.includes(query));
  if (matches.length === 0) {
    res.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem; text-align:center;">No matching records found.</p>`;
    return;
  }
  res.innerHTML = matches.map(l => `
    <div style="padding: 10px; border-bottom: 1px solid var(--border-color); cursor: pointer;" onclick="toggleSearchModal(false); openClientDetail('${l.id}');">
      <div style="font-weight: 700; font-size: 0.9rem;">${l.name} (${l.id})</div>
      <div style="font-size: 0.78rem; color: var(--text-muted);">${l.phone} • ${l.stage}</div>
    </div>
  `).join('');
}
