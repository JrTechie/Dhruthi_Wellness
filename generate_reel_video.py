import os
import sys
import math
import shutil
import cv2
import numpy as np
from PIL import Image
import pypdfium2 as pdfium

# ReportLab imports
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Define paths
WORKSPACE_DIR = r"l:\Developer\nutriflow"
ASSETS_DIR = os.path.join(WORKSPACE_DIR, "assets")
FONT_DIR = os.path.join(WORKSPACE_DIR, r".agents\skills\canvas-design\canvas-fonts")

# Temporary PDF paths in artifacts (not in workspace)
ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\1e955e57-d2e8-49bc-80ac-d8cc19e16db1"
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

TEMP_SECTIONS = {
    1: os.path.join(ARTIFACTS_DIR, "temp_scene_1.pdf"),
    2: os.path.join(ARTIFACTS_DIR, "temp_scene_2.pdf"),
    3: os.path.join(ARTIFACTS_DIR, "temp_scene_3.pdf"),
    4: os.path.join(ARTIFACTS_DIR, "temp_scene_4.pdf"),
    5: os.path.join(ARTIFACTS_DIR, "temp_scene_5.pdf")
}

OUTPUT_MP4 = os.path.join(WORKSPACE_DIR, "dhruthi_wellness_reel.mp4")
ARTIFACT_MP4 = os.path.join(ARTIFACTS_DIR, "dhruthi_wellness_reel.mp4")

# Color Palette (Premium Healthcare / Wellness Theme - Circadian Equilibrium)
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
    """Finds image asset with the given prefix in the assets directory."""
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
            
    # Fallback to direct search
    path = os.path.join(ASSETS_DIR, f"{prefix}.png")
    if os.path.exists(path):
        return path
        
    raise FileNotFoundError(f"No original image starting with {prefix} found in {ASSETS_DIR}")

# Helper for Ken Burns (zoom & pan) effect on background photos
def crop_and_zoom_image(img_path, t, max_t, zoom_start=1.0, zoom_end=1.12, pan_dir=(0.0, 0.0)):
    """Crops and zooms into a source image based on time t to simulate camera motion."""
    # Safety clip to avoid out-of-bounds calculations
    t = max(0.0, min(t, max_t))
    
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
    c.setFillColor(colors.Color(r, g, b, alpha=max(0.0, min(1.0, alpha))))
    
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
    c.setFillColor(colors.Color(r, g, b, alpha=max(0.0, min(1.0, alpha))))
    
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
    c.setFillColor(colors.Color(r, g, b, alpha=max(0.0, min(1.0, alpha))))
    
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
    c.setStrokeColor(colors.Color(r, g, b, alpha=max(0.0, min(1.0, alpha))))
    c.setLineWidth(2.5)
    c.setFillColor(colors.transparent)
    
    c.circle(0, 0, 18, fill=False, stroke=True)
    
    c.setFillColor(colors.Color(r, g, b, alpha=max(0.0, min(1.0, alpha))))
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
    c.setStrokeColor(colors.Color(r, g, b, alpha=max(0.0, min(1.0, alpha))))
    c.setLineWidth(2.5)
    
    p = c.beginPath()
    p.moveTo(-18, 2)
    p.curveTo(-18, -15, 18, -15, 18, 2)
    p.lineTo(-18, 2)
    p.close()
    c.setFillColor(colors.transparent)
    c.drawPath(p, fill=False, stroke=True)
    
    c.setFillColor(colors.Color(r, g, b, alpha=max(0.0, min(1.0, alpha))))
    c.circle(-10, 6, 4, fill=True, stroke=False)
    c.circle(-2, 8, 5, fill=True, stroke=False)
    c.circle(8, 5, 4, fill=True, stroke=False)
    
    c.restoreState()

def draw_arrow_down(c, x, y, scale=1.0, color=COLOR_PRIMARY, alpha=1.0):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    
    r, g, b = color.rgb()
    c.setStrokeColor(colors.Color(r, g, b, alpha=max(0.0, min(1.0, alpha))))
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
    c.setFillColor(colors.Color(r, g, b, alpha=max(0.0, min(1.0, alpha))))
    c.setStrokeColor(colors.Color(r, g, b, alpha=max(0.0, min(1.0, alpha))))
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
    c.setStrokeColor(colors.Color(r, g, b, alpha=max(0.0, min(1.0, alpha))))
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

# Scene Drawer Functions (removed the scene debug trackers for a clean, professional reel)
def draw_scene_1(c, t):
    draw_base_layout(c)
    
    # Zoom/Pan kitchen photo (slow push-in)
    img_path = find_image("scene1_tired_kitchen")
    zoomed_img = crop_and_zoom_image(img_path, t, 4.0, zoom_start=1.0, zoom_end=1.12, pan_dir=(-0.2, 0.1))
    
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(2)
    c.rect(78, 478, 924, 924, fill=False, stroke=True)
    c.drawImage(zoomed_img, 80, 480, width=920, height=920)
    
    # Animate Title: Fades in gradually in first 1.5 seconds
    title_alpha = max(0.0, min(1.0, t / 1.5))
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
    t_local = t - 4.0
    draw_base_layout(c)
    
    # Title fade in
    title_alpha = max(0.0, min(1.0, t_local / 1.0))
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
    t_local = t - 8.0
    draw_base_layout(c)
    
    # Zoom/Pan dietitian photo
    img_path = find_image("scene3_consultation_dietitian")
    zoomed_img = crop_and_zoom_image(img_path, t_local, 6.0, zoom_start=1.0, zoom_end=1.12, pan_dir=(-0.1, -0.1))
    
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(2)
    c.rect(78, 1178, 924, 484, fill=False, stroke=True)
    c.drawImage(zoomed_img, 80, 1180, width=920, height=480)
    
    # Large Floating Panel
    panel_alpha = max(0.0, min(1.0, t_local / 0.8))
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
    t_local = t - 14.0
    draw_base_layout(c)
    
    sr, sg, sb = COLOR_SECONDARY.rgb()
    pr, pg, pb = COLOR_PRIMARY.rgb()
    
    # Title fade in
    title_alpha = max(0.0, min(1.0, t_local / 0.8))
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
    t_local = t - 20.0
    draw_base_layout(c)
    
    # Zoom/Pan breakfast photo
    img_path = find_image("scene5_refreshed_breakfast")
    zoomed_img = crop_and_zoom_image(img_path, t_local, 5.0, zoom_start=1.0, zoom_end=1.1, pan_dir=(0.1, 0.2))
    
    c.setStrokeColor(COLOR_SECONDARY)
    c.setLineWidth(2)
    c.rect(78, 1178, 924, 484, fill=False, stroke=True)
    c.drawImage(zoomed_img, 80, 1180, width=920, height=480)
    
    # Background accent leaves (gently swaying)
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

# Compile individual section PDFs at 30 FPS
def build_section_pdfs():
    FPS = 30
    
    # 1. Scene 1: 0.0 to 4.5 seconds (136 frames)
    print("Building Scene 1 PDF frames...")
    c1 = canvas.Canvas(TEMP_SECTIONS[1], pagesize=(1080, 1920))
    total_f1 = int(4.5 * FPS) + 1
    for f in range(total_f1):
        t = f / float(FPS)
        draw_scene_1(c1, t)
        c1.showPage()
    c1.save()
    
    # 2. Scene 2: 3.5 to 8.5 seconds (151 frames)
    print("Building Scene 2 PDF frames...")
    c2 = canvas.Canvas(TEMP_SECTIONS[2], pagesize=(1080, 1920))
    total_f2 = int(5.0 * FPS) + 1
    for f in range(total_f2):
        t = 3.5 + (f / float(FPS))
        draw_scene_2(c2, t)
        c2.showPage()
    c2.save()
    
    # 3. Scene 3: 7.5 to 14.5 seconds (211 frames)
    print("Building Scene 3 PDF frames...")
    c3 = canvas.Canvas(TEMP_SECTIONS[3], pagesize=(1080, 1920))
    total_f3 = int(7.0 * FPS) + 1
    for f in range(total_f3):
        t = 7.5 + (f / float(FPS))
        draw_scene_3(c3, t)
        c3.showPage()
    c3.save()
    
    # 4. Scene 4: 13.5 to 20.5 seconds (211 frames)
    print("Building Scene 4 PDF frames...")
    c4 = canvas.Canvas(TEMP_SECTIONS[4], pagesize=(1080, 1920))
    total_f4 = int(7.0 * FPS) + 1
    for f in range(total_f4):
        t = 13.5 + (f / float(FPS))
        draw_scene_4(c4, t)
        c4.showPage()
    c4.save()
    
    # 5. Scene 5: 19.5 to 25.0 seconds (166 frames)
    print("Building Scene 5 PDF frames...")
    c5 = canvas.Canvas(TEMP_SECTIONS[5], pagesize=(1080, 1920))
    total_f5 = int(5.5 * FPS) + 1
    for f in range(total_f5):
        t = 19.5 + (f / float(FPS))
        draw_scene_5(c5, t)
        c5.showPage()
    c5.save()

# Compile the final video from the PDF frame documents
def compile_video():
    FPS = 30
    total_frames = 25 * FPS # 750 frames (0 to 749)
    
    print("Opening PDF frame documents for rasterization...")
    docs = {}
    for scene_id, path in TEMP_SECTIONS.items():
        docs[scene_id] = pdfium.PdfDocument(path)
        
    print(f"Initializing video writer for {OUTPUT_MP4} at 30 FPS...")
    # 'mp4v' FourCC codec for standard .mp4 video compatibility
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    video_writer = cv2.VideoWriter(OUTPUT_MP4, fourcc, 30.0, (1080, 1920))
    
    try:
        for f in range(total_frames):
            t = f / float(FPS)
            
            # Determine which scene or transition is active
            img = None
            
            # Transition 1 -> 2 (3.5s to 4.5s)
            if 3.5 <= t <= 4.5:
                alpha = (t - 3.5) / 1.0
                p1 = int(round(t * FPS))
                p2 = int(round((t - 3.5) * FPS))
                img1 = get_pdf_page(docs[1], p1, "Scene 1")
                img2 = get_pdf_page(docs[2], p2, "Scene 2")
                img = Image.blend(img1, img2, alpha)
                
            # Transition 2 -> 3 (7.5s to 8.5s)
            elif 7.5 <= t <= 8.5:
                alpha = (t - 7.5) / 1.0
                p1 = int(round((t - 3.5) * FPS))
                p2 = int(round((t - 7.5) * FPS))
                img1 = get_pdf_page(docs[2], p1, "Scene 2")
                img2 = get_pdf_page(docs[3], p2, "Scene 3")
                img = Image.blend(img1, img2, alpha)
                
            # Transition 3 -> 4 (13.5s to 14.5s)
            elif 13.5 <= t <= 14.5:
                alpha = (t - 13.5) / 1.0
                p1 = int(round((t - 7.5) * FPS))
                p2 = int(round((t - 13.5) * FPS))
                img1 = get_pdf_page(docs[3], p1, "Scene 3")
                img2 = get_pdf_page(docs[4], p2, "Scene 4")
                img = Image.blend(img1, img2, alpha)
                
            # Transition 4 -> 5 (19.5s to 20.5s)
            elif 19.5 <= t <= 20.5:
                alpha = (t - 19.5) / 1.0
                p1 = int(round((t - 13.5) * FPS))
                p2 = int(round((t - 19.5) * FPS))
                img1 = get_pdf_page(docs[4], p1, "Scene 4")
                img2 = get_pdf_page(docs[5], p2, "Scene 5")
                img = Image.blend(img1, img2, alpha)
                
            # Static Scenes
            elif t < 3.5:
                p = int(round(t * FPS))
                img = get_pdf_page(docs[1], p, "Scene 1")
            elif 4.5 < t < 7.5:
                p = int(round((t - 3.5) * FPS))
                img = get_pdf_page(docs[2], p, "Scene 2")
            elif 8.5 < t < 13.5:
                p = int(round((t - 7.5) * FPS))
                img = get_pdf_page(docs[3], p, "Scene 3")
            elif 14.5 < t < 19.5:
                p = int(round((t - 13.5) * FPS))
                img = get_pdf_page(docs[4], p, "Scene 4")
            else: # t > 20.5
                p = int(round((t - 19.5) * FPS))
                img = get_pdf_page(docs[5], p, "Scene 5")
                
            # Convert PIL RGB to OpenCV BGR
            frame_bgr = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
            video_writer.write(frame_bgr)
            
            if f % 75 == 0:
                print(f"Compiled frame {f}/{total_frames} (t = {t:.2f}s)...")
                
        print("Reel video compilation complete.")
    finally:
        # Close all documents
        for doc in docs.values():
            doc.close()
        # Release video writer
        video_writer.release()

def get_pdf_page(doc, index, doc_name=""):
    try:
        if index < 0 or index >= len(doc):
            index = max(0, min(index, len(doc) - 1))
        page = doc[index]
        bitmap = page.render(scale=1.0)
        return bitmap.to_pil()
    except Exception as e:
        print(f"Error loading page {index} from {doc_name}: {e}")
        return Image.new("RGB", (1080, 1920), (248, 245, 239))

def cleanup():
    print("Cleaning up temporary PDFs and zoom cache...")
    for path in TEMP_SECTIONS.values():
        if os.path.exists(path):
            os.remove(path)
            
    temp_crop = os.path.join(ARTIFACTS_DIR, "temp_zoom_frame.png")
    if os.path.exists(temp_crop):
        os.remove(temp_crop)

def copy_to_artifacts():
    print("Copying compiled video to artifacts directory...")
    shutil.copy(OUTPUT_MP4, ARTIFACT_MP4)
    print(f"Video saved to artifacts at {ARTIFACT_MP4}")

if __name__ == "__main__":
    register_fonts()
    build_section_pdfs()
    compile_video()
    copy_to_artifacts()
    cleanup()
    print("Instagram Reel compilation successful!")
