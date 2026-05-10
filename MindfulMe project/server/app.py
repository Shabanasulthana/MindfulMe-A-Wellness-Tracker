from flask import Flask
from flask_cors import CORS
from extensions import db
from config import Config
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)

from routes.auth_routes import auth_bp
from routes.mood_routes import mood_bp
from routes.journal_routes import journal_bp
from routes.ai_routes import ai_bp
from routes.admin_routes import admin_bp
app.register_blueprint(admin_bp)
app.register_blueprint(ai_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(mood_bp)
app.register_blueprint(journal_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
