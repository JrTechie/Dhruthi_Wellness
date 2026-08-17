# Dhruthi Wellness CRM — Excel & CSV Import Guide

## Overview
Dhruthi Wellness client data often resides in legacy spreadsheets. The CRM features an intelligent **Import Wizard** that normalizes dirty phone numbers, maps flexible column headers, scores imported leads, and handles duplicate records.

---

## 1. Supported File Formats
- `.xlsx` (Microsoft Excel 2007+)
- `.xls` (Legacy Microsoft Excel)
- `.csv` (Comma Separated Values)

---

## 2. Auto-Detected Columns
The import wizard automatically recognizes and normalizes the following column headers:

| Spreadsheet Header Examples | Maps To CRM Field | Data Transformation |
| :--- | :--- | :--- |
| `Name`, `Client Name`, `Customer` | `name` | Trimmed, capitalized |
| `Mobile`, `Phone`, `Contact` | `phone` | Normalized to 10 digits |
| `Email`, `Email Address` | `email` | Lowercased, whitespace trimmed |
| `Goal`, `Program`, `Package` | `goal` | Categorized for lead scoring |
| `Notes`, `Remarks`, `Comments` | `notes` | Appended to timeline history |

---

## 3. Duplicate Handling Strategies
During Step 2 of the Import Wizard, select your preferred duplicate resolution strategy:
1. **Skip Duplicates (Default & Safe)**: Ignores rows where a matching phone number or email address already exists in the CRM.
2. **Update Existing Records**: Preserves historical records while updating lead score, last interaction timestamp, and appending new notes.
3. **Create New Record**: Forces creation of a new lead record regardless of existing duplicates.

---

## 4. Downloadable Error Reports
If any rows in your spreadsheet contain invalid numbers or missing required names, the Import Wizard will compile an explicit row-by-row error report for your review.
