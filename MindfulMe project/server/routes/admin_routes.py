from flask import Blueprint, jsonify
from models import User, Journal, Mood, FlaggedEntry
from extensions import db

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/api/admin/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify([
        {
            'id': u.id,
            'name': u.name,
            'email': u.email,
            'role': u.role
        } for u in users
    ])

@admin_bp.route('/api/admin/history/<int:user_id>', methods=['GET'])
def get_user_history(user_id):
    journals = Journal.query.filter_by(user_id=user_id).all()
    moods = Mood.query.filter_by(user_id=user_id).all()
    return jsonify({
        'journals': [{'date': j.date.strftime('%Y-%m-%d %H:%M'), 'content': j.content} for j in journals],
        'moods': [{'date': m.date.strftime('%Y-%m-%d'), 'mood_level': m.mood_level} for m in moods]
    })

@admin_bp.route('/api/admin/flagged', methods=['GET'])
def get_flagged_journals():
    flagged = FlaggedEntry.query.filter_by(entry_type='journal').order_by(FlaggedEntry.flagged_at.desc()).all()
    
    if not flagged:
        return jsonify({'flagged_entries': [], 'message': 'No flagged entries found.'})

    results = []
    for entry in flagged:
        journal = Journal.query.get(entry.entry_id)
        if journal:
            results.append({
                'flagged_id': entry.id,
                'journal_id': journal.id,
                'user_id': journal.user_id,
                'content': journal.content,
                'reason': entry.reason,
                'flagged_at': entry.flagged_at.strftime('%Y-%m-%d %H:%M')
            })

    return jsonify({'flagged_entries': results})