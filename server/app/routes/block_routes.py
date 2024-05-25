from app.models import BlockServices, UserServices
from flask import Blueprint, request, jsonify, g
from app.middlewares import token_required

block_routes = Blueprint('block_routes', __name__)


@block_routes.route('/blockUser', methods=['POST'])
@token_required
def block_user():
    try:
        data = request.get_json()
        blocker_id = g.current_user.id
        blocked_id = data['blocked_id']
        block = BlockServices.block_user(blocker_id, blocked_id)
        return jsonify({
            "message": "User blocked",
        }), 200
    except Exception as e:
        return jsonify({
            "message": str(e),
        }), 400


@block_routes.route('/unBlockUser', methods=['POST'])
@token_required
def unblock_user():
    try:
        data = request.get_json()
        blocker_id = g.current_user.id
        blocked_id = data['blocked_id']
        block = BlockServices.unblock_user(blocker_id, blocked_id)
        return jsonify({
            "message": "User unblocked",
        }), 200
    except Exception as e:
        return jsonify({
            "message": str(e),
        }), 400


@block_routes.route('/getBlockedUsers', methods=['GET'])
@token_required
def get_blocked_users():
    try:
        user_id = g.current_user.id
        blocked_users = BlockServices.get_blocked_users(user_id)

        users = []

        for user in blocked_users:
            users.append(UserServices.get_user_by_id(user.blocked_id).to_dict())

        return jsonify({
            "users": users
        }), 200
    
    except Exception as e:
        print(e)
        return jsonify({
            "message": str(e),
        }), 400
