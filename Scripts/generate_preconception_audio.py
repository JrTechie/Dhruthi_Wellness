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

SCRIPTS = {
    1: "Are you planning to conceive? Then remember—pregnancy preparation shouldn't begin with a positive pregnancy test. It begins before conception.",
    2: "Preconception health is about optimizing your nutrition, checking important nutrient needs, supporting metabolic and reproductive health, and addressing lifestyle or medical factors that may affect pregnancy.",
    3: "Throughout this series, I'll take you through an evidence-based fertility nutrition journey—from preconception to conception."
}

async def generate_audio():
    print("Generating audio for 3 narration lines...")
    FPS = 30
    metadata = {}
    
    # 1. Cover Duration: 3 seconds (90 frames)
    cover_duration = 3.0
    cover_frames = int(cover_duration * FPS)
    
    current_time = cover_duration
    current_frame = cover_frames
    
    line_data = {}
    
    for line_id in [1, 2, 3]:
        text = SCRIPTS[line_id]
        mp3_name = f"preconception_line_{line_id}.mp3"
        wav_name = f"preconception_line_{line_id}.wav"
        
        mp3_path = os.path.join(REMOTION_PUBLIC, mp3_name)
        wav_path = os.path.join(ARTIFACTS_DIR, wav_name)
        
        # Synthesize with Edge-TTS
        communicate = edge_tts.Communicate(text, VOICE_NAME, rate="+0%", pitch="+0Hz")
        await communicate.save(mp3_path)
        
        # Convert to WAV to get exact duration & amplitude envelope
        aclip = AudioFileClip(mp3_path)
        aclip.write_audiofile(wav_path, fps=16000, logger=None)
        duration = aclip.duration
        aclip.close()
        
        frames_count = int(duration * FPS)
        
        # Extract frame-by-frame audio envelope
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
                    
        # 0.8s pause between lines (24 frames)
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
        
    # Outro hold: 3.5 seconds (105 frames)
    outro_duration = 3.5
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
    
    json_path = os.path.join(REMOTION_PUBLIC, "preconception_metadata.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
        
    print(f"Audio metadata successfully saved to {json_path}")
    print(f"Total Video Duration: {total_duration}s ({total_frames} frames @ 30 FPS)")
    for l_id, l_info in line_data.items():
        print(f"  Line {l_id}: start={l_info['start_frame']}f ({l_info['start_time']}s), duration={l_info['duration']}s ({l_info['frames']}f)")

if __name__ == "__main__":
    asyncio.run(generate_audio())
