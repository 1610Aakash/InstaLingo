from fastapi import FastAPI
from pydantic import BaseModel
import sys
import os

# Add project root to Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Import from sibling directories
from sentiment import main as sentiment_analyzer
from summarizer import main as summarization
from translator import index as translation
from chatbot import chatbot as chatbot_module  # Renamed to avoid conflict
# from txtToImg import app as txtToImg

app = FastAPI()

# Request model
class TextRequest(BaseModel):
    text: str

@app.post("/sentiment")
def analyze_sentiment(request: TextRequest):
    result = sentiment_analyzer.analyze(request.text)
    return {"sentiment": result}

@app.post("/summarize")
def summarize_text(request: TextRequest):
    result = summarization.summarize(request.text)
    return {"summary": result}

@app.post("/translate")
def translate_text(request: TextRequest):
    result = translation.translate(request.text)
    return {"translation": result}

# @app.post("/generate-image")
# def generate_image(request: TextRequest):
#     image_url = txtToImg.generate(request.text)  # Modify based on your function
#     return {"image_url": image_url}


@app.post("/chatbot")
def chatbot_response(request: TextRequest):
    response = chatbot_module.get_response(request.text)
    return {"reply": response}

if __name__ == "_main_":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)






