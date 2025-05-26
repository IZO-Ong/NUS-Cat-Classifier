from flask import Flask, send_from_directory
from flask_cors import CORS
from routes.predict import predict_routes
from routes.cats import cat_routes
from routes.user import user_routes
from routes.comments import comment_routes
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/')
def serve_react():
    return send_from_directory('static', 'index.html')

from flask import abort

@app.route('/<path:path>')
def serve_static_or_index(path):
    file_path = os.path.join(app.static_folder, path)
    if os.path.exists(file_path):
        return send_from_directory('static', path)
    elif path.startswith('assets') or path.endswith('.js') or path.endswith('.css'):
        return abort(404)
    else:
        return send_from_directory('static', 'index.html')


app.register_blueprint(predict_routes)
app.register_blueprint(cat_routes)
app.register_blueprint(user_routes)
app.register_blueprint(comment_routes)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
