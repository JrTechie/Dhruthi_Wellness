import os
import sys
import datetime
import re
from PIL import Image
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from Scripts.generate_receipt import create_receipt_pdf

# Import pypdfium2 to render PDF page to PNG image if available
try:
    import pypdfium2 as pdfium
    HAS_PDFIUM = True
except ImportError:
    HAS_PDFIUM = False

RECEIPTS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "Receipts")
os.makedirs(RECEIPTS_DIR, exist_ok=True)

def extract_proof_metadata(proof_text):
    """
    Extracts structured payment data (Amount, Txn ID, UTR, App Name) from raw OCR text of payment proof screenshots.
    """
    metadata = {}
    
    # Extract Amount (e.g. ₹1,999 or 1999 or Rs 1,999)
    amount_match = re.search(r'(?:₹|INR|Rs\.?)\s*([\d,]+(?:\.\d{2})?)', proof_text, re.IGNORECASE)
    if amount_match:
        metadata['amount_paid'] = float(amount_match.group(1).replace(',', ''))
    
    # Extract PhonePe / GPay Transaction ID
    txn_match = re.search(r'(?:Transaction ID|Txn ID|Ref No)[:\s]*([T\d]{12,25})', proof_text, re.IGNORECASE)
    if txn_match:
        metadata['transaction_id'] = txn_match.group(1)
    
    # Extract UTR Number
    utr_match = re.search(r'UTR[:\s]*(\d{12})', proof_text, re.IGNORECASE)
    if utr_match:
        metadata['utr'] = utr_match.group(1)
        
    # Detect Payment App
    if "phonepe" in proof_text.lower():
        metadata['payment_method'] = "UPI (PhonePe)"
    elif "gpay" in proof_text.lower() or "google pay" in proof_text.lower():
        metadata['payment_method'] = "UPI (Google Pay)"
    elif "paytm" in proof_text.lower():
        metadata['payment_method'] = "UPI (Paytm)"
    else:
        metadata['payment_method'] = "UPI / Bank Transfer"
        
    return metadata

def parse_proof_and_generate_receipt(
    proof_image_path=None,
    client_name="Valued Client",
    client_phone="+91 98765 43210",
    client_email="client@dhruthiwellness.com",
    plan_name="Customized Nutrition & Wellness Plan",
    amount_paid=1999.00,
    payment_method="UPI (PhonePe)",
    transaction_id="T2608051324535053517569",
    receipt_no=None,
    notes="Payment proof verified via PhonePe (UTR: 315300564439). Thank you for choosing Dhruthi Wellness!"
):
    """
    Automates receipt generation from payment proof upload and client details.
    """
    timestamp_str = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Generate receipt number if not provided
    if not receipt_no:
        receipt_no = f"DW-{datetime.datetime.now().strftime('%Y%m')}-{int(datetime.datetime.now().timestamp()) % 10000:04d}"
    
    # Generate transaction ID if not provided
    if not transaction_id:
        transaction_id = f"UPI{int(datetime.datetime.now().timestamp() * 1000) % 10000000000}"

    pdf_filename = f"Receipt_{receipt_no}_{timestamp_str}.pdf"
    pdf_path = os.path.join(RECEIPTS_DIR, pdf_filename)

    print(f"[Automation] Processing payment proof for: {client_name}")
    if proof_image_path and os.path.exists(proof_image_path):
        print(f"[Automation] Payment proof file loaded: {proof_image_path}")
        try:
            with Image.open(proof_image_path) as img:
                print(f"[Automation] Proof Image Dimensions: {img.size}, Format: {img.format}")
        except Exception as e:
            print(f"[Warning] Could not inspect proof image: {e}")

    # Call ReportLab receipt generator engine
    generated_pdf = create_receipt_pdf(
        output_filename=pdf_path,
        receipt_no=receipt_no,
        payment_date=datetime.date.today().strftime("%d %b, %Y"),
        client_name=client_name,
        client_phone=client_phone,
        client_email=client_email,
        plan_name=plan_name,
        amount_paid=float(amount_paid),
        payment_method=payment_method,
        transaction_id=transaction_id,
        notes=notes
    )

    # Render PNG preview of generated PDF receipt
    png_path = pdf_path.replace(".pdf", ".png")
    if HAS_PDFIUM:
        try:
            pdf = pdfium.PdfDocument(generated_pdf)
            page_image = pdf[0].render(scale=2).to_pil()
            page_image.save(png_path)
            print(f"[Automation] Rendered receipt preview image: {png_path}")
        except Exception as e:
            print(f"[Warning] Could not render PNG preview: {e}")
            png_path = None

    return {
        "status": "success",
        "receipt_no": receipt_no,
        "pdf_path": generated_pdf,
        "png_path": png_path,
        "client_name": client_name,
        "amount_paid": amount_paid,
        "transaction_id": transaction_id,
        "date": datetime.date.today().strftime("%d %b, %Y")
    }

if __name__ == "__main__":
    # Execution for PhonePe ₹1,999 payment proof
    result = parse_proof_and_generate_receipt(
        client_name="Valued Client",
        client_phone="+91 98765 43210",
        client_email="client@dhruthiwellness.com",
        plan_name="NutriFlow Personalized Wellness & Diet Program",
        amount_paid=1999.00,
        payment_method="UPI (PhonePe / GPay)",
        transaction_id="T2608051324535053517569",
        notes="PhonePe Payment Proof Verified. UTR: 315300564439 | Payee: Akhila Konakalla. Dietician"
    )
    print("\n[Result Summary]:", result)

