import os
import sys
import datetime
from PIL import Image, ImageDraw, ImageOps
import pypdfium2 as pdfium
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.pdfgen import canvas
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT, TA_JUSTIFY

# Target output paths
WORKSPACE_DIR = r"l:\Developer\nutriflow"
CURRENT_BRAIN_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\57748741-7869-48b9-886e-512eef0b9b75"
ARTIFACTS_DIR = os.environ.get("ARTIFACTS_DIR", CURRENT_BRAIN_DIR)

OUTPUT_PDF_DOCS = os.path.join(WORKSPACE_DIR, "docs", "Dhruthi_Wellness_Terms_and_Conditions.pdf")
OUTPUT_PDF_ROOT = os.path.join(WORKSPACE_DIR, "Dhruthi_Wellness_Terms_and_Conditions.pdf")
OUTPUT_PDF_ARTIFACT = os.path.join(ARTIFACTS_DIR, "Dhruthi_Wellness_Terms_and_Conditions.pdf")

LOGO_IMAGE_SRC = os.path.join(WORKSPACE_DIR, "Images", "Logo_D_bright.png")
LOGO_CIRCULAR_PATH = os.path.join(ARTIFACTS_DIR, "dhruthi_logo_circle_pure.png")

def prepare_circular_logo():
    """Crops Logo_D_bright.png to a clean, borderless circle with transparency."""
    if not os.path.exists(LOGO_IMAGE_SRC):
        return LOGO_IMAGE_SRC
    try:
        img = Image.open(LOGO_IMAGE_SRC).convert("RGBA")
        size = min(img.size)
        
        # Center crop square
        img = img.crop((
            (img.width - size) // 2,
            (img.height - size) // 2,
            (img.width + size) // 2,
            (img.height + size) // 2
        ))
        
        target_size = 400
        img = img.resize((target_size, target_size), Image.Resampling.LANCZOS)
        
        # Create circular mask
        mask = Image.new('L', (target_size, target_size), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, target_size, target_size), fill=255)
        
        circular_img = Image.new('RGBA', (target_size, target_size), (0, 0, 0, 0))
        circular_img.paste(img, (0, 0), mask=mask)
        
        os.makedirs(os.path.dirname(LOGO_CIRCULAR_PATH), exist_ok=True)
        circular_img.save(LOGO_CIRCULAR_PATH, "PNG")
        return LOGO_CIRCULAR_PATH
    except Exception as e:
        print(f"Error processing circular logo: {e}")
        return LOGO_IMAGE_SRC

# Dhruthi Wellness Signature Sage Green Color Palette
COLOR_PAGE_BG = colors.HexColor('#F6F9F5')         # Ultra-Soft Sage Canvas
COLOR_PRIMARY = colors.HexColor('#2E4529')         # Deep Forest Green Primary
COLOR_SECONDARY = colors.HexColor('#6E8B65')       # Elegant Sage Accent
COLOR_SAGE_LIGHT = colors.HexColor('#D3E0CE')      # Light Translucent Sage Wave
COLOR_GOLD = colors.HexColor('#B89047')            # Warm Amber Gold Accent
COLOR_CALLOUT_BG = colors.HexColor('#E8F0E6')      # Soft Pastel Sage Callout Fill
COLOR_WHITE = colors.HexColor('#FFFFFF')
COLOR_BORDER = colors.HexColor('#C4D5C0')          # Soft Sage Border Line
COLOR_TEXT_DARK = colors.HexColor('#1E281C')       # Dark Charcoal Slate Text

class CleanSpaciousSageCanvas(canvas.Canvas):
    """
    Custom Canvas with strict margin bounds:
    - Decorative wave graphics are strictly confined to header/footer margin bands.
    - Zero overlap with flowable document text.
    - Running headers and footers with page numbers.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        width, height = letter  # 612 x 792 pt
        
        # --- Top Decorative Header Zone (y: 742..792) ---
        # 1. Outer Translucent Wave (strictly top 45pt)
        self.setFillColor(COLOR_SAGE_LIGHT)
        p1 = self.beginPath()
        p1.moveTo(width - 150, height)
        p1.curveTo(width - 100, height - 25, width - 50, height - 40, width, height - 48)
        p1.lineTo(width, height)
        p1.close()
        self.drawPath(p1, stroke=0, fill=1)
        
        # 2. Inner Deep Forest Wave (strictly top 35pt)
        self.setFillColor(COLOR_PRIMARY)
        p2 = self.beginPath()
        p2.moveTo(width - 110, height)
        p2.curveTo(width - 70, height - 18, width - 35, height - 30, width, height - 36)
        p2.lineTo(width, height)
        p2.close()
        self.drawPath(p2, stroke=0, fill=1)
        
        # 3. Top-Right Pure Circular Logo Badge (strictly in margin zone)
        circle_logo = prepare_circular_logo()
        if os.path.exists(circle_logo):
            self.setFillColor(COLOR_WHITE)
            self.setStrokeColor(COLOR_SECONDARY)
            self.setLineWidth(1.0)
            self.circle(width - 38, height - 30, 18, stroke=1, fill=1)
            self.drawImage(
                circle_logo,
                width - 54,
                height - 46,
                width=32,
                height=32,
                mask='auto',
                preserveAspectRatio=True
            )

        # 4. Running Header on Page 2+
        if self._pageNumber > 1:
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(COLOR_PRIMARY)
            self.drawString(45, height - 30, "Dhruthi Wellness — Terms & Conditions")
            self.setStrokeColor(COLOR_BORDER)
            self.setLineWidth(0.5)
            self.line(45, height - 35, width - 85, height - 35)

        # --- Bottom Decorative Footer Zone (y: 0..45) ---
        # 5. Outer Translucent Wave (strictly bottom 35pt)
        self.setFillColor(COLOR_SAGE_LIGHT)
        b1 = self.beginPath()
        b1.moveTo(0, 0)
        b1.lineTo(0, 40)
        b1.curveTo(45, 30, 80, 18, 120, 0)
        b1.close()
        self.drawPath(b1, stroke=0, fill=1)

        # 6. Inner Rich Soft Sage Wave (strictly bottom 25pt)
        self.setFillColor(COLOR_SECONDARY)
        b2 = self.beginPath()
        b2.moveTo(0, 0)
        b2.lineTo(0, 28)
        b2.curveTo(35, 20, 60, 12, 90, 0)
        b2.close()
        self.drawPath(b2, stroke=0, fill=1)
        
        # 7. Running Footer
        self.setStrokeColor(COLOR_BORDER)
        self.setLineWidth(0.5)
        self.line(45, 32, width - 45, 32)

        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(COLOR_GOLD)
        self.drawRightString(width - 45, 18, "dhruthiwellness@gmail.com")
        
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.setFont("Helvetica", 8)
        self.setFillColor(COLOR_PRIMARY)
        self.drawString(45, 18, page_str)
        
        self.restoreState()

def draw_background(canvas_obj, doc_obj):
    canvas_obj.saveState()
    canvas_obj.setFillColor(COLOR_PAGE_BG)
    canvas_obj.rect(0, 0, 612, 792, stroke=0, fill=1)
    canvas_obj.restoreState()

def create_story(target_path):
    doc = SimpleDocTemplate(
        target_path,
        pagesize=letter,
        leftMargin=45,
        rightMargin=45,
        topMargin=52,
        bottomMargin=45
    )

    styles = getSampleStyleSheet()

    # Spacious, Elegant Typography Styles
    style_brand_pill = ParagraphStyle(
        'BrandPillText',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=13,
        textColor=COLOR_WHITE,
        alignment=TA_LEFT
    )

    style_main_title = ParagraphStyle(
        'MainTitleText',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=COLOR_PRIMARY,
        spaceBefore=4,
        spaceAfter=10
    )

    style_section_num = ParagraphStyle(
        'SectionNumBadge',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=13,
        textColor=COLOR_WHITE,
        alignment=TA_CENTER
    )

    style_section_title = ParagraphStyle(
        'SectionTitleText',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12.5,
        leading=15,
        textColor=COLOR_TEXT_DARK,
        alignment=TA_LEFT
    )

    style_body = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.0,
        leading=12.5,
        textColor=COLOR_TEXT_DARK,
        spaceAfter=4
    )

    style_callout_body = ParagraphStyle(
        'CalloutBodyText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.6,
        leading=11.8,
        textColor=COLOR_TEXT_DARK,
        spaceAfter=3
    )

    style_table_header = ParagraphStyle(
        'TableHeaderText',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.8,
        leading=11.5,
        textColor=COLOR_WHITE,
        alignment=TA_LEFT
    )

    style_table_cell = ParagraphStyle(
        'TableCellText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.6,
        leading=11.5,
        textColor=COLOR_TEXT_DARK,
        alignment=TA_LEFT
    )

    story = []

    def make_section_header_flowable(num, title):
        num_p = Paragraph(f"<b>{num}</b>", style_section_num)
        title_p = Paragraph(f"<b>{title}</b>", style_section_title)
        
        t = Table([[num_p, title_p]], colWidths=[22, 500])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (0,0), COLOR_PRIMARY),
            ('ALIGN', (0,0), (0,0), 'CENTER'),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('TOPPADDING', (0,0), (0,0), 2.5),
            ('BOTTOMPADDING', (0,0), (0,0), 2.5),
            ('LEFTPADDING', (0,0), (0,0), 0),
            ('RIGHTPADDING', (0,0), (0,0), 0),
            ('LEFTPADDING', (1,0), (1,0), 7),
            ('TOPPADDING', (1,0), (1,0), 1),
            ('BOTTOMPADDING', (1,0), (1,0), 1),
        ]))
        return t

    # --- Header Banner (Page 1) ---
    brand_pill = Table([[Paragraph("<b>Dhruthi Wellness's</b>", style_brand_pill)]], colWidths=[140])
    brand_pill.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), COLOR_PRIMARY),
        ('ALIGN', (0,0), (0,0), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(brand_pill)
    story.append(Paragraph("Terms & Conditions", style_main_title))

    # --- 1. General ---
    hdr1 = make_section_header_flowable("1", "General")
    p1_1 = Paragraph("1.1. These Terms and Conditions (“T&Cs”) govern the use, purchase, and participation in clinical nutrition and lifestyle programs offered by <b>Dhruthi Wellness</b>.", style_body)
    p1_2 = Paragraph("1.2. By enrolling in any program, the client agrees to abide by these T&Cs.", style_body)
    p1_3 = Paragraph("1.3. These terms are subject to change. Clients will be notified of significant changes via email or platform notification.", style_body)
    story.append(KeepTogether([hdr1, Spacer(1, 3), p1_1, p1_2, p1_3]))
    story.append(Spacer(1, 5))

    # --- 2. Program Validity ---
    hdr2 = make_section_header_flowable("2", "Program Validity")
    p2_1 = Paragraph("2.1. Program duration starts from the scheduled commencement date selected by the client or mutually agreed upon.", style_body)
    p2_2 = Paragraph("2.2. Each program has a defined validity (e.g. 30, 90, 180 days), which includes a permissible pause window.", style_body)
    story.append(KeepTogether([hdr2, Spacer(1, 3), p2_1, p2_2]))
    story.append(Spacer(1, 5))

    # --- 3. Refund Policy ---
    hdr3 = make_section_header_flowable("3", "Refund Policy")
    p3_1 = Paragraph("3.1. <b>No Refunds</b> are allowed once the payment has been completed.", style_body)
    p3_2 = Paragraph("3.2. In the event a client is unable to continue the program due to medical reasons, a refund may be provided upon submission of valid medical documentation and a formal request.", style_body)
    
    refund_items = [
        Paragraph("• If the refund request is made within the first 48 hours from the purchase of the program, a full refund will be issued.", style_callout_body),
        Paragraph("• If the refund request is made after the first 48 hours but within 10 days from the start date of the program, a 25% administrative deduction + payment gateway charges if applicable will be deducted, and the remaining amount will be refunded on a pro-rated basis, calculated against the unused days of the program.", style_callout_body),
        Paragraph("• For requests made after 10 days, a 40% administrative deduction + payment gateway charges if applicable will be deducted, and the remaining 60% amount will be refunded on a pro-rated basis, calculated against the unused days of the program.", style_callout_body)
    ]
    refund_box = Table([[refund_items]], colWidths=[514])
    refund_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CALLOUT_BG),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
    ]))
    
    p3_3 = Paragraph("3.3. Non-attendance, partial participation, or discontentment does not qualify for a refund.", style_body)
    p3_4 = Paragraph("3.4. Refunds to be reviewed and processed can take up-to 10-15 days.", style_body)

    proc_items = [
        Paragraph("After the review, Dhruthi Wellness has the right to deny the request and provide alternative solutions to the issue as refunds are not guaranteed.", style_callout_body),
        Spacer(1, 2),
        Paragraph("If a refund is issued, it would take 3-5 business days to get credited to the bank account.", style_callout_body),
        Spacer(1, 2),
        Paragraph("Please note that payment gateway charges are non-refundable and will be deducted from the refund amount.", style_callout_body)
    ]
    proc_box = Table([[proc_items]], colWidths=[514])
    proc_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CALLOUT_BG),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
    ]))

    story.append(KeepTogether([hdr3, Spacer(1, 3), p3_1, p3_2, refund_box, Spacer(1, 3), p3_3, p3_4, proc_box]))
    story.append(Spacer(1, 5))

    # --- 4. Program Transfer Policy ---
    hdr4 = make_section_header_flowable("4", "Program Transfer Policy")
    p4_1 = Paragraph("4.1. Clients may transfer their program to a relative/friend (parent, sibling, spouse, or child) once, within the first 10 days of the program's start.", style_body)
    p4_2 = Paragraph("4.2. Transfer request must be submitted in writing to <b>dhruthiwellness@gmail.com</b>.", style_body)
    p4_3 = Paragraph("4.3. Transfer is not applicable for already completed sessions.", style_body)
    p4_4 = Paragraph("4.4. A transfer can be made only once during the course of the program.", style_body)
    p4_5 = Paragraph("4.5. Only up to 75% of the remaining program duration is eligible for transfer. <font color='#556052'>(For example, if 100 days are remaining, a maximum of 75 days can be transferred.)</font>", style_body)
    p4_6 = Paragraph("4.6. Transferred programs are not eligible for refunds under any circumstances.", style_body)
    story.append(KeepTogether([hdr4, Spacer(1, 3), p4_1, p4_2, p4_3, p4_4, p4_5, p4_6]))
    story.append(Spacer(1, 5))

    # --- 5. Coach Change Request ---
    hdr5 = make_section_header_flowable("5", "Coach Change Request")
    p5_1 = Paragraph("5.1. Coaches are assigned based on individual goals and requirements, as assessed by our expert team. Requests for coach changes will not be accommodated under any circumstances.", style_body)
    story.append(KeepTogether([hdr5, Spacer(1, 3), p5_1]))
    story.append(Spacer(1, 5))

    # --- 6. Pause and Resume Policy ---
    hdr6 = make_section_header_flowable("6", "Pause and Resume Policy")
    p6_1 = Paragraph("6.1. Clients are allowed to pause the program for a maximum of:", style_body)

    pause_table_data = [
        [Paragraph("<b>Program Duration</b>", style_table_header), Paragraph("<b>Pause Eligibility (in days)</b>", style_table_header)],
        [Paragraph("6 Months", style_table_cell), Paragraph("28 days (twice during program)", style_table_cell)],
        [Paragraph("9 Months", style_table_cell), Paragraph("42 days (twice during program)", style_table_cell)],
        [Paragraph("12 Months", style_table_cell), Paragraph("56 days (thrice during program)", style_table_cell)]
    ]
    pause_table = Table(pause_table_data, colWidths=[190, 324])
    pause_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_PRIMARY),
        ('BACKGROUND', (0,1), (-1,-1), COLOR_CALLOUT_BG),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))

    p6_2 = Paragraph("6.2. A minimum 3-day prior notice is required to activate a pause.", style_body)
    p6_3 = Paragraph("6.3. Pauses for less than 10 days or before the start date will not be accommodated.", style_body)
    p6_4 = Paragraph("6.4. If a client fails to resume post pause limit, the program will be auto closed after 30 days.", style_body)
    p6_5 = Paragraph("6.5. Absence from the program without prior notice or approval will not be eligible for any pause requests, retrospective or future, under any circumstances.", style_body)

    story.append(KeepTogether([hdr6, Spacer(1, 3), p6_1, pause_table, Spacer(1, 3), p6_2, p6_3, p6_4, p6_5]))
    story.append(Spacer(1, 5))

    # --- 7. Start Date Change Policy ---
    hdr7 = make_section_header_flowable("7", "Start Date Change Policy")
    p7_1 = Paragraph("7.1. Please note that the start date change requests are not encouraged as it is fixed and cannot be rescheduled.", style_body)
    story.append(KeepTogether([hdr7, Spacer(1, 3), p7_1]))
    story.append(Spacer(1, 5))

    # --- 8. Program Switch Policy ---
    hdr8 = make_section_header_flowable("8", "Program Switch Policy")
    p8_1 = Paragraph("8.1. Difference in pricing must be paid if changing to a higher-value program.", style_body)
    p8_2 = Paragraph("8.2. No refunds are issued if changing to a lower-value program.", style_body)
    p8_3 = Paragraph("8.3. A change request must be made by writing to <b>dhruthiwellness@gmail.com</b>.", style_body)
    story.append(KeepTogether([hdr8, Spacer(1, 3), p8_1, p8_2, p8_3]))
    story.append(Spacer(1, 5))

    # --- 9. Program Upgrades ---
    hdr9 = make_section_header_flowable("9", "Program Upgrades")
    p9_1 = Paragraph("9.1. Upgrades (e.g., from Basic to Premium) are allowed at any point.", style_body)
    p9_2 = Paragraph("9.2. Clients must pay the price differential and will retain their original start date and progress.", style_body)
    p9_3 = Paragraph("9.3. Upgrade does not reset or extend the validity period unless explicitly mentioned.", style_body)
    story.append(KeepTogether([hdr9, Spacer(1, 3), p9_1, p9_2, p9_3]))
    story.append(Spacer(1, 5))

    # --- 10. Unused Days ---
    hdr10 = make_section_header_flowable("10", "Unused Days")
    p10_1 = Paragraph("10.1. Days lost due to client's non-participation are not compensated or carried forward.", style_body)
    p10_2 = Paragraph("10.2. Exceptions may be granted under medical grounds or force majeure events (see section 11).", style_body)
    p10_3 = Paragraph("10.3. Consistent absenteeism (>30 days) may lead to program termination.", style_body)
    story.append(KeepTogether([hdr10, Spacer(1, 3), p10_1, p10_2, p10_3]))
    story.append(Spacer(1, 5))

    # --- 11. Medical & Force Majeure Exceptions ---
    hdr11 = make_section_header_flowable("11", "Medical & Force Majeure Exceptions")
    p11_1 = Paragraph("11.1. Clients with temporary medical conditions (e.g., injuries, hospitalization) may apply for a pause or extension with valid medical proof.", style_body)
    p11_2 = Paragraph("11.2. Medical documentation must be submitted within 7 days of the incident.", style_body)
    p11_3 = Paragraph("11.3. For long-term illness, clients may:", style_body)
    p11_3a = Paragraph("• Freeze / stop the program for a maximum of 3 months", ParagraphStyle('SubBullet1', parent=style_body, leftIndent=12))
    p11_3b = Paragraph("• Transfer the program to a family member (see Section 4)", ParagraphStyle('SubBullet2', parent=style_body, leftIndent=12))
    p11_4 = Paragraph("11.4. Decisions are at the sole discretion of Dhruthi Wellness.", style_body)
    story.append(KeepTogether([hdr11, Spacer(1, 3), p11_1, p11_2, p11_3, p11_3a, p11_3b, p11_4]))

    return doc, story

def build_terms_pdf():
    os.makedirs(os.path.dirname(OUTPUT_PDF_DOCS), exist_ok=True)
    os.makedirs(ARTIFACTS_DIR, exist_ok=True)
    
    target_path = OUTPUT_PDF_DOCS
    doc, story = create_story(target_path)
    
    try:
        doc.build(story, canvasmaker=CleanSpaciousSageCanvas, onFirstPage=draw_background, onLaterPages=draw_background)
        actual_path = target_path
    except PermissionError:
        print("Target PDF file locked by open viewer. Saving to alternative filename...")
        fallback_path = os.path.join(WORKSPACE_DIR, "docs", "Dhruthi_Wellness_Terms_and_Conditions_Clean.pdf")
        doc_alt, story_alt = create_story(fallback_path)
        doc_alt.build(story_alt, canvasmaker=CleanSpaciousSageCanvas, onFirstPage=draw_background, onLaterPages=draw_background)
        actual_path = fallback_path

    # Copy to artifact path
    import shutil
    try:
        shutil.copy2(actual_path, OUTPUT_PDF_ARTIFACT)
    except Exception:
        pass
    print(f"Successfully generated terms PDF at:\n - {actual_path}\n - {OUTPUT_PDF_ARTIFACT}")
    render_pdf_to_images(actual_path)

def render_pdf_to_images(pdf_path):
    print(f"Rendering Terms PDF ({pdf_path}) pages to PNG preview...")
    try:
        with open(pdf_path, 'rb') as f:
            data = f.read()
        pdf_doc = pdfium.PdfDocument(data)
        print(f"Total pages in generated PDF: {len(pdf_doc)}")
        for i, page in enumerate(pdf_doc):
            bitmap = page.render(scale=2.0)
            img = bitmap.to_pil()
            img_path = os.path.join(ARTIFACTS_DIR, f"clean_spacious_page_{i+1}.png")
            img.save(img_path, "PNG")
            print(f"Page {i+1} saved to {img_path}")
        pdf_doc.close()
    except Exception as e:
        print(f"Error rendering PDF pages to image: {e}")

if __name__ == "__main__":
    build_terms_pdf()
