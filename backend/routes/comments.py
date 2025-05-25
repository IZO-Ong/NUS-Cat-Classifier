from flask import Blueprint, request, jsonify
from db.mongo import comments_collection, cats_collection, users_collection
from models.comment import create_comment
from utils.jwt_utils import verify_token
from bson import ObjectId

comment_routes = Blueprint('comment_routes', __name__)

def get_authenticated_user_id():
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return None
    token = auth_header.split("Bearer ")[-1]
    return verify_token(token)

@comment_routes.route('/api/cats/<slug>/comments', methods=['POST'])
def add_comment(slug):
    user_id = get_authenticated_user_id()
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    if not data.get('content'):
        return jsonify({"error": "Missing content"}), 400

    comment_doc = create_comment(data['content'], user_id, slug)
    result = comments_collection.insert_one(comment_doc)

    cats_collection.update_one(
        {"slug": slug},
        {"$push": {"comments": str(result.inserted_id)}}
    )

    return jsonify({"message": "Comment added", "commentID": str(result.inserted_id)}), 201

@comment_routes.route('/api/comments/<comment_id>/like', methods=['PATCH'])
def like_comment(comment_id):
    user_id = get_authenticated_user_id()
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    comment = comments_collection.find_one({"_id": ObjectId(comment_id)})
    if not comment:
        return jsonify({"error": "Comment not found"}), 404

    if user_id in comment.get("likes", []):
        return jsonify({"error": "You have already liked this comment"}), 400

    comments_collection.update_one(
        {"_id": ObjectId(comment_id)},
        {"$addToSet": {"likes": user_id}}
    )

    return jsonify({"message": "Comment liked"})

@comment_routes.route('/api/comments/<comment_id>/unlike', methods=['PATCH'])
def unlike_comment(comment_id):
    user_id = get_authenticated_user_id()
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    comment = comments_collection.find_one({"_id": ObjectId(comment_id)})
    if not comment:
        return jsonify({"error": "Comment not found"}), 404

    if user_id not in comment.get("likes", []):
        return jsonify({"error": "You have not liked this comment"}), 400

    comments_collection.update_one(
        {"_id": ObjectId(comment_id)},
        {"$pull": {"likes": user_id}}
    )

    return jsonify({"message": "Comment unliked"})

@comment_routes.route('/api/comments/<comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    user_id = get_authenticated_user_id()
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    comment = comments_collection.find_one({"_id": ObjectId(comment_id)})
    if not comment:
        return jsonify({"error": "Comment not found"}), 404

    if str(comment["userID"]) != user_id:
        return jsonify({"error": "Forbidden"}), 403

    comments_collection.delete_one({"_id": ObjectId(comment_id)})

    cats_collection.update_many(
        {}, {"$pull": {"comments": comment_id}}  # Optional: remove from cat docs
    )

    return jsonify({"message": "Comment deleted"})
