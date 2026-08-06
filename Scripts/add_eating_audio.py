import os
import sys
import subprocess

# Voiceover removed completely. Redirecting to background music script.
WORKSPACE_DIR = r"l:\Developer\nutriflow"
MUSIC_SCRIPT = os.path.join(WORKSPACE_DIR, "Scripts", "add_music_to_reel.py")

if __name__ == "__main__":
    print("Voiceover element removed. Running ambient background music integration script...")
    subprocess.run([sys.executable, MUSIC_SCRIPT], check=True)
