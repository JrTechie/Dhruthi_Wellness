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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!supabase) {
    return res.status(500).json({ error: 'Database environment variables are missing. Please define SUPABASE_URL and SUPABASE_ANON_KEY.' });
  }

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const { author_name, category, rating, message } = req.body;

      if (!author_name || !category || !rating || !message) {
        return res.status(400).json({ error: 'Missing required fields: author_name, category, rating, message.' });
      }

      const { data, error } = await supabase
        .from('reviews')
        .insert([{ author_name, category, rating, message }])
        .select();

      if (error) throw error;
      return res.status(201).json(data[0]);
    }

    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (error) {
    console.error('Reviews API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
