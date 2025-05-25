from flask import Blueprint, request, jsonify
from db.mongo import users_collection
from models.user import create_user, verify_password
from utils.jwt_utils import generate_token

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data.get("username") or not data.get("password"):
        return jsonify({"error": "Missing username or password"}), 400

    if users_collection.find_one({"username": data["username"]}):
        return jsonify({"error": "Username already exists"}), 409

    user = create_user(data["username"], data["password"])
    result = users_collection.insert_one(user)
    return jsonify({"message": "User created", "id": str(result.inserted_id)}), 201

@user_routes.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = users_collection.find_one({"username": data.get("username")})
    if not user or not verify_password(user["passwordHash"], data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    token = generate_token(user["_id"])
    return jsonify({"message": "Login successful", "token": token})

@user_routes.route('/api/users', methods=['GET'])
def get_all_users():
    users = users_collection.find({}, {"passwordHash": 0})  # Exclude passwordHash
    user_list = [{'_id': str(user['_id']), 'username': user['username']} for user in users]
    return jsonify(user_list)

