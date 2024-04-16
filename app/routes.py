from flask import jsonify
from flask import render_template, redirect, url_for, request, jsonify
from urllib.parse import urlsplit
from flask_login import login_user, logout_user, current_user, login_required
from flask_socketio import emit, send, join_room
from app import login_manager, app, db, socketio
from app.models import User, Message, Rooms


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route("/")
def index():
    if current_user.is_authenticated:
        return redirect(url_for("main"))

    return redirect(url_for("login"))


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        email = request.form["email"]
        password = request.form["password"]
        user = User(username=username, password=password, email=email)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for("login"))
    return render_template("pages/register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        user = User.query.filter_by(email=email).first()
        if user and user.password == password:
            login_user(user)
            return redirect(url_for("main"))
    return render_template("pages/login.html")


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("login"))


@app.route("/main")
@login_required
def main():
    current_user_id = current_user.id
    user_list = User.query.filter(User.id != current_user_id).all()
    return render_template("pages/main.html", users=user_list)


@app.route("/chat/<int:receiver_id>")
@login_required
def chat(receiver_id):
    current_user_id = current_user.id
    room = Rooms.query.filter(
        (Rooms.user1_id == current_user_id) & (Rooms.user2_id == receiver_id) |
        (Rooms.user1_id == receiver_id) & (Rooms.user2_id == current_user_id)
    ).first()


    if not room:
        room = Rooms(user1_id=current_user_id, user2_id=receiver_id)
        db.session.add(room)
        db.session.commit()

    messages = room.messages.all()

    return jsonify({
        "room_id": room.id,
        "messages": [{
            "sender_id": message.sender_id,
            "receiver_id": message.receiver_id,
            "message": message.message,
            "created_at": message.created_at,
            "id": message.id,
        } for message in messages]
    })


@app.route("/deleteAllMessage", methods=["DELETE"])
def deleteAllMessage():
    Message.query.delete()
    db.session.commit()

    return jsonify({"message": "All messages deleted"})


@socketio.on("join")
def join(data):
    receiver_id = data["receiver_id"]
    current_user_id = current_user.id

    room = Rooms.query.filter(
        (Rooms.user1_id == current_user_id) & (Rooms.user2_id == receiver_id) |
        (Rooms.user1_id == receiver_id) & (Rooms.user2_id == current_user_id)
    ).first()

    if not room:
        room = Rooms(user1_id=current_user_id, user2_id=receiver_id)
        db.session.add(room)
        db.session.commit()

    room_name = f"room_{room.id}"
    join_room(room_name)

    emit("join", room=room_name)


@socketio.on("message")
def message(data):
    message_content = data["message"]
    receiver_id = data["receiver_id"]
    sender_id = current_user.id

    # İlgili odayı bul
    room = Rooms.query.filter(
        (Rooms.user1_id == sender_id) & (Rooms.user2_id == receiver_id) |
        (Rooms.user1_id == receiver_id) & (Rooms.user2_id == sender_id)
    ).first()

    # Veritabanına mesajı kaydet
    new_message = Message(sender_id=sender_id,
                          receiver_id=receiver_id, message=message_content, room_id=room.id)
    db.session.add(new_message)
    db.session.commit()

    # Oda varsa, odada bulunan tüm kullanıcılara mesajı ilet
    if room:
        room_name = f"room_{room.id}"
        emit("message", {
            "sender_id": sender_id,
            "receiver_id": receiver_id,
            "message": message_content,
            "id": new_message.id,
        }, room=room_name)
