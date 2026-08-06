import os
import sys
import urllib.request
import shutil
from moviepy import VideoFileClip, AudioFileClip, concatenate_audioclips

# Define paths
WORKSPACE_DIR = r"l:\Developer\nutriflow"
ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\7f66912d-9634-498a-8da6-b0a04a0183c6"

INPUT_VIDEO = os.path.join(WORKSPACE_DIR, "Reels finalised", "dhruthi_wellness_reel.mp4")
OUTPUT_VIDEO = os.path.join(WORKSPACE_DIR, "Reels finalised", "dhruthi_wellness_reel_temp.mp4")
FINAL_VIDEO = os.path.join(WORKSPACE_DIR, "Reels finalised", "dhruthi_wellness_reel.mp4")
ARTIFACT_VIDEO = os.path.join(ARTIFACTS_DIR, "dhruthi_wellness_reel.mp4")

# Stanford CCRMA pleasant piano track URL
MUSIC_URL = "https://ccrma.stanford.edu/~jos/mp3/pno-cs.mp3"
LOCAL_MUSIC = os.path.join(ARTIFACTS_DIR, "piano.mp3")

def download_music():
    print(f"Downloading pleasant piano track from {MUSIC_URL}...")
    try:
        # Standard urllib request with User-Agent header (just in case)
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

def merge_music():
    print("\nMerging looped background music with video...")
    if not os.path.exists(INPUT_VIDEO):
        print(f"Error: Input video not found at {INPUT_VIDEO}")
        sys.exit(1)
        
    # Open video clip
    video = VideoFileClip(INPUT_VIDEO)
    
    # Load music track
    music = AudioFileClip(LOCAL_MUSIC)
    
    # Since the music is 20s long and the video is 28s long, we loop the music
    # by concatenating two copies of it to get 40s total
    print("Looping music track to match video duration...")
    looped_music = concatenate_audioclips([music, music])
    
    final_music = looped_music.with_duration(video.duration).with_volume_scaled(0.20)
    
    # Set video audio to the looped piano music
    video_with_music = video.with_audio(final_music)
    
    # Write output video with H.264 video codec and AAC audio codec
    print(f"Writing compiled video with music to {OUTPUT_VIDEO}...")
    video_with_music.write_videofile(
        OUTPUT_VIDEO,
        codec="libx264",
        audio_codec="aac",
        temp_audiofile=os.path.join(ARTIFACTS_DIR, "temp-audio.m4a"),
        remove_temp=True
    )
    
    # Close clips to release files
    video.close()
    video_with_music.close()
    music.close()
    looped_music.close()
    
    # Replace original video with the musiced version
    print("Replacing video with musiced version...")
    if os.path.exists(FINAL_VIDEO):
        os.remove(FINAL_VIDEO)
    shutil.move(OUTPUT_VIDEO, FINAL_VIDEO)
    
    # Copy to artifacts
    print(f"Copying final video to artifacts directory at {ARTIFACT_VIDEO}...")
    shutil.copy(FINAL_VIDEO, ARTIFACT_VIDEO)
    
    # Cleanup local music file
    print("Cleaning up temporary files...")
    if os.path.exists(LOCAL_MUSIC):
        os.remove(LOCAL_MUSIC)
        
    print("Music integration complete! Video is ready and fully compatible with WhatsApp.")

if __name__ == "__main__":
    download_music()
    merge_music()
