import os
import sys
import json
import wave
import numpy as np
from moviepy import AudioFileClip

WORKSPACE_DIR = r"l:\Developer\nutriflow"
REMOTION_PUBLIC = os.path.join(WORKSPACE_DIR, "remotion-video", "public", "assets")
os.makedirs(REMOTION_PUBLIC, exist_ok=True)

ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\4ebff9c7-9d71-4221-a529-25b0934a0d54"

input_audio = os.path.join(WORKSPACE_DIR, "Audios", "8-8-01.mp4")
target_mp4 = os.path.join(REMOTION_PUBLIC, "human_voiceover.mp4")
target_wav = os.path.join(ARTIFACTS_DIR, "human_voiceover.wav")

def process():
    aclip = AudioFileClip(input_audio)
    duration = aclip.duration
    aclip.write_audiofile(target_wav, fps=16000, logger=None)
    aclip.close()
    
    import shutil
    shutil.copy(input_audio, target_mp4)
    
    FPS = 30
    frames_count = int(duration * FPS)
    
    with wave.open(target_wav, 'rb') as wf:
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
                
    cover_duration = 3.0
    cover_frames = int(cover_duration * FPS)
    
    total_duration = round(cover_duration + duration + 3.0, 3)
    total_frames = cover_frames + frames_count + 90
    
    metadata = {
        "cover_duration": cover_duration,
        "cover_frames": cover_frames,
        "voiceover_duration": round(duration, 3),
        "voiceover_frames": frames_count,
        "total_duration": total_duration,
        "total_frames": total_frames,
        "fps": FPS,
        "envelope": envelope
    }
    
    json_path = os.path.join(REMOTION_PUBLIC, "human_voiceover_metadata.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
        
    print(f"Saved human voiceover metadata to {json_path}")
    print(f"Voiceover Duration: {duration}s ({frames_count} frames)")
    print(f"Total Video Duration: {total_duration}s ({total_frames} frames)")

if __name__ == "__main__":
    process()
