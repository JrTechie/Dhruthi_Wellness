import os
import sys
import math
import shutil
import asyncio
import wave
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps
import pypdfium2 as pdfium
import edge_tts
from moviepy import VideoFileClip, AudioFileClip, CompositeAudioClip

# ReportLab imports
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Paths
WORKSPACE_DIR = r"l:\Developer\nutriflow"
ASSETS_DIR = os.path.join(WORKSPACE_DIR, "assets")
FONT_DIR = os.path.join(WORKSPACE_DIR, r".agents\skills\canvas-design\canvas-fonts")
AVATAR_PATH = os.path.join(WORKSPACE_DIR, r"Images\Dt. Akhila.png")
OUTPUT_DIR = os.path.join(WORKSPACE_DIR, "Reels finalised")
os.makedirs(OUTPUT_DIR, exist_ok=True)

ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\4ebff9c7-9d71-4221-a529-25b0934a0d54"
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

TEMP_VIDEO = os.path.join(ARTIFACTS_DIR, "temp_conception_raw.mp4")
FINAL_VIDEO = os.path.join(OUTPUT_DIR, "dhruthi_conception_reel.mp4")
ARTIFACT_VIDEO = os.path.join(ARTIFACTS_DIR, "dhruthi_conception_reel.mp4")

# Color Palette: Luxury Emerald & Rose Gold Glassmorphism
COLOR_BG_DARK = colors.HexColor('#08120E')          # Deepest Obsidian Emerald
COLOR_BG_CARD = colors.HexColor('#0F241C')          # Rich Forest Glass
COLOR_GOLD = colors.HexColor('#C5A059')             # Warm Gold Accent
COLOR_MINT_GLOW = colors.HexColor('#00FF9D')        # Neon Mint Highlight
COLOR_CYAN_GLOW = colors.HexColor('#00E5FF')        # Cyber Cyan Accent
COLOR_BLUSH_GLOW = colors.HexColor('#FBD6E6')       # Rose Blush Glow
COLOR_EMERALD = colors.HexColor('#1E4D3B')          # Premium Emerald Accent
COLOR_WHITE = colors.HexColor('#FFFFFF')            # Crisp White
COLOR_SUBTEXT = colors.HexColor('#D1E0D7')          # Soft Muted Mint Grey

VOICE_NAME = "en-IN-NeerjaNeural"

SCRIPTS = {
    1: ("Are you planning to conceive? Here is what you must know before you start trying. Preparation doesn't begin on a positive test — your fertility journey starts 90 days before!", 0.0),
    2: ("Did you know eggs and sperm take roughly 90 days to mature? The nutrition and cellular environment you provide today directly dictates egg quality three months from now.", 6.0),
    3: ("Silent metabolic friction like insulin resistance, thyroid variations, or low active methylfolate can delay conception even if your cycles feel regular.", 12.0),
    4: ("Step 1: Test your preconception biomarkers. Step 2: Fuel with active methylfolate and CoQ10. Step 3: Optimize your stress and sleep to support progesterone.", 18.0),
    5: ("Give your future baby the strongest foundation. Book your personalized preconception nutrition consultation with Dhruthi Wellness today.", 25.0)
}

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

async def generate_all_voiceovers():
    print("Generating neural Indian female voiceover segments...")
    audio_clips = {}
    audio_envelopes = {}
    
    for scene_id, (text, start_t) in SCRIPTS.items():
        mp3_path = os.path.join(ARTIFACTS_DIR, f"conception_voice_{scene_id}.mp3")
        wav_path = os.path.join(ARTIFACTS_DIR, f"conception_voice_{scene_id}.wav")
        
        communicate = edge_tts.Communicate(text, VOICE_NAME, rate="+2%", pitch="+1Hz")
        await communicate.save(mp3_path)
        
        aclip = AudioFileClip(mp3_path)
        aclip.write_audiofile(wav_path, fps=16000, logger=None)
        duration = aclip.duration
        aclip.close()
        
        with wave.open(wav_path, 'rb') as wf:
            n_channels = wf.getnchannels()
            sampwidth = wf.getsampwidth()
            framerate = wf.getframerate()
            n_frames = wf.getnframes()
            raw_bytes = wf.readframes(n_frames)
            samples = np.frombuffer(raw_bytes, dtype=np.int16)
            if n_channels > 1:
                samples = samples[::n_channels]
                
            fps = 25
            total_video_frames = int(duration * fps)
            samples_per_frame = int(framerate / fps)
            envelope = []
            
            for f in range(total_video_frames):
                start = f * samples_per_frame
                end = min(len(samples), (f + 1) * samples_per_frame)
                if start < len(samples):
                    chunk = samples[start:end]
                    rms = np.sqrt(np.mean(chunk.astype(np.float32)**2)) / 32768.0
                    envelope.append(float(rms))
                else:
                    envelope.append(0.0)
                    
            audio_envelopes[scene_id] = (envelope, duration)
            audio_clips[scene_id] = (mp3_path, start_t)
            
    return audio_clips, audio_envelopes

class LiveMotionAvatar:
    def __init__(self, avatar_file):
        self.avatar_raw = Image.open(avatar_file).convert('RGBA')
        self.w, self.h = self.avatar_raw.size
        
        self.base_avatar = Image.new('RGBA', (self.w, self.h), (0,0,0,0))
        mask = Image.new('L', (self.w, self.h), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, self.w, self.h), fill=255)
        self.base_avatar.paste(self.avatar_raw, (0, 0), mask)
        
        self.mouth_cx = int(self.w * 0.50)
        self.mouth_cy = int(self.h * 0.63)
        self.mouth_rw = int(self.w * 0.16)
        self.mouth_rh = int(self.h * 0.08)
        
        box = (self.mouth_cx - self.mouth_rw, self.mouth_cy - self.mouth_rh,
               self.mouth_cx + self.mouth_rw, self.mouth_cy + self.mouth_rh)
        self.mouth_patch = self.avatar_raw.crop(box)
        
    def render_frame(self, target_size, t, speech_energy=0.0):
        mouth_open = min(1.0, speech_energy * 3.8)
        
        tilt_angle = math.sin(2.0 * math.pi * t / 4.0) * 1.5
        scale_pulse = 1.0 + 0.008 * math.sin(2.0 * math.pi * t / 2.0)
        
        blink_cycle = t % 3.5
        is_blinking = blink_cycle < 0.15
        
        img = self.base_avatar.copy()
        
        if mouth_open > 0.05:
            mw, mh = self.mouth_patch.size
            stretch_h = int(mh * (1.0 + 0.35 * mouth_open))
            stretched_mouth = self.mouth_patch.resize((mw, stretch_h), Image.Resampling.BILINEAR)
            
            mouth_canvas = Image.new('RGBA', (mw, stretch_h), (0,0,0,0))
            mdraw = ImageDraw.Draw(mouth_canvas)
            m_center_y = stretch_h // 2 + int(4 * mouth_open)
            mdraw.ellipse([mw//4, m_center_y - int(8*mouth_open), 3*mw//4, m_center_y + int(12*mouth_open)],
                          fill=(60, 20, 30, int(180 * mouth_open)))
            
            mouth_canvas = Image.alpha_composite(stretched_mouth, mouth_canvas)
            
            paste_x = self.mouth_cx - mw // 2
            paste_y = self.mouth_cy - mh // 2 + int(4 * mouth_open)
            img.paste(mouth_canvas, (paste_x, paste_y), stretched_mouth)
            
        if is_blinking:
            eye_y = int(self.h * 0.44)
            eye_draw = ImageDraw.Draw(img)
            eye_draw.rectangle([int(self.w*0.35), eye_y-8, int(self.w*0.65), eye_y+10], fill=(225, 185, 160, 240))

        if abs(tilt_angle) > 0.1:
            img = img.rotate(tilt_angle, resample=Image.Resampling.BICUBIC, expand=False)
            
        final_w = int(target_size * scale_pulse)
        img = img.resize((final_w, final_w), Image.Resampling.LANCZOS)
        
        out_path = os.path.join(ARTIFACTS_DIR, "temp_live_avatar_frame.png")
        img.save(out_path, "PNG")
        return out_path

def draw_dark_bg(c):
    c.setFillColor(COLOR_BG_DARK)
    c.rect(0, 0, 1080, 1920, fill=True, stroke=False)
    
    c.saveState()
    c.setFillColor(colors.Color(0.0, 1.0, 0.62, alpha=0.06))
    c.circle(900, 1600, 500, fill=True, stroke=False)
    c.setFillColor(colors.Color(0.77, 0.63, 0.35, alpha=0.05))
    c.circle(180, 400, 450, fill=True, stroke=False)
    c.restoreState()

def draw_glass_card(c, x, y, w, h, radius=32, stroke_color=None, stroke_width=2.0, alpha=0.88):
    c.saveState()
    c.setFillColor(colors.Color(0.06, 0.14, 0.11, alpha=alpha))
    if stroke_color:
        c.setStrokeColor(stroke_color)
        c.setLineWidth(stroke_width)
    else:
        c.setStrokeColor(colors.Color(1.0, 1.0, 1.0, alpha=0.18))
        c.setLineWidth(2.0)
    c.roundRect(x, y, w, h, radius, fill=True, stroke=True)
    c.restoreState()

def draw_header(c, category="PRE-CONCEPTION SERIES", episode="DAY 01"):
    c.saveState()
    c.setFillColor(colors.Color(0.06, 0.14, 0.11, alpha=0.92))
    c.setStrokeColor(COLOR_GOLD)
    c.setLineWidth(2.0)
    c.roundRect(60, 1820, 320, 50, 25, fill=True, stroke=True)
    
    c.setFillColor(COLOR_GOLD)
    c.circle(85, 1845, 5, fill=True, stroke=False)
    
    c.setFont("Outfit-Bold", 20)
    c.setFillColor(COLOR_GOLD)
    c.drawString(100, 1836, category)
    
    c.setFont("Outfit", 20)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(400, 1836, episode)
    
    c.setFont("Outfit-Bold", 24)
    c.setFillColor(COLOR_WHITE)
    c.drawRightString(1020, 1834, "@dhruthi_wellness")
    
    c.setStrokeColor(colors.Color(1.0, 1.0, 1.0, alpha=0.15))
    c.setLineWidth(1.5)
    c.line(60, 1800, 1020, 1800)
    c.restoreState()

def draw_live_avatar_badge(c, avatar_obj, x, y, size, t, speech_energy=0.0, show_credentials=True):
    frame_path = avatar_obj.render_frame(size, t, speech_energy)
    
    c.saveState()
    cx, cy = x + size // 2, y + size // 2
    r = size // 2
    
    pulse_r1 = r + 8 + int(speech_energy * 24)
    pulse_r2 = r + 18 + int(speech_energy * 40)
    
    c.setStrokeColor(colors.Color(0.77, 0.63, 0.35, alpha=0.35 + 0.4 * speech_energy))
    c.setLineWidth(2.5)
    c.circle(cx, cy, pulse_r1, fill=False, stroke=True)
    
    c.setStrokeColor(colors.Color(0.0, 1.0, 0.62, alpha=0.25 + 0.5 * speech_energy))
    c.setLineWidth(1.5)
    c.circle(cx, cy, pulse_r2, fill=False, stroke=True)
    
    c.drawImage(frame_path, x, y, width=size, height=size)
    
    c.setStrokeColor(COLOR_GOLD)
    c.setLineWidth(3.5)
    c.circle(cx, cy, r, fill=False, stroke=True)
    
    if show_credentials:
        badge_w, badge_h = 440, 48
        bx = cx - badge_w // 2
        by = y - 24
        
        c.setFillColor(colors.Color(0.06, 0.14, 0.11, alpha=0.95))
        c.setStrokeColor(COLOR_GOLD)
        c.setLineWidth(1.5)
        c.roundRect(bx, by, badge_w, badge_h, 24, fill=True, stroke=True)
        
        c.setFillColor(COLOR_MINT_GLOW)
        c.circle(bx + 26, by + 24, 10, fill=True, stroke=False)
        c.setFont("Outfit-Bold", 14)
        c.setFillColor(COLOR_BG_DARK)
        c.drawCentredString(bx + 26, by + 19, "✓")
        
        c.setFont("Outfit-Bold", 19)
        c.setFillColor(COLOR_WHITE)
        c.drawString(bx + 48, by + 28, "Dt. Akhila Konakalla")
        
        c.setFont("Outfit", 15)
        c.setFillColor(COLOR_GOLD)
        c.drawString(bx + 48, by + 10, "M.Sc. Clinical Nutritionist")
        
    c.restoreState()

def draw_scene_1(c, t, envelope_val, avatar_obj):
    draw_dark_bg(c)
    draw_header(c, "PRE-CONCEPTION CARE", "DAY 01")
    draw_live_avatar_badge(c, avatar_obj, 360, 1140, 360, t, envelope_val, show_credentials=True)
    
    c.saveState()
    c.setFont("Outfit-Bold", 34)
    c.setFillColor(COLOR_GOLD)
    c.drawCentredString(540, 980, "DAY 01  •  PRE-CONCEPTION CARE")
    
    c.setFont("Italiana", 92)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 870, "Planning To Conceive?")
    
    c.setFillColor(colors.Color(0.0, 1.0, 0.62, alpha=0.15))
    c.setStrokeColor(COLOR_MINT_GLOW)
    c.setLineWidth(2.0)
    c.roundRect(100, 720, 880, 85, 20, fill=True, stroke=True)
    
    c.setFont("Italiana", 76)
    c.setFillColor(COLOR_MINT_GLOW)
    c.drawCentredString(540, 735, "What You Must Know Before Trying")
    
    draw_glass_card(c, 60, 240, 960, 420, radius=36, stroke_color=COLOR_GOLD, stroke_width=2.0)
    
    c.setFont("Outfit-Bold", 32)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 570, "Pregnancy prep doesn't start on a positive test.")
    
    c.setFont("Outfit", 30)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawCentredString(540, 490, "Your fertility journey begins 90 days before trying.")
    c.drawCentredString(540, 420, "Today's nutrition shapes your cellular foundation.")
    
    c.setFont("Outfit-Bold", 24)
    c.setFillColor(COLOR_GOLD)
    c.drawCentredString(540, 300, "SWIPE TO REVEAL THE 90-DAY CELLULAR CYCLE  ➔")
    c.restoreState()

def draw_scene_2(c, t, envelope_val, avatar_obj):
    draw_dark_bg(c)
    draw_header(c, "CELLULAR MATURATION", "DAY 01")
    draw_live_avatar_badge(c, avatar_obj, 60, 1600, 160, t, envelope_val, show_credentials=False)
    
    c.saveState()
    c.setFont("Italiana", 84)
    c.setFillColor(COLOR_WHITE)
    c.drawString(250, 1680, "The 90-Day Cellular Window")
    
    c.setFont("Outfit-Bold", 28)
    c.setFillColor(COLOR_MINT_GLOW)
    c.drawString(250, 1630, "WHY TODAY'S DIET SHAPES FUTURE EGG QUALITY")
    c.restoreState()
    
    draw_glass_card(c, 60, 540, 460, 1020, radius=36, stroke_color=colors.Color(1.0, 0.35, 0.2, alpha=0.8), stroke_width=2.5)
    c.saveState()
    c.setFillColor(colors.Color(1.0, 0.35, 0.2, alpha=0.2))
    c.setStrokeColor(colors.HexColor('#FF5A36'))
    c.roundRect(90, 1460, 240, 44, 22, fill=True, stroke=True)
    c.setFont("Outfit-Bold", 22)
    c.setFillColor(colors.HexColor('#FF5A36'))
    c.drawCentredString(210, 1474, "COMMON MYTH")
    
    c.setFont("Outfit-Bold", 36)
    c.setFillColor(COLOR_WHITE)
    c.drawString(90, 1380, "Instant Prep")
    
    c.setFont("Outfit", 26)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(90, 1280, "• Start prep after testing positive")
    c.drawString(90, 1200, "• Take basic synthetic folic acid")
    c.drawString(90, 1120, "• Ignore male preconception role")
    c.drawString(90, 1040, "• Assume normal cycles = full health")
    
    c.setFillColor(colors.Color(1.0, 0.2, 0.2, alpha=0.25))
    c.roundRect(85, 580, 410, 80, 20, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 26)
    c.setFillColor(colors.HexColor('#FF5A36'))
    c.drawCentredString(290, 608, "❌ Misses Critical Window")
    c.restoreState()
    
    draw_glass_card(c, 560, 540, 460, 1020, radius=36, stroke_color=COLOR_MINT_GLOW, stroke_width=2.5)
    c.saveState()
    c.setFillColor(colors.Color(0.0, 1.0, 0.62, alpha=0.2))
    c.setStrokeColor(COLOR_MINT_GLOW)
    c.roundRect(590, 1460, 260, 44, 22, fill=True, stroke=True)
    c.setFont("Outfit-Bold", 22)
    c.setFillColor(COLOR_MINT_GLOW)
    c.drawCentredString(720, 1474, "CLINICAL SCIENCE")
    
    c.setFont("Outfit-Bold", 36)
    c.setFillColor(COLOR_MINT_GLOW)
    c.drawString(590, 1380, "90-Day Maturation")
    
    c.setFont("Outfit", 26)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(590, 1280, "• Eggs & sperm mature in 90 days")
    c.drawString(590, 1200, "• Active Methylfolate (5-MTHF)")
    c.drawString(590, 1120, "• Both partners require prep")
    c.drawString(590, 1040, "• Mitochondrial CoQ10 support")
    
    c.setFillColor(colors.Color(0.0, 1.0, 0.62, alpha=0.25))
    c.roundRect(585, 580, 410, 80, 20, fill=True, stroke=False)
    c.setFont("Outfit-Bold", 26)
    c.setFillColor(COLOR_MINT_GLOW)
    c.drawCentredString(790, 608, "✓ Optimizes Egg & Sperm")
    c.restoreState()
    
    draw_glass_card(c, 60, 260, 960, 220, radius=30, stroke_color=COLOR_GOLD, stroke_width=2.0)
    c.saveState()
    c.setFont("Outfit-Bold", 34)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 390, "What you eat today shapes your baby's cellular origin.")
    c.setFont("Outfit", 28)
    c.setFillColor(COLOR_GOLD)
    c.drawCentredString(540, 320, "Give egg and sperm mitochondria 3 full months to thrive.")
    c.restoreState()

def draw_scene_3(c, t, envelope_val, avatar_obj):
    draw_dark_bg(c)
    draw_header(c, "CLINICAL DIAGNOSTICS", "DAY 01")
    draw_live_avatar_badge(c, avatar_obj, 60, 1600, 160, t, envelope_val, show_credentials=False)
    
    c.saveState()
    c.setFont("Italiana", 84)
    c.setFillColor(COLOR_WHITE)
    c.drawString(250, 1680, "Hidden Pre-Conception Brakes")
    
    c.setFont("Outfit-Bold", 28)
    c.setFillColor(COLOR_GOLD)
    c.drawString(250, 1630, "BIOMARKERS THAT QUIETLY DELAY CONCEPTION")
    c.restoreState()
    
    draw_diag_card(c, 60, 1140, 960, 400, "01", "Insulin Sensitivity & HbA1c", "Elevated insulin disturbs ovulation quality & uterine receptivity.", COLOR_MINT_GLOW)
    draw_diag_card(c, 60, 700, 960, 400, "02", "Thyroid (TSH) & Prolactin", "Subclinical TSH > 2.5 mIU/L can silently halt luteal phase support.", COLOR_CYAN_GLOW)
    draw_diag_card(c, 60, 260, 960, 400, "03", "Micronutrient Reserves", "Iron, Vitamin D3, B12, and Choline reserves drive early implantation.", COLOR_GOLD)

def draw_diag_card(c, x, y, w, h, num, title, desc, accent_color):
    draw_glass_card(c, x, y, w, h, radius=32, stroke_color=accent_color, stroke_width=2.0)
    c.saveState()
    c.setFillColor(accent_color)
    c.roundRect(x + 30, y + 40, 110, 320, 22, fill=True, stroke=False)
    
    c.setFont("Outfit-Bold", 44)
    c.setFillColor(COLOR_BG_DARK)
    c.drawCentredString(x + 85, y + 180, num)
    
    c.setFont("Outfit-Bold", 36)
    c.setFillColor(COLOR_WHITE)
    c.drawString(x + 170, y + 260, title)
    
    c.setFont("Outfit", 28)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(x + 170, y + 180, desc)
    c.restoreState()

def draw_scene_4(c, t, envelope_val, avatar_obj):
    draw_dark_bg(c)
    draw_header(c, "ACTION PROTOCOL", "DAY 01")
    draw_live_avatar_badge(c, avatar_obj, 60, 1600, 160, t, envelope_val, show_credentials=False)
    
    c.saveState()
    c.setFont("Italiana", 84)
    c.setFillColor(COLOR_WHITE)
    c.drawString(250, 1680, "Pre-Conception Protocol")
    
    c.setFont("Outfit-Bold", 28)
    c.setFillColor(COLOR_MINT_GLOW)
    c.drawString(250, 1630, "3-STEP EVIDENCE-BASED PREPARATION")
    c.restoreState()
    
    draw_protocol_card(c, 60, 1160, 960, 380, "STEP 1", "Comprehensive Biomarker Panel", "Screen Thyroid, HbA1c, Ferritin, Vitamin D, and MTHFR gene variants.", COLOR_MINT_GLOW)
    draw_protocol_card(c, 60, 720, 960, 380, "STEP 2", "Active Methylfolate & CoQ10", "Fuel mitochondrial ATP in oocytes and support neural tube development.", COLOR_CYAN_GLOW)
    draw_protocol_card(c, 60, 280, 960, 380, "STEP 3", "Stress & Progesterone Alignment", "Lower evening cortisol to optimize natural progesterone production.", COLOR_GOLD)

def draw_protocol_card(c, x, y, w, h, step, title, desc, accent_color):
    draw_glass_card(c, x, y, w, h, radius=32, stroke_color=accent_color, stroke_width=2.0)
    c.saveState()
    c.setFillColor(accent_color)
    c.roundRect(x + 30, y + 260, 160, 48, 24, fill=True, stroke=False)
    
    c.setFont("Outfit-Bold", 22)
    c.setFillColor(COLOR_BG_DARK)
    c.drawCentredString(x + 110, y + 274, step)
    
    c.setFont("Outfit-Bold", 36)
    c.setFillColor(COLOR_WHITE)
    c.drawString(x + 210, y + 265, title)
    
    c.setFont("Outfit", 28)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawString(x + 40, y + 160, desc)
    c.restoreState()

def draw_scene_5(c, t, envelope_val, avatar_obj):
    draw_dark_bg(c)
    draw_header(c, "DHRUTHI FERTILITY CARE", "FINAL")
    draw_live_avatar_badge(c, avatar_obj, 340, 1100, 400, t, envelope_val, show_credentials=True)
    
    c.saveState()
    c.setFont("Italiana", 96)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 930, "Strong Foundations.")
    
    c.setFillColor(colors.Color(0.0, 1.0, 0.62, alpha=0.15))
    c.setStrokeColor(COLOR_MINT_GLOW)
    c.setLineWidth(2.5)
    c.roundRect(240, 800, 600, 85, 22, fill=True, stroke=True)
    c.setFont("Italiana", 96)
    c.setFillColor(COLOR_MINT_GLOW)
    c.drawCentredString(540, 815, "Healthy Pregnancies.")
    
    draw_glass_card(c, 60, 240, 960, 520, radius=40, stroke_color=COLOR_GOLD, stroke_width=3.0)
    
    c.setFont("Outfit-Bold", 56)
    c.setFillColor(COLOR_GOLD)
    c.drawCentredString(540, 640, "DHRUTHI WELLNESS")
    
    c.setFont("Outfit", 32)
    c.setFillColor(COLOR_SUBTEXT)
    c.drawCentredString(540, 560, "Evidence-Based Pre-Conception & Fertility Nutrition")
    
    pulse = 1.0 + 0.02 * math.sin(2.0 * math.pi * t / 1.5)
    
    c.saveState()
    c.translate(540, 390)
    c.scale(pulse, pulse)
    c.setFillColor(COLOR_MINT_GLOW)
    c.roundRect(-420, -55, 840, 110, 55, fill=True, stroke=False)
    
    c.setFont("Outfit-Bold", 32)
    c.setFillColor(COLOR_BG_DARK)
    c.drawCentredString(0, -10, "BOOK PRE-CONCEPTION CONSULTATION 🌸")
    c.restoreState()
    
    c.setFont("Outfit-Bold", 24)
    c.setFillColor(COLOR_WHITE)
    c.drawCentredString(540, 270, "www.dhruthiwellness.com  |  @dhruthi_wellness")
    c.restoreState()

def build_scene_pdf(scene_id, duration, envelope, avatar_obj):
    FPS = 25
    total_frames = int(duration * FPS) + 1
    pdf_path = os.path.join(ARTIFACTS_DIR, f"temp_conception_scene_{scene_id}.pdf")
    
    c = canvas.Canvas(pdf_path, pagesize=(1080, 1920))
    for f in range(total_frames):
        t = f / float(FPS)
        env_val = envelope[f] if f < len(envelope) else 0.0
        
        if scene_id == 1:
            draw_scene_1(c, t, env_val, avatar_obj)
        elif scene_id == 2:
            draw_scene_2(c, t, env_val, avatar_obj)
        elif scene_id == 3:
            draw_scene_3(c, t, env_val, avatar_obj)
        elif scene_id == 4:
            draw_scene_4(c, t, env_val, avatar_obj)
        elif scene_id == 5:
            draw_scene_5(c, t, env_val, avatar_obj)
            
        c.showPage()
    c.save()
    return pdf_path

def compile_full_video(audio_clips, audio_envelopes, avatar_obj):
    print("Building scene PDFs and writing MP4 stream...")
    FPS = 25
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    video_writer = cv2.VideoWriter(TEMP_VIDEO, fourcc, 25.0, (1080, 1920))
    
    for scene_id in range(1, 6):
        envelope, duration = audio_envelopes[scene_id]
        pdf_path = build_scene_pdf(scene_id, duration, envelope, avatar_obj)
        
        doc = pdfium.PdfDocument(pdf_path)
        for p in range(len(doc)):
            img = doc[p].render(scale=1.0).to_pil()
            frame_bgr = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
            video_writer.write(frame_bgr)
        doc.close()
        os.remove(pdf_path)
        print(f"Scene {scene_id} rendered and written to MP4 stream.")
        
    video_writer.release()
    print("Raw video written to", TEMP_VIDEO)
    
    # Merge audio clips
    print("Merging audio clips with moviepy...")
    video_clip = VideoFileClip(TEMP_VIDEO)
    
    sound_clips = []
    for scene_id, (mp3_path, start_t) in audio_clips.items():
        aclip = AudioFileClip(mp3_path).with_start(start_t)
        sound_clips.append(aclip)
        
    composite_audio = CompositeAudioClip(sound_clips)
    final_clip = video_clip.with_audio(composite_audio)
    
    print(f"Writing final voiced video to {FINAL_VIDEO}...")
    final_clip.write_videofile(
        FINAL_VIDEO,
        codec="libx264",
        audio_codec="aac",
        temp_audiofile=os.path.join(ARTIFACTS_DIR, "temp-audio.m4a"),
        remove_temp=True
    )
    
    video_clip.close()
    final_clip.close()
    for c in sound_clips:
        c.close()
        
    shutil.copy(FINAL_VIDEO, ARTIFACT_VIDEO)
    print(f"Successfully exported final video to artifacts: {ARTIFACT_VIDEO}")

async def main():
    register_fonts()
    avatar_obj = LiveMotionAvatar(AVATAR_PATH)
    audio_clips, audio_envelopes = await generate_all_voiceovers()
    compile_full_video(audio_clips, audio_envelopes, avatar_obj)
    print("\n🎉 Day 01 Pre-Conception Instagram Reel compilation successful!")

if __name__ == "__main__":
    asyncio.run(main())
