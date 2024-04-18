from flask import request, jsonify, g
from functools import wraps
import jwt
from app import app
from app.models import UserServices, User


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]

        if not token:
            return jsonify({"error": "Token is missing"}), 401

        try:
            data = jwt.decode(token, app.config["SECRET_KEY"])
            current_user = UserServices.get_user_by_id(data["user_id"])

        except Exception as e:
            return jsonify({"error": "Token is invalid"}), 401
        
        g.current_user = current_user

        return f(*args, **kwargs)
    
    return decorated