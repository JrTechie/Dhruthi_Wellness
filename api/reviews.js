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

// Function to log reviews to CSV file for Excel export
function logReviewToCSV(rev) {
  try {
    const csvPath = path.join(process.cwd(), 'reviews.csv');
    const header = 'Timestamp,Author Name,Program Category,Rating,Message\n';
    if (!fs.existsSync(csvPath)) {
      fs.writeFileSync(csvPath, header);
    }
    const row = `"${new Date().toISOString()}","${(rev.author_name || '').replace(/"/g, '""')}","${(rev.category || '').replace(/"/g, '""')}","${rev.rating}","${(rev.message || '').replace(/"/g, '""')}"\n`;
    fs.appendFileSync(csvPath, row);
  } catch (e) {
    console.error('Error writing review to CSV file:', e);
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      if (supabase) {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('id', { ascending: false });

        if (!error && data) {
          return res.status(200).json(data);
        }
      }
      return res.status(200).json([]);
    }

    if (req.method === 'POST') {
      const { author_name, category, rating, message } = req.body;

      if (!author_name || !category || !rating || !message) {
        return res.status(400).json({ error: 'Missing required fields: author_name, category, rating, message.' });
      }

      // Always save to local CSV sheet
      logReviewToCSV({ author_name, category, rating, message });

      if (supabase) {
        const { data, error } = await supabase
          .from('reviews')
          .insert([{ author_name, category, rating, message }])
          .select();

        if (!error && data) {
          return res.status(201).json(data[0]);
        }
      }

      return res.status(201).json({ author_name, category, rating, message });
    }

    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (error) {
    console.error('Reviews API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
