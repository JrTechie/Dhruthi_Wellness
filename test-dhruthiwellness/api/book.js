const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!supabase) {
    return res.status(500).json({ error: 'Database environment variables are missing. Please define SUPABASE_URL and SUPABASE_ANON_KEY.' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const { expert_name, program_title, client_name, client_email, client_phone, booking_date, booking_time, client_message } = req.body;

    if (!expert_name || !program_title || !client_name || !client_email || !client_phone || !booking_date || !booking_time) {
      return res.status(400).json({ error: 'Missing required booking fields.' });
    }

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

    if (error) throw error;
    return res.status(201).json({ success: true, booking: data[0] });
  } catch (error) {
    console.error('Booking API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
