import os
import sys
import asyncio
import edge_tts

PUBLIC_DIR = r"l:\Developer\nutriflow\remotion-video\public"
os.makedirs(PUBLIC_DIR, exist_ok=True)

VOICE_NAME = "en-US-JennyNeural"

SCRIPTS = {
    1: "Did you know breast milk is made of mostly water? That's why staying well hydrated matters so much during breastfeeding.",
    2: "Aim for 2.5 to 3.5 liters of fluids daily. You can sip coconut water, refreshing buttermilk, nourishing soups, or fresh lemon water.",
    3: "When you stay well hydrated, you get more energy and feel refreshed—giving you the strength to care for your baby.",
    4: "Keep a water bottle nearby at all times. Sip water during every feed, and don't wait until you're thirsty.",
    5: "Watch out for signs of dehydration like dry mouth, dark urine, headaches, or extreme tiredness.",
    6: "Remember, taking care of yourself is part of taking care of your baby. A hydrated mom makes a happy feeding journey!"
}

async def generate_speech_segment(text, filename):
    print(f"Generating voice for Scene: '{text[:40]}...'")
    communicate = edge_tts.Communicate(text, VOICE_NAME, rate="-2%", pitch="+1Hz")
    await communicate.save(filename)

async def main():
    print("Generating flowchart reel voice-over segments...")
    for scene_id, text in SCRIPTS.items():
        filename = os.path.join(PUBLIC_DIR, f"voice_fc_scene_{scene_id}.mp3")
        await generate_speech_segment(text, filename)
    print("All audio files generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
