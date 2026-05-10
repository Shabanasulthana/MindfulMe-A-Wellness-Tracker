from flask import Blueprint, request, jsonify
from extensions import db
from models import Journal, FlaggedEntry
from datetime import datetime

journal_bp = Blueprint('journal', __name__)

def contains_sensitive(content):
    keywords = ['bad', 'harm', 'suicide', 'hate','kill','die', 'cut', 'hurt',
        'worthless' 'depressed', 'hopeless', 'alone', 'self-harm', 'pain', 'bleed']
    return any(word in content.lower() for word in keywords)

@journal_bp.route('/save-journal', methods=['POST'])
def save_journal():
    data = request.json
    content = data.get('content')
    user_id = data.get('user_id')

    if not content or not user_id:
        return jsonify({'error': 'Missing content or user_id'}), 400

    journal = Journal(user_id=user_id, content=content, date=datetime.utcnow())
    db.session.add(journal)
    db.session.commit()

    if contains_sensitive(content):
        flagged = FlaggedEntry(
            entry_type='journal',
            entry_id=journal.id,
            reason='Sensitive language detected'
        )
        db.session.add(flagged)
        db.session.commit()

    return jsonify({'message': 'Journal saved successfully'})

@journal_bp.route('/get_journals', methods=['POST'])
def get_journals():
    journals = Journal.query.order_by(Journal.date.desc()).all()
    journal_data = [
        {
            'date': journal.date.strftime('%Y-%m-%d %H:%M'),
            'content': journal.content
        }
        for journal in journals
    ]
    return jsonify(journal_data)
