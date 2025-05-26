import os
from pymongo import MongoClient

client = MongoClient(os.getenv("MONGO_URI"))
db = client["nuscats"]
cats_collection = db["cats"]
users_collection = db["users"]
comments_collection = db["comments"]
