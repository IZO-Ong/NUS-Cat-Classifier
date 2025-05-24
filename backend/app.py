from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io

from model.model import load_model, predict
from utils.transforms import image_transform

# Define class lists
binary_classes = ['not cat', 'cat']
cat_names = ['ashy', 'belle', 'buddy', 'coco', 'flower', 'fred', 'kit', 
             'lily', 'm33y thai', 'oreo', 'pip', 'plum', 'putu', 'toothless']

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route('/predict', methods=['POST'])
def predict_route():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    img_file = request.files['image']
    image = Image.open(io.BytesIO(img_file.read())).convert('RGB')
    tensor = image_transform(image).unsqueeze(0)

    # Step 1: Check if it's a cat
    cat_check_model = load_model("model/cat_classifier.pt", binary_classes)
    binary_result = predict(cat_check_model, tensor)

    if binary_result != 'cat':
        return jsonify({'prediction': 'Not a cat'})

    # Step 2: If cat, classify which cat
    full_cat_model = load_model("model/nus_cat_classifier.pt", cat_names)
    specific_cat = predict(full_cat_model, tensor)

    return jsonify({'prediction': specific_cat.capitalize()})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
