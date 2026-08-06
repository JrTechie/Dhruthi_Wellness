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
ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\7f66912d-9634-498a-8da6-b0a04a0183c6"
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

TEMP_SECTIONS = {
    1: os.path.join(ARTIFACTS_DIR, "temp_fs_wl_scene_1.pdf"),
    2: os.path.join(ARTIFACTS_DIR, "temp_fs_wl_scene_2.pdf"),
    3: os.path.join(ARTIFACTS_DIR, "temp_fs_wl_scene_3.pdf"),
    4: os.path.join(ARTIFACTS_DIR, "temp_fs_wl_scene_4.pdf"),
    5: os.path.join(ARTIFACTS_DIR, "temp_fs_wl_scene_5.pdf")
}

OUTPUT_MP4 = os.path.join(WORKSPACE_DIR, "Reels finalised", "dhruthi_weight_loss_reel.mp4")
ARTIFACT_MP4 = os.path.join(ARTIFACTS_DIR, "dhruthi_weight_loss_reel.mp4")

# Full-Screen Modern Palette
COLOR_BG_DARK = colors.HexColor('#0A0F12')         # Deep Charcoal Dark Base
COLOR_NEON_MINT = colors.HexColor('#00FF9D')       # Vibrant Mint Green Glow
COLOR_NEON_CYAN = colors.HexColor('#00E5FF')       # Vibrant Cyber Cyan Glow
COLOR_FLAME = colors.HexColor('#FF5A36')           # Coral Flame Alert
COLOR_WHITE = colors.HexColor('#FFFFFF')           # Pure White
COLOR_SUBTEXT = colors.HexColor('#A0AEC0')         # Soft Muted Grey Text

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
    # Render 100% Full-Bleed 1080x1920 Background Image
    img_reader = crop_to_fill(img_path, 1080, 1920, t, max_t, 1.0, 1.08)
    c.drawImage(img_reader, 0, 0, width=1080, height=1920)
    
    # Subtle Dark Overlay Gradients for High Text Legibility
    c.saveState()
    # Top Shadow Gradient
    c.setFillColor(colors.Color(0.04, 0.06, 0.08, alpha=0.55))
    c.rect(0, 1400, 1080, 520, fill=True, stroke=False)
    # Bottom Shadow Gradient
    c.setFillColor(colors.Color(0.04, 0.06, 0.08, alpha=0.65))
    c.rect(0, 0, 1080, 900, fill=True, stroke=False)
    c.restoreState()

def draw_fullscreen_glass_card(c, x, y, w, h, radius=32, stroke_color=None, stroke_width=2.0, alpha=0.85):
    c.saveState()
    c.setFillColor(colors.Color(0.06, 0.09, 0.12, alpha=alpha))
    if stroke_color:
        c.setStrokeColor(stroke_color)
        c.setLineWidth(stroke_width)
    else:
        c.setStrokeColor(colors.Color(1.0, 1.0, 1.0, alpha=0.20))
        c.setLineWidth(2.0)
    c.roundRect(x, y, w, h, radius, fill=True, stroke=True)
    c.restoreState()

def draw_fullscreen_header(c, category="SPECIAL REPORT", issue="VOL 01"):
    c.saveState()
    # Dark glass badge top left
    c.setFillColor(colors.Color(0.06, 0.09, 0.12, alpha=0.88))
    c.setStrokeColor(COLOR_NEON_CYAN)
    c.setLineWidth(2.0)
    c.roundRect(60, 1820, 260, 48, 24, fill=True, stroke=True)
    
    c.setFillColor(COLOR_NEON_CYAN)
    c.circle(85, 1844, 4, fill=True, stroke=False)
    
    c.setFont("Outfit-Bold", 20)
    c.setFillColor(COLOR_NEON_CYAN)
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
    img_path = get_asset_image("scene1_weight_loss.png")
    draw_fullscreen_background(c, img_path, t, 6.0)
    draw_fullscreen_header(c, "SPECIAL REPORT", "VOL 01")
    
    # Floating Alert Badge Top
    c.saveState()
    c.setFillColor(colors.Color(0.8, 0.1, 0.1, alpha=0.88))
    c.setStrokeColor(COLOR_FLAME)
    c.setLineWidth(2.0)
    c.roundRect(60, 1680, 540, 56, 16, fill=True, stroke=True)
    c.setFont("Outfit-Bold", 24)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(330, 1696, "⚠️ METABOLIC PLATEAU DETECTED")
    c.restoreState()
    
    # Direct Typography Overlay
    c.saveState()
    c.setFont("Outfit-Bold", 36)
    c.setFillColor(COLOR_NEON_CYAN)
    c.drawCentredString(540, 720, "EATING CLEAN? WORKING OUT DAILY?")
    
    c.setFont("Italiana", 92)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 610, "Why Is The Scale")
    
    # Curved Glowing Pill Box for "STILL STUCK?"
    c.setFillColor(colors.Color(0.0, 1.0, 0.6, alpha=0.20))
    c.setStrokeColor(COLOR_NEON_MINT)
    c.setLineWidth(2.5)
    c.roundRect(260, 480, 560, 80, 20, fill=True, stroke=True)
    
    c.setFont("Italiana", 92)
    c.setFillColor(COLOR_NEON_MINT)
    c.drawCentredString(540, 495, "Still Stuck?")
    
    # Subtext Dark Glass Card
    draw_fullscreen_glass_card(c, 60, 240, 960, 180, radius=28, stroke_color=colors.Color(1.0, 1.0, 1.0, alpha=0.2), alpha=0.85)
    c.setFont("Outfit", 30)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawCentredString(540, 340, "Late-night cravings & plateaued fat loss aren't a lack of discipline.")
    c.drawCentredString(540, 290, "It is your body's survival mode.")
    c.restoreState()

# Scene 2: Full-Screen Dual Side-By-Side Comparison Glass Cards (5s to 11s)
def draw_scene_2(c, t):
    t_local = max(0.0, t - 5.0)
    img_path = get_asset_image("scene3_weight_loss.png")
    draw_fullscreen_background(c, img_path, t_local, 6.0)
    draw_fullscreen_header(c, "BIOLOGICAL MECHANISM", "VOL 02")
    
    c.saveState()
    c.setFont("Italiana", 84)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 1680, "The Calorie Deficit Myth")
    c.setFont("Outfit-Bold", 30)
    c.setFillColor(COLOR_NEON_CYAN)
    c.drawCentredString(540, 1610, "WHY EATING LESS DOESN'T ALWAYS EQUAL LOSING FAT")
    c.restoreState()
    
    # Left Card: WHAT YOU THINK (Flame Red Glass)
    c.saveState()
    draw_fullscreen_glass_card(c, 60, 440, 460, 1080, radius=36, stroke_color=COLOR_FLAME, stroke_width=3.0, alpha=0.88)
    
    c.setFillColor(colors.Color(1.0, 0.35, 0.2, alpha=0.25))
    c.setStrokeColor(COLOR_FLAME)
    c.setLineWidth(1.5)
    c.roundRect(90, 1440, 240, 44, 22, fill=True, stroke=True)
    c.setFont("Outfit-Bold", 22)
    c.setFillColor(COLOR_FLAME)
    c.drawCentredString(210, 1454, "WHAT YOU THINK")
    
    c.setFont("Outfit-Bold", 38)
    c.setFillColor(COLOR_WHITE)
    c.drawString(90, 1370, "Caloric Math")
    
    c.setFont("Outfit", 28)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(90, 1260, "• Cut calories sharply")
    c.drawString(90, 1180, "• Double workout stress")
    c.drawString(90, 1100, "• Expect automatic loss")
    
    c.setFillColor(colors.Color(1.0, 0.2, 0.2, alpha=0.30))
    c.roundRect(85, 480, 410, 80, 20, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 26)
    c.setFillColor(COLOR_FLAME)
    c.drawCentredString(290, 508, "❌ Triggers Alarm")
    c.restoreState()
    
    # Right Card: WHAT IS HAPPENING (Neon Mint Glass)
    c.saveState()
    draw_fullscreen_glass_card(c, 560, 440, 460, 1080, radius=36, stroke_color=COLOR_NEON_MINT, stroke_width=3.0, alpha=0.88)
    
    c.setFillColor(colors.Color(0.0, 1.0, 0.6, alpha=0.25))
    c.setStrokeColor(COLOR_NEON_MINT)
    c.setLineWidth(1.5)
    c.roundRect(590, 1440, 260, 44, 22, fill=True, stroke=True)
    c.setFont("Outfit-Bold", 22)
    c.setFillColor(COLOR_NEON_MINT)
    c.drawCentredString(720, 1454, "WHAT IS HAPPENING")
    
    c.setFont("Outfit-Bold", 38)
    c.setFillColor(COLOR_NEON_MINT)
    c.drawString(590, 1370, "Hormonal Defense")
    
    c.setFont("Outfit", 28)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(590, 1260, "• Cortisol spikes +35%")
    c.drawString(590, 1180, "• Leptin drops (cravings)")
    c.drawString(590, 1100, "• BMR slows to conserve")
    
    c.setFillColor(colors.Color(0.0, 1.0, 0.6, alpha=0.30))
    c.roundRect(585, 480, 410, 80, 20, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 26)
    c.setFillColor(COLOR_NEON_MINT)
    c.drawCentredString(790, 508, "✓ Survival Locked")
    c.restoreState()
    
    # Bottom Callout
    c.saveState()
    c.setFont("Outfit-Bold", 36)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 300, "Your body is protecting energy, not burning it.")
    c.restoreState()

# Scene 3: Full-Screen Clinical Diagnostics & Metric Cards (10s to 17s)
def draw_scene_3(c, t):
    t_local = max(0.0, t - 10.0)
    img_path = get_asset_image("scene3_weight_loss.png")
    draw_fullscreen_background(c, img_path, t_local, 7.0)
    draw_fullscreen_header(c, "CLINICAL DIAGNOSTICS", "VOL 03")
    
    c.saveState()
    c.setFont("Italiana", 84)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 1680, "Measure Biological Friction")
    c.setFont("Outfit-Bold", 30)
    c.setFillColor(COLOR_NEON_CYAN)
    c.drawCentredString(540, 1610, "IDENTIFY THE HIDDEN METABOLIC BRAKES")
    c.restoreState()
    
    # 3 Stat Cards Grid
    gauge_progress = min(1.0, t_local / 3.0)
    
    draw_fullscreen_stat_card(c, 100, 750, 270, 720, f"+{int(35 * gauge_progress)}%", "Cortisol Spike", "Fat Storage Locked", COLOR_FLAME)
    draw_fullscreen_stat_card(c, 405, 750, 270, 720, f"-{int(50 * gauge_progress)}%", "Leptin Drop", "Appetite Surge", COLOR_NEON_MINT)
    draw_fullscreen_stat_card(c, 710, 750, 270, 720, f"-{int(25 * gauge_progress)}%", "BMR Slowdown", "Energy Preserved", COLOR_NEON_CYAN)

def draw_fullscreen_stat_card(c, x, y, w, h, metric_str, title, subtitle, accent_color):
    c.saveState()
    draw_fullscreen_glass_card(c, x, y, w, h, radius=32, stroke_color=accent_color, stroke_width=2.5, alpha=0.88)
    
    c.setFillColor(accent_color)
    c.roundRect(x + 20, y + h - 220, w - 40, 170, 24, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 54)
    c.setFillColor(COLOR_BG_DARK)
    c.drawCentredString(x + w/2.0, y + h - 130, metric_str)
    
    c.setFont("Outfit-Bold", 28)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(x + w/2.0, y + 260, title)
    
    c.setFont("Outfit", 24)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawCentredString(x + w/2.0, y + 180, subtitle)
    c.restoreState()

# Scene 4: Full-Screen Solution Framework Glass Pill Cards (16s to 23s)
def draw_scene_4(c, t):
    t_local = max(0.0, t - 16.0)
    img_path = get_asset_image("scene4_weight_loss.png")
    draw_fullscreen_background(c, img_path, t_local, 7.0)
    draw_fullscreen_header(c, "SOLUTION PROTOCOL", "VOL 04")
    
    c.saveState()
    c.setFont("Outfit-Bold", 28)
    c.setFillColor(COLOR_NEON_CYAN)
    c.drawCentredString(540, 1720, "THE DHRUTHI WELLNESS FRAMEWORK")
    
    c.setFont("Italiana", 84)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 1630, "Fix The Foundation First")
    c.restoreState()
    
    # 3 Stacked Horizontal Dark Glass Pill Cards
    draw_fullscreen_protocol_pill(c, 60, 1180, 960, 260, "01", "Full Biomarker & Gut Panel", "Identify thyroid slowing, insulin resistance & gut inflammation.", COLOR_NEON_MINT)
    draw_fullscreen_protocol_pill(c, 60, 860, 960, 260, "02", "Circadian Rhythm & Stress Sync", "Restore deep sleep cycles to drop cortisol & restart fat oxidation.", COLOR_NEON_CYAN)
    draw_fullscreen_protocol_pill(c, 60, 540, 960, 260, "03", "Precision Metabolic Fuel", "Tailored micro & macro nutrient ratios. Nourish instead of starve.", COLOR_NEON_MINT)

def draw_fullscreen_protocol_pill(c, x, y, w, h, num, title, desc, accent_color):
    c.saveState()
    draw_fullscreen_glass_card(c, x, y, w, h, radius=36, stroke_color=accent_color, stroke_width=2.5, alpha=0.88)
    
    c.setFillColor(accent_color)
    c.roundRect(x + 35, y + 45, 120, 170, 24, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 48)
    c.setFillColor(COLOR_BG_DARK)
    c.drawCentredString(x + 95, y + 105, num)
    
    c.setFont("Outfit-Bold", 34)
    c.setFillColor(COLOR_WHITE)
    c.drawString(x + 190, y + 155, title)
    
    c.setFont("Outfit", 26)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(x + 190, y + 85, desc)
    c.restoreState()

# Scene 5: Full-Screen Grand Outro & CTA (22s to 28s)
def draw_scene_5(c, t):
    t_local = max(0.0, t - 22.0)
    img_path = get_asset_image("scene5_weight_loss.png")
    draw_fullscreen_background(c, img_path, t_local, 6.0)
    draw_fullscreen_header(c, "EVIDENCE-BASED CARE", "FINAL")
    
    c.saveState()
    c.setFont("Italiana", 92)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 1380, "Stop Guessing.")
    
    c.setFillColor(colors.Color(0.0, 1.0, 0.6, alpha=0.20))
    c.setStrokeColor(COLOR_NEON_MINT)
    c.setLineWidth(2.5)
    c.roundRect(260, 1250, 560, 80, 20, fill=True, stroke=True)
    c.setFont("Italiana", 92)
    c.setFillColor(COLOR_NEON_MINT)
    c.drawCentredString(540, 1265, "Start Healing.")
    
    draw_fullscreen_glass_card(c, 60, 240, 960, 820, radius=40, stroke_color=COLOR_NEON_CYAN, stroke_width=3.0, alpha=0.88)
    
    c.setFont("Outfit-Bold", 58)
    c.setFillColor(COLOR_NEON_CYAN)
    c.drawCentredString(540, 920, "DHRUTHI WELLNESS")
    
    c.setFont("Outfit", 34)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawCentredString(540, 840, "Evidence-Based Functional Nutrition & Metabolism")
    
    # Pulsing CTA Button
    c.setFillColor(COLOR_NEON_MINT)
    c.roundRect(140, 480, 800, 120, 60, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 38)
    c.setFillColor(COLOR_BG_DARK)
    c.drawCentredString(540, 520, "BOOK METABOLISM ASSESSMENT 🚀")
    c.restoreState()

def build_section_pdfs():
    print("Building Full-Screen Weight Loss Reel scene PDFs...")
    FPS = 25
    
    c1 = canvas.Canvas(TEMP_SECTIONS[1], pagesize=(1080, 1920))
    for f in range(int(6.0 * FPS) + 1):
        draw_scene_1(c1, f / float(FPS))
        c1.showPage()
    c1.save()
    
    c2 = canvas.Canvas(TEMP_SECTIONS[2], pagesize=(1080, 1920))
    for f in range(int(6.0 * FPS) + 1):
        draw_scene_2(c2, 5.0 + (f / float(FPS)))
        c2.showPage()
    c2.save()
    
    c3 = canvas.Canvas(TEMP_SECTIONS[3], pagesize=(1080, 1920))
    for f in range(int(7.0 * FPS) + 1):
        draw_scene_3(c3, 10.0 + (f / float(FPS)))
        c3.showPage()
    c3.save()
    
    c4 = canvas.Canvas(TEMP_SECTIONS[4], pagesize=(1080, 1920))
    for f in range(int(7.0 * FPS) + 1):
        draw_scene_4(c4, 16.0 + (f / float(FPS)))
        c4.showPage()
    c4.save()
    
    c5 = canvas.Canvas(TEMP_SECTIONS[5], pagesize=(1080, 1920))
    for f in range(int(6.0 * FPS) + 1):
        draw_scene_5(c5, 22.0 + (f / float(FPS)))
        c5.showPage()
    c5.save()

def compile_video():
    FPS = 25
    total_frames = 28 * FPS
    docs = {sc: pdfium.PdfDocument(p) for sc, p in TEMP_SECTIONS.items()}
    fourcc = cv2.VideoWriter_fourcc(*'avc1')
    video_writer = cv2.VideoWriter(OUTPUT_MP4, fourcc, 25.0, (1080, 1920))
    
    try:
        for f in range(total_frames):
            t = f / float(FPS)
            if 5.0 <= t <= 6.0:
                alpha = (t - 5.0) / 1.0
                img1 = get_pdf_page(docs[1], int(round(t * FPS)))
                img2 = get_pdf_page(docs[2], int(round((t - 5.0) * FPS)))
                img = Image.blend(img1, img2, alpha)
            elif 10.0 <= t <= 11.0:
                alpha = (t - 10.0) / 1.0
                img1 = get_pdf_page(docs[2], int(round((t - 5.0) * FPS)))
                img2 = get_pdf_page(docs[3], int(round((t - 10.0) * FPS)))
                img = Image.blend(img1, img2, alpha)
            elif 16.0 <= t <= 17.0:
                alpha = (t - 16.0) / 1.0
                img1 = get_pdf_page(docs[3], int(round((t - 10.0) * FPS)))
                img2 = get_pdf_page(docs[4], int(round((t - 16.0) * FPS)))
                img = Image.blend(img1, img2, alpha)
            elif 22.0 <= t <= 23.0:
                alpha = (t - 22.0) / 1.0
                img1 = get_pdf_page(docs[4], int(round((t - 16.0) * FPS)))
                img2 = get_pdf_page(docs[5], int(round((t - 22.0) * FPS)))
                img = Image.blend(img1, img2, alpha)
            elif t < 5.0:
                img = get_pdf_page(docs[1], int(round(t * FPS)))
            elif 6.0 < t < 10.0:
                img = get_pdf_page(docs[2], int(round((t - 5.0) * FPS)))
            elif 11.0 < t < 16.0:
                img = get_pdf_page(docs[3], int(round((t - 10.0) * FPS)))
            elif 17.0 < t < 22.0:
                img = get_pdf_page(docs[4], int(round((t - 16.0) * FPS)))
            else:
                img = get_pdf_page(docs[5], int(round((t - 22.0) * FPS)))
                
            frame_bgr = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
            video_writer.write(frame_bgr)
            if f % 100 == 0:
                print(f"Compiled frame {f}/{total_frames}...")
        print("Full-Screen Reel video compilation complete.")
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
    print("Full-Screen Photo Canvas Instagram Reel compilation successful!")
