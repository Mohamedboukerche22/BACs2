import os
import json

# Folder containing PDF files
folder_path = "/home/mohamed/Downloads/bac-archive-reader-main (1)/bac-archive-reader-main/public/pdfs"
# Mapping for subject codes
subjects = {
    "Mt": "الرياضيات",
    "Fr": "الفرنسية",
    "Ar": "العربية",
    "An": "الإنجليزية",
    "Py": "الفيزياء",
    "Pl": "العلوم الطبيعية",
    "Ph": "الفلسفة",
    "Hg": "التاريخ والجغرافيا",
}

data = []
id_counter = 1

for filename in os.listdir(folder_path):
    if filename.startswith("Sc") and filename.endswith(".pdf"):
        try:
            year = int(filename[2:6])  
            subject_code = filename[6:8]  
            has_correction = "Co" in filename  

            if subject_code in subjects:
                data.append({
                    "id": str(id_counter),
                    "branch": "علوم تجريبية", 
                    "subject": subjects[subject_code],
                    "year": year,
                    "hasCorrection": has_correction,
                    "pdfUrl": f"/pdfs/{filename}"
                })
                id_counter += 1

        except Exception as e:
            print(f"Skipping file due to error: {filename} ({e})")

output_file = "exam_data.json"
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"✅ Done! Data saved to {output_file}")



