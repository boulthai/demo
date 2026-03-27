import fitz
import sys

def main():
    pdf_path = r"E:\Boul\Chương trình đào tạo\Public\FORVAL Public Training Bi-Fold Brochure.pdf"
    print(f"Opening: {pdf_path}")
    try:
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
            
        with open("extracted_text.txt", "w", encoding="utf-8") as f:
            f.write(text)
        print("Done!")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
