import os
import sys
import math
import shutil
import asyncio
import wave
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import edge_tts
from moviepy import VideoFileClip, AudioFileClip, CompositeAudioClip

# Paths
WORKSPACE_DIR = r"l:\Developer\nutriflow"
AVATAR_PATH = os.path.join(WORKSPACE_DIR, r"Images\Dt. Akhila.png")
OUTPUT_DIR = os.path.join(WORKSPACE_DIR, "Reels finalised")
os.makedirs(OUTPUT_DIR, exist_ok=True)

ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\4ebff9c7-9d71-4221-a529-25b0934a0d54"
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

TEMP_VIDEO = os.path.join(ARTIFACTS_DIR, "temp_conception_fast_raw.mp4")
FINAL_VIDEO = os.path.join(OUTPUT_DIR, "dhruthi_conception_reel.mp4")
ARTIFACT_VIDEO = os.path.join(ARTIFACTS_DIR, "dhruthi_conception_reel.mp4")

# Color Palette: Luxury Emerald & Rose Gold Glassmorphism
BG_DARK = (8, 18, 14, 255)
CARD_BG = (15, 36, 28, 225)
GOLD = (197, 160, 89, 255)
MINT = (0, 255, 157, 255)
CYAN = (0, 229, 255, 255)
WHITE = (255, 255, 255, 255)
SUBTEXT = (209, 224, 215, 255)
RED_ACCENT = (255, 90, 54, 255)

VOICE_NAME = "en-IN-NeerjaNeural"

SCRIPTS = {
    1: ("Are you planning to conceive? Here is what you must know before you start trying. Preparation doesn't begin on a positive test — your fertility journey starts 90 days before!", 0.0),
    2: ("Did you know eggs and sperm take roughly 90 days to mature? The nutrition and cellular environment you provide today directly dictates egg quality three months from now.", 6.0),
    3: ("Silent metabolic friction like insulin resistance, thyroid variations, or low active methylfolate can delay conception even if your cycles feel regular.", 12.0),
    4: ("Step 1: Test your preconception biomarkers. Step 2: Fuel with active methylfolate and CoQ10. Step 3: Optimize your stress and sleep to support progesterone.", 18.0),
    5: ("Give your future baby the strongest foundation. Book your personalized preconception nutrition consultation with Dhruthi Wellness today.", 25.0)
}

# Fonts
try:
    FONT_HEAD_LARGE = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 68)
    FONT_HEAD_MED = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 46)
    FONT_BODY_BOLD = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 28)
    FONT_BODY = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 24)
    FONT_SMALL = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 18)
except Exception:
    FONT_HEAD_LARGE = FONT_HEAD_MED = FONT_BODY_BOLD = FONT_BODY = FONT_SMALL = ImageFont.load_default()

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

class FastLiveAvatar:
    def __init__(self, avatar_path):
        self.raw = Image.open(avatar_path).convert('RGBA')
        self.w, self.h = self.raw.size
        
        self.base = Image.new('RGBA', (self.w, self.h), (0,0,0,0))
        mask = Image.new('L', (self.w, self.h), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, self.w, self.h), fill=255)
        self.base.paste(self.raw, (0,0), mask)
        
        self.mouth_cx = int(self.w * 0.50)
        self.mouth_cy = int(self.h * 0.63)
        self.mouth_rw = int(self.w * 0.15)
        self.mouth_rh = int(self.h * 0.08)
        
        box = (self.mouth_cx - self.mouth_rw, self.mouth_cy - self.mouth_rh,
               self.mouth_cx + self.mouth_rw, self.mouth_cy + self.mouth_rh)
        self.mouth_patch = self.raw.crop(box)
        
    def get_frame(self, size, t, speech_energy=0.0):
        mouth_open = min(1.0, speech_energy * 3.8)
        blink = (t % 3.5) < 0.15
        
        img = self.base.copy()
        
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
            
        if blink:
            eye_y = int(self.h * 0.44)
            eye_draw = ImageDraw.Draw(img)
            eye_draw.rectangle([int(self.w*0.35), eye_y-8, int(self.w*0.65), eye_y+10], fill=(225, 185, 160, 240))

        return img.resize((size, size), Image.Resampling.LANCZOS)

def draw_header(draw):
    draw.rounded_rectangle([60, 40, 380, 90], radius=25, fill=(15, 36, 28, 240), outline=GOLD[:3], width=2)
    draw.ellipse([80, 60, 92, 72], fill=GOLD[:3])
    draw.text((105, 52), "PRE-CONCEPTION CARE", fill=GOLD[:3], font=FONT_BODY_BOLD)
    draw.text((400, 52), "DAY 01", fill=SUBTEXT[:3], font=FONT_BODY)
    draw.text((820, 50), "@dhruthi_wellness", fill=(255,255,255), font=FONT_BODY_BOLD)
    draw.line([60, 105, 1020, 105], fill=(255,255,255,40), width=2)

def draw_avatar_badge(canvas, avatar_img, cx, cy, size, speech_energy, show_credentials=True):
    r = size // 2
    r1 = r + 8 + int(speech_energy * 24)
    r2 = r + 18 + int(speech_energy * 40)
    
    draw = ImageDraw.Draw(canvas)
    draw.ellipse([cx - r2, cy - r2, cx + r2, cy + r2], outline=MINT[:3], width=2)
    draw.ellipse([cx - r1, cy - r1, cx + r1, cy + r1], outline=GOLD[:3], width=3)
    
    canvas.paste(avatar_img, (cx - r, cy - r), avatar_img)
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=GOLD[:3], width=4)
    
    if show_credentials:
        badge_w, badge_h = 440, 48
        bx, by = cx - badge_w // 2, cy + r + 15
        draw.rounded_rectangle([bx, by, bx + badge_w, by + badge_h], radius=24, fill=(15, 36, 28, 245), outline=GOLD[:3], width=2)
        draw.ellipse([bx + 16, by + 14, bx + 36, by + 34], fill=MINT[:3])
        draw.text((bx + 21, by + 14), "✓", fill=(8,18,14), font=FONT_SMALL)
        draw.text((bx + 48, by + 8), "Dt. Akhila Konakalla", fill=(255,255,255), font=FONT_BODY_BOLD)
        draw.text((bx + 48, by + 28), "M.Sc. Clinical Nutritionist", fill=GOLD[:3], font=FONT_SMALL)

def render_scene_frame(scene_id, t, envelope_val, avatar_obj):
    canvas = Image.new('RGBA', (1080, 1920), BG_DARK)
    draw = ImageDraw.Draw(canvas)
    
    # Ambient glows
    draw.ellipse([700, -100, 1300, 500], fill=(0, 255, 157, 15))
    draw.ellipse([-200, 1400, 400, 2000], fill=(197, 160, 89, 12))
    
    draw_header(draw)
    
    if scene_id == 1:
        avatar_img = avatar_obj.get_frame(360, t, envelope_val)
        draw_avatar_badge(canvas, avatar_img, 540, 360, 360, envelope_val, show_credentials=True)
        
        draw.text((540, 680), "DAY 01  •  PRE-CONCEPTION CARE", fill=GOLD[:3], font=FONT_BODY_BOLD, anchor="mm")
        draw.text((540, 770), "Planning To Conceive?", fill=(255,255,255), font=FONT_HEAD_LARGE, anchor="mm")
        
        draw.rounded_rectangle([100, 840, 980, 925], radius=20, fill=(0, 255, 157, 30), outline=MINT[:3], width=2)
        draw.text((540, 882), "What You Must Know Before Trying", fill=MINT[:3], font=FONT_HEAD_MED, anchor="mm")
        
        draw.rounded_rectangle([60, 980, 1020, 1400], radius=36, fill=CARD_BG, outline=GOLD[:3], width=2)
        draw.text((540, 1060), "Pregnancy prep doesn't start on a positive test.", fill=(255,255,255), font=FONT_BODY_BOLD, anchor="mm")
        draw.text((540, 1140), "Your fertility journey begins 90 days before trying.", fill=SUBTEXT[:3], font=FONT_BODY, anchor="mm")
        draw.text((540, 1210), "Today's nutrition shapes your cellular foundation.", fill=SUBTEXT[:3], font=FONT_BODY, anchor="mm")
        draw.text((540, 1330), "SWIPE TO REVEAL THE 90-DAY CELLULAR CYCLE  ➔", fill=GOLD[:3], font=FONT_BODY_BOLD, anchor="mm")
        
    elif scene_id == 2:
        avatar_img = avatar_obj.get_frame(140, t, envelope_val)
        draw_avatar_badge(canvas, avatar_img, 140, 180, 140, envelope_val, show_credentials=False)
        
        draw.text((250, 170), "The 90-Day Cellular Window", fill=(255,255,255), font=FONT_HEAD_MED)
        draw.text((250, 225), "WHY TODAY'S DIET SHAPES FUTURE EGG QUALITY", fill=MINT[:3], font=FONT_BODY_BOLD)
        
        # Left Card: MYTH
        draw.rounded_rectangle([60, 300, 520, 1320], radius=36, fill=CARD_BG, outline=RED_ACCENT[:3], width=2)
        draw.rounded_rectangle([90, 340, 330, 384], radius=22, fill=(255, 90, 54, 50), outline=RED_ACCENT[:3], width=2)
        draw.text((210, 362), "COMMON MYTH", fill=RED_ACCENT[:3], font=FONT_BODY_BOLD, anchor="mm")
        draw.text((90, 430), "Instant Prep", fill=(255,255,255), font=FONT_BODY_BOLD)
        draw.text((90, 520), "• Start prep after testing positive\n• Take basic synthetic folic acid\n• Ignore male preconception role\n• Assume normal cycles = full health", fill=SUBTEXT[:3], font=FONT_BODY, spacing=25)
        draw.rounded_rectangle([85, 1200, 495, 1280], radius=20, fill=(255, 90, 54, 50))
        draw.text((290, 1240), "❌ Misses Critical Window", fill=RED_ACCENT[:3], font=FONT_BODY_BOLD, anchor="mm")
        
        # Right Card: CLINICAL SCIENCE
        draw.rounded_rectangle([560, 300, 1020, 1320], radius=36, fill=CARD_BG, outline=MINT[:3], width=2)
        draw.rounded_rectangle([590, 340, 850, 384], radius=22, fill=(0, 255, 157, 50), outline=MINT[:3], width=2)
        draw.text((720, 362), "CLINICAL SCIENCE", fill=MINT[:3], font=FONT_BODY_BOLD, anchor="mm")
        draw.text((590, 430), "90-Day Maturation", fill=MINT[:3], font=FONT_BODY_BOLD)
        draw.text((590, 520), "• Eggs & sperm mature in 90 days\n• Active Methylfolate (5-MTHF)\n• Both partners require prep\n• Mitochondrial CoQ10 support", fill=SUBTEXT[:3], font=FONT_BODY, spacing=25)
        draw.rounded_rectangle([585, 1200, 995, 1280], radius=20, fill=(0, 255, 157, 50))
        draw.text((790, 1240), "✓ Optimizes Egg & Sperm", fill=MINT[:3], font=FONT_BODY_BOLD, anchor="mm")
        
        # Bottom Callout Card
        draw.rounded_rectangle([60, 1380, 1020, 1600], radius=30, fill=CARD_BG, outline=GOLD[:3], width=2)
        draw.text((540, 1450), "What you eat today shapes your baby's cellular origin.", fill=(255,255,255), font=FONT_BODY_BOLD, anchor="mm")
        draw.text((540, 1520), "Give egg and sperm mitochondria 3 full months to thrive.", fill=GOLD[:3], font=FONT_BODY, anchor="mm")

    elif scene_id == 3:
        avatar_img = avatar_obj.get_frame(140, t, envelope_val)
        draw_avatar_badge(canvas, avatar_img, 140, 180, 140, envelope_val, show_credentials=False)
        
        draw.text((250, 170), "Hidden Pre-Conception Brakes", fill=(255,255,255), font=FONT_HEAD_MED)
        draw.text((250, 225), "BIOMARKERS THAT QUIETLY DELAY CONCEPTION", fill=GOLD[:3], font=FONT_BODY_BOLD)
        
        cards = [
            ("01", "Insulin Sensitivity & HbA1c", "Elevated insulin disturbs ovulation quality & uterine receptivity.", MINT),
            ("02", "Thyroid (TSH) & Prolactin", "Subclinical TSH > 2.5 mIU/L can silently halt luteal phase support.", CYAN),
            ("03", "Micronutrient Reserves", "Iron, Vitamin D3, B12, and Choline reserves drive early implantation.", GOLD)
        ]
        
        for idx, (num, title, desc, color) in enumerate(cards):
            y_pos = 320 + idx * 420
            draw.rounded_rectangle([60, y_pos, 1020, y_pos + 380], radius=32, fill=CARD_BG, outline=color[:3], width=2)
            draw.rounded_rectangle([90, y_pos + 40, 200, y_pos + 340], radius=22, fill=color[:3])
            draw.text((145, y_pos + 190), num, fill=(8,18,14), font=FONT_HEAD_LARGE, anchor="mm")
            draw.text((230, y_pos + 80), title, fill=(255,255,255), font=FONT_HEAD_MED)
            draw.text((230, y_pos + 180), desc, fill=SUBTEXT[:3], font=FONT_BODY)
            
    elif scene_id == 4:
        avatar_img = avatar_obj.get_frame(140, t, envelope_val)
        draw_avatar_badge(canvas, avatar_img, 140, 180, 140, envelope_val, show_credentials=False)
        
        draw.text((250, 170), "Pre-Conception Protocol", fill=(255,255,255), font=FONT_HEAD_MED)
        draw.text((250, 225), "3-STEP EVIDENCE-BASED PREPARATION", fill=MINT[:3], font=FONT_BODY_BOLD)
        
        steps = [
            ("STEP 1", "Comprehensive Biomarker Panel", "Screen Thyroid, HbA1c, Ferritin, Vitamin D, and MTHFR gene variants.", MINT),
            ("STEP 2", "Active Methylfolate & CoQ10", "Fuel mitochondrial ATP in oocytes and support neural tube development.", CYAN),
            ("STEP 3", "Stress & Progesterone Alignment", "Lower evening cortisol to optimize natural progesterone production.", GOLD)
        ]
        
        for idx, (step, title, desc, color) in enumerate(steps):
            y_pos = 320 + idx * 420
            draw.rounded_rectangle([60, y_pos, 1020, y_pos + 380], radius=32, fill=CARD_BG, outline=color[:3], width=2)
            draw.rounded_rectangle([90, y_pos + 50, 250, y_pos + 100], radius=24, fill=color[:3])
            draw.text((170, y_pos + 75), step, fill=(8,18,14), font=FONT_BODY_BOLD, anchor="mm")
            draw.text((280, y_pos + 60), title, fill=(255,255,255), font=FONT_HEAD_MED)
            draw.text((100, y_pos + 180), desc, fill=SUBTEXT[:3], font=FONT_BODY)

    elif scene_id == 5:
        avatar_img = avatar_obj.get_frame(400, t, envelope_val)
        draw_avatar_badge(canvas, avatar_img, 540, 380, 400, envelope_val, show_credentials=True)
        
        draw.text((540, 720), "Strong Foundations.", fill=(255,255,255), font=FONT_HEAD_LARGE, anchor="mm")
        draw.rounded_rectangle([240, 770, 840, 850], radius=22, fill=(0, 255, 157, 30), outline=MINT[:3], width=2)
        draw.text((540, 810), "Healthy Pregnancies.", fill=MINT[:3], font=FONT_HEAD_LARGE, anchor="mm")
        
        draw.rounded_rectangle([60, 920, 1020, 1600], radius=40, fill=CARD_BG, outline=GOLD[:3], width=3)
        draw.text((540, 1040), "DHRUTHI WELLNESS", fill=GOLD[:3], font=FONT_HEAD_LARGE, anchor="mm")
        draw.text((540, 1140), "Evidence-Based Pre-Conception & Fertility Nutrition", fill=SUBTEXT[:3], font=FONT_BODY, anchor="mm")
        
        pulse_scale = 1.0 + 0.02 * math.sin(2.0 * math.pi * t / 1.5)
        bw, bh = int(840 * pulse_scale), int(110 * pulse_scale)
        bx, by = 540 - bw // 2, 1320 - bh // 2
        draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=55, fill=MINT[:3])
        draw.text((540, 1320), "BOOK PRE-CONCEPTION CONSULTATION 🌸", fill=(8,18,14), font=FONT_BODY_BOLD, anchor="mm")
        draw.text((540, 1480), "www.dhruthiwellness.com  |  @dhruthi_wellness", fill=(255,255,255), font=FONT_BODY_BOLD, anchor="mm")
        
    return cv2.cvtColor(np.array(canvas), cv2.COLOR_RGBA2BGR)

def build_fast_video(audio_clips, audio_envelopes, avatar_obj):
    print("Direct fast rendering video frames to OpenCV VideoWriter...")
    FPS = 25
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    video_writer = cv2.VideoWriter(TEMP_VIDEO, fourcc, 25.0, (1080, 1920))
    
    for scene_id in range(1, 6):
        envelope, duration = audio_envelopes[scene_id]
        total_frames = int(duration * FPS) + 1
        
        for f in range(total_frames):
            t = f / float(FPS)
            env_val = envelope[f] if f < len(envelope) else 0.0
            frame_bgr = render_scene_frame(scene_id, t, env_val, avatar_obj)
            video_writer.write(frame_bgr)
            
        print(f"Direct scene {scene_id} rendered ({total_frames} frames).")
        
    video_writer.release()
    print("Raw video written successfully to", TEMP_VIDEO)
    
    print("Merging voiceover audio with moviepy...")
    video_clip = VideoFileClip(TEMP_VIDEO)
    sound_clips = [AudioFileClip(mp3_path).with_start(start_t) for scene_id, (mp3_path, start_t) in audio_clips.items()]
    
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
    print(f"Successfully saved Reel video to {FINAL_VIDEO} and artifact at {ARTIFACT_VIDEO}")

async def main():
    avatar_obj = FastLiveAvatar(AVATAR_PATH)
    audio_clips, audio_envelopes = await generate_all_voiceovers()
    build_fast_video(audio_clips, audio_envelopes, avatar_obj)
    print("\n✨ Fast Live Motion Reel Compilation Complete!")

if __name__ == "__main__":
    asyncio.run(main())
