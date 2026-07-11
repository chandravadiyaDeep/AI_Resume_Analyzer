from flask import Flask, request, jsonify, send_from_directory
import pdfplumber
import google.generativeai as genai
import os

app = Flask(
    __name__,
    static_folder=".",
    static_url_path=""
)

# -----------------------------
# Gemini API Configuration
# -----------------------------

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

@app.route("/googlea22937c2046439e8.html")
def google_verification():
    return send_from_directory(".", "googlea22937c2046439e8.html")


@app.route("/")
def home():
    return send_from_directory(".", "index.html")


@app.route("/analyze", methods=["POST"])
def analyze_resume():

    if "resume" not in request.files:
        return jsonify({"error": "No resume uploaded"}), 400

    file = request.files["resume"]

    resume_text = ""

    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                resume_text += text + "\n"

    prompt = f"""
You are an ATS Resume Analyzer.

Analyze the following resume.

Return ONLY in this format:

Resume Score: xx/100

Strengths:
- ...

Weaknesses:
- ...

Missing Skills:
- ...

Suggestions:
- ...

Resume:
{resume_text}
"""

    response = model.generate_content(prompt)

    return jsonify({
        "analysis": response.text
    })


if __name__ == "__main__":
    app.run(debug=True)