from flask import Blueprint, request, jsonify
from extensions import db
from models import Mood
from datetime import datetime

mood_bp = Blueprint('mood', __name__, url_prefix='/api')

@mood_bp.route('/save-mood', methods=['POST'])
def save_mood():
    data = request.get_json()
    new_mood = Mood(
        user_id=data['user_id'],  
        mood_level=data['mood_level'],
        date=datetime.now().date()
    )
    db.session.add(new_mood)
    db.session.commit()
    return jsonify({"message": "Mood saved successfully!"})

@mood_bp.route('/mood', methods=['GET'])
def get_moods():
    moods = Mood.query.order_by(Mood.date.desc()).all()
    mood_data = [
        {'date': mood.date.strftime('%Y-%m-%d'), 'mood_level': mood.mood_level}
        for mood in moods
    ]
    return jsonify(mood_data)
