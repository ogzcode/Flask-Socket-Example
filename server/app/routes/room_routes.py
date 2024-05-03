from app.models import UserServices, User, Rooms, RoomServices, MessageServices, Message
from flask import Blueprint, request, jsonify, g
from app.middlewares import token_required

room_routes = Blueprint("room_routes", __name__)


@room_routes.route("/deleteAllRooms", methods=["DELETE"])
@token_required
def deleteAllRooms():
    try:
        rooms = RoomServices.get_all_rooms()
        for room in rooms:
            MessageServices.delete_message_by_room_id(room_id=room.id)

        RoomServices.delete_all_rooms()
        return jsonify({"message": "All rooms deleted"}), 200
    
    except Exception as e:
        return jsonify({"message": str(e)}), 500
