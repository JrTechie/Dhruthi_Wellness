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
ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\7f66912d-9634-498a-8da6-b0a04a0183c6"
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

TEMP_SECTIONS = {
    1: os.path.join(ARTIFACTS_DIR, "temp_glass_sleep_scene_1.pdf"),
    2: os.path.join(ARTIFACTS_DIR, "temp_glass_sleep_scene_2.pdf"),
    3: os.path.join(ARTIFACTS_DIR, "temp_glass_sleep_scene_3.pdf"),
    4: os.path.join(ARTIFACTS_DIR, "temp_glass_sleep_scene_4.pdf"),
    5: os.path.join(ARTIFACTS_DIR, "temp_glass_sleep_scene_5.pdf")
}

OUTPUT_MP4 = os.path.join(WORKSPACE_DIR, "Reels finalised", "dhruthi_wellness_reel.mp4")
ARTIFACT_MP4 = os.path.join(ARTIFACTS_DIR, "dhruthi_wellness_reel.mp4")

# Ultra-Modern Dark Glassmorphism Palette
COLOR_BG_DARK = colors.HexColor('#0A0F12')         # Deep Charcoal Dark Mode
COLOR_BG_GRAD = colors.HexColor('#141C22')         # Dark Navy Secondary
COLOR_NEON_MINT = colors.HexColor('#00FF9D')       # Vibrant Mint Green Glow
COLOR_NEON_CYAN = colors.HexColor('#00E5FF')       # Vibrant Cyber Cyan Glow
COLOR_FLAME = colors.HexColor('#FF5A36')           # Coral Flame Alert Glow
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
    temp_path = os.path.join(ARTIFACTS_DIR, "temp_glass_zoom.png")
    cropped.save(temp_path, "PNG")
    return temp_path

def draw_dark_bg(c):
    c.setFillColor(COLOR_BG_DARK)
    c.rect(0, 0, 1080, 1920, fill=True, stroke=False)
    # Ambient glowing gradient circle at top-right
    c.saveState()
    c.setFillColor(colors.Color(0.0, 0.9, 1.0, alpha=0.08))
    c.circle(900, 1600, 450, fill=True, stroke=False)
    c.setFillColor(colors.Color(0.0, 1.0, 0.6, alpha=0.06))
    c.circle(150, 400, 400, fill=True, stroke=False)
    c.restoreState()

def draw_dark_glass_card(c, x, y, w, h, radius=32, stroke_color=None, stroke_width=2.0, alpha=0.82):
    c.saveState()
    # Frosted dark glass fill
    c.setFillColor(colors.Color(0.08, 0.13, 0.17, alpha=alpha))
    if stroke_color:
        c.setStrokeColor(stroke_color)
        c.setLineWidth(stroke_width)
    else:
        # Default white glass edge
        c.setStrokeColor(colors.Color(1.0, 1.0, 1.0, alpha=0.18))
        c.setLineWidth(2.0)
    c.roundRect(x, y, w, h, radius, fill=True, stroke=True)
    c.restoreState()

def draw_glass_header(c, category="SPECIAL REPORT", issue="VOL 01"):
    c.saveState()
    # Dark glass badge top left
    c.setFillColor(colors.Color(0.08, 0.13, 0.17, alpha=0.9))
    c.setStrokeColor(COLOR_NEON_CYAN)
    c.setLineWidth(2.0)
    c.roundRect(60, 1820, 260, 48, 24, fill=True, stroke=True)
    
    # Glowing teal dot inside badge
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
    
    c.setStrokeColor(colors.Color(1.0, 1.0, 1.0, alpha=0.12))
    c.setLineWidth(1.5)
    c.line(60, 1800, 1020, 1800)
    c.restoreState()

# Scene 1: Ultra-Modern Dark Glassmorphism Hook (0s to 6s)
def draw_scene_1(c, t):
    draw_dark_bg(c)
    draw_glass_header(c, "SPECIAL REPORT", "VOL 01")
    
    # Top 55% Photo Frame in Dark Glass Container
    img_path = get_asset_image("scene1_tired_kitchen.png")
    zoomed = crop_and_zoom_image(img_path, t, 6.0, 1.0, 1.12)
    
    c.saveState()
    draw_dark_glass_card(c, 60, 840, 960, 920, radius=44, stroke_color=COLOR_NEON_CYAN, stroke_width=3.0)
    c.drawImage(zoomed, 64, 844, width=952, height=912)
    c.restoreState()
    
    # Bottom 45% Text Section
    c.saveState()
    c.setFont("Outfit-Bold", 34)
    c.setFillColor(COLOR_NEON_CYAN)
    c.drawCentredString(540, 720, "LATE-NIGHT CRAVINGS?")
    
    c.setFont("Italiana", 100)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 610, "Hungry...")
    
    # Marker Highlight background for "OR JUST SLEEP DEPRIVED?"
    c.setFillColor(colors.Color(0.0, 1.0, 0.6, alpha=0.15))
    c.setStrokeColor(COLOR_NEON_MINT)
    c.setLineWidth(2.0)
    c.roundRect(160, 480, 760, 75, 16, fill=True, stroke=True)
    
    c.setFont("Italiana", 76)
    c.setFillColor(COLOR_NEON_MINT)
    c.drawCentredString(540, 495, "Or Just Sleep Deprived?")
    
    c.setFont("Outfit", 32)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawCentredString(540, 360, "Late-night snacking is often a cry for rest, not calories.")
    c.drawCentredString(540, 310, "Appetite and cravings spike by +45%.")
    c.restoreState()

# Scene 2: Dual Side-By-Side Comparison Glass Cards (5s to 11s)
def draw_scene_2(c, t):
    t_local = max(0.0, t - 5.0)
    draw_dark_bg(c)
    draw_glass_header(c, "BIOLOGICAL MECHANISM", "VOL 02")
    
    c.saveState()
    c.setFont("Italiana", 84)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 1680, "The Sleep-Appetite Cycle")
    c.setFont("Outfit-Bold", 30)
    c.setFillColor(COLOR_NEON_CYAN)
    c.drawCentredString(540, 1610, "WHY SLEEP DEPRIVATION SPIKES HUNGER & CRAVINGS")
    c.restoreState()
    
    # Left Card: WHAT YOU THINK (Flame Red Glass)
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
    c.drawString(90, 1370, "Willpower Issue")
    
    c.setFont("Outfit", 28)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(90, 1260, "• Blaming self-control")
    c.drawString(90, 1180, "• Resisting sugar urges")
    c.drawString(90, 1100, "• Pushing through fatigue")
    
    c.setFillColor(colors.Color(1.0, 0.2, 0.2, alpha=0.25))
    c.roundRect(85, 520, 410, 80, 20, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 26)
    c.setFillColor(COLOR_FLAME)
    c.drawCentredString(290, 548, "❌ Ignores Biology")
    c.restoreState()
    
    # Right Card: WHAT IS HAPPENING (Neon Mint Glass)
    c.saveState()
    draw_dark_glass_card(c, 560, 480, 460, 1040, radius=36, stroke_color=COLOR_NEON_MINT, stroke_width=3.0)
    
    c.setFillColor(colors.Color(0.0, 1.0, 0.6, alpha=0.2))
    c.setStrokeColor(COLOR_NEON_MINT)
    c.setLineWidth(1.5)
    c.roundRect(590, 1440, 260, 44, 22, fill=True, stroke=True)
    c.setFont("Outfit-Bold", 22)
    c.setFillColor(COLOR_NEON_MINT)
    c.drawCentredString(720, 1454, "WHAT IS HAPPENING")
    
    c.setFont("Outfit-Bold", 38)
    c.setFillColor(COLOR_NEON_MINT)
    c.drawString(590, 1370, "Hormonal Cascade")
    
    c.setFont("Outfit", 28)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(590, 1260, "• Ghrelin (Hunger) +28%")
    c.drawString(590, 1180, "• Leptin (Fullness) -18%")
    c.drawString(590, 1100, "• Brain demands quick carbs")
    
    c.setFillColor(colors.Color(0.0, 1.0, 0.6, alpha=0.25))
    c.roundRect(585, 520, 410, 80, 20, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 26)
    c.setFillColor(COLOR_NEON_MINT)
    c.drawCentredString(790, 548, "✓ Chemically Driven")
    c.restoreState()
    
    # Bottom Callout
    c.saveState()
    c.setFont("Outfit-Bold", 36)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 320, "Your body is chemically programmed to crave carbs when tired.")
    c.restoreState()

# Scene 3: Interactive Dark Glass Radial Gauges (10s to 17s)
def draw_scene_3(c, t):
    t_local = max(0.0, t - 10.0)
    draw_dark_bg(c)
    draw_glass_header(c, "CLINICAL DIAGNOSTICS", "VOL 03")
    
    # Photo Frame Top 38%
    img_path = get_asset_image("scene2_chips_uncertain.png")
    zoomed = crop_and_zoom_image(img_path, t_local, 7.0, 1.0, 1.1)
    c.saveState()
    draw_dark_glass_card(c, 60, 1140, 960, 640, radius=36, stroke_color=COLOR_NEON_CYAN, stroke_width=2.5)
    c.drawImage(zoomed, 64, 1144, width=952, height=632)
    c.restoreState()
    
    # Middle Title
    c.saveState()
    c.setFont("Italiana", 78)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 1020, "Hormonal Shifts From Sleep Debt")
    c.restoreState()
    
    # 3 Dark Glass Gauges Grid
    gauge_progress = min(1.0, t_local / 3.0)
    
    # Gauge 1 (Flame Red)
    draw_dark_gauge(c, 100, 350, 260, 540, int(28 * gauge_progress), "Ghrelin Spike", "+28% Hunger Signaled", COLOR_FLAME)
    # Gauge 2 (Neon Mint)
    draw_dark_gauge(c, 410, 350, 260, 540, int(18 * gauge_progress), "Leptin Drop", "-18% Fullness Felt", COLOR_NEON_MINT)
    # Gauge 3 (Neon Cyan)
    draw_dark_gauge(c, 720, 350, 260, 540, int(35 * gauge_progress), "Cortisol Rise", "+35% Fat Storage", COLOR_NEON_CYAN)

def draw_dark_gauge(c, x, y, w, h, percent, title, subtitle, color):
    c.saveState()
    draw_dark_glass_card(c, x, y, w, h, radius=30, stroke_color=color, stroke_width=2.0)
    
    # Circular Gauge Arc
    cx, cy = x + w/2.0, y + h - 180
    c.setStrokeColor(colors.Color(1.0, 1.0, 1.0, alpha=0.10))
    c.setLineWidth(14.0)
    c.circle(cx, cy, 75, fill=False, stroke=True)
    
    c.setStrokeColor(color)
    c.setLineWidth(14.0)
    c.circle(cx, cy, 75, fill=False, stroke=True)
    
    c.setFont("Outfit-Bold", 44)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(cx, cy - 14, f"{percent}%")
    
    c.setFont("Outfit-Bold", 26)
    c.setFillColor(color)
    c.drawCentredString(cx, y + 100, title)
    
    c.setFont("Outfit", 22)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawCentredString(cx, y + 50, subtitle)
    c.restoreState()

# Scene 4: Dark Glass Horizontal Protocol Cards (16s to 23s)
def draw_scene_4(c, t):
    t_local = max(0.0, t - 16.0)
    draw_dark_bg(c)
    draw_glass_header(c, "SOLUTION PROTOCOL", "VOL 04")
    
    c.saveState()
    c.setFont("Outfit-Bold", 28)
    c.setFillColor(COLOR_NEON_CYAN)
    c.drawCentredString(540, 1720, "THE DHRUTHI WELLNESS SLEEP RESET")
    
    c.setFont("Italiana", 84)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 1630, "Reset Your Baseline")
    c.restoreState()
    
    # Pill Card 1 (Mint Accent)
    draw_dark_protocol_card(c, 60, 1340, 960, 220, "01", "7 to 9 Hours Quality Sleep", "Stabilizes ghrelin & leptin to naturally curb late cravings.", COLOR_NEON_MINT)
    # Pill Card 2 (Cyan Accent)
    draw_dark_protocol_card(c, 60, 1080, 960, 220, "02", "Circadian Rhythm & Stress Sync", "Restore deep sleep cycles to drop evening cortisol levels.", COLOR_NEON_CYAN)
    # Pill Card 3 (Mint Accent)
    draw_dark_protocol_card(c, 60, 820, 960, 220, "03", "Precision Metabolic Nutrition", "Nourish your body with balanced macros instead of restricting.", COLOR_NEON_MINT)
    
    # Bottom Image Frame
    img_path = get_asset_image("scene5_refreshed_breakfast.png")
    zoomed = crop_and_zoom_image(img_path, t_local, 7.0, 1.0, 1.1)
    c.saveState()
    draw_dark_glass_card(c, 60, 260, 960, 500, radius=32, stroke_color=COLOR_NEON_CYAN, stroke_width=2.5)
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

# Scene 5: Ultra-Modern Dark Outro & CTA (22s to 28s)
def draw_scene_5(c, t):
    t_local = max(0.0, t - 22.0)
    draw_dark_bg(c)
    draw_glass_header(c, "EVIDENCE-BASED CARE", "FINAL")
    
    # Top 48% Hero Photo Frame
    img_path = get_asset_image("scene5_refreshed_woman.png")
    zoomed = crop_and_zoom_image(img_path, t_local, 6.0, 1.0, 1.1)
    c.saveState()
    draw_dark_glass_card(c, 60, 940, 960, 840, radius=44, stroke_color=COLOR_NEON_CYAN, stroke_width=3.0)
    c.drawImage(zoomed, 64, 944, width=952, height=832)
    c.restoreState()
    
    # Bottom 52% Brand Outro Canvas
    c.saveState()
    c.setFont("Italiana", 92)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 780, "Sleep Better.")
    
    c.setFillColor(colors.Color(0.0, 1.0, 0.6, alpha=0.15))
    c.setStrokeColor(COLOR_NEON_MINT)
    c.setLineWidth(2.0)
    c.roundRect(300, 650, 480, 75, 16, fill=True, stroke=True)
    c.setFont("Italiana", 92)
    c.setFillColor(COLOR_NEON_MINT)
    c.drawCentredString(540, 665, "Eat Smarter.")
    
    c.setFont("Outfit-Bold", 56)
    c.setFillColor(COLOR_NEON_CYAN)
    c.drawCentredString(540, 520, "DHRUTHI WELLNESS")
    
    c.setFont("Outfit", 32)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawCentredString(540, 450, "Personalized Nutrition & Lifestyle Consultations")
    
    # Pulsing Neon CTA Button
    c.setFillColor(COLOR_NEON_MINT)
    c.roundRect(140, 260, 800, 110, 55, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 36)
    c.setFillColor(COLOR_BG_DARK)
    c.drawCentredString(540, 298, "BOOK SLEEP & METABOLISM CONSULT")
    c.restoreState()

def build_section_pdfs():
    print("Building Dark Glassmorphism No-Sleep scene PDFs...")
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
        print("Dark Glassmorphism No-Sleep Reel video compilation complete.")
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
    temp_crop = os.path.join(ARTIFACTS_DIR, "temp_glass_zoom.png")
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
    print("Ultra-Modern Dark Glassmorphism Instagram Reel compilation successful!")
