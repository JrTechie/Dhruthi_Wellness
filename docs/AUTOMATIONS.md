# Dhruthi Wellness CRM — Automations & Smart Action Engine

## Overview
The CRM features an event-driven automation engine that eliminates repetitive manual follow-ups for Dr. Akhila Konakalla and team.

---

## 1. Trigger -> Condition -> Action Architecture

```
WHEN [Event Occurs] ➔ IF [Conditions Met] ➔ THEN [Execute Actions]
```

### Pre-Configured Workflows

1. **Fertility Hot Lead Auto-Assign**:
   - **WHEN**: `lead_created`
   - **IF**: `goal` contains "Fertility" AND `score` > 70
   - **THEN**: Assign to `Dr. Akhila Konakalla` ➔ Create High Priority Task ➔ Queue Welcome Template.

2. **7-Day Package Renewal Reminder**:
   - **WHEN**: `renewal_date` is 7 days away
   - **IF**: `client_status` = "Active"
   - **THEN**: Create Renewal Follow-up Task ➔ Queue Renewal WhatsApp Template.

3. **Payment Received Automation**:
   - **WHEN**: `payment_status` = "Paid"
   - **THEN**: Activate Client 90-day subscription ➔ Send Verified Receipt.

---

## 2. Smart Action Panel ("What Should I Do Now?")
Located prominently at the top of the Dietitian Dashboard, this engine continuously evaluates database state to present a real-time list of actionable operational priorities:
- 🔥 Hot Leads requiring follow-up
- ⏰ Overdue follow-up tasks
- 📅 Consultations scheduled today
- 🔄 Client package renewals due within 14 days
