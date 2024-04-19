from app import db
from .user import User


class Rooms(db.Model):
    __tablename__ = 'rooms'
    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user2_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user1 = db.relationship('User', foreign_keys=[user1_id])
    user2 = db.relationship('User', foreign_keys=[user2_id])

    messages = db.relationship('Message', backref='room', lazy='dynamic')

    def __repr__(self):
        return f"<Room {self.id}>"


class RoomServices:
    @staticmethod
    def get_rooms_by_user_id(user_id):
        rooms = Rooms.query.filter(
            (Rooms.user1_id == user_id) | (Rooms.user2_id == user_id)).all()
        return rooms

    @staticmethod
    def create_room(user1_id, user2_id):
        room = Rooms(user1_id=user1_id, user2_id=user2_id)
        db.session.add(room)
        db.session.commit()
        return room

    @staticmethod
    def get_room_by_user_ids(user1_id, user2_id):
        room = Rooms.query.filter(
            ((Rooms.user1_id == user1_id) & (Rooms.user2_id == user2_id)) |
            ((Rooms.user1_id == user2_id) & (Rooms.user2_id == user1_id))
        ).first()

        return room

    @staticmethod
    def get_all_rooms():
        rooms = Rooms.query.all()
        return rooms

    @staticmethod
    def delete_room(room_id):
        room = Rooms.query.get(room_id)
        db.session.delete(room)
        db.session.commit()
        return room

    @staticmethod
    def delete_all_rooms():
        rooms = Rooms.query.all()
        for room in rooms:
            db.session.delete(room)
        db.session.commit()

    @staticmethod
    def get_contacted_users(user_id):
        rooms = Rooms.query.filter(
            (Rooms.user1_id == user_id) | (Rooms.user2_id == user_id)).all()
        user_ids = []
        for room in rooms:
            if room.user1_id == user_id:
                user_ids.append(room.user2_id)
            else:
                user_ids.append(room.user1_id)
        users = User.query.filter(User.id.in_(user_ids)).all()
        return users

    @staticmethod
    def delete_room_by_user_id(user_id):
        rooms = Rooms.query.filter(
            (Rooms.user1_id == user_id) | (Rooms.user2_id == user_id)).all()
        for room in rooms:
            db.session.delete(room)
        db.session.commit()
