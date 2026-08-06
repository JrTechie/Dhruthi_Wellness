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
ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\1e955e57-d2e8-49bc-80ac-d8cc19e16db1"
ASSETS_DIR = os.path.join(WORKSPACE_DIR, "assets")
FONT_DIR = r"l:\Developer\nutriflow\.agents\skills\canvas-design\canvas-fonts"

OUTPUT_PDF = os.path.join(WORKSPACE_DIR, "Dhruthi_Reel_Storyboard.pdf")
OUTPUT_PNG_TEMPLATE = os.path.join(WORKSPACE_DIR, "dhruthi_reel_scene_{}.png")

# Also save copy in artifacts
ARTIFACT_PDF = os.path.join(ARTIFACTS_DIR, "Dhruthi_Reel_Storyboard.pdf")
ARTIFACT_PNG_TEMPLATE = os.path.join(ARTIFACTS_DIR, "dhruthi_reel_scene_{}.png")

# Color Palette (Premium Healthcare / Wellness Theme)
COLOR_BG_LIGHT = colors.HexColor('#F8F5EF')     # Warm Ivory
COLOR_PRIMARY = colors.HexColor('#6E8B63')      # Sage Green
COLOR_SECONDARY = colors.HexColor('#2F5D50')    # Deep Forest Green
COLOR_ACCENT = colors.HexColor('#E8DDCF')       # Soft Beige
COLOR_ALERT = colors.HexColor('#C96A4A')        # Muted Terracotta
COLOR_WHITE = colors.HexColor('#FFFFFF')
COLOR_GLASS_BG = colors.HexColor('#FFFFFFCC')   # Semi-transparent white

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

def find_image(prefix):
    """Finds the generated image file with the given prefix in the assets folder."""
    mapping = {
        "scene1_tired_kitchen": "scene1_tired_kitchen.png",
        "scene2_chips_uncertain": "scene2_chips_uncertain.png",
        "scene3_consultation_dietitian": "scene3_consultation_dietitian.png",
        "scene5_refreshed_breakfast": "scene5_refreshed_breakfast.png"
    }
    if prefix in mapping:
        path = os.path.join(ASSETS_DIR, mapping[prefix])
        if os.path.exists(path):
            return path
    raise FileNotFoundError(f"No image starting with {prefix} found in {ASSETS_DIR}")

# Drawing Helpers
def draw_leaf_shape(c, x, y, scale=1.0, angle=0.0, fill_color=COLOR_PRIMARY):
    c.saveState()
    c.translate(x, y)
    c.rotate(angle)
    c.scale(scale, scale)
    
    p = c.beginPath()
    p.moveTo(0, 0)
    p.curveTo(8, 12, 12, 28, 0, 40) # Right curve
    p.curveTo(-12, 28, -8, 12, 0, 0) # Left curve
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
    draw_leaf_shape(c, 0, 50, scale=0.6, angle=0, fill_color=fill_color)
    draw_leaf_shape(c, 0, 35, scale=0.5, angle=35, fill_color=fill_color)
    draw_leaf_shape(c, 0, 35, scale=0.5, angle=-35, fill_color=fill_color)
    draw_leaf_shape(c, 0, 18, scale=0.4, angle=45, fill_color=fill_color)
    draw_leaf_shape(c, 0, 18, scale=0.4, angle=-45, fill_color=fill_color)
    
    c.restoreState()

def draw_crescent_moon(c, x, y, scale=1.0, fill_color=COLOR_PRIMARY):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    c.setFillColor(fill_color)
    
    p = c.beginPath()
    p.moveTo(0, 20)
    p.curveTo(11, 20, 20, 11, 20, 0)
    p.curveTo(20, -11, 11, -20, 0, -20)
    p.curveTo(8, -12, 10, -3, 10, 0)
    p.curveTo(10, 3, 8, 12, 0, 20)
    p.close()
    
    c.drawPath(p, fill=True, stroke=False)
    c.restoreState()

def draw_lightning_bolt(c, x, y, scale=1.0, fill_color=COLOR_PRIMARY):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    c.setFillColor(fill_color)
    
    p = c.beginPath()
    p.moveTo(-5, 15)
    p.lineTo(7, 2)
    p.lineTo(1, 2)
    p.lineTo(5, -15)
    p.lineTo(-7, -2)
    p.lineTo(-1, -2)
    p.close()
    
    c.drawPath(p, fill=True, stroke=False)
    c.restoreState()

def draw_heart(c, x, y, scale=1.0, fill_color=COLOR_PRIMARY):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    c.setFillColor(fill_color)
    
    p = c.beginPath()
    p.moveTo(0, -12)
    p.curveTo(-15, -6, -15, 12, -6, 12)
    p.curveTo(-2, 12, 0, 4, 0, 4)
    p.curveTo(0, 4, 2, 12, 6, 12)
    p.curveTo(15, 12, 15, -6, 0, -12)
    p.close()
    
    c.drawPath(p, fill=True, stroke=False)
    c.restoreState()

def draw_smile_face(c, x, y, scale=1.0, stroke_color=COLOR_PRIMARY):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    c.setStrokeColor(stroke_color)
    c.setLineWidth(2.5)
    c.setFillColor(colors.transparent)
    
    # Face outline
    c.circle(0, 0, 18, fill=False, stroke=True)
    
    # Eyes
    c.setFillColor(stroke_color)
    c.circle(-6, 5, 2, fill=True, stroke=False)
    c.circle(6, 5, 2, fill=True, stroke=False)
    
    # Smile
    c.setLineCap(1)
    p = c.beginPath()
    p.moveTo(-8, -4)
    p.curveTo(-4, -10, 4, -10, 8, -4)
    c.drawPath(p, fill=False, stroke=True)
    
    c.restoreState()

def draw_salad_bowl(c, x, y, scale=1.0, stroke_color=COLOR_PRIMARY):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    c.setStrokeColor(stroke_color)
    c.setLineWidth(2.5)
    
    # Bowl shape
    p = c.beginPath()
    p.moveTo(-18, 2)
    p.curveTo(-18, -15, 18, -15, 18, 2)
    p.lineTo(-18, 2)
    p.close()
    c.setFillColor(colors.transparent)
    c.drawPath(p, fill=False, stroke=True)
    
    # Salad greens
    c.setFillColor(stroke_color)
    c.circle(-10, 6, 4, fill=True, stroke=False)
    c.circle(-2, 8, 5, fill=True, stroke=False)
    c.circle(8, 5, 4, fill=True, stroke=False)
    
    c.restoreState()

def draw_arrow_down(c, x, y, scale=1.0, color=COLOR_PRIMARY):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    c.setStrokeColor(color)
    c.setLineWidth(3.0)
    c.setLineCap(1)
    
    c.line(0, 15, 0, -15)
    c.line(-6, -7, 0, -15)
    c.line(6, -7, 0, -15)
    c.restoreState()

def draw_arrow_up(c, x, y, scale=1.0, color=COLOR_PRIMARY):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    c.setStrokeColor(color)
    c.setLineWidth(3.0)
    c.setLineCap(1)
    
    c.line(0, -15, 0, 15)
    c.line(-6, 7, 0, 15)
    c.line(6, 7, 0, 15)
    c.restoreState()

def draw_brain_icon(c, x, y, scale=1.0, color=COLOR_PRIMARY):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    c.setFillColor(color)
    c.setStrokeColor(color)
    c.setLineWidth(1)
    
    # Left hemisphere circles
    c.circle(-6, 6, 8, fill=True, stroke=False)
    c.circle(-10, -2, 7, fill=True, stroke=False)
    c.circle(-5, -8, 6, fill=True, stroke=False)
    
    # Right hemisphere circles
    c.circle(6, 6, 8, fill=True, stroke=False)
    c.circle(10, -2, 7, fill=True, stroke=False)
    c.circle(5, -8, 6, fill=True, stroke=False)
    
    # Central bridge
    c.circle(0, 0, 5, fill=True, stroke=False)
    c.restoreState()

def draw_stomach_icon(c, x, y, scale=1.0, color=COLOR_PRIMARY):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    c.setStrokeColor(color)
    c.setLineWidth(2.5)
    c.setFillColor(colors.transparent)
    
    # Stylized bean/stomach shape
    p = c.beginPath()
    p.moveTo(-15, 10)
    p.curveTo(-25, 0, -20, -15, -5, -12)
    p.curveTo(15, -10, 20, 10, 5, 12)
    p.curveTo(-5, 14, -8, 10, -15, 10)
    p.close()
    c.drawPath(p, fill=False, stroke=True)
    
    # Upper esophagus line
    c.line(-12, 11, -12, 20)
    # Lower duodenum line
    c.line(8, 12, 14, 20)
    c.restoreState()

# Standard frame styling (double borders, branding headers)
def draw_standard_layout(c, slide_number_str):
    # Background
    c.setFillColor(COLOR_BG_LIGHT)
    c.rect(0, 0, 1080, 1920, fill=True, stroke=False)
    
    # Double Border
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(3.0)
    c.rect(30, 30, 1020, 1860, fill=False, stroke=True)
    
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(1.0)
    c.rect(38, 38, 1004, 1844, fill=False, stroke=True)
    
    # Header Logo text
    c.setFont("Italiana", 34)
    c.setFillColor(COLOR_SECONDARY)
    c.drawCentredString(540, 1800, "D H R U T H I   W E L L N E S S")
    
    # Subheader accent
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(1.0)
    c.line(300, 1775, 780, 1775)
    
    # Slide Tracker / Pacing metadata
    c.setFont("Outfit", 18)
    c.setFillColor(COLOR_PRIMARY)
    c.drawString(70, 70, slide_number_str)
    
    # Bottom brand handle
    c.setFont("Outfit-Bold", 18)
    c.setFillColor(COLOR_SECONDARY)
    c.drawRightString(1010, 70, "@DhruthiWellness")

# Page Renderers
def render_slide_1(c):
    # Scene 1: Hook (0-4 seconds)
    draw_standard_layout(c, "SCENE 1  |  0 - 4s")
    
    # Title Hook
    c.setFont("Outfit-Bold", 58)
    c.setFillColor(COLOR_SECONDARY)
    c.drawCentredString(540, 1630, "Hungry...")
    c.drawCentredString(540, 1540, "or just sleep deprived?")
    
    # Subtle accent divider in Terracotta
    c.setStrokeColor(COLOR_ALERT)
    c.setLineWidth(3)
    c.line(480, 1490, 600, 1490)
    
    # Image Frame (Scene 1)
    img_path = find_image("scene1_tired_kitchen")
    
    # Drawing elegant image border
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(2)
    c.rect(78, 478, 924, 924, fill=False, stroke=True)
    
    # Embed image
    c.drawImage(img_path, 80, 480, width=920, height=920)
    
    # Hook Context Caption
    c.setFont("Outfit", 24)
    c.setFillColor(COLOR_SECONDARY)
    c.drawCentredString(540, 380, "Late-night snacking is often a cry for rest,")
    c.drawCentredString(540, 340, "not a cry for calories. Let's look at the science.")
    
    # Visual cues for Reel
    c.setFont("NothingYouCouldDo", 24)
    c.setFillColor(COLOR_PRIMARY)
    c.drawCentredString(540, 220, "Swipe to reveal the connection")
    draw_arrow_down(c, 540, 150, scale=1.2, color=COLOR_PRIMARY)

def render_slide_2(c):
    # Scene 2: Appetite & Sleep Connection (4-8 seconds)
    draw_standard_layout(c, "SCENE 2  |  4 - 8s")
    
    # On Screen Text
    c.setFont("Outfit-Bold", 58)
    c.setFillColor(COLOR_SECONDARY)
    c.drawCentredString(540, 1630, "Poor sleep changes")
    c.drawCentredString(540, 1540, "your appetite.")
    
    # Image Frame
    img_path = find_image("scene2_chips_uncertain")
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(2)
    c.rect(78, 878, 924, 604, fill=False, stroke=True)
    c.drawImage(img_path, 80, 880, width=920, height=600)
    
    # Infographic display
    c.setFillColor(COLOR_GLASS_BG)
    c.setStrokeColor(COLOR_ACCENT)
    c.setLineWidth(1.5)
    c.roundRect(80, 320, 920, 480, 15, fill=True, stroke=True)
    
    # Connective line between icons
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(2)
    c.setLineCap(1)
    c.setStrokeColor(COLOR_PRIMARY)
    c.setDash(6, 6)
    c.line(260, 580, 820, 580)
    c.setDash() # Reset dash
    
    # Draw Icons
    draw_crescent_moon(c, 260, 580, scale=2.5, fill_color=COLOR_PRIMARY)
    draw_brain_icon(c, 540, 580, scale=2.2, color=COLOR_SECONDARY)
    draw_stomach_icon(c, 820, 580, scale=2.2, color=COLOR_ALERT)
    
    # Labels
    c.setFont("Outfit-Bold", 26)
    c.setFillColor(COLOR_SECONDARY)
    c.drawCentredString(260, 480, "Somnic State")
    c.setFont("Outfit", 20)
    c.setFillColor(COLOR_PRIMARY)
    c.drawCentredString(260, 440, "Circadian Disruption")
    
    c.setFont("Outfit-Bold", 26)
    c.setFillColor(COLOR_SECONDARY)
    c.drawCentredString(540, 480, "Neural Signals")
    c.setFont("Outfit", 20)
    c.setFillColor(COLOR_PRIMARY)
    c.drawCentredString(540, 440, "Hormone Shift")
    
    c.setFont("Outfit-Bold", 26)
    c.setFillColor(COLOR_SECONDARY)
    c.drawCentredString(820, 480, "Appetite Drive")
    c.setFont("Outfit", 20)
    c.setFillColor(COLOR_PRIMARY)
    c.drawCentredString(820, 440, "Increased Cravings")
    
    # Context note
    c.setFont("NothingYouCouldDo", 24)
    c.setFillColor(COLOR_ALERT)
    c.drawCentredString(540, 220, "When sleep goes down, cravings go up...")

def render_slide_3(c):
    # Scene 3: The Hormonal Loop (8-14 seconds)
    draw_standard_layout(c, "SCENE 3  |  8 - 14s")
    
    # Image (Dietitian)
    img_path = find_image("scene3_consultation_dietitian")
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(2)
    c.rect(78, 1178, 924, 484, fill=False, stroke=True)
    c.drawImage(img_path, 80, 1180, width=920, height=480)
    
    # Large Floating glassmorphic panel
    c.setFillColor(COLOR_GLASS_BG)
    c.setStrokeColor(COLOR_ACCENT)
    c.setLineWidth(2)
    c.roundRect(80, 200, 920, 920, 18, fill=True, stroke=True)
    
    # Title on panel
    c.setFont("Italiana", 48)
    c.setFillColor(COLOR_SECONDARY)
    c.drawCentredString(540, 1030, "The Sleep-Appetite Cycle")
    
    # Pathway layout
    # Step 1: Less Sleep
    c.setFillColor(COLOR_SECONDARY)
    c.roundRect(240, 830, 600, 100, 12, fill=True, stroke=False)
    draw_crescent_moon(c, 300, 880, scale=1.5, fill_color=COLOR_WHITE)
    c.setFont("Outfit-Bold", 32)
    c.setFillColor(COLOR_WHITE)
    c.drawString(360, 865, "Less Sleep")
    
    # Down arrow
    draw_arrow_down(c, 540, 770, scale=1.2, color=COLOR_PRIMARY)
    
    # Step 2: Hunger
    c.setFillColor(COLOR_PRIMARY)
    c.roundRect(240, 610, 600, 100, 12, fill=True, stroke=False)
    draw_salad_bowl(c, 300, 660, scale=1.3, stroke_color=COLOR_WHITE)
    c.setFont("Outfit-Bold", 32)
    c.setFillColor(COLOR_WHITE)
    c.drawString(360, 645, "Increased Hunger")
    
    # Down arrow
    draw_arrow_down(c, 540, 550, scale=1.2, color=COLOR_PRIMARY)
    
    # Step 3: Cravings
    c.setFillColor(COLOR_ALERT)
    c.roundRect(240, 390, 600, 100, 12, fill=True, stroke=False)
    draw_stomach_icon(c, 300, 440, scale=1.4, color=COLOR_WHITE)
    c.setFont("Outfit-Bold", 32)
    c.setFillColor(COLOR_WHITE)
    c.drawString(360, 425, "Intense Cravings")
    
    # Explanation
    c.setFont("Outfit", 22)
    c.setFillColor(COLOR_SECONDARY)
    c.drawCentredString(540, 290, "Less sleep triggers ghrelin (hunger) and suppresses leptin (fullness).")
    c.drawCentredString(540, 250, "Your brain demands quick energy, leading to high-carb cravings.")

def render_slide_4(c):
    # Scene 4: Healthy Lifestyle (14-20 seconds)
    draw_standard_layout(c, "SCENE 4  |  14 - 20s")
    
    # On screen text
    c.setFont("Outfit-Bold", 58)
    c.setFillColor(COLOR_SECONDARY)
    c.drawCentredString(540, 1630, "The Wellness Solution")
    c.setFont("Italiana", 36)
    c.setFillColor(COLOR_PRIMARY)
    c.drawCentredString(540, 1560, "Resetting your biological baseline")
    
    # 5 Healthy Lifestyle cards
    card_data = [
        ("7–9 Hours Sleep", "Allows endocrine balance & reset", "moon"),
        ("Better Mood", "Reduces emotional & stress eating", "smile"),
        ("Better Food Choices", "Naturally favors clean nutrition", "salad"),
        ("More Energy", "Increases daily physical activity", "bolt"),
        ("Better Health", "Strengthens metabolism & immunity", "heart")
    ]
    
    y_start = 1320
    for i, (title, desc, icon_type) in enumerate(card_data):
        y_pos = y_start - (i * 240)
        
        # Draw Card
        c.setFillColor(COLOR_WHITE)
        c.setStrokeColor(COLOR_ACCENT)
        c.setLineWidth(1)
        c.roundRect(100, y_pos, 880, 180, 12, fill=True, stroke=True)
        
        # Draw Card Accent Strip
        c.setFillColor(COLOR_PRIMARY if i % 2 == 0 else COLOR_SECONDARY)
        c.roundRect(100, y_pos, 25, 180, 12, fill=True, stroke=False)
        c.rect(112, y_pos, 15, 180, fill=True, stroke=False)
        
        # Draw Icons inside cards
        icon_x = 210
        icon_y = y_pos + 90
        if icon_type == "moon":
            draw_crescent_moon(c, icon_x, icon_y, scale=1.5, fill_color=COLOR_PRIMARY)
        elif icon_type == "smile":
            draw_smile_face(c, icon_x, icon_y, scale=1.2, stroke_color=COLOR_PRIMARY)
        elif icon_type == "salad":
            draw_salad_bowl(c, icon_x, icon_y, scale=1.2, stroke_color=COLOR_PRIMARY)
        elif icon_type == "bolt":
            draw_lightning_bolt(c, icon_x, icon_y, scale=1.2, fill_color=COLOR_PRIMARY)
        elif icon_type == "heart":
            draw_heart(c, icon_x, icon_y, scale=1.2, fill_color=COLOR_PRIMARY)
            
        # Draw Typography
        c.setFont("Outfit-Bold", 32)
        c.setFillColor(COLOR_SECONDARY)
        c.drawString(290, y_pos + 105, title)
        
        c.setFont("Outfit", 20)
        c.setFillColor(COLOR_PRIMARY)
        c.drawString(290, y_pos + 50, desc)

def render_slide_5(c):
    # Scene 5: Outro & Call to Action (20-25 seconds)
    draw_standard_layout(c, "SCENE 5  |  20 - 25s")
    
    # Image (Morning Refreshed Breakfast)
    img_path = find_image("scene5_refreshed_breakfast")
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(2)
    c.rect(78, 1178, 924, 484, fill=False, stroke=True)
    c.drawImage(img_path, 80, 1180, width=920, height=480)
    
    # Background accent leaves
    draw_leaf_sprig(c, 150, 960, angle=35, scale=1.2, fill_color=COLOR_PRIMARY)
    draw_leaf_sprig(c, 930, 250, angle=-145, scale=1.1, fill_color=COLOR_PRIMARY)
    
    # CTA Card
    c.setFillColor(COLOR_GLASS_BG)
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(1.5)
    c.roundRect(120, 360, 840, 720, 20, fill=True, stroke=True)
    
    # Core Closing Message
    c.setFont("Italiana", 64)
    c.setFillColor(COLOR_SECONDARY)
    c.drawCentredString(540, 940, "Sleep Better.")
    c.drawCentredString(540, 840, "Eat Smarter.")
    
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(1.5)
    c.line(420, 800, 660, 800)
    
    # Logo
    c.setFont("Outfit-Bold", 36)
    c.setFillColor(COLOR_PRIMARY)
    c.drawCentredString(540, 710, "DHRUTHI WELLNESS")
    
    c.setFont("Outfit", 24)
    c.setFillColor(COLOR_SECONDARY)
    c.drawCentredString(540, 650, "Evidence-Based Nutrition & Lifestyle")
    
    # CTA Button
    c.setFillColor(COLOR_SECONDARY)
    c.roundRect(240, 480, 600, 80, 40, fill=True, stroke=False)
    
    c.setFont("Outfit-Bold", 26)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 510, "Follow @DhruthiWellness")
    
    # Closing details
    c.setFont("NothingYouCouldDo", 26)
    c.setFillColor(COLOR_ALERT)
    c.drawCentredString(540, 240, "Your journey to balance begins here.")

def build_pdf_storyboard():
    print("Generating Dhruthi Reel Storyboard PDF...")
    c = canvas.Canvas(OUTPUT_PDF, pagesize=(1080, 1920))
    
    # Render pages
    render_slide_1(c)
    c.showPage()
    
    render_slide_2(c)
    c.showPage()
    
    render_slide_3(c)
    c.showPage()
    
    render_slide_4(c)
    c.showPage()
    
    render_slide_5(c)
    c.showPage()
    
    c.save()
    print("PDF storyboard built successfully.")
    
    # Copy to artifacts
    import shutil
    shutil.copy(OUTPUT_PDF, ARTIFACT_PDF)
    print(f"Copied PDF to artifacts at {ARTIFACT_PDF}")

def render_pdf_to_pngs():
    print("Rendering PDF pages to crisp PNGs...")
    try:
        with pdfium.PdfDocument(OUTPUT_PDF) as doc:
            for i, page in enumerate(doc):
                bitmap = page.render(scale=1.0)
                pil_img = bitmap.to_pil()
                
                # Save in workspace
                out_workspace = OUTPUT_PNG_TEMPLATE.format(i + 1)
                pil_img.save(out_workspace, "PNG")
                
                # Save in artifacts
                out_artifact = ARTIFACT_PNG_TEMPLATE.format(i + 1)
                pil_img.save(out_artifact, "PNG")
                
                print(f"Saved slide {i+1} as {out_workspace}")
        return True
    except Exception as e:
        print(f"Error rendering PDF to PNGs: {e}")
        return False

if __name__ == "__main__":
    register_fonts()
    build_pdf_storyboard()
    render_pdf_to_pngs()
    print("Storyboard generation complete!")
