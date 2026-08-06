import os
import sys
import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, Image as RLImage
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT

# Brand Palette for Dhruthi Wellness
COLOR_PRIMARY = colors.HexColor('#3B5336')      # Deep Forest Green
COLOR_SECONDARY = colors.HexColor('#A3B899')    # Soft Sage
COLOR_ACCENT = colors.HexColor('#B89047')       # Amber Gold
COLOR_BG_LIGHT = colors.HexColor('#F8F9F6')     # Soft Alabaster Light Cream
COLOR_TEXT_DARK = colors.HexColor('#1C2B1A')    # Charcoal Green
COLOR_TEXT_MUTED = colors.HexColor('#5A6E58')   # Muted Green-Grey
COLOR_BORDER = colors.HexColor('#E2E8E0')       # Border Line Color
COLOR_WHITE = colors.HexColor('#FFFFFF')
COLOR_SUCCESS_BG = colors.HexColor('#E8F5E9')   # Soft Green Badge
COLOR_SUCCESS_TEXT = colors.HexColor('#2E7D32')

def create_receipt_pdf(
    output_filename="Dhruthi_Wellness_Receipt_001.pdf",
    receipt_no="DW-2026-001",
    payment_date=None,
    client_name="Valued Client",
    client_phone="+91 98765 43210",
    client_email="client@example.com",
    plan_name="Customized Nutrition & Wellness Plan (1 Month)",
    amount_paid=4999.00,
    payment_method="UPI (Google Pay)",
    transaction_id="TXN9876543210",
    notes="Thank you for choosing Dhruthi Wellness! We look forward to guiding you on your health journey."
):
    if payment_date is None:
        payment_date = datetime.date.today().strftime("%d %b, %Y")

    doc = SimpleDocTemplate(
        output_filename,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()

    # Custom typography styles
    style_header_title = ParagraphStyle(
        'HeaderTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=COLOR_PRIMARY
    )

    style_header_tagline = ParagraphStyle(
        'HeaderTagline',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=COLOR_TEXT_MUTED
    )

    style_receipt_title = ParagraphStyle(
        'ReceiptTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        alignment=TA_RIGHT,
        textColor=COLOR_PRIMARY
    )

    style_receipt_no = ParagraphStyle(
        'ReceiptNo',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        alignment=TA_RIGHT,
        textColor=COLOR_TEXT_MUTED
    )

    style_section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=COLOR_PRIMARY
    )

    style_body_label = ParagraphStyle(
        'BodyLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=13,
        textColor=COLOR_TEXT_MUTED
    )

    style_body_val = ParagraphStyle(
        'BodyVal',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=COLOR_TEXT_DARK
    )

    style_table_header = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=COLOR_WHITE
    )

    style_table_cell = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=COLOR_TEXT_DARK
    )

    style_table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=COLOR_PRIMARY
    )

    style_table_cell_right = ParagraphStyle(
        'TableCellRight',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        alignment=TA_RIGHT,
        textColor=COLOR_PRIMARY
    )

    style_badge = ParagraphStyle(
        'Badge',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        alignment=TA_CENTER,
        textColor=COLOR_SUCCESS_TEXT
    )

    style_footer = ParagraphStyle(
        'Footer',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        alignment=TA_CENTER,
        textColor=COLOR_TEXT_MUTED
    )

    story = []

    # --- TOP BRAND HEADER TABLE ---
    header_left = [
        Paragraph("DHRUTHI WELLNESS", style_header_title),
        Paragraph("Nourish. Balance. Thrive.", style_header_tagline),
        Paragraph("Email: dhruthiwellness@gmail.com", style_header_tagline),
        Paragraph("Phone / WhatsApp: +91 86889 63230 | +91 90524 29208", style_header_tagline),
        Paragraph("Address: BD Colony Near Masjid, Eluru, Andhra Pradesh - 534005", style_header_tagline)
    ]

    header_right = [
        Paragraph("PAYMENT RECEIPT", style_receipt_title),
        Spacer(1, 4),
        Paragraph(f"<b>Receipt No:</b> {receipt_no}", style_receipt_no),
        Paragraph(f"<b>Date:</b> {payment_date}", style_receipt_no),
        Spacer(1, 4),
        Table([[Paragraph("PAYMENT SUCCESSFUL", style_badge)]],
              colWidths=[140],
              style=TableStyle([
                  ('BACKGROUND', (0,0), (-1,-1), COLOR_SUCCESS_BG),
                  ('BOX', (0,0), (-1,-1), 1, COLOR_SUCCESS_TEXT),
                  ('ALIGN', (0,0), (-1,-1), 'CENTER'),
                  ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
                  ('TOPPADDING', (0,0), (-1,-1), 4),
                  ('BOTTOMPADDING', (0,0), (-1,-1), 4),
              ]))
    ]

    header_table = Table([[header_left, header_right]], colWidths=[310, 220])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 15))
    story.append(HRFlowable(width="100%", thickness=1.5, color=COLOR_PRIMARY, spaceBefore=5, spaceAfter=15))

    # --- CLIENT & PAYMENT DETAILS GRID ---
    client_box = [
        Paragraph("RECEIVED FROM", style_section_heading),
        Spacer(1, 4),
        Paragraph(f"<b>Name:</b> {client_name}", style_body_val),
        Paragraph(f"<b>Contact:</b> {client_phone}", style_body_val),
        Paragraph(f"<b>Email:</b> {client_email}", style_body_val),
    ]

    payment_box = [
        Paragraph("PAYMENT DETAILS", style_section_heading),
        Spacer(1, 4),
        Paragraph(f"<b>Mode of Payment:</b> {payment_method}", style_body_val),
        Paragraph(f"<b>Transaction ID:</b> {transaction_id}", style_body_val),
        Paragraph(f"<b>Status:</b> Completed & Verified", style_body_val),
    ]

    info_table = Table([[client_box, payment_box]], colWidths=[260, 270])
    info_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), COLOR_BG_LIGHT),
        ('BACKGROUND', (1,0), (1,0), COLOR_BG_LIGHT),
        ('BOX', (0,0), (0,0), 0.5, COLOR_BORDER),
        ('BOX', (1,0), (1,0), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(info_table)
    story.append(Spacer(1, 20))

    # --- SERVICE SUMMARY TABLE ---
    table_data = [
        [
            Paragraph("S.No.", style_table_header),
            Paragraph("Description / Package Name", style_table_header),
            Paragraph("Amount", style_table_header)
        ],
        [
            Paragraph("1", style_table_cell),
            Paragraph(f"<b>{plan_name}</b><br/><font color='#5A6E58' size=8>Includes personalized diet consultation, progress tracking, and weekly check-ins.</font>", style_table_cell),
            Paragraph(f"INR {amount_paid:,.2f}", style_table_cell_bold)
        ],
        [
            "",
            Paragraph("<b>Total Amount Paid</b>", ParagraphStyle('RightBold', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=11, alignment=TA_RIGHT, textColor=COLOR_PRIMARY)),
            Paragraph(f"INR {amount_paid:,.2f}", style_table_cell_right)
        ]
    ]

    service_table = Table(table_data, colWidths=[40, 360, 130])
    service_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_PRIMARY),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-2), 0.5, COLOR_BORDER),
        ('LINEBELOW', (0,-1), (-1,-1), 1.5, COLOR_PRIMARY),
        ('BACKGROUND', (0,1), (-1,1), COLOR_WHITE),
        ('BACKGROUND', (1,2), (-1,2), COLOR_BG_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(service_table)
    story.append(Spacer(1, 20))

    # --- NOTES / TERMS & AUTHORIZATION ---
    notes_box = [
        Paragraph("<b>Note:</b>", style_body_label),
        Paragraph(notes, style_body_val),
    ]
    
    sig_path_png = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "Images", "akhi_sign_transparent.png")
    sig_path_jpg = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "Images", "akhi_sign.jpeg")
    
    sig_element = Spacer(1, 32)
    if os.path.exists(sig_path_png):
        sig_element = RLImage(sig_path_png, width=115, height=34, hAlign='RIGHT')
    elif os.path.exists(sig_path_jpg):
        sig_element = RLImage(sig_path_jpg, width=115, height=34, hAlign='RIGHT')

    auth_box = [
        Paragraph("<b>For Dhruthi Wellness</b>", ParagraphStyle('AuthRight', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10, alignment=TA_RIGHT, textColor=COLOR_PRIMARY)),
        Spacer(1, 6),
        sig_element,
        Spacer(1, 14),
        Paragraph("Authorized Signatory", ParagraphStyle('AuthSig', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=9, alignment=TA_RIGHT, textColor=COLOR_TEXT_MUTED)),
    ]

    bottom_table = Table([[notes_box, auth_box]], colWidths=[310, 220])
    bottom_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(bottom_table)
    story.append(Spacer(1, 30))

    # --- FOOTER ---
    story.append(HRFlowable(width="100%", thickness=0.5, color=COLOR_BORDER, spaceBefore=10, spaceAfter=10))
    story.append(Paragraph("This is a computer-generated receipt and does not require a physical signature.", style_footer))
    story.append(Paragraph("Dhruthi Wellness • Empowering Healthy Living", style_footer))

    # Build PDF document
    doc.build(story)
    print(f"Successfully generated payment receipt: {output_filename}")
    return output_filename

if __name__ == "__main__":
    # Test script run
    create_receipt_pdf()
