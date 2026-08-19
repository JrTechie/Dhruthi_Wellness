const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Define Database file path
const dbPath = process.env.DB_PATH || path.join(__dirname, 'nutriflow.db');
let sqliteDb = null;

try {
  sqliteDb = new DatabaseSync(dbPath);
  console.log(`[Database] SQLite Database connected at: ${dbPath}`);
} catch (err) {
  console.error(`[Database] Error opening SQLite Database at ${dbPath}:`, err);
}

// Supabase Cloud Sync Setup (Optional)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log(`[Database] Supabase cloud connection initialized.`);
  } catch (e) {
    console.warn(`[Database] Supabase client init warning:`, e.message);
  }
}

// Initial Database Table Schema Setup & Migration
function initDatabase() {
  if (!sqliteDb) return;

  try {
    // 1. Bookings Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        expert_name TEXT NOT NULL,
        program_title TEXT NOT NULL,
        client_name TEXT NOT NULL,
        client_email TEXT NOT NULL,
        client_phone TEXT NOT NULL,
        booking_date TEXT NOT NULL,
        booking_time TEXT NOT NULL,
        client_message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Contact Inquiries Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_name TEXT NOT NULL,
        client_email TEXT NOT NULL,
        subject TEXT DEFAULT 'New Website Inquiry',
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Payment Proofs Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS payment_proofs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        receipt_no TEXT UNIQUE NOT NULL,
        client_name TEXT NOT NULL,
        client_phone TEXT,
        client_email TEXT,
        plan_name TEXT NOT NULL,
        amount_paid REAL NOT NULL,
        payment_method TEXT,
        transaction_id TEXT NOT NULL,
        payment_date TEXT,
        status TEXT DEFAULT 'verified',
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 4. Reviews Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author_name TEXT NOT NULL,
        category TEXT NOT NULL,
        rating INTEGER NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 5. CRM Leads Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        goal TEXT DEFAULT 'General Wellness',
        source TEXT DEFAULT 'Website',
        campaign TEXT,
        utm_source TEXT,
        utm_medium TEXT,
        utm_campaign TEXT,
        utm_content TEXT,
        landing_page TEXT,
        referrer TEXT,
        score INTEGER DEFAULT 50,
        temperature TEXT DEFAULT 'WARM',
        status TEXT DEFAULT 'New',
        assigned_to TEXT DEFAULT 'Dr. Akhila Konakalla',
        last_interaction_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        next_follow_up_at DATETIME,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 6. CRM Clients Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lead_id INTEGER,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        dob TEXT,
        age INTEGER,
        gender TEXT DEFAULT 'Female',
        location TEXT,
        height_cm REAL,
        weight_kg REAL,
        bmi REAL,
        weight_history TEXT,
        goals TEXT,
        status TEXT DEFAULT 'Active',
        assigned_to TEXT DEFAULT 'Dr. Akhila Konakalla',
        start_date TEXT,
        renewal_date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 7. Clinical Assessments Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS clinical_assessments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER NOT NULL,
        lifestyle_notes TEXT,
        sleep_hours REAL,
        exercise_routine TEXT,
        water_intake_liters REAL,
        stress_level TEXT,
        work_schedule TEXT,
        meal_timing TEXT,
        food_preference TEXT DEFAULT 'Vegetarian',
        allergies TEXT,
        food_dislikes TEXT,
        medical_conditions TEXT,
        medications TEXT,
        supplements TEXT,
        doctor_recommendations TEXT,
        short_term_goal TEXT,
        long_term_goal TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 8. Consultations Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS consultations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        lead_id INTEGER,
        appointment_at DATETIME NOT NULL,
        duration_mins INTEGER DEFAULT 45,
        type TEXT DEFAULT 'Initial Consultation',
        dietitian_name TEXT DEFAULT 'Dr. Akhila Konakalla',
        status TEXT DEFAULT 'Scheduled',
        notes TEXT,
        recommendations TEXT,
        next_follow_up DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 9. Diet Plans Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS diet_plans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER NOT NULL,
        plan_name TEXT NOT NULL,
        version INTEGER DEFAULT 1,
        start_date TEXT,
        end_date TEXT,
        calories INTEGER DEFAULT 1800,
        meal_structure TEXT,
        notes TEXT,
        status TEXT DEFAULT 'Active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 10. Notes & Timeline Activity Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        lead_id INTEGER,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        type TEXT DEFAULT 'General',
        is_important INTEGER DEFAULT 0,
        author TEXT DEFAULT 'Dr. Akhila Konakalla',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 11. Call Logs Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS call_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        lead_id INTEGER,
        direction TEXT DEFAULT 'outgoing',
        duration_seconds INTEGER DEFAULT 0,
        outcome TEXT DEFAULT 'Answered',
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 12. WhatsApp Messages Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS whatsapp_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        lead_id INTEGER,
        direction TEXT DEFAULT 'outgoing',
        message_type TEXT DEFAULT 'text',
        content TEXT NOT NULL,
        template_id TEXT,
        status TEXT DEFAULT 'Sent',
        provider_message_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 13. WhatsApp Templates Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS whatsapp_templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        category TEXT DEFAULT 'Follow-up',
        body_text TEXT NOT NULL,
        variables_json TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 14. Tasks & Follow-ups Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS tasks_followups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        lead_id INTEGER,
        reason TEXT NOT NULL,
        due_at DATETIME NOT NULL,
        assigned_to TEXT DEFAULT 'Dr. Akhila Konakalla',
        priority TEXT DEFAULT 'High',
        status TEXT DEFAULT 'Pending',
        completed_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 15. Payments Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        lead_id INTEGER,
        receipt_no TEXT UNIQUE NOT NULL,
        plan_name TEXT NOT NULL,
        amount REAL NOT NULL,
        currency TEXT DEFAULT 'INR',
        status TEXT DEFAULT 'Paid',
        payment_method TEXT DEFAULT 'UPI',
        transaction_id TEXT NOT NULL,
        payment_date TEXT,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 16. Automations Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS automations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        trigger_event TEXT NOT NULL,
        condition_json TEXT,
        actions_json TEXT NOT NULL,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 17. Automation Logs Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS automation_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        automation_id INTEGER,
        trigger_event TEXT NOT NULL,
        status TEXT DEFAULT 'Success',
        details TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 18. Imports Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS imports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        file_name TEXT NOT NULL,
        uploaded_by TEXT DEFAULT 'Admin',
        total_rows INTEGER DEFAULT 0,
        imported_count INTEGER DEFAULT 0,
        updated_count INTEGER DEFAULT 0,
        skipped_count INTEGER DEFAULT 0,
        error_count INTEGER DEFAULT 0,
        status TEXT DEFAULT 'Completed',
        details_json TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 19. Audit Logs Table
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        actor TEXT NOT NULL,
        action TEXT NOT NULL,
        entity TEXT NOT NULL,
        entity_id INTEGER,
        metadata_json TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 20. Indexes for Speed
    sqliteDb.exec(`
      CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
      CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
      CREATE INDEX IF NOT EXISTS idx_leads_temperature ON leads(temperature);
      CREATE INDEX IF NOT EXISTS idx_clients_phone ON clients(phone);
      CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
      CREATE INDEX IF NOT EXISTS idx_tasks_due ON tasks_followups(due_at, status);
      CREATE INDEX IF NOT EXISTS idx_consultations_date ON consultations(appointment_at);
      CREATE INDEX IF NOT EXISTS idx_notes_client ON notes(client_id);
      CREATE INDEX IF NOT EXISTS idx_notes_lead ON notes(lead_id);
    `);

    // Seed default reviews if empty
    const checkStmt = sqliteDb.prepare('SELECT COUNT(*) AS count FROM reviews');
    const row = checkStmt.get();
    if (row && row.count === 0) {
      console.log('[Database] Seeding initial verified client reviews into database...');
      const insertReviewStmt = sqliteDb.prepare(`
        INSERT INTO reviews (author_name, category, rating, message)
        VALUES (?, ?, ?, ?)
      `);
      const initialReviews = [
        ['Priya Sharma', 'PCOS & Hormonal Care', 5, 'Lost 8 kgs in 3 months with Dt. Akhila! My PCOS symptoms have drastically improved and my cycles are regular now. Highly recommend!'],
        ['Rajesh Varma', 'Diabetes Management', 5, 'My HbA1c reduced from 8.2 to 6.4 in just 90 days without crash diets. Doctor Akhila’s guidance is practical and sustainable.'],
        ['Ananya Rao', 'Weight Loss Program', 5, 'The customized meal chart was so easy to follow with everyday home cooked food. Energy levels are high and fee was completely worth it!'],
        ['Kavitha Reddy', 'Thyroid Care Diet', 5, 'Dt. Akhila understands root causes. Excellent consultation experience and constant follow-ups.']
      ];

      for (const rev of initialReviews) {
        insertReviewStmt.run(...rev);
      }
    }

    // Seed initial CRM sample data if empty
    seedCrmInitialData();

    console.log('[Database] Automated database tables & schemas initialized successfully.');
  } catch (err) {
    console.error('[Database] Schema Initialization Error:', err);
  }
}

// Seed initial CRM demo data for instant productivity
function seedCrmInitialData() {
  if (!sqliteDb) return;
  const leadCheck = sqliteDb.prepare('SELECT COUNT(*) AS count FROM leads').get();
  if (leadCheck && leadCheck.count > 0) return;

  console.log('[Database] Seeding initial Dhruthi Wellness CRM sample records...');

  const insertLeadStmt = sqliteDb.prepare(`
    INSERT INTO leads (name, phone, email, goal, source, score, temperature, status, assigned_to, notes, next_follow_up_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const now = new Date();
  const todayIso = new Date(now.getTime() + 2 * 3600 * 1000).toISOString();
  const overdueIso = new Date(now.getTime() - 24 * 3600 * 1000).toISOString();
  const futureIso = new Date(now.getTime() + 48 * 3600 * 1000).toISOString();

  const initialLeads = [
    ['Sravanthi G', '9876543210', 'sravanthi.g@gmail.com', 'Fertility Nutrition & Preconception', 'Website Form', 85, 'HOT', 'New', 'Dr. Akhila Konakalla', 'Enquired about 90-day preconception fertility detox plan.', todayIso],
    ['Meenakshi Iyer', '9876543211', 'meenakshi.i@gmail.com', 'PCOS & Weight Loss', 'Instagram', 75, 'WARM', 'Contacted', 'Dr. Akhila Konakalla', 'Has irregular cycles, requested fee structure.', overdueIso],
    ['Dr. Vikram Mehta', '9876543212', 'vikram.m@gmail.com', 'Diabetes & Fatty Liver Care', 'Referral', 90, 'HOT', 'Consultation Booked', 'Dr. Akhila Konakalla', 'Referred by Dr. Reddy. Booked slot for tomorrow.', futureIso],
    ['Deepika P', '9876543213', 'deepika.p@gmail.com', 'Thyroid Support', 'Meta Lead Ads', 65, 'WARM', 'Qualified', 'Assistant', 'Hypothyroidism for 3 years, seeking metabolic diet.', todayIso],
    ['Haritha K', '9876543214', 'haritha.k@gmail.com', 'IVF Nutrition Support', 'WhatsApp', 95, 'HOT', 'Payment Pending', 'Dr. Akhila Konakalla', 'Consultation completed, agreed to 3-month IVF prep package.', todayIso],
    ['Ramesh Rao', '9876543215', 'ramesh.r@gmail.com', 'Cholesterol & Heart Wellness', 'Google Search', 50, 'NURTURE', 'Follow-up Later', 'Assistant', 'Wants diet plan after blood reports arrive.', futureIso],
    ['Sunitha V', '9876543216', 'sunitha.v@gmail.com', 'Postpartum Weight Management', 'Website Form', 70, 'WARM', 'New', 'Dr. Akhila Konakalla', 'Lactating mother, looking for safe weight loss.', todayIso],
    ['Lakshmi Prasanna', '9876543217', 'lakshmi.p@gmail.com', 'Fertility Nutrition', 'Walk-in', 88, 'HOT', 'New', 'Dr. Akhila Konakalla', 'Visited clinic for preconception consultation.', todayIso]
  ];

  for (const lead of initialLeads) {
    const res = insertLeadStmt.run(...lead);
    const leadId = res.lastInsertRowid;

    sqliteDb.prepare(`
      INSERT INTO notes (lead_id, title, content, type, author)
      VALUES (?, 'Lead Created', ?, 'General', 'System')
    `).run(leadId, `Lead created via ${lead[4]}. Goal: ${lead[3]}`);

    sqliteDb.prepare(`
      INSERT INTO tasks_followups (lead_id, reason, due_at, priority, status)
      VALUES (?, ?, ?, 'High', 'Pending')
    `).run(leadId, `Follow-up with ${lead[0]} regarding ${lead[3]}`, lead[10]);
  }

  const insertClientStmt = sqliteDb.prepare(`
    INSERT INTO clients (name, phone, email, age, gender, height_cm, weight_kg, bmi, goals, status, start_date, renewal_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active', ?, ?)
  `);

  const initialClients = [
    ['Pooja Hegde', '9123456780', 'pooja.h@gmail.com', 29, 'Female', 162, 68, 25.9, 'PCOS Reversal & Weight Loss', '2026-06-01', '2026-09-01'],
    ['Swati Deshmukh', '9123456781', 'swati.d@gmail.com', 33, 'Female', 158, 62, 24.8, 'Fertility Nutrition & Conception Prep', '2026-05-15', '2026-08-25'],
    ['Venkat Ramana', '9123456782', 'venkat.r@gmail.com', 45, 'Male', 175, 84, 27.4, 'Diabetes & Visceral Fat Reduction', '2026-07-10', '2026-10-10']
  ];

  for (const c of initialClients) {
    const res = insertClientStmt.run(...c);
    const clientId = res.lastInsertRowid;

    sqliteDb.prepare(`
      INSERT INTO clinical_assessments (client_id, lifestyle_notes, sleep_hours, exercise_routine, water_intake_liters, stress_level, food_preference, medical_conditions, short_term_goal)
      VALUES (?, 'Desk job, works 9-6', 7, '30 min morning walk 4x week', 2.5, 'Moderate', 'Vegetarian', 'Mild PCOS / Insulin Resistance', 'Lose 4kg in 60 days & regulate period')
    `).run(clientId);

    sqliteDb.prepare(`
      INSERT INTO diet_plans (client_id, plan_name, version, calories, meal_structure, status)
      VALUES (?, 'Metabolic Boost & Hormone Balance Meal Chart', 1, 1600, 'Breakfast: Ragi Dosa + Sprouts; Lunch: Brown Rice + Palak Dal + Salad; Snack: Roasted Makhana + Seeds; Dinner: Vegetables Soup + Paneer', 'Active')
    `).run(clientId);

    sqliteDb.prepare(`
      INSERT INTO consultations (client_id, appointment_at, type, status, notes, recommendations)
      VALUES (?, ?, 'Initial Clinical Assessment', 'Completed', 'Detailed metabolic intake taken. Patient committed to meal plan.', 'Incorporate 1 tbsp flax seeds daily & increase water intake to 3L.')
    `).run(clientId, todayIso);

    sqliteDb.prepare(`
      INSERT INTO payments (client_id, receipt_no, plan_name, amount, status, payment_method, transaction_id, payment_date)
      VALUES (?, ?, '3-Month Metabolic Care Package', 12500, 'Paid', 'Google Pay', 'UPI-982137918', '2026-06-01')
    `).run(clientId, `DW-202606-0${clientId}`);
  }

  const insertTmplStmt = sqliteDb.prepare(`
    INSERT INTO whatsapp_templates (name, category, body_text, variables_json)
    VALUES (?, ?, ?, ?)
  `);

  insertTmplStmt.run('New Enquiry Acknowledgement', 'Lead', 'Namaste {{client_name}}! Thank you for reaching out to Dhruthi Wellness. Dr. Akhila Konakalla will guide you on your {{goal}} journey. When is a convenient time to talk?', '["client_name", "goal"]');
  insertTmplStmt.run('Consultation Reminder', 'Appointment', 'Dear {{client_name}}, your wellness consultation with Dr. Akhila Konakalla is scheduled for {{consultation_date}} at {{consultation_time}}. Please keep your recent blood reports handy.', '["client_name", "consultation_date", "consultation_time"]');
  insertTmplStmt.run('Diet Plan Ready Notification', 'Diet Plan', 'Hi {{client_name}}, your customized {{plan_name}} has been updated! Please check your file attachments or reply to discuss your meal chart.', '["client_name", "plan_name"]');
  insertTmplStmt.run('Renewal Reminder', 'Renewal', 'Namaste {{client_name}}, your current plan is due for renewal on {{renewal_date}}. Let us review your progress and set your next goals!', '["client_name", "renewal_date"]');

  sqliteDb.prepare(`
    INSERT INTO automations (name, trigger_event, condition_json, actions_json, is_active)
    VALUES ('Fertility Hot Lead Auto-Assign', 'lead_created', '{"goal_contains":"Fertility","score_gt":70}', '[{"action":"assign","to":"Dr. Akhila Konakalla"},{"action":"create_task","reason":"High Priority Fertility Consultation Follow-up","priority":"High"}]', 1)
  `).run();

  sqliteDb.prepare(`
    INSERT INTO automations (name, trigger_event, condition_json, actions_json, is_active)
    VALUES ('Renewal Reminder Automation', 'renewal_approaching', '{"days_before":7}', '[{"action":"create_task","reason":"Renewal Discussion & Plan Review","priority":"High"}]', 1)
  `).run();

  console.log('[Database] CRM initial demo records successfully seeded.');
}

function normalizePhone(phoneStr) {
  if (!phoneStr) return '';
  const digits = String(phoneStr).replace(/\D/g, '');
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  return digits || String(phoneStr).trim();
}

function normalizeEmail(emailStr) {
  if (!emailStr) return '';
  return String(emailStr).trim().toLowerCase();
}

function calculateLeadScore(leadData) {
  let score = 40;
  const goal = (leadData.goal || leadData.program_title || '').toLowerCase();
  const source = (leadData.source || '').toLowerCase();
  const message = (leadData.message || leadData.client_message || '').toLowerCase();

  if (goal.includes('fertility') || goal.includes('conception') || goal.includes('ivf')) score += 25;
  else if (goal.includes('pcos') || goal.includes('pcod') || goal.includes('thyroid') || goal.includes('diabetes')) score += 20;
  else if (goal.includes('weight')) score += 15;

  if (source.includes('referral') || source.includes('client')) score += 20;
  else if (source.includes('whatsapp') || source.includes('walk-in')) score += 15;
  else if (source.includes('website')) score += 10;

  if (message.includes('urgent') || message.includes('price') || message.includes('fee') || message.includes('consultation') || message.includes('book')) score += 15;

  score = Math.min(100, Math.max(10, score));

  let temperature = 'COLD';
  if (score >= 80) temperature = 'HOT';
  else if (score >= 60) temperature = 'WARM';
  else if (score >= 40) temperature = 'NURTURE';

  return { score, temperature };
}

// Run DB setup on file require
initDatabase();

// --- CSV Backup Logging Helpers ---
function logLeadToCSV(lead) {
  try {
    const csvPath = path.join(process.cwd(), 'leads.csv');
    const header = 'Timestamp,Client Name,Phone,Email,Program Title,Expert Name,Date,Time,Message\n';
    if (!fs.existsSync(csvPath)) {
      fs.writeFileSync(csvPath, header);
    }
    const row = `"${new Date().toISOString()}","${(lead.client_name || '').replace(/"/g, '""')}","${lead.client_phone || 'N/A'}","${lead.client_email || ''}","${(lead.program_title || '').replace(/"/g, '""')}","${(lead.expert_name || '').replace(/"/g, '""')}","${lead.booking_date || 'N/A'}","${lead.booking_time || 'N/A'}","${(lead.client_message || '').replace(/"/g, '""')}"\n`;
    fs.appendFileSync(csvPath, row);
  } catch (e) {
    console.error('[CSV Backup] Error logging lead:', e);
  }
}

function logReviewToCSV(rev) {
  try {
    const csvPath = path.join(process.cwd(), 'reviews.csv');
    const header = 'Timestamp,Author Name,Program Category,Rating,Message\n';
    if (!fs.existsSync(csvPath)) {
      fs.writeFileSync(csvPath, header);
    }
    const row = `"${new Date().toISOString()}","${(rev.author_name || '').replace(/"/g, '""')}","${(rev.category || '').replace(/"/g, '""')}","${rev.rating}","${(rev.message || '').replace(/"/g, '""')}"\n`;
    fs.appendFileSync(csvPath, row);
  } catch (e) {
    console.error('[CSV Backup] Error logging review:', e);
  }
}

// --- CRUD Database Operations ---

// 1. Website Bookings with CRM Sync
function insertBooking(booking) {
  logLeadToCSV(booking);

  let insertedId = null;
  if (sqliteDb) {
    const stmt = sqliteDb.prepare(`
      INSERT INTO bookings (expert_name, program_title, client_name, client_email, client_phone, booking_date, booking_time, client_message)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      booking.expert_name || 'Dr. Akhila Konakalla',
      booking.program_title || 'Consultation',
      booking.client_name,
      booking.client_email || '',
      booking.client_phone,
      booking.booking_date || 'Today',
      booking.booking_time || 'Flexible',
      booking.client_message || ''
    );
    insertedId = result.lastInsertRowid;
  }

  syncLeadFromWebsite({
    name: booking.client_name,
    phone: booking.client_phone,
    email: booking.client_email,
    goal: booking.program_title || 'Consultation',
    source: 'Website Booking Form',
    notes: `Booking for ${booking.booking_date || ''} ${booking.booking_time || ''}. Message: ${booking.client_message || ''}`
  });

  if (supabase) {
    supabase.from('bookings').insert([booking]).then(({ error }) => {
      if (error) console.error('[Supabase Sync] Booking insert error:', error.message);
    }).catch(e => console.error('[Supabase Sync] Exception:', e.message));
  }

  return { id: insertedId, ...booking };
}

function getBookings() {
  if (!sqliteDb) return [];
  const stmt = sqliteDb.prepare('SELECT * FROM bookings ORDER BY id DESC');
  return stmt.all();
}

function getBookedSlots(dateStr) {
  if (!sqliteDb) return [];
  if (dateStr) {
    const stmt = sqliteDb.prepare('SELECT booking_date, booking_time FROM bookings WHERE booking_date = ?');
    return stmt.all(dateStr);
  } else {
    const stmt = sqliteDb.prepare('SELECT booking_date, booking_time FROM bookings');
    return stmt.all();
  }
}

// 2. Contact Inquiries with CRM Sync
function insertContact(contact) {
  logLeadToCSV({
    client_name: contact.client_name,
    client_email: contact.client_email,
    client_phone: contact.client_phone || 'N/A',
    program_title: contact.subject || 'Website Inquiry',
    expert_name: 'Dr. Akhila Konakalla',
    booking_date: 'N/A',
    booking_time: 'N/A',
    client_message: contact.message
  });

  let insertedId = null;
  if (sqliteDb) {
    const stmt = sqliteDb.prepare(`
      INSERT INTO contact_inquiries (client_name, client_email, subject, message)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(
      contact.client_name,
      contact.client_email,
      contact.subject || 'New Website Inquiry',
      contact.message
    );
    insertedId = result.lastInsertRowid;
  }

  syncLeadFromWebsite({
    name: contact.client_name,
    phone: contact.client_phone || '',
    email: contact.client_email,
    goal: contact.subject || 'Website Inquiry',
    source: 'Website Contact Form',
    notes: contact.message
  });

  if (supabase) {
    supabase.from('contact_inquiries').insert([contact]).then(({ error }) => {
      if (error) console.error('[Supabase Sync] Contact insert error:', error.message);
    }).catch(e => console.error('[Supabase Sync] Exception:', e.message));
  }

  return { id: insertedId, ...contact };
}

function getContacts() {
  if (!sqliteDb) return [];
  const stmt = sqliteDb.prepare('SELECT * FROM contact_inquiries ORDER BY id DESC');
  return stmt.all();
}

// 3. Payment Proofs with CRM Sync
function insertPaymentProof(payment) {
  const receipt_no = payment.receipt_no || `DW-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
  const recordData = { receipt_no, ...payment };

  let insertedId = null;
  if (sqliteDb) {
    const stmt = sqliteDb.prepare(`
      INSERT INTO payment_proofs (receipt_no, client_name, client_phone, client_email, plan_name, amount_paid, payment_method, transaction_id, payment_date, status, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      receipt_no,
      payment.client_name,
      payment.client_phone || '',
      payment.client_email || '',
      payment.plan_name,
      payment.amount_paid,
      payment.payment_method || 'Online UPI / Bank',
      payment.transaction_id,
      payment.payment_date || new Date().toISOString(),
      payment.status || 'verified',
      payment.notes || ''
    );
    insertedId = result.lastInsertRowid;
  }

  syncPaymentToCrm(recordData);

  if (supabase) {
    supabase.from('payment_proofs').insert([recordData]).then(({ error }) => {
      if (error) console.error('[Supabase Sync] Payment proof insert error:', error.message);
    }).catch(e => console.error('[Supabase Sync] Exception:', e.message));
  }

  return { id: insertedId, ...recordData };
}

function getPaymentProofs() {
  if (!sqliteDb) return [];
  const stmt = sqliteDb.prepare('SELECT * FROM payment_proofs ORDER BY id DESC');
  return stmt.all();
}

// 4. Reviews
function insertReview(review) {
  logReviewToCSV(review);

  let insertedId = null;
  if (sqliteDb) {
    const stmt = sqliteDb.prepare(`
      INSERT INTO reviews (author_name, category, rating, message)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(
      review.author_name,
      review.category,
      review.rating,
      review.message
    );
    insertedId = result.lastInsertRowid;
  }

  if (supabase) {
    supabase.from('reviews').insert([review]).then(({ error }) => {
      if (error) console.error('[Supabase Sync] Review insert error:', error.message);
    }).catch(e => console.error('[Supabase Sync] Exception:', e.message));
  }

  return { id: insertedId, ...review };
}

function getReviews() {
  if (!sqliteDb) return [];
  const stmt = sqliteDb.prepare('SELECT * FROM reviews ORDER BY id DESC');
  return stmt.all();
}

// --- Dynamic CRM Engine Functions ---

function syncLeadFromWebsite(leadData) {
  if (!sqliteDb) return null;
  const normPhone = normalizePhone(leadData.phone);
  const normEmail = normalizeEmail(leadData.email);

  let existingLead = null;
  if (normPhone) {
    existingLead = sqliteDb.prepare('SELECT * FROM leads WHERE phone = ? LIMIT 1').get(normPhone);
  }
  if (!existingLead && normEmail) {
    existingLead = sqliteDb.prepare('SELECT * FROM leads WHERE email = ? LIMIT 1').get(normEmail);
  }

  const { score, temperature } = calculateLeadScore(leadData);

  if (existingLead) {
    sqliteDb.prepare(`
      UPDATE leads
      SET score = MAX(score, ?),
          temperature = CASE WHEN ? = 'HOT' THEN 'HOT' ELSE temperature END,
          last_interaction_at = CURRENT_TIMESTAMP,
          notes = notes || '\n' || ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(score, temperature, `[${new Date().toLocaleDateString()}] New Interaction (${leadData.source}): ${leadData.notes || ''}`, existingLead.id);

    sqliteDb.prepare(`
      INSERT INTO notes (lead_id, title, content, type, author)
      VALUES (?, 'Repeat Website Inquiry', ?, 'General', 'System')
    `).run(existingLead.id, `Lead submitted new enquiry via ${leadData.source}. Details: ${leadData.notes || 'N/A'}`);

    return { leadId: existingLead.id, isDuplicate: true };
  } else {
    const dueAt = new Date(Date.now() + 4 * 3600 * 1000).toISOString();
    const res = sqliteDb.prepare(`
      INSERT INTO leads (name, phone, email, goal, source, campaign, utm_source, utm_medium, utm_campaign, utm_content, landing_page, referrer, score, temperature, status, assigned_to, notes, next_follow_up_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', 'Dr. Akhila Konakalla', ?, ?)
    `).run(
      leadData.name,
      normPhone || leadData.phone || 'N/A',
      normEmail,
      leadData.goal || 'General Wellness',
      leadData.source || 'Website',
      leadData.campaign || '',
      leadData.utm_source || '',
      leadData.utm_medium || '',
      leadData.utm_campaign || '',
      leadData.utm_content || '',
      leadData.landing_page || '',
      leadData.referrer || '',
      score,
      temperature,
      leadData.notes || '',
      dueAt
    );

    const leadId = res.lastInsertRowid;

    sqliteDb.prepare(`
      INSERT INTO notes (lead_id, title, content, type, author)
      VALUES (?, 'Lead Created', ?, 'General', 'System')
    `).run(leadId, `New lead captured from ${leadData.source}. Goal: ${leadData.goal || 'General Wellness'}`);

    sqliteDb.prepare(`
      INSERT INTO tasks_followups (lead_id, reason, due_at, priority, status)
      VALUES (?, ?, ?, 'High', 'Pending')
    `).run(leadId, `Follow up with new lead ${leadData.name} (${temperature})`, dueAt);

    return { leadId, isDuplicate: false };
  }
}

function syncPaymentToCrm(paymentData) {
  if (!sqliteDb) return;
  const normPhone = normalizePhone(paymentData.client_phone);

  let client = null;
  if (normPhone) {
    client = sqliteDb.prepare('SELECT * FROM clients WHERE phone = ? LIMIT 1').get(normPhone);
  }

  const clientId = client ? client.id : null;

  sqliteDb.prepare(`
    INSERT OR REPLACE INTO payments (client_id, receipt_no, plan_name, amount, status, payment_method, transaction_id, payment_date, notes)
    VALUES (?, ?, ?, ?, 'Paid', ?, ?, ?, ?)
  `).run(
    clientId,
    paymentData.receipt_no,
    paymentData.plan_name,
    paymentData.amount_paid || paymentData.amount,
    paymentData.payment_method || 'Online UPI',
    paymentData.transaction_id || `TXN-${Date.now()}`,
    paymentData.payment_date || new Date().toISOString(),
    paymentData.notes || ''
  );

  if (clientId) {
    sqliteDb.prepare(`
      INSERT INTO notes (client_id, title, content, type, author)
      VALUES (?, 'Payment Verified', ?, 'Payment', 'System')
    `).run(clientId, `Payment of ₹${paymentData.amount_paid || paymentData.amount} received for ${paymentData.plan_name}. Receipt: ${paymentData.receipt_no}`);
  }
}

function getLeads(filters = {}) {
  if (!sqliteDb) return [];
  let query = 'SELECT * FROM leads WHERE 1=1';
  const params = [];

  if (filters.status) {
    query += ' AND status = ?';
    params.push(filters.status);
  }
  if (filters.temperature) {
    query += ' AND temperature = ?';
    params.push(filters.temperature);
  }
  if (filters.source) {
    query += ' AND source = ?';
    params.push(filters.source);
  }
  if (filters.search) {
    query += ' AND (name LIKE ? OR phone LIKE ? OR email LIKE ? OR goal LIKE ?)';
    const term = `%${filters.search}%`;
    params.push(term, term, term, term);
  }

  query += ' ORDER BY id DESC';
  return sqliteDb.prepare(query).all(...params);
}

function getLeadById(id) {
  if (!sqliteDb) return null;
  const lead = sqliteDb.prepare('SELECT * FROM leads WHERE id = ?').get(id);
  if (!lead) return null;

  const notes = sqliteDb.prepare('SELECT * FROM notes WHERE lead_id = ? ORDER BY id DESC').all(id);
  const tasks = sqliteDb.prepare('SELECT * FROM tasks_followups WHERE lead_id = ? ORDER BY id DESC').all(id);
  const calls = sqliteDb.prepare('SELECT * FROM call_logs WHERE lead_id = ? ORDER BY id DESC').all(id);
  const whatsapp = sqliteDb.prepare('SELECT * FROM whatsapp_messages WHERE lead_id = ? ORDER BY id DESC').all(id);

  return { ...lead, notes, tasks, calls, whatsapp };
}

function createLead(leadData) {
  const normPhone = normalizePhone(leadData.phone);
  const normEmail = normalizeEmail(leadData.email);
  const { score, temperature } = calculateLeadScore(leadData);

  const res = sqliteDb.prepare(`
    INSERT INTO leads (name, phone, email, goal, source, campaign, score, temperature, status, assigned_to, notes, next_follow_up_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    leadData.name,
    normPhone,
    normEmail,
    leadData.goal || 'General Wellness',
    leadData.source || 'Manual Entry',
    leadData.campaign || '',
    score,
    temperature,
    leadData.status || 'New',
    leadData.assigned_to || 'Dr. Akhila Konakalla',
    leadData.notes || '',
    leadData.next_follow_up_at || new Date(Date.now() + 24 * 3600 * 1000).toISOString()
  );

  const leadId = res.lastInsertRowid;
  sqliteDb.prepare(`
    INSERT INTO notes (lead_id, title, content, type, author)
    VALUES (?, 'Lead Created', ?, 'General', ?)
  `).run(leadId, `Lead manually created for ${leadData.name}`, leadData.actor || 'Dr. Akhila Konakalla');

  return getLeadById(leadId);
}

function updateLead(id, updates) {
  if (!sqliteDb) return null;
  const fields = [];
  const params = [];

  for (const [key, val] of Object.entries(updates)) {
    if (['name', 'phone', 'email', 'goal', 'source', 'campaign', 'score', 'temperature', 'status', 'assigned_to', 'notes', 'next_follow_up_at'].includes(key)) {
      fields.push(`${key} = ?`);
      params.push(val);
    }
  }

  if (fields.length === 0) return getLeadById(id);

  fields.push('updated_at = CURRENT_TIMESTAMP');
  params.push(id);

  sqliteDb.prepare(`UPDATE leads SET ${fields.join(', ')} WHERE id = ?`).run(...params);
  return getLeadById(id);
}

function convertLeadToClient(leadId, clientData = {}) {
  if (!sqliteDb) return null;
  const lead = sqliteDb.prepare('SELECT * FROM leads WHERE id = ?').get(leadId);
  if (!lead) return null;

  const renewalDate = new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString().split('T')[0];
  const res = sqliteDb.prepare(`
    INSERT INTO clients (lead_id, name, phone, email, age, gender, goals, status, assigned_to, start_date, renewal_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'Active', ?, CURRENT_DATE, ?)
  `).run(
    lead.id,
    lead.name,
    lead.phone,
    lead.email,
    clientData.age || 30,
    clientData.gender || 'Female',
    lead.goal,
    lead.assigned_to,
    renewalDate
  );

  const clientId = res.lastInsertRowid;

  sqliteDb.prepare(`UPDATE leads SET status = 'Converted', updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(leadId);

  sqliteDb.prepare(`
    INSERT INTO clinical_assessments (client_id, short_term_goal)
    VALUES (?, ?)
  `).run(clientId, lead.goal);

  sqliteDb.prepare(`
    INSERT INTO notes (client_id, lead_id, title, content, type, author)
    VALUES (?, ?, 'Lead Converted to Client', 'Client profile successfully activated and 90-day plan initialized.', 'General', 'Dr. Akhila Konakalla')
  `).run(clientId, leadId);

  return getClientById(clientId);
}

function getClients(filters = {}) {
  if (!sqliteDb) return [];
  let query = 'SELECT * FROM clients WHERE 1=1';
  const params = [];

  if (filters.status) {
    query += ' AND status = ?';
    params.push(filters.status);
  }
  if (filters.search) {
    query += ' AND (name LIKE ? OR phone LIKE ? OR email LIKE ? OR goals LIKE ?)';
    const term = `%${filters.search}%`;
    params.push(term, term, term, term);
  }

  query += ' ORDER BY id DESC';
  return sqliteDb.prepare(query).all(...params);
}

function getClientById(id) {
  if (!sqliteDb) return null;
  const client = sqliteDb.prepare('SELECT * FROM clients WHERE id = ?').get(id);
  if (!client) return null;

  const assessment = sqliteDb.prepare('SELECT * FROM clinical_assessments WHERE client_id = ? ORDER BY id DESC LIMIT 1').get(id) || {};
  const dietPlans = sqliteDb.prepare('SELECT * FROM diet_plans WHERE client_id = ? ORDER BY id DESC').all(id);
  const consultations = sqliteDb.prepare('SELECT * FROM consultations WHERE client_id = ? ORDER BY id DESC').all(id);
  const notes = sqliteDb.prepare('SELECT * FROM notes WHERE client_id = ? ORDER BY id DESC').all(id);
  const tasks = sqliteDb.prepare('SELECT * FROM tasks_followups WHERE client_id = ? ORDER BY id DESC').all(id);
  const payments = sqliteDb.prepare('SELECT * FROM payments WHERE client_id = ? ORDER BY id DESC').all(id);
  const calls = sqliteDb.prepare('SELECT * FROM call_logs WHERE client_id = ? ORDER BY id DESC').all(id);
  const whatsapp = sqliteDb.prepare('SELECT * FROM whatsapp_messages WHERE client_id = ? ORDER BY id DESC').all(id);

  return { ...client, assessment, dietPlans, consultations, notes, tasks, payments, calls, whatsapp };
}

function updateClientAssessment(clientId, assessmentData) {
  if (!sqliteDb) return null;
  const existing = sqliteDb.prepare('SELECT * FROM clinical_assessments WHERE client_id = ?').get(clientId);

  if (existing) {
    const fields = [];
    const params = [];
    for (const [k, v] of Object.entries(assessmentData)) {
      if (['lifestyle_notes', 'sleep_hours', 'exercise_routine', 'water_intake_liters', 'stress_level', 'work_schedule', 'meal_timing', 'food_preference', 'allergies', 'food_dislikes', 'medical_conditions', 'medications', 'supplements', 'doctor_recommendations', 'short_term_goal', 'long_term_goal'].includes(k)) {
        fields.push(`${k} = ?`);
        params.push(v);
      }
    }
    if (fields.length > 0) {
      fields.push('updated_at = CURRENT_TIMESTAMP');
      params.push(clientId);
      sqliteDb.prepare(`UPDATE clinical_assessments SET ${fields.join(', ')} WHERE client_id = ?`).run(...params);
    }
  } else {
    sqliteDb.prepare(`
      INSERT INTO clinical_assessments (client_id, lifestyle_notes, sleep_hours, exercise_routine, water_intake_liters, stress_level, work_schedule, meal_timing, food_preference, allergies, food_dislikes, medical_conditions, medications, supplements, doctor_recommendations, short_term_goal, long_term_goal)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      clientId,
      assessmentData.lifestyle_notes || '',
      assessmentData.sleep_hours || 7,
      assessmentData.exercise_routine || '',
      assessmentData.water_intake_liters || 2.5,
      assessmentData.stress_level || 'Moderate',
      assessmentData.work_schedule || '',
      assessmentData.meal_timing || '',
      assessmentData.food_preference || 'Vegetarian',
      assessmentData.allergies || '',
      assessmentData.food_dislikes || '',
      assessmentData.medical_conditions || '',
      assessmentData.medications || '',
      assessmentData.supplements || '',
      assessmentData.doctor_recommendations || '',
      assessmentData.short_term_goal || '',
      assessmentData.long_term_goal || ''
    );
  }

  return getClientById(clientId);
}

function createDietPlan(planData) {
  if (!sqliteDb) return null;
  const countRow = sqliteDb.prepare('SELECT COUNT(*) AS count FROM diet_plans WHERE client_id = ?').get(planData.client_id);
  const version = (countRow ? countRow.count : 0) + 1;

  sqliteDb.prepare(`UPDATE diet_plans SET status = 'Archived' WHERE client_id = ?`).run(planData.client_id);

  const res = sqliteDb.prepare(`
    INSERT INTO diet_plans (client_id, plan_name, version, start_date, end_date, calories, meal_structure, notes, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Active')
  `).run(
    planData.client_id,
    planData.plan_name,
    version,
    planData.start_date || new Date().toISOString().split('T')[0],
    planData.end_date || new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
    planData.calories || 1800,
    planData.meal_structure || '',
    planData.notes || ''
  );

  sqliteDb.prepare(`
    INSERT INTO notes (client_id, title, content, type, author)
    VALUES (?, ?, ?, 'Diet Plan', 'Dr. Akhila Konakalla')
  `).run(planData.client_id, `Diet Plan Created (v${version}): ${planData.plan_name}`, `Custom meal plan activated with target ${planData.calories || 1800} kcal/day.`);

  return res.lastInsertRowid;
}

function getFollowups(status = 'Pending') {
  if (!sqliteDb) return [];
  const stmt = sqliteDb.prepare(`
    SELECT f.*, l.name AS lead_name, l.phone AS lead_phone, c.name AS client_name, c.phone AS client_phone
    FROM tasks_followups f
    LEFT JOIN leads l ON f.lead_id = l.id
    LEFT JOIN clients c ON f.client_id = c.id
    WHERE f.status = ?
    ORDER BY f.due_at ASC
  `);
  return stmt.all(status);
}

function createFollowup(data) {
  if (!sqliteDb) return null;
  const res = sqliteDb.prepare(`
    INSERT INTO tasks_followups (client_id, lead_id, reason, due_at, assigned_to, priority, status)
    VALUES (?, ?, ?, ?, ?, ?, 'Pending')
  `).run(
    data.client_id || null,
    data.lead_id || null,
    data.reason,
    data.due_at || new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    data.assigned_to || 'Dr. Akhila Konakalla',
    data.priority || 'High'
  );
  return res.lastInsertRowid;
}

function completeFollowup(id) {
  if (!sqliteDb) return null;
  sqliteDb.prepare(`
    UPDATE tasks_followups
    SET status = 'Completed', completed_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(id);
  return true;
}

function getDashboardMetrics() {
  if (!sqliteDb) return { newLeadsToday: 0, hotLeads: 0, followupsDue: 0, consultationsToday: 0, pendingPayments: 0, totalRevenue: 0 };

  const todayStr = new Date().toISOString().split('T')[0];

  const newLeadsCount = sqliteDb.prepare(`SELECT COUNT(*) AS count FROM leads WHERE DATE(created_at) = ?`).get(todayStr).count;
  const hotLeadsCount = sqliteDb.prepare(`SELECT COUNT(*) AS count FROM leads WHERE temperature = 'HOT' AND status != 'Converted' AND status != 'Lost'`).get().count;
  const followupsDueCount = sqliteDb.prepare(`SELECT COUNT(*) AS count FROM tasks_followups WHERE status = 'Pending' AND DATE(due_at) <= ?`).get(todayStr).count;
  const overdueFollowups = sqliteDb.prepare(`SELECT COUNT(*) AS count FROM tasks_followups WHERE status = 'Pending' AND DATE(due_at) < ?`).get(todayStr).count;
  const consultationsCount = sqliteDb.prepare(`SELECT COUNT(*) AS count FROM consultations WHERE DATE(appointment_at) = ?`).get(todayStr).count;
  const pendingPaymentsCount = sqliteDb.prepare(`SELECT COUNT(*) AS count FROM payments WHERE status = 'Pending'`).get().count;
  const activeClientsCount = sqliteDb.prepare(`SELECT COUNT(*) AS count FROM clients WHERE status = 'Active'`).get().count;
  const upcomingRenewalsCount = sqliteDb.prepare(`SELECT COUNT(*) AS count FROM clients WHERE status = 'Active' AND DATE(renewal_date) BETWEEN ? AND DATE(?, '+14 days')`).get(todayStr, todayStr).count;

  const totalRevRow = sqliteDb.prepare(`SELECT SUM(amount) AS sum FROM payments WHERE status = 'Paid'`).get();
  const totalRevenue = totalRevRow ? (totalRevRow.sum || 0) : 0;

  const priorities = [];

  if (hotLeadsCount > 0) {
    priorities.push({ type: 'hot_lead', title: `${hotLeadsCount} Hot Leads requiring follow-up`, priority: 'High', action: '/crm#leads' });
  }
  if (overdueFollowups > 0) {
    priorities.push({ type: 'overdue', title: `${overdueFollowups} Overdue Follow-up tasks`, priority: 'Urgent', action: '/crm#today' });
  }
  if (consultationsCount > 0) {
    priorities.push({ type: 'consultation', title: `${consultationsCount} Consultations scheduled today`, priority: 'High', action: '/crm#consultations' });
  }
  if (upcomingRenewalsCount > 0) {
    priorities.push({ type: 'renewal', title: `${upcomingRenewalsCount} Client renewals due within 14 days`, priority: 'Medium', action: '/crm#payments' });
  }

  return {
    newLeadsToday: newLeadsCount,
    hotLeads: hotLeadsCount,
    followupsDue: followupsDueCount,
    overdueFollowups,
    consultationsToday: consultationsCount,
    pendingPayments: pendingPaymentsCount,
    activeClients: activeClientsCount,
    upcomingRenewals: upcomingRenewalsCount,
    totalRevenue,
    priorities
  };
}

function logCall(callData) {
  if (!sqliteDb) return null;
  const res = sqliteDb.prepare(`
    INSERT INTO call_logs (client_id, lead_id, direction, duration_seconds, outcome, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    callData.client_id || null,
    callData.lead_id || null,
    callData.direction || 'outgoing',
    callData.duration_seconds || 0,
    callData.outcome || 'Answered',
    callData.notes || ''
  );

  const title = `Phone Call (${callData.outcome})`;
  const author = callData.author || 'Dr. Akhila Konakalla';

  if (callData.client_id) {
    sqliteDb.prepare(`INSERT INTO notes (client_id, title, content, type, author) VALUES (?, ?, ?, 'Call', ?)`).run(callData.client_id, title, callData.notes || 'Call logged', author);
  } else if (callData.lead_id) {
    sqliteDb.prepare(`INSERT INTO notes (lead_id, title, content, type, author) VALUES (?, ?, ?, 'Call', ?)`).run(callData.lead_id, title, callData.notes || 'Call logged', author);
  }

  return res.lastInsertRowid;
}

function logWhatsAppMessage(msgData) {
  if (!sqliteDb) return null;
  const res = sqliteDb.prepare(`
    INSERT INTO whatsapp_messages (client_id, lead_id, direction, message_type, content, template_id, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    msgData.client_id || null,
    msgData.lead_id || null,
    msgData.direction || 'outgoing',
    msgData.message_type || 'text',
    msgData.content,
    msgData.template_id || null,
    msgData.status || 'Sent'
  );
  return res.lastInsertRowid;
}

function getDbStats() {
  if (!sqliteDb) {
    return { status: 'disconnected', engine: 'none' };
  }

  const bookingsCount = sqliteDb.prepare('SELECT COUNT(*) AS count FROM bookings').get().count;
  const contactsCount = sqliteDb.prepare('SELECT COUNT(*) AS count FROM contact_inquiries').get().count;
  const paymentsCount = sqliteDb.prepare('SELECT COUNT(*) AS count FROM payment_proofs').get().count;
  const reviewsCount = sqliteDb.prepare('SELECT COUNT(*) AS count FROM reviews').get().count;
  const leadsCount = sqliteDb.prepare('SELECT COUNT(*) AS count FROM leads').get().count;
  const clientsCount = sqliteDb.prepare('SELECT COUNT(*) AS count FROM clients').get().count;
  const followupsCount = sqliteDb.prepare('SELECT COUNT(*) AS count FROM tasks_followups').get().count;

  return {
    status: 'connected',
    engine: 'SQLite (node:sqlite)',
    dbPath,
    supabaseCloudConnected: Boolean(supabase),
    counts: {
      bookings: bookingsCount,
      contactInquiries: contactsCount,
      paymentProofs: paymentsCount,
      reviews: reviewsCount,
      crmLeads: leadsCount,
      crmClients: clientsCount,
      crmFollowups: followupsCount
    }
  };
}

module.exports = {
  initDatabase,
  insertBooking,
  getBookings,
  getBookedSlots,
  insertContact,
  getContacts,
  insertPaymentProof,
  getPaymentProofs,
  insertReview,
  getReviews,
  getDbStats,
  // CRM Core Methods
  syncLeadFromWebsite,
  syncPaymentToCrm,
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  convertLeadToClient,
  getClients,
  getClientById,
  updateClientAssessment,
  createDietPlan,
  getFollowups,
  createFollowup,
  completeFollowup,
  getDashboardMetrics,
  logCall,
  logWhatsAppMessage,
  normalizePhone,
  normalizeEmail,
  calculateLeadScore
};
