const db = require('../db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const reviewsList = db.getReviews();
      return res.status(200).json(reviewsList);
    }

    if (req.method === 'POST') {
      const { author_name, category, rating, message } = req.body;

      if (!author_name || !category || !rating || !message) {
        return res.status(400).json({ error: 'Missing required fields: author_name, category, rating, message.' });
      }

      const newReview = db.insertReview({
        author_name,
        category,
        rating: Number(rating),
        message
      });

      return res.status(201).json(newReview);
    }

    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (error) {
    console.error('Reviews API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
