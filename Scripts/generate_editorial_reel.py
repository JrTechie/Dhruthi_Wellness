import os
import sys
import math
import shutil
import cv2
import numpy as np
from PIL import Image
import pypdfium2 as pdfium

from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

WORKSPACE_DIR = r"l:\Developer\nutriflow"
ASSETS_DIR = os.path.join(WORKSPACE_DIR, "assets")
FONT_DIR = os.path.join(WORKSPACE_DIR, r".agents\skills\canvas-design\canvas-fonts")

ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\4f7f6e9a-7637-486e-ad7f-dbbece398d1f"
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

TEMP_SECTIONS = {
    1: os.path.join(ARTIFACTS_DIR, "temp_ed_scene_1.pdf"),
    2: os.path.join(ARTIFACTS_DIR, "temp_ed_scene_2.pdf"),
    3: os.path.join(ARTIFACTS_DIR, "temp_ed_scene_3.pdf"),
    4: os.path.join(ARTIFACTS_DIR, "temp_ed_scene_4.pdf"),
    5: os.path.join(ARTIFACTS_DIR, "temp_ed_scene_5.pdf")
}

OUTPUT_MP4 = os.path.join(WORKSPACE_DIR, "Reels finalised", "dhruthi_wellness_reel.mp4")
ARTIFACT_MP4 = os.path.join(ARTIFACTS_DIR, "dhruthi_wellness_reel.mp4")

# Editorial Luxury Palette
COLOR_PEARL = colors.HexColor('#FDFCF9')
COLOR_CREAM = colors.HexColor('#F5F2EA')
COLOR_EMERALD = colors.HexColor('#2D4F3E')
COLOR_EMERALD_LIGHT = colors.HexColor('#E2EEE7')
COLOR_CORAL = colors.HexColor('#E77F67')
COLOR_CORAL_LIGHT = colors.HexColor('#FCEBE6')
COLOR_OBSIDIAN = colors.HexColor('#121916')

def register_fonts():
    try:
        pdfmetrics.registerFont(TTFont('Italiana', os.path.join(FONT_DIR, 'Italiana-Regular.ttf')))
        pdfmetrics.registerFont(TTFont('Outfit', os.path.join(FONT_DIR, 'Outfit-Regular.ttf')))
        pdfmetrics.registerFont(TTFont('Outfit-Bold', os.path.join(FONT_DIR, 'Outfit-Bold.ttf')))
    except Exception as e:
        print(f"Font error: {e}")

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
    temp_path = os.path.join(ARTIFACTS_DIR, "temp_ed_zoom.png")
    cropped.save(temp_path, "PNG")
    return temp_path

def draw_editorial_header(c, category="SPECIAL REPORT", issue="VOL 01"):
    c.saveState()
    c.setFillColor(COLOR_EMERALD)
    c.roundRect(60, 1820, 240, 48, 24, fill=True, stroke=False)
    
    c.setFont("Outfit-Bold", 20)
    c.setFillColor(colors.white)
    c.drawCentredString(180, 1836, category)
    
    c.setFont("Outfit", 20)
    c.setFillColor(COLOR_EMERALD)
    c.drawString(320, 1836, issue)
    
    c.setFont("Outfit-Bold", 24)
    c.setFillColor(COLOR_OBSIDIAN)
    c.drawRightString(1020, 1834, "@dhruthi_wellness")
    
    c.setStrokeColor(colors.Color(0,0,0,alpha=0.15))
    c.setLineWidth(1.5)
    c.line(60, 1800, 1020, 1800)
    c.restoreState()

# Scene 1: Magazine Editorial Hook (0s to 6s)
def draw_scene_1(c, t):
    c.setFillColor(COLOR_PEARL)
    c.rect(0, 0, 1080, 1920, fill=True, stroke=False)
    draw_editorial_header(c, "SPECIAL REPORT", "VOL 01")
    
    # Top 55% Photo Frame (Pill shape container)
    img_path = get_asset_image("scene1_weight_loss.png")
    zoomed = crop_and_zoom_image(img_path, t, 6.0, 1.0, 1.12)
    
    c.saveState()
    c.setStrokeColor(COLOR_EMERALD)
    c.setLineWidth(6.0)
    c.roundRect(60, 840, 960, 920, 44, fill=False, stroke=True)
    c.drawImage(zoomed, 64, 844, width=952, height=912)
    c.restoreState()
    
    # Bottom 45% Text Section
    c.saveState()
    c.setFont("Outfit-Bold", 34)
    c.setFillColor(COLOR_CORAL)
    c.drawCentredString(540, 720, "DOING EVERYTHING RIGHT?")
    
    c.setFont("Italiana", 92)
    c.setFillColor(COLOR_OBSIDIAN)
    c.drawCentredString(540, 610, "Why Is The Scale")
    
    # Marker Highlight background for "STILL STUCK?"
    c.setFillColor(COLOR_CORAL_LIGHT)
    c.roundRect(280, 480, 520, 75, 12, fill=True, stroke=False)
    
    c.setFont("Italiana", 92)
    c.setFillColor(COLOR_CORAL)
    c.drawCentredString(540, 495, "Still Stuck?")
    
    c.setFont("Outfit", 34)
    c.setFillColor(colors.HexColor('#555555'))
    c.drawCentredString(540, 360, "Late-night cravings & plateaued fat loss aren't a lack")
    c.drawCentredString(540, 310, "of discipline. It is your body's survival mode.")
    c.restoreState()

# Scene 2: Dual Side-By-Side Comparison Cards (5s to 11s)
def draw_scene_2(c, t):
    t_local = max(0.0, t - 5.0)
    c.setFillColor(COLOR_CREAM)
    c.rect(0, 0, 1080, 1920, fill=True, stroke=False)
    draw_editorial_header(c, "BIOLOGICAL MECHANISM", "VOL 02")
    
    c.saveState()
    c.setFont("Italiana", 84)
    c.setFillColor(COLOR_OBSIDIAN)
    c.drawCentredString(540, 1680, "The Calorie Deficit Myth")
    c.setFont("Outfit-Bold", 32)
    c.setFillColor(COLOR_EMERALD)
    c.drawCentredString(540, 1610, "WHY EATING LESS DOESN'T ALWAYS EQUAL LOSING FAT")
    c.restoreState()
    
    # Left Card: WHAT YOU THINK
    c.saveState()
    c.setFillColor(colors.white)
    c.setStrokeColor(COLOR_CORAL)
    c.setLineWidth(4.0)
    c.roundRect(60, 480, 460, 1040, 36, fill=True, stroke=True)
    
    c.setFillColor(COLOR_CORAL_LIGHT)
    c.roundRect(90, 1440, 240, 44, 22, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 22)
    c.setFillColor(COLOR_CORAL)
    c.drawCentredString(210, 1454, "WHAT YOU THINK")
    
    c.setFont("Outfit-Bold", 40)
    c.setFillColor(COLOR_OBSIDIAN)
    c.drawString(90, 1370, "Caloric Math")
    
    c.setFont("Outfit", 30)
    c.setFillColor(colors.HexColor('#444444'))
    c.drawString(90, 1260, "• Cut calories sharply")
    c.drawString(90, 1180, "• Double workout stress")
    c.drawString(90, 1100, "• Expect automatic loss")
    
    c.setFillColor(colors.HexColor('#FEE2E2'))
    c.roundRect(85, 520, 410, 80, 20, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 28)
    c.setFillColor(colors.HexColor('#B91C1C'))
    c.drawCentredString(290, 548, "❌ Triggers Alarm")
    c.restoreState()
    
    # Right Card: WHAT IS HAPPENING
    c.saveState()
    c.setFillColor(colors.white)
    c.setStrokeColor(COLOR_EMERALD)
    c.setLineWidth(4.0)
    c.roundRect(560, 480, 460, 1040, 36, fill=True, stroke=True)
    
    c.setFillColor(COLOR_EMERALD_LIGHT)
    c.roundRect(590, 1440, 260, 44, 22, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 22)
    c.setFillColor(COLOR_EMERALD)
    c.drawCentredString(720, 1454, "WHAT IS HAPPENING")
    
    c.setFont("Outfit-Bold", 40)
    c.setFillColor(COLOR_EMERALD)
    c.drawString(590, 1370, "Hormonal Defense")
    
    c.setFont("Outfit", 30)
    c.setFillColor(colors.HexColor('#444444'))
    c.drawString(590, 1260, "• Cortisol spikes +35%")
    c.drawString(590, 1180, "• Leptin drops (cravings)")
    c.drawString(590, 1100, "• BMR slows to conserve")
    
    c.setFillColor(COLOR_EMERALD_LIGHT)
    c.roundRect(585, 520, 410, 80, 20, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 28)
    c.setFillColor(COLOR_EMERALD)
    c.drawCentredString(790, 548, "✓ Survival Locked")
    c.restoreState()
    
    # Bottom Callout
    c.saveState()
    c.setFont("Outfit-Bold", 38)
    c.setFillColor(COLOR_OBSIDIAN)
    c.drawCentredString(540, 320, "Your body is protecting energy, not burning it.")
    c.restoreState()

# Scene 3: Interactive Radial Gauges (10s to 17s)
def draw_scene_3(c, t):
    t_local = max(0.0, t - 10.0)
    c.setFillColor(COLOR_PEARL)
    c.rect(0, 0, 1080, 1920, fill=True, stroke=False)
    draw_editorial_header(c, "CLINICAL DIAGNOSTICS", "VOL 03")
    
    # Photo Frame Top 38%
    img_path = get_asset_image("scene3_weight_loss.png")
    zoomed = crop_and_zoom_image(img_path, t_local, 7.0, 1.0, 1.1)
    c.saveState()
    c.setStrokeColor(COLOR_EMERALD)
    c.setLineWidth(5.0)
    c.roundRect(60, 1140, 960, 640, 36, fill=False, stroke=True)
    c.drawImage(zoomed, 64, 1144, width=952, height=632)
    c.restoreState()
    
    # Middle Title
    c.saveState()
    c.setFont("Italiana", 84)
    c.setFillColor(COLOR_OBSIDIAN)
    c.drawCentredString(540, 1020, "Measure The Biological Friction")
    c.restoreState()
    
    # 3 Radial Gauges Grid
    gauge_progress = min(1.0, t_local / 3.0)
    
    # Gauge 1
    draw_gauge(c, 100, 350, 260, 540, int(35 * gauge_progress), "Cortisol Spike", "+35% Fat Storage", COLOR_CORAL)
    # Gauge 2
    draw_gauge(c, 410, 350, 260, 540, int(45 * gauge_progress), "Leptin Drop", "Appetite Surge", COLOR_EMERALD)
    # Gauge 3
    draw_gauge(c, 720, 350, 260, 540, int(25 * gauge_progress), "BMR Slowdown", "Energy Preserved", COLOR_OBSIDIAN)

def draw_gauge(c, x, y, w, h, percent, title, subtitle, color):
    c.saveState()
    c.setFillColor(colors.white)
    c.setStrokeColor(colors.Color(0,0,0,alpha=0.10))
    c.setLineWidth(2.0)
    c.roundRect(x, y, w, h, 30, fill=True, stroke=True)
    
    # Circular Gauge Arc
    cx, cy = x + w/2.0, y + h - 180
    c.setStrokeColor(COLOR_EMERALD_LIGHT)
    c.setLineWidth(14.0)
    c.circle(cx, cy, 75, fill=False, stroke=True)
    
    c.setStrokeColor(color)
    c.setLineWidth(14.0)
    # Simple visual indicator arc
    c.circle(cx, cy, 75, fill=False, stroke=True)
    
    c.setFont("Outfit-Bold", 44)
    c.setFillColor(COLOR_OBSIDIAN)
    c.drawCentredString(cx, cy - 14, f"{percent}%")
    
    c.setFont("Outfit-Bold", 26)
    c.setFillColor(COLOR_EMERALD)
    c.drawCentredString(cx, y + 100, title)
    
    c.setFont("Outfit", 22)
    c.setFillColor(colors.HexColor('#666666'))
    c.drawCentredString(cx, y + 50, subtitle)
    c.restoreState()

# Scene 4: 3D Horizontal Sliding Protocol Cards (16s to 23s)
def draw_scene_4(c, t):
    t_local = max(0.0, t - 16.0)
    c.setFillColor(COLOR_CREAM)
    c.rect(0, 0, 1080, 1920, fill=True, stroke=False)
    draw_editorial_header(c, "SOLUTION PROTOCOL", "VOL 04")
    
    c.saveState()
    c.setFont("Outfit-Bold", 30)
    c.setFillColor(COLOR_CORAL)
    c.drawCentredString(540, 1720, "THE DHRUTHI WELLNESS FRAMEWORK")
    
    c.setFont("Italiana", 84)
    c.setFillColor(COLOR_OBSIDIAN)
    c.drawCentredString(540, 1630, "Fix The Foundation First")
    c.restoreState()
    
    # Pill Card 1
    draw_protocol_card(c, 60, 1340, 960, 220, "01", "Full Biomarker & Gut Panel", "Identify thyroid slowing, insulin resistance & gut inflammation.", COLOR_EMERALD)
    # Pill Card 2
    draw_protocol_card(c, 60, 1080, 960, 220, "02", "Circadian Rhythm & Stress Optimization", "Restore deep sleep cycles to drop cortisol & restart fat oxidation.", COLOR_CORAL)
    # Pill Card 3
    draw_protocol_card(c, 60, 820, 960, 220, "03", "Precision Metabolic Nutrition Plan", "Tailored micro & macro nutrient ratios. Nourish instead of starve.", COLOR_EMERALD)
    
    # Bottom Image Frame
    img_path = get_asset_image("scene4_weight_loss.png")
    zoomed = crop_and_zoom_image(img_path, t_local, 7.0, 1.0, 1.1)
    c.saveState()
    c.setStrokeColor(COLOR_EMERALD)
    c.setLineWidth(4.0)
    c.roundRect(60, 260, 960, 500, 32, fill=False, stroke=True)
    c.drawImage(zoomed, 64, 264, width=952, height=492)
    c.restoreState()

def draw_protocol_card(c, x, y, w, h, num, title, desc, num_color):
    c.saveState()
    c.setFillColor(colors.white)
    c.setStrokeColor(colors.Color(0,0,0,alpha=0.10))
    c.setLineWidth(2.0)
    c.roundRect(x, y, w, h, 32, fill=True, stroke=True)
    
    c.setFillColor(num_color)
    c.roundRect(x + 30, y + 40, 110, 140, 22, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 44)
    c.setFillColor(colors.white)
    c.drawCentredString(x + 85, y + 85, num)
    
    c.setFont("Outfit-Bold", 34)
    c.setFillColor(COLOR_OBSIDIAN)
    c.drawString(x + 170, y + 130, title)
    
    c.setFont("Outfit", 26)
    c.setFillColor(colors.HexColor('#666666'))
    c.drawString(x + 170, y + 70, desc)
    c.restoreState()

# Scene 5: High-Fashion Brand Outro (22s to 28s)
def draw_scene_5(c, t):
    t_local = max(0.0, t - 22.0)
    c.setFillColor(COLOR_PEARL)
    c.rect(0, 0, 1080, 1920, fill=True, stroke=False)
    draw_editorial_header(c, "EVIDENCE-BASED CARE", "FINAL")
    
    # Top 48% Hero Photo Frame
    img_path = get_asset_image("scene5_weight_loss.png")
    zoomed = crop_and_zoom_image(img_path, t_local, 6.0, 1.0, 1.1)
    c.saveState()
    c.setStrokeColor(COLOR_EMERALD)
    c.setLineWidth(6.0)
    c.roundRect(60, 940, 960, 840, 44, fill=False, stroke=True)
    c.drawImage(zoomed, 64, 944, width=952, height=832)
    c.restoreState()
    
    # Bottom 52% Brand Outro Canvas
    c.saveState()
    c.setFont("Italiana", 92)
    c.setFillColor(COLOR_OBSIDIAN)
    c.drawCentredString(540, 780, "Stop Guessing.")
    
    c.setFillColor(COLOR_CORAL_LIGHT)
    c.roundRect(260, 650, 560, 75, 12, fill=True, stroke=False)
    c.setFont("Italiana", 92)
    c.setFillColor(COLOR_CORAL)
    c.drawCentredString(540, 665, "Start Healing.")
    
    c.setFont("Outfit-Bold", 56)
    c.setFillColor(COLOR_EMERALD)
    c.drawCentredString(540, 520, "DHRUTHI WELLNESS")
    
    c.setFont("Outfit", 32)
    c.setFillColor(colors.HexColor('#666666'))
    c.drawCentredString(540, 450, "Evidence-Based Functional Nutrition & Metabolism")
    
    # Pulsing CTA Button
    pulse = 1.0 + 0.02 * math.sin(2.0 * math.pi * t_local / 1.5)
    c.setFillColor(COLOR_EMERALD)
    c.roundRect(140, 260, 800, 110, 55, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 38)
    c.setFillColor(colors.white)
    c.drawCentredString(540, 298, "BOOK METABOLISM ASSESSMENT")
    c.restoreState()

def build_section_pdfs():
    print("Building editorial scene PDFs...")
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
        print("Reel video compilation complete.")
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
    temp_crop = os.path.join(ARTIFACTS_DIR, "temp_ed_zoom.png")
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
    print("Editorial Instagram Reel compilation successful!")
