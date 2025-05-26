from flask import Flask, send_from_directory
from flask_cors import CORS
from routes.predict import predict_routes
from routes.cats import cat_routes
from routes.user import user_routes
from routes.comments import comment_routes
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/')
def serve_react():
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory('static', path)

app.register_blueprint(predict_routes)
app.register_blueprint(cat_routes)
app.register_blueprint(user_routes)
app.register_blueprint(comment_routes)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
