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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const { client_name, client_phone, client_email, plan_name, amount_paid, payment_method, transaction_id, payment_date, notes } = req.body;

    if (!client_name || !plan_name || !amount_paid || !transaction_id) {
      return res.status(400).json({ error: 'Missing required payment verification fields.' });
    }

    const receipt_no = `DW-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

    let record = null;
    if (supabase) {
      const { data, error } = await supabase
        .from('payment_proofs')
        .insert([{
          receipt_no,
          client_name,
          client_phone,
          client_email,
          plan_name,
          amount_paid,
          payment_method,
          transaction_id,
          payment_date: payment_date || new Date().toISOString(),
          status: 'verified',
          notes
        }])
        .select();

      if (!error && data) {
        record = data[0];
      }
    }

    return res.status(200).json({
      success: true,
      receipt_no,
      client_name,
      amount_paid,
      transaction_id,
      record
    });
  } catch (error) {
    console.error('Payment API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
