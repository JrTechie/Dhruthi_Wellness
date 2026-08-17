# Dhruthi Wellness Dietitian CRM — Local & Production Setup Guide

## Overview
This document outlines how to set up, run, configure, and maintain the **Dhruthi Wellness Dietitian CRM & Client OS** built specifically for Dr. Akhila Konakalla and team.

---

## 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**

---

## 2. Local Environment Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd nutriflow
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` as required:*
   ```env
   PORT=3000
   DB_PATH=nutriflow.db
   SUPABASE_URL=https://your-supabase-id.supabase.co
   SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Start the server**:
   ```bash
   npm start
   # or
   npm run dev
   ```

5. **Access Application URLs**:
   - **Official Website**: `http://localhost:3000`
   - **Dietitian CRM**: `http://localhost:3000/crm`
   - **Database Diagnostics**: `http://localhost:3000/api/db-status`

---

## 3. Database & Migrations
The CRM uses an automated dual-tier storage strategy:
1. **Local High-Performance SQLite**: Automatically initializes all tables (`leads`, `clients`, `clinical_assessments`, `diet_plans`, `consultations`, `payments`, `notes`, `tasks_followups`, `whatsapp_messages`, `automations`, `imports`, `audit_logs`) and indexes upon startup in `nutriflow.db`.
2. **Cloud Supabase Sync (Optional)**: Automatically replicates new records asynchronously when `SUPABASE_URL` and `SUPABASE_ANON_KEY` are provided.

---

## 4. Deploying to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   Or connect your GitHub repository directly to [Vercel Dashboard](https://vercel.com). Vercel will automatically detect `vercel.json` and deploy both the website and serverless API endpoints `/api/*`.
