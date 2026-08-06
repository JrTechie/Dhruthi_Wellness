import os
import sys
import math
import shutil
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

TEMP_PDF = os.path.join(ARTIFACTS_DIR, "temp_animation_frames.pdf")
OUTPUT_GIF = os.path.join(WORKSPACE_DIR, "dhruthi_wellness_reel.gif")
ARTIFACT_GIF = os.path.join(ARTIFACTS_DIR, "dhruthi_wellness_reel.gif")

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
    raise FileNotFoundError(f"No original image starting with {prefix} found in {ASSETS_DIR}")

# Helper for Ken Burns (zoom & pan) effect on background photos
def crop_and_zoom_image(img_path, t, max_t, zoom_start=1.0, zoom_end=1.12, pan_dir=(0.0, 0.0)):
    """Crops and zooms into a source image based on time t to simulate camera motion."""
    img = Image.open(img_path)
    w, h = img.size
    
    # Calculate progress (0.0 to 1.0)
    progress = t / max_t
    zoom = zoom_start + (zoom_end - zoom_start) * progress
    
    crop_w = int(w / zoom)
    crop_h = int(h / zoom)
    
    # Calculate center coordinates with pan offset
    dx, dy = pan_dir
    center_x = w / 2.0 + (w * 0.05 * dx * progress)
    center_y = h / 2.0 + (h * 0.05 * dy * progress)
    
    # Ensure crop box stays inside image boundary
    left = max(0, min(int(center_x - crop_w / 2), w - crop_w))
    top = max(0, min(int(center_y - crop_h / 2), h - crop_h))
    
    cropped = img.crop((left, top, left + crop_w, top + crop_h))
    
    # Save temporary file for ReportLab
    temp_path = os.path.join(ARTIFACTS_DIR, "temp_zoom_frame.png")
    cropped.save(temp_path, "PNG")
    return temp_path

# Drawing Helpers
def draw_leaf_shape(c, x, y, scale=1.0, angle=0.0, fill_color=COLOR_PRIMARY):
    c.saveState()
    c.translate(x, y)
    c.rotate(angle)
    c.scale(scale, scale)
    
    p = c.beginPath()
    p.moveTo(0, 0)
    p.curveTo(8, 12, 12, 28, 0, 40)
    p.curveTo(-12, 28, -8, 12, 0, 0)
    p.close()
    
    c.setFillColor(fill_color)
    c.drawPath(p, fill=True, stroke=False)
    c.restoreState()

def draw_leaf_sprig(c, x, y, angle=0.0, scale=1.0, fill_color=COLOR_PRIMARY):
    c.saveState()
    c.translate(x, y)
    c.rotate(angle)
    c.scale(scale, scale)
    
    c.setStrokeColor(fill_color)
    c.setLineWidth(1.5)
    c.line(0, 0, 0, 50)
    
    draw_leaf_shape(c, 0, 50, scale=0.6, angle=0, fill_color=fill_color)
    draw_leaf_shape(c, 0, 35, scale=0.5, angle=35, fill_color=fill_color)
    draw_leaf_shape(c, 0, 35, scale=0.5, angle=-35, fill_color=fill_color)
    draw_leaf_shape(c, 0, 18, scale=0.4, angle=45, fill_color=fill_color)
    draw_leaf_shape(c, 0, 18, scale=0.4, angle=-45, fill_color=fill_color)
    
    c.restoreState()

def draw_crescent_moon(c, x, y, scale=1.0, fill_color=COLOR_PRIMARY, alpha=1.0):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    
    # Calculate RGBA color
    r, g, b = fill_color.rgb()
    c.setFillColor(colors.Color(r, g, b, alpha=alpha))
    
    p = c.beginPath()
    p.moveTo(0, 20)
    p.curveTo(11, 20, 20, 11, 20, 0)
    p.curveTo(20, -11, 11, -20, 0, -20)
    p.curveTo(8, -12, 10, -3, 10, 0)
    p.curveTo(10, 3, 8, 12, 0, 20)
    p.close()
    
    c.drawPath(p, fill=True, stroke=False)
    c.restoreState()

def draw_lightning_bolt(c, x, y, scale=1.0, fill_color=COLOR_PRIMARY, alpha=1.0):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    
    r, g, b = fill_color.rgb()
    c.setFillColor(colors.Color(r, g, b, alpha=alpha))
    
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

def draw_heart(c, x, y, scale=1.0, fill_color=COLOR_PRIMARY, alpha=1.0):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    
    r, g, b = fill_color.rgb()
    c.setFillColor(colors.Color(r, g, b, alpha=alpha))
    
    p = c.beginPath()
    p.moveTo(0, -12)
    p.curveTo(-15, -6, -15, 12, -6, 12)
    p.curveTo(-2, 12, 0, 4, 0, 4)
    p.curveTo(0, 4, 2, 12, 6, 12)
    p.curveTo(15, 12, 15, -6, 0, -12)
    p.close()
    
    c.drawPath(p, fill=True, stroke=False)
    c.restoreState()

def draw_smile_face(c, x, y, scale=1.0, stroke_color=COLOR_PRIMARY, alpha=1.0):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    
    r, g, b = stroke_color.rgb()
    c.setStrokeColor(colors.Color(r, g, b, alpha=alpha))
    c.setLineWidth(2.5)
    c.setFillColor(colors.transparent)
    
    c.circle(0, 0, 18, fill=False, stroke=True)
    
    c.setFillColor(colors.Color(r, g, b, alpha=alpha))
    c.circle(-6, 5, 2, fill=True, stroke=False)
    c.circle(6, 5, 2, fill=True, stroke=False)
    
    c.setLineCap(1)
    p = c.beginPath()
    p.moveTo(-8, -4)
    p.curveTo(-4, -10, 4, -10, 8, -4)
    c.drawPath(p, fill=False, stroke=True)
    
    c.restoreState()

def draw_salad_bowl(c, x, y, scale=1.0, stroke_color=COLOR_PRIMARY, alpha=1.0):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    
    r, g, b = stroke_color.rgb()
    c.setStrokeColor(colors.Color(r, g, b, alpha=alpha))
    c.setLineWidth(2.5)
    
    p = c.beginPath()
    p.moveTo(-18, 2)
    p.curveTo(-18, -15, 18, -15, 18, 2)
    p.lineTo(-18, 2)
    p.close()
    c.setFillColor(colors.transparent)
    c.drawPath(p, fill=False, stroke=True)
    
    c.setFillColor(colors.Color(r, g, b, alpha=alpha))
    c.circle(-10, 6, 4, fill=True, stroke=False)
    c.circle(-2, 8, 5, fill=True, stroke=False)
    c.circle(8, 5, 4, fill=True, stroke=False)
    
    c.restoreState()

def draw_arrow_down(c, x, y, scale=1.0, color=COLOR_PRIMARY, alpha=1.0):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    
    r, g, b = color.rgb()
    c.setStrokeColor(colors.Color(r, g, b, alpha=alpha))
    c.setLineWidth(3.0)
    c.setLineCap(1)
    
    c.line(0, 15, 0, -15)
    c.line(-6, -7, 0, -15)
    c.line(6, -7, 0, -15)
    c.restoreState()

def draw_brain_icon(c, x, y, scale=1.0, color=COLOR_PRIMARY, alpha=1.0):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    
    r, g, b = color.rgb()
    c.setFillColor(colors.Color(r, g, b, alpha=alpha))
    c.setStrokeColor(colors.Color(r, g, b, alpha=alpha))
    c.setLineWidth(1)
    
    c.circle(-6, 6, 8, fill=True, stroke=False)
    c.circle(-10, -2, 7, fill=True, stroke=False)
    c.circle(-5, -8, 6, fill=True, stroke=False)
    c.circle(6, 6, 8, fill=True, stroke=False)
    c.circle(10, -2, 7, fill=True, stroke=False)
    c.circle(5, -8, 6, fill=True, stroke=False)
    c.circle(0, 0, 5, fill=True, stroke=False)
    c.restoreState()

def draw_stomach_icon(c, x, y, scale=1.0, color=COLOR_PRIMARY, alpha=1.0):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    
    r, g, b = color.rgb()
    c.setStrokeColor(colors.Color(r, g, b, alpha=alpha))
    c.setLineWidth(2.5)
    c.setFillColor(colors.transparent)
    
    p = c.beginPath()
    p.moveTo(-15, 10)
    p.curveTo(-25, 0, -20, -15, -5, -12)
    p.curveTo(15, -10, 20, 10, 5, 12)
    p.curveTo(-5, 14, -8, 10, -15, 10)
    p.close()
    c.drawPath(p, fill=False, stroke=True)
    
    c.line(-12, 11, -12, 20)
    c.line(8, 12, 14, 20)
    c.restoreState()

# Base layout setup (background + borders + logo)
def draw_base_layout(c):
    c.setFillColor(COLOR_BG_LIGHT)
    c.rect(0, 0, 1080, 1920, fill=True, stroke=False)
    
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(3.0)
    c.rect(30, 30, 1020, 1860, fill=False, stroke=True)
    
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(1.0)
    c.rect(38, 38, 1004, 1844, fill=False, stroke=True)
    
    c.setFont("Italiana", 34)
    c.setFillColor(COLOR_SECONDARY)
    c.drawCentredString(540, 1800, "D H R U T H I   W E L L N E S S")
    
    c.setStrokeColor(COLOR_PRIMARY)
    c.setLineWidth(1.0)
    c.line(300, 1775, 780, 1775)
    
    c.setFont("Outfit-Bold", 18)
    c.setFillColor(COLOR_SECONDARY)
    c.drawRightString(1010, 70, "@DhruthiWellness")

# Scene Drawer Functions
def draw_scene_1(c, t):
    # Scene 1: Hook (0 to 4s)
    draw_base_layout(c)
    
    c.setFont("Outfit", 18)
    c.setFillColor(COLOR_PRIMARY)
    c.drawString(70, 70, "SCENE 1  |  0 - 4s")
    
    # Zoom/Pan kitchen photo (slow push-in)
    img_path = find_image("scene1_tired_kitchen")
    zoomed_img = crop_and_zoom_image(img_path, t, 4.0, zoom_start=1.0, zoom_end=1.12, pan_dir=(-0.2, 0.1))
    
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(2)
    c.rect(78, 478, 924, 924, fill=False, stroke=True)
    c.drawImage(zoomed_img, 80, 480, width=920, height=920)
    
    # Animate Title: Fades in gradually in first 1.5 seconds
    title_alpha = min(1.0, t / 1.5)
    sr, sg, sb = COLOR_SECONDARY.rgb()
    c.setFillColor(colors.Color(sr, sg, sb, alpha=title_alpha))
    
    c.setFont("Outfit-Bold", 58)
    c.drawCentredString(540, 1630, "Hungry...")
    c.drawCentredString(540, 1540, "or just sleep deprived?")
    
    ar, ag, ab = COLOR_ALERT.rgb()
    c.setStrokeColor(colors.Color(ar, ag, ab, alpha=title_alpha))
    c.setLineWidth(3)
    c.line(480, 1490, 600, 1490)
    
    # Subtext fade in at 2.0s
    sub_alpha = max(0.0, min(1.0, (t - 2.0) / 1.0))
    c.setFillColor(colors.Color(sr, sg, sb, alpha=sub_alpha))
    c.setFont("Outfit", 24)
    c.drawCentredString(540, 380, "Late-night snacking is often a cry for rest,")
    c.drawCentredString(540, 340, "not a cry for calories. Let's look at the science.")
    
    # Hint arrow fade in at 3.0s
    hint_alpha = max(0.0, min(1.0, (t - 3.0) / 1.0))
    pr, pg, pb = COLOR_PRIMARY.rgb()
    c.setFillColor(colors.Color(pr, pg, pb, alpha=hint_alpha))
    c.setFont("NothingYouCouldDo", 24)
    c.drawCentredString(540, 220, "Swipe to reveal the connection")
    draw_arrow_down(c, 540, 150, scale=1.2, color=COLOR_PRIMARY, alpha=hint_alpha)

def draw_scene_2(c, t):
    # Scene 2: Appetite Drive (4s to 8s)
    t_local = t - 4.0
    draw_base_layout(c)
    
    c.setFont("Outfit", 18)
    c.setFillColor(COLOR_PRIMARY)
    c.drawString(70, 70, "SCENE 2  |  4 - 8s")
    
    # Title fade in
    title_alpha = min(1.0, t_local / 1.0)
    sr, sg, sb = COLOR_SECONDARY.rgb()
    c.setFillColor(colors.Color(sr, sg, sb, alpha=title_alpha))
    c.setFont("Outfit-Bold", 58)
    c.drawCentredString(540, 1630, "Poor sleep changes")
    c.drawCentredString(540, 1540, "your appetite.")
    
    # Zoom/Pan chips image
    img_path = find_image("scene2_chips_uncertain")
    zoomed_img = crop_and_zoom_image(img_path, t_local, 4.0, zoom_start=1.0, zoom_end=1.1, pan_dir=(0.2, -0.1))
    
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(2)
    c.rect(78, 878, 924, 604, fill=False, stroke=True)
    c.drawImage(zoomed_img, 80, 880, width=920, height=600)
    
    # Infographic Glass Card fade-in at 1.0s
    card_alpha = max(0.0, min(1.0, (t_local - 1.0) / 0.8))
    
    # semi-transparent background
    c.setFillColor(colors.Color(1.0, 1.0, 1.0, alpha=0.8 * card_alpha))
    c.setStrokeColor(colors.Color(COLOR_ACCENT.rgb()[0], COLOR_ACCENT.rgb()[1], COLOR_ACCENT.rgb()[2], alpha=card_alpha))
    c.setLineWidth(1.5)
    c.roundRect(80, 320, 920, 480, 15, fill=True, stroke=True)
    
    if card_alpha > 0.0:
        # Dotted line animation: draws from left to right from 1.5s to 2.5s
        line_progress = max(0.0, min(1.0, (t_local - 1.5) / 1.0))
        if line_progress > 0.0:
            c.setStrokeColor(colors.Color(COLOR_PRIMARY.rgb()[0], COLOR_PRIMARY.rgb()[1], COLOR_PRIMARY.rgb()[2], alpha=card_alpha))
            c.setLineWidth(2)
            c.setDash(6, 6)
            c.line(260, 580, 260 + (560 * line_progress), 580)
            c.setDash()
        
        # Icon fades sequentially
        # Moon fades at 1.5s
        moon_alpha = max(0.0, min(1.0, (t_local - 1.5) / 0.5)) * card_alpha
        draw_crescent_moon(c, 260, 580, scale=2.5, fill_color=COLOR_PRIMARY, alpha=moon_alpha)
        c.setFont("Outfit-Bold", 26)
        c.setFillColor(colors.Color(sr, sg, sb, alpha=moon_alpha))
        c.drawCentredString(260, 480, "Somnic State")
        c.setFont("Outfit", 20)
        c.setFillColor(colors.Color(COLOR_PRIMARY.rgb()[0], COLOR_PRIMARY.rgb()[1], COLOR_PRIMARY.rgb()[2], alpha=moon_alpha))
        c.drawCentredString(260, 440, "Circadian Disruption")
        
        # Brain fades at 2.2s
        brain_alpha = max(0.0, min(1.0, (t_local - 2.2) / 0.5)) * card_alpha
        draw_brain_icon(c, 540, 580, scale=2.2, color=COLOR_SECONDARY, alpha=brain_alpha)
        c.setFont("Outfit-Bold", 26)
        c.setFillColor(colors.Color(sr, sg, sb, alpha=brain_alpha))
        c.drawCentredString(540, 480, "Neural Signals")
        c.setFont("Outfit", 20)
        c.setFillColor(colors.Color(COLOR_PRIMARY.rgb()[0], COLOR_PRIMARY.rgb()[1], COLOR_PRIMARY.rgb()[2], alpha=brain_alpha))
        c.drawCentredString(540, 440, "Hormone Shift")
        
        # Stomach fades at 2.9s
        stomach_alpha = max(0.0, min(1.0, (t_local - 2.9) / 0.5)) * card_alpha
        draw_stomach_icon(c, 820, 580, scale=2.2, color=COLOR_ALERT, alpha=stomach_alpha)
        c.setFont("Outfit-Bold", 26)
        c.setFillColor(colors.Color(sr, sg, sb, alpha=stomach_alpha))
        c.drawCentredString(820, 480, "Appetite Drive")
        c.setFont("Outfit", 20)
        c.setFillColor(colors.Color(COLOR_PRIMARY.rgb()[0], COLOR_PRIMARY.rgb()[1], COLOR_PRIMARY.rgb()[2], alpha=stomach_alpha))
        c.drawCentredString(820, 440, "Increased Cravings")
        
    # Context note fade in
    note_alpha = max(0.0, min(1.0, (t_local - 3.2) / 0.8))
    ar, ag, ab = COLOR_ALERT.rgb()
    c.setFillColor(colors.Color(ar, ag, ab, alpha=note_alpha))
    c.setFont("NothingYouCouldDo", 24)
    c.drawCentredString(540, 220, "When sleep goes down, cravings go up...")

def draw_scene_3(c, t):
    # Scene 3: The Hormonal Loop (8s to 14s)
    t_local = t - 8.0
    draw_base_layout(c)
    
    c.setFont("Outfit", 18)
    c.setFillColor(COLOR_PRIMARY)
    c.drawString(70, 70, "SCENE 3  |  8 - 14s")
    
    # Zoom/Pan dietitian photo
    img_path = find_image("scene3_consultation_dietitian")
    zoomed_img = crop_and_zoom_image(img_path, t_local, 6.0, zoom_start=1.0, zoom_end=1.12, pan_dir=(-0.1, -0.1))
    
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(2)
    c.rect(78, 1178, 924, 484, fill=False, stroke=True)
    c.drawImage(zoomed_img, 80, 1180, width=920, height=480)
    
    # Large Floating Panel
    panel_alpha = min(1.0, t_local / 0.8)
    c.setFillColor(colors.Color(1.0, 1.0, 1.0, alpha=0.8 * panel_alpha))
    c.setStrokeColor(colors.Color(COLOR_ACCENT.rgb()[0], COLOR_ACCENT.rgb()[1], COLOR_ACCENT.rgb()[2], alpha=panel_alpha))
    c.setLineWidth(2)
    c.roundRect(80, 200, 920, 920, 18, fill=True, stroke=True)
    
    if panel_alpha > 0.0:
        sr, sg, sb = COLOR_SECONDARY.rgb()
        c.setFont("Italiana", 48)
        c.setFillColor(colors.Color(sr, sg, sb, alpha=panel_alpha))
        c.drawCentredString(540, 1030, "The Sleep-Appetite Cycle")
        
        # Step 1: Less Sleep (Slide in & Fade at 0.8s)
        s1_alpha = max(0.0, min(1.0, (t_local - 0.8) / 0.6))
        if s1_alpha > 0.0:
            # Subtle slide up from 810 to 830
            y_offset = 830 - 20 * (1.0 - s1_alpha)
            c.setFillColor(colors.Color(sr, sg, sb, alpha=s1_alpha))
            c.roundRect(240, y_offset, 600, 100, 12, fill=True, stroke=False)
            draw_crescent_moon(c, 300, y_offset + 50, scale=1.5, fill_color=COLOR_WHITE, alpha=s1_alpha)
            c.setFont("Outfit-Bold", 32)
            c.setFillColor(colors.Color(1.0, 1.0, 1.0, alpha=s1_alpha))
            c.drawString(360, y_offset + 35, "Less Sleep")
            
        # Arrow 1 fades at 1.8s
        a1_alpha = max(0.0, min(1.0, (t_local - 1.8) / 0.5))
        if a1_alpha > 0.0:
            draw_arrow_down(c, 540, 770, scale=1.2, color=COLOR_PRIMARY, alpha=a1_alpha)
            
        # Step 2: Hunger (Slide in & Fade at 2.4s)
        s2_alpha = max(0.0, min(1.0, (t_local - 2.4) / 0.6))
        pr, pg, pb = COLOR_PRIMARY.rgb()
        if s2_alpha > 0.0:
            y_offset = 610 - 20 * (1.0 - s2_alpha)
            c.setFillColor(colors.Color(pr, pg, pb, alpha=s2_alpha))
            c.roundRect(240, y_offset, 600, 100, 12, fill=True, stroke=False)
            draw_salad_bowl(c, 300, y_offset + 50, scale=1.3, stroke_color=COLOR_WHITE, alpha=s2_alpha)
            c.setFont("Outfit-Bold", 32)
            c.setFillColor(colors.Color(1.0, 1.0, 1.0, alpha=s2_alpha))
            c.drawString(360, y_offset + 35, "Increased Hunger")
            
        # Arrow 2 fades at 3.4s
        a2_alpha = max(0.0, min(1.0, (t_local - 3.4) / 0.5))
        if a2_alpha > 0.0:
            draw_arrow_down(c, 540, 550, scale=1.2, color=COLOR_PRIMARY, alpha=a2_alpha)
            
        # Step 3: Cravings (Slide in & Fade at 4.0s)
        s3_alpha = max(0.0, min(1.0, (t_local - 4.0) / 0.6))
        alr, alg, alb = COLOR_ALERT.rgb()
        if s3_alpha > 0.0:
            y_offset = 390 - 20 * (1.0 - s3_alpha)
            c.setFillColor(colors.Color(alr, alg, alb, alpha=s3_alpha))
            c.roundRect(240, y_offset, 600, 100, 12, fill=True, stroke=False)
            draw_stomach_icon(c, 300, y_offset + 50, scale=1.4, color=COLOR_WHITE, alpha=s3_alpha)
            c.setFont("Outfit-Bold", 32)
            c.setFillColor(colors.Color(1.0, 1.0, 1.0, alpha=s3_alpha))
            c.drawString(360, y_offset + 35, "Intense Cravings")
            
        # Footnote text fades at 4.8s
        foot_alpha = max(0.0, min(1.0, (t_local - 4.8) / 0.8))
        c.setFont("Outfit", 22)
        c.setFillColor(colors.Color(sr, sg, sb, alpha=foot_alpha))
        c.drawCentredString(540, 290, "Less sleep triggers ghrelin (hunger) and suppresses leptin (fullness).")
        c.drawCentredString(540, 250, "Your brain demands quick energy, leading to high-carb cravings.")

def draw_scene_4(c, t):
    # Scene 4: The Solutions List (14s to 20s)
    t_local = t - 14.0
    draw_base_layout(c)
    
    c.setFont("Outfit", 18)
    c.setFillColor(COLOR_PRIMARY)
    c.drawString(70, 70, "SCENE 4  |  14 - 20s")
    
    sr, sg, sb = COLOR_SECONDARY.rgb()
    pr, pg, pb = COLOR_PRIMARY.rgb()
    
    # Title fade in
    title_alpha = min(1.0, t_local / 0.8)
    c.setFont("Outfit-Bold", 58)
    c.setFillColor(colors.Color(sr, sg, sb, alpha=title_alpha))
    c.drawCentredString(540, 1630, "The Wellness Solution")
    
    c.setFont("Italiana", 36)
    c.setFillColor(colors.Color(pr, pg, pb, alpha=title_alpha))
    c.drawCentredString(540, 1560, "Resetting your biological baseline")
    
    card_data = [
        ("7–9 Hours Sleep", "Allows endocrine balance & reset", "moon"),
        ("Better Mood", "Reduces emotional & stress eating", "smile"),
        ("Better Food Choices", "Naturally favors clean nutrition", "salad"),
        ("More Energy", "Increases daily physical activity", "bolt"),
        ("Better Health", "Strengthens metabolism & immunity", "heart")
    ]
    
    y_start = 1320
    # Sequential pop-in of solution cards from 0.8s to 4.8s
    for i, (title, desc, icon_type) in enumerate(card_data):
        trigger_time = 0.6 + i * 0.9
        card_alpha = max(0.0, min(1.0, (t_local - trigger_time) / 0.5))
        
        if card_alpha > 0.0:
            y_pos = y_start - (i * 240)
            
            # Slide in slightly from left
            x_offset = -30 * (1.0 - card_alpha)
            
            # Draw Card Background
            c.setFillColor(colors.Color(1.0, 1.0, 1.0, alpha=card_alpha))
            c.setStrokeColor(colors.Color(COLOR_ACCENT.rgb()[0], COLOR_ACCENT.rgb()[1], COLOR_ACCENT.rgb()[2], alpha=card_alpha))
            c.setLineWidth(1)
            c.roundRect(100 + x_offset, y_pos, 880, 180, 12, fill=True, stroke=True)
            
            # Card accent strip
            strip_color = COLOR_PRIMARY if i % 2 == 0 else COLOR_SECONDARY
            c.setFillColor(colors.Color(strip_color.rgb()[0], strip_color.rgb()[1], strip_color.rgb()[2], alpha=card_alpha))
            c.roundRect(100 + x_offset, y_pos, 25, 180, 12, fill=True, stroke=False)
            c.rect(112 + x_offset, y_pos, 15, 180, fill=True, stroke=False)
            
            # Draw Icons
            icon_x = 210 + x_offset
            icon_y = y_pos + 90
            if icon_type == "moon":
                draw_crescent_moon(c, icon_x, icon_y, scale=1.5, fill_color=COLOR_PRIMARY, alpha=card_alpha)
            elif icon_type == "smile":
                draw_smile_face(c, icon_x, icon_y, scale=1.2, stroke_color=COLOR_PRIMARY, alpha=card_alpha)
            elif icon_type == "salad":
                draw_salad_bowl(c, icon_x, icon_y, scale=1.2, stroke_color=COLOR_PRIMARY, alpha=card_alpha)
            elif icon_type == "bolt":
                draw_lightning_bolt(c, icon_x, icon_y, scale=1.2, fill_color=COLOR_PRIMARY, alpha=card_alpha)
            elif icon_type == "heart":
                draw_heart(c, icon_x, icon_y, scale=1.2, fill_color=COLOR_PRIMARY, alpha=card_alpha)
                
            # Draw text
            c.setFont("Outfit-Bold", 32)
            c.setFillColor(colors.Color(sr, sg, sb, alpha=card_alpha))
            c.drawString(290 + x_offset, y_pos + 105, title)
            
            c.setFont("Outfit", 20)
            c.setFillColor(colors.Color(pr, pg, pb, alpha=card_alpha))
            c.drawString(290 + x_offset, y_pos + 50, desc)

def draw_scene_5(c, t):
    # Scene 5: Outro & Call to Action (20s to 25s)
    t_local = t - 20.0
    draw_base_layout(c)
    
    c.setFont("Outfit", 18)
    c.setFillColor(COLOR_PRIMARY)
    c.drawString(70, 70, "SCENE 5  |  20 - 25s")
    
    # Zoom/Pan breakfast photo
    img_path = find_image("scene5_refreshed_breakfast")
    zoomed_img = crop_and_zoom_image(img_path, t_local, 5.0, zoom_start=1.0, zoom_end=1.1, pan_dir=(0.1, 0.2))
    
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(2)
    c.rect(78, 1178, 924, 484, fill=False, stroke=True)
    c.drawImage(zoomed_img, 80, 1180, width=920, height=480)
    
    # Background accent leaves (gently swaying in a wind-like motion)
    sway = 4.0 * math.sin(2.0 * math.pi * t_local / 2.5) # cycle every 2.5s
    draw_leaf_sprig(c, 150, 960, angle=35 + sway, scale=1.2, fill_color=COLOR_PRIMARY)
    draw_leaf_sprig(c, 930, 250, angle=-145 - sway, scale=1.1, fill_color=COLOR_PRIMARY)
    
    # CTA Card fade in at 0.5s
    card_alpha = max(0.0, min(1.0, (t_local - 0.5) / 0.8))
    
    c.setFillColor(colors.Color(1.0, 1.0, 1.0, alpha=0.85 * card_alpha))
    c.setStrokeColor(colors.Color(COLOR_SECONDARY.rgb()[0], COLOR_SECONDARY.rgb()[1], COLOR_SECONDARY.rgb()[2], alpha=card_alpha))
    c.setLineWidth(1.5)
    c.roundRect(120, 360, 840, 720, 20, fill=True, stroke=True)
    
    if card_alpha > 0.0:
        sr, sg, sb = COLOR_SECONDARY.rgb()
        pr, pg, pb = COLOR_PRIMARY.rgb()
        
        # Message fade
        c.setFont("Italiana", 64)
        c.setFillColor(colors.Color(sr, sg, sb, alpha=card_alpha))
        c.drawCentredString(540, 940, "Sleep Better.")
        c.drawCentredString(540, 840, "Eat Smarter.")
        
        c.setStrokeColor(colors.Color(pr, pg, pb, alpha=card_alpha))
        c.setLineWidth(1.5)
        c.line(420, 800, 660, 800)
        
        c.setFont("Outfit-Bold", 36)
        c.setFillColor(colors.Color(pr, pg, pb, alpha=card_alpha))
        c.drawCentredString(540, 710, "DHRUTHI WELLNESS")
        
        c.setFont("Outfit", 24)
        c.setFillColor(colors.Color(sr, sg, sb, alpha=card_alpha))
        c.drawCentredString(540, 650, "Evidence-Based Nutrition & Lifestyle")
        
        # CTA Button Pulse Animation
        pulse = 1.0 + 0.03 * math.sin(2.0 * math.pi * t_local / 1.5) # cycle every 1.5s
        
        c.saveState()
        c.translate(540, 520)
        c.scale(pulse, pulse)
        c.setFillColor(colors.Color(sr, sg, sb, alpha=card_alpha))
        c.roundRect(-300, -40, 600, 80, 40, fill=True, stroke=False)
        
        c.setFont("Outfit-Bold", 26)
        c.setFillColor(colors.Color(1.0, 1.0, 1.0, alpha=card_alpha))
        c.drawCentredString(0, -10, "Follow @DhruthiWellness")
        c.restoreState()
        
        # Subtitle details
        note_alpha = max(0.0, min(1.0, (t_local - 1.5) / 0.8)) * card_alpha
        alr, alg, alb = COLOR_ALERT.rgb()
        c.setFont("NothingYouCouldDo", 26)
        c.setFillColor(colors.Color(alr, alg, alb, alpha=note_alpha))
        c.drawCentredString(540, 240, "Your journey to balance begins here.")

def compile_animation():
    # Frame settings: 10 Frames Per Second (FPS).
    # Scene durations:
    # Scene 1: 0 - 4s (40 frames)
    # Scene 2: 4 - 8s (40 frames)
    # Scene 3: 8 - 14s (60 frames)
    # Scene 4: 14 - 20s (60 frames)
    # Scene 5: 20 - 25s (50 frames)
    # Total: 250 frames
    FPS = 10
    total_seconds = 25
    total_frames = total_seconds * FPS
    
    print(f"Creating a {total_seconds}-second animated storyboard ({total_frames} frames)...")
    c = canvas.Canvas(TEMP_PDF, pagesize=(1080, 1920))
    
    for f in range(total_frames):
        t = f / float(FPS)
        
        # Dispatch to the active scene
        if t < 4.0:
            draw_scene_1(c, t)
        elif t < 8.0:
            draw_scene_2(c, t)
        elif t < 14.0:
            draw_scene_3(c, t)
        elif t < 20.0:
            draw_scene_4(c, t)
        else:
            draw_scene_5(c, t)
            
        c.showPage()
        
        if f % 25 == 0:
            print(f"Rendered canvas for frame {f}/{total_frames} (t = {t:.2f}s)...")
            
    c.save()
    print("PDF containing all animation frames saved.")

def convert_pdf_to_gif():
    print("Converting PDF frames to animated GIF...")
    try:
        frames_images = []
        with pdfium.PdfDocument(TEMP_PDF) as doc:
            for i, page in enumerate(doc):
                # Scale of 0.4 reduces 1080x1920 to 432x768 to keep GIF file size optimal for sharing
                bitmap = page.render(scale=0.4)
                pil_img = bitmap.to_pil()
                frames_images.append(pil_img)
                if i % 25 == 0:
                    print(f"Rasterized page {i+1} of {len(doc)}...")
        
        print("Compiling GIF from frames...")
        # 100 milliseconds per frame = 10 FPS
        frames_images[0].save(
            OUTPUT_GIF,
            save_all=True,
            append_images=frames_images[1:],
            duration=100,
            loop=0
        )
        print(f"GIF compiled and saved successfully to {OUTPUT_GIF}")
        
        # Copy to artifacts
        shutil.copy(OUTPUT_GIF, ARTIFACT_GIF)
        print(f"Copied animated GIF to artifacts at {ARTIFACT_GIF}")
        
        # Clean up temporary PDF and cropped frames
        if os.path.exists(TEMP_PDF):
            os.remove(TEMP_PDF)
        temp_crop = os.path.join(ARTIFACTS_DIR, "temp_zoom_frame.png")
        if os.path.exists(temp_crop):
            os.remove(temp_crop)
            
        return True
    except Exception as e:
        print(f"Error compiling animated GIF: {e}")
        return False

if __name__ == "__main__":
    register_fonts()
    compile_animation()
    convert_pdf_to_gif()
    print("Animation build successful!")
