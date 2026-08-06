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

ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\7f66912d-9634-498a-8da6-b0a04a0183c6"
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

TEMP_SECTIONS = {
    1: os.path.join(ARTIFACTS_DIR, "temp_hype_scene_1.pdf"),
    2: os.path.join(ARTIFACTS_DIR, "temp_hype_scene_2.pdf"),
    3: os.path.join(ARTIFACTS_DIR, "temp_hype_scene_3.pdf"),
    4: os.path.join(ARTIFACTS_DIR, "temp_hype_scene_4.pdf"),
    5: os.path.join(ARTIFACTS_DIR, "temp_hype_scene_5.pdf")
}

OUTPUT_MP4 = os.path.join(WORKSPACE_DIR, "Reels finalised", "dhruthi_wellness_reel.mp4")
ARTIFACT_MP4 = os.path.join(ARTIFACTS_DIR, "dhruthi_wellness_reel.mp4")

# Hype Colors
COLOR_DARK_CYBER = colors.HexColor('#101413')
COLOR_NEON_MINT = colors.HexColor('#00FF9D')
COLOR_FLAME = colors.HexColor('#FF5A36')
COLOR_BEIGE_CANVAS = colors.HexColor('#FAF8F5')
COLOR_FOREST = colors.HexColor('#1B3B2B')
COLOR_CYBER_BG = colors.HexColor('#152220')
COLOR_CYAN = colors.HexColor('#00E5FF')
COLOR_LIME = colors.HexColor('#94C973')
COLOR_GOLD = colors.HexColor('#FFD700')
COLOR_LUXE_BG = colors.HexColor('#0B1E17')

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

def crop_and_zoom_image(img_path, t, max_t, zoom_start=1.0, zoom_end=1.15):
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
    temp_path = os.path.join(ARTIFACTS_DIR, "temp_hype_zoom.png")
    cropped.save(temp_path, "PNG")
    return temp_path

# Scene 1: Cyberpunk Dark Luxe Hook (0s to 6s)
def draw_scene_1(c, t):
    c.setFillColor(COLOR_DARK_CYBER)
    c.rect(0, 0, 1080, 1920, fill=True, stroke=False)
    
    # Top Ticker Bar
    c.setFillColor(COLOR_NEON_MINT)
    c.roundRect(60, 1820, 200, 44, 12, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 20)
    c.setFillColor(COLOR_DARK_CYBER)
    c.drawCentredString(160, 1834, "REEL 01")
    
    c.setFont("Outfit-Bold", 20)
    c.setFillColor(COLOR_NEON_MINT)
    c.drawString(280, 1834, "// METABOLIC TRUTH")
    
    c.setFont("Outfit-Bold", 24)
    c.setFillColor(colors.white)
    c.drawRightString(1020, 1834, "@dhruthi_wellness")
    
    c.setStrokeColor(colors.Color(0, 1.0, 0.61, alpha=0.3))
    c.setLineWidth(2.0)
    c.line(60, 1800, 1020, 1800)
    
    # Center Photo Frame with Cyber Neon Border
    img_path = get_asset_image("scene1_weight_loss.png")
    zoomed = crop_and_zoom_image(img_path, t, 6.0, 1.0, 1.15)
    
    c.saveState()
    c.setStrokeColor(COLOR_NEON_MINT)
    c.setLineWidth(5.0)
    c.roundRect(60, 780, 960, 960, 36, fill=False, stroke=True)
    c.drawImage(zoomed, 64, 784, width=952, height=952)
    
    # Floating Badge
    c.setFillColor(COLOR_FLAME)
    c.roundRect(100, 1660, 520, 52, 14, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 22)
    c.setFillColor(colors.white)
    c.drawCentredString(360, 1676, "⚠️ WEIGHT LOSS PLATEAU DETECTED")
    c.restoreState()
    
    # Bottom Kinetic Typography
    c.saveState()
    c.setFont("Outfit-Bold", 44)
    c.setFillColor(COLOR_FLAME)
    c.drawCentredString(540, 620, "EATING CLEAN? WORKING OUT DAILY?")
    
    c.setFont("Italiana", 92)
    c.setFillColor(colors.white)
    c.drawCentredString(540, 500, "Why Is The Scale")
    c.setFillColor(COLOR_NEON_MINT)
    c.drawCentredString(540, 400, "Scale Frozen?")
    c.restoreState()

# Scene 2: Scandinavian Split & 3D Bouncing Cards (5s to 11s)
def draw_scene_2(c, t):
    t_local = max(0.0, t - 5.0)
    c.setFillColor(COLOR_BEIGE_CANVAS)
    c.rect(0, 0, 1080, 1920, fill=True, stroke=False)
    
    c.saveState()
    c.setFillColor(COLOR_FOREST)
    c.roundRect(60, 1820, 320, 44, 22, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 20)
    c.setFillColor(colors.white)
    c.drawCentredString(220, 1834, "02 // BIOLOGICAL BLOCKERS")
    
    c.setFont("Outfit-Bold", 24)
    c.setFillColor(COLOR_FOREST)
    c.drawRightString(1020, 1834, "@dhruthi_wellness")
    c.restoreState()
    
    c.saveState()
    c.setFont("Italiana", 84)
    c.setFillColor(COLOR_FOREST)
    c.drawCentredString(540, 1680, "3 Hidden Metabolic Brakes")
    c.setFont("Outfit-Bold", 32)
    c.setFillColor(COLOR_FLAME)
    c.drawCentredString(540, 1610, "IT'S NOT LACK OF WILLPOWER — IT'S SURVIVAL MODE")
    c.restoreState()
    
    # Card 1
    draw_stat_card(c, 60, 1280, 960, 240, "⚠️ 1. Elevated Cortisol Level", "High stress locks fat storage into high gear.", "+35% FAT LOCK", COLOR_FLAME)
    # Card 2
    draw_stat_card(c, 60, 980, 960, 240, "🌙 2. Chronic Sleep Debt", "Suppresses Leptin & triggers late snacking.", "-50% LEPTIN", COLOR_FOREST)
    # Card 3
    draw_stat_card(c, 60, 680, 960, 240, "🛑 3. Thyroid Adaptation", "Body lowers Basal Metabolic Rate to conserve.", "BMR SLOWED", COLOR_FLAME)
    
    c.saveState()
    c.setFont("Outfit-Bold", 40)
    c.setFillColor(COLOR_FOREST)
    c.drawCentredString(540, 460, "Fix Your Internal Biochemistry First")
    c.restoreState()

def draw_stat_card(c, x, y, w, h, title, desc, badge, badge_color):
    c.saveState()
    c.setFillColor(colors.white)
    c.setStrokeColor(badge_color)
    c.setLineWidth(3.5)
    c.roundRect(x, y, w, h, 32, fill=True, stroke=True)
    
    c.setFont("Outfit-Bold", 34)
    c.setFillColor(COLOR_FOREST)
    c.drawString(x + 40, y + 150, title)
    
    c.setFont("Outfit", 26)
    c.setFillColor(colors.HexColor('#555555'))
    c.drawString(x + 40, y + 90, desc)
    
    c.setFillColor(badge_color)
    c.roundRect(x + w - 280, y + 70, 240, 70, 18, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 24)
    c.setFillColor(colors.white)
    c.drawCentredString(x + w - 160, y + 96, badge)
    c.restoreState()

# Scene 3: Glassmorphic Cyber-Clinic Wall (10s to 17s)
def draw_scene_3(c, t):
    t_local = max(0.0, t - 10.0)
    c.setFillColor(COLOR_CYBER_BG)
    c.rect(0, 0, 1080, 1920, fill=True, stroke=False)
    
    c.saveState()
    c.setFillColor(COLOR_CYAN)
    c.roundRect(60, 1820, 340, 44, 22, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 20)
    c.setFillColor(COLOR_CYBER_BG)
    c.drawCentredString(230, 1834, "03 // ROOT-CAUSE DIAGNOSTICS")
    
    c.setFont("Outfit-Bold", 24)
    c.setFillColor(colors.white)
    c.drawRightString(1020, 1834, "@dhruthi_wellness")
    c.restoreState()
    
    c.saveState()
    c.setFont("Italiana", 84)
    c.setFillColor(colors.white)
    c.drawCentredString(540, 1660, "Measure The Biological Friction")
    c.restoreState()
    
    # Main Video Box
    img_path = get_asset_image("scene3_weight_loss.png")
    zoomed = crop_and_zoom_image(img_path, t_local, 7.0, 1.0, 1.1)
    c.saveState()
    c.setStrokeColor(COLOR_CYAN)
    c.setLineWidth(5.0)
    c.roundRect(60, 960, 960, 620, 36, fill=False, stroke=True)
    c.drawImage(zoomed, 64, 964, width=952, height=612)
    c.restoreState()
    
    # 2 Stats Panel Cards Bottom
    draw_cyber_box(c, 60, 500, 460, 380, "BIOMARKER PANEL", "Insulin & Thyroid", "Uncovers sluggish metabolism.")
    draw_cyber_box(c, 560, 500, 460, 380, "GUT MICROBIOME", "Systemic Inflammation", "Blocks nutrient absorption & fat burning.")
    
    c.saveState()
    c.setFont("Outfit-Bold", 38)
    c.setFillColor(COLOR_CYAN)
    c.drawCentredString(540, 340, "Stop Guessing. Measure Your Internal Engine.")
    c.restoreState()

def draw_cyber_box(c, x, y, w, h, tag, title, desc):
    c.saveState()
    c.setFillColor(colors.Color(1,1,1,alpha=0.10))
    c.setStrokeColor(colors.Color(1,1,1,alpha=0.25))
    c.setLineWidth(2.0)
    c.roundRect(x, y, w, h, 32, fill=True, stroke=True)
    
    c.setFont("Outfit-Bold", 22)
    c.setFillColor(COLOR_CYAN)
    c.drawString(x + 30, y + h - 60, tag)
    
    c.setFont("Outfit-Bold", 32)
    c.setFillColor(colors.white)
    c.drawString(x + 30, y + h - 130, title)
    
    c.setFont("Outfit", 24)
    c.setFillColor(colors.HexColor('#CCCCCC'))
    c.drawString(x + 30, y + 60, desc)
    c.restoreState()

# Scene 4: 3-Step Diagonal Matrix (16s to 23s)
def draw_scene_4(c, t):
    t_local = max(0.0, t - 16.0)
    c.setFillColor(COLOR_LIME)
    c.rect(0, 0, 1080, 1920, fill=True, stroke=False)
    
    c.saveState()
    c.setFillColor(COLOR_DARK_CYBER)
    c.roundRect(60, 1820, 340, 44, 22, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 20)
    c.setFillColor(colors.white)
    c.drawCentredString(230, 1834, "04 // THE METABOLIC MATRIX")
    
    c.setFont("Outfit-Bold", 24)
    c.setFillColor(COLOR_DARK_CYBER)
    c.drawRightString(1020, 1834, "@dhruthi_wellness")
    c.restoreState()
    
    c.saveState()
    c.setFont("Italiana", 84)
    c.setFillColor(COLOR_DARK_CYBER)
    c.drawCentredString(540, 1660, "Fix The Biological Foundation")
    c.restoreState()
    
    # 3 Diagonal Step Cards
    draw_lime_card(c, 60, 1240, 960, 240, "⚡ 01", "Biomarker & Gut Panel", "Uncover root-cause metabolic blockers.", colors.white, COLOR_DARK_CYBER, COLOR_DARK_CYBER, COLOR_LIME)
    draw_lime_card(c, 60, 940, 960, 240, "⚡ 02", "Circadian Rhythm Sync", "Restore deep sleep cycles & balance cortisol curve.", COLOR_DARK_CYBER, colors.white, COLOR_LIME, COLOR_DARK_CYBER)
    draw_lime_card(c, 60, 640, 960, 240, "⚡ 03", "Precision Metabolic Fuel", "Targeted nutrient ratios tailored to your body.", colors.white, COLOR_DARK_CYBER, COLOR_DARK_CYBER, COLOR_LIME)
    
    c.saveState()
    c.setFont("Outfit-Bold", 40)
    c.setFillColor(colors.white)
    c.drawCentredString(540, 440, "Nourish Your Body. Reset Your Rhythm.")
    c.restoreState()

def draw_lime_card(c, x, y, w, h, step, title, desc, bg_color, text_color, badge_bg, badge_txt):
    c.saveState()
    c.setFillColor(bg_color)
    c.setStrokeColor(COLOR_DARK_CYBER)
    c.setLineWidth(4.0)
    c.roundRect(x, y, w, h, 32, fill=True, stroke=True)
    
    c.setFillColor(badge_bg)
    c.roundRect(x + 30, y + 40, 110, 140, 22, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 36)
    c.setFillColor(badge_txt)
    c.drawCentredString(x + 85, y + 85, step)
    
    c.setFont("Outfit-Bold", 34)
    c.setFillColor(text_color)
    c.drawString(x + 170, y + 130, title)
    
    c.setFont("Outfit", 26)
    c.setFillColor(text_color)
    c.drawString(x + 170, y + 70, desc)
    c.restoreState()

# Scene 5: Grand Luxe Outro (22s to 28s)
def draw_scene_5(c, t):
    t_local = max(0.0, t - 22.0)
    c.setFillColor(COLOR_LUXE_BG)
    c.rect(0, 0, 1080, 1920, fill=True, stroke=False)
    
    c.saveState()
    c.setFillColor(COLOR_NEON_MINT)
    c.roundRect(60, 1820, 300, 44, 22, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 20)
    c.setFillColor(COLOR_LUXE_BG)
    c.drawCentredString(210, 1834, "FINAL // REEL SUMMARY")
    
    c.setFont("Outfit-Bold", 24)
    c.setFillColor(COLOR_NEON_MINT)
    c.drawRightString(1020, 1834, "@dhruthi_wellness")
    c.restoreState()
    
    # Center Hero Photo Frame
    img_path = get_asset_image("scene5_weight_loss.png")
    zoomed = crop_and_zoom_image(img_path, t_local, 6.0, 1.0, 1.1)
    c.saveState()
    c.setStrokeColor(COLOR_NEON_MINT)
    c.setLineWidth(6.0)
    c.roundRect(60, 940, 960, 820, 44, fill=False, stroke=True)
    c.drawImage(zoomed, 64, 944, width=952, height=812)
    c.restoreState()
    
    # Bottom Outro Text
    c.saveState()
    c.setFont("Italiana", 92)
    c.setFillColor(colors.white)
    c.drawCentredString(540, 780, "Stop Guessing.")
    c.setFillColor(COLOR_NEON_MINT)
    c.drawCentredString(540, 680, "Start Healing.")
    
    c.setFont("Outfit-Bold", 60)
    c.setFillColor(COLOR_GOLD)
    c.drawCentredString(540, 520, "DHRUTHI WELLNESS")
    
    c.setFont("Outfit", 32)
    c.setFillColor(colors.HexColor('#CCCCCC'))
    c.drawCentredString(540, 450, "Evidence-Based Functional Nutrition & Metabolism")
    
    # Pulsing CTA Button
    c.setFillColor(COLOR_NEON_MINT)
    c.roundRect(100, 260, 880, 110, 55, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 38)
    c.setFillColor(COLOR_LUXE_BG)
    c.drawCentredString(540, 298, "BOOK METABOLISM ASSESSMENT 🚀")
    c.restoreState()

def build_section_pdfs():
    print("Building hypeframe scene PDFs...")
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
    temp_crop = os.path.join(ARTIFACTS_DIR, "temp_hype_zoom.png")
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
    print("HypeFrame Instagram Reel compilation successful!")
