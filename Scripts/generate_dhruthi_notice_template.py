import os
import sys
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

# Define paths
WORKSPACE_DIR = r"l:\Developer\nutriflow"
ARTIFACTS_DIR = r"C:\Users\skisa\.gemini\antigravity-ide\brain\85c55362-a08e-49a0-8420-91d171cd5694"
FONT_DIR = r"l:\Developer\nutriflow\.agents\skills\canvas-design\canvas-fonts"
LOGO_PATH = os.path.join(WORKSPACE_DIR, "Images", "Logo_D.png")

OUTPUT_PNG_WS = os.path.join(WORKSPACE_DIR, "Dhruthi_Wellness_Notice_Template.png")
OUTPUT_PDF_WS = os.path.join(WORKSPACE_DIR, "Dhruthi_Wellness_Notice_Template.pdf")

OUTPUT_PNG_ART = os.path.join(ARTIFACTS_DIR, "Dhruthi_Wellness_Notice_Template.png")
OUTPUT_PDF_ART = os.path.join(ARTIFACTS_DIR, "Dhruthi_Wellness_Notice_Template.pdf")

# Brand Color Palette (Dhruthi Wellness - Premium Natural Aesthetics)
COLOR_BG_GRAD_TOP = (238, 246, 241)     # Soft Light Mint (#EEF6F1)
COLOR_BG_GRAD_BOT = (195, 222, 206)     # Fresh Emerald Tint (#C3DECE)

COLOR_CARD_BG = (255, 255, 255)        # Pristine White
COLOR_CARD_FOLD = (222, 236, 228)      # Paper fold tint

COLOR_BOX_BG = (244, 249, 245)         # Soft Sage Message Container
COLOR_BOX_BORDER = (205, 225, 213)     # Border tint
COLOR_ACCENT_GREEN = (28, 53, 45)      # Deep Forest Green (#1C352D)

COLOR_TEXT_DARK = (28, 53, 45)         # Deep Forest Green (#1C352D)
COLOR_TEXT_MUTED = (55, 75, 65)        # Muted Charcoal Green
COLOR_GOLD = (212, 175, 55)            # Warm Champagne Gold (#D4AF37)

COLOR_ENVELOPE_BODY = (40, 75, 60)     # Rich Emerald Envelope Body
COLOR_ENVELOPE_FLAP = (60, 105, 85)
COLOR_ENVELOPE_INNER = (120, 165, 145)

def get_font(font_name, size):
    font_path = os.path.join(FONT_DIR, font_name)
    if os.path.exists(font_path):
        return ImageFont.truetype(font_path, size)
    else:
        return ImageFont.load_default()

def draw_rounded_rectangle(draw, xy, corner_radius, fill=None, outline=None, width=1):
    x1, y1, x2, y2 = xy
    draw.rounded_rectangle([x1, y1, x2, y2], radius=corner_radius, fill=fill, outline=outline, width=width)

def create_background(width, height):
    bg = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(bg)
    
    # Smooth vertical gradient
    for y in range(height):
        t = y / height
        r = int(COLOR_BG_GRAD_TOP[0] * (1 - t) + COLOR_BG_GRAD_BOT[0] * t)
        g = int(COLOR_BG_GRAD_TOP[1] * (1 - t) + COLOR_BG_GRAD_BOT[1] * t)
        b = int(COLOR_BG_GRAD_TOP[2] * (1 - t) + COLOR_BG_GRAD_BOT[2] * t)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))
        
    # Ambient glowing layered circles
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    ov_draw = ImageDraw.Draw(overlay)
    
    # Upper-left soft white glow
    ov_draw.ellipse([-100, -100, 500, 500], fill=(255, 255, 255, 60))
    # Upper-right gold glow behind badge area
    ov_draw.ellipse([650, -80, 1150, 420], fill=(245, 225, 170, 50))
    # Bottom-right emerald soft orb
    ov_draw.ellipse([550, 550, 1200, 1200], fill=(130, 185, 160, 75))
    
    bg = Image.alpha_composite(bg, overlay)
    return bg

def draw_3d_envelope(canvas, x, y, width, height):
    """Draws an ultra-clean 3D envelope graphic with gold leaf wax seal in bottom right."""
    env_layer = Image.new("RGBA", (canvas.width, canvas.height), (0, 0, 0, 0))
    
    # Shadow
    sh_layer = Image.new("RGBA", (canvas.width, canvas.height), (0, 0, 0, 0))
    sh_draw = ImageDraw.Draw(sh_layer)
    sh_draw.rounded_rectangle([x + 8, y + 16, x + width + 20, y + height + 24], radius=20, fill=(15, 38, 28, 65))
    sh_layer = sh_layer.filter(ImageFilter.GaussianBlur(14))
    env_layer = Image.alpha_composite(env_layer, sh_layer)
    
    draw = ImageDraw.Draw(env_layer)
    
    # Envelope Main Base
    draw_rounded_rectangle(draw, [x, y, x + width, y + height], corner_radius=20, fill=COLOR_ENVELOPE_INNER)
    
    # Left & Right interior flap shadow triangles
    draw.polygon([(x, y), (x + width * 0.48, y + height * 0.55), (x, y + height)], fill=(30, 58, 48))
    draw.polygon([(x + width, y), (x + width * 0.52, y + height * 0.55), (x + width, y + height)], fill=(30, 58, 48))
    
    # Bottom flap
    draw.polygon([(x, y + height), (x + width * 0.5, y + height * 0.44), (x + width, y + height)], fill=COLOR_ENVELOPE_BODY)
    
    # Top opening flap
    draw.polygon([(x, y), (x + width * 0.5, y + height * 0.48), (x + width, y)], fill=COLOR_ENVELOPE_FLAP)
    # Gold flap trim
    draw.line([(x, y), (x + width * 0.5, y + height * 0.48)], fill=COLOR_GOLD, width=3)
    draw.line([(x + width * 0.5, y + height * 0.48), (x + width, y)], fill=COLOR_GOLD, width=3)
    
    # Wax Seal with Gold Trim at flap point
    seal_cx, seal_cy = x + width * 0.5, y + height * 0.48
    seal_r = 22
    draw.ellipse([seal_cx - seal_r, seal_cy - seal_r, seal_cx + seal_r, seal_cy + seal_r], fill=COLOR_GOLD, outline=(255, 240, 180), width=2)
    # Leaf symbol on seal
    draw.ellipse([seal_cx - 7, seal_cy - 10, seal_cx + 7, seal_cy + 8], fill=None, outline=COLOR_ACCENT_GREEN, width=2)
    
    return Image.alpha_composite(canvas, env_layer)

def generate_template():
    # 1040 x 1040 Square Canvas (Original Overlapping Top-Right Badge Style restored without collisions!)
    W, H = 1040, 1040
    print("Generating Restored Dhruthi Wellness Notice Template (Top-Right Overlapping Badge)...")
    
    # 1. Base Background
    img = create_background(W, H)
    
    # 2. Draw 3D Envelope snugly at bottom right
    img = draw_3d_envelope(img, x=630, y=740, width=370, height=250)
    
    # 3. Main Paper Sheet / Card
    card_x1, card_y1 = 65, 75
    card_w, card_h = 780, 890
    card_x2, card_y2 = card_x1 + card_w, card_y1 + card_h
    corner_radius = 28
    fold_w, fold_h = 75, 75
    
    # Card Shadow
    shadow_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sh_draw = ImageDraw.Draw(shadow_layer)
    sh_draw.rounded_rectangle([card_x1 + 8, card_y1 + 14, card_x2 + 14, card_y2 + 18], radius=corner_radius, fill=(15, 40, 30, 45))
    sh_draw.rounded_rectangle([card_x1 + 3, card_y1 + 6, card_x2 + 6, card_y2 + 8], radius=corner_radius, fill=(15, 40, 30, 20))
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(14))
    img = Image.alpha_composite(img, shadow_layer)
    
    # Main White Card Layer
    card_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(card_layer)
    
    # Draw main card base
    c_draw.rounded_rectangle([card_x1, card_y1, card_x2, card_y2], radius=corner_radius, fill=COLOR_CARD_BG)
    
    # Folded Corner detail (Top Right)
    fold_pts = [
        (card_x2 - fold_w, card_y1),
        (card_x2 - fold_w, card_y1 + fold_h),
        (card_x2, card_y1 + fold_h)
    ]
    c_draw.polygon(fold_pts, fill=COLOR_CARD_FOLD)
    c_draw.line([(card_x2 - fold_w, card_y1), (card_x2 - fold_w, card_y1 + fold_h), (card_x2, card_y1 + fold_h)], fill=(165, 190, 178), width=3)
    
    # Gold header accent bar on top left
    c_draw.rounded_rectangle([card_x1 + 45, card_y1 + 45, card_x1 + 190, card_y1 + 51], radius=3, fill=COLOR_GOLD)
    
    img = Image.alpha_composite(img, card_layer)
    
    # 4. Floating Top-Right Circular Dhruthi Logo Badge (Restored Overlapping Style!)
    badge_cx, badge_cy = 855, 165
    badge_r = 130
    
    # Badge shadow
    b_shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    bs_draw = ImageDraw.Draw(b_shadow)
    bs_draw.ellipse([badge_cx - badge_r + 4, badge_cy - badge_r + 6, badge_cx + badge_r + 6, badge_cy + badge_r + 10], fill=(15, 40, 30, 50))
    b_shadow = b_shadow.filter(ImageFilter.GaussianBlur(10))
    img = Image.alpha_composite(img, b_shadow)
    
    # Badge Base & Dual Gold-Emerald Ring
    badge_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(badge_layer)
    
    # Outer Gold Ring
    b_draw.ellipse([badge_cx - badge_r, badge_cy - badge_r, badge_cx + badge_r, badge_cy + badge_r], fill=COLOR_GOLD)
    # Middle Emerald Ring
    b_draw.ellipse([badge_cx - badge_r + 3, badge_cy - badge_r + 3, badge_cx + badge_r - 3, badge_cy + badge_r - 3], fill=COLOR_ACCENT_GREEN)
    # Inner White Circle
    b_draw.ellipse([badge_cx - badge_r + 6, badge_cy - badge_r + 6, badge_cx + badge_r - 6, badge_cy + badge_r - 6], fill=(255, 255, 255))
    
    # Paste Logo_D.png centered in badge
    if os.path.exists(LOGO_PATH):
        logo_raw = Image.open(LOGO_PATH).convert("RGBA")
        
        logo_target_size = (badge_r - 10) * 2
        logo_resized = logo_raw.resize((logo_target_size, logo_target_size), Image.Resampling.LANCZOS)
        
        # Mask for clean circle fit
        mask = Image.new("L", (logo_target_size, logo_target_size), 0)
        m_draw = ImageDraw.Draw(mask)
        m_draw.ellipse([0, 0, logo_target_size, logo_target_size], fill=255)
        
        logo_badge = Image.new("RGBA", (logo_target_size, logo_target_size), (0, 0, 0, 0))
        logo_badge.paste(logo_resized, (0, 0), mask=mask)
        
        badge_layer.paste(logo_badge, (badge_cx - badge_r + 10, badge_cy - badge_r + 10), logo_badge)
    else:
        print("Logo not found at path:", LOGO_PATH)
        
    img = Image.alpha_composite(img, badge_layer)
    
    # 5. Text Content Inside Main Card (Width = 590px, ending at x = 710px, so it NEVER touches badge left edge x = 725px!)
    draw = ImageDraw.Draw(img)
    
    font_greeting = get_font("Lora-Bold.ttf", 42)
    font_body = get_font("Outfit-Regular.ttf", 32)
    font_email = get_font("Outfit-Bold.ttf", 32)
    font_thanks = get_font("Outfit-Regular.ttf", 30)
    font_ops = get_font("Outfit-Bold.ttf", 38)
    font_slogan = get_font("Outfit-Bold.ttf", 18)
    
    # Section A: "Hello Client,"
    g_x, g_y = card_x1 + 45, card_y1 + 75
    draw_rounded_rectangle(draw, [g_x, g_y, g_x + 330, g_y + 75], corner_radius=16, fill=(238, 246, 241))
    draw.text((g_x + 24, g_y + 14), "Hello Client,", font=font_greeting, fill=COLOR_TEXT_DARK)
    
    # Section B: Main Message Box (x2 = 705px -> Clears floating badge at x = 725px!)
    msg_x1, msg_y1 = card_x1 + 45, card_y1 + 185
    msg_w, msg_h = 595, 290
    msg_x2, msg_y2 = msg_x1 + msg_w, msg_y1 + msg_h
    
    # Box Background
    draw_rounded_rectangle(draw, [msg_x1, msg_y1, msg_x2, msg_y2], corner_radius=22, fill=COLOR_BOX_BG, outline=COLOR_BOX_BORDER, width=2)
    
    # Left accent vertical bar
    draw_rounded_rectangle(draw, [msg_x1 + 4, msg_y1 + 14, msg_x1 + 12, msg_y2 - 14], corner_radius=4, fill=COLOR_ACCENT_GREEN)
    
    # Text lines inside message container
    tx = msg_x1 + 34
    ty = msg_y1 + 32
    line_gap = 56
    
    draw.text((tx, ty), "For any concerns, please", font=font_body, fill=COLOR_TEXT_MUTED)
    draw.text((tx, ty + line_gap), "reach out exclusively", font=font_body, fill=COLOR_TEXT_MUTED)
    
    # Line 3: "to dhruthiwellness@gmail.com"
    ty_email = ty + line_gap * 2 + 8
    
    draw.text((tx, ty_email), "to ", font=font_body, fill=COLOR_TEXT_MUTED)
    to_w = draw.textlength("to ", font=font_body)
    
    email_str = "dhruthiwellness@gmail.com"
    email_x = tx + to_w
    email_w = draw.textlength(email_str, font=font_email)
    
    # Email highlight container
    draw_rounded_rectangle(draw, [email_x - 6, ty_email - 5, email_x + email_w + 8, ty_email + 46], corner_radius=10, fill=(225, 238, 230))
    # Email text
    draw.text((email_x, ty_email), email_str, font=font_email, fill=COLOR_TEXT_DARK)
    # Gold accent underline
    draw.line([(email_x, ty_email + 40), (email_x + email_w, ty_email + 40)], fill=COLOR_GOLD, width=3)
    
    # Section C: "Thanks," and "Dhruthi Wellness Team"
    th_x, th_y = card_x1 + 45, card_y1 + 510
    th_w, th_h = 595, 220
    th_x2, th_y2 = th_x + th_w, th_y + th_h
    
    # Thanks Box Container
    draw_rounded_rectangle(draw, [th_x, th_y, th_x2, th_y2], corner_radius=22, fill=(238, 246, 241), outline=COLOR_BOX_BORDER, width=1)
    
    draw.text((th_x + 36, th_y + 30), "Thanks,", font=font_thanks, fill=COLOR_TEXT_MUTED)
    draw.text((th_x + 36, th_y + 82), "Dhruthi Wellness Team", font=font_ops, fill=COLOR_TEXT_DARK)
    
    # Bottom brand slogan footer inside thanks box
    slogan_text = "NOURISH  •  BALANCE  •  THRIVE"
    draw.text((th_x + 36, th_y + 155), slogan_text, font=font_slogan, fill=COLOR_GOLD)
    
    # Ensure output directories exist
    os.makedirs(WORKSPACE_DIR, exist_ok=True)
    os.makedirs(ARTIFACTS_DIR, exist_ok=True)
    
    # Save PNG with optimize=True
    img.save(OUTPUT_PNG_WS, "PNG", optimize=True)
    img.save(OUTPUT_PNG_ART, "PNG", optimize=True)
    print(f"Saved restored PNG to:\n  - {OUTPUT_PNG_WS}\n  - {OUTPUT_PNG_ART}")
    
    # Convert PNG to PDF
    img_rgb = img.convert("RGB")
    img_rgb.save(OUTPUT_PDF_WS, "PDF", resolution=300.0)
    img_rgb.save(OUTPUT_PDF_ART, "PDF", resolution=300.0)
    print(f"Saved PDF to:\n  - {OUTPUT_PDF_WS}\n  - {OUTPUT_PDF_ART}")
    
    print("Generation completed successfully!")

if __name__ == "__main__":
    generate_template()
