import fitz
import sys

def extract_text(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_pdf.py <pdf_path>")
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    print(extract_text(pdf_path))
