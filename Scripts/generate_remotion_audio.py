import os
import sys
import asyncio
import urllib.request
import edge_tts

# Define paths
WORKSPACE_DIR = r"l:\Developer\nutriflow"
PUBLIC_DIR = os.path.join(WORKSPACE_DIR, "remotion-video", "public")
os.makedirs(PUBLIC_DIR, exist_ok=True)

# Stanford CCRMA pleasant piano track URL
MUSIC_URL = "https://ccrma.stanford.edu/~jos/mp3/pno-cs.mp3"
LOCAL_MUSIC = os.path.join(PUBLIC_DIR, "piano.mp3")

# Voice script segments matched to scene timings
VOICE_NAME = "en-US-JennyNeural"
SCRIPTS = {
    1: "Hungry... or just sleep deprived? Late-night snacking is often a cry for rest, not a cry for calories.",
    2: "When sleep goes down, your brain's reward centers demand quick energy. Appetite and cravings spike by forty-five percent. It is biology, not willpower.",
    3: "It's a chemical cycle. Sleep deprivation spikes the hunger hormone ghrelin, and suppresses the fullness hormone leptin. Your body is chemically programmed to crave quick-energy carbs.",
    4: "Reset your baseline. Prioritize seven to nine hours of sleep to naturally stabilize your appetite and build sustainable metabolic habits. Nourish, rest, reset.",
    5: "Sleep better. Eat smarter. Book your personalized nutrition and lifestyle consultation with Dhruthi Wellness today."
}

def download_music():
    print(f"Downloading pleasant piano track from {MUSIC_URL}...")
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

async def generate_speech_segment(text, filename):
    print(f"Generating voice for: '{text[:40]}...'")
    communicate = edge_tts.Communicate(text, VOICE_NAME, rate="+0%")
    await communicate.save(filename)

async def main():
    # 1. Download piano background music
    download_music()
    
    # 2. Generate voice segments
    print("\nGenerating neural voice-over segments...")
    for scene_id, text in SCRIPTS.items():
        filename = os.path.join(PUBLIC_DIR, f"voice_scene_{scene_id}.mp3")
        await generate_speech_segment(text, filename)
        
    print("\nAudio asset generation complete! Files saved directly to remotion-video/public/")

if __name__ == "__main__":
    asyncio.run(main())
