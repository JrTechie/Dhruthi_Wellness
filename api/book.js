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
    const { expert_name, program_title, client_name, client_email, client_phone, booking_date, booking_time, client_message } = req.body;

    if (!expert_name || !program_title || !client_name || !client_email || !client_phone || !booking_date || !booking_time) {
      return res.status(400).json({ error: 'Missing required booking fields.' });
    }

    const newBooking = db.insertBooking({
      expert_name,
      program_title,
      client_name,
      client_email,
      client_phone,
      booking_date,
      booking_time,
      client_message
    });

    return res.status(201).json({
      success: true,
      message: 'Booking recorded successfully in database',
      booking: newBooking
    });
  } catch (error) {
    console.error('Booking API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
