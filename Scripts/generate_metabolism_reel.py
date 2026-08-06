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
ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\9c0c7e76-4cc4-483f-b6b5-501fda686a46"
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

TEMP_SECTIONS = {
    1: os.path.join(ARTIFACTS_DIR, "temp_met_scene_1.pdf"),
    2: os.path.join(ARTIFACTS_DIR, "temp_met_scene_2.pdf"),
    3: os.path.join(ARTIFACTS_DIR, "temp_met_scene_3.pdf"),
    4: os.path.join(ARTIFACTS_DIR, "temp_met_scene_4.pdf"),
    5: os.path.join(ARTIFACTS_DIR, "temp_met_scene_5.pdf"),
    6: os.path.join(ARTIFACTS_DIR, "temp_met_scene_6.pdf")
}

OUTPUT_MP4 = os.path.join(WORKSPACE_DIR, "Reels finalised", "dhruthi_metabolism_reel_raw.mp4")
FINAL_MP4 = os.path.join(WORKSPACE_DIR, "Reels finalised", "dhruthi_metabolism_reel.mp4")
ARTIFACT_MP4 = os.path.join(ARTIFACTS_DIR, "dhruthi_metabolism_reel.mp4")

# Brand colors matching design instructions
COLOR_BG_DARK = colors.HexColor('#1C2826')         # Dark green slate base
COLOR_SOFT_GREEN = colors.HexColor('#8EA788')      # Calm sage green accent
COLOR_WARM_ORANGE = colors.HexColor('#E07A5F')     # Warm highlight orange
COLOR_BEIGE = colors.HexColor('#F4F1DE')           # Elegant beige subtext/text
COLOR_WHITE = colors.HexColor('#FFFFFF')           # Pure white for main messages
COLOR_SUBTEXT = colors.HexColor('#E8E5DA')         # Light soft beige for descriptions

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

def crop_to_fill(img_path, box_w, box_h, t, max_t, zoom_start=1.0, zoom_end=1.12):
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
    # Renders a full bleed background image with smooth zoom
    img_reader = crop_to_fill(img_path, 1080, 1920, t, max_t, 1.0, 1.10)
    c.drawImage(img_reader, 0, 0, width=1080, height=1920)
    
    c.saveState()
    # Subtle dark overlay for high text legibility
    c.setFillColor(colors.Color(0.08, 0.12, 0.11, alpha=0.40))
    c.rect(0, 1400, 1080, 520, fill=True, stroke=False)
    c.setFillColor(colors.Color(0.08, 0.12, 0.11, alpha=0.55))
    c.rect(0, 0, 1080, 920, fill=True, stroke=False)
    c.restoreState()

def draw_semi_transparent_card(c, x, y, w, h, radius=32, stroke_color=None, stroke_width=2.5, alpha=0.75):
    c.saveState()
    # 70-80% opacity card background
    c.setFillColor(colors.Color(0.11, 0.16, 0.15, alpha=alpha))
    if stroke_color:
        c.setStrokeColor(stroke_color)
        c.setLineWidth(stroke_width)
    else:
        c.setStrokeColor(colors.Color(1.0, 1.0, 1.0, alpha=0.25))
        c.setLineWidth(2.0)
    c.roundRect(x, y, w, h, radius, fill=True, stroke=True)
    c.restoreState()

def draw_header_overlay(c, category="METABOLIC HEALTH", issue="VOL 01"):
    c.saveState()
    # Semi-transparent glass pill top left
    c.setFillColor(colors.Color(0.11, 0.16, 0.15, alpha=0.85))
    c.setStrokeColor(COLOR_SOFT_GREEN)
    c.setLineWidth(2.0)
    c.roundRect(60, 1820, 310, 48, 24, fill=True, stroke=True)
    
    c.setFillColor(COLOR_SOFT_GREEN)
    c.circle(85, 1844, 4, fill=True, stroke=False)
    
    c.setFont("Outfit-Bold", 18)
    c.setFillColor(COLOR_SOFT_GREEN)
    c.drawString(100, 1836, category)
    
    c.setFont("Outfit", 18)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(300, 1836, issue)
    
    c.setFont("Outfit-Bold", 24)
    c.setFillColor(COLOR_WHITE)
    c.drawRightString(1020, 1834, "@dhruthi_wellness")
    
    c.setStrokeColor(colors.Color(1.0, 1.0, 1.0, alpha=0.15))
    c.setLineWidth(1.5)
    c.line(60, 1800, 1020, 1800)
    c.restoreState()

# Scene 1: Hook (0s to 5.5s)
def draw_scene_1(c, t):
    img_path = get_asset_image("metabolism_scene1_scale.png")
    draw_fullscreen_background(c, img_path, t, 5.5)
    draw_header_overlay(c, "METABOLIC TRUTH", "VOL 01")
    
    # 75% Opacity Centered Card
    draw_semi_transparent_card(c, 100, 350, 880, 420, radius=36, stroke_color=COLOR_WARM_ORANGE)
    
    c.saveState()
    # Dhruthi Wellness Small Pill
    c.setFillColor(colors.Color(0.55, 0.65, 0.53, alpha=0.25))
    c.setStrokeColor(COLOR_SOFT_GREEN)
    c.roundRect(400, 700, 280, 40, 12, fill=True, stroke=True)
    c.setFont("Outfit-Bold", 18)
    c.setFillColor(COLOR_SOFT_GREEN)
    c.drawCentredString(540, 712, "DHRUTHI WELLNESS")
    
    # Headline
    c.setFont("Outfit-Bold", 52)
    c.setFillColor(COLOR_WARM_ORANGE)
    c.drawCentredString(540, 600, "Still blaming your metabolism?")
    
    # Subheadline
    c.setFont("Outfit", 36)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 480, "The truth may surprise you...")
    c.restoreState()

# Scene 2: Definition (4.5s to 10.5s)
def draw_scene_2(c, t):
    img_path = get_asset_image("metabolism_scene2_energy.png")
    draw_fullscreen_background(c, img_path, t, 6.0)
    draw_header_overlay(c, "BIOLOGICAL MECHANISM", "VOL 02")
    
    draw_semi_transparent_card(c, 100, 300, 880, 680, radius=36, stroke_color=COLOR_SOFT_GREEN)
    
    c.saveState()
    c.setFont("Outfit-Bold", 48)
    c.setFillColor(COLOR_WARM_ORANGE)
    c.drawCentredString(540, 890, "What is metabolism?")
    
    c.setFont("Outfit", 34)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 800, "It's how your body converts food into energy.")
    
    # Divider
    c.setStrokeColor(colors.Color(1.0, 1.0, 1.0, alpha=0.15))
    c.setLineWidth(1.5)
    c.line(160, 740, 920, 740)
    
    # Grid of biological functions
    # Row 1
    c.setFont("Outfit-Bold", 32)
    c.setFillColor(COLOR_SOFT_GREEN)
    c.drawString(200, 630, "❤️  Heartbeat")
    c.drawString(560, 630, "🫁  Breathing")
    
    # Row 2
    c.drawString(200, 490, "🧠  Brain Function")
    c.drawString(560, 490, "🚶  Daily Movement")
    
    # Small helper message
    c.setFont("Outfit", 26)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawCentredString(540, 370, "It operates constantly to keep you alive.")
    c.restoreState()

# Scene 3: Everyday work (9.5s to 16.5s)
def draw_scene_3(c, t):
    img_path = get_asset_image("metabolism_scene3_lifestyle.png")
    draw_fullscreen_background(c, img_path, t, 7.0)
    draw_header_overlay(c, "CONSTANT OPERATION", "VOL 03")
    
    draw_semi_transparent_card(c, 100, 300, 880, 680, radius=36, stroke_color=COLOR_WARM_ORANGE)
    
    c.saveState()
    c.setFont("Outfit-Bold", 48)
    c.setFillColor(COLOR_WARM_ORANGE)
    c.drawCentredString(540, 890, "Your metabolism works...")
    
    # Bullets
    bullets = [
        ("✔  While sleeping", COLOR_WHITE),
        ("✔  While walking", COLOR_WHITE),
        ("✔  While thinking", COLOR_WHITE),
        ("✔  Every single second", COLOR_SOFT_GREEN)
    ]
    
    y_start = 760
    for idx, (bullet, col) in enumerate(bullets):
        y_pos = y_start - (idx * 90)
        c.setFont("Outfit-Bold" if col == COLOR_SOFT_GREEN else "Outfit", 34)
        c.setFillColor(col)
        c.drawString(240, y_pos, bullet)
        
    c.setFont("Outfit", 26)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawCentredString(540, 370, "Your engine never turns off.")
    c.restoreState()

# Scene 4: What affects it (15.5s to 22.5s)
def draw_scene_4(c, t):
    img_path = get_asset_image("metabolism_scene4_montage.png")
    draw_fullscreen_background(c, img_path, t, 7.0)
    draw_header_overlay(c, "INFLUENCING FACTORS", "VOL 04")
    
    draw_semi_transparent_card(c, 100, 260, 880, 740, radius=36, stroke_color=COLOR_SOFT_GREEN)
    
    c.saveState()
    c.setFont("Outfit-Bold", 46)
    c.setFillColor(COLOR_WARM_ORANGE)
    c.drawCentredString(540, 920, "What really affects metabolism?")
    
    factors = [
        "🥩  Muscle mass",
        "🚶  Physical activity",
        "😴  Sleep cycles",
        "🥗  Targeted nutrition",
        "😌  Stress management"
    ]
    
    y_start = 800
    for idx, factor in enumerate(factors):
        y_pos = y_start - (idx * 90)
        c.setFont("Outfit", 32)
        c.setFillColor(COLOR_WHITE)
        c.drawString(240, y_pos, factor)
        
    c.setFont("Outfit-Bold", 26)
    c.setFillColor(COLOR_SOFT_GREEN)
    c.drawCentredString(540, 330, "These are factors you can control.")
    c.restoreState()

# Scene 5: Solutions (21.5s to 27.5s)
def draw_scene_5(c, t):
    img_path = get_asset_image("metabolism_scene5_dietitian.png")
    draw_fullscreen_background(c, img_path, t, 6.0)
    draw_header_overlay(c, "SOLUTION PROTOCOL", "VOL 05")
    
    draw_semi_transparent_card(c, 100, 260, 880, 740, radius=36, stroke_color=COLOR_WARM_ORANGE)
    
    c.saveState()
    c.setFont("Outfit-Bold", 44)
    c.setFillColor(COLOR_WARM_ORANGE)
    c.drawCentredString(540, 920, "Support your metabolism naturally")
    
    tips = [
        "✔  Eat enough protein",
        "✔  Strength training",
        "✔  Sleep 7-9 hours",
        "✔  Stay active daily",
        "✔  Stay hydrated"
    ]
    
    y_start = 800
    for idx, tip in enumerate(tips):
        y_pos = y_start - (idx * 90)
        c.setFont("Outfit", 32)
        c.setFillColor(COLOR_WHITE)
        c.drawString(240, y_pos, tip)
        
    c.setFont("Outfit-Bold", 26)
    c.setFillColor(COLOR_SOFT_GREEN)
    c.drawCentredString(540, 330, "Small daily habits yield massive results.")
    c.restoreState()

# Scene 6: Outro (26.5s to 30.0s)
def draw_scene_6(c, t):
    img_path = get_asset_image("metabolism_scene6_happy.png")
    draw_fullscreen_background(c, img_path, t, 3.5)
    draw_header_overlay(c, "EVIDENCE-BASED CARE", "FINAL")
    
    draw_semi_transparent_card(c, 100, 260, 880, 750, radius=40, stroke_color=COLOR_SOFT_GREEN)
    
    c.saveState()
    # Brand heading
    c.setFont("Italiana", 72)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 910, "Healthy Habits Build A")
    
    c.setFillColor(colors.Color(0.55, 0.65, 0.53, alpha=0.20))
    c.setStrokeColor(COLOR_SOFT_GREEN)
    c.setLineWidth(2.5)
    c.roundRect(220, 785, 640, 85, 20, fill=True, stroke=True)
    c.setFont("Italiana", 72)
    c.setFillColor(COLOR_SOFT_GREEN)
    c.drawCentredString(540, 805, "Healthier Metabolism.")
    
    # Call to action
    draw_semi_transparent_card(c, 160, 370, 760, 280, radius=32, stroke_color=COLOR_WARM_ORANGE, alpha=0.88)
    
    c.setFont("Outfit-Bold", 34)
    c.setFillColor(COLOR_WARM_ORANGE)
    c.drawCentredString(540, 570, "Follow Dhruthi Wellness")
    
    c.setFont("Outfit", 26)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawCentredString(540, 510, "for evidence-based nutrition tips 🌿")
    
    # CTA Button
    c.setFillColor(COLOR_SOFT_GREEN)
    c.roundRect(240, 410, 600, 60, 30, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 24)
    c.setFillColor(colors.HexColor('#111615'))
    c.drawCentredString(540, 428, "BOOK AN ASSESSMENT 🚀")
    
    c.restoreState()

def build_section_pdfs():
    print("Building Metabolism Reel scene PDFs via ReportLab...")
    FPS = 30
    
    c1 = canvas.Canvas(TEMP_SECTIONS[1], pagesize=(1080, 1920))
    for f in range(int(5.5 * FPS) + 1):
        draw_scene_1(c1, f / float(FPS))
        c1.showPage()
    c1.save()
    
    c2 = canvas.Canvas(TEMP_SECTIONS[2], pagesize=(1080, 1920))
    for f in range(int(6.0 * FPS) + 1):
        draw_scene_2(c2, f / float(FPS))
        c2.showPage()
    c2.save()
    
    c3 = canvas.Canvas(TEMP_SECTIONS[3], pagesize=(1080, 1920))
    for f in range(int(7.0 * FPS) + 1):
        draw_scene_3(c3, f / float(FPS))
        c3.showPage()
    c3.save()
    
    c4 = canvas.Canvas(TEMP_SECTIONS[4], pagesize=(1080, 1920))
    for f in range(int(7.0 * FPS) + 1):
        draw_scene_4(c4, f / float(FPS))
        c4.showPage()
    c4.save()
    
    c5 = canvas.Canvas(TEMP_SECTIONS[5], pagesize=(1080, 1920))
    for f in range(int(6.0 * FPS) + 1):
        draw_scene_5(c5, f / float(FPS))
        c5.showPage()
    c5.save()
    
    c6 = canvas.Canvas(TEMP_SECTIONS[6], pagesize=(1080, 1920))
    for f in range(int(3.5 * FPS) + 1):
        draw_scene_6(c6, f / float(FPS))
        c6.showPage()
    c6.save()

def get_pdf_page(doc, index):
    index = max(0, min(index, len(doc) - 1))
    return doc[index].render(scale=1.0).to_pil()

def compile_video():
    print("Compiling video frames with smooth cross-fades...")
    FPS = 30
    total_frames = 30 * FPS
    docs = {sc: pdfium.PdfDocument(p) for sc, p in TEMP_SECTIONS.items()}
    
    os.makedirs(os.path.dirname(OUTPUT_MP4), exist_ok=True)
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    video_writer = cv2.VideoWriter(OUTPUT_MP4, fourcc, 30.0, (1080, 1920))
    
    try:
        for f in range(total_frames):
            t = f / float(FPS)
            
            # Transition boundaries:
            # S1: 0 - 5.5s (blend S1 and S2 at 4.5 - 5.5)
            # S2: 4.5 - 10.5s (blend S2 and S3 at 9.5 - 10.5)
            # S3: 9.5 - 16.5s (blend S3 and S4 at 15.5 - 16.5)
            # S4: 15.5 - 22.5s (blend S4 and S5 at 21.5 - 22.5)
            # S5: 21.5 - 27.5s (blend S5 and S6 at 26.5 - 27.5)
            # S6: 26.5 - 30.0s
            
            if 0 <= t < 4.5:
                img = get_pdf_page(docs[1], int(round(t * FPS)))
            elif 4.5 <= t < 5.5:
                alpha = (t - 4.5) / 1.0
                img1 = get_pdf_page(docs[1], int(round(t * FPS)))
                img2 = get_pdf_page(docs[2], int(round((t - 4.5) * FPS)))
                img = Image.blend(img1, img2, alpha)
            elif 5.5 <= t < 9.5:
                img = get_pdf_page(docs[2], int(round((t - 4.5) * FPS)))
            elif 9.5 <= t < 10.5:
                alpha = (t - 9.5) / 1.0
                img1 = get_pdf_page(docs[2], int(round((t - 4.5) * FPS)))
                img2 = get_pdf_page(docs[3], int(round((t - 9.5) * FPS)))
                img = Image.blend(img1, img2, alpha)
            elif 10.5 <= t < 15.5:
                img = get_pdf_page(docs[3], int(round((t - 9.5) * FPS)))
            elif 15.5 <= t < 16.5:
                alpha = (t - 15.5) / 1.0
                img1 = get_pdf_page(docs[3], int(round((t - 9.5) * FPS)))
                img2 = get_pdf_page(docs[4], int(round((t - 15.5) * FPS)))
                img = Image.blend(img1, img2, alpha)
            elif 16.5 <= t < 21.5:
                img = get_pdf_page(docs[4], int(round((t - 15.5) * FPS)))
            elif 21.5 <= t < 22.5:
                alpha = (t - 21.5) / 1.0
                img1 = get_pdf_page(docs[4], int(round((t - 15.5) * FPS)))
                img2 = get_pdf_page(docs[5], int(round((t - 21.5) * FPS)))
                img = Image.blend(img1, img2, alpha)
            elif 22.5 <= t < 26.5:
                img = get_pdf_page(docs[5], int(round((t - 21.5) * FPS)))
            elif 26.5 <= t < 27.5:
                alpha = (t - 26.5) / 1.0
                img1 = get_pdf_page(docs[5], int(round((t - 21.5) * FPS)))
                img2 = get_pdf_page(docs[6], int(round((t - 26.5) * FPS)))
                img = Image.blend(img1, img2, alpha)
            else:
                img = get_pdf_page(docs[6], int(round((t - 26.5) * FPS)))
                
            frame_bgr = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
            video_writer.write(frame_bgr)
            if f % 150 == 0:
                print(f"Compiled frame {f}/{total_frames}...")
        print("Video compile complete.")
    finally:
        for doc in docs.values():
            doc.close()
        video_writer.release()

def add_audio():
    print("Mixing sound...")
    try:
        from moviepy import VideoFileClip, AudioFileClip, concatenate_audioclips
    except ImportError:
        print("moviepy not found, skipping audio mixing stage.")
        shutil.copy(OUTPUT_MP4, FINAL_MP4)
        return
        
    piano_src = os.path.join(WORKSPACE_DIR, "remotion-video", "public", "piano.mp3")
    if not os.path.exists(piano_src):
        print(f"piano.mp3 not found at {piano_src}, skipping audio mixing.")
        shutil.copy(OUTPUT_MP4, FINAL_MP4)
        return
        
    try:
        video = VideoFileClip(OUTPUT_MP4)
        music = AudioFileClip(piano_src)
        
        # Loop music if necessary
        if music.duration < video.duration:
            loops_needed = int(video.duration / music.duration) + 1
            looped_music = concatenate_audioclips([music] * loops_needed)
            final_music = looped_music.with_duration(video.duration)
        else:
            final_music = music.with_duration(video.duration)
            
        final_music = final_music.with_volume_scaled(0.18)
        video_with_audio = video.with_audio(final_music)
        
        video_with_audio.write_videofile(
            FINAL_MP4,
            codec="libx264",
            audio_codec="aac",
            temp_audiofile=os.path.join(ARTIFACTS_DIR, "temp-metabolism-audio.m4a"),
            remove_temp=True
        )
        video.close()
        music.close()
        video_with_audio.close()
        print("Audio mixed successfully.")
    except Exception as e:
        print(f"Error mixing audio: {e}")
        # Fallback to copy raw video
        if os.path.exists(OUTPUT_MP4):
            shutil.copy(OUTPUT_MP4, FINAL_MP4)

def copy_to_artifacts():
    if os.path.exists(FINAL_MP4):
        shutil.copy(FINAL_MP4, ARTIFACT_MP4)
        print(f"Copy saved to artifacts at {ARTIFACT_MP4}")

def cleanup():
    for path in TEMP_SECTIONS.values():
        if os.path.exists(path):
            try:
                os.remove(path)
            except Exception:
                pass
    temp_crop = os.path.join(ARTIFACTS_DIR, "temp_metabolism_zoom.png")
    if os.path.exists(temp_crop):
        try:
            os.remove(temp_crop)
        except Exception:
            pass
    # Clean raw mp4 file
    if os.path.exists(OUTPUT_MP4):
        try:
            os.remove(OUTPUT_MP4)
        except Exception:
            pass

if __name__ == "__main__":
    register_fonts()
    build_section_pdfs()
    compile_video()
    add_audio()
    copy_to_artifacts()
    cleanup()
    print("Metabolism Reel generation fully complete!")
