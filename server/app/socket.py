from app import socketio
from flask_socketio import emit, join_room, leave_room, rooms, close_room
from flask import request
from app.models import MessageServices, RoomServices

# Kullanıcı bir odadan ayrıldığında diğer kullanıcı mesaj attığında ona gidip gitmediğini kontrol etmeliyiz


@socketio.on("connect")
def connect(data):
    print("New client connected", data)


@socketio.on("disconnect")
def disconnect():
    print("client disconnected")


@socketio.on("get_users")
def get_users(data):
    user_id = data["user_id"]
    emit_get_users(user_id)


@socketio.on("join")
def join(data):
    receiver_id = data["receiver_id"]
    sender_id = data["sender_id"]
    old_room_id = data["old_room_id"]

    if old_room_id:
        leave_room(old_room_id)

    room = RoomServices.get_room_by_user_ids(sender_id, receiver_id)

    if room is None:
        room = RoomServices.create_room(sender_id, receiver_id)

    messages = MessageServices.get_and_mark_unread_messages_by_room_id(
        room_id=room.id, receiver_id=receiver_id)

    messages = [message.to_dict() for message in messages]

    join_room(room.id)

    emit("join", {"messages": messages, "room_id": room.id}, room=room.id)


@socketio.on("leave")
def leave(data):
    disconnected_id = data["disconnected_id"]

    leave_room("user-room-" + str(disconnected_id))

    rooms = RoomServices.get_rooms_by_user_id(disconnected_id)

    for room in rooms:
        leave_room(room.id)

    print(f"User {disconnected_id} left the room")


@socketio.on("mark_as_read")
def mark_as_read(data):
    message_id = data["message_id"]
    MessageServices.update_message_status(message_id, "read")


@socketio.on("message")
def message(data):
    sender_id = data["sender_id"]
    receiver_id = data["receiver_id"]
    room_id = data["room_id"]
    message_content = data["message"]

    new_message = MessageServices.create_message(
        sender_id, receiver_id, message_content, room_id)

    emit("message", {"message": new_message.to_dict()}, room=room_id)

    emit_get_users(sender_id)
    emit_get_users(receiver_id)


def emit_get_users(user_id):
    contacted_users = RoomServices.get_contacted_users(user_id)

    user_data = []

    room_prefix = "user-room-"
    room = room_prefix + str(user_id)

    if not any(isinstance(r, str) and  r.startswith(room_prefix) for r in rooms()):
        join_room(room)

    for user in contacted_users:
        user_info = get_user_data(user.id, user_id)
        user_info["user"] = user.to_dict()

        user_data.append(user_info)

    emit("get_users", {"users": user_data}, to=room)


def get_user_data(sender_id, receiver_id):
    unread_messages_count = MessageServices.get_unread_messages_count(sender_id, receiver_id)

    last_message = MessageServices.get_last_message(sender_id, receiver_id)

    user_info = {
        "unread_messages_count": unread_messages_count,
        "last_message": last_message.message if last_message else None,
        "last_message_date": str(last_message.created_at) if last_message else None
    }

    return user_info
