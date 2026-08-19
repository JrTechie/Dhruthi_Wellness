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

SCRIPTS_45S = {
    1: "Are you planning to conceive? Remember—pregnancy preparation shouldn't begin with a positive test. It begins 90 days before conception.",
    2: "Eggs and sperm take 90 days to mature. Active methylfolate, CoQ10, and personalized nutrition today directly dictate your egg quality three months from now.",
    3: "Before trying, screen your key biomarkers—thyroid TSH under 2.5, insulin resistance, ferritin, and vitamin D. Lower systemic inflammation to optimize progesterone.",
    4: "Give your future baby the strongest foundation. Book your preconception consultation with Dhruthi Wellness today."
}

async def generate_45s_audio():
    print("Generating crisp 45s complete reel audio narration...")
    FPS = 30
    
    cover_duration = 2.5
    cover_frames = int(cover_duration * FPS)
    
    current_time = cover_duration
    current_frame = cover_frames
    
    line_data = {}
    
    for line_id in range(1, 5):
        text = SCRIPTS_45S[line_id]
        mp3_name = f"preconception_45s_line_{line_id}.mp3"
        wav_name = f"preconception_45s_line_{line_id}.wav"
        
        mp3_path = os.path.join(REMOTION_PUBLIC, mp3_name)
        wav_path = os.path.join(ARTIFACTS_DIR, wav_name)
        
        # Energetic natural rate for 45s reel
        communicate = edge_tts.Communicate(text, VOICE_NAME, rate="+8%", pitch="+0Hz")
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
                    
        pause_duration = 0.6
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
        
    outro_duration = 3.0
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
    
    json_path = os.path.join(REMOTION_PUBLIC, "preconception_45s_metadata.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
        
    print(f"45s Audio metadata saved to {json_path}")
    print(f"Total Video Duration: {total_duration}s ({total_frames} frames @ 30 FPS)")
    for l_id, l_info in line_data.items():
        print(f"  Line {l_id}: start={l_info['start_frame']}f ({l_info['start_time']}s), duration={l_info['duration']}s ({l_info['frames']}f)")

if __name__ == "__main__":
    asyncio.run(generate_45s_audio())
