import os
import sys
import urllib.request
import shutil
from moviepy import VideoFileClip, AudioFileClip, concatenate_audioclips

WORKSPACE_DIR = r"l:\Developer\nutriflow"
ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\848d4a9e-c565-494d-baae-9595b6d8d9f6"

INPUT_VIDEO = os.path.join(WORKSPACE_DIR, "Reels finalised", "eating_remotion.mp4")
OUTPUT_VIDEO = os.path.join(WORKSPACE_DIR, "Reels finalised", "eating_reel_temp.mp4")
FINAL_VIDEO = os.path.join(WORKSPACE_DIR, "Reels finalised", "eating_reel.mp4")
ARTIFACT_VIDEO = os.path.join(ARTIFACTS_DIR, "eating_reel.mp4")

# Calm ambient piano track
MUSIC_URL = "https://ccrma.stanford.edu/~jos/mp3/pno-cs.mp3"
LOCAL_MUSIC = os.path.join(ARTIFACTS_DIR, "ambient_music.mp3")

def download_music():
    print(f"Downloading ambient music track from {MUSIC_URL}...")
    try:
        req = urllib.request.Request(
            MUSIC_URL,
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        with urllib.request.urlopen(req) as response:
            with open(LOCAL_MUSIC, 'wb') as f:
                f.write(response.read())
        print("Music downloaded successfully!")
    except Exception as e:
        print(f"Error downloading music: {e}")
        sys.exit(1)

def apply_background_music():
    print("\nMerging calm background music track with video (no voiceover)...")
    if not os.path.exists(INPUT_VIDEO):
        # Fallback if eating_remotion.mp4 doesn't exist
        fallback = os.path.join(WORKSPACE_DIR, "Reels finalised", "eating_reel.mp4")
        if os.path.exists(fallback):
            video_input = fallback
        else:
            print(f"Error: Input video not found at {INPUT_VIDEO}")
            sys.exit(1)
    else:
        video_input = INPUT_VIDEO
        
    video = VideoFileClip(video_input)
    music = AudioFileClip(LOCAL_MUSIC)
    
    # Loop music to match video duration
    loops_needed = int(video.duration / music.duration) + 1
    looped_music = concatenate_audioclips([music] * loops_needed)
    
    # Trim & scale volume to crisp ambient level
    final_music = looped_music.with_duration(video.duration).with_volume_scaled(0.35)
    
    video_with_music = video.with_audio(final_music)
    
    print(f"Writing video with background music to {OUTPUT_VIDEO}...")
    video_with_music.write_videofile(
        OUTPUT_VIDEO,
        codec="libx264",
        audio_codec="aac",
        temp_audiofile=os.path.join(ARTIFACTS_DIR, "temp-music-audio.m4a"),
        remove_temp=True
    )
    
    video.close()
    video_with_music.close()
    music.close()
    looped_music.close()
    
    print("Replacing video with music version...")
    if os.path.exists(FINAL_VIDEO):
        os.remove(FINAL_VIDEO)
    shutil.move(OUTPUT_VIDEO, FINAL_VIDEO)
    
    print(f"Copying final video to artifacts at {ARTIFACT_VIDEO}...")
    shutil.copy(FINAL_VIDEO, ARTIFACT_VIDEO)
    
    if os.path.exists(LOCAL_MUSIC):
        os.remove(LOCAL_MUSIC)
        
    print("Background music integration complete! Video features pure ambient music without any voiceover.")

if __name__ == "__main__":
    download_music()
    apply_background_music()
