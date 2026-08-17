# Dhruthi Wellness CRM — Integrations Architecture Guide

This guide details how external communications (WhatsApp Business API, Telephony/Calling, Website Forms, Google Sheets) connect seamlessly with the CRM.

---

## 1. Official Website Integration
The CRM is connected to the Dhruthi Wellness official website (`index.html`, `payment_portal.html`):
- **Form Endpoints**:
  - `/api/book`: Booking appointments automatically creates/updates a Lead record with `score = score + 20` and creates an instant 4-hour follow-up task.
  - `/api/contact`: General website inquiries create/update a Lead record.
  - `/api/payment-receipt`: Payment submissions automatically verify payments, attach receipt numbers (`DW-YYYYMM-XXXX`), and link to the Client's timeline.

---

## 2. WhatsApp Business API Adapter
- **Provider Interface**: Located in `/api/crm` & `db.js`.
- **Supported Methods**:
  - `logWhatsAppMessage({ client_id, lead_id, direction, content, template_id, status })`
- **Supported Variables**:
  - `{{client_name}}`
  - `{{consultation_date}}`
  - `{{consultation_time}}`
  - `{{plan_name}}`
  - `{{renewal_date}}`
- **Official API Webhook Setup**: Set your WhatsApp provider webhook URL to `https://<your-domain>/api/crm/whatsapp/webhook`.

---

## 3. Telephony / Call Provider Adapter
- **Supported Call Outcomes**: `Answered`, `No Answer`, `Busy`, `Interested`, `Not Interested`, `Call Back Later`, `Consultation Booked`, `Converted`.
- **Click-to-Call API**: Endpoint `POST /api/crm/calls` automatically logs call duration, outcome tags, and updates the client timeline.

---

## 4. Google Sheets & Cloud Synchronization
- **Spreadsheet Sync**: Use the interactive Import Wizard under `/crm#imports` or endpoint `POST /api/crm/import-file`.
- **OAuth Credentials**: Store Google OAuth client ID and secrets in environment variables when connecting automated two-way Google Sheets sync.
