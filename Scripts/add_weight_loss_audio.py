import os
import sys
import asyncio
import urllib.request
import shutil
import edge_tts
from moviepy import VideoFileClip, AudioFileClip, CompositeAudioClip, concatenate_audioclips

# Define paths
WORKSPACE_DIR = r"l:\Developer\nutriflow"
ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\7f66912d-9634-498a-8da6-b0a04a0183c6"

INPUT_VIDEO = os.path.join(WORKSPACE_DIR, "Reels finalised", "dhruthi_weight_loss_reel.mp4")
OUTPUT_TEMP_VIDEO = os.path.join(WORKSPACE_DIR, "Reels finalised", "dhruthi_weight_loss_reel_temp.mp4")
FINAL_VIDEO = os.path.join(WORKSPACE_DIR, "Reels finalised", "dhruthi_weight_loss_reel.mp4")
ARTIFACT_VIDEO = os.path.join(ARTIFACTS_DIR, "dhruthi_weight_loss_reel.mp4")

LOCAL_MUSIC = os.path.join(ARTIFACTS_DIR, "piano.mp3")
MUSIC_URL = "https://ccrma.stanford.edu/~jos/mp3/pno-cs.mp3"

VOICE_NAME = "en-US-JennyNeural"
SCRIPTS = {
    1: ("Doing everything right, eating clean and working out daily, but the scale still won't budge? Plateaued fat loss is not a lack of discipline, it is your body's survival mode.", 0.0),
    2: ("When you cut calories sharply and double workout stress, your body defends energy: cortisol spikes by thirty-five percent, leptin drops, and your metabolism slows down.", 5.0),
    3: ("Stop guessing. Measure the biological friction behind your plateau with comprehensive biomarker and gut microbiome diagnostics.", 10.0),
    4: ("Fix the foundation first: full biomarker panel, circadian rhythm and stress optimization, and precision metabolic nutrition.", 16.0),
    5: ("Stop guessing. Start healing. Book your personalized metabolism assessment with Dhruthi Wellness today.", 22.0)
}

async def generate_speech_segment(text, filename):
    print(f"Generating voice for: '{text[:40]}...'")
    communicate = edge_tts.Communicate(text, VOICE_NAME, rate="+0%")
    await communicate.save(filename)

def download_music():
    if os.path.exists(LOCAL_MUSIC):
        return
    print(f"Downloading pleasant piano track from {MUSIC_URL}...")
    try:
        req = urllib.request.Request(MUSIC_URL, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            with open(LOCAL_MUSIC, 'wb') as f:
                f.write(response.read())
        print("Music downloaded successfully!")
    except Exception as e:
        print(f"Error downloading music: {e}")

async def main():
    print("Step 1: Generating neural voiceover segments...")
    audio_files = {}
    for scene_id, (text, start_time) in SCRIPTS.items():
        filename = os.path.join(ARTIFACTS_DIR, f"wl_voice_scene_{scene_id}.mp3")
        await generate_speech_segment(text, filename)
        audio_files[scene_id] = (filename, start_time)
        
    download_music()
    
    print("\nStep 2: Merging audio & soundtrack with video using moviepy...")
    if not os.path.exists(INPUT_VIDEO):
        print(f"Error: Input video not found at {INPUT_VIDEO}")
        sys.exit(1)
        
    video = VideoFileClip(INPUT_VIDEO)
    
    # Load voiceover clips
    audio_clips = []
    for scene_id, (filename, start_time) in audio_files.items():
        clip = AudioFileClip(filename).with_start(start_time)
        audio_clips.append(clip)
        
    voiceover_audio = CompositeAudioClip(audio_clips)
    
    # Load background piano music
    music = AudioFileClip(LOCAL_MUSIC)
    looped_music = concatenate_audioclips([music, music]).with_duration(video.duration).with_volume_scaled(0.18)
    
    # Combine voiceover and music
    final_audio = CompositeAudioClip([voiceover_audio, looped_music])
    video_with_audio = video.with_audio(final_audio)
    
    print(f"Writing compiled video with full audio to {OUTPUT_TEMP_VIDEO}...")
    video_with_audio.write_videofile(
        OUTPUT_TEMP_VIDEO,
        codec="libx264",
        audio_codec="aac",
        fps=25,
        preset="medium",
        threads=4
    )
    
    video_with_audio.close()
    video.close()
    voiceover_audio.close()
    music.close()
    
    print("Replacing output video with final audio merged video...")
    if os.path.exists(FINAL_VIDEO):
        os.remove(FINAL_VIDEO)
    shutil.move(OUTPUT_TEMP_VIDEO, FINAL_VIDEO)
    
    print(f"Copying final video to artifacts at {ARTIFACT_VIDEO}...")
    shutil.copy(FINAL_VIDEO, ARTIFACT_VIDEO)
    
    print("Cleaning up temporary audio files...")
    for filename, _ in audio_files.values():
        if os.path.exists(filename):
            os.remove(filename)
            
    print("Audio & music integration complete for dhruthi_weight_loss_reel.mp4!")

if __name__ == "__main__":
    asyncio.run(main())
