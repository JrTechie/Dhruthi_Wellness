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

COACH_IMAGE_SRC = os.path.join(WORKSPACE_DIR, "Akhila.PNG")
COACH_IMAGE_CIRCULAR = os.path.join(ARTIFACTS_DIR, "Akhila_circle_bordered.png")
OUTPUT_PDF = os.path.join(WORKSPACE_DIR, "Druthi_Wellness_Brochure.pdf")

def prepare_coach_image():
    """Crops the coach image to a circle and adds a soft gold border."""
    if not os.path.exists(COACH_IMAGE_SRC):
        print(f"Coach image not found at {COACH_IMAGE_SRC}. Skipping image preparation.")
        return False
        
    print(f"Processing coach image {COACH_IMAGE_SRC}...")
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
        
        # Draw circular border (Soft Gold)
        border_width = 8
        border_color = (212, 175, 55, 255) # Hex #D4AF37
        draw_border = ImageDraw.Draw(circular_img)
        draw_border.ellipse((
            border_width // 2, 
            border_width // 2, 
            target_size - border_width // 2, 
            target_size - border_width // 2
        ), outline=border_color, width=border_width)
        
        circular_img.save(COACH_IMAGE_CIRCULAR, "PNG")
        print(f"Circular image saved successfully to {COACH_IMAGE_CIRCULAR}")
        return True
    except Exception as e:
        print(f"Error processing image: {e}")
        return False

def draw_cover_bg(canvas_obj, doc):
    """Draws background color and borders for Page 1 (Cover Page)."""
    canvas_obj.saveState()
    
    width, height = letter
    primary = colors.HexColor('#5C1D42')      # Deep Berry
    accent = colors.HexColor('#D4AF37')       # Soft Gold
    
    # Fill background with Deep Berry
    canvas_obj.setFillColor(primary)
    canvas_obj.rect(0, 0, width, height, fill=True, stroke=False)
    
    # Gold double line border
    canvas_obj.setStrokeColor(accent)
    canvas_obj.setLineWidth(2)
    canvas_obj.rect(20, 20, width - 40, height - 40, fill=False, stroke=True)
    canvas_obj.setLineWidth(0.75)
    canvas_obj.rect(25, 25, width - 50, height - 50, fill=False, stroke=True)
    
    # Decorative subtle overlapping circle in corners
    canvas_obj.setFillColor(colors.HexColor('#6A224C')) # Slightly lighter berry
    canvas_obj.circle(0, height, 200, fill=True, stroke=False)
    canvas_obj.circle(width, 0, 150, fill=True, stroke=False)
    
    # Gold ornamental corner frames
    canvas_obj.setStrokeColor(accent)
    canvas_obj.setLineWidth(1.5)
    # Top-left
    canvas_obj.line(40, height - 40, 70, height - 40)
    canvas_obj.line(40, height - 40, 40, height - 70)
    # Top-right
    canvas_obj.line(width - 40, height - 40, width - 70, height - 40)
    canvas_obj.line(width - 40, height - 40, width - 40, height - 70)
    # Bottom-left
    canvas_obj.line(40, 40, 70, 40)
    canvas_obj.line(40, 40, 40, 70)
    # Bottom-right
    canvas_obj.line(width - 40, 40, width - 70, 40)
    canvas_obj.line(width - 40, 40, width - 40, 70)
    
    # Bottom Contact Block on Cover
    canvas_obj.setFillColor(accent)
    canvas_obj.setFont("Helvetica-Bold", 10)
    canvas_obj.drawCentredString(width / 2, 70, "START YOUR JOURNEY TODAY")
    
    canvas_obj.setFillColor(colors.HexColor('#FAF5F7'))
    canvas_obj.setFont("Helvetica", 9)
    canvas_obj.drawCentredString(width / 2, 50, "Instagram: @druthi_wellness   |   Phone: +91 8688963230")
    
    canvas_obj.restoreState()

def draw_inside_bg(canvas_obj, doc):
    """Draws background color, header, and footer layout for inside pages (2, 3, 4)."""
    canvas_obj.saveState()
    
    width, height = letter
    primary = colors.HexColor('#5C1D42')      # Deep Berry
    secondary = colors.HexColor('#A37081')    # Muted Rose
    accent = colors.HexColor('#D4AF37')       # Soft Gold
    bg_light = colors.HexColor('#FAF5F7')     # Soft Off-White
    
    # Fill background with Soft Off-White
    canvas_obj.setFillColor(bg_light)
    canvas_obj.rect(0, 0, width, height, fill=True, stroke=False)
    
    # Header Bar
    header_h = 45
    canvas_obj.setFillColor(primary)
    canvas_obj.rect(0, height - header_h, width, header_h, fill=True, stroke=False)
    
    # Gold Header Bottom Border
    canvas_obj.setFillColor(accent)
    canvas_obj.rect(0, height - header_h - 2, width, 2, fill=True, stroke=False)
    
    # Header Branding Text
    canvas_obj.setFillColor(colors.HexColor('#FFFFFF'))
    canvas_obj.setFont("Helvetica-Bold", 10)
    canvas_obj.drawString(36, height - 28, "DRUTHI WELLNESS")
    canvas_obj.setFont("Helvetica-Oblique", 8.5)
    canvas_obj.drawRightString(width - 36, height - 28, "FITMOM CLUB TRANSFORMATION PROGRAMS")
    
    # Footer Muted Border Line
    canvas_obj.setStrokeColor(secondary)
    canvas_obj.setLineWidth(0.5)
    canvas_obj.line(36, 45, width - 36, 45)
    
    # Footer branding info
    canvas_obj.setFillColor(colors.HexColor('#2C1320'))
    canvas_obj.setFont("Helvetica-Bold", 8)
    canvas_obj.drawString(36, 30, "Insta: @druthi_wellness   •   Phone: 8688963230")
    
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
            self.setFillColor(colors.HexColor('#2C1320'))
            self.setFont("Helvetica", 8)
            width, height = letter
            self.drawRightString(width - 36, 30, f"Page {self._pageNumber} of {page_count}")
            self.restoreState()

def build_pdf():
    # Setup custom styles
    styles = getSampleStyleSheet()
    
    # Custom styles definitions
    primary_color = colors.HexColor('#5C1D42')
    secondary_color = colors.HexColor('#A37081')
    accent_color = colors.HexColor('#D4AF37')
    text_dark = colors.HexColor('#2C1320')
    white = colors.HexColor('#FFFFFF')
    
    styles.add(ParagraphStyle(
        name='CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=34,
        textColor=white,
        alignment=TA_CENTER,
        spaceAfter=8
    ))
    
    styles.add(ParagraphStyle(
        name='CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=accent_color,
        alignment=TA_CENTER,
        spaceAfter=25
    ))
    
    styles.add(ParagraphStyle(
        name='CoverTagline',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=13,
        leading=18,
        textColor=colors.HexColor('#FAF5F7'),
        alignment=TA_CENTER,
        spaceAfter=25
    ))
    
    styles.add(ParagraphStyle(
        name='CoverBioHead',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=accent_color,
        alignment=TA_CENTER,
        spaceAfter=6
    ))
    
    styles.add(ParagraphStyle(
        name='CoverBioText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=14,
        textColor=colors.HexColor('#E5D4DC'),
        alignment=TA_CENTER,
        spaceAfter=15
    ))
    
    styles.add(ParagraphStyle(
        name='PageTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=primary_color,
        spaceAfter=4
    ))
    
    styles.add(ParagraphStyle(
        name='PageSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=13,
        textColor=secondary_color,
        spaceAfter=15
    ))
    
    styles.add(ParagraphStyle(
        name='CardTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=primary_color,
        spaceAfter=4
    ))
    
    styles.add(ParagraphStyle(
        name='CardSub',
        parent=styles['Normal'],
        fontName='Helvetica-BoldOblique',
        fontSize=8.5,
        leading=11,
        textColor=secondary_color,
        spaceAfter=8
    ))
    
    styles.add(ParagraphStyle(
        name='CardBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=text_dark,
        spaceAfter=6
    ))
    
    styles.add(ParagraphStyle(
        name='CardBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10,
        textColor=text_dark,
        leftIndent=10,
        firstLineIndent=-10,
        spaceAfter=3
    ))
    
    styles.add(ParagraphStyle(
        name='SectionHeaderInside',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=primary_color,
        spaceBefore=8,
        spaceAfter=4
    ))
    
    styles.add(ParagraphStyle(
        name='UpgradeBannerText',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=white,
        alignment=TA_CENTER
    ))
    
    styles.add(ParagraphStyle(
        name='UpgradeSubText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor('#FAF5F7'),
        alignment=TA_CENTER
    ))
    
    styles.add(ParagraphStyle(
        name='StatNum',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary_color,
        alignment=TA_CENTER,
        spaceAfter=2
    ))
    
    styles.add(ParagraphStyle(
        name='StatLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=10,
        textColor=secondary_color,
        alignment=TA_CENTER,
        spaceAfter=4
    ))
    
    styles.add(ParagraphStyle(
        name='StatDesc',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=9.5,
        textColor=text_dark,
        alignment=TA_CENTER
    ))
    
    styles.add(ParagraphStyle(
        name='CTABoxTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=white,
        alignment=TA_CENTER,
        spaceAfter=6
    ))
    
    styles.add(ParagraphStyle(
        name='CTABoxBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#FAF5F7'),
        alignment=TA_CENTER,
        spaceAfter=12
    ))
    
    styles.add(ParagraphStyle(
        name='CTALink',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=accent_color,
        alignment=TA_CENTER
    ))
    
    story = []
    
    # ----------------------------------------------------
    # PAGE 1: COVER PAGE
    # ----------------------------------------------------
    story.append(Spacer(1, 40))
    story.append(Paragraph("DRUTHI WELLNESS", styles['CoverTitle']))
    story.append(Paragraph("FITMOM CLUB TRANSFORMATION PROGRAMS", styles['CoverSubtitle']))
    story.append(Spacer(1, 10))
    
    # Add circular coach image if prepared
    if os.path.exists(COACH_IMAGE_CIRCULAR):
        # We wrap in a table to center it easily
        coach_img = RLImage(COACH_IMAGE_CIRCULAR, width=140, height=140)
        img_table = Table([[coach_img]], colWidths=[540])
        img_table.setStyle(TableStyle([
            ('ALIGN', (0,0), (-1,-1), 'CENTER'),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(img_table)
        story.append(Spacer(1, 20))
    else:
        story.append(Spacer(1, 120))
        
    story.append(Paragraph("Redefine Your Health. Build Your Best Self. Optimize for Motherhood.", styles['CoverTagline']))
    
    story.append(Paragraph("MEET YOUR EXPERT HEALTH COACH", styles['CoverBioHead']))
    bio_text = ("Akhila is a certified wellness coach specializing in weight management, "
                "metabolic health, clinical nutrition, and fertility optimization. Through "
                "scientific planning, daily monitoring, and custom programs, she has successfully "
                "guided over 38,000 women in 40+ countries to reclaim their health and vitality.")
    story.append(Paragraph(bio_text, styles['CoverBioText']))
    
    story.append(PageBreak())
    
    # ----------------------------------------------------
    # PAGE 2: CORE TRANSFORMATION PLANS
    # ----------------------------------------------------
    story.append(Paragraph("CORE TRANSFORMATION PROGRAMS", styles['PageTitle']))
    story.append(Paragraph("Select the program tailored perfectly to your weight management and clinical wellness needs.", styles['PageSubtitle']))
    story.append(Spacer(1, 5))
    
    # Column 1 (FITMOM PRO)
    card_pro = [
        Paragraph("FITMOM PRO", styles['CardTitle']),
        Paragraph("WEIGHT MANAGEMENT & PEAK FITNESS", styles['CardSub']),
        Paragraph("A Diet & Fitness Program designed to conquer weight management challenges, build lean muscle, and attain peak fitness.", styles['CardBody']),
        Spacer(1, 4),
        Paragraph("<b>Duration:</b> 6 / 9 / 12 Months", styles['CardBody']),
        Spacer(1, 4),
        Paragraph("<b>Core Program Features:</b>", styles['SectionHeaderInside']),
        Paragraph("• <b>23 Live Group Workout Sessions</b> per month with Fitness Experts.", styles['CardBullet']),
        Paragraph("• <b>Personalized Diet Plan</b> tailored to your body weight & activity goals.", styles['CardBullet']),
        Paragraph("• <b>Diet Review Calls</b> monthly twice with health experts.", styles['CardBullet']),
        Paragraph("• <b>Meal Plate Review & Progress Follow-up</b> daily in WhatsApp.", styles['CardBullet']),
        Paragraph("• <b>Monthly Revisions</b> in the diet plan based on progress.", styles['CardBullet']),
        Paragraph("• <b>Recipe Vault Access</b> for tasty, healthy recipes.", styles['CardBullet']),
        Paragraph("• <b>Add Ons:</b> Specialized Live Yoga Sessions.", styles['CardBullet']),
        Paragraph("• <b>Complementary:</b> Nutrition Webinars, Fitness Events, Monthly Progress Summary.", styles['CardBullet']),
    ]
    
    # Column 2 (FITMOM ELITE)
    card_elite = [
        Paragraph("FITMOM ELITE", styles['CardTitle']),
        Paragraph("PRECISION CLINICAL WELLNESS", styles['CardSub']),
        Paragraph("A personalized journey to conquer your fitness goals and effectively manage clinical health conditions such as Diabetes, Thyroid, Cholesterol, Deficiencies, PCOS, PCOD, and more.", styles['CardBody']),
        Spacer(1, 4),
        Paragraph("<b>Duration:</b> 6 / 9 / 12 Months", styles['CardBody']),
        Spacer(1, 4),
        Paragraph("<b>Core Program Features:</b>", styles['SectionHeaderInside']),
        Paragraph("• <b>31 Live Group Workout Sessions</b> per month with Fitness Experts.", styles['CardBullet']),
        Paragraph("• <b>Personalized Diet Plan</b> with monthly revisions.", styles['CardBullet']),
        Paragraph("• <b>Dual Coaching:</b> Certified Fitcoach & Clinical Dietitian (Health Issue Expert) assigned as personal coaches.", styles['CardBullet']),
        Paragraph("• <b>Diet & Fitness Review Calls</b> monthly twice to track metabolic markers.", styles['CardBullet']),
        Paragraph("• <b>Meal Plate Review & Progress Follow-up</b> in WhatsApp daily.", styles['CardBullet']),
        Paragraph("• <b>Recipe Vault Access</b> for medical-safe/diet plans.", styles['CardBullet']),
        Paragraph("• <b>Premium Services:</b> Blood Work Monitoring, Habit Inculcation, Lifestyle Modification, Addition of Super Foods.", styles['CardBullet']),
        Paragraph("• <b>Complementary:</b> Nutrition Webinars, Fitness Events, Monthly Progress Summary.", styles['CardBullet']),
    ]
    
    # Side-by-side comparison table
    # Printable area: 540 width. Margins: 36 left/right. 
    # Left column: 262 width, Center spacing: 16 width, Right column: 262 width
    comp_table = Table([[card_pro, "", card_elite]], colWidths=[262, 16, 262])
    comp_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), white),
        ('BACKGROUND', (2,0), (2,0), white),
        ('BOX', (0,0), (0,0), 1, secondary_color),
        ('BOX', (2,0), (2,0), 1.25, primary_color),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    
    story.append(comp_table)
    story.append(PageBreak())
    
    # ----------------------------------------------------
    # PAGE 3: FERTILITY & PRENATAL UPGRADE
    # ----------------------------------------------------
    story.append(Paragraph("FMC MIRACLE: THE CONCEPTION JOURNEY", styles['PageTitle']))
    story.append(Paragraph("Optimize your physical and mental health for a smooth, natural conception and pregnancy.", styles['PageSubtitle']))
    story.append(Spacer(1, 5))
    
    # Miracle Card Content
    card_miracle = [
        Paragraph("FMC MIRACLE PROGRAM", styles['CardTitle']),
        Paragraph("FERTILITY OPTIMIZATION & WELLNESS", styles['CardSub']),
        Paragraph("Prepare your body and mind for pregnancy. This scientific program manages ovulation tracking, male and female fertility factors, nutrition, and stress management.", styles['CardBody']),
        Spacer(1, 2),
        Paragraph("<b>Duration:</b> 3, 6, 9 & 12 Months", styles['CardBody']),
        Spacer(1, 4),
        Paragraph("<b>Key Fertility Features:</b>", styles['SectionHeaderInside']),
        Paragraph("• <b>Dual Coaching:</b> Clinical Dietitian & Fitness Trainers for plan preparation, coaching & review.", styles['CardBullet']),
        Paragraph("• <b>Fitness & Nutrition Induction:</b> Call with expert coaches on the 1st month.", styles['CardBullet']),
        Paragraph("• <b>Workouts:</b> 21 Live Low & Moderate Intensity sessions (Daily: 6 Yoga, 14 Cardio/Strength, 1 Dance per day).", styles['CardBullet']),
        Paragraph("• <b>Review Calls:</b> Fitness & Diet review calls - monthly twice.", styles['CardBullet']),
        Paragraph("• <b>Webinar Series (12 Sessions):</b>", styles['CardBullet']),
        Paragraph("&nbsp;&nbsp;- <i>5 Fertility Essentials:</i> Conception Science & Ovulation, Toxins, Fertility Fitness, Fertility Nutrition, Male Fertile Health.", styles['CardBullet']),
        Paragraph("&nbsp;&nbsp;- <i>7 Emotional Well-being:</i> Stress-Fertility Connection, Sleep/Hormones, Mind Body Movement, Emotional Release, Intimate Connection (with spouse), Mindfulness, Somatic Integration.", styles['CardBullet']),
        Paragraph("• <b>Complementary Services:</b> Handbooks/checklists on sleep & intimacy, Blood Work Monitoring, Habit Inculcation, Lifestyle Modification, Addition of Super Foods, Daily Meal Plate Review.", styles['CardBullet']),
    ]
    
    miracle_table = Table([[card_miracle]], colWidths=[540])
    miracle_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), white),
        ('BOX', (0,0), (-1,-1), 1.25, accent_color),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(miracle_table)
    story.append(Spacer(1, 10))
    
    # Transition Banner (Free Upgrade)
    banner_content = [
        Paragraph("✨ CONCEPTION UPGRADE: FREE PRENATAL UPGRADE ✨", styles['UpgradeBannerText']),
        Paragraph("If you become pregnant while enrolled in FMC Miracle, your plan will automatically upgrade to our comprehensive <b>FMC Blossom (Prenatal Wellness)</b> Program for the remaining subscription at no extra charge!", styles['UpgradeSubText'])
    ]
    banner_table = Table([[banner_content]], colWidths=[540])
    banner_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), primary_color),
        ('BOX', (0,0), (-1,-1), 1.25, accent_color),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ]))
    story.append(banner_table)
    story.append(Spacer(1, 10))
    
    # Blossom Upgrade Card
    card_blossom = [
        Paragraph("FMC BLOSSOM PROGRAM", styles['CardTitle']),
        Paragraph("PRENATAL WELLNESS (FREE UPGRADE)", styles['CardSub']),
        Paragraph("Enrich your prenatal journey with specialized guidance covering all three trimesters to ensure a safe, healthy, and happy pregnancy.", styles['CardBody']),
        Spacer(1, 2),
        Paragraph("<b>Key Prenatal Features:</b>", styles['SectionHeaderInside']),
        Paragraph("• <b>Personal Health Coaches:</b> Certified Fitcoach / Physiotherapist & Clinical Dietitian (Prenatal Expert).", styles['CardBullet']),
        Paragraph("• <b>Trimester Workouts:</b> 4+ Live Group Prenatal Workout Sessions designed specifically for Trimesters 1, 2 & 3.", styles['CardBullet']),
        Paragraph("• <b>Medical Supervision:</b> Clinical Dietitian consultation for health challenge management - monthly once.", styles['CardBullet']),
        Paragraph("• <b>Progress Tracking:</b> Fitness & Diet review calls - monthly twice, daily meal plate reviews, customized workout plan with revisions.", styles['CardBullet']),
    ]
    blossom_table = Table([[card_blossom]], colWidths=[540])
    blossom_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), white),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#3F6A58')), # Green/Teal accent
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(blossom_table)
    
    story.append(PageBreak())
    
    # ----------------------------------------------------
    # PAGE 4: GLOBAL IMPACT & CALL TO ACTION
    # ----------------------------------------------------
    story.append(Paragraph("THE FITMOM CLUB COMMUNITY", styles['PageTitle']))
    story.append(Paragraph("A global family of healthy, confident, and transformed women.", styles['PageSubtitle']))
    story.append(Spacer(1, 10))
    
    # Stats Cards (3 columns)
    # Widths: [170, 15, 170, 15, 170]
    stat1 = [
        Paragraph("40+", styles['StatNum']),
        Paragraph("COUNTRIES", styles['StatLabel']),
        Paragraph("Empowering women across borders with region-specific, cultural diet plans.", styles['StatDesc'])
    ]
    stat2 = [
        Paragraph("38K+", styles['StatNum']),
        Paragraph("MEMBERS GLOBALLY", styles['StatLabel']),
        Paragraph("A thriving, supportive sisterhood sharing daily progress and inspiration.", styles['StatDesc'])
    ]
    stat3 = [
        Paragraph("98%", styles['StatNum']),
        Paragraph("SUCCESS RATE", styles['StatLabel']),
        Paragraph("Clinically proven results in fat loss, metabolic control, and overall well-being.", styles['StatDesc'])
    ]
    
    stats_table = Table([[stat1, "", stat2, "", stat3]], colWidths=[170, 15, 170, 15, 170])
    stats_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), white),
        ('BACKGROUND', (2,0), (2,0), white),
        ('BACKGROUND', (4,0), (4,0), white),
        ('BOX', (0,0), (0,0), 1, secondary_color),
        ('BOX', (2,0), (2,0), 1, secondary_color),
        ('BOX', (4,0), (4,0), 1, secondary_color),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(stats_table)
    story.append(Spacer(1, 20))
    
    # Why Choose Us Section
    story.append(Paragraph("WHY CHOOSE DRUTHI WELLNESS?", styles['SectionHeaderInside']))
    why_points = [
        "• <b>Clinical Nutrition Specialists:</b> We address underlying medical conditions (Thyroid, PCOS, Diabetes) to secure healthy weight management.",
        "• <b>Daily Accountability:</b> We don't just send a plan. We review your actual plates every single day via WhatsApp.",
        "• <b>Comprehensive Well-being:</b> We address sleep hygiene, stress relief, hormonal harmony, and habit formation, not just calories in/out.",
        "• <b>Scientific Tracking:</b> Periodic blood work reviews and fitness assessments ensure you make measurable, permanent progress."
    ]
    for pt in why_points:
        story.append(Paragraph(pt, styles['CardBullet']))
        story.append(Spacer(1, 2))
        
    story.append(Spacer(1, 25))
    
    # Call to Action Block
    cta_content = [
        Paragraph("BEGIN YOUR REMARKABLE TRANSFORMATION TODAY!", styles['CTABoxTitle']),
        Paragraph("Avail a FREE consultation with our health experts to assess your goals, analyze your health challenges, and match you with the perfect plan.", styles['CTABoxBody']),
        Paragraph("<b>INSTAGRAM:</b> <font color='#D4AF37'><a href='https://instagram.com/druthi_wellness'>@druthi_wellness</a></font>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>PHONE:</b> <font color='#D4AF37'><a href='tel:8688963230'>+91 8688963230</a></font>", styles['CTALink'])
    ]
    cta_table = Table([[cta_content]], colWidths=[540])
    cta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), primary_color),
        ('BOX', (0,0), (-1,-1), 1.5, accent_color),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 16),
        ('BOTTOMPADDING', (0,0), (-1,-1), 16),
        ('LEFTPADDING', (0,0), (-1,-1), 16),
        ('RIGHTPADDING', (0,0), (-1,-1), 16),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ]))
    story.append(cta_table)
    
    # Build Document
    doc = SimpleDocTemplate(
        OUTPUT_PDF,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=65,
        bottomMargin=60
    )
    
    print(f"Building PDF brochure to {OUTPUT_PDF}...")
    doc.build(story, canvasmaker=NumberedCanvas, onFirstPage=draw_cover_bg, onLaterPages=draw_inside_bg)
    print("PDF brochure built successfully!")
    return True

def render_pdf_to_images():
    """Renders the generated PDF brochure pages as PNG images for walkthrough verification."""
    if not os.path.exists(OUTPUT_PDF):
        print(f"Cannot render PDF to images. PDF not found at {OUTPUT_PDF}")
        return False
        
    print(f"Rendering PDF pages to PNGs...")
    try:
        # Load PDF using pdfium
        doc = pdfium.PdfDocument(OUTPUT_PDF)
        n_pages = len(doc)
        print(f"Total PDF pages to render: {n_pages}")
        
        for i in range(n_pages):
            page = doc[i]
            # Render at 150 DPI for high quality layout check
            bitmap = page.render(scale=150/72) 
            pil_img = bitmap.to_pil()
            
            output_png_path = os.path.join(ARTIFACTS_DIR, f"brochure_page_{i+1}.png")
            pil_img.save(output_png_path, "PNG")
            print(f"Page {i+1} saved to {output_png_path}")
            
        return True
    except Exception as e:
        print(f"Error rendering PDF to images: {e}")
        return False

if __name__ == "__main__":
    prepare_coach_image()
    if build_pdf():
        render_pdf_to_images()
