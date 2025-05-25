from werkzeug.security import generate_password_hash, check_password_hash

def create_user(username, password):
    return {
        "username": username,
        "passwordHash": generate_password_hash(password)
    }

def verify_password(stored_hash, password):
    return check_password_hash(stored_hash, password)
