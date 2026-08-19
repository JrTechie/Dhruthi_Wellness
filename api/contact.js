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
    const { client_name, client_email, subject, message } = req.body;

    if (!client_name || !client_email || !message) {
      return res.status(400).json({ error: 'Missing required fields: client_name, client_email, message.' });
    }

    const newInquiry = db.insertContact({
      client_name,
      client_email,
      subject: subject || 'New Website Enquiry',
      message
    });

    return res.status(201).json({
      success: true,
      message: 'Enquiry recorded successfully in database',
      enquiry: newInquiry
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
