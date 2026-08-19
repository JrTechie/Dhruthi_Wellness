// Dhruthi Wellness CRM — Frontend Application & Data Engine

let state = {
  activePage: 'leads',
  selectedLeadId: 'DW-1',
  isEditingProfile: false,
  activeDetailSubTab: 'profile',
  activeProfileInfoTab: 'basic',
  tasks: [
    {
      id: 'TSK-101',
      type: 'Create Appointment',
      client: 'DW-1 Krupa Mathew',
      dueDate: '2025-08-25 11:00 AM',
      priority: 'High',
      category: 'Initial Consultation',
      status: 'Pending',
      notes: 'First fertility & preconception diet consultation call'
    },
    {
      id: 'TSK-102',
      type: 'Create Check-in',
      client: 'DW-2 Bhavani Neela',
      dueDate: '2025-08-22 03:00 PM',
      priority: 'Medium',
      category: 'Weekly Weight Check-in',
      status: 'In Progress',
      notes: 'PCOS meal plan adherence check-in'
    },
    {
      id: 'TSK-103',
      type: 'Create Follow-up',
      client: 'DW-3 Shailaja Enugurthi',
      dueDate: '2025-08-20 01:00 PM',
      priority: 'Normal',
      category: 'Lab Report Follow-up',
      status: 'Completed',
      notes: 'Review thyroid lab results with client'
    }
  ],
  templates: [
    {
      title: 'New Consultation Enquiry Acknowledgement',
      category: 'Lead Response',
      text: `Namaste! Thank you for reaching out to Dhruthi Wellness. Dt. Akhila Konakalla, Clinical Nutritionist, will guide you on your health journey. When is a convenient time for a quick 10-minute consultation call?`
    },
    {
      title: 'Free Consultation Slot Confirmation',
      category: 'Appointment',
      text: `Dear Client, your free consultation appointment with Dt. Akhila Konakalla is confirmed!\nDate & Slot: August 25, 2025 at 11:00 AM\nAddress: 4-94, Lunani Nagar, Eluru, Andhra Pradesh, 534005, India.\nLooking forward to speaking with you!`
    },
    {
      title: 'NourishCraft Clinical Diet Plan Delivery',
      category: 'Diet Plan',
      text: `Namaste! Your customized clinical diet plan prepared by Dt. Akhila Konakalla for your program is ready. Please follow the meal timings and stay hydrated with 3L water daily. Let us know if you need any recipe substitutions!`
    },
    {
      title: 'Weekly Progress & Weight Review',
      category: 'Follow-up',
      text: `Namaste! Time for our weekly progress review with Dt. Akhila. Please share your current weight reading today along with any observations regarding energy, digestion, or hunger levels.`
    },
    {
      title: 'Payment Confirmation & Receipt',
      category: 'Billing',
      text: `Dear Client, thank you for your payment to Dhruthi Wellness! Your official payment receipt has been generated and verified. Welcome to your health transformation program!`
    },
    {
      title: 'Google Review & Testimonial Request',
      category: 'Feedback',
      text: `Namaste! We hope you are loving your health transformation with Dt. Akhila Konakalla. Could you take 1 minute to share your feedback or review? Your story inspires many others on their health journey!`
    }
  ],
  reviews: [
    {
      id: 'REV-1',
      author: 'Kavitha R.',
      category: 'PCOS / PCOD Management',
      rating: 5,
      date: '17 Aug 2025',
      message: 'Dt. Akhila’s customized meal plan completely regulated my cycles within 3 months! No crash diets, just wholesome Indian food adapted to my daily routine.'
    },
    {
      id: 'REV-2',
      author: 'Siddharth V.',
      category: 'Weight Loss & Metabolic Care',
      rating: 5,
      date: '15 Aug 2025',
      message: 'Lost 9.5 kg in 12 weeks while maintaining high muscle mass and energy levels. The recipes in NourishCraft studio are so delicious and easy to prepare at home.'
    },
    {
      id: 'REV-3',
      author: 'Priya & Raj',
      category: 'Fertility Nutrition & Preconception',
      rating: 5,
      date: '10 Aug 2025',
      message: 'We were trying to conceive for 1.5 years. Dt. Akhila’s metabolic improvement protocol boosted our hormonal balance and lab results tremendously. Highly recommend Dhruthi Wellness!'
    },
    {
      id: 'REV-4',
      author: 'Satisfied Patient',
      category: 'Metabolic Health & Diabetes Care',
      rating: 5,
      date: '18 Aug 2025',
      message: 'Fantastic service, quick responses, and automated clinical guidance! My HbA1c dropped from 6.8 to 5.6.'
    }
  ],
  leads: [
    {
      id: 'DW-1',
      name: 'Krupa Mathew',
      planBadge: 'Free',
      phone: '+918111851425',
      email: 'krupa.mathew777@gmail.com',
      accountName: 'DW- Insta page',
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
      otherInfo: 'Prefers Malayalam or English consultation',
      paidAmount: '₹8,500',
      startDate: '2025-08-25',
      renewalDate: '2025-11-23',
      clientStatus: 'Active',
      callNotes: [
        {
          id: 'CN-101',
          date: '18/08/2025 14:20',
          category: 'First Consultation',
          duration: 15,
          author: 'Akhila',
          note: 'Client discussed weight management goals. Requested customized South Indian vegetarian diet plan with high protein.'
        }
      ],
      programsList: [
        {
          sNo: 1,
          name: 'Fertility Nutrition & Preconception Program',
          duration: '90 days',
          startDate: '2025-08-25',
          endDate: '2025-11-23',
          dealSize: '₹8,500',
          closeDate: '2025-08-18',
          status: 'Active',
          payStatus: 'Paid',
          remarks: 'Regular clinical consultation assigned'
        }
      ],
      payments: [
        {
          sNo: 1,
          date: '18/08/2025',
          program: 'Fertility Nutrition & Preconception Program',
          amount: '₹8,500',
          mode: 'GPay / UPI',
          proofUrl: '',
          status: 'Verified',
          receiptId: 'REC-DW-1001'
        }
      ],
      dietPlan: {
        earlyMorning: 'Warm water + 1/2 tsp cumin seeds, soaked almonds (5 pcs)',
        breakfast: 'Oats Moong Dal Chilla (2 pcs) with Mint Chutney + 1 egg white',
        midMorning: '1 bowl Guava / Pomegranate + 1 cup Buttermilk',
        lunch: '1 cup Brown Rice / Jowar Roti (2) + Palak Dal + Cucumber Salad',
        evening: 'Green Tea + Roasted Makhana (1 small cup)',
        dinner: 'Grilled Tofu / Vegetable Soup + Sprouts salad'
      },
      progress: {
        status: 'Improving',
        startWeight: '58 kg',
        currentWeight: '54 kg',
        targetWeight: '45 kg',
        notes: [
          {
            date: '15/08/2025',
            title: 'Week 2 Weight Loss Check-in',
            text: 'Client lost 1.5 kg in 2 weeks. Energy levels significantly improved.',
            artifact: 'Progress_Chart_W2.png'
          }
        ]
      },
      medicalHistory: {
        diagnoses: 'Diagnosed with mild PCOS in 2023. Insulin sensitivity normal.',
        medications: 'Folic Acid 5mg (Daily), Vitamin D3 (Weekly 60k IU)',
        labSummary: 'TSH: 2.1 mIU/L (Normal), HbA1c: 5.4%, Fasting Glucose: 88 mg/dL',
        familyHistory: 'Mother has Type 2 Diabetes'
      },
      labReports: [
        {
          sNo: 1,
          reportName: 'Complete Blood Count & Hormone Panel',
          labName: 'Vijaya Diagnostic Centre',
          testDate: '10/08/2025',
          fileSize: '1.2 MB',
          status: 'Verified',
          url: '#'
        }
      ]
    },
    {
      id: 'DW-2',
      name: 'Bhavani Neela',
      planBadge: 'Free',
      phone: '9849201948',
      email: 'nbhavani@gmail.com',
      accountName: 'DW- Meta',
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
      paidAmount: '₹11,700',
      startDate: '2025-08-18',
      renewalDate: '2025-11-16',
      clientStatus: 'Active',
      dietPref: 'Non-Vegetarian (Chicken 2x/week)',
      workoutPref: 'Gym 3x/week',
      medicalAssessment: 'PCOS diagnosed 2023',
      sleepStress: '6 Hours Sleep, High Stress',
      femaleInfo: 'Irregular cycles (35-40 days)',
      otherInfo: 'Requested evening callback',
      callNotes: [],
      programsList: [
        {
          sNo: 1,
          name: 'PCOS / PCOD Management Program',
          duration: '90 days',
          startDate: '2025-08-18',
          endDate: '2025-11-16',
          dealSize: '₹11,700',
          closeDate: '2025-08-18',
          status: 'Active',
          payStatus: 'Paid',
          remarks: 'Payment link completed'
        }
      ],
      payments: [],
      dietPlan: {
        earlyMorning: 'Warm Water + Cinnamon pinch',
        breakfast: 'Besan Chilla + Mint Chutney',
        midMorning: 'Coconut Water + 4 Walnuts',
        lunch: 'Jowar Roti + Mixed Veg Curry + Curd',
        evening: 'Chamomile Tea + Boiled Chana',
        dinner: 'Lauki Soup + Steamed Paneer'
      },
      progress: { status: 'Maintaining', startWeight: '62 kg', currentWeight: '62 kg', targetWeight: '52 kg', notes: [] },
      medicalHistory: { diagnoses: 'Irregular cycles, PCOS diagnosed 2023', medications: 'Myo-Inositol (Daily)', labSummary: 'LH/FSH ratio elevated (2.8)', familyHistory: '-' },
      labReports: []
    },
    {
      id: 'DW-3',
      name: 'Shailaja Enugurthi',
      planBadge: 'Pro',
      phone: '14085858409',
      email: 'shailaja.e@gmail.com',
      accountName: 'DW- referal',
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
      paidAmount: '$250',
      startDate: '2025-05-15',
      renewalDate: '2025-08-15',
      clientStatus: 'Renewal Due',
      callNotes: [],
      programsList: [],
      payments: [],
      dietPlan: {},
      progress: { status: 'Improving', startWeight: '72 kg', currentWeight: '68 kg', targetWeight: '58 kg', notes: [] },
      medicalHistory: { diagnoses: 'Postpartum recovery', medications: 'Prenatal Multivitamins', labSummary: 'Normal', familyHistory: '-' },
      labReports: []
    },
    {
      id: 'DW-4',
      name: 'Kalpana Chinta',
      planBadge: 'Gold',
      phone: '919985500568',
      email: 'kalpana.c@gmail.com',
      accountName: 'DW- Organic',
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
      paidAmount: '₹18,805',
      startDate: '2025-05-13',
      renewalDate: '2025-11-13',
      clientStatus: 'Active',
      callNotes: [],
      programsList: [],
      payments: [],
      dietPlan: {},
      progress: { status: 'Maintaining', startWeight: '60 kg', currentWeight: '60 kg', targetWeight: '52 kg', notes: [] },
      medicalHistory: { diagnoses: 'Preconception evaluation', medications: 'Folic Acid', labSummary: 'AMH: 3.2 ng/mL', familyHistory: '-' },
      labReports: []
    }
  ],
  notes: []
};

const DHRUTHI_PROGRAMS = [
  'Fertility Nutrition & Preconception Program',
  'PCOS / PCOD Management Program',
  'Weight Loss & Metabolic Care Program',
  'Thyroid Care Diet Program',
  'Diabetes Management Program',
  'Postpartum Recovery Program',
  'General Wellness Program'
];

const ACCOUNT_NAMES = [
  'DW- Insta page',
  'DW- Meta',
  'DW- referal',
  'DW- Organic'
];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  const savedLeads = localStorage.getItem('dhruthi_crm_leads');
  if (savedLeads) {
    try {
      state.leads = JSON.parse(savedLeads);
    } catch (e) {
      console.warn('Fallback to initial leads');
    }
  }

  const savedTasks = localStorage.getItem('dhruthi_crm_tasks');
  if (savedTasks) {
    try { state.tasks = JSON.parse(savedTasks); } catch (e) {}
  }

  const savedReviews = localStorage.getItem('dhruthi_crm_reviews');
  if (savedReviews) {
    try { state.reviews = JSON.parse(savedReviews); } catch (e) {}
  }

  checkAuthStatus();
  setupSubmenuToggles();
  renderLeadsTable();
  renderDashboard();
  renderCallsLogTable();
  renderMyTasksTable();
  renderMessageTemplates();
  renderPaidClientsTable();
  renderTestimonialsGrid();
  renderClientDetail('DW-1');
  loadNourishCraftClient('DW-1');
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

// Navigation
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
      bcCurrent.textContent = 'Calls & Call Notes';
    } else if (pageId === 'my-tasks') {
      bcParent.textContent = 'Tasks';
      bcCurrent.textContent = 'My Tasks & Reminders';
    } else if (pageId === 'plans') {
      bcParent.textContent = 'Clinical';
      bcCurrent.textContent = 'NourishCraft Prep Studio';
    } else if (pageId === 'templates') {
      bcParent.textContent = 'Communications';
      bcCurrent.textContent = 'Message Templates';
    } else if (pageId === 'clients') {
      bcParent.textContent = 'Clients';
      bcCurrent.textContent = 'Paid Clients Roster';
    } else if (pageId === 'testimonials') {
      bcParent.textContent = 'Social Proof';
      bcCurrent.textContent = 'Verified Testimonials';
    } else {
      bcParent.textContent = 'CRM';
      bcCurrent.textContent = pageId.toUpperCase();
    }
  }
}

// 1. My Tasks Tab (User Requirement 1)
function toggleTaskDropdown() {
  const dropdown = document.getElementById('task-create-dropdown');
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  }
}

function openTaskModal(taskType) {
  const dropdown = document.getElementById('task-create-dropdown');
  if (dropdown) dropdown.style.display = 'none';

  const typeInput = document.getElementById('task-input-type');
  const title = document.getElementById('task-modal-title');
  if (typeInput) typeInput.value = taskType;
  if (title) title.textContent = taskType;

  openModal('modal-task');
}

function handleCreateTaskSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  const taskType = document.getElementById('task-input-type').value;
  const client = document.getElementById('task-input-client').value;
  const due = document.getElementById('task-input-due').value;
  const priority = document.getElementById('task-input-priority').value;
  const notes = document.getElementById('task-input-notes').value;

  const dueFormatted = due.replace('T', ' ');

  state.tasks.unshift({
    id: `TSK-${Date.now().toString().slice(-4)}`,
    type: taskType,
    client: client,
    dueDate: dueFormatted,
    priority: priority,
    category: taskType.replace('Create ', ''),
    status: 'Pending',
    notes: notes || 'Clinical follow-up task'
  });

  localStorage.setItem('dhruthi_crm_tasks', JSON.stringify(state.tasks));
  renderMyTasksTable();
  closeModal('modal-task');
  alert(`Task "${taskType}" created successfully!`);
}

function renderMyTasksTable() {
  const tbody = document.getElementById('my-tasks-tbody');
  if (!tbody) return;

  if (state.tasks.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:1.5rem; color:var(--text-muted);">No active tasks found. Use <b>+ Create Task</b> to schedule an appointment, check-in, or follow-up.</td></tr>`;
    return;
  }

  tbody.innerHTML = state.tasks.map((t, idx) => `
    <tr>
      <td>
        <span class="stage-badge ${t.type.includes('Appointment') ? 'new' : t.type.includes('Check-in') ? 'connected' : 'warm'}">
          ${t.type}
        </span>
      </td>
      <td><b>${t.client}</b></td>
      <td>${t.dueDate}</td>
      <td><span class="stage-badge ${t.priority === 'High' ? 'cold' : 'new'}">${t.priority}</span></td>
      <td>${t.category}</td>
      <td>
        <select class="form-select" style="font-size:0.78rem;" onchange="updateTaskStatus(${idx}, this.value)">
          <option value="Pending" ${t.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="In Progress" ${t.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
          <option value="Completed" ${t.status === 'Completed' ? 'selected' : ''}>Completed</option>
        </select>
      </td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="deleteTask(${idx})" style="color:#dc2626;"><i class="ri-delete-bin-line"></i></button>
      </td>
    </tr>
  `).join('');
}

function updateTaskStatus(idx, status) {
  if (state.tasks[idx]) {
    state.tasks[idx].status = status;
    localStorage.setItem('dhruthi_crm_tasks', JSON.stringify(state.tasks));
  }
}

function deleteTask(idx) {
  if (confirm('Are you sure you want to delete this task?')) {
    state.tasks.splice(idx, 1);
    localStorage.setItem('dhruthi_crm_tasks', JSON.stringify(state.tasks));
    renderMyTasksTable();
  }
}

// 2. NourishCraft Clinical Diet Prep Studio (User Requirement 2)
function loadNourishCraftClient(clientId) {
  const lead = state.leads.find(l => l.id === clientId) || state.leads[0];
  if (!lead) return;

  const progSelect = document.getElementById('nc-program-select');
  if (progSelect) progSelect.value = lead.program || 'Fertility Nutrition & Preconception Program';

  const dp = lead.dietPlan || {};
  if (document.getElementById('nc-earlyMorning')) document.getElementById('nc-earlyMorning').value = dp.earlyMorning || 'Warm water + 1/2 tsp cumin seeds, soaked almonds (5 pcs)';
  if (document.getElementById('nc-breakfast')) document.getElementById('nc-breakfast').value = dp.breakfast || 'Oats Moong Dal Chilla (2 pcs) with Mint Chutney + 1 egg white';
  if (document.getElementById('nc-midMorning')) document.getElementById('nc-midMorning').value = dp.midMorning || '1 bowl Guava / Pomegranate + 1 cup Buttermilk';
  if (document.getElementById('nc-lunch')) document.getElementById('nc-lunch').value = dp.lunch || '1 cup Brown Rice / Jowar Roti (2) + Palak Dal + Cucumber Salad';
  if (document.getElementById('nc-evening')) document.getElementById('nc-evening').value = dp.evening || 'Green Tea + Roasted Makhana (1 small cup)';
  if (document.getElementById('nc-dinner')) document.getElementById('nc-dinner').value = dp.dinner || 'Grilled Tofu / Vegetable Soup + Sprouts salad';
}

function insertRecipeItem(mealKey, text) {
  const field = document.getElementById(`nc-${mealKey}`);
  if (field) {
    field.value = field.value ? `${field.value} + ${text}` : text;
  }
}

function saveNourishCraftPlan() {
  const clientId = document.getElementById('nc-client-select').value;
  const lead = state.leads.find(l => l.id === clientId);
  if (!lead) return;

  lead.program = document.getElementById('nc-program-select').value;
  lead.dietPlan = {
    earlyMorning: document.getElementById('nc-earlyMorning').value,
    breakfast: document.getElementById('nc-breakfast').value,
    midMorning: document.getElementById('nc-midMorning').value,
    lunch: document.getElementById('nc-lunch').value,
    evening: document.getElementById('nc-evening').value,
    dinner: document.getElementById('nc-dinner').value
  };

  localStorage.setItem('dhruthi_crm_leads', JSON.stringify(state.leads));
  alert(`NourishCraft Diet Plan saved successfully for ${lead.name} (${lead.id})!`);
}

function downloadNourishCraftPDF() {
  const clientId = document.getElementById('nc-client-select').value;
  const lead = state.leads.find(l => l.id === clientId) || state.leads[0];
  const name = lead ? lead.name : 'Client';

  const content = `=================================================\nDHRUTHI WELLNESS — NOURISHCRAFT CLINICAL DIET CHART\n=================================================\nClient Name: ${name}\nClient ID: ${lead.id}\nProgram: ${document.getElementById('nc-program-select').value}\nTarget Calories: ${document.getElementById('nc-calorie-target').value}\nMacro Ratio: ${document.getElementById('nc-macro-ratio').value}\nClinical Nutritionist: Dt. Akhila Konakalla, MSc Food Nutrition & Dietetics\nDate Generated: ${new Date().toLocaleDateString()}\n=================================================\n\n1. EARLY MORNING / DETOX (6:30 AM):\n   ${document.getElementById('nc-earlyMorning').value}\n\n2. BREAKFAST (8:30 AM):\n   ${document.getElementById('nc-breakfast').value}\n\n3. MID-MORNING SNACK (11:00 AM):\n   ${document.getElementById('nc-midMorning').value}\n\n4. LUNCH (1:00 PM):\n   ${document.getElementById('nc-lunch').value}\n\n5. EVENING SNACK (4:30 PM):\n   ${document.getElementById('nc-evening').value}\n\n6. DINNER (7:30 PM):\n   ${document.getElementById('nc-dinner').value}\n\n=================================================\nClinical Guidelines:\n- Maintain minimum 3 Liters water intake daily.\n- Sleep by 10:30 PM to optimize metabolic circadian rhythm.\n=================================================\n`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `NourishCraft_Diet_Plan_${name.replace(/\s+/g, '_')}.txt`;
  link.click();
}

// 3. Message Templates Library (User Requirement 3)
function renderMessageTemplates() {
  const grid = document.getElementById('templates-cards-grid');
  if (!grid) return;

  grid.innerHTML = state.templates.map((tpl, idx) => `
    <div class="table-card" style="padding:1.25rem; margin:0; display:flex; flex-direction:column; justify-space-between;">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span class="stage-badge connected">${tpl.category}</span>
          <i class="ri-whatsapp-line" style="color:#16a34a; font-size:1.2rem;"></i>
        </div>
        <div style="font-weight:700; font-size:0.95rem; color:var(--text-main); margin-bottom:8px;">${tpl.title}</div>
        <div style="background:var(--bg-subtle); padding:10px; border-radius:var(--radius-sm); border:1px solid var(--border-color); font-size:0.82rem; color:var(--text-main); white-space:pre-line; margin-bottom:12px;">
          ${tpl.text}
        </div>
      </div>
      <div style="display:flex; gap:8px;">
        <button class="btn btn-outline btn-sm" onclick="copyTemplateText(${idx})" style="flex:1;"><i class="ri-file-copy-line"></i> Copy Text</button>
        <button class="btn btn-secondary btn-sm" onclick="sendTemplateWhatsApp(${idx})" style="flex:1;"><i class="ri-whatsapp-line"></i> Send WhatsApp</button>
      </div>
    </div>
  `).join('');
}

function copyTemplateText(idx) {
  const tpl = state.templates[idx];
  if (!tpl) return;
  navigator.clipboard.writeText(tpl.text);
  alert(`Template "${tpl.title}" copied to clipboard!`);
}

function sendTemplateWhatsApp(idx) {
  const tpl = state.templates[idx];
  if (!tpl) return;
  const lead = state.leads.find(l => l.id === state.selectedLeadId) || state.leads[0];
  const phone = lead ? lead.phone.replace(/[^0-9]/g, '') : '918688963230';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(tpl.text)}`;
  window.open(url, '_blank');
}

// 4. Paid Clients Roster (User Requirement 4)
function renderPaidClientsTable() {
  const tbody = document.getElementById('paid-clients-tbody');
  if (!tbody) return;

  const paidList = state.leads;
  tbody.innerHTML = paidList.map((c, idx) => `
    <tr>
      <td><b style="color:var(--primary); cursor:pointer;" onclick="openClientDetail('${c.id}')">${c.id}</b></td>
      <td><b>${c.name}</b></td>
      <td>${c.phone}</td>
      <td>${c.email}</td>
      <td>
        <select class="form-select" style="font-size:0.82rem; width:220px;" onchange="updatePaidClientRow(${idx}, 'program', this.value)">
          ${DHRUTHI_PROGRAMS.map(prog => `<option value="${prog}" ${c.program === prog ? 'selected' : ''}>${prog}</option>`).join('')}
        </select>
      </td>
      <td><input type="text" class="form-input" style="width:90px;" value="${c.paidAmount || '₹8,500'}" onchange="updatePaidClientRow(${idx}, 'paidAmount', this.value)"></td>
      <td><input type="date" class="form-input" style="width:125px;" value="${c.startDate || '2025-08-25'}" onchange="updatePaidClientRow(${idx}, 'startDate', this.value)"></td>
      <td><input type="date" class="form-input" style="width:125px;" value="${c.renewalDate || '2025-11-23'}" onchange="updatePaidClientRow(${idx}, 'renewalDate', this.value)"></td>
      <td>
        <select class="form-select" style="font-size:0.78rem;" onchange="updatePaidClientRow(${idx}, 'clientStatus', this.value)">
          <option value="Active" ${c.clientStatus === 'Active' ? 'selected' : ''}>Active</option>
          <option value="Renewal Due" ${c.clientStatus === 'Renewal Due' ? 'selected' : ''}>Renewal Due</option>
          <option value="Completed" ${c.clientStatus === 'Completed' ? 'selected' : ''}>Completed</option>
        </select>
      </td>
      <td>
        <div style="display:flex; gap:4px;">
          <button class="btn btn-outline btn-sm" onclick="openClientDetail('${c.id}')" title="View 360 Detail"><i class="ri-user-search-line"></i></button>
          <button class="btn btn-secondary btn-sm" onclick="savePaidClientRow(${idx})"><i class="ri-save-line"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function updatePaidClientRow(idx, field, value) {
  if (state.leads[idx]) {
    state.leads[idx][field] = value;
  }
}

function savePaidClientRow(idx) {
  localStorage.setItem('dhruthi_crm_leads', JSON.stringify(state.leads));
  alert('Paid client details updated!');
}

// 5. Interactions & Calls Log Table (User Requirement 5 - Fully Editable)
function renderCallsLogTable() {
  const tbody = document.getElementById('calls-log-tbody');
  if (!tbody) return;

  let allNotes = [];
  state.leads.forEach(l => {
    if (l.callNotes) {
      l.callNotes.forEach((cn, cnIdx) => {
        allNotes.push({ ...cn, leadId: l.id, leadName: l.name, phone: l.phone, leadRef: l, cnIdx: cnIdx });
      });
    }
  });

  if (allNotes.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:1.5rem; color:var(--text-muted);">No interaction call notes recorded yet. Click <b>+ Log Call Note</b> to record.</td></tr>`;
    return;
  }

  tbody.innerHTML = allNotes.map((n, idx) => `
    <tr>
      <td><b style="color:var(--primary); cursor:pointer;" onclick="openClientDetail('${n.leadId}')">${n.leadId}</b></td>
      <td><input type="text" class="form-input" style="width:130px;" value="${n.author || 'Akhila'}" onchange="updateCallNoteRow(${idx}, 'author', this.value)"></td>
      <td><b>${n.leadName}</b></td>
      <td>${n.phone}</td>
      <td>
        <select class="form-select" style="font-size:0.78rem; width:140px;" onchange="updateCallNoteRow(${idx}, 'category', this.value)">
          <option value="First Consultation" ${n.category === 'First Consultation' ? 'selected' : ''}>First Consultation</option>
          <option value="Weekly Follow-up" ${n.category === 'Weekly Follow-up' ? 'selected' : ''}>Weekly Follow-up</option>
          <option value="Diet Chart Review" ${n.category === 'Diet Chart Review' ? 'selected' : ''}>Diet Chart Review</option>
          <option value="Routine Check" ${n.category === 'Routine Check' ? 'selected' : ''}>Routine Check</option>
        </select>
      </td>
      <td><input type="text" class="form-input" style="width:130px;" value="${n.date}" onchange="updateCallNoteRow(${idx}, 'date', this.value)"></td>
      <td><input type="number" class="form-input" style="width:70px;" value="${n.duration}" onchange="updateCallNoteRow(${idx}, 'duration', this.value)"></td>
      <td><input type="text" class="form-input" style="width:240px;" value="${n.note}" onchange="updateCallNoteRow(${idx}, 'note', this.value)"></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="saveCallNoteRow(${idx})"><i class="ri-check-line"></i> Save</button>
      </td>
    </tr>
  `).join('');
}

function updateCallNoteRow(idx, field, value) {
  let count = 0;
  for (let l of state.leads) {
    if (l.callNotes) {
      for (let cn of l.callNotes) {
        if (count === idx) {
          cn[field] = value;
          return;
        }
        count++;
      }
    }
  }
}

function saveCallNoteRow(idx) {
  localStorage.setItem('dhruthi_crm_leads', JSON.stringify(state.leads));
  alert('Interaction call note updated!');
}

// 6. Testimonials & Reviews Grid (User Requirement 6)
function renderTestimonialsGrid() {
  const container = document.getElementById('testimonials-grid-container');
  if (!container) return;

  container.innerHTML = state.reviews.map(r => `
    <div class="table-card" style="padding:1.25rem; margin:0; display:flex; flex-direction:column; justify-space-between;">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:38px; height:38px; border-radius:50%; background:var(--primary-light); color:var(--primary); font-weight:700; display:flex; align-items:center; justify-content:center;">
              ${r.author.charAt(0)}
            </div>
            <div>
              <div style="font-weight:700; font-size:0.92rem; color:var(--text-main);">${r.author}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">${r.category}</div>
            </div>
          </div>
          <span class="stage-badge connected">Verified</span>
        </div>

        <div style="color:#f59e0b; margin-bottom:8px; font-size:0.9rem;">
          ${'⭐'.repeat(r.rating || 5)}
        </div>

        <div style="background:var(--bg-subtle); padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border-color); font-size:0.85rem; line-height:1.4; color:var(--text-main); font-style:italic;">
          "${r.message}"
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; padding-top:8px; border-top:1px solid var(--border-color);">
        <span style="font-size:0.75rem; color:var(--text-muted);">${r.date}</span>
        <button class="btn btn-outline btn-sm" onclick="shareTestimonial('${r.author}', '${r.category}')"><i class="ri-share-forward-line"></i> Share Note</button>
      </div>
    </div>
  `).join('');
}

function openAddReviewModal() {
  openModal('modal-add-review');
}

function handleAddReviewSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  const author = document.getElementById('rev-author').value;
  const category = document.getElementById('rev-category').value;
  const rating = Number(document.getElementById('rev-rating').value);
  const message = document.getElementById('rev-message').value;

  state.reviews.unshift({
    id: `REV-${Date.now().toString().slice(-4)}`,
    author: author,
    category: category,
    rating: rating,
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    message: message
  });

  localStorage.setItem('dhruthi_crm_reviews', JSON.stringify(state.reviews));
  renderTestimonialsGrid();
  closeModal('modal-add-review');
  alert('Client Testimonial added successfully!');
}

function shareTestimonial(author, category) {
  alert(`Testimonial by ${author} (${category}) ready to share!`);
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
      <td>${lead.accountName || 'DW- Insta page'}</td>
      <td><span class="stage-badge cold">${lead.tag || 'Web Lead'}</span></td>
      <td>${lead.age || 30}</td>
      <td>${lead.gender || 'Female'}</td>
      <td>${lead.recommendation || 'Wellness Care'}</td>
      <td><span class="stage-badge ${getStageClass(lead.stage)}">${lead.stage}</span></td>
      <td>${lead.disposition || 'Pending'}</td>
      <td>${lead.subDisposition || '-'}</td>
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

// Render Client 360° Detail View
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

  // Metadata 2-Column Grid
  const metaContainer = document.getElementById('meta-grid-container');
  if (metaContainer) {
    if (isEdit) {
      metaContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div class="detail-meta-item"><span class="label">ID</span><input type="text" class="form-input" id="em-id" value="${lead.id}"></div>
          <div class="detail-meta-item">
            <span class="label">Account Name</span>
            <select class="form-select" id="em-account">
              ${ACCOUNT_NAMES.map(acc => `<option value="${acc}" ${lead.accountName === acc ? 'selected' : ''}>${acc}</option>`).join('')}
            </select>
          </div>
          <div class="detail-meta-item"><span class="label">Email ID</span><input type="email" class="form-input" id="em-email" value="${lead.email}"></div>
          <div class="detail-meta-item"><span class="label">Phone No</span><input type="text" class="form-input" id="em-phone" value="${lead.phone}"></div>
          <div class="detail-meta-item">
            <span class="label">Program</span>
            <select class="form-select" id="em-program">
              ${DHRUTHI_PROGRAMS.map(prog => `<option value="${prog}" ${lead.program === prog ? 'selected' : ''}>${prog}</option>`).join('')}
            </select>
          </div>
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
          <div class="detail-meta-item"><span class="label">Account Name</span><span class="value" id="dm-account">${lead.accountName || 'DW- Insta page'}</span></div>
          <div class="detail-meta-item"><span class="label">Email ID</span><span class="value" id="dm-email">${lead.email}</span></div>
          <div class="detail-meta-item"><span class="label">Phone No</span><span class="value" id="dm-phone">${lead.phone}</span></div>
          <div class="detail-meta-item"><span class="label">Program</span><span class="value" id="dm-program">${lead.program}</span></div>
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

  // Render Sub-Tabs
  renderCallNotes();
  renderClientPrograms();
  renderClientPayments();
  renderClientNotes();
  renderDietPlanStudio();
  renderClientProgress();
  renderMedicalHistory();
  renderLabReports();
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
    const valKey = `${infoTab}Info`;
    const textVal = lead[valKey] || `Clinical notes regarding ${infoTab} for ${lead.name}`;
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

  if (document.getElementById('edit-name')) lead.name = document.getElementById('edit-name').value;
  if (document.getElementById('edit-plan-badge')) lead.planBadge = document.getElementById('edit-plan-badge').value;
  if (document.getElementById('em-account')) lead.accountName = document.getElementById('em-account').value;
  if (document.getElementById('em-email')) lead.email = document.getElementById('em-email').value;
  if (document.getElementById('em-phone')) lead.phone = document.getElementById('em-phone').value;
  if (document.getElementById('em-program')) lead.program = document.getElementById('em-program').value;
  if (document.getElementById('em-stage')) lead.stage = document.getElementById('em-stage').value;
  if (document.getElementById('em-disposition')) lead.disposition = document.getElementById('em-disposition').value;
  if (document.getElementById('em-sub-disposition')) lead.subDisposition = document.getElementById('em-sub-disposition').value;
  if (document.getElementById('em-created-date')) lead.createdDate = document.getElementById('em-created-date').value;
  if (document.getElementById('em-created-by')) lead.createdBy = document.getElementById('em-created-by').value;
  if (document.getElementById('em-nutritionist')) lead.nutritionist = document.getElementById('em-nutritionist').value;

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

  if (document.getElementById('ep-custom-field')) {
    const valKey = `${state.activeProfileInfoTab}Info`;
    lead[valKey] = document.getElementById('ep-custom-field').value;
  }

  localStorage.setItem('dhruthi_crm_leads', JSON.stringify(state.leads));

  state.isEditingProfile = false;
  renderClientDetail(state.selectedLeadId);
  renderLeadsTable();
  renderPaidClientsTable();
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

// Interaction Call Notes Detail View
function renderCallNotes() {
  const container = document.getElementById('call-notes-timeline');
  if (!container) return;
  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  const notes = (lead && lead.callNotes) ? lead.callNotes : [];

  if (notes.length === 0) {
    container.innerHTML = `
      <div style="background:var(--bg-subtle); padding:1.5rem; border-radius:var(--radius-sm); border:1px solid var(--border-color); text-align:center; color:var(--text-muted);">
        No call notes logged yet. Click <b>+ Log Call Note</b> to record call notes about this client.
      </div>
    `;
    return;
  }

  container.innerHTML = notes.map(cn => `
    <div style="background:var(--bg-subtle); border:1px solid var(--border-color); padding:14px 18px; border-radius:var(--radius-sm);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <span class="stage-badge connected">${cn.category} (${cn.duration} mins)</span>
        <span style="font-size:0.78rem; color:var(--text-muted);">${cn.date} • Logged by ${cn.author}</span>
      </div>
      <div style="font-size:0.88rem; font-weight:600; color:var(--text-main); line-height:1.4;">
        ${cn.note}
      </div>
    </div>
  `).join('');
}

function openAddCallNoteModal() {
  openModal('modal-add-call-note');
}

function handleAddCallNoteSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  if (!lead) return;

  if (!lead.callNotes) lead.callNotes = [];

  const category = document.getElementById('cn-category').value;
  const duration = document.getElementById('cn-duration').value || 10;
  const text = document.getElementById('cn-text').value.trim();
  if (!text) return;

  const now = new Date();
  const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;

  lead.callNotes.unshift({
    id: `CN-${Date.now().toString().slice(-4)}`,
    date: dateStr,
    category: category,
    duration: Number(duration),
    author: 'Akhila',
    note: text
  });

  localStorage.setItem('dhruthi_crm_leads', JSON.stringify(state.leads));
  renderCallNotes();
  renderCallsLogTable();
  closeModal('modal-add-call-note');
  alert('Call note recorded successfully!');
}

function renderClientPrograms() {
  const tbody = document.getElementById('client-programs-tbody');
  if (!tbody) return;
  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  const progs = (lead && lead.programsList) ? lead.programsList : [];

  if (progs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="11" style="text-align:center; padding:1.5rem; color:var(--text-muted);">No programs assigned yet. Click <b>+ Add Program</b> to assign a Dhruthi plan.</td></tr>`;
    return;
  }

  tbody.innerHTML = progs.map((p, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td>
        <select class="form-select" style="font-size:0.82rem; font-weight:700; width:220px;" onchange="updateProgramRow(${idx}, 'name', this.value)">
          ${DHRUTHI_PROGRAMS.map(prog => `<option value="${prog}" ${p.name === prog ? 'selected' : ''}>${prog}</option>`).join('')}
        </select>
      </td>
      <td><input type="text" class="form-input" style="width:80px;" value="${p.duration || '90 days'}" onchange="updateProgramRow(${idx}, 'duration', this.value)"></td>
      <td><input type="date" class="form-input" style="width:125px;" value="${p.startDate || '2025-08-25'}" onchange="updateProgramRow(${idx}, 'startDate', this.value)"></td>
      <td><input type="date" class="form-input" style="width:125px;" value="${p.endDate || '2025-11-23'}" onchange="updateProgramRow(${idx}, 'endDate', this.value)"></td>
      <td><input type="text" class="form-input" style="width:90px;" value="${p.dealSize || '₹8,500'}" onchange="updateProgramRow(${idx}, 'dealSize', this.value)"></td>
      <td><input type="date" class="form-input" style="width:125px;" value="${p.closeDate || '2025-08-18'}" onchange="updateProgramRow(${idx}, 'closeDate', this.value)"></td>
      <td>
        <select class="form-select" style="font-size:0.78rem;" onchange="updateProgramRow(${idx}, 'status', this.value)">
          <option value="Active" ${p.status === 'Active' ? 'selected' : ''}>Active</option>
          <option value="Completed" ${p.status === 'Completed' ? 'selected' : ''}>Completed</option>
          <option value="Pending" ${p.status === 'Pending' ? 'selected' : ''}>Pending</option>
        </select>
      </td>
      <td>
        <select class="form-select" style="font-size:0.78rem;" onchange="updateProgramRow(${idx}, 'payStatus', this.value)">
          <option value="Paid" ${p.payStatus === 'Paid' ? 'selected' : ''}>Paid</option>
          <option value="Pending" ${p.payStatus === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Partial" ${p.payStatus === 'Partial' ? 'selected' : ''}>Partial</option>
        </select>
      </td>
      <td><input type="text" class="form-input" style="width:140px;" value="${p.remarks || 'Regular clinical consultation'}" onchange="updateProgramRow(${idx}, 'remarks', this.value)"></td>
      <td><button class="btn btn-primary btn-sm" onclick="saveProgramRowChanges(${idx})"><i class="ri-check-line"></i> Save</button></td>
    </tr>
  `).join('');
}

function updateProgramRow(idx, field, value) {
  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  if (lead && lead.programsList && lead.programsList[idx]) {
    lead.programsList[idx][field] = value;
  }
}

function saveProgramRowChanges(idx) {
  localStorage.setItem('dhruthi_crm_leads', JSON.stringify(state.leads));
  alert('Program changes saved!');
}

function openAddProgramModal() {
  openModal('modal-add-program');
}

function handleAddProgramSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  if (!lead) return;

  if (!lead.programsList) lead.programsList = [];

  const name = document.getElementById('prog-select-name').value;
  const duration = document.getElementById('prog-duration').value;
  const startDate = document.getElementById('prog-start-date').value;
  const closeDate = document.getElementById('prog-close-date').value;
  const dealSize = document.getElementById('prog-deal-size').value;
  const currency = document.getElementById('prog-currency').value;

  lead.programsList.push({
    sNo: lead.programsList.length + 1,
    name: name,
    duration: duration,
    startDate: startDate,
    endDate: '2025-11-23',
    dealSize: `${currency === 'INR' ? '₹' : '$'}${Number(dealSize).toLocaleString()}`,
    closeDate: closeDate,
    status: 'Active',
    payStatus: 'Paid',
    remarks: 'Assigned via Dhruthi plans studio'
  });

  lead.program = name;
  localStorage.setItem('dhruthi_crm_leads', JSON.stringify(state.leads));
  renderClientPrograms();
  renderClientDetail(state.selectedLeadId);
  closeModal('modal-add-program');
  alert(`Program "${name}" assigned successfully!`);
}

function renderClientPayments() {
  const tbody = document.getElementById('client-payments-history-tbody');
  const previewBox = document.getElementById('payment-proof-preview-container');
  if (!tbody) return;

  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  const payments = (lead && lead.payments) ? lead.payments : [];

  if (payments.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:1.5rem; color:var(--text-muted);">No payment history recorded yet. Use <b>Upload Payment Proof</b> to attach receipt.</td></tr>`;
    if (previewBox) previewBox.innerHTML = '';
    return;
  }

  tbody.innerHTML = payments.map((p, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td>${p.date}</td>
      <td><b>${p.program}</b></td>
      <td>${p.amount}</td>
      <td>${p.mode}</td>
      <td>
        ${p.proofUrl ? `<button class="btn btn-outline btn-sm" onclick="viewPaymentProof('${p.proofUrl}')"><i class="ri-image-line"></i> View Proof</button>` : `<span style="color:var(--text-muted); font-size:0.78rem;">No Proof</span>`}
      </td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="downloadClientReceipt('${p.receiptId || 'REC-101'}')"><i class="ri-file-download-line"></i> Receipt</button>
      </td>
      <td><span class="stage-badge connected">${p.status || 'Verified'}</span></td>
    </tr>
  `).join('');

  if (previewBox && payments[0] && payments[0].proofUrl) {
    previewBox.innerHTML = `
      <div style="background:var(--bg-subtle); border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-sm); display:flex; align-items:center; gap:1rem;">
        <img src="${payments[0].proofUrl}" style="height:60px; width:60px; object-fit:cover; border-radius:4px; border:1px solid var(--border-color);">
        <div>
          <div style="font-weight:700; font-size:0.88rem;">Latest Payment Proof Attachment</div>
          <div style="font-size:0.78rem; color:var(--text-muted);">Uploaded for ${payments[0].amount} • ${payments[0].date}</div>
        </div>
      </div>
    `;
  }
}

function handlePaymentProofUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  if (!lead) return;

  if (!lead.payments) lead.payments = [];

  const reader = new FileReader();
  reader.onload = function(e) {
    const proofDataUrl = e.target.result;
    const now = new Date();
    const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;

    lead.payments.unshift({
      sNo: lead.payments.length + 1,
      date: dateStr,
      program: lead.program || 'Fertility Nutrition & Preconception Program',
      amount: '₹8,500',
      mode: 'GPay / UPI',
      proofUrl: proofDataUrl,
      status: 'Verified',
      receiptId: `REC-${Date.now().toString().slice(-4)}`
    });

    localStorage.setItem('dhruthi_crm_leads', JSON.stringify(state.leads));
    renderClientPayments();
    alert(`Payment proof uploaded successfully for ${lead.name}!`);
  };
  reader.readAsDataURL(file);
}

function viewPaymentProof(url) {
  window.open(url, '_blank');
}

function downloadClientReceipt(receiptId) {
  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  const name = lead ? lead.name : 'Client';
  const content = `=================================================\nDHRUTHI WELLNESS — OFFICIAL PAYMENT RECEIPT\n=================================================\nReceipt No: ${receiptId || 'REC-1001'}\nDate: ${new Date().toLocaleDateString()}\nClient Name: ${name}\nClient ID: ${lead ? lead.id : 'DW-1'}\nProgram: ${lead ? lead.program : 'Customized Nutrition Therapy'}\nAmount Paid: ₹8,500 (INR)\nMode of Payment: UPI / Bank Transfer\nStatus: VERIFIED & PAID\nClinical Nutritionist: Dt. Akhila Konakalla\nOfficial Address: 4-94, Lunani Nagar, Eluru, Andhra Pradesh, 534005, India.\n=================================================\nThank you for choosing Dhruthi Wellness!\n`;
  
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `Dhruthi_Receipt_${name.replace(/\s+/g, '_')}.txt`;
  link.click();
}

function renderDietPlanStudio() {
  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  const dp = (lead && lead.dietPlan) ? lead.dietPlan : {};

  if (document.getElementById('dp-early-morning')) document.getElementById('dp-early-morning').value = dp.earlyMorning || 'Warm water + 1/2 tsp cumin seeds, soaked almonds (5 pcs)';
  if (document.getElementById('dp-breakfast')) document.getElementById('dp-breakfast').value = dp.breakfast || 'Oats Moong Dal Chilla (2 pcs) with Mint Chutney + 1 egg white';
  if (document.getElementById('dp-mid-morning')) document.getElementById('dp-mid-morning').value = dp.midMorning || '1 bowl Guava / Pomegranate + 1 cup Buttermilk';
  if (document.getElementById('dp-lunch')) document.getElementById('dp-lunch').value = dp.lunch || '1 cup Brown Rice / Jowar Roti (2) + Palak Dal + Cucumber Salad';
  if (document.getElementById('dp-evening')) document.getElementById('dp-evening').value = dp.evening || 'Green Tea + Roasted Makhana (1 small cup)';
  if (document.getElementById('dp-dinner')) document.getElementById('dp-dinner').value = dp.dinner || 'Grilled Tofu / Vegetable Soup + Sprouts salad';
}

function saveDietPlanStudio() {
  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  if (!lead) return;

  lead.dietPlan = {
    earlyMorning: document.getElementById('dp-early-morning').value,
    breakfast: document.getElementById('dp-breakfast').value,
    midMorning: document.getElementById('dp-mid-morning').value,
    lunch: document.getElementById('dp-lunch').value,
    evening: document.getElementById('dp-evening').value,
    dinner: document.getElementById('dp-dinner').value
  };

  localStorage.setItem('dhruthi_crm_leads', JSON.stringify(state.leads));
  alert(`Diet Plan saved successfully for ${lead.name}!`);
}

function downloadDietPlanPDF() {
  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  const name = lead ? lead.name : 'Client';
  const dp = lead ? lead.dietPlan : {};

  const content = `=================================================\nDHRUTHI WELLNESS — CLINICAL DIET THERAPY PLAN\n=================================================\nClient Name: ${name}\nClient ID: ${lead ? lead.id : 'DW-1'}\nProgram: ${lead ? lead.program : 'Fertility Nutrition & Preconception Program'}\nClinical Nutritionist: Dt. Akhila Konakalla, MSc Food Nutrition & Dietetics\nDate: ${new Date().toLocaleDateString()}\n=================================================\n\n1. EARLY MORNING / DETOX DRINK:\n   ${dp.earlyMorning || 'Warm Water + Soaked Nuts'}\n\n2. BREAKFAST (8:30 AM):\n   ${dp.breakfast || 'Moong Dal Chilla / Oats + Egg white'}\n\n3. MID-MORNING SNACK (11:00 AM):\n   ${dp.midMorning || 'Fresh Fruit Bowl + Buttermilk'}\n\n4. LUNCH (1:00 PM):\n   ${dp.lunch || 'Jowar Roti / Brown Rice + Dal + Salad'}\n\n5. EVENING SNACK (4:30 PM):\n   ${dp.evening || 'Green Tea + Roasted Makhana'}\n\n6. DINNER (7:30 PM):\n   ${dp.dinner || 'Grilled Paneer / Soup + Salad'}\n\n=================================================\nGeneral Instructions:\n- Drink 3 Liters of water daily.\n- Avoid processed sugars and refined flour.\n=================================================\n`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `Dhruthi_Diet_Plan_${name.replace(/\s+/g, '_')}.txt`;
  link.click();
}

function renderClientProgress() {
  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  const prg = (lead && lead.progress) ? lead.progress : {};

  const badgeEl = document.getElementById('prg-status-badge');
  const weightValEl = document.getElementById('prg-weight-val');
  const targetValEl = document.getElementById('prg-target-val');

  if (badgeEl) badgeEl.innerHTML = `<span class="stage-badge ${prg.status === 'Improving' ? 'connected' : 'warm'}">${prg.status || 'Improving'}</span>`;
  if (weightValEl) weightValEl.textContent = `${prg.startWeight || '58 kg'} ➔ ${lead ? lead.weight : '54 kg'}`;
  if (targetValEl) targetValEl.textContent = `${lead ? lead.targetWeight : '45 kg'} (Target Active)`;

  const container = document.getElementById('progress-notes-container');
  if (!container) return;

  const notes = (prg.notes) ? prg.notes : [];
  if (notes.length === 0) {
    container.innerHTML = `
      <div style="background:var(--bg-subtle); padding:1rem; border-radius:var(--radius-sm); border:1px solid var(--border-color); color:var(--text-muted); font-size:0.85rem;">
        No progress logs added yet. Click <b>+ Log Progress Note</b> to log weight & body measurement milestones.
      </div>
    `;
    return;
  }

  container.innerHTML = notes.map(n => `
    <div style="background:var(--bg-subtle); border:1px solid var(--border-color); padding:14px; border-radius:var(--radius-sm);">
      <div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:4px;">${n.date} • Progress Note</div>
      <div style="font-weight:700; font-size:0.92rem; color:var(--primary);">${n.title}</div>
      <div style="font-size:0.85rem; margin-top:4px;">${n.text}</div>
    </div>
  `).join('');
}

function openAddProgressNoteModal() {
  const title = prompt('Enter Progress Milestone Title (e.g. Week 4 Measurement Check-in):');
  if (!title) return;
  const text = prompt('Enter Progress Details & Required Artifact notes:');
  if (!text) return;

  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  if (!lead) return;
  if (!lead.progress) lead.progress = { status: 'Improving', notes: [] };
  if (!lead.progress.notes) lead.progress.notes = [];

  const now = new Date();
  lead.progress.notes.unshift({
    date: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
    title: title,
    text: text
  });

  localStorage.setItem('dhruthi_crm_leads', JSON.stringify(state.leads));
  renderClientProgress();
}

function renderMedicalHistory() {
  const container = document.getElementById('medical-history-container');
  if (!container) return;

  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  const mh = (lead && lead.medicalHistory) ? lead.medicalHistory : {};

  container.innerHTML = `
    <div style="background:var(--bg-subtle); border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-sm);">
      <div style="font-weight:700; color:var(--primary); font-size:0.9rem; margin-bottom:4px;"><i class="ri-hospital-line"></i> Medical Diagnoses & Clinical History</div>
      <div style="font-size:0.88rem;">${mh.diagnoses || 'No major past medical conditions noted.'}</div>
    </div>

    <div style="background:var(--bg-subtle); border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-sm);">
      <div style="font-weight:700; color:var(--primary); font-size:0.9rem; margin-bottom:4px;"><i class="ri-capsule-line"></i> Tablets & Medications Taken</div>
      <div style="font-size:0.88rem;">${mh.medications || 'No active prescribed medications.'}</div>
    </div>

    <div style="background:var(--bg-subtle); border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-sm);">
      <div style="font-weight:700; color:var(--primary); font-size:0.9rem; margin-bottom:4px;"><i class="ri-file-list-3-line"></i> Past Diagnostic Lab Summary</div>
      <div style="font-size:0.88rem;">${mh.labSummary || 'Blood parameters within normal limits.'}</div>
    </div>

    <div style="background:var(--bg-subtle); border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-sm);">
      <div style="font-weight:700; color:var(--primary); font-size:0.9rem; margin-bottom:4px;"><i class="ri-user-heart-line"></i> Family Medical History</div>
      <div style="font-size:0.88rem;">${mh.familyHistory || 'None noted.'}</div>
    </div>
  `;
}

function openAddMedicalHistoryModal() {
  const diag = prompt('Update Medical Diagnoses:');
  if (!diag) return;
  const meds = prompt('Update Tablets & Medications Taken:');

  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  if (!lead) return;
  if (!lead.medicalHistory) lead.medicalHistory = {};

  lead.medicalHistory.diagnoses = diag;
  if (meds) lead.medicalHistory.medications = meds;

  localStorage.setItem('dhruthi_crm_leads', JSON.stringify(state.leads));
  renderMedicalHistory();
  alert('Medical history updated successfully!');
}

function renderLabReports() {
  const tbody = document.getElementById('lab-reports-tbody');
  if (!tbody) return;

  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  const reports = (lead && lead.labReports) ? lead.labReports : [];

  if (reports.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:1.5rem; color:var(--text-muted);">No lab reports attached. Use <b>Upload Lab Report</b> to attach diagnostic report PDFs.</td></tr>`;
    return;
  }

  tbody.innerHTML = reports.map((r, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><b>${r.reportName}</b></td>
      <td>${r.labName}</td>
      <td>${r.testDate}</td>
      <td>${r.fileSize}</td>
      <td><span class="stage-badge connected">${r.status || 'Verified'}</span></td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="downloadLabReport('${r.reportName}')"><i class="ri-download-2-line"></i> Download PDF</button>
      </td>
    </tr>
  `).join('');
}

function handleLabReportUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const lead = state.leads.find(l => l.id === state.selectedLeadId);
  if (!lead) return;
  if (!lead.labReports) lead.labReports = [];

  const now = new Date();
  const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
  const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';

  lead.labReports.unshift({
    sNo: lead.labReports.length + 1,
    reportName: file.name,
    labName: 'Uploaded Diagnostic Lab',
    testDate: dateStr,
    fileSize: sizeMb,
    status: 'Verified',
    url: '#'
  });

  localStorage.setItem('dhruthi_crm_leads', JSON.stringify(state.leads));
  renderLabReports();
  alert(`Lab Report "${file.name}" uploaded successfully for ${lead.name}!`);
}

function downloadLabReport(reportName) {
  alert(`Downloading health report file: ${reportName}`);
}

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
    accountName: form.account ? form.account.value : 'DW- Insta page',
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
    pincode: '534005',
    paidAmount: '₹8,500',
    startDate: '2025-08-18',
    renewalDate: '2025-11-18',
    clientStatus: 'Active',
    callNotes: [],
    programsList: [],
    payments: [],
    dietPlan: {},
    progress: { status: 'New', startWeight: '65 kg', currentWeight: '65 kg', targetWeight: '55 kg', notes: [] },
    medicalHistory: { diagnoses: 'New Lead', medications: 'None', labSummary: 'Pending', familyHistory: '-' },
    labReports: []
  };

  state.leads.unshift(newLead);
  localStorage.setItem('dhruthi_crm_leads', JSON.stringify(state.leads));
  renderLeadsTable();
  renderPaidClientsTable();
  closeModal('modal-lead');
  alert(`Lead DW-${nextNum} created!`);
}

function renderDashboard() {
  const tbody = document.getElementById('dashboard-recent-tbody');
  if (!tbody) return;
  tbody.innerHTML = state.leads.slice(0, 4).map(l => `
    <tr>
      <td><b style="color:var(--primary); cursor:pointer;" onclick="openClientDetail('${l.id}')">${l.id}</b></td>
      <td><b style="cursor:pointer;" onclick="openClientDetail('${l.id}')">${l.name}</b></td>
      <td>${l.phone}</td>
      <td>${l.goal || l.program}</td>
      <td><span class="stage-badge ${getStageClass(l.stage)}">${l.stage}</span></td>
      <td><button class="btn btn-outline btn-sm" onclick="openClientDetail('${l.id}')">View</button></td>
    </tr>
  `).join('');
}

function triggerWhatsAppChat() {
  const lead = state.leads.find(l => l.id === state.selectedLeadId) || state.leads[0];
  const phone = lead ? lead.phone.replace(/[^0-9]/g, '') : '918688963230';
  window.open(`https://wa.me/${phone}?text=Hi%20${encodeURIComponent(lead.name)},%20this%20is%20Dt.%20Akhila%20Konakalla%20from%20Dhruthi%20Wellness.`, '_blank');
}

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
