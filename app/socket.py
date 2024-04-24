from app import socketio
from flask_socketio import emit, join_room, leave_room
from app.models import MessageServices, RoomServices

#Kullanıcı bir odadan ayrıldığında diğer kullanıcı mesaj attığında ona gidip gitmediğini kotrol etmeliyiz


@socketio.on("connect")
def connect():
    print("New client connected")


@socketio.on("disconnect")
def disconnect():
    print("client disconnected")


@socketio.on("join")
def join(data):
    receiver_id = data["receiver_id"]
    sender_id = data["sender_id"]

    room = RoomServices.get_room_by_user_ids(sender_id, receiver_id)

    if room is None:
        room = RoomServices.create_room(sender_id, receiver_id)

    messages = MessageServices.get_messages_by_room_id(room.id)

    messages = [message.to_dict() for message in messages]

    join_room(room.id)

    emit("join", {"messages": messages, "room_id": room.id}, room=room.id)


@socketio.on("leave")
def leave(data):
    disconnected_id = data["disconnected_id"]

    rooms = RoomServices.get_rooms_by_user_id(disconnected_id)

    for room in rooms:
        leave_room(room.id)

    print(f"User {disconnected_id} left the room")


@socketio.on("message")
def message(data):
    sender_id = data["sender_id"]
    receiver_id = data["receiver_id"]
    room_id = data["room_id"]
    message_content = data["message"]

    new_message = MessageServices.create_message(
        sender_id, receiver_id, message_content, room_id)

    emit("message", new_message.to_dict(), room=room_id)
