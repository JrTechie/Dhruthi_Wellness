// Dhruthi Wellness CRM — Frontend Application & Data Engine

let state = {
  activePage: 'leads',
  selectedLeadId: 'DW-1',
  isEditingProfile: false,
  activeDetailSubTab: 'profile',
  activeProfileInfoTab: 'basic',
  leads: [
    {
      id: 'DW-1',
      name: 'Krupa Mathew',
      planBadge: 'Free',
      phone: '+918111851425',
      email: 'krupa.mathew777@gmail.com',
      accountName: 'DW Insta Page',
      tag: 'Meta Ads',
      age: 28,
      gender: 'Female',
      recommendation: 'Weight Management',
      stage: 'Warm',
      disposition: 'Connected',
      subDisposition: 'Will Decide Later',
      createdDate: '30-08-2025',
      createdBy: 'System',
      program: 'Fertility Nutrition & Preconception Program',
      fitnessClub: '-',
      nutritionist: 'Dt. Akhila Konakalla',
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
      pincode: '682001',
      dietPref: 'Vegetarian, Includes Dairy & Nuts',
      workoutPref: '30 mins Daily Walking & Home Yoga',
      medicalAssessment: 'Mild PCOS, Blood Glucose Normal',
      sleepStress: '7 Hours Sleep, Moderate Stress',
      femaleInfo: '28-day Regular Cycle',
      otherInfo: 'Prefers Malayalam or English consultation'
    },
    {
      id: 'DW-2',
      name: 'Bhavani Neela',
      planBadge: 'Free',
      phone: '9849201948',
      email: 'nbhavani@gmail.com',
      accountName: 'DW Insta Page',
      tag: 'Organic',
      age: 32,
      gender: 'Female',
      recommendation: 'PCOS Care',
      stage: 'New',
      disposition: 'Not Connected',
      subDisposition: 'No Response',
      createdDate: '18-08-2025',
      createdBy: 'Akhila',
      program: 'PCOS / PCOD Management Program',
      fitnessClub: '-',
      nutritionist: 'Dt. Akhila Konakalla',
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
      pincode: '520001',
      dietPref: 'Non-Vegetarian (Chicken 2x/week)',
      workoutPref: 'Gym 3x/week',
      medicalAssessment: 'PCOS diagnosed 2023',
      sleepStress: '6 Hours Sleep, High Stress',
      femaleInfo: 'Irregular cycles (35-40 days)',
      otherInfo: 'Requested evening callback'
    },
    {
      id: 'DW-3',
      name: 'Shailaja Enugurthi',
      planBadge: 'Pro',
      phone: '14085858409',
      email: 'shailaja.e@gmail.com',
      accountName: 'DW Insta Page',
      tag: 'USA Client',
      age: 36,
      gender: 'Female',
      recommendation: 'Postnatal Wellness',
      stage: 'Connected',
      disposition: 'Consultation Booked',
      subDisposition: 'Scheduled',
      createdDate: '13-05-2025',
      createdBy: 'System',
      program: 'Postpartum Recovery Program',
      fitnessClub: 'Gold Gym',
      nutritionist: 'Dt. Akhila Konakalla',
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
      pincode: '95112',
      dietPref: 'High Protein Eggetarian',
      workoutPref: 'Postpartum Rehab Exercises',
      medicalAssessment: 'Post-delivery 6 months',
      sleepStress: 'Interrupted Sleep (Lactating)',
      femaleInfo: 'Lactating Mother',
      otherInfo: 'Prefers US PST Time Zone Calls'
    },
    {
      id: 'DW-4',
      name: 'Kalpana Chinta',
      planBadge: 'Gold',
      phone: '919985500568',
      email: 'kalpana.c@gmail.com',
      accountName: 'DW Insta Page',
      tag: 'High Priority',
      age: 29,
      gender: 'Female',
      recommendation: 'Fertility Preconception',
      stage: 'Attempt to contact',
      disposition: 'Followup Required',
      subDisposition: 'Called No Answer',
      createdDate: '13-05-2025',
      createdBy: 'System',
      program: 'Fertility Nutrition & Preconception Program',
      fitnessClub: '-',
      nutritionist: 'Dt. Akhila Konakalla',
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
      pincode: '500081',
      dietPref: 'South Indian Veg',
      workoutPref: 'Morning Yoga',
      medicalAssessment: 'Trying to conceive 1 year',
      sleepStress: '8 Hours Sleep',
      femaleInfo: 'Normal Blood Reports',
      otherInfo: 'Referred by Instagram Reel'
    },
    {
      id: 'DW-5',
      name: 'Savarni Gangaraju',
      planBadge: 'Free',
      phone: '+12819228487',
      email: 'savarni.g@gmail.com',
      accountName: 'DW Insta Page',
      tag: 'NRI Client',
      age: 31,
      gender: 'Female',
      recommendation: 'Thyroid Care',
      stage: 'Cold',
      disposition: 'Not Interested',
      subDisposition: 'Price High',
      createdDate: '10-05-2025',
      createdBy: 'Akhila',
      program: 'Thyroid Care Diet Program',
      fitnessClub: '-',
      nutritionist: 'Dt. Akhila Konakalla',
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
      pincode: '77001',
      dietPref: 'Gluten-free, Low Goitrogen Diet',
      workoutPref: 'Treadmill Walking',
      medicalAssessment: 'Hypothyroidism (TSH 5.2)',
      sleepStress: '7 Hours Sleep',
      femaleInfo: 'Regular Cycle',
      otherInfo: 'Follow-up in 1 month'
    }
  ],
  programs: [
    {
      sNo: 1,
      name: 'Fertility Nutrition & Preconception Program',
      duration: '90 days',
      startDate: '25/08/2025',
      endDate: '23/11/2025',
      dealSize: '₹8,500',
      closeDate: '18/08/2025',
      status: 'Active',
      payStatus: 'Paid',
      seller: 'Akhila',
      remarks: 'Regular clinical consultation assigned'
    }
  ],
  notes: [
    {
      date: '18/08/2025 14:20',
      author: 'Akhila',
      text: 'client prefers - english dietitian, fitness coach'
    }
  ]
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  // Restore saved leads from LocalStorage if available
  const savedLeads = localStorage.getItem('dhruthi_crm_leads');
  if (savedLeads) {
    try {
      state.leads = JSON.parse(savedLeads);
    } catch (e) {
      console.warn('Fallback to initial leads');
    }
  }

  checkAuthStatus();
  setupSubmenuToggles();
  renderLeadsTable();
  renderDashboard();
  renderClientDetail('DW-1');
});

// Authentication Handling
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

// Render Leads Data Table
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
    l.id.toLowerCase().includes(q) ||
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

// Render & Completely Editable Client 360° Detail View (User Requirement 5)
function openClientDetail(leadId) {
  state.selectedLeadId = leadId;
  state.isEditingProfile = false;
  renderClientDetail(leadId);
  switchPage('client-detail');
}

function toggleEditProfileMode(forceMode) {
  if (typeof forceMode === 'boolean') {
    state.isEditingProfile = forceMode;
  } else {
    state.isEditingProfile = !state.isEditingProfile;
  }
  renderClientDetail(state.selectedLeadId);
}

function renderClientDetail(leadId) {
  const lead = state.leads.find(l => l.id === leadId) || state.leads[0];
  if (!lead) return;

  const isEdit = state.isEditingProfile;

  // Toggle Edit/Save/Cancel Buttons
  const btnEdit = document.getElementById('btn-edit-toggle');
  const btnSave = document.getElementById('btn-save-profile');
  const btnCancel = document.getElementById('btn-cancel-profile');

  if (btnEdit && btnSave && btnCancel) {
    if (isEdit) {
      btnEdit.style.display = 'none';
      btnSave.style.display = 'inline-flex';
      btnCancel.style.display = 'inline-flex';
    } else {
      btnEdit.style.display = 'inline-flex';
      btnSave.style.display = 'none';
      btnCancel.style.display = 'none';
    }
  }

  // Header Elements
  if (isEdit) {
    document.getElementById('d-client-name').innerHTML = `
      <div style="display:flex; gap:8px; align-items:center;">
        <input type="text" class="form-input" id="edit-name" value="${lead.name}" style="font-size:1.1rem; font-weight:700; width:220px;">
        <input type="text" class="form-input" id="edit-plan-badge" value="${lead.planBadge || 'Free'}" style="font-size:0.85rem; width:90px;">
      </div>
    `;
    document.getElementById('d-client-id-badge').innerHTML = `
      <input type="text" class="form-input" id="edit-id" value="${lead.id}" style="width:100px; padding:2px 6px; font-size:0.78rem;">
    `;
  } else {
    document.getElementById('d-client-name').textContent = `${lead.name} (${lead.planBadge || 'Free'})`;
    document.getElementById('d-client-id-badge').textContent = lead.id;
  }

  // Meta Grid 2-Column Editable Container
  const metaContainer = document.getElementById('meta-grid-container');
  if (metaContainer) {
    if (isEdit) {
      metaContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div class="detail-meta-item"><span class="label">ID</span><input type="text" class="form-input" id="em-id" value="${lead.id}"></div>
          <div class="detail-meta-item">
            <span class="label">Account Name</span>
            <select class="form-select" id="em-account">
              <option value="DW Insta Page" ${lead.accountName === 'DW Insta Page' ? 'selected' : ''}>DW Insta Page</option>
              <option value="DW Main Website" ${lead.accountName === 'DW Main Website' ? 'selected' : ''}>DW Main Website</option>
              <option value="DW Android App" ${lead.accountName === 'DW Android App' ? 'selected' : ''}>DW Android App</option>
            </select>
          </div>
          <div class="detail-meta-item"><span class="label">Email ID</span><input type="email" class="form-input" id="em-email" value="${lead.email}"></div>
          <div class="detail-meta-item"><span class="label">Phone No</span><input type="text" class="form-input" id="em-phone" value="${lead.phone}"></div>
          <div class="detail-meta-item">
            <span class="label">Program</span>
            <select class="form-select" id="em-program">
              <option value="Fertility Nutrition & Preconception Program" ${lead.program.includes('Fertility') ? 'selected' : ''}>Fertility Nutrition & Preconception Program</option>
              <option value="PCOS / PCOD Management Program" ${lead.program.includes('PCOS') ? 'selected' : ''}>PCOS / PCOD Management Program</option>
              <option value="Weight Loss & Metabolic Care Program" ${lead.program.includes('Weight Loss') ? 'selected' : ''}>Weight Loss & Metabolic Care Program</option>
              <option value="Thyroid Care Diet Program" ${lead.program.includes('Thyroid') ? 'selected' : ''}>Thyroid Care Diet Program</option>
              <option value="Diabetes Management Program" ${lead.program.includes('Diabetes') ? 'selected' : ''}>Diabetes Management Program</option>
              <option value="Postpartum Recovery Program" ${lead.program.includes('Postpartum') ? 'selected' : ''}>Postpartum Recovery Program</option>
              <option value="General Wellness Program" ${lead.program.includes('General') ? 'selected' : ''}>General Wellness Program</option>
            </select>
          </div>
          <div class="detail-meta-item"><span class="label">Fitness Club</span><input type="text" class="form-input" id="em-fitness-club" value="${lead.fitnessClub}"></div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div class="detail-meta-item">
            <span class="label">Stage</span>
            <select class="form-select" id="em-stage">
              <option value="New" ${lead.stage === 'New' ? 'selected' : ''}>New</option>
              <option value="Cold" ${lead.stage === 'Cold' ? 'selected' : ''}>Cold</option>
              <option value="Attempt to contact" ${lead.stage === 'Attempt to contact' ? 'selected' : ''}>Attempt to contact</option>
              <option value="Warm" ${lead.stage === 'Warm' ? 'selected' : ''}>Warm</option>
              <option value="Connected" ${lead.stage === 'Connected' ? 'selected' : ''}>Connected</option>
            </select>
          </div>
          <div class="detail-meta-item"><span class="label">Disposition</span><input type="text" class="form-input" id="em-disposition" value="${lead.disposition}"></div>
          <div class="detail-meta-item"><span class="label">Sub Disposition</span><input type="text" class="form-input" id="em-sub-disposition" value="${lead.subDisposition}"></div>
          <div class="detail-meta-item"><span class="label">Created Date</span><input type="text" class="form-input" id="em-created-date" value="${lead.createdDate}"></div>
          <div class="detail-meta-item"><span class="label">Created By</span><input type="text" class="form-input" id="em-created-by" value="${lead.createdBy}"></div>
          <div class="detail-meta-item"><span class="label">Nutritionist</span><input type="text" class="form-input" id="em-nutritionist" value="${lead.nutritionist || 'Dt. Akhila Konakalla'}"></div>
        </div>
      `;
    } else {
      metaContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div class="detail-meta-item"><span class="label">ID</span><span class="value" id="dm-id">${lead.id}</span></div>
          <div class="detail-meta-item"><span class="label">Account Name</span><span class="value" id="dm-account">${lead.accountName}</span></div>
          <div class="detail-meta-item"><span class="label">Email ID</span><span class="value" id="dm-email">${lead.email}</span></div>
          <div class="detail-meta-item"><span class="label">Phone No</span><span class="value" id="dm-phone">${lead.phone}</span></div>
          <div class="detail-meta-item"><span class="label">Program</span><span class="value" id="dm-program">${lead.program}</span></div>
          <div class="detail-meta-item"><span class="label">Fitness Club</span><span class="value" id="dm-fitness-club">${lead.fitnessClub}</span></div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div class="detail-meta-item"><span class="label">Stage</span><span class="value" id="dm-stage">${lead.stage}</span></div>
          <div class="detail-meta-item"><span class="label">Disposition</span><span class="value" id="dm-disposition">${lead.disposition}</span></div>
          <div class="detail-meta-item"><span class="label">Sub Disposition</span><span class="value" id="dm-sub-disposition">${lead.subDisposition}</span></div>
          <div class="detail-meta-item"><span class="label">Created Date</span><span class="value" id="dm-created-date">${lead.createdDate}</span></div>
          <div class="detail-meta-item"><span class="label">Created By</span><span class="value" id="dm-created-by">${lead.createdBy}</span></div>
          <div class="detail-meta-item"><span class="label">Nutritionist</span><span class="value" id="dm-nutritionist">${lead.nutritionist || 'Dt. Akhila Konakalla'}</span></div>
        </div>
      `;
    }
  }

  // Profile Info Fields Grid Render
  renderProfileInfoTab(state.activeProfileInfoTab, lead, isEdit);

  // Render Programs & Notes
  renderClientPrograms();
  renderClientNotes();
}

function renderProfileInfoTab(infoTab, lead, isEdit) {
  const grid = document.getElementById('profile-info-grid');
  if (!grid) return;

  if (infoTab === 'basic') {
    if (isEdit) {
      grid.innerHTML = `
        <div class="info-field-group"><div class="lbl">Name</div><input type="text" class="form-input" id="ep-name" value="${lead.name}"></div>
        <div class="info-field-group"><div class="lbl">Email ID</div><input type="email" class="form-input" id="ep-email" value="${lead.email}"></div>
        <div class="info-field-group"><div class="lbl">Mobile Number</div><input type="text" class="form-input" id="ep-mobile" value="${lead.phone}"></div>
        <div class="info-field-group"><div class="lbl">Alternative Number</div><input type="text" class="form-input" id="ep-alt-phone" value="${lead.altPhone || '-'}"></div>
        
        <div class="info-field-group"><div class="lbl">Gender</div>
          <select class="form-select" id="ep-gender">
            <option value="Female" ${lead.gender === 'Female' ? 'selected' : ''}>Female</option>
            <option value="Male" ${lead.gender === 'Male' ? 'selected' : ''}>Male</option>
            <option value="Other" ${lead.gender === 'Other' ? 'selected' : ''}>Other</option>
          </select>
        </div>
        <div class="info-field-group"><div class="lbl">Date of Birth</div><input type="text" class="form-input" id="ep-dob" value="${lead.dob}"></div>
        <div class="info-field-group"><div class="lbl">Age</div><input type="number" class="form-input" id="ep-age" value="${lead.age}"></div>
        <div class="info-field-group"><div class="lbl">Preferred Language</div><input type="text" class="form-input" id="ep-lang" value="${lead.language}"></div>

        <div class="info-field-group"><div class="lbl">Height in cm</div><input type="text" class="form-input" id="ep-height" value="${lead.height}"></div>
        <div class="info-field-group"><div class="lbl">Weight in kgs</div><input type="text" class="form-input" id="ep-weight" value="${lead.weight}"></div>
        <div class="info-field-group"><div class="lbl">BMI</div><input type="text" class="form-input" id="ep-bmi" value="${lead.bmi}"></div>
        <div class="info-field-group"><div class="lbl">Target Weight</div><input type="text" class="form-input" id="ep-target-wt" value="${lead.targetWeight}"></div>

        <div class="info-field-group"><div class="lbl">Goal</div>
          <select class="form-select" id="ep-goal">
            <option value="Fertility Nutrition & Preconception" ${lead.goal.includes('Fertility') ? 'selected' : ''}>Fertility Nutrition & Preconception</option>
            <option value="PCOS Reversal" ${lead.goal.includes('PCOS') ? 'selected' : ''}>PCOS Reversal</option>
            <option value="Weight Management" ${lead.goal.includes('Weight') ? 'selected' : ''}>Weight Management</option>
            <option value="Thyroid Care Diet" ${lead.goal.includes('Thyroid') ? 'selected' : ''}>Thyroid Care Diet</option>
            <option value="Diabetes Care" ${lead.goal.includes('Diabetes') ? 'selected' : ''}>Diabetes Care</option>
            <option value="Postnatal Recovery" ${lead.goal.includes('Postnatal') ? 'selected' : ''}>Postnatal Recovery</option>
          </select>
        </div>
        <div class="info-field-group"><div class="lbl">Address</div><input type="text" class="form-input" id="ep-address" value="${lead.address}"></div>
        <div class="info-field-group"><div class="lbl">State</div><input type="text" class="form-input" id="ep-state" value="${lead.state}"></div>
        <div class="info-field-group"><div class="lbl">Country</div><input type="text" class="form-input" id="ep-country" value="${lead.country}"></div>
      `;
    } else {
      grid.innerHTML = `
        <div class="info-field-group"><div class="lbl">Name</div><div class="val" id="inf-name">${lead.name}</div></div>
        <div class="info-field-group"><div class="lbl">Email ID</div><div class="val" id="inf-email">${lead.email}</div></div>
        <div class="info-field-group"><div class="lbl">Mobile Number</div><div class="val" id="inf-mobile">${lead.phone}</div></div>
        <div class="info-field-group"><div class="lbl">Alternative Number</div><div class="val" id="inf-alt-phone">${lead.altPhone || '-'}</div></div>
        
        <div class="info-field-group"><div class="lbl">Gender</div><div class="val" id="inf-gender">${lead.gender}</div></div>
        <div class="info-field-group"><div class="lbl">Date of Birth</div><div class="val" id="inf-dob">${lead.dob}</div></div>
        <div class="info-field-group"><div class="lbl">Age</div><div class="val" id="inf-age">${lead.age} years</div></div>
        <div class="info-field-group"><div class="lbl">Preferred Language</div><div class="val" id="inf-lang">${lead.language}</div></div>

        <div class="info-field-group"><div class="lbl">Height in cm</div><div class="val" id="inf-height">${lead.height}</div></div>
        <div class="info-field-group"><div class="lbl">Weight in kgs</div><div class="val" id="inf-weight">${lead.weight}</div></div>
        <div class="info-field-group"><div class="lbl">BMI</div><div class="val" id="inf-bmi">${lead.bmi}</div></div>
        <div class="info-field-group"><div class="lbl">Target Weight</div><div class="val" id="inf-target-wt">${lead.targetWeight}</div></div>

        <div class="info-field-group"><div class="lbl">Goal</div><div class="val" id="inf-goal">${lead.goal}</div></div>
        <div class="info-field-group"><div class="lbl">Address</div><div class="val" id="inf-address">${lead.address}</div></div>
        <div class="info-field-group"><div class="lbl">State</div><div class="val" id="inf-state">${lead.state}</div></div>
        <div class="info-field-group"><div class="lbl">Country</div><div class="val" id="inf-country">${lead.country}</div></div>
      `;
    }
  } else {
    // Custom sub-tabs (Diet, Workout, Medical, Sleep, Female, Other)
    const valKey = `${infoTab}Info`;
    const textVal = lead[valKey] || `Default ${infoTab} clinical notes for ${lead.name}`;
    if (isEdit) {
      grid.innerHTML = `
        <div style="grid-column: span 4;">
          <div class="lbl" style="font-weight:700; margin-bottom:6px;">Edit ${infoTab.toUpperCase()} Details</div>
          <textarea class="form-textarea" id="ep-custom-field" rows="4">${textVal}</textarea>
        </div>
      `;
    } else {
      grid.innerHTML = `
        <div style="grid-column: span 4; background:var(--bg-subtle); padding:1rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
          <div class="lbl" style="font-weight:700; color:var(--primary); margin-bottom:4px;">${infoTab.toUpperCase()} Clinical Details</div>
          <div class="val">${textVal}</div>
        </div>
      `;
    }
  }
}

function saveClientProfileEdits() {
  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  if (!lead) return;

  // Header & Meta Edits
  if (document.getElementById('edit-name')) lead.name = document.getElementById('edit-name').value;
  if (document.getElementById('edit-plan-badge')) lead.planBadge = document.getElementById('edit-plan-badge').value;
  if (document.getElementById('em-account')) lead.accountName = document.getElementById('em-account').value;
  if (document.getElementById('em-email')) lead.email = document.getElementById('em-email').value;
  if (document.getElementById('em-phone')) lead.phone = document.getElementById('em-phone').value;
  if (document.getElementById('em-program')) lead.program = document.getElementById('em-program').value;
  if (document.getElementById('em-fitness-club')) lead.fitnessClub = document.getElementById('em-fitness-club').value;
  if (document.getElementById('em-stage')) lead.stage = document.getElementById('em-stage').value;
  if (document.getElementById('em-disposition')) lead.disposition = document.getElementById('em-disposition').value;
  if (document.getElementById('em-sub-disposition')) lead.subDisposition = document.getElementById('em-sub-disposition').value;
  if (document.getElementById('em-created-date')) lead.createdDate = document.getElementById('em-created-date').value;
  if (document.getElementById('em-created-by')) lead.createdBy = document.getElementById('em-created-by').value;
  if (document.getElementById('em-nutritionist')) lead.nutritionist = document.getElementById('em-nutritionist').value;

  // Profile Tab Basic Info Edits
  if (document.getElementById('ep-name')) lead.name = document.getElementById('ep-name').value;
  if (document.getElementById('ep-email')) lead.email = document.getElementById('ep-email').value;
  if (document.getElementById('ep-mobile')) lead.phone = document.getElementById('ep-mobile').value;
  if (document.getElementById('ep-alt-phone')) lead.altPhone = document.getElementById('ep-alt-phone').value;
  if (document.getElementById('ep-gender')) lead.gender = document.getElementById('ep-gender').value;
  if (document.getElementById('ep-dob')) lead.dob = document.getElementById('ep-dob').value;
  if (document.getElementById('ep-age')) lead.age = document.getElementById('ep-age').value;
  if (document.getElementById('ep-lang')) lead.language = document.getElementById('ep-lang').value;
  if (document.getElementById('ep-height')) lead.height = document.getElementById('ep-height').value;
  if (document.getElementById('ep-weight')) lead.weight = document.getElementById('ep-weight').value;
  if (document.getElementById('ep-bmi')) lead.bmi = document.getElementById('ep-bmi').value;
  if (document.getElementById('ep-target-wt')) lead.targetWeight = document.getElementById('ep-target-wt').value;
  if (document.getElementById('ep-goal')) lead.goal = document.getElementById('ep-goal').value;
  if (document.getElementById('ep-address')) lead.address = document.getElementById('ep-address').value;
  if (document.getElementById('ep-state')) lead.state = document.getElementById('ep-state').value;
  if (document.getElementById('ep-country')) lead.country = document.getElementById('ep-country').value;

  // Custom tab edit saving
  if (document.getElementById('ep-custom-field')) {
    const valKey = `${state.activeProfileInfoTab}Info`;
    lead[valKey] = document.getElementById('ep-custom-field').value;
  }

  // Save to LocalStorage
  localStorage.setItem('dhruthi_crm_leads', JSON.stringify(state.leads));

  state.isEditingProfile = false;
  renderClientDetail(state.selectedLeadId);
  renderLeadsTable();
  alert(`Profile changes for ${lead.name} (${lead.id}) saved successfully!`);
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

  const lead = state.leads.find(l => l.id === state.selectedLeadId) || state.leads[0];
  renderProfileInfoTab(infoTab, lead, state.isEditingProfile);
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

// Programs & Add Program Modal
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

// Notes & Add Note Modal
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
  const nextNum = state.leads.length + 1;
  const newLead = {
    id: `DW-${nextNum}`,
    name: form.name.value,
    planBadge: 'Free',
    phone: form.phone.value,
    email: form.email.value || 'lead@gmail.com',
    accountName: form.account ? form.account.value : 'DW Insta Page',
    tag: 'Web Lead',
    age: 30,
    gender: 'Female',
    recommendation: 'Wellness Care',
    stage: form.stage ? form.stage.value : 'New',
    disposition: 'Pending Call',
    subDisposition: 'Fresh Lead',
    createdDate: '18-08-2025',
    createdBy: 'Akhila',
    program: form.program ? form.program.value : 'General Wellness Program',
    fitnessClub: '-',
    nutritionist: 'Dt. Akhila Konakalla',
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
  localStorage.setItem('dhruthi_crm_leads', JSON.stringify(state.leads));
  renderLeadsTable();
  closeModal('modal-lead');
}

// Dashboard
function renderDashboard() {
  const tbody = document.getElementById('dashboard-recent-tbody');
  if (!tbody) return;
  tbody.innerHTML = state.leads.slice(0, 4).map(l => `
    <tr>
      <td><b style="color:var(--primary); cursor:pointer;" onclick="openClientDetail('${l.id}')">${l.id}</b></td>
      <td><b style="cursor:pointer;" onclick="openClientDetail('${l.id}')">${l.name}</b></td>
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
  const matches = state.leads.filter(l => l.name.toLowerCase().includes(query) || l.phone.includes(query) || l.id.toLowerCase().includes(query));
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
