from app.models import UserServices, User, Rooms, RoomServices, MessageServices, Message
from flask import Blueprint, request, jsonify, g
from app.middlewares import token_required

user_routes = Blueprint("user_routes", __name__)


@user_routes.route("/getContactedUsers", methods=["GET"])
@token_required
def getContactedUsers():
    current_user_id = g.current_user.id
    contacted_users = RoomServices.get_contacted_users(current_user_id)

    contacted_user_data = []

    for user in contacted_users:
        room = RoomServices.get_room_by_user_ids(current_user_id, user.id)
        messages = MessageServices.get_messages_by_room_id(room.id)
        last_message = messages[-1] if messages else None

        contacted_user_data.append({
            "user": user.to_dict(),
            "last_message": last_message.to_dict() if last_message else None
        })

    return jsonify({
        "contacted_users": contacted_user_data,
        "message": "Contacted users fetched successfully"
    }), 200


@user_routes.route("/deleteRoomByUserId", methods=["DELETE"])
@token_required
def deleteRoomByUserId():
    current_user_id = g.current_user.id
    user = UserServices.get_user_by_id(current_user_id)
    RoomServices.delete_room_by_user_id(current_user_id)
    return jsonify({"message": f"All rooms connected to {user.username} have been deleted" }), 200


@user_routes.route("/deleteAllUsers", methods=["DELETE"])
def deleteAllUsers():
    UserServices.delete_all_users()
    return jsonify({"message": "All users deleted"}), 200


@user_routes.route("/getAllUsers", methods=["GET"])
@token_required
def getAllUsers():
    search_query = request.args.get("search", None)
    current_user = g.current_user
    users = UserServices.get_user_by_username(search_query, current_user.id)

    contacted_users = RoomServices.get_contacted_users(current_user.id)

    users_not_contacted = [user for user in users if user not in contacted_users]

    return jsonify({
        "users": [user.to_dict() for user in users_not_contacted],
        "message": "All users fetched successfully"
    }), 200
