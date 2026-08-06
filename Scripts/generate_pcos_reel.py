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
from reportlab.lib.utils import ImageReader

# Define paths
WORKSPACE_DIR = r"l:\Developer\nutriflow"
ASSETS_DIR = os.path.join(WORKSPACE_DIR, "assets")
FONT_DIR = os.path.join(WORKSPACE_DIR, r".agents\skills\canvas-design\canvas-fonts")

# Temporary PDF paths in artifacts
ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\34f36609-8308-41ec-9ff5-72cca0711368"
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

TEMP_SECTIONS = {
    1: os.path.join(ARTIFACTS_DIR, "temp_pcos_scene_1.pdf"),
    2: os.path.join(ARTIFACTS_DIR, "temp_pcos_scene_2.pdf"),
    3: os.path.join(ARTIFACTS_DIR, "temp_pcos_scene_3.pdf"),
    4: os.path.join(ARTIFACTS_DIR, "temp_pcos_scene_4.pdf"),
    5: os.path.join(ARTIFACTS_DIR, "temp_pcos_scene_5.pdf")
}

OUTPUT_MP4 = os.path.join(WORKSPACE_DIR, "Reels finalised", "dhruthi_pcos_reel.mp4")
ARTIFACT_MP4 = os.path.join(ARTIFACTS_DIR, "dhruthi_pcos_reel.mp4")

# PCOD/PCOS Orchid Bloom Palette
COLOR_BG_DARK = colors.HexColor('#151012')         # Deep Obsidian Plum
COLOR_ORCHID = colors.HexColor('#D96B9E')          # Orchid Pink Primary Accent
COLOR_EMERALD = colors.HexColor('#2D4F3E')         # Forest Emerald Green Secondary Accent
COLOR_ROSE_GLOW = colors.HexColor('#FBD6E6')       # Rose Glow Highlight
COLOR_FLAME = colors.HexColor('#FF5A36')           # Coral Flame Alert Glow
COLOR_WHITE = colors.HexColor('#FFFFFF')           # Pure White
COLOR_SUBTEXT = colors.HexColor('#DDD3CC')         # Soft Muted Cream Text

# Register fonts
def register_fonts():
    print("Registering custom fonts...")
    try:
        pdfmetrics.registerFont(TTFont('Italiana', os.path.join(FONT_DIR, 'Italiana-Regular.ttf')))
        pdfmetrics.registerFont(TTFont('Outfit', os.path.join(FONT_DIR, 'Outfit-Regular.ttf')))
        pdfmetrics.registerFont(TTFont('Outfit-Bold', os.path.join(FONT_DIR, 'Outfit-Bold.ttf')))
        print("Font registration successful.")
    except Exception as e:
        print(f"Error registering fonts: {e}")
        sys.exit(1)

def get_asset_image(name):
    path = os.path.join(ASSETS_DIR, name)
    if os.path.exists(path):
        return path
    remotion_path = os.path.join(WORKSPACE_DIR, "remotion-video", "public", "assets", name)
    if os.path.exists(remotion_path):
        return remotion_path
    raise FileNotFoundError(f"Missing asset: {name}")

def crop_to_fill(img_path, box_w, box_h, t, max_t, zoom_start=1.0, zoom_end=1.08):
    t = max(0.0, min(t, max_t))
    img = Image.open(img_path)
    w, h = img.size
    
    progress = t / max_t
    zoom = zoom_start + (zoom_end - zoom_start) * progress
    
    target_ratio = float(box_w) / float(box_h)
    img_ratio = float(w) / float(h)
    
    if img_ratio > target_ratio:
        crop_h = h
        crop_w = int(h * target_ratio)
    else:
        crop_w = w
        crop_h = int(w / target_ratio)
        
    crop_w = max(1, int(crop_w / zoom))
    crop_h = max(1, int(crop_h / zoom))
    
    left = max(0, (w - crop_w) // 2)
    top = max(0, (h - crop_h) // 2)
    
    cropped = img.crop((left, top, left + crop_w, top + crop_h))
    return ImageReader(cropped)

def draw_fullscreen_background(c, img_path, t, max_t):
    img_reader = crop_to_fill(img_path, 1080, 1920, t, max_t, 1.0, 1.08)
    c.drawImage(img_reader, 0, 0, width=1080, height=1920)
    
    c.saveState()
    # Dark shadow overlay gradient for legibility (darkened to deblur details behind transparent text)
    c.setFillColor(colors.Color(0.08, 0.06, 0.07, alpha=0.65))
    c.rect(0, 1400, 1080, 520, fill=True, stroke=False)
    c.setFillColor(colors.Color(0.08, 0.06, 0.07, alpha=0.85))
    c.rect(0, 0, 1080, 920, fill=True, stroke=False)
    c.restoreState()

def draw_fullscreen_glass_card(c, x, y, w, h, radius=32, stroke_color=None, stroke_width=2.0, alpha=0.85):
    c.saveState()
    # Force zero opacity background fill
    c.setFillColor(colors.Color(0.08, 0.06, 0.07, alpha=0.0))
    if stroke_color:
        c.setStrokeColor(stroke_color)
        c.setLineWidth(stroke_width)
    else:
        c.setStrokeColor(colors.Color(1.0, 1.0, 1.0, alpha=0.18))
        c.setLineWidth(2.0)
    c.roundRect(x, y, w, h, radius, fill=True, stroke=True)
    c.restoreState()

def draw_fullscreen_header(c, category="SPECIAL REPORT", issue="VOL 01"):
    c.saveState()
    # Orchid glass badge top left
    c.setFillColor(colors.Color(0.08, 0.06, 0.07, alpha=0.88))
    c.setStrokeColor(COLOR_ORCHID)
    c.setLineWidth(2.0)
    c.roundRect(60, 1820, 260, 48, 24, fill=True, stroke=True)
    
    c.setFillColor(COLOR_ORCHID)
    c.circle(85, 1844, 4, fill=True, stroke=False)
    
    c.setFont("Outfit-Bold", 20)
    c.setFillColor(COLOR_ORCHID)
    c.drawString(100, 1836, category)
    
    c.setFont("Outfit", 20)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(340, 1836, issue)
    
    c.setFont("Outfit-Bold", 24)
    c.setFillColor(COLOR_WHITE)
    c.drawRightString(1020, 1834, "@dhruthi_wellness")
    
    c.setStrokeColor(colors.Color(1.0, 1.0, 1.0, alpha=0.15))
    c.setLineWidth(1.5)
    c.line(60, 1800, 1020, 1800)
    c.restoreState()

# Scene 1: Full-Screen Hook (0s to 6s)
def draw_scene_1(c, t):
    img_path = get_asset_image("pcos_scene1_struggle.png")
    draw_fullscreen_background(c, img_path, t, 6.0)
    draw_fullscreen_header(c, "SPECIAL REPORT", "VOL 01")
    
    # Floating Alert Badge Top
    c.saveState()
    c.setFillColor(colors.Color(0.85, 0.42, 0.62, alpha=0.88))
    c.setStrokeColor(COLOR_ORCHID)
    c.setLineWidth(2.0)
    c.roundRect(60, 1680, 540, 56, 16, fill=True, stroke=True)
    c.setFont("Outfit-Bold", 24)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(330, 1696, "⚠️ METABOLIC RESET INITIATED")
    c.restoreState()
    
    c.saveState()
    c.setFont("Outfit-Bold", 46)
    c.setFillColor(COLOR_ROSE_GLOW)
    c.drawCentredString(540, 730, "STRUGGLING WITH PCOD / PCOS?")
    
    c.setFont("Italiana", 96)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 580, "Ever feel like your body")
    
    # Curved Glowing Pill Box
    c.setFillColor(colors.Color(0.85, 0.42, 0.62, alpha=0.20))
    c.setStrokeColor(COLOR_ORCHID)
    c.setLineWidth(2.5)
    c.roundRect(80, 430, 920, 100, 24, fill=True, stroke=True)
    
    c.setFont("Italiana", 96)
    c.setFillColor(COLOR_ORCHID)
    c.drawCentredString(540, 450, "is fighting against you?")
    
    # Subtext Dark Glass Card
    draw_fullscreen_glass_card(c, 60, 240, 960, 180, radius=28, stroke_color=colors.Color(1.0, 1.0, 1.0, alpha=0.2), alpha=0.85)
    c.setFont("Outfit", 40)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawCentredString(540, 340, "It's not just a hormone problem. It's a metabolic alarm")
    c.drawCentredString(540, 280, "that needs root-cause healing.")
    c.restoreState()

# Scene 2: Dual Side-By-Side Comparison Glass Cards (5s to 11s)
def draw_scene_2(c, t):
    t_local = max(0.0, t - 5.0)
    img_path = get_asset_image("pcos_scene2_meal.png")
    draw_fullscreen_background(c, img_path, t_local, 6.0)
    draw_fullscreen_header(c, "BIOLOGICAL MECHANISM", "VOL 02")
    
    c.saveState()
    c.setFont("Italiana", 100)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 1650, "The Insulin-PCOS Link")
    c.setFont("Outfit-Bold", 38)
    c.setFillColor(COLOR_ROSE_GLOW)
    c.drawCentredString(540, 1570, "WHY STARVING YOURSELF MAKES PCOS SYMPTOMS WORSE")
    c.restoreState()
    
    # Single unified transparent comparison panel without gaps
    c.saveState()
    draw_fullscreen_glass_card(c, 60, 440, 960, 1080, radius=36, stroke_color=colors.Color(1.0, 1.0, 1.0, alpha=0.20), stroke_width=2.5, alpha=0.0)
    
    # Vertical Divider Line
    c.setStrokeColor(colors.Color(1.0, 1.0, 1.0, alpha=0.15))
    c.setLineWidth(2.0)
    c.line(540, 440, 540, 1520)
    c.restoreState()
    
    # Left Column Contents: WHAT YOU THINK (x from 60 to 540)
    c.saveState()
    c.setFillColor(colors.Color(1.0, 0.35, 0.2, alpha=0.25))
    c.setStrokeColor(COLOR_FLAME)
    c.setLineWidth(1.5)
    c.roundRect(90, 1440, 240, 44, 22, fill=True, stroke=True)
    c.setFont("Outfit-Bold", 30)
    c.setFillColor(COLOR_FLAME)
    c.drawCentredString(210, 1454, "WHAT YOU THINK")
    
    c.setFont("Outfit-Bold", 48)
    c.setFillColor(COLOR_WHITE)
    c.drawString(90, 1370, "Severe Restriction")
    
    c.setFont("Outfit", 36)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(90, 1250, "• Cutting out all carbs")
    c.drawString(90, 1170, "• Intense daily workouts")
    c.drawString(90, 1090, "• Expecting cycle recovery")
    
    c.setFillColor(colors.Color(1.0, 0.2, 0.2, alpha=0.15))
    c.roundRect(85, 480, 410, 80, 20, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 28)
    c.setFillColor(COLOR_FLAME)
    c.drawCentredString(290, 508, "❌ Spikes Stress")
    c.restoreState()
    
    # Right Column Contents: WHAT IS HAPPENING (x from 540 to 1020)
    c.saveState()
    c.setFillColor(colors.Color(0.85, 0.42, 0.62, alpha=0.25))
    c.setStrokeColor(COLOR_ORCHID)
    c.setLineWidth(1.5)
    c.roundRect(590, 1440, 260, 44, 22, fill=True, stroke=True)
    c.setFont("Outfit-Bold", 30)
    c.setFillColor(COLOR_ORCHID)
    c.drawCentredString(720, 1454, "WHAT IS HAPPENING")
    
    c.setFont("Outfit-Bold", 48)
    c.setFillColor(COLOR_ORCHID)
    c.drawString(590, 1370, "Insulin Resistance")
    
    c.setFont("Outfit", 36)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(590, 1250, "• High insulin blocks ovaries")
    c.drawString(590, 1170, "• Elevated testosterone")
    c.drawString(590, 1090, "• Fatigue, cravings & gain")
    
    c.setFillColor(colors.Color(0.85, 0.42, 0.62, alpha=0.15))
    c.roundRect(585, 480, 410, 80, 20, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 28)
    c.setFillColor(COLOR_ORCHID)
    c.drawCentredString(790, 508, "✓ Needs Reset")
    c.restoreState()
    
    # Bottom Callout
    c.saveState()
    c.setFont("Outfit-Bold", 42)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 320, "Your body needs metabolic recovery, not calorie starving.")
    c.restoreState()

# Scene 3: Full-Screen Clinical Diagnostics & Metric Cards (10s to 17s)
def draw_scene_3(c, t):
    t_local = max(0.0, t - 10.0)
    img_path = get_asset_image("pcos_scene3_consult.png")
    draw_fullscreen_background(c, img_path, t_local, 7.0)
    draw_fullscreen_header(c, "CLINICAL DIAGNOSTICS", "VOL 03")
    
    c.saveState()
    c.setFont("Italiana", 100)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 1650, "Measure Biological Friction")
    c.setFont("Outfit-Bold", 38)
    c.setFillColor(COLOR_ROSE_GLOW)
    c.drawCentredString(540, 1570, "UNCOVER THE HIDDEN METABOLIC BRAKES")
    c.restoreState()
    
    # Single unified transparent metrics panel without gaps
    gauge_progress = min(1.0, t_local / 3.0)
    c.saveState()
    draw_fullscreen_glass_card(c, 60, 750, 960, 720, radius=36, stroke_color=colors.Color(1.0, 1.0, 1.0, alpha=0.20), stroke_width=2.5, alpha=0.0)
    
    # Divider Lines
    c.setStrokeColor(colors.Color(1.0, 1.0, 1.0, alpha=0.15))
    c.setLineWidth(2.0)
    c.line(380, 750, 380, 1470)
    c.line(700, 750, 700, 1470)
    c.restoreState()
    
    # 3 columns inside the unified card
    draw_fullscreen_stat_card(c, 60, 750, 320, 720, f"+{int(45 * gauge_progress)}%", "Insulin Resistance", "Blocks energy, locks fat", COLOR_ORCHID)
    draw_fullscreen_stat_card(c, 380, 750, 320, 720, f"+{int(30 * gauge_progress)}%", "Cortisol Rise", "Halts ovulation", COLOR_FLAME)
    draw_fullscreen_stat_card(c, 700, 750, 320, 720, f"-{int(40 * gauge_progress)}%", "Progesterone Drop", "Triggers heavy flow & PMS", COLOR_EMERALD)

def draw_fullscreen_stat_card(c, x, y, w, h, metric_str, title, subtitle, accent_color):
    c.saveState()
    
    pill_x = x + 20
    pill_w = w - 40
    c.setFillColor(accent_color)
    c.roundRect(pill_x, y + h - 220, pill_w, 170, 24, fill=True, stroke=False)
    
    c.setFont("Outfit-Bold", 72)
    c.setFillColor(COLOR_BG_DARK)
    c.drawCentredString(x + w/2.0, y + h - 130, metric_str)
    
    c.setFont("Outfit-Bold", 40)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(x + w/2.0, y + 250, title)
    
    c.setFont("Outfit", 30)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawCentredString(x + w/2.0, y + 170, subtitle)
    c.restoreState()

# Scene 4: Full-Screen Solution Framework Glass Pill Cards (16s to 23s)
def draw_scene_4(c, t):
    t_local = max(0.0, t - 24.0)
    img_path = get_asset_image("pcos_scene4_yoga.png")
    draw_fullscreen_background(c, img_path, t_local, 9.0)
    draw_fullscreen_header(c, "SOLUTION PROTOCOL", "VOL 04")
    
    c.saveState()
    c.setFont("Outfit-Bold", 36)
    c.setFillColor(COLOR_ROSE_GLOW)
    c.drawCentredString(540, 1720, "THE DHRUTHI WELLNESS PROTOCOL")
    
    c.setFont("Italiana", 100)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 1630, "How We Reset Rhythms")
    c.restoreState()
    
    # 3 Stacked Horizontal Dark Glass Pill Cards
    draw_fullscreen_protocol_pill(c, 60, 1180, 960, 260, "01", "Low-Insulin Meal Anchors", "Pair complex carbs with healthy fats & proteins to flatten insulin.", COLOR_EMERALD)
    draw_fullscreen_protocol_pill(c, 60, 860, 960, 260, "02", "Circadian Sleep Synchronization", "Restore deep sleep phases to naturally reduce evening cortisol.", COLOR_ORCHID)
    draw_fullscreen_protocol_pill(c, 60, 540, 960, 260, "03", "Cycle-Aligned Movement", "Low-intensity strength & yoga over extreme cardio to protect thyroid.", COLOR_EMERALD)

def draw_fullscreen_protocol_pill(c, x, y, w, h, num, title, desc, accent_color):
    c.saveState()
    draw_fullscreen_glass_card(c, x, y, w, h, radius=36, stroke_color=accent_color, stroke_width=2.5, alpha=0.88)
    
    c.setFillColor(accent_color)
    c.roundRect(x + 35, y + 45, 120, 170, 24, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 48)
    c.setFillColor(COLOR_BG_DARK)
    c.drawCentredString(x + 95, y + 105, num)
    
    c.setFont("Outfit-Bold", 40)
    c.setFillColor(COLOR_WHITE)
    c.drawString(x + 190, y + 155, title)
    
    c.setFont("Outfit", 32)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(x + 190, y + 85, desc)
    c.restoreState()

# Scene 5: Full-Screen Grand Outro & CTA (22s to 28s)
def draw_scene_5(c, t):
    t_local = max(0.0, t - 32.0)
    img_path = get_asset_image("pcos_scene5_wellness.png")
    draw_fullscreen_background(c, img_path, t_local, 9.0)
    draw_fullscreen_header(c, "EVIDENCE-BASED CARE", "FINAL")
    
    c.saveState()
    c.setFont("Italiana", 112)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 1380, "Restore Cycles.")
    
    c.setFillColor(colors.Color(0.85, 0.42, 0.62, alpha=0.20))
    c.setStrokeColor(COLOR_ORCHID)
    c.setLineWidth(2.5)
    c.roundRect(260, 1250, 560, 80, 20, fill=True, stroke=True)
    c.setFont("Italiana", 112)
    c.setFillColor(COLOR_ORCHID)
    c.drawCentredString(540, 1265, "Reclaim Energy.")
    
    draw_fullscreen_glass_card(c, 60, 240, 960, 820, radius=40, stroke_color=COLOR_ORCHID, stroke_width=3.0, alpha=0.88)
    
    c.setFont("Outfit-Bold", 76)
    c.setFillColor(COLOR_ORCHID)
    c.drawCentredString(540, 920, "DHRUTHI WELLNESS")
    
    c.setFont("Outfit", 40)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawCentredString(540, 840, "Evidence-Based Customized Endocrinology & PCOS Nutrition")
    
    # Pulsing CTA Button
    c.setFillColor(COLOR_EMERALD)
    c.roundRect(140, 480, 800, 120, 60, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 46)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 520, "BOOK PCOS METABOLIC ASSESSMENT 🌸")
    c.restoreState()

def build_section_pdfs():
    print("Building Full-Screen PCOS Reel scene PDFs...")
    FPS = 25
    
    c1 = canvas.Canvas(TEMP_SECTIONS[1], pagesize=(1080, 1920))
    for f in range(int(9.0 * FPS) + 1):
        draw_scene_1(c1, f / float(FPS))
        c1.showPage()
    c1.save()
    
    c2 = canvas.Canvas(TEMP_SECTIONS[2], pagesize=(1080, 1920))
    for f in range(int(9.0 * FPS) + 1):
        draw_scene_2(c2, 8.0 + (f / float(FPS)))
        c2.showPage()
    c2.save()
    
    c3 = canvas.Canvas(TEMP_SECTIONS[3], pagesize=(1080, 1920))
    for f in range(int(9.0 * FPS) + 1):
        draw_scene_3(c3, 16.0 + (f / float(FPS)))
        c3.showPage()
    c3.save()
    
    c4 = canvas.Canvas(TEMP_SECTIONS[4], pagesize=(1080, 1920))
    for f in range(int(9.0 * FPS) + 1):
        draw_scene_4(c4, 24.0 + (f / float(FPS)))
        c4.showPage()
    c4.save()
    
    c5 = canvas.Canvas(TEMP_SECTIONS[5], pagesize=(1080, 1920))
    for f in range(int(9.0 * FPS) + 1):
        draw_scene_5(c5, 32.0 + (f / float(FPS)))
        c5.showPage()
    c5.save()

def compile_video():
    FPS = 25
    total_frames = 41 * FPS
    docs = {sc: pdfium.PdfDocument(p) for sc, p in TEMP_SECTIONS.items()}
    fourcc = cv2.VideoWriter_fourcc(*'avc1')
    video_writer = cv2.VideoWriter(OUTPUT_MP4, fourcc, 25.0, (1080, 1920))
    
    try:
        for f in range(total_frames):
            t = f / float(FPS)
            if 8.0 <= t <= 9.0:
                alpha = (t - 8.0) / 1.0
                img1 = get_pdf_page(docs[1], int(round(t * FPS)))
                img2 = get_pdf_page(docs[2], int(round((t - 8.0) * FPS)))
                img = Image.blend(img1, img2, alpha)
            elif 16.0 <= t <= 17.0:
                alpha = (t - 16.0) / 1.0
                img1 = get_pdf_page(docs[2], int(round((t - 8.0) * FPS)))
                img2 = get_pdf_page(docs[3], int(round((t - 16.0) * FPS)))
                img = Image.blend(img1, img2, alpha)
            elif 24.0 <= t <= 25.0:
                alpha = (t - 24.0) / 1.0
                img1 = get_pdf_page(docs[3], int(round((t - 16.0) * FPS)))
                img2 = get_pdf_page(docs[4], int(round((t - 24.0) * FPS)))
                img = Image.blend(img1, img2, alpha)
            elif 32.0 <= t <= 33.0:
                alpha = (t - 32.0) / 1.0
                img1 = get_pdf_page(docs[4], int(round((t - 24.0) * FPS)))
                img2 = get_pdf_page(docs[5], int(round((t - 32.0) * FPS)))
                img = Image.blend(img1, img2, alpha)
            elif t < 8.0:
                img = get_pdf_page(docs[1], int(round(t * FPS)))
            elif 9.0 < t < 16.0:
                img = get_pdf_page(docs[2], int(round((t - 8.0) * FPS)))
            elif 17.0 < t < 24.0:
                img = get_pdf_page(docs[3], int(round((t - 16.0) * FPS)))
            elif 25.0 < t < 32.0:
                img = get_pdf_page(docs[4], int(round((t - 24.0) * FPS)))
            else:
                img = get_pdf_page(docs[5], int(round((t - 32.0) * FPS)))
                
            frame_bgr = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
            video_writer.write(frame_bgr)
            if f % 100 == 0:
                print(f"Compiled frame {f}/{total_frames}...")
        print("PCOS Reel video compilation complete.")
    finally:
        for doc in docs.values():
            doc.close()
        video_writer.release()

def get_pdf_page(doc, index):
    index = max(0, min(index, len(doc) - 1))
    return doc[index].render(scale=1.0).to_pil()

def cleanup():
    for path in TEMP_SECTIONS.values():
        if os.path.exists(path):
            os.remove(path)

def copy_to_artifacts():
    shutil.copy(OUTPUT_MP4, ARTIFACT_MP4)
    print(f"Video saved to artifacts at {ARTIFACT_MP4}")

if __name__ == "__main__":
    register_fonts()
    build_section_pdfs()
    compile_video()
    copy_to_artifacts()
    cleanup()
    print("PCOS Photo Canvas Instagram Reel compilation successful!")
