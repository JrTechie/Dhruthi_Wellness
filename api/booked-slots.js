const db = require('../db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const { date } = req.query;
    const bookedSlots = db.getBookedSlots ? db.getBookedSlots(date) : [];
    return res.status(200).json({
      success: true,
      bookedSlots
    });
  } catch (error) {
    console.error('Booked Slots API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
