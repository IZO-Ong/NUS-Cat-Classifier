from bson import ObjectId
from datetime import datetime, timezone

def create_comment(content, user_id, cat_slug):
    return {
        "content": content,
        "likes": [],
        "userID": ObjectId(user_id),
        "catSlug": cat_slug,
        "timestamp": datetime.now(timezone.utc)
    }
