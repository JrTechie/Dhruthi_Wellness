import os
import sys
import json
import wave
import asyncio
import numpy as np
import edge_tts
from moviepy import AudioFileClip

WORKSPACE_DIR = r"l:\Developer\nutriflow"
REMOTION_PUBLIC = os.path.join(WORKSPACE_DIR, "remotion-video", "public", "assets")
os.makedirs(REMOTION_PUBLIC, exist_ok=True)

ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\4ebff9c7-9d71-4221-a529-25b0934a0d54"
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

VOICE_NAME = "en-IN-NeerjaNeural"

FULL_SCRIPTS = {
    1: "Are you planning to conceive? Then remember—pregnancy preparation shouldn't begin with a positive pregnancy test. It begins 90 days before conception.",
    2: "Did you know eggs and sperm take roughly 90 days to mature? The nutrition, active methylfolate, and mitochondrial antioxidants like CoQ10 you provide today directly dictate your egg quality three months from now.",
    3: "Before trying, check your key preconception biomarkers. Unchecked insulin resistance, subclinical thyroid variations with TSH above 2.5, or depleted iron and vitamin D reserves can quietly delay conception.",
    4: "Follow our four-step preconception protocol: first, test comprehensive biomarkers; second, switch to active methylfolate; third, lower systemic inflammation; and fourth, reduce stress to optimize progesterone.",
    5: "Give your future baby the strongest biological foundation. Book your personalized preconception nutrition consultation with Dhruthi Wellness today."
}

async def generate_full_audio():
    print("Generating complete narration audio for all 5 scenes...")
    FPS = 30
    
    cover_duration = 3.5
    cover_frames = int(cover_duration * FPS)
    
    current_time = cover_duration
    current_frame = cover_frames
    
    line_data = {}
    
    for line_id in range(1, 6):
        text = FULL_SCRIPTS[line_id]
        mp3_name = f"full_preconception_line_{line_id}.mp3"
        wav_name = f"full_preconception_line_{line_id}.wav"
        
        mp3_path = os.path.join(REMOTION_PUBLIC, mp3_name)
        wav_path = os.path.join(ARTIFACTS_DIR, wav_name)
        
        communicate = edge_tts.Communicate(text, VOICE_NAME, rate="+2%", pitch="+0Hz")
        await communicate.save(mp3_path)
        
        aclip = AudioFileClip(mp3_path)
        aclip.write_audiofile(wav_path, fps=16000, logger=None)
        duration = aclip.duration
        aclip.close()
        
        frames_count = int(duration * FPS)
        
        with wave.open(wav_path, 'rb') as wf:
            n_channels = wf.getnchannels()
            framerate = wf.getframerate()
            n_frames = wf.getnframes()
            raw_bytes = wf.readframes(n_frames)
            samples = np.frombuffer(raw_bytes, dtype=np.int16)
            if n_channels > 1:
                samples = samples[::n_channels]
                
            samples_per_frame = int(framerate / FPS)
            envelope = []
            for f in range(frames_count):
                st = f * samples_per_frame
                ed = min(len(samples), (f + 1) * samples_per_frame)
                if st < len(samples):
                    chunk = samples[st:ed]
                    rms = float(np.sqrt(np.mean(chunk.astype(np.float32)**2)) / 32768.0)
                    envelope.append(round(rms, 4))
                else:
                    envelope.append(0.0)
                    
        pause_duration = 0.8
        pause_frames = int(pause_duration * FPS)
        
        line_data[line_id] = {
            "text": text,
            "mp3_asset": f"assets/{mp3_name}",
            "duration": round(duration, 3),
            "frames": frames_count,
            "start_time": round(current_time, 3),
            "start_frame": current_frame,
            "end_time": round(current_time + duration, 3),
            "end_frame": current_frame + frames_count,
            "pause_duration": pause_duration,
            "pause_frames": pause_frames,
            "envelope": envelope
        }
        
        current_time += duration + pause_duration
        current_frame += frames_count + pause_frames
        
    outro_duration = 4.0
    outro_frames = int(outro_duration * FPS)
    
    total_duration = round(current_time + outro_duration, 3)
    total_frames = current_frame + outro_frames
    
    metadata = {
        "cover_duration": cover_duration,
        "cover_frames": cover_frames,
        "outro_duration": outro_duration,
        "outro_frames": outro_frames,
        "total_duration": total_duration,
        "total_frames": total_frames,
        "fps": FPS,
        "lines": line_data
    }
    
    json_path = os.path.join(REMOTION_PUBLIC, "full_preconception_metadata.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
        
    print(f"Full audio metadata saved to {json_path}")
    print(f"Total Video Duration: {total_duration}s ({total_frames} frames @ 30 FPS)")
    for l_id, l_info in line_data.items():
        print(f"  Line {l_id}: start={l_info['start_frame']}f ({l_info['start_time']}s), duration={l_info['duration']}s ({l_info['frames']}f)")

if __name__ == "__main__":
    asyncio.run(generate_full_audio())
