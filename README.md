# Dhruthi Wellness — Official Website & Dietitian CRM OS

A modern, production-ready **Dietitian CRM and Client Management System** for Dr. Akhila Konakalla and team, seamlessly integrated with the official Dhruthi Wellness website, database, files, and communication platforms.

---

## 🌟 Key Features

- **Dietitian Command Center**: Dashboard featuring real-time "Today's Priorities" and the "What Should I Do Now?" smart action panel.
- **Lead Pipeline & Scoring**: Kanban & Table views, 0–100 automatic lead scoring, lead temperature badges (HOT/WARM/NURTURE/COLD), and source attribution.
- **Website & Form Sync**: Real-time synchronization of website bookings (`/api/book`), contact inquiries (`/api/contact`), and payment proofs (`/api/payment-receipt`) with phone/email normalization and duplicate detection.
- **Client 360° Profile**: Complete clinical history, body metrics, version-controlled diet plans, consultation records, payment history, and chronological timeline notes.
- **Spreadsheet Import Engine**: Interactive Excel (.xlsx, .xls, .csv) & Google Sheets wizard with auto column mapping, validation, duplicate strategies (`Skip`, `Update`, `Create`), and error downloads.
- **Communication Center**: Built-in adapters for WhatsApp Business API message history & templates, and telephony/calling log abstraction.
- **Automations Engine**: Event-driven trigger/condition/action builder and non-diagnostic AI dietitian helper.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start local development server
npm start
```

Access:
- **Official Website**: http://localhost:3000
- **Dietitian CRM**: http://localhost:3000/crm
- **Database Status**: http://localhost:3000/api/db-status

---

## 📚 Documentation
- [Setup & Deployment Guide](docs/SETUP.md)
- [Integrations Architecture](docs/INTEGRATIONS.md)
- [Excel & CSV Import Guide](docs/IMPORT_GUIDE.md)
- [Automations Engine](docs/AUTOMATIONS.md)
- [Security & Audit Control](docs/SECURITY.md)
