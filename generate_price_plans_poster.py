import os
import sys
from PIL import Image, ImageDraw
import pypdfium2 as pdfium

# ReportLab imports
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Define paths
WORKSPACE_DIR = r"l:\Developer\nutriflow"
# Use the current run's artifact directory
ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\826436b4-4aae-4037-aaef-bc477cbeab67"
FONT_DIR = r"l:\Developer\nutriflow\.agents\skills\canvas-design\canvas-fonts"

COACH_IMAGE_SRC = os.path.join(WORKSPACE_DIR, "Akhila.PNG")
COACH_IMAGE_CIRCULAR = os.path.join(ARTIFACTS_DIR, "Akhila_circle_large.png")

# Use _v2 names to bypass files currently locked by open PDF viewers
OUTPUT_PDF = os.path.join(WORKSPACE_DIR, "Dhruthi_Price_Plans_v2.pdf")
OUTPUT_PNG = os.path.join(WORKSPACE_DIR, "Dhruthi_Price_Plans_v2.png")

# Also save copy in artifacts
ARTIFACT_PDF = os.path.join(ARTIFACTS_DIR, "Dhruthi_Price_Plans_v2.pdf")
ARTIFACT_PNG = os.path.join(ARTIFACTS_DIR, "Dhruthi_Price_Plans_v2.png")

# Color Palette (Premium Pastel Natural Theme)
COLOR_PRIMARY = colors.HexColor('#3B5336')      # Forest Green
COLOR_SECONDARY = colors.HexColor('#A3B899')    # Soft Sage
COLOR_ACCENT = colors.HexColor('#B89047')       # Gold/Amber
COLOR_ACCENT_LIGHT = colors.HexColor('#FDFBF7') # Very light gold/cream tint for badges
COLOR_BG_LIGHT = colors.HexColor('#F4F1EA')     # Alabaster Cream
COLOR_TEXT_DARK = colors.HexColor('#2C3E2B')    # Deep Charcoal Green
COLOR_WHITE = colors.HexColor('#FFFFFF')
COLOR_RED_STRIKE = colors.HexColor('#C84B31')   # Soft red for strike-through price
COLOR_ICON_BG = colors.HexColor('#EBF0EA')      # Sage green tint for icons

# Register fonts
def register_fonts():
    print("Registering custom fonts...")
    try:
        pdfmetrics.registerFont(TTFont('Italiana', os.path.join(FONT_DIR, 'Italiana-Regular.ttf')))
        pdfmetrics.registerFont(TTFont('Outfit', os.path.join(FONT_DIR, 'Outfit-Regular.ttf')))
        pdfmetrics.registerFont(TTFont('Outfit-Bold', os.path.join(FONT_DIR, 'Outfit-Bold.ttf')))
        pdfmetrics.registerFont(TTFont('NothingYouCouldDo', os.path.join(FONT_DIR, 'NothingYouCouldDo-Regular.ttf')))
        print("Font registration successful.")
    except Exception as e:
        print(f"Error registering fonts: {e}")
        sys.exit(1)

def prepare_coach_image():
    """Crops the coach image to a clean circle with transparency and no border."""
    if not os.path.exists(COACH_IMAGE_SRC):
        print(f"Coach image not found at {COACH_IMAGE_SRC}. Skipping image preparation.")
        return False
        
    print(f"Processing coach image {COACH_IMAGE_SRC} (large)...")
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
        
        target_size = 500
        img = img.resize((target_size, target_size), Image.Resampling.LANCZOS)
        
        # Create a circle mask
        mask = Image.new('L', (target_size, target_size), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, target_size, target_size), fill=255)
        
        # Create output image with transparency and paste crop
        circular_img = Image.new('RGBA', (target_size, target_size), (0, 0, 0, 0))
        circular_img.paste(img, (0, 0), mask=mask)
        
        # Ensure artifacts directory exists
        os.makedirs(os.path.dirname(COACH_IMAGE_CIRCULAR), exist_ok=True)
        circular_img.save(COACH_IMAGE_CIRCULAR, "PNG")
        print(f"Circular image saved successfully to {COACH_IMAGE_CIRCULAR}")
        return True
    except Exception as e:
        print(f"Error processing image: {e}")
        return False

# Drawing Helpers
def draw_leaf_shape(c, x, y, scale=1.0, angle=0.0, fill_color=COLOR_PRIMARY):
    c.saveState()
    c.translate(x, y)
    c.rotate(angle)
    c.scale(scale, scale)
    
    p = c.beginPath()
    # A beautiful leaf path starting from stem base at (0, 0) to tip at (0, 40)
    p.moveTo(0, 0)
    p.curveTo(8, 12, 12, 28, 0, 40) # Right side curve
    p.curveTo(-12, 28, -8, 12, 0, 0) # Left side curve
    p.close()
    
    c.setFillColor(fill_color)
    c.drawPath(p, fill=True, stroke=False)
    c.restoreState()

def draw_leaf_sprig(c, x, y, angle=0.0, scale=1.0, fill_color=COLOR_PRIMARY):
    c.saveState()
    c.translate(x, y)
    c.rotate(angle)
    c.scale(scale, scale)
    
    # Stem
    c.setStrokeColor(fill_color)
    c.setLineWidth(1.5)
    c.line(0, 0, 0, 50)
    
    # Leaves
    draw_leaf_shape(c, 0, 50, scale=0.6, angle=0, fill_color=fill_color)      # Tip
    draw_leaf_shape(c, 0, 35, scale=0.5, angle=35, fill_color=fill_color)     # Right upper
    draw_leaf_shape(c, 0, 35, scale=0.5, angle=-35, fill_color=fill_color)    # Left upper
    draw_leaf_shape(c, 0, 18, scale=0.4, angle=45, fill_color=fill_color)     # Right lower
    draw_leaf_shape(c, 0, 18, scale=0.4, angle=-45, fill_color=fill_color)    # Left lower
    
    c.restoreState()

def draw_top_rounded_rect(c, x, y, w, h, r, fill_color=COLOR_PRIMARY):
    c.saveState()
    c.setFillColor(fill_color)
    p = c.beginPath()
    p.moveTo(x, y)
    p.lineTo(x, y + h - r)
    p.curveTo(x, y + h - r/2, x + r/2, y + h, x + r, y + h)
    p.lineTo(x + w - r, y + h)
    p.curveTo(x + w - r/2, y + h, x + w, y + h - r/2, x + w, y + h - r)
    p.lineTo(x + w, y)
    p.close()
    c.drawPath(p, fill=True, stroke=False)
    c.restoreState()

def draw_checkmark(c, x, y, radius=6.5, bg_color=COLOR_WHITE, check_color=COLOR_PRIMARY):
    c.saveState()
    c.setFillColor(bg_color)
    c.circle(x, y, radius, fill=True, stroke=False)
    
    c.setStrokeColor(check_color)
    c.setLineWidth(1.5)
    c.setLineCap(1)
    
    # Draw checkmark symbol inside
    c.line(x - 2.5, y, x - 0.8, y - 1.8)
    c.line(x - 0.8, y - 1.8, x + 2.5, y + 1.8)
    c.restoreState()

def draw_calendar_icon(c, x, y, size=28, dots=1):
    c.saveState()
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(1.8)
    c.setFillColor(COLOR_BG_LIGHT)
    
    rx = x - size/2
    ry = y - size/2
    c.roundRect(rx, ry, size, size, 4, fill=False, stroke=True)
    
    c.setFillColor(COLOR_PRIMARY)
    c.rect(rx, ry + size - 8, size, 8, fill=True, stroke=False)
    
    # Draw loops on top
    c.setLineWidth(1.5)
    c.line(rx + 6, ry + size - 2, rx + 6, ry + size + 3)
    c.line(rx + size - 6, ry + size - 2, rx + size - 6, ry + size + 3)
    
    c.setFillColor(COLOR_PRIMARY)
    # Using standard vector squares (calendar dates) to avoid character rendering issues
    if dots == 1:
        c.rect(x - 2, y - 4, 4, 4, fill=True, stroke=False)
    elif dots == 3:
        c.rect(x - 7, y - 4, 3.5, 3.5, fill=True, stroke=False)
        c.rect(x - 1.75, y - 4, 3.5, 3.5, fill=True, stroke=False)
        c.rect(x + 3.5, y - 4, 3.5, 3.5, fill=True, stroke=False)
    else:
        # 6 date squares
        c.rect(x - 7, y, 3, 3, fill=True, stroke=False)
        c.rect(x - 1.5, y, 3, 3, fill=True, stroke=False)
        c.rect(x + 4, y, 3, 3, fill=True, stroke=False)
        c.rect(x - 7, y - 6, 3, 3, fill=True, stroke=False)
        c.rect(x - 1.5, y - 6, 3, 3, fill=True, stroke=False)
        c.rect(x + 4, y - 6, 3, 3, fill=True, stroke=False)
        
    c.restoreState()

def draw_plant_icon(c, x, y, size=32):
    c.saveState()
    c.translate(x, y)
    c.setStrokeColor(COLOR_WHITE)
    c.setLineWidth(2)
    c.setLineCap(1)
    
    c.line(0, -size/2 + 4, 0, size/2 - 6)
    
    # Draw white leaves
    draw_leaf_shape(c, 0, size/2 - 6, scale=0.35, angle=0, fill_color=COLOR_WHITE)
    draw_leaf_shape(c, 0, 0, scale=0.3, angle=45, fill_color=COLOR_WHITE)
    draw_leaf_shape(c, 0, 0, scale=0.3, angle=-45, fill_color=COLOR_WHITE)
    c.restoreState()

def draw_stethoscope_icon(c, x, y, size=32):
    c.saveState()
    c.translate(x, y)
    c.setStrokeColor(COLOR_WHITE)
    c.setLineWidth(2)
    c.setLineCap(1)
    c.setLineJoin(1)
    
    c.line(-6, 8, -6, 12)
    c.circle(-6, 13, 1.5, fill=True, stroke=False)
    c.line(6, 8, 6, 12)
    c.circle(6, 13, 1.5, fill=True, stroke=False)
    
    p = c.beginPath()
    p.moveTo(-6, 8)
    p.curveTo(-6, 2, 6, 2, 6, 8)
    c.drawPath(p, fill=False, stroke=True)
    
    p2 = c.beginPath()
    p2.moveTo(0, 4)
    p2.curveTo(0, -4, 8, -4, 8, -8)
    p2.curveTo(8, -12, 0, -12, 0, -8)
    c.drawPath(p2, fill=False, stroke=True)
    
    c.setFillColor(COLOR_WHITE)
    c.circle(0, -8, 4.5, fill=True, stroke=False)
    c.restoreState()

def draw_mother_baby_icon(c, x, y, size=32):
    c.saveState()
    c.translate(x, y)
    c.setFillColor(COLOR_WHITE)
    c.setStrokeColor(COLOR_WHITE)
    c.setLineWidth(1.8)
    c.setLineCap(1)
    
    # Mother head
    c.circle(-2, 10, 3.5, fill=True, stroke=False)
    # Mother body
    p = c.beginPath()
    p.moveTo(-2, 6)
    p.curveTo(-8, 2, -8, -10, -2, -12)
    p.curveTo(4, -10, 6, 0, -2, 6)
    c.drawPath(p, fill=True, stroke=False)
    
    # Baby head
    c.setFillColor(COLOR_PRIMARY)
    c.circle(0, -3, 2, fill=True, stroke=False)
    
    c.restoreState()

def draw_plate_cutlery_icon(c, x, y, size=28):
    c.saveState()
    c.translate(x, y)
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(1.8)
    c.setFillColor(COLOR_WHITE)
    
    c.circle(0, 0, 9, fill=True, stroke=True)
    c.circle(0, 0, 6.5, fill=False, stroke=True)
    
    c.line(13, -7, 13, 7)
    c.line(13, 7, 11, 3)
    
    c.line(-13, -7, -13, 7)
    c.line(-15, 7, -11, 7)
    c.line(-15, 3, -11, 3)
    c.restoreState()

def draw_meditation_icon(c, x, y, size=28):
    c.saveState()
    c.translate(x, y)
    c.setFillColor(COLOR_PRIMARY)
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(1.8)
    
    c.circle(0, 8, 3, fill=True, stroke=False)
    
    p = c.beginPath()
    p.moveTo(-8, -4)
    p.curveTo(-12, -4, -6, 4, 0, 0)
    p.curveTo(6, 4, 12, -4, 8, -4)
    p.curveTo(4, -8, -4, -8, -8, -4)
    c.drawPath(p, fill=False, stroke=True)
    
    c.line(-9, -8, 9, -8)
    c.restoreState()

def draw_checklist_icon(c, x, y, size=28):
    c.saveState()
    c.translate(x, y)
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(1.8)
    c.setLineCap(1)
    
    c.roundRect(-9, -12, 18, 24, 2, fill=False, stroke=True)
    
    c.line(-5, 6, 5, 6)
    c.line(-5, 0, 5, 0)
    c.line(-5, -6, 1, -6)
    c.restoreState()

def draw_whatsapp_icon(c, x, y, size=28):
    c.saveState()
    c.translate(x, y)
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(1.8)
    c.setLineCap(1)
    c.setLineJoin(1)
    
    c.circle(0, 1, 9, fill=False, stroke=True)
    
    p = c.beginPath()
    p.moveTo(-6, -5.5)
    p.lineTo(-9, -9)
    p.lineTo(-3.5, -7.5)
    c.drawPath(p, fill=False, stroke=True)
    
    p2 = c.beginPath()
    p2.moveTo(-3, 3)
    p2.curveTo(-3, 0, 0, -3, 3, -3)
    c.drawPath(p2, fill=False, stroke=True)
    c.restoreState()

def draw_bowl_icon(c, x, y, size=28):
    c.saveState()
    c.translate(x, y)
    c.setFillColor(COLOR_PRIMARY)
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(1.8)
    
    p = c.beginPath()
    p.moveTo(-11, 2)
    p.lineTo(11, 2)
    p.curveTo(11, -10, -11, -10, -11, 2)
    c.drawPath(p, fill=False, stroke=True)
    
    draw_leaf_shape(c, -4, 2, scale=0.25, angle=-30, fill_color=COLOR_PRIMARY)
    draw_leaf_shape(c, 4, 2, scale=0.25, angle=30, fill_color=COLOR_PRIMARY)
    draw_leaf_shape(c, 0, 4, scale=0.25, angle=0, fill_color=COLOR_PRIMARY)
    c.restoreState()

def draw_globe_icon(c, x, y, size=22):
    c.saveState()
    c.translate(x, y)
    c.setStrokeColor(COLOR_WHITE)
    c.setLineWidth(1.5)
    c.circle(0, 0, 10, fill=False, stroke=True)
    
    c.line(-10, 0, 10, 0)
    c.line(0, -10, 0, 10)
    
    p = c.beginPath()
    p.moveTo(0, 10)
    p.curveTo(-6, 5, -6, -5, 0, -10)
    p.curveTo(6, -5, 6, 5, 0, 10)
    c.drawPath(p, fill=False, stroke=True)
    c.restoreState()

def draw_award_icon(c, x, y, size=20):
    c.saveState()
    c.translate(x, y)
    c.setFillColor(COLOR_WHITE)
    c.setStrokeColor(COLOR_WHITE)
    c.setLineWidth(1.5)
    
    c.circle(0, 3, 7, fill=False, stroke=True)
    c.circle(0, 3, 4, fill=True, stroke=False)
    
    p = c.beginPath()
    p.moveTo(-3, -3)
    p.lineTo(-5, -10)
    p.lineTo(-1, -8)
    p.lineTo(0, -3)
    p.lineTo(1, -8)
    p.lineTo(5, -10)
    p.lineTo(3, -3)
    c.drawPath(p, fill=True, stroke=False)
    c.restoreState()

def draw_price_cell(c, x, y_center, reg_price, promo_price, discount_text):
    c.saveState()
    
    # Regular price (strike-through)
    c.setFont("Outfit", 12)
    c.setFillColor(COLOR_TEXT_DARK)
    c.drawCentredString(x, y_center + 20, reg_price)
    
    price_w = c.stringWidth(reg_price, "Outfit", 12)
    c.setStrokeColor(COLOR_RED_STRIKE)
    c.setLineWidth(1.2)
    c.line(x - price_w/2 - 2, y_center + 24, x + price_w/2 + 2, y_center + 24)
    
    # Special offer price
    c.setFont("Outfit-Bold", 24)
    c.setFillColor(COLOR_TEXT_DARK)
    c.drawCentredString(x, y_center - 10, promo_price)
    
    # Discount badge
    badge_w = 66
    badge_h = 18
    bx = x - badge_w/2
    by = y_center - 34
    
    c.setFillColor(COLOR_ACCENT_LIGHT)
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(0.5)
    c.roundRect(bx, by, badge_w, badge_h, 4, fill=True, stroke=True)
    
    c.setFont("Outfit-Bold", 9.5)
    c.setFillColor(COLOR_ACCENT)
    c.drawCentredString(x, by + 5, discount_text)
    
    c.restoreState()

def draw_two_line_text(c, x, y_top, text, font="Outfit", size=10.5, color=COLOR_TEXT_DARK):
    lines = text.split("\n")
    c.setFont(font, size)
    c.setFillColor(color)
    if len(lines) == 1:
        c.drawCentredString(x, y_top, lines[0])
    else:
        c.drawCentredString(x, y_top, lines[0])
        c.drawCentredString(x, y_top - size - 4, lines[1])

def draw_poster():
    print("Generating poster PDF...")
    # Initialize canvas with 1000x1500 poster dimensions
    c = canvas.Canvas(OUTPUT_PDF, pagesize=(1000, 1500))
    
    # 1. Fill background with Alabaster Cream
    c.setFillColor(COLOR_BG_LIGHT)
    c.rect(0, 0, 1000, 1500, fill=True, stroke=False)
    
    # 2. Draw borders
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(2.0)
    c.rect(30, 30, 940, 1440, fill=False, stroke=True)
    
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(0.75)
    c.rect(36, 36, 928, 1428, fill=False, stroke=True)
    
    # Corner brackets
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(1.5)
    # Top-Left
    c.line(50, 1450, 90, 1450)
    c.line(50, 1450, 50, 1410)
    # Bottom-Left
    c.line(50, 50, 90, 50)
    c.line(50, 50, 50, 90)
    # Bottom-Right
    c.line(950, 50, 910, 50)
    c.line(950, 50, 950, 90)
    
    # 3. Draw botanical corner leaves
    draw_leaf_sprig(c, 55, 1390, angle=135, scale=0.9, fill_color=COLOR_PRIMARY) # Top-Left facing down-right
    draw_leaf_sprig(c, 55, 110, angle=45, scale=0.9, fill_color=COLOR_PRIMARY)   # Bottom-Left facing up-right
    draw_leaf_sprig(c, 945, 110, angle=-45, scale=0.9, fill_color=COLOR_PRIMARY) # Bottom-Right facing up-left
    
    # 4. Draw titles (Centered at x=380 in the 3:1 structural grid system)
    # DHRUTHI WELLNESS
    c.setFont("Italiana", 54)
    c.setFillColor(COLOR_PRIMARY)
    c.drawCentredString(380, 1330, "DHRUTHI")
    
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(1.2)
    c.line(100, 1270, 260, 1270)
    c.line(500, 1270, 660, 1270)
    
    c.setFont("Italiana", 24)
    c.drawCentredString(380, 1262, "WELLNESS")
    
    # NOURISHING YOU. NATURALLY.
    c.setFont("Outfit-Bold", 14)
    c.setFillColor(COLOR_PRIMARY)
    c.drawCentredString(380, 1215, "NOURISHING YOU. NATURALLY.")
    
    # Decorative line under subtitle with leaf details
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(0.75)
    c.line(220, 1180, 340, 1180)
    c.line(420, 1180, 540, 1180)
    draw_leaf_shape(c, 365, 1180, scale=0.35, angle=90, fill_color=COLOR_PRIMARY)
    draw_leaf_shape(c, 395, 1180, scale=0.35, angle=-90, fill_color=COLOR_PRIMARY)
    
    # PRICE PLANS
    c.setFont("Italiana", 42)
    c.setFillColor(COLOR_PRIMARY)
    c.drawCentredString(380, 1100, "PRICE PLANS")
    
    c.line(260, 1065, 350, 1065)
    c.line(410, 1065, 500, 1065)
    draw_leaf_shape(c, 370, 1065, scale=0.3, angle=90, fill_color=COLOR_PRIMARY)
    draw_leaf_shape(c, 390, 1065, scale=0.3, angle=-90, fill_color=COLOR_PRIMARY)
    
    # 5. Draw Coach profile on the top right (Centered at x=820, aligned with the rightmost grid column)
    # Semicircular Sage Green background circle
    c.setFillColor(COLOR_SECONDARY)
    c.circle(820, 1230, 150, fill=True, stroke=False)
    
    # Circular photo
    if os.path.exists(COACH_IMAGE_CIRCULAR):
        c.drawImage(COACH_IMAGE_CIRCULAR, 820 - 120, 1230 - 120, width=240, height=240, mask='auto')
    else:
        # Fallback circle placeholder
        c.setFillColor(colors.HexColor('#DFE6DD'))
        c.circle(820, 1230, 120, fill=True, stroke=False)
        c.setFont("Outfit", 12)
        c.setFillColor(COLOR_PRIMARY)
        c.drawCentredString(820, 1230, "Coach Photo")
        
    # Name Tag Green rounded box (overlaps bottom of photo, aligned exactly with Preconception column x=700 to 940)
    c.setFillColor(COLOR_PRIMARY)
    c.roundRect(700, 1040, 240, 75, 6, fill=True, stroke=False)
    # Add thin gold border
    c.setStrokeColor(COLOR_ACCENT)
    c.setLineWidth(1.5)
    c.roundRect(700, 1040, 240, 75, 6, fill=False, stroke=True)
    
    # Text in Name Tag (slightly smaller font to fit comfortably without any border overlap)
    c.setFont("NothingYouCouldDo", 19.5)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(820, 1082, "Dt. Akhila Konakalla")
    
    c.setFont("Outfit", 10)
    c.drawCentredString(820, 1062, "Clinical Nutritionist")
    
    # 6. Draw Table Grid
    # Draw Row Backgrounds (White)
    c.setFillColor(COLOR_WHITE)
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(1.0)
    
    # Rows 1, 2, 3 rectangles
    c.roundRect(60, 570, 880, 140, 4, fill=True, stroke=True)
    c.roundRect(60, 430, 880, 140, 4, fill=True, stroke=True)
    c.roundRect(60, 290, 880, 140, 4, fill=True, stroke=True)
    
    # Inner vertical lines dividing the columns
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(1.0)
    for x in [220, 460, 700]:
        c.line(x, 290, x, 710)
        
    # Vertical border lines for the headers
    c.line(60, 710, 60, 290)
    c.line(940, 710, 940, 290)
    
    # 7. Draw Vertical Plan Pillar Headers
    # Pro pillar (x=220 to 460)
    draw_top_rounded_rect(c, 220, 710, 240, 220, 10, fill_color=COLOR_PRIMARY)
    # Elite pillar (x=460 to 700)
    draw_top_rounded_rect(c, 460, 710, 240, 220, 10, fill_color=COLOR_PRIMARY)
    # Preconception pillar (x=700 to 940)
    draw_top_rounded_rect(c, 700, 710, 240, 220, 10, fill_color=COLOR_PRIMARY)
    
    # Header Content: Pro
    draw_plant_icon(c, 340, 865)
    c.setFont("Outfit-Bold", 16)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(340, 825, "DHRUTHI PRO")
    c.setFont("Outfit", 11)
    c.setFillColor(COLOR_SECONDARY)
    c.drawCentredString(340, 805, "No Medical Condition")
    
    # Ticks for Pro
    draw_checkmark(c, 250, 775)
    c.setFont("Outfit", 10.5)
    c.setFillColor(COLOR_WHITE)
    c.drawString(270, 771, "Weight Loss")
    
    draw_checkmark(c, 250, 752)
    c.drawString(270, 748, "Weight Gain")
    
    draw_checkmark(c, 250, 729)
    c.drawString(270, 725, "Lifestyle Management")
    
    # Header Content: Elite
    draw_stethoscope_icon(c, 580, 865)
    c.setFont("Outfit-Bold", 16)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(580, 825, "DHRUTHI ELITE")
    c.setFont("Outfit", 11)
    c.setFillColor(COLOR_SECONDARY)
    c.drawCentredString(580, 805, "Medical Condition")
    
    # Ticks for Elite
    draw_checkmark(c, 485, 775)
    c.drawString(505, 771, "Diabetes Management")
    
    draw_checkmark(c, 485, 752)
    c.drawString(505, 748, "PCOD/PCOS Management")
    
    draw_checkmark(c, 485, 729)
    c.drawString(505, 725, "Thyroid Management")
    
    # Header Content: Preconception
    draw_mother_baby_icon(c, 820, 865)
    c.setFont("Outfit-Bold", 15)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(820, 825, "DHRUTHI PRECONCEPTION")
    c.setFont("Outfit", 11)
    c.setFillColor(COLOR_SECONDARY)
    c.drawCentredString(820, 805, "Fertility")
    
    # Ticks for Preconception
    draw_checkmark(c, 725, 775)
    c.drawString(745, 771, "Fertility Nutrition")
    
    draw_checkmark(c, 725, 752)
    c.drawString(745, 748, "Pregnancy Nutrition")
    
    draw_checkmark(c, 725, 729)
    c.drawString(745, 725, "IVF Nutrition")
    
    # 8. Draw Duration Cells (Left Column: x=60 to 220, perfectly centered vertically in each row)
    # Row 1 Duration (Center y=640)
    draw_calendar_icon(c, 140, 660, size=28, dots=1)
    c.setFont("Outfit-Bold", 11.5)
    c.setFillColor(COLOR_PRIMARY)
    c.drawCentredString(140, 620, "1 MONTH")
    c.drawCentredString(140, 604, "PLAN")
    
    # Row 2 Duration (Center y=500)
    draw_calendar_icon(c, 140, 520, size=28, dots=3)
    c.drawCentredString(140, 480, "3 MONTHS")
    c.drawCentredString(140, 464, "PLAN")
    
    # Row 3 Duration (Center y=360)
    draw_calendar_icon(c, 140, 380, size=28, dots=6)
    c.drawCentredString(140, 340, "6 MONTHS")
    c.drawCentredString(140, 324, "PLAN")
    
    # 9. Draw Pricing Cells (Using "Rs." formatting and centered vertically)
    # Row 1 (y_center=640)
    draw_price_cell(c, 340, 640, "Rs. 2,599", "Rs. 1,299", "50% OFF")
    draw_price_cell(c, 580, 640, "Rs. 3,399", "Rs. 1,699", "50% OFF")
    draw_price_cell(c, 820, 640, "Rs. 3,999", "Rs. 1,999", "50% OFF")
    
    # Row 2 (y_center=500)
    draw_price_cell(c, 340, 500, "Rs. 7,799", "Rs. 3,699", "53% OFF")
    draw_price_cell(c, 580, 500, "Rs. 10,194", "Rs. 4,899", "52% OFF")
    draw_price_cell(c, 820, 500, "Rs. 11,994", "Rs. 5,799", "52% OFF")
    
    # Row 3 (y_center=360)
    draw_price_cell(c, 340, 360, "Rs. 15,999", "Rs. 6,499", "59% OFF")
    draw_price_cell(c, 580, 360, "Rs. 20,999", "Rs. 8,499", "60% OFF")
    draw_price_cell(c, 820, 360, "Rs. 23,999", "Rs. 9,999", "58% OFF")
    
    # 10. Draw Bottom Features Section
    # Divider line
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(1.0)
    c.line(60, 265, 360, 265)
    c.line(640, 265, 940, 265)
    
    # Leaf decoration flanking the text
    draw_leaf_shape(c, 375, 265, scale=0.3, angle=90, fill_color=COLOR_PRIMARY)
    draw_leaf_shape(c, 625, 265, scale=0.3, angle=-90, fill_color=COLOR_PRIMARY)
    
    c.setFont("Outfit-Bold", 13.5)
    c.setFillColor(COLOR_TEXT_DARK)
    c.drawCentredString(500, 260, "EVERY PLAN INCLUDES")
    
    # 5 Column inclusions (center y=185)
    inclusions = [
        (148, draw_plate_cutlery_icon, "Personalized\nDiet Plan"),
        (324, draw_meditation_icon, "Lifestyle\nGuidance"),
        (500, draw_checklist_icon, "Weekly\nProgress Review"),
        (676, draw_whatsapp_icon, "WhatsApp\nSupport"),
        (852, draw_bowl_icon, "Customized Meal\nRecommendations")
    ]
    
    for cx, draw_icon_fn, label in inclusions:
        # Icon bg circle
        c.setFillColor(COLOR_ICON_BG)
        c.circle(cx, 195, 22, fill=True, stroke=False)
        # Draw icon
        draw_icon_fn(c, cx, 195)
        # Label
        draw_two_line_text(c, cx, 155, label, font="Outfit", size=10.5, color=COLOR_TEXT_DARK)
        
    # 11. Draw Footer
    # CTA Box (Forest Green background from x=100 to 900, y=70 to 125)
    c.setFillColor(COLOR_PRIMARY)
    c.roundRect(100, 70, 800, 56, 6, fill=True, stroke=False)
    # Add a thin gold border
    c.setStrokeColor(COLOR_ACCENT)
    c.setLineWidth(1.2)
    c.roundRect(100, 70, 800, 56, 6, fill=False, stroke=True)
    
    # Left CTA Column (Center at x=310)
    c.setFillColor(COLOR_WHITE)
    # Calendar icon inside CTA
    c.setStrokeColor(COLOR_WHITE)
    c.setLineWidth(1.2)
    c.roundRect(131, 89, 18, 18, 2, fill=False, stroke=True)
    c.setFillColor(COLOR_WHITE)
    c.rect(131, 101, 18, 4, fill=True, stroke=False)
    c.rect(139, 94, 2.5, 2.5, fill=True, stroke=False) # date square
    
    c.setFont("Outfit-Bold", 12)
    c.setFillColor(COLOR_WHITE)
    c.drawString(160, 102, "BOOK YOUR CONSULTATION TODAY!")
    c.setFont("Outfit", 10)
    c.setFillColor(COLOR_SECONDARY)
    c.drawString(160, 86, "Let's work together towards a healthier you.")
    
    # Vertical separator line in CTA box
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(0.8)
    c.line(500, 76, 500, 120)
    
    # Right CTA Column (Center at x=700)
    draw_globe_icon(c, 535, 98)
    c.setFont("Outfit-Bold", 11)
    c.setFillColor(COLOR_WHITE)
    c.drawString(555, 102, "ONLINE CONSULTATIONS AVAILABLE ACROSS INDIA")
    c.setFont("Outfit", 9.5)
    c.setFillColor(COLOR_SECONDARY)
    c.drawString(555, 86, "Instagram: @dhruthi_wellness   |   Phone: +91 8688963230")
    
    # Limited Time Offer capsule (Center at x=500, y=25 to 55)
    c.setFillColor(COLOR_PRIMARY)
    c.roundRect(300, 22, 400, 32, 16, fill=True, stroke=False)
    c.setStrokeColor(COLOR_ACCENT)
    c.setLineWidth(1.2)
    c.roundRect(300, 22, 400, 32, 16, fill=False, stroke=True)
    
    # Award icon inside
    draw_award_icon(c, 325, 38)
    
    # Text
    c.setFont("Outfit-Bold", 10.5)
    c.setFillColor(COLOR_ACCENT)
    c.drawString(345, 38, "LIMITED TIME OFFER")
    c.setFont("Outfit", 9.5)
    c.setFillColor(COLOR_WHITE)
    c.drawString(468, 38, "- Invest in your health today!")
    
    # Save the canvas
    c.save()
    print(f"PDF saved to {OUTPUT_PDF}")

def render_pdf_to_png():
    """Renders the generated PDF to a high-resolution PNG using pypdfium2."""
    print("Rendering PDF to PNG...")
    try:
        # Use with statement for safe release of file handles on Windows
        with pdfium.PdfDocument(OUTPUT_PDF) as doc:
            page = doc[0]
            # Render with a scale of 3.0 for super crisp resolution (300 DPI equivalent)
            bitmap = page.render(scale=3.0)
            pil_img = bitmap.to_pil()
            
            # Save to both locations
            pil_img.save(OUTPUT_PNG, "PNG")
            pil_img.save(ARTIFACT_PNG, "PNG")
            print(f"PNG saved to {OUTPUT_PNG}")
            print(f"Artifact copy saved to {ARTIFACT_PNG}")
        
        # Also copy PDF to artifacts
        import shutil
        shutil.copy2(OUTPUT_PDF, ARTIFACT_PDF)
        print(f"Artifact copy saved to {ARTIFACT_PDF}")
        return True
    except Exception as e:
        print(f"Error rendering PDF to PNG: {e}")
        return False

if __name__ == "__main__":
    register_fonts()
    if prepare_coach_image():
        draw_poster()
        render_pdf_to_png()
    else:
        print("Failed to prepare coach image. Aborting.")
