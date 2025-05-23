from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io

from model.model import load_model, predict
from utils.transforms import image_transform

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
model = load_model("model/cat_model.pth")

@app.route('/predict', methods=['POST'])
def predict_route():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    img_file = request.files['image']
    image = Image.open(io.BytesIO(img_file.read())).convert('RGB')
    tensor = image_transform(image).unsqueeze(0)

    result = predict(model, tensor)
    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
