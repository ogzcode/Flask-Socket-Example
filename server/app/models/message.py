from app import db


class Message(db.Model):
    __tablename__ = 'message'
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(128))
    status = db.Column(db.String(128), default='unread')
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    sender = db.relationship('User', foreign_keys=[sender_id])
    receiver = db.relationship('User', foreign_keys=[receiver_id])

    def __repr__(self):
        return f"<Message {self.message}>"

    def to_dict(self):
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id,
            "message": self.message,
            "created_at": str(self.created_at),
            "status": self.status
        }


class MessageServices:
    @staticmethod
    def get_messages_by_room_id(room_id):
        messages = Message.query.filter_by(room_id=room_id).all()
        return messages

    @staticmethod
    def get_messages_by_user_id(user_id):
        messages = Message.query.filter_by(sender_id=user_id).all()
        return messages

    @staticmethod
    def delete_all_messages():
        messages = Message.query.all()
        for message in messages:
            db.session.delete(message)
        db.session.commit()

    @staticmethod
    def delete_message_by_room_id(room_id):
        messages = Message.query.filter_by(room_id=room_id).all()
        for message in messages:
            db.session.delete(message)
        db.session.commit()

    @staticmethod
    def create_message(sender_id, receiver_id, message, room_id):
        new_message = Message(
            sender_id=sender_id, receiver_id=receiver_id, message=message, room_id=room_id)
        db.session.add(new_message)
        db.session.commit()
        return new_message

    @staticmethod
    def update_message_status(message_id, status):
        message = Message.query.get(message_id)
        message.status = status
        db.session.commit()
        return message

    @staticmethod
    def get_unread_messages_count(sender_id, receiver_id):
        messages_count = Message.query.filter_by(
            sender_id=sender_id, receiver_id=receiver_id, status='unread').count()
        return messages_count

    # Buraya bakılmalı hem gönderen hemde kendi son mesajı görmeli
    @staticmethod
    def get_last_message(sender_id, receiver_id):
        message = Message.query.filter_by(
            sender_id=sender_id, receiver_id=receiver_id).order_by(Message.created_at.desc()).first()
        return message

    @staticmethod
    def get_and_mark_unread_messages_by_room_id(room_id, receiver_id):
        messages = Message.query.filter_by(room_id=room_id).all()
        for message in messages:
            if message.sender_id == receiver_id:
                message.status = 'read'
        db.session.commit()
        return messages
