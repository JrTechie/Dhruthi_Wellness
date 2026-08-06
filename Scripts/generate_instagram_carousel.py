import os
import sys
from PIL import Image
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

# Temporary PDF path in artifacts (not in workspace)
TEMP_PDF = os.path.join(ARTIFACTS_DIR, "temp_instagram_carousel.pdf")

# Color Palette (Premium Pastel Natural Theme)
COLOR_PRIMARY = colors.HexColor('#3B5336')      # Forest Green
COLOR_SECONDARY = colors.HexColor('#A3B899')    # Soft Sage
COLOR_ACCENT = colors.HexColor('#B89047')       # Gold/Amber
COLOR_BG_LIGHT = colors.HexColor('#F4F1EA')     # Alabaster Cream
COLOR_TEXT_DARK = colors.HexColor('#2C3E2B')    # Deep Charcoal Green
COLOR_WHITE = colors.HexColor('#FFFFFF')

# Slide backgrounds
COLOR_MYTH_BG = colors.HexColor('#FDF5F5')      # Soft Red/Rose tint
COLOR_MYTH_RED = colors.HexColor('#C84B31')     # Red accent for Myth
COLOR_FACT_BG = colors.HexColor('#F5F8F5')      # Soft Green tint
COLOR_FACT_GREEN = colors.HexColor('#3B5336')   # Green accent for Fact

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

# Drawing Helpers
def draw_leaf_shape(c, x, y, scale=1.0, angle=0.0, fill_color=COLOR_PRIMARY):
    c.saveState()
    c.translate(x, y)
    c.rotate(angle)
    c.scale(scale, scale)
    
    p = c.beginPath()
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

def draw_red_cross_icon(c, x, y):
    c.saveState()
    # Draw red circle
    c.setFillColor(COLOR_MYTH_RED)
    c.circle(x, y, 18, fill=True, stroke=False)
    
    # Draw white cross lines
    c.setStrokeColor(COLOR_WHITE)
    c.setLineWidth(2.5)
    c.setLineCap(1)
    
    c.line(x - 6, y + 6, x + 6, y - 6)
    c.line(x - 6, y - 6, x + 6, y + 6)
    c.restoreState()

def draw_green_checkmark_icon(c, x, y):
    c.saveState()
    # Draw green circle
    c.setFillColor(COLOR_FACT_GREEN)
    c.circle(x, y, 18, fill=True, stroke=False)
    
    # Draw white checkmark lines
    c.setStrokeColor(COLOR_WHITE)
    c.setLineWidth(2.5)
    c.setLineCap(1)
    
    c.line(x - 9, y, x - 3, y - 6)
    c.line(x - 3, y - 6, x + 9, y + 7)
    c.restoreState()

def draw_vector_down_arrow(c, x, y):
    c.saveState()
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(3.0)
    c.setLineCap(1)
    c.setLineJoin(1)
    
    # Vertical line shaft
    c.line(x, y + 15, x, y - 10)
    # Arrow head
    c.line(x - 8, y - 2, x, y - 10)
    c.line(x + 8, y - 2, x, y - 10)
    c.restoreState()

def draw_header_footer(c, slide_num_str):
    c.saveState()
    # DHRUTHI WELLNESS top left
    c.setFont("Outfit-Bold", 12)
    c.setFillColor(COLOR_PRIMARY)
    c.drawString(100, 1000, "DHRUTHI WELLNESS")
    
    # Divider line under header
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(0.75)
    c.line(100, 985, 980, 985)
    
    # Slide Number top right
    c.setFont("Outfit", 12)
    c.setFillColor(COLOR_SECONDARY)
    c.drawRightString(980, 1000, slide_num_str)
    
    # Bottom branding
    c.setFont("Outfit", 10.5)
    c.setFillColor(COLOR_PRIMARY)
    c.drawCentredString(540, 80, "Nourishing You. Naturally.")
    c.restoreState()

def draw_slide_1(c):
    # Slide 1: Cover Page
    # Background Alabaster Cream
    c.setFillColor(COLOR_BG_LIGHT)
    c.rect(0, 0, 1080, 1080, fill=True, stroke=False)
    
    # Double border
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(2.0)
    c.rect(40, 40, 1000, 1000, fill=False, stroke=True)
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(0.75)
    c.rect(46, 46, 988, 988, fill=False, stroke=True)
    
    # Botanical details
    draw_leaf_sprig(c, 120, 960, angle=135, scale=1.2, fill_color=COLOR_PRIMARY)
    draw_leaf_sprig(c, 960, 120, angle=-45, scale=1.2, fill_color=COLOR_PRIMARY)
    
    # Large Cover Title (centered)
    c.setFont("Italiana", 54)
    c.setFillColor(COLOR_PRIMARY)
    c.drawCentredString(540, 680, "5 Nutrition Myths")
    c.drawCentredString(540, 600, "Most People")
    c.drawCentredString(540, 520, "Still Believe")
    
    # Subtitle
    c.setFont("Outfit-Bold", 16)
    c.setFillColor(COLOR_SECONDARY)
    c.drawCentredString(540, 410, "Dhruthi Wellness  |  Nourishing You. Naturally.")
    
    # Custom Vector Down Arrow instead of emoji to prevent missing glyph cross boxes
    draw_vector_down_arrow(c, 540, 310)

def draw_slide_myth_fact(c, slide_num_str, myth_text, fact_lines):
    # Background Alabaster Cream
    c.setFillColor(COLOR_BG_LIGHT)
    c.rect(0, 0, 1080, 1080, fill=True, stroke=False)
    
    # Borders
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(2.0)
    c.rect(40, 40, 1000, 1000, fill=False, stroke=True)
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(0.75)
    c.rect(46, 46, 988, 988, fill=False, stroke=True)
    
    # Header & Footer
    draw_header_footer(c, slide_num_str)
    
    # Corner Leaf accents (smaller and subtle)
    draw_leaf_shape(c, 70, 910, scale=0.4, angle=120, fill_color=COLOR_SECONDARY)
    draw_leaf_shape(c, 1010, 170, scale=0.4, angle=-60, fill_color=COLOR_SECONDARY)
    
    # Draw Myth Card (Top)
    c.setFillColor(COLOR_MYTH_BG)
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(1.0)
    c.roundRect(100, 560, 880, 320, 6, fill=True, stroke=True)
    
    # Myth Icon
    draw_red_cross_icon(c, 160, 720)
    
    # Myth Text Content
    c.setFont("Outfit-Bold", 15)
    c.setFillColor(COLOR_MYTH_RED)
    c.drawString(220, 765, "MYTH")
    
    c.setFont("Italiana", 30)
    c.setFillColor(COLOR_TEXT_DARK)
    c.drawString(220, 715, myth_text)
    
    # Draw Fact Card (Bottom)
    c.setFillColor(COLOR_FACT_BG)
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(1.0)
    c.roundRect(100, 180, 880, 320, 6, fill=True, stroke=True)
    
    # Fact Icon
    draw_green_checkmark_icon(c, 160, 340)
    
    # Fact Text Content
    c.setFont("Outfit-Bold", 15)
    c.setFillColor(COLOR_FACT_GREEN)
    c.drawString(220, 385, "FACT")
    
    c.setFont("Outfit", 20.5)
    c.setFillColor(COLOR_TEXT_DARK)
    if len(fact_lines) == 1:
        c.drawString(220, 335, fact_lines[0])
    else:
        c.drawString(220, 335, fact_lines[0])
        c.drawString(220, 305, fact_lines[1])

def draw_slide_6(c):
    # Slide 6: Outro / CTA
    # Background Alabaster Cream
    c.setFillColor(COLOR_BG_LIGHT)
    c.rect(0, 0, 1080, 1080, fill=True, stroke=False)
    
    # Borders
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(2.0)
    c.rect(40, 40, 1000, 1000, fill=False, stroke=True)
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(0.75)
    c.rect(46, 46, 988, 988, fill=False, stroke=True)
    
    # Header & Footer
    draw_header_footer(c, "06 / 06")
    
    # Corner leaves
    draw_leaf_sprig(c, 120, 120, angle=45, scale=0.9, fill_color=COLOR_PRIMARY)
    draw_leaf_sprig(c, 960, 960, angle=-135, scale=0.9, fill_color=COLOR_PRIMARY)
    
    # Large Quote Block (Green background, gold borders)
    c.setFillColor(COLOR_PRIMARY)
    c.roundRect(100, 300, 880, 560, 10, fill=True, stroke=False)
    
    c.setStrokeColor(COLOR_ACCENT)
    c.setLineWidth(1.5)
    c.roundRect(100, 300, 880, 560, 10, fill=False, stroke=True)
    
    # Quote mark
    c.setFont("Italiana", 96)
    c.setFillColor(COLOR_ACCENT)
    c.drawString(160, 720, "“")
    
    # Quote lines
    c.setFont("Italiana", 34)
    c.setFillColor(COLOR_WHITE)
    c.drawString(200, 680, "Good nutrition isn't about restriction.")
    c.drawString(200, 630, "It's about balance, consistency,")
    c.drawString(200, 580, "and sustainable habits.")
    
    # Coach brand name (signature)
    c.setFont("NothingYouCouldDo", 28)
    c.setFillColor(COLOR_WHITE)
    c.drawString(200, 470, "Dhruthi Wellness")
    
    # Sub-tagline
    c.setFont("Outfit", 15)
    c.setFillColor(COLOR_SECONDARY)
    c.drawString(200, 420, "Helping you build a healthier lifestyle, one step at a time.")
    
    # CTA Capsule at the bottom (Forest Green with Gold border, centered)
    c.setFillColor(COLOR_PRIMARY)
    c.roundRect(240, 150, 600, 56, 28, fill=True, stroke=False)
    c.setStrokeColor(COLOR_ACCENT)
    c.setLineWidth(1.5)
    c.roundRect(240, 150, 600, 56, 28, fill=False, stroke=True)
    
    c.setFont("Outfit-Bold", 12.5)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 172, "BOOK YOUR CONSULTATION TODAY  |  @dhruthi_wellness")

def build_carousel():
    print("Generating temporary PDF for the carousel...")
    c = canvas.Canvas(TEMP_PDF, pagesize=(1080, 1080))
    
    # Slide 1 (Cover)
    draw_slide_1(c)
    c.showPage()
    
    # Slide 2 (Myth 1) - Removed "Myth: " text prefix, using red label card header instead
    draw_slide_myth_fact(
        c, "02 / 06",
        "Skipping meals helps weight loss",
        ["It can lead to overeating later and", "lower energy levels."]
    )
    c.showPage()
    
    # Slide 3 (Myth 2)
    draw_slide_myth_fact(
        c, "03 / 06",
        "Carbs make you fat",
        ["Excess calories cause weight gain.", "Healthy carbs are part of a balanced diet."]
    )
    c.showPage()
    
    # Slide 4 (Myth 3)
    draw_slide_myth_fact(
        c, "04 / 06",
        "Detox drinks cleanse your body",
        ["Your liver and kidneys already do", "that naturally."]
    )
    c.showPage()
    
    # Slide 5 (Myth 4)
    draw_slide_myth_fact(
        c, "05 / 06",
        "Eating healthy is expensive",
        ["Simple foods like dal, eggs, vegetables,", "fruits, and millets can be nutritious and affordable."]
    )
    c.showPage()
    
    # Slide 6 (Outro)
    draw_slide_6(c)
    c.showPage()
    
    c.save()
    print("PDF generation complete.")

def render_pdf_to_pngs():
    print("Rendering PDF pages to PNGs...")
    try:
        with pdfium.PdfDocument(TEMP_PDF) as doc:
            for i, page in enumerate(doc):
                # Render with a scale of 3.0 for super crisp 3240x3240 resolution
                bitmap = page.render(scale=3.0)
                pil_img = bitmap.to_pil()
                
                # Save in workspace
                out_workspace = os.path.join(WORKSPACE_DIR, f"instagram_slide_{i+1}.png")
                pil_img.save(out_workspace, "PNG")
                
                # Save in artifacts
                out_artifact = os.path.join(ARTIFACTS_DIR, f"instagram_slide_{i+1}.png")
                pil_img.save(out_artifact, "PNG")
                
                print(f"Saved slide {i+1} as {out_workspace}")
        
        # Clean up temporary PDF as requested by the user
        if os.path.exists(TEMP_PDF):
            os.remove(TEMP_PDF)
            print("Cleaned up temporary PDF.")
        return True
    except Exception as e:
        print(f"Error rendering PDF to PNGs: {e}")
        return False

if __name__ == "__main__":
    register_fonts()
    build_carousel()
    render_pdf_to_pngs()
