const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper to convert Vercel serverless function export into Express middleware
function vercelHandlerAdapter(handlerPath) {
  const handler = require(handlerPath);
  return (req, res) => {
    handler(req, res);
  };
}

// API Routes
app.all('/api/book', vercelHandlerAdapter('./api/book'));
app.all('/api/contact', vercelHandlerAdapter('./api/contact'));
app.all('/api/payment-receipt', vercelHandlerAdapter('./api/payment-receipt'));
app.all('/api/reviews', vercelHandlerAdapter('./api/reviews'));

// Serve static files from root directory
app.use(express.static(__dirname));

// Fallback to index.html for root or missing routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`Dhruthi Wellness local server running!`);
  console.log(`Website URL: http://localhost:${PORT}`);
  console.log(`===================================================`);
});
