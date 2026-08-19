const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const xlsx = require('xlsx');
require('dotenv').config();

// Auto-initialize automated database layer
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Multer storage setup for spreadsheet uploads
const upload = multer({ dest: path.join(__dirname, 'scratch') });

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper to convert Vercel serverless function export into Express middleware
function vercelHandlerAdapter(handlerPath) {
  const handler = require(handlerPath);
  return (req, res) => {
    handler(req, res);
  };
}

// Database Status & Diagnostics API
app.get('/api/db-status', (req, res) => {
  const stats = db.getDbStats();
  res.json(stats);
});

// Admin Data Endpoints
app.get('/api/admin/bookings', (req, res) => {
  res.json(db.getBookings());
});

app.get('/api/admin/contacts', (req, res) => {
  res.json(db.getContacts());
});

app.get('/api/admin/payments', (req, res) => {
  res.json(db.getPaymentProofs());
});

// Core API Routes
app.all('/api/book', vercelHandlerAdapter('./api/book'));
app.all('/api/booked-slots', vercelHandlerAdapter('./api/booked-slots'));
app.all('/api/contact', vercelHandlerAdapter('./api/contact'));
app.all('/api/payment-receipt', vercelHandlerAdapter('./api/payment-receipt'));
app.all('/api/reviews', vercelHandlerAdapter('./api/reviews'));

// CRM Dynamic Endpoints Adapter
app.use('/api/crm', vercelHandlerAdapter('./api/crm'));

// Excel / CSV File Import Endpoint
app.post('/api/crm/import-file', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rawData = xlsx.utils.sheet_to_json(worksheet, { defval: '' });

    // Clean up temporary upload file
    fs.unlink(filePath, () => {});

    if (!rawData || rawData.length === 0) {
      return res.status(400).json({ error: 'Spreadsheet is empty or unreadable.' });
    }

    const strategy = req.body.duplicate_strategy || 'skip'; // skip, update, create
    let imported = 0;
    let updated = 0;
    let skipped = 0;
    let errors = 0;
    const errorDetails = [];

    for (let index = 0; index < rawData.length; index++) {
      const row = rawData[index];
      // Auto-detect column mapping
      const name = row.name || row.Name || row['Client Name'] || row['Lead Name'] || row['Customer Name'];
      const phone = row.phone || row.Phone || row['Mobile'] || row['Mobile Number'] || row['Contact'];
      const email = row.email || row.Email || row['Email Address'];
      const goal = row.goal || row.Goal || row['Program'] || row['Package'] || row['Requirement'] || 'General Wellness';
      const notes = row.notes || row.Notes || row['Comments'] || row['Remarks'] || '';

      if (!name || !phone) {
        errors++;
        errorDetails.push({ row: index + 1, name: name || 'N/A', error: 'Missing required Name or Phone' });
        continue;
      }

      const syncResult = db.syncLeadFromWebsite({
        name,
        phone,
        email,
        goal,
        source: 'Spreadsheet Import',
        notes: `Imported from ${req.file.originalname}. ${notes}`
      });

      if (syncResult && syncResult.isDuplicate) {
        if (strategy === 'skip') {
          skipped++;
        } else {
          updated++;
        }
      } else {
        imported++;
      }
    }

    res.json({
      success: true,
      fileName: req.file.originalname,
      totalRows: rawData.length,
      importedCount: imported,
      updatedCount: updated,
      skippedCount: skipped,
      errorCount: errors,
      errors: errorDetails
    });
  } catch (err) {
    console.error('[Import Error]', err);
    res.status(500).json({ error: `File processing error: ${err.message}` });
  }
});

// Export leads as Excel CSV file
app.get('/api/export-leads', (req, res) => {
  const leads = db.getLeads();
  let csv = 'ID,Name,Phone,Email,Goal,Source,Score,Temperature,Status,Assigned To,Created At\n';
  for (const l of leads) {
    csv += `"${l.id}","${(l.name||'').replace(/"/g,'""')}","${l.phone}","${l.email||''}","${(l.goal||'').replace(/"/g,'""')}","${l.source}","${l.score}","${l.temperature}","${l.status}","${l.assigned_to}","${l.created_at}"\n`;
  }
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="dhruthi_crm_leads.csv"');
  return res.send(csv);
});

// Export clients as Excel CSV file
app.get('/api/export-clients', (req, res) => {
  const clients = db.getClients();
  let csv = 'ID,Name,Phone,Email,Age,Gender,Goals,Status,Assigned To,Start Date,Renewal Date\n';
  for (const c of clients) {
    csv += `"${c.id}","${(c.name||'').replace(/"/g,'""')}","${c.phone}","${c.email||''}","${c.age||''}","${c.gender||''}","${(c.goals||'').replace(/"/g,'""')}","${c.status}","${c.assigned_to}","${c.start_date||''}","${c.renewal_date||''}"\n`;
  }
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="dhruthi_crm_clients.csv"');
  return res.send(csv);
});

// Serve CRM frontend at /crm
app.use('/crm', express.static(path.join(__dirname, 'crm')));

// Serve static files from root directory
app.use(express.static(__dirname));

// Fallback to index.html for root or missing non-CRM routes
app.use((req, res) => {
  if (req.path.startsWith('/crm')) {
    return res.sendFile(path.join(__dirname, 'crm', 'index.html'));
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`Dhruthi Wellness Server & CRM running!`);
  console.log(`Official Website: http://localhost:${PORT}`);
  console.log(`CEO's CRM:        http://localhost:${PORT}/crm`);
  console.log(`Database status:   http://localhost:${PORT}/api/db-status`);
  console.log(`===================================================`);
});
