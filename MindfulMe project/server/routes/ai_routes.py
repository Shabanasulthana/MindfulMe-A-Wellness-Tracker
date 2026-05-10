from flask import Blueprint, request, jsonify
import requests
import os

ai_bp = Blueprint('ai', __name__, url_prefix='/api')

AZURE_API_KEY = os.getenv('AZURE_API_KEY')
AZURE_API_URL = os.getenv('AZURE_API_URL')
MODEL = 'mistralai/mistral-7b-instruct'

@ai_bp.route('/suggest', methods=['POST'])
def get_suggestion():
    data = request.get_json()
    content = data.get('content', '')

    if not content:
        return jsonify({'error': 'No content provided'}), 400

    headers = {
        'Authorization': f'Bearer {AZURE_API_KEY}',
        'Content-Type': 'application/json'
    }

    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "You are a wellness coach. Give short, helpful suggestions based on user's input."},
            {"role": "user", "content": content}
        ]
    }

    try:
        response = requests.post(AZURE_API_URL, headers=headers, json=payload)
        res_json = response.json()
        suggestion = res_json['choices'][0]['message']['content']
        return jsonify({'suggestion': suggestion})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
