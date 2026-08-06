import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_og_image():
    # 1200 x 630 standard OpenGraph dimensions
    width, height = 1200, 630
    
    # Create base canvas with warm ivory color (#FAF8F4)
    canvas = Image.new('RGBA', (width, height), (250, 248, 244, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Color palette
    sage = (45, 82, 57)
    sage_light = (59, 110, 76)
    sage_soft = (235, 242, 237)
    gold = (197, 160, 89)
    dark_text = (28, 53, 35)
    muted_text = (70, 95, 78)
    
    # Draw left accent bar & top/bottom decorative borders
    draw.rectangle([0, 0, 16, height], fill=sage)
    draw.rectangle([0, 0, width, 8], fill=gold)
    draw.rectangle([0, height - 8, width, height], fill=sage)
    
    # Draw subtle background decorative glowing ellipses
    glow_mask = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_mask)
    glow_draw.ellipse([800, -100, 1300, 400], fill=(235, 242, 237, 180))
    glow_draw.ellipse([-100, 350, 400, 850], fill=(245, 238, 222, 140))
    canvas = Image.alpha_composite(canvas, glow_mask)
    draw = ImageDraw.Draw(canvas)
    
    # Load & process Logo_D_bright.png
    logo_path = r'l:\Developer\nutriflow\Images\Logo_D_bright.png'
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert('RGBA')
        logo_size = 270
        logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
        
        # Create a beautiful rounded card frame for logo
        frame_size = 310
        frame_x, frame_y = 65, (height - frame_size) // 2
        
        # Draw frame shadow & background
        shadow = Image.new('RGBA', (width, height), (0,0,0,0))
        s_draw = ImageDraw.Draw(shadow)
        s_draw.rounded_rectangle([frame_x+4, frame_y+6, frame_x+frame_size+4, frame_y+frame_size+6], radius=32, fill=(0,0,0,25))
        shadow = shadow.filter(ImageFilter.GaussianBlur(12))
        canvas = Image.alpha_composite(canvas, shadow)
        draw = ImageDraw.Draw(canvas)
        
        draw.rounded_rectangle([frame_x, frame_y, frame_x+frame_size, frame_y+frame_size], radius=32, fill=(255, 255, 255, 255), outline=gold, width=2)
        
        # Paste logo inside frame
        logo_x = frame_x + (frame_size - logo_size) // 2
        logo_y = frame_y + (frame_size - logo_size) // 2
        canvas.paste(logo, (logo_x, logo_y), logo)
        draw = ImageDraw.Draw(canvas)

    # Typography & Text Content
    text_start_x = 425
    
    # Fonts
    try:
        font_serif_bold_large = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 58)
        font_serif_bold_med = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 30)
        font_sans_bold = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 15)
        font_sans_regular = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 19)
        font_sans_small = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 15)
    except Exception:
        font_serif_bold_large = font_serif_bold_med = font_sans_bold = font_sans_regular = font_sans_small = ImageFont.load_default()
        
    # 1. Top Badge / Sub-tag
    badge_y = 105
    badge_text = "CLINICAL & FERTILITY NUTRITION"
    draw.rounded_rectangle([text_start_x, badge_y, text_start_x + 335, badge_y + 32], radius=16, fill=sage_soft)
    draw.text((text_start_x + 16, badge_y + 7), badge_text, fill=sage, font=font_sans_bold)
    
    # 2. Main Title: Dhruthi Wellness
    title_y = badge_y + 48
    draw.text((text_start_x, title_y), "Dhruthi Wellness", fill=dark_text, font=font_serif_bold_large)
    
    # 3. Subtitle / Value Proposition
    sub_y = title_y + 76
    draw.text((text_start_x, sub_y), "Evidence-Based Personalized Nutrition", fill=sage_light, font=font_serif_bold_med)
    
    # 4. Founder Credentials Badge
    founder_y = sub_y + 55
    founder_text = "Dt. Akhila Konakalla  |  M.Sc. Clinical Nutritionist"
    draw.rounded_rectangle([text_start_x, founder_y, text_start_x + 475, founder_y + 38], radius=19, fill=(255, 255, 255, 230), outline=gold, width=1)
    draw.text((text_start_x + 18, founder_y + 8), founder_text, fill=dark_text, font=font_sans_regular)
    
    # 5. Specialty Chips / Tags at bottom
    chips_y = founder_y + 62
    chips = ["PCOD & PCOS", "Fertility Care", "Pregnancy", "Weight Loss", "Diabetes"]
    chip_x = text_start_x
    
    for chip in chips:
        bbox = font_sans_small.getbbox(chip)
        tw = bbox[2] - bbox[0]
        chip_w = tw + 24
        
        draw.rounded_rectangle([chip_x, chips_y, chip_x + chip_w, chips_y + 32], radius=16, fill=(255, 255, 255, 210), outline=(215, 225, 218), width=1)
        draw.text((chip_x + 12, chips_y + 6), chip, fill=muted_text, font=font_sans_small)
        chip_x += chip_w + 10
        
    # 6. Bottom Website Link
    url_y = height - 58
    draw.text((text_start_x, url_y), "www.dhruthiwellness.com", fill=sage, font=font_sans_bold)
    draw.text((text_start_x + 230, url_y), "•  Holistic Health & Sustainable Wellness", fill=muted_text, font=font_sans_small)

    # Save OpenGraph Image
    og_output_path = r'l:\Developer\nutriflow\Images\og-image.png'
    canvas.convert('RGB').save(og_output_path, 'PNG', quality=95)
    print(f"Successfully generated OpenGraph image: {og_output_path}")

def make_circular(image):
    w, h = image.size
    size = min(w, h)
    left = (w - size) // 2
    top = (h - size) // 2
    cropped = image.crop((left, top, left + size, top + size))
    
    scale = 4
    mask_size = size * scale
    mask = Image.new('L', (mask_size, mask_size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, mask_size, mask_size), fill=255)
    mask = mask.resize((size, size), Image.Resampling.LANCZOS)
    
    output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    output.paste(cropped, (0, 0), mask)
    return output

def create_favicons():
    logo_path = r'l:\Developer\nutriflow\Images\Logo_D_bright.png'
    if os.path.exists(logo_path):
        img = Image.open(logo_path).convert('RGBA')
        circular_img = make_circular(img)
        
        # Save root favicon.png and favicon.ico (circular shape only for favicons)
        circular_img.resize((192, 192), Image.Resampling.LANCZOS).save(r'l:\Developer\nutriflow\favicon.png', 'PNG')
        circular_img.resize((32, 32), Image.Resampling.LANCZOS).save(r'l:\Developer\nutriflow\favicon.ico', format='ICO')
        
        # Save inside Images/
        circular_img.resize((192, 192), Image.Resampling.LANCZOS).save(r'l:\Developer\nutriflow\Images\favicon.png', 'PNG')
        circular_img.resize((180, 180), Image.Resampling.LANCZOS).save(r'l:\Developer\nutriflow\Images\apple-touch-icon.png', 'PNG')
        print("Successfully generated circular favicon files.")

if __name__ == '__main__':
    create_og_image()
    create_favicons()
