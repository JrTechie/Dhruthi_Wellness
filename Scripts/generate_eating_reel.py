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

ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\848d4a9e-c565-494d-baae-9595b6d8d9f6"
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

TEMP_SECTIONS = {
    1: os.path.join(ARTIFACTS_DIR, "temp_eating_scene_1.pdf"),
    2: os.path.join(ARTIFACTS_DIR, "temp_eating_scene_2.pdf"),
    3: os.path.join(ARTIFACTS_DIR, "temp_eating_scene_3.pdf"),
    4: os.path.join(ARTIFACTS_DIR, "temp_eating_scene_4.pdf"),
    5: os.path.join(ARTIFACTS_DIR, "temp_eating_scene_5.pdf")
}

OUTPUT_MP4 = os.path.join(WORKSPACE_DIR, "Reels finalised", "eating_reel.mp4")
ARTIFACT_MP4 = os.path.join(ARTIFACTS_DIR, "eating_reel.mp4")

# Ultra-Modern Dark Warm Palette for Mindful Eating
COLOR_BG_DARK = colors.HexColor('#181410')         # Deep Charcoal Obsidian
COLOR_AMBER = colors.HexColor('#D96B43')           # Burnt Terracotta / Ember Accent
COLOR_SAGE = colors.HexColor('#7A9A8B')            # Calming Sage Green Accent
COLOR_WHITE = colors.HexColor('#FFFFFF')           # Pure White
COLOR_SUBTEXT = colors.HexColor('#E0DDD6')         # Soft Muted Cream Text
COLOR_FLAME = colors.HexColor('#FF5A36')           # Coral Glow Alert

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

def crop_and_zoom_image(img_path, t, max_t, zoom_start=1.0, zoom_end=1.12):
    t = max(0.0, min(t, max_t))
    img = Image.open(img_path)
    w, h = img.size
    
    progress = t / max_t
    zoom = zoom_start + (zoom_end - zoom_start) * progress
    
    base_w = int(h * 16.0 / 9.0)
    base_h = h
    
    crop_w = int(base_w / zoom)
    crop_h = int(base_h / zoom)
    
    left = max(0, min(int((w - crop_w) / 2), w - crop_w))
    top = max(0, min(int((h - crop_h) / 2), h - crop_h))
    
    cropped = img.crop((left, top, left + crop_w, top + crop_h))
    temp_path = os.path.join(ARTIFACTS_DIR, "temp_eating_zoom.png")
    cropped.save(temp_path, "PNG")
    return temp_path

def draw_dark_bg(c):
    c.setFillColor(COLOR_BG_DARK)
    c.rect(0, 0, 1080, 1920, fill=True, stroke=False)
    # Ambient glowing gradient circle at top-right & bottom-left
    c.saveState()
    c.setFillColor(colors.Color(0.85, 0.42, 0.26, alpha=0.08))
    c.circle(900, 1600, 450, fill=True, stroke=False)
    c.setFillColor(colors.Color(0.47, 0.60, 0.54, alpha=0.06))
    c.circle(150, 400, 400, fill=True, stroke=False)
    c.restoreState()

def draw_dark_glass_card(c, x, y, w, h, radius=32, stroke_color=None, stroke_width=2.0, alpha=0.82):
    c.saveState()
    c.setFillColor(colors.Color(0.09, 0.08, 0.06, alpha=alpha))
    if stroke_color:
        c.setStrokeColor(stroke_color)
        c.setLineWidth(stroke_width)
    else:
        c.setStrokeColor(colors.Color(1.0, 1.0, 1.0, alpha=0.18))
        c.setLineWidth(2.0)
    c.roundRect(x, y, w, h, radius, fill=True, stroke=True)
    c.restoreState()

def draw_glass_header(c, category="MINDFUL EATING", issue="VOL 01"):
    c.saveState()
    c.setFillColor(colors.Color(0.09, 0.08, 0.06, alpha=0.9))
    c.setStrokeColor(COLOR_AMBER)
    c.setLineWidth(2.0)
    c.roundRect(60, 1820, 260, 48, 24, fill=True, stroke=True)
    
    c.setFillColor(COLOR_AMBER)
    c.circle(85, 1844, 4, fill=True, stroke=False)
    
    c.setFont("Outfit-Bold", 20)
    c.setFillColor(COLOR_AMBER)
    c.drawString(100, 1836, category)
    
    c.setFont("Outfit", 20)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(340, 1836, issue)
    
    c.setFont("Outfit-Bold", 24)
    c.setFillColor(COLOR_WHITE)
    c.drawRightString(1020, 1834, "@dhruthi_wellness")
    
    c.setStrokeColor(colors.Color(1.0, 1.0, 1.0, alpha=0.12))
    c.setLineWidth(1.5)
    c.line(60, 1800, 1020, 1800)
    c.restoreState()

# Scene 1: Mindless Eating Hook (0s to 8s)
def draw_scene_1(c, t):
    draw_dark_bg(c)
    draw_glass_header(c, "MINDFUL EATING", "VOL 01")
    
    img_path = get_asset_image("eating_scene1_mindless.png")
    zoomed = crop_and_zoom_image(img_path, t, 8.0, 1.0, 1.15)
    
    c.saveState()
    draw_dark_glass_card(c, 60, 840, 960, 920, radius=44, stroke_color=COLOR_AMBER, stroke_width=3.0)
    c.drawImage(zoomed, 64, 844, width=952, height=912)
    c.restoreState()
    
    c.saveState()
    c.setFont("Outfit-Bold", 34)
    c.setFillColor(COLOR_AMBER)
    c.drawCentredString(540, 720, "EATING WHEN NOT HUNGRY?")
    
    c.setFont("Italiana", 100)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 610, "Eating...")
    
    c.setFillColor(colors.Color(0.85, 0.42, 0.26, alpha=0.18))
    c.setStrokeColor(COLOR_AMBER)
    c.setLineWidth(2.0)
    c.roundRect(140, 480, 800, 75, 16, fill=True, stroke=True)
    
    c.setFont("Italiana", 76)
    c.setFillColor(COLOR_AMBER)
    c.drawCentredString(540, 495, "Or Emotionally Stressed?")
    
    c.setFont("Outfit", 32)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawCentredString(540, 360, "Mindless eating is rarely a lack of self-control.")
    c.drawCentredString(540, 310, "It is your brain seeking dopamine & comfort.")
    c.restoreState()

# Scene 2: Biological Mechanism (7s to 15s)
def draw_scene_2(c, t):
    t_local = max(0.0, t - 7.0)
    draw_dark_bg(c)
    draw_glass_header(c, "BIOLOGICAL MECHANISM", "VOL 02")
    
    c.saveState()
    c.setFont("Italiana", 84)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 1680, "Hunger & Dopamine")
    c.setFont("Outfit-Bold", 30)
    c.setFillColor(COLOR_AMBER)
    c.drawCentredString(540, 1610, "WHY EMOTIONAL STRESS SPIKES SUGAR CRAVINGS")
    c.restoreState()
    
    # Left Card: GUILT & WILLPOWER
    c.saveState()
    draw_dark_glass_card(c, 60, 480, 460, 1040, radius=36, stroke_color=COLOR_FLAME, stroke_width=3.0)
    
    c.setFillColor(colors.Color(1.0, 0.35, 0.2, alpha=0.2))
    c.setStrokeColor(COLOR_FLAME)
    c.setLineWidth(1.5)
    c.roundRect(90, 1440, 240, 44, 22, fill=True, stroke=True)
    c.setFont("Outfit-Bold", 22)
    c.setFillColor(COLOR_FLAME)
    c.drawCentredString(210, 1454, "WHAT YOU THINK")
    
    c.setFont("Outfit-Bold", 38)
    c.setFillColor(COLOR_WHITE)
    c.drawString(90, 1370, "Self-Guilt Cycle")
    
    c.setFont("Outfit", 28)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(90, 1260, "• Blaming weakness")
    c.drawString(90, 1180, "• Fighting sugar urges")
    c.drawString(90, 1100, "• Restricting food after")
    
    c.setFillColor(colors.Color(1.0, 0.2, 0.2, alpha=0.25))
    c.roundRect(85, 520, 410, 80, 20, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 26)
    c.setFillColor(COLOR_FLAME)
    c.drawCentredString(290, 548, "❌ Ignores Chemistry")
    c.restoreState()
    
    # Right Card: BRAIN CHEMISTRY
    c.saveState()
    draw_dark_glass_card(c, 560, 480, 460, 1040, radius=36, stroke_color=COLOR_SAGE, stroke_width=3.0)
    
    c.setFillColor(colors.Color(0.47, 0.60, 0.54, alpha=0.2))
    c.setStrokeColor(COLOR_SAGE)
    c.setLineWidth(1.5)
    c.roundRect(590, 1440, 260, 44, 22, fill=True, stroke=True)
    c.setFont("Outfit-Bold", 22)
    c.setFillColor(COLOR_SAGE)
    c.drawCentredString(720, 1454, "WHAT IS HAPPENING")
    
    c.setFont("Outfit-Bold", 38)
    c.setFillColor(COLOR_SAGE)
    c.drawString(590, 1370, "Dopamine Shift")
    
    c.setFont("Outfit", 28)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(590, 1260, "• Dopamine Drops")
    c.drawString(590, 1180, "• Brain Signals Fast Carbs")
    c.drawString(590, 1100, "• Blood Sugar Crash")
    
    c.setFillColor(colors.Color(0.47, 0.60, 0.54, alpha=0.25))
    c.roundRect(585, 520, 410, 80, 20, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 26)
    c.setFillColor(COLOR_SAGE)
    c.drawCentredString(790, 548, "✓ Chemically Driven")
    c.restoreState()
    
    c.saveState()
    c.setFont("Outfit-Bold", 36)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 320, "Your brain is chemically seeking fast comfort, not calories.")
    c.restoreState()

# Scene 3: The Vicious Eating Cycle (14s to 22s)
def draw_scene_3(c, t):
    t_local = max(0.0, t - 14.0)
    draw_dark_bg(c)
    draw_glass_header(c, "THE EATING CASCADE", "VOL 03")
    
    img_path = get_asset_image("eating_scene3_cycle.png")
    zoomed = crop_and_zoom_image(img_path, t_local, 8.0, 1.0, 1.1)
    c.saveState()
    draw_dark_glass_card(c, 60, 1140, 960, 640, radius=36, stroke_color=COLOR_AMBER, stroke_width=2.5)
    c.drawImage(zoomed, 64, 1144, width=952, height=632)
    c.restoreState()
    
    c.saveState()
    c.setFont("Italiana", 78)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 1020, "The Vicious Eating Cycle")
    c.restoreState()
    
    draw_dark_step_box(c, 60, 720, 960, 110, "01", "Emotional Stress / Trigger", COLOR_AMBER)
    draw_dark_step_box(c, 60, 560, 960, 110, "02", "Rapid Sugar & Carb Spike", COLOR_SAGE)
    draw_dark_step_box(c, 60, 400, 960, 110, "03", "Energy Crash & Cravings", COLOR_AMBER)
    
    c.saveState()
    c.setFont("Outfit-Bold", 34)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 290, "Break the cycle by soothing your nervous system first.")
    c.restoreState()

def draw_dark_step_box(c, x, y, w, h, step, title, color):
    c.saveState()
    draw_dark_glass_card(c, x, y, w, h, radius=24, stroke_color=color, stroke_width=2.0)
    
    c.setFillColor(color)
    c.roundRect(x + 25, y + 20, 70, 70, 16, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 32)
    c.setFillColor(COLOR_BG_DARK)
    c.drawCentredString(x + 60, y + 42, step)
    
    c.setFont("Outfit-Bold", 32)
    c.setFillColor(COLOR_WHITE)
    c.drawString(x + 120, y + 42, title)
    c.restoreState()

# Scene 4: Mindful Eating Habits (21s to 29s)
def draw_scene_4(c, t):
    t_local = max(0.0, t - 21.0)
    draw_dark_bg(c)
    draw_glass_header(c, "SOLUTION PROTOCOL", "VOL 04")
    
    c.saveState()
    c.setFont("Outfit-Bold", 28)
    c.setFillColor(COLOR_AMBER)
    c.drawCentredString(540, 1720, "THE DHRUTHI WELLNESS MINDFUL RESET")
    
    c.setFont("Italiana", 84)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 1630, "3 Mindful Eating Habits")
    c.restoreState()
    
    draw_dark_protocol_card(c, 60, 1340, 960, 220, "01", "Pause & Identify Hunger Type", "Recognize emotional vs physical hunger cues.", COLOR_SAGE)
    draw_dark_protocol_card(c, 60, 1080, 960, 220, "02", "Protein & Fiber Anchors", "Stabilizes blood sugar and prevents sudden cravings.", COLOR_AMBER)
    draw_dark_protocol_card(c, 60, 820, 960, 220, "03", "Mindful Presence & Chewing", "Allows leptin signals to reach your brain naturally.", COLOR_SAGE)
    
    img_path = get_asset_image("eating_scene4_mindful_meal.png")
    zoomed = crop_and_zoom_image(img_path, t_local, 8.0, 1.0, 1.1)
    c.saveState()
    draw_dark_glass_card(c, 60, 260, 960, 500, radius=32, stroke_color=COLOR_AMBER, stroke_width=2.5)
    c.drawImage(zoomed, 64, 264, width=952, height=492)
    c.restoreState()

def draw_dark_protocol_card(c, x, y, w, h, num, title, desc, num_color):
    c.saveState()
    draw_dark_glass_card(c, x, y, w, h, radius=32, stroke_color=num_color, stroke_width=2.0)
    
    c.setFillColor(num_color)
    c.roundRect(x + 30, y + 40, 110, 140, 22, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 44)
    c.setFillColor(COLOR_BG_DARK)
    c.drawCentredString(x + 85, y + 85, num)
    
    c.setFont("Outfit-Bold", 32)
    c.setFillColor(COLOR_WHITE)
    c.drawString(x + 170, y + 130, title)
    
    c.setFont("Outfit", 26)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(x + 170, y + 70, desc)
    c.restoreState()

# Scene 5: Outro & CTA (28s to 35s)
def draw_scene_5(c, t):
    t_local = max(0.0, t - 28.0)
    draw_dark_bg(c)
    draw_glass_header(c, "EVIDENCE-BASED CARE", "FINAL")
    
    img_path = get_asset_image("eating_scene5_wellness.png")
    zoomed = crop_and_zoom_image(img_path, t_local, 7.0, 1.0, 1.1)
    c.saveState()
    draw_dark_glass_card(c, 60, 940, 960, 840, radius=44, stroke_color=COLOR_AMBER, stroke_width=3.0)
    c.drawImage(zoomed, 64, 944, width=952, height=832)
    c.restoreState()
    
    c.saveState()
    c.setFont("Italiana", 92)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 780, "Eat Mindfully.")
    
    c.setFillColor(colors.Color(0.85, 0.42, 0.26, alpha=0.18))
    c.setStrokeColor(COLOR_AMBER)
    c.setLineWidth(2.0)
    c.roundRect(260, 650, 560, 75, 16, fill=True, stroke=True)
    c.setFont("Italiana", 92)
    c.setFillColor(COLOR_AMBER)
    c.drawCentredString(540, 665, "Nourish Deeply.")
    
    c.setFont("Outfit-Bold", 56)
    c.setFillColor(COLOR_AMBER)
    c.drawCentredString(540, 520, "DHRUTHI WELLNESS")
    
    c.setFont("Outfit", 32)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawCentredString(540, 450, "Personalized Nutrition & Metabolism Consultations")
    
    c.setFillColor(COLOR_AMBER)
    c.roundRect(140, 260, 800, 110, 55, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 36)
    c.setFillColor(COLOR_BG_DARK)
    c.drawCentredString(540, 298, "BOOK NUTRITION ASSESSMENT")
    c.restoreState()

def build_section_pdfs():
    print("Building Dark Glassmorphism Mindful Eating scene PDFs...")
    FPS = 25
    
    c1 = canvas.Canvas(TEMP_SECTIONS[1], pagesize=(1080, 1920))
    for f in range(int(8.0 * FPS) + 1):
        draw_scene_1(c1, f / float(FPS))
        c1.showPage()
    c1.save()
    
    c2 = canvas.Canvas(TEMP_SECTIONS[2], pagesize=(1080, 1920))
    for f in range(int(8.0 * FPS) + 1):
        draw_scene_2(c2, 7.0 + (f / float(FPS)))
        c2.showPage()
    c2.save()
    
    c3 = canvas.Canvas(TEMP_SECTIONS[3], pagesize=(1080, 1920))
    for f in range(int(8.0 * FPS) + 1):
        draw_scene_3(c3, 14.0 + (f / float(FPS)))
        c3.showPage()
    c3.save()
    
    c4 = canvas.Canvas(TEMP_SECTIONS[4], pagesize=(1080, 1920))
    for f in range(int(8.0 * FPS) + 1):
        draw_scene_4(c4, 21.0 + (f / float(FPS)))
        c4.showPage()
    c4.save()
    
    c5 = canvas.Canvas(TEMP_SECTIONS[5], pagesize=(1080, 1920))
    for f in range(int(7.0 * FPS) + 1):
        draw_scene_5(c5, 28.0 + (f / float(FPS)))
        c5.showPage()
    c5.save()

def compile_video():
    FPS = 25
    total_frames = 35 * FPS
    docs = {sc: pdfium.PdfDocument(p) for sc, p in TEMP_SECTIONS.items()}
    fourcc = cv2.VideoWriter_fourcc(*'avc1')
    video_writer = cv2.VideoWriter(OUTPUT_MP4, fourcc, 25.0, (1080, 1920))
    
    try:
        for f in range(total_frames):
            t = f / float(FPS)
            if 7.0 <= t <= 8.0:
                alpha = (t - 7.0) / 1.0
                img1 = get_pdf_page(docs[1], int(round(t * FPS)))
                img2 = get_pdf_page(docs[2], int(round((t - 7.0) * FPS)))
                img = Image.blend(img1, img2, alpha)
            elif 14.0 <= t <= 15.0:
                alpha = (t - 14.0) / 1.0
                img1 = get_pdf_page(docs[2], int(round((t - 7.0) * FPS)))
                img2 = get_pdf_page(docs[3], int(round((t - 14.0) * FPS)))
                img = Image.blend(img1, img2, alpha)
            elif 21.0 <= t <= 22.0:
                alpha = (t - 21.0) / 1.0
                img1 = get_pdf_page(docs[3], int(round((t - 14.0) * FPS)))
                img2 = get_pdf_page(docs[4], int(round((t - 21.0) * FPS)))
                img = Image.blend(img1, img2, alpha)
            elif 28.0 <= t <= 29.0:
                alpha = (t - 28.0) / 1.0
                img1 = get_pdf_page(docs[4], int(round((t - 21.0) * FPS)))
                img2 = get_pdf_page(docs[5], int(round((t - 28.0) * FPS)))
                img = Image.blend(img1, img2, alpha)
            elif t < 7.0:
                img = get_pdf_page(docs[1], int(round(t * FPS)))
            elif 8.0 < t < 14.0:
                img = get_pdf_page(docs[2], int(round((t - 7.0) * FPS)))
            elif 15.0 < t < 21.0:
                img = get_pdf_page(docs[3], int(round((t - 14.0) * FPS)))
            elif 22.0 < t < 28.0:
                img = get_pdf_page(docs[4], int(round((t - 21.0) * FPS)))
            else:
                img = get_pdf_page(docs[5], int(round((t - 28.0) * FPS)))
                
            frame_bgr = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
            video_writer.write(frame_bgr)
            if f % 100 == 0:
                print(f"Compiled frame {f}/{total_frames}...")
        print("Mindful Eating Reel video compilation complete.")
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
    temp_crop = os.path.join(ARTIFACTS_DIR, "temp_eating_zoom.png")
    if os.path.exists(temp_crop):
        os.remove(temp_crop)

def copy_to_artifacts():
    shutil.copy(OUTPUT_MP4, ARTIFACT_MP4)
    print(f"Video saved to artifacts at {ARTIFACT_MP4}")

if __name__ == "__main__":
    register_fonts()
    build_section_pdfs()
    compile_video()
    copy_to_artifacts()
    cleanup()
    print("Mindful Eating Reel compilation successful!")
