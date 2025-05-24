from flask import Blueprint, request, jsonify
from PIL import Image
import io
from model.predict import load_model, predict
from model.transforms import image_transform
from db.mongo import cats_collection
import re

binary_classes = ['not cat', 'cat']
cat_names = ['ashy', 'belle', 'buddy', 'coco', 'flower', 'fred', 'kit',
             'lily', 'm33y thai', 'oreo', 'pip', 'plum', 'putu', 'toothless']

predict_routes = Blueprint('predict_routes', __name__)

@predict_routes.route('/predict', methods=['POST'])
def predict_route():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image = Image.open(io.BytesIO(request.files['image'].read())).convert('RGB')
    tensor = image_transform(image).unsqueeze(0)

    # Step 1: Binary classification
    cat_check_model = load_model("model/cat_classifier.pt", binary_classes)
    binary_result = predict(cat_check_model, tensor)

    if binary_result != 'cat':
        return jsonify({'prediction': 'Not a cat'})

    # Step 2: Specific cat prediction
    full_cat_model = load_model("model/nus_cat_classifier.pt", cat_names)
    raw_prediction = predict(full_cat_model, tensor)
    specific_cat = ' '.join(word.capitalize() for word in raw_prediction.strip().split())

    # Step 3: Find cat in DB and increment count
    cat_doc = cats_collection.find_one(
        {"name": re.compile(f"^{re.escape(specific_cat)}$", re.IGNORECASE)}
    )
    
    if not cat_doc:
        return jsonify({'error': 'Cat not found in DB'}), 404

    cats_collection.update_one(
        {"_id": cat_doc['_id']},
        {"$inc": {"predictionCount": 1}}
    )

    return jsonify({
        'prediction': specific_cat,
        'slug': cat_doc.get('slug', specific_cat.lower().replace(" ", ""))
    })
