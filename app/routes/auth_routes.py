import jwt
import datetime
from app import app
from flask import Blueprint, request, jsonify
from app.models import UserServices, User
from sqlalchemy.exc import IntegrityError, DataError
from app.utils import get_missing_keys


auth_routes = Blueprint("auth_routes", __name__)


@auth_routes.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    
    missing_keys = get_missing_keys(data, User, exclude=["id"])

    if missing_keys:
        return jsonify({"error": f"The following keys are missing: {missing_keys}"}), 400

    try:
        user = UserServices.create_user(
            data["username"], data["email"], data["password"])
    except IntegrityError as e:
        print(e)
        return jsonify({"error": "User already exists"}), 400
    except DataError as e:
        print(e)
        return jsonify({"error": "Data error"}), 400
    except Exception as e:
        return jsonify({"error": "Interval Server Error"}), 500

    return jsonify(user.to_dict()), 201


@auth_routes.route("/login", methods=["GET", "POST"])
def login():
    data = request.get_json()

    missing_keys = get_missing_keys(data, User, exclude=["id", "username"])

    if missing_keys:
        return jsonify({"error": f"The following keys are missing: {missing_keys}"}), 400
    
    user = UserServices.get_user_by_email(data["email"])

    if not user:
        return jsonify({"error": "User not found"}), 404
    
    if not user.check_password(data["password"]):
        return jsonify({"error": "Invalid password"}), 401
    
    token = jwt.encode(
        {
            "user_id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=10)
        },
        app.config["SECRET_KEY"]
    )

    return jsonify({
        "token": token,
        "user": user.to_dict()
        }), 200
    

