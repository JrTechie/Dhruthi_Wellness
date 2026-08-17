const db = require('../db');

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

    const record = db.insertPaymentProof({
      client_name,
      client_phone,
      client_email,
      plan_name,
      amount_paid,
      payment_method,
      transaction_id,
      payment_date,
      notes
    });

    return res.status(200).json({
      success: true,
      receipt_no: record.receipt_no,
      client_name: record.client_name,
      amount_paid: record.amount_paid,
      transaction_id: record.transaction_id,
      record
    });
  } catch (error) {
    console.error('Payment API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
