from extensions import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(10), default='user')

class Journal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    content = db.Column(db.Text)
    date = db.Column(db.DateTime, default=datetime.utcnow)

class Mood(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    mood_level = db.Column(db.Integer)
    date = db.Column(db.DateTime, default=datetime.utcnow)

class FlaggedEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    entry_type = db.Column(db.String(10), default='journal')
    entry_id = db.Column(db.Integer, nullable=False)
    reason = db.Column(db.String(255))
    flagged_at = db.Column(db.DateTime, default=datetime.utcnow)
