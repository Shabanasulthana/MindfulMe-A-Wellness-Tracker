from flask import Blueprint, request, jsonify
from extensions import db
from flask import current_app
from models import User
from utils.validators import is_valid_email, is_strong_password
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'user')  # default role is 'user'

    if not name or not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    existing_user = User.query.filter((User.email == email) | (User.name == name)).first()
    if existing_user:
        return jsonify({'error': 'User already exists'}), 409

    hashed_password = generate_password_hash(password)
    new_user = User(name=name, email=email, password=hashed_password, role=role)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully', 'user_id': new_user.id})

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    name = data.get('name')
    password = data.get('password')

    user = User.query.filter_by(name=name).first()
    if user and check_password_hash(user.password, password):
        token = jwt.encode({
            'user_id': user.id,
            'name': user.name,
            'role': user.role
        }, current_app.config['SECRET_KEY'], algorithm='HS256')

        return jsonify({
            'user_id': user.id,
            'name': user.name,
            'role': user.role,
            'token': token
        }), 200
    return jsonify({'message': 'Invalid name or password'}), 401
