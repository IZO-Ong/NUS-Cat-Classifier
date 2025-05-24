from flask import Flask
from flask_cors import CORS
from routes.predict import predict_routes
from routes.cats import cat_routes

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

app.register_blueprint(predict_routes)
app.register_blueprint(cat_routes)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
