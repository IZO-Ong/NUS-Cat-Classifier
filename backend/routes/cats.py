from flask import Blueprint, jsonify, request
from db.mongo import cats_collection
import re
from models.cat import create_cat_document

cat_routes = Blueprint('cat_routes', __name__)

@cat_routes.route('/api/cats', methods=['GET'])
def get_all_cats():
    cats = list(cats_collection.find())
    for cat in cats:
        cat['_id'] = str(cat['_id'])
    return jsonify(cats)

@cat_routes.route('/cats/<slug>', methods=['GET'])
def get_cat_by_slug(slug):
    cat = cats_collection.find_one({"slug": slug})
    if not cat:
        return jsonify({'error': 'Cat not found'}), 404
    cat['_id'] = str(cat['_id'])
    return jsonify(cat)


@cat_routes.route('/api/cats/<name>/predict', methods=['PATCH'])
def increment_prediction(name):
    specific_cat = name.strip()
    result = cats_collection.update_one(
        {"name": {"$regex": f"^{re.escape(specific_cat)}$", "$options": "i"}},
        {"$inc": {"predictionCount": 1}}
    )
    if result.matched_count == 0:
        return jsonify({'error': 'Cat not found'}), 404
    return jsonify({'message': f'{name} prediction count incremented'})

@cat_routes.route('/api/cats', methods=['POST'])
def add_cat():
    data = request.get_json()

    required_fields = ["name", "location", "likes", "sex"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing fields"}), 400

    cat_name = data["name"].strip()
    existing = cats_collection.find_one({"name": {"$regex": f"^{re.escape(cat_name)}$", "$options": "i"}})
    if existing:
        return jsonify({"error": "Cat already exists"}), 409

    # Generate slug by removing spaces and lowercasing the name
    data['slug'] = cat_name.lower().replace(' ', '')

    cat_doc = create_cat_document(data)

    result = cats_collection.insert_one(cat_doc)
    return jsonify({"message": "Cat added", "id": str(result.inserted_id)}), 201