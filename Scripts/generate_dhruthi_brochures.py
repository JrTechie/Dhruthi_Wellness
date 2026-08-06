import os
import sys
from PIL import Image, ImageDraw, ImageOps
import pypdfium2 as pdfium

# ReportLab imports
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, Image as RLImage
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY, TA_RIGHT
from reportlab.lib import colors
from reportlab.pdfgen import canvas

# Define paths
WORKSPACE_DIR = r"l:\Developer\nutriflow"
ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\41190781-4e62-4351-9118-4029d167bcc6"

COACH_IMAGE_SRC = os.path.join(WORKSPACE_DIR, "Images", "Akhila.PNG")
COACH_IMAGE_CIRCULAR = os.path.join(ARTIFACTS_DIR, "Akhila_circle_borderless.png")

# Illustration Paths
IMG_DIET = os.path.join(ARTIFACTS_DIR, "diet_plan.png")
IMG_LIFESTYLE = os.path.join(ARTIFACTS_DIR, "lifestyle_guidance.png")
IMG_PROGRESS = os.path.join(ARTIFACTS_DIR, "progress_review.png")
IMG_SUPPORT = os.path.join(ARTIFACTS_DIR, "whatsapp_support.png")
IMG_MEALS = os.path.join(ARTIFACTS_DIR, "meal_recommendations.png")

def prepare_coach_image():
    """Crops the coach image to a clean circle with transparency and no border."""
    if not os.path.exists(COACH_IMAGE_SRC):
        print(f"Coach image not found at {COACH_IMAGE_SRC}. Skipping image preparation.")
        return False
        
    print(f"Processing coach image {COACH_IMAGE_SRC} (borderless)...")
    try:
        img = Image.open(COACH_IMAGE_SRC).convert("RGBA")
        size = min(img.size)
        
        # Center crop to a square
        img = img.crop((
            (img.width - size) // 2,
            (img.height - size) // 2,
            (img.width + size) // 2,
            (img.height + size) // 2
        ))
        
        # Resize to standard size (300x300) for high quality but lightweight PDF
        target_size = 300
        img = img.resize((target_size, target_size), Image.Resampling.LANCZOS)
        
        # Create a circle mask
        mask = Image.new('L', (target_size, target_size), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, target_size, target_size), fill=255)
        
        # Create output image with transparency and paste crop
        circular_img = Image.new('RGBA', (target_size, target_size), (0, 0, 0, 0))
        circular_img.paste(img, (0, 0), mask=mask)
        
        circular_img.save(COACH_IMAGE_CIRCULAR, "PNG")
        print(f"Circular image saved successfully to {COACH_IMAGE_CIRCULAR}")
        return True
    except Exception as e:
        print(f"Error processing image: {e}")
        return False

# Color Palette (Pastel Natural Theme)
COLOR_PRIMARY = colors.HexColor('#3B5336')      # Forest Green
COLOR_SECONDARY = colors.HexColor('#A3B899')    # Soft Sage
COLOR_ACCENT = colors.HexColor('#B89047')       # Subtle Amber/Gold
COLOR_BG_LIGHT = colors.HexColor('#F4F1EA')     # Alabaster Cream
COLOR_TEXT_DARK = colors.HexColor('#2C3E2B')    # Deep Charcoal Green
COLOR_WHITE = colors.HexColor('#FFFFFF')
COLOR_MUTED = colors.HexColor('#70826C')        # Muted Olive

def draw_cover_bg(canvas_obj, doc):
    """Draws background color and thin Forest Green border for Page 1 (Cover Page)."""
    canvas_obj.saveState()
    
    width, height = letter
    
    # Fill background with Alabaster Cream
    canvas_obj.setFillColor(COLOR_BG_LIGHT)
    canvas_obj.rect(0, 0, width, height, fill=True, stroke=False)
    
    # Forest Green thin border
    canvas_obj.setStrokeColor(COLOR_PRIMARY)
    canvas_obj.setLineWidth(1.5)
    canvas_obj.rect(20, 20, width - 40, height - 40, fill=False, stroke=True)
    
    # Elegant Ornamental Corner Brackets
    canvas_obj.setLineWidth(1.5)
    # Top-left
    canvas_obj.line(35, height - 35, 65, height - 35)
    canvas_obj.line(35, height - 35, 35, height - 65)
    # Top-right
    canvas_obj.line(width - 35, height - 35, width - 65, height - 35)
    canvas_obj.line(width - 35, height - 35, width - 35, height - 65)
    # Bottom-left
    canvas_obj.line(35, 35, 65, 35)
    canvas_obj.line(35, 35, 35, 65)
    # Bottom-right
    canvas_obj.line(width - 35, 35, width - 65, 35)
    canvas_obj.line(width - 35, 35, width - 35, 65)
    
    # Bottom Tagline Block on Cover
    canvas_obj.setFillColor(COLOR_PRIMARY)
    canvas_obj.setFont("Helvetica-Bold", 9)
    canvas_obj.drawCentredString(width / 2, 70, "NOURISHING YOU. NATURALLY.")
    
    canvas_obj.setFillColor(COLOR_TEXT_DARK)
    canvas_obj.setFont("Helvetica", 8.5)
    canvas_obj.drawCentredString(width / 2, 50, "Instagram: @dhruthi_wellness   |   Phone: 8688963230")
    
    canvas_obj.restoreState()

def draw_inside_bg(canvas_obj, doc):
    """Draws background color, header, and footer layout for inside pages."""
    canvas_obj.saveState()
    
    width, height = letter
    
    # Fill background with Alabaster Cream
    canvas_obj.setFillColor(COLOR_BG_LIGHT)
    canvas_obj.rect(0, 0, width, height, fill=True, stroke=False)
    
    # Header Bar (Forest Green)
    header_h = 45
    canvas_obj.setFillColor(COLOR_PRIMARY)
    canvas_obj.rect(0, height - header_h, width, header_h, fill=True, stroke=False)
    
    # Gold Header Bottom Border
    canvas_obj.setFillColor(COLOR_ACCENT)
    canvas_obj.rect(0, height - header_h - 2, width, 2, fill=True, stroke=False)
    
    # Header Branding Text
    canvas_obj.setFillColor(COLOR_WHITE)
    canvas_obj.setFont("Helvetica-Bold", 10)
    canvas_obj.drawString(36, height - 28, "DHRUTHI WELLNESS")
    canvas_obj.setFont("Helvetica-Oblique", 8.5)
    canvas_obj.drawRightString(width - 36, height - 28, "NOURISHING YOU. NATURALLY.")
    
    # Footer Muted Border Line
    canvas_obj.setStrokeColor(COLOR_SECONDARY)
    canvas_obj.setLineWidth(0.5)
    canvas_obj.line(36, 45, width - 36, 45)
    
    # Footer branding info
    canvas_obj.setFillColor(COLOR_TEXT_DARK)
    canvas_obj.setFont("Helvetica-Bold", 8)
    canvas_obj.drawString(36, 30, "Insta: @dhruthi_wellness   •   Phone: 8688963230")
    
    canvas_obj.restoreState()

class NumberedCanvas(canvas.Canvas):
    """Two-pass canvas to dynamically compute and print the total page count in the footer."""
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
            self.draw_page_number(num_pages)
            super().showPage()
        super().save()

    def draw_page_number(self, page_count):
        if self._pageNumber > 1:
            self.saveState()
            self.setFillColor(COLOR_TEXT_DARK)
            self.setFont("Helvetica", 8)
            width, height = letter
            self.drawRightString(width - 36, 30, f"Page {self._pageNumber} of {page_count}")
            self.restoreState()

def setup_styles():
    styles = getSampleStyleSheet()
    
    # Custom text styles
    styles.add(ParagraphStyle(
        name='DhruthiCoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=30,
        textColor=COLOR_PRIMARY,
        alignment=TA_CENTER,
        spaceAfter=4
    ))
    
    styles.add(ParagraphStyle(
        name='DhruthiCoverTag',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=14,
        textColor=COLOR_SECONDARY,
        alignment=TA_CENTER,
        spaceAfter=25
    ))
    
    styles.add(ParagraphStyle(
        name='DhruthiCoverPlan',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=COLOR_PRIMARY,
        alignment=TA_CENTER,
        spaceAfter=2
    ))
    
    styles.add(ParagraphStyle(
        name='DhruthiCoverSubPlan',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=COLOR_TEXT_DARK,
        alignment=TA_CENTER,
        spaceAfter=20
    ))
    
    styles.add(ParagraphStyle(
        name='DhruthiCoachName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=COLOR_PRIMARY,
        alignment=TA_CENTER,
        spaceAfter=2
    ))
    
    styles.add(ParagraphStyle(
        name='DhruthiCoachSub',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13,
        textColor=COLOR_TEXT_DARK,
        alignment=TA_CENTER,
        spaceAfter=15
    ))
    
    styles.add(ParagraphStyle(
        name='DhruthiCoverDesc',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14.5,
        textColor=COLOR_TEXT_DARK,
        alignment=TA_CENTER,
        spaceAfter=15
    ))
    
    styles.add(ParagraphStyle(
        name='DhruthiPageTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=COLOR_PRIMARY,
        spaceAfter=4
    ))
    
    styles.add(ParagraphStyle(
        name='DhruthiPageSub',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=13,
        textColor=COLOR_MUTED,
        spaceAfter=12
    ))
    
    styles.add(ParagraphStyle(
        name='DhruthiCardTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=COLOR_PRIMARY,
        spaceAfter=6
    ))
    
    styles.add(ParagraphStyle(
        name='DhruthiCardBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=COLOR_TEXT_DARK,
        leftIndent=15,
        firstLineIndent=-15,
        spaceAfter=4
    ))
    
    # Grid text styles for the visual features table
    styles.add(ParagraphStyle(
        name='DhruthiFeatureText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=COLOR_TEXT_DARK
    ))
    
    styles.add(ParagraphStyle(
        name='DhruthiTableHead',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=COLOR_WHITE,
        alignment=TA_CENTER
    ))
    
    styles.add(ParagraphStyle(
        name='DhruthiTableBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=COLOR_TEXT_DARK,
        alignment=TA_CENTER
    ))
    
    styles.add(ParagraphStyle(
        name='DhruthiTableBodyBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=COLOR_PRIMARY,
        alignment=TA_CENTER
    ))
    
    styles.add(ParagraphStyle(
        name='DhruthiTableBodySavings',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=COLOR_ACCENT,
        alignment=TA_CENTER
    ))
    
    styles.add(ParagraphStyle(
        name='DhruthiCTATitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=COLOR_WHITE,
        alignment=TA_CENTER,
        spaceAfter=4
    ))
    
    styles.add(ParagraphStyle(
        name='DhruthiCTABody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=COLOR_BG_LIGHT,
        alignment=TA_CENTER,
        spaceAfter=10
    ))
    
    styles.add(ParagraphStyle(
        name='DhruthiCTALink',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=COLOR_ACCENT,
        alignment=TA_CENTER
    ))
    
    return styles

def make_features_table(styles):
    """Creates a table displaying the 5 core plan features with generated visual illustration images."""
    features = [
        (IMG_DIET, "Personalized Diet Plan", "Tailored to your unique body type, routine, habits, and preferences."),
        (IMG_LIFESTYLE, "Lifestyle Management", "Guidance on sleep, stress management, routines, and sustainable habit formation."),
        (IMG_PROGRESS, "Weekly Progress Review", "Consistent metabolic reviews, weight tracking, and plan adjustments."),
        (IMG_SUPPORT, "WhatsApp Support", "Direct WhatsApp access for instant queries and monitoring of your daily meal plates."),
        (IMG_MEALS, "Customized Meal Recommendations", "Nutrient-dense, delicious, and healthy recipes from our digital vault.")
    ]
    
    table_data = []
    for img_path, title, desc in features:
        if os.path.exists(img_path):
            img_flowable = RLImage(img_path, width=32, height=32)
        else:
            img_flowable = "" # fallback empty cell
            
        text_flowable = Paragraph(f"<b>{title}</b> — {desc}", styles['DhruthiFeatureText'])
        table_data.append([img_flowable, "", text_flowable])
        
    features_table = Table(table_data, colWidths=[36, 12, 468])
    features_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (0,0), (0,-1), 'CENTER'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    return features_table

def build_individual_brochure(plan_name, plan_focus, plan_targets, plan_desc, pricing_rows, output_path, styles):
    story = []
    
    # ----------------------------------------------------
    # PAGE 1: COVER PAGE
    # ----------------------------------------------------
    story.append(Spacer(1, 40))
    story.append(Paragraph("DHRUTHI WELLNESS", styles['DhruthiCoverTitle']))
    story.append(Paragraph("NOURISHING YOU. NATURALLY.", styles['DhruthiCoverTag']))
    
    story.append(Paragraph(plan_name.upper(), styles['DhruthiCoverPlan']))
    story.append(Paragraph("DHRUTHI TRANSFORMATION PROGRAMS", styles['DhruthiCoverSubPlan']))
    story.append(Spacer(1, 10))
    
    # Add circular coach image if prepared
    if os.path.exists(COACH_IMAGE_CIRCULAR):
        coach_img = RLImage(COACH_IMAGE_CIRCULAR, width=140, height=140)
        img_table = Table([[coach_img]], colWidths=[540])
        img_table.setStyle(TableStyle([
            ('ALIGN', (0,0), (-1,-1), 'CENTER'),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(img_table)
        story.append(Spacer(1, 15))
    else:
        story.append(Spacer(1, 120))
        
    story.append(Paragraph("Dt. Akhila Konakalla", styles['DhruthiCoachName']))
    story.append(Paragraph("Clinical Nutritionist", styles['DhruthiCoachSub']))
    story.append(Spacer(1, 5))
    
    story.append(Paragraph(plan_desc, styles['DhruthiCoverDesc']))
    
    story.append(PageBreak())
    
    # ----------------------------------------------------
    # PAGE 2: DETAILS & PRICING
    # ----------------------------------------------------
    story.append(Paragraph(f"{plan_name.upper()} PROGRAM DETAILS", styles['DhruthiPageTitle']))
    story.append(Paragraph("A customized, scientific program designed to nourish your body and optimize your health naturally.", styles['DhruthiPageSub']))
    story.append(Spacer(1, 4))
    
    # Plan Focus and Targets card content
    card_content = [
        Paragraph("PROGRAM TARGETS", styles['DhruthiCardTitle']),
    ]
    for target in plan_targets:
        card_content.append(Paragraph(f"✔ <b>{target}</b>", styles['DhruthiCardBullet']))
        
    card_content.append(Spacer(1, 4))
    card_content.append(Paragraph("EVERY DHRUTHI PLAN INCLUDES", styles['DhruthiCardTitle']))
    
    # Get the features table which includes the illustration images
    features_grid = make_features_table(styles)
    card_content.append(features_grid)
        
    card_table = Table([[card_content]], colWidths=[540])
    card_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_WHITE),
        ('BOX', (0,0), (-1,-1), 1, COLOR_SECONDARY),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(card_table)
    story.append(Spacer(1, 12))
    
    # Pricing Table
    pricing_data = [
        [
            Paragraph("DURATION", styles['DhruthiTableHead']),
            Paragraph("REGULAR PRICE", styles['DhruthiTableHead']),
            Paragraph("SPECIAL OFFER", styles['DhruthiTableHead']),
            Paragraph("SAVINGS", styles['DhruthiTableHead'])
        ]
    ]
    for row in pricing_rows:
        pricing_data.append([
            Paragraph(row[0], styles['DhruthiTableBody']),
            Paragraph(row[1], styles['DhruthiTableBody']),
            Paragraph(row[2], styles['DhruthiTableBodyBold']),
            Paragraph(row[3], styles['DhruthiTableBodySavings'])
        ])
        
    price_table = Table(pricing_data, colWidths=[150, 120, 140, 130])
    price_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_PRIMARY),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_SECONDARY),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('BACKGROUND', (0,1), (-1,1), COLOR_WHITE),
        ('BACKGROUND', (0,2), (-1,2), COLOR_BG_LIGHT),
        ('BACKGROUND', (0,3), (-1,3), COLOR_WHITE),
    ]))
    story.append(price_table)
    story.append(Spacer(1, 12))
    
    # CTA Box
    cta_content = [
        Paragraph("BOOK YOUR CONSULTATION TODAY!", styles['DhruthiCTATitle']),
        Paragraph("Let's work together towards a healthier you. Online consultations are available across India.", styles['DhruthiCTABody']),
        Paragraph("<b>INSTAGRAM:</b> <font color='#B89047'><a href='https://instagram.com/dhruthi_wellness'>@dhruthi_wellness</a></font>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>PHONE:</b> <font color='#B89047'><a href='tel:8688963230'>+91 8688963230</a></font>", styles['DhruthiCTALink'])
    ]
    
    cta_table = Table([[cta_content]], colWidths=[540])
    cta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_PRIMARY),
        ('BOX', (0,0), (-1,-1), 1.25, COLOR_ACCENT),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ]))
    story.append(cta_table)
    
    # Document Build
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=65,
        bottomMargin=60
    )
    
    print(f"Building PDF: {output_path}...")
    doc.build(story, canvasmaker=NumberedCanvas, onFirstPage=draw_cover_bg, onLaterPages=draw_inside_bg)
    print("Success.")

def build_all_brochures():
    styles = setup_styles()
    
    # 1. DHRUTHI PRO
    pro_desc = ("A dedicated program focused on Weight Loss, Weight Gain, and "
                "Lifestyle Management. Designed for individuals without active "
                "medical conditions, this plan optimizes your nutrition, develops positive "
                "daily eating habits, and supports long-term physical well-being naturally.")
    pro_targets = ["Weight Loss", "Weight Gain", "Lifestyle Management"]
    pro_pricing = [
        ["1 Month Plan", "Rs. 2,599", "Rs. 1,299", "50% OFF"],
        ["3 Months Plan", "Rs. 7,799", "Rs. 3,699", "53% OFF"],
        ["6 Months Plan", "Rs. 15,999", "Rs. 6,499", "59% OFF"]
    ]
    pro_pdf = os.path.join(WORKSPACE_DIR, "Dhruthi_Pro_Brochure.pdf")
    build_individual_brochure("Dhruthi Pro", "No Medical Condition", pro_targets, pro_desc, pro_pricing, pro_pdf, styles)
    
    # 2. DHRUTHI ELITE
    elite_desc = ("A precision medical nutrition therapy program tailored for managing "
                  "conditions like PCOD/PCOS Management, Thyroid Management, and Diabetes Management. We address "
                  "underlying metabolic challenges through custom therapeutic diets, daily meal plates monitoring, "
                  "and expert clinical review to restore balance.")
    elite_targets = ["Diabetes Management", "PCOD/PCOS Management", "Thyroid Management"]
    elite_pricing = [
        ["1 Month Plan", "Rs. 3,399", "Rs. 1,699", "50% OFF"],
        ["3 Months Plan", "Rs. 10,194", "Rs. 4,899", "52% OFF"],
        ["6 Months Plan", "Rs. 20,999", "Rs. 8,499", "60% OFF"]
    ]
    elite_pdf = os.path.join(WORKSPACE_DIR, "Dhruthi_Elite_Brochure.pdf")
    build_individual_brochure("Dhruthi Elite", "Medical Condition", elite_targets, elite_desc, elite_pricing, elite_pdf, styles)
    
    # 3. DHRUTHI PRECONCEPTION
    precon_desc = ("Optimizing your reproductive health for a natural, healthy conception. "
                   "Focused on Fertility Nutrition, Pregnancy Nutrition, and IVF Nutrition, this scientific plan "
                   "uses targeted clinical nutrition to nourish your body, manage hormones, and prepare "
                   "a strong foundation for motherhood.")
    precon_targets = ["Fertility Nutrition", "Pregnancy Nutrition", "IVF Nutrition"]
    precon_pricing = [
        ["1 Month Plan", "Rs. 3,999", "Rs. 1,999", "50% OFF"],
        ["3 Months Plan", "Rs. 11,994", "Rs. 5,799", "52% OFF"],
        ["6 Months Plan", "Rs. 23,999", "Rs. 9,999", "58% OFF"]
    ]
    precon_pdf = os.path.join(WORKSPACE_DIR, "Dhruthi_Preconception_Brochure.pdf")
    build_individual_brochure("Dhruthi Preconception", "Fertility", precon_targets, precon_desc, precon_pricing, precon_pdf, styles)
    
    # Render PDF pages to images
    render_all_to_images([pro_pdf, elite_pdf, precon_pdf])

def render_all_to_images(pdf_paths):
    """Renders the pages of all generated PDFs to images for walkthrough verification."""
    print("Rendering PDF pages to PNGs...")
    for pdf_path in pdf_paths:
        if not os.path.exists(pdf_path):
            continue
        basename = os.path.basename(pdf_path).replace(".pdf", "")
        try:
            doc = pdfium.PdfDocument(pdf_path)
            for i, page in enumerate(doc):
                bitmap = page.render(scale=150/72)
                pil_img = bitmap.to_pil()
                out_path = os.path.join(ARTIFACTS_DIR, f"{basename.lower()}_page_{i+1}.png")
                pil_img.save(out_path, "PNG")
                print(f"Saved {out_path}")
        except Exception as e:
            print(f"Error rendering {pdf_path}: {e}")

if __name__ == "__main__":
    prepare_coach_image()
    build_all_brochures()
