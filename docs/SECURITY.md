# Dhruthi Wellness CRM — Security & Audit Control Guide

## Overview
Dhruthi Wellness handles sensitive client nutrition, metabolic, and medical intake records. This document outlines security parameters, role-based controls, and auditing standards enforced by the system.

---

## 1. Security Architecture
- **No Client Secrets in Browser**: Database credentials (`SUPABASE_SERVICE_ROLE_KEY`) and server keys are kept strictly server-side in `.env`.
- **Row-Level Security (RLS)**: Enabled on all Supabase PostgreSQL tables.
- **Input Sanitization & Normalization**: All incoming web leads, contact forms, and file uploads undergo validation and phone/email normalization prior to database insertion.
- **Non-Diagnostic AI Boundary**: AI features assist only with note formatting and client history summaries; they are restricted from making autonomous medical diagnoses or treatment prescriptions.

---

## 2. Role-Based Access Control (RBAC)

| Role | Access Level | Permissions |
| :--- | :--- | :--- |
| **Admin (Dr. Akhila)** | Full Access | Full access to leads, clients, clinical assessments, diet plans, revenue, settings, automations, and team accounts. |
| **Dietitian** | Clinical & Care | Access to assigned client profiles, assessment updates, diet plan creation, and consultation notes. |
| **Assistant** | Operations | Lead entry, scheduling consultations, logging calls, and managing follow-up tasks. |
| **Manager** | Analytics | Access to lead funnel performance, marketing ROI, and revenue reports. |

---

## 3. Audit Logging
Every critical action (Lead Created, Status Changed, Lead Converted to Client, Diet Plan Updated, Payment Verified, Data Imported) records an immutable log entry in `audit_logs` containing:
- `actor`
- `action`
- `entity`
- `entity_id`
- `timestamp`
