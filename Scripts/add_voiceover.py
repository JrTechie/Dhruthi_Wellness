import os
import sys
import asyncio
import edge_tts
import shutil
from moviepy import VideoFileClip, AudioFileClip, CompositeAudioClip

# Define paths
WORKSPACE_DIR = r"l:\Developer\nutriflow"
ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\7f66912d-9634-498a-8da6-b0a04a0183c6"

INPUT_VIDEO = os.path.join(WORKSPACE_DIR, "Reels finalised", "dhruthi_wellness_reel.mp4")
OUTPUT_VIDEO = os.path.join(WORKSPACE_DIR, "Reels finalised", "dhruthi_wellness_reel_temp.mp4")
FINAL_VIDEO = os.path.join(WORKSPACE_DIR, "Reels finalised", "dhruthi_wellness_reel.mp4")
ARTIFACT_VIDEO = os.path.join(ARTIFACTS_DIR, "dhruthi_wellness_reel.mp4")

# Voice script segments matched to scene timings
# en-US-JennyNeural is a highly professional, soft, and warm female neural voice
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

async def main():
    print("Step 1: Generating neural voice-over segments...")
    audio_files = {}
    for scene_id, (text, start_time) in SCRIPTS.items():
        filename = os.path.join(ARTIFACTS_DIR, f"voice_scene_{scene_id}.mp3")
        await generate_speech_segment(text, filename)
        audio_files[scene_id] = (filename, start_time)
        
    print("\nStep 2: Merging audio segments with video using moviepy...")
    if not os.path.exists(INPUT_VIDEO):
        print(f"Error: Input video not found at {INPUT_VIDEO}")
        sys.exit(1)
        
    # Open video clip
    video = VideoFileClip(INPUT_VIDEO)
    
    # Load audio segments and schedule them at their start times
    audio_clips = []
    for scene_id, (filename, start_time) in audio_files.items():
        clip = AudioFileClip(filename).with_start(start_time)
        audio_clips.append(clip)
        
    # Compose audios
    composite_audio = CompositeAudioClip(audio_clips)
    
    # Set video audio
    video_with_audio = video.with_audio(composite_audio)
    
    # Write output video with H.264 video codec and AAC audio codec
    # This maintains full WhatsApp and mobile compatibility
    print(f"Writing compiled video with audio to {OUTPUT_VIDEO}...")
    video_with_audio.write_videofile(
        OUTPUT_VIDEO,
        codec="libx264",
        audio_codec="aac",
        temp_audiofile=os.path.join(ARTIFACTS_DIR, "temp-audio.m4a"),
        remove_temp=True
    )
    
    # Close clips to release files
    video.close()
    video_with_audio.close()
    for clip in audio_clips:
        clip.close()
        
    # Replace original video with the voiced version
    print("Replacing video with voiced version...")
    if os.path.exists(FINAL_VIDEO):
        os.remove(FINAL_VIDEO)
    shutil.move(OUTPUT_VIDEO, FINAL_VIDEO)
    
    # Copy to artifacts
    print(f"Copying final voiced video to artifacts directory at {ARTIFACT_VIDEO}...")
    shutil.copy(FINAL_VIDEO, ARTIFACT_VIDEO)
    
    # Cleanup segment files
    print("Cleaning up temporary audio files...")
    for filename, _ in audio_files.values():
        if os.path.exists(filename):
            os.remove(filename)
            
    print("Voice-over integration complete! Video is ready and fully compatible with WhatsApp.")

if __name__ == "__main__":
    asyncio.run(main())
