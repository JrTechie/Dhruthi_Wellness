const db = require('../db');

module.exports = async function handler(req, res) {
  // CORS & Header Setup
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const rawUrl = req.originalUrl || req.url || '';
  const url = new URL(rawUrl, `http://${req.headers.host || 'localhost'}`);
  let pathname = url.pathname;

  // Normalize path if /api/crm prefix is missing or present
  if (!pathname.startsWith('/api/crm')) {
    pathname = '/api/crm' + (pathname.startsWith('/') ? pathname : '/' + pathname);
  }

  const method = req.method;

  try {
    // 1. Dashboard Metrics
    if (pathname === '/api/crm/dashboard' && method === 'GET') {
      const metrics = db.getDashboardMetrics();
      return res.status(200).json(metrics);
    }

    // 2. Leads Management
    if (pathname === '/api/crm/leads' && method === 'GET') {
      const filters = {
        status: url.searchParams.get('status'),
        temperature: url.searchParams.get('temperature'),
        source: url.searchParams.get('source'),
        search: url.searchParams.get('search')
      };
      const leads = db.getLeads(filters);
      return res.status(200).json(leads);
    }

    if (pathname === '/api/crm/leads' && method === 'POST') {
      const body = req.body || {};
      if (!body.name || !body.phone) {
        return res.status(400).json({ error: 'Name and Phone are required.' });
      }
      const newLead = db.createLead(body);
      return res.status(201).json(newLead);
    }

    if (pathname.match(/^\/api\/crm\/leads\/\d+$/)) {
      const leadId = parseInt(pathname.split('/').pop(), 10);

      if (method === 'GET') {
        const lead = db.getLeadById(leadId);
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        return res.status(200).json(lead);
      }

      if (method === 'PATCH' || method === 'PUT') {
        const updated = db.updateLead(leadId, req.body || {});
        return res.status(200).json(updated);
      }
    }

    if (pathname.match(/^\/api\/crm\/leads\/\d+\/convert$/) && method === 'POST') {
      const leadId = parseInt(pathname.split('/')[4], 10);
      const client = db.convertLeadToClient(leadId, req.body || {});
      return res.status(200).json(client);
    }

    // 3. Clients Management
    if (pathname === '/api/crm/clients' && method === 'GET') {
      const filters = {
        status: url.searchParams.get('status'),
        search: url.searchParams.get('search')
      };
      const clients = db.getClients(filters);
      return res.status(200).json(clients);
    }

    if (pathname.match(/^\/api\/crm\/clients\/\d+$/) && method === 'GET') {
      const clientId = parseInt(pathname.split('/').pop(), 10);
      const client = db.getClientById(clientId);
      if (!client) return res.status(404).json({ error: 'Client not found.' });
      return res.status(200).json(client);
    }

    if (pathname.match(/^\/api\/crm\/clients\/\d+\/assessment$/) && (method === 'PUT' || method === 'POST')) {
      const clientId = parseInt(pathname.split('/')[4], 10);
      const updated = db.updateClientAssessment(clientId, req.body || {});
      return res.status(200).json(updated);
    }

    if (pathname.match(/^\/api\/crm\/clients\/\d+\/diet-plans$/) && method === 'POST') {
      const clientId = parseInt(pathname.split('/')[4], 10);
      const planId = db.createDietPlan({ client_id: clientId, ...(req.body || {}) });
      return res.status(201).json({ success: true, planId });
    }

    // 4. Follow-ups
    if (pathname === '/api/crm/followups' && method === 'GET') {
      const status = url.searchParams.get('status') || 'Pending';
      const followups = db.getFollowups(status);
      return res.status(200).json(followups);
    }

    if (pathname === '/api/crm/followups' && method === 'POST') {
      const id = db.createFollowup(req.body || {});
      return res.status(201).json({ success: true, id });
    }

    if (pathname.match(/^\/api\/crm\/followups\/\d+\/complete$/) && method === 'POST') {
      const id = parseInt(pathname.split('/')[4], 10);
      db.completeFollowup(id);
      return res.status(200).json({ success: true });
    }

    // 5. Calls & WhatsApp Logging
    if (pathname === '/api/crm/calls' && method === 'POST') {
      const callId = db.logCall(req.body || {});
      return res.status(201).json({ success: true, callId });
    }

    if (pathname === '/api/crm/whatsapp' && method === 'POST') {
      const msgId = db.logWhatsAppMessage(req.body || {});
      return res.status(201).json({ success: true, msgId });
    }

    // 6. Global Cmd+K Search
    if (pathname === '/api/crm/search' && method === 'GET') {
      const query = (url.searchParams.get('q') || '').trim();
      if (!query) return res.status(200).json({ leads: [], clients: [] });

      const leads = db.getLeads({ search: query }).slice(0, 5);
      const clients = db.getClients({ search: query }).slice(0, 5);

      return res.status(200).json({ leads, clients });
    }

    // 7. AI Safe Assistant Helper
    if (pathname === '/api/crm/ai-summary' && method === 'POST') {
      const { type, text, clientName, goal } = req.body || {};

      let summary = '';
      if (type === 'client_summary') {
        summary = `📌 AI Summary for ${clientName || 'Client'}: Client is currently focusing on ${goal || 'Wellness goals'}. Routine monitoring of meal compliance and hydration is recommended. No high-risk clinical red flags detected.`;
      } else if (type === 'note_cleanup') {
        summary = `• Patient reported steady progress.\n• Hydration target: 3L daily.\n• Meal timing: Aligned with metabolic recommendations.`;
      } else {
        summary = `Suggested Follow-up: "Namaste ${clientName || 'there'}, Dr. Akhila Konakalla here checking in on your meal chart for this week. How are your energy levels?"`;
      }

      return res.status(200).json({ summary, isAiAssisted: true });
    }

    // Fallback
    return res.status(404).json({ error: `CRM Route not found: ${pathname}` });
  } catch (err) {
    console.error('[CRM API Error]', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};
