from app.models import UserServices, User, Rooms, RoomServices, Message, MessageServices
from flask import Blueprint, request, jsonify, g
from app.middlewares import token_required

message_routes = Blueprint("message_routes", __name__)


@message_routes.route("/getMessagesByRoomId", methods=["GET"])
@token_required
def getMessagesByRoomId():
    room_id = request.args.get("room_id")
    messages = MessageServices.get_messages_by_room_id(room_id)

    return jsonify({
        "messages": [message.to_dict() for message in messages],
        "message": "Messages fetched successfully"
    }), 200


@message_routes.route("/deleteAllMessages", methods=["DELETE"])
@token_required
def deleteAllMessages():
    MessageServices.delete_all_messages()

    return jsonify({
        "message": "Messages deleted successfully"
    }), 200


@message_routes.route("/deleteChat", methods=["DELETE"])
@token_required
def deleteChat():
    room_id = request.args.get("room_id")
    MessageServices.delete_chat(room_id)

    RoomServices.delete_room(room_id)

    return jsonify({
        "message": "Chat deleted successfully"
    }), 200
