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

// Function to log lead to CSV file for Excel export
function logLeadToCSV(lead) {
  try {
    const csvPath = path.join(process.cwd(), 'leads.csv');
    const header = 'Timestamp,Client Name,Phone,Email,Program Title,Expert Name,Date,Time,Message\n';
    if (!fs.existsSync(csvPath)) {
      fs.writeFileSync(csvPath, header);
    }
    const row = `"${new Date().toISOString()}","${(lead.client_name || '').replace(/"/g, '""')}","${lead.client_phone}","${lead.client_email}","${(lead.program_title || '').replace(/"/g, '""')}","${(lead.expert_name || '').replace(/"/g, '""')}","${lead.booking_date}","${lead.booking_time}","${(lead.client_message || '').replace(/"/g, '""')}"\n`;
    fs.appendFileSync(csvPath, row);
  } catch (e) {
    console.error('Error writing lead to CSV file:', e);
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
    const { expert_name, program_title, client_name, client_email, client_phone, booking_date, booking_time, client_message } = req.body;

    if (!expert_name || !program_title || !client_name || !client_email || !client_phone || !booking_date || !booking_time) {
      return res.status(400).json({ error: 'Missing required booking fields.' });
    }

    // Always log lead to CSV sheet
    logLeadToCSV({ expert_name, program_title, client_name, client_email, client_phone, booking_date, booking_time, client_message });

    if (supabase) {
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          expert_name,
          program_title,
          client_name,
          client_email,
          client_phone,
          booking_date,
          booking_time,
          client_message
        }])
        .select();

      if (error) {
        console.error('Supabase DB Insert Error:', error);
      } else {
        return res.status(201).json({ success: true, booking: data[0] });
      }
    }

    return res.status(200).json({ success: true, message: 'Lead recorded successfully in CSV file' });
  } catch (error) {
    console.error('Booking API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
