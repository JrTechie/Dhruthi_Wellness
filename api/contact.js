const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// Log inquiry to leads.csv for Excel export
function logInquiryToCSV(inquiry) {
  try {
    const csvPath = path.join(process.cwd(), 'leads.csv');
    const header = 'Timestamp,Client Name,Phone,Email,Program Title,Expert Name,Date,Time,Message\n';
    if (!fs.existsSync(csvPath)) {
      fs.writeFileSync(csvPath, header);
    }
    const row = `"${new Date().toISOString()}","${(inquiry.client_name || '').replace(/"/g, '""')}","N/A","${inquiry.client_email}","${(inquiry.subject || 'Quick Message Inquiry').replace(/"/g, '""')}","Dt. Akhila Konakalla","N/A","N/A","${(inquiry.message || '').replace(/"/g, '""')}"\n`;
    fs.appendFileSync(csvPath, row);
  } catch (e) {
    console.error('Error writing inquiry to CSV file:', e);
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const { client_name, client_email, subject, message } = req.body;

    if (!client_name || !client_email || !message) {
      return res.status(400).json({ error: 'Missing required fields: client_name, client_email, message.' });
    }

    // Always log inquiry to CSV sheet
    logInquiryToCSV({ client_name, client_email, subject, message });

    if (supabase) {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .insert([{
          client_name,
          client_email,
          subject: subject || 'New Website Inquiry',
          message
        }])
        .select();

      if (!error && data) {
        return res.status(201).json({ success: true, inquiry: data[0] });
      }
    }

    return res.status(200).json({ success: true, message: 'Inquiry recorded successfully in CSV file' });
  } catch (error) {
    console.error('Contact API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
