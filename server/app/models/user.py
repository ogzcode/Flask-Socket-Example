from app import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, index=True)
    email = db.Column(db.String(64), unique=True, index=True)
    password = db.Column(db.String(128))

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return f"<User {self.username}>"

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }


class UserServices:
    @staticmethod
    def create_user(username, email, password):
        try:
            user = User(username=username, email=email)
            user.set_password(password)
            db.session.add(user)
            db.session.commit()
            return user
        except Exception as e:
            db.session.rollback()
            raise e

    @staticmethod
    def get_user_by_email(email):
        return User.query.filter_by(email=email).first()

    @staticmethod
    def get_user_by_id(user_id):
        return User.query.filter_by(id=user_id).first()

    @staticmethod
    def get_all_users(user_id=None):
        if user_id:
            return User.query.filter(User.id != user_id).all()
        return User.query.all()

    @staticmethod
    def get_user_by_username(username, user_id=None):
        if user_id:
            return User.query.filter(User.username.ilike(f"%{username}%"), User.id != user_id).all()
        return User.query.filter(User.username.ilike(f"%{username}%")).all()

    @staticmethod
    def update_user(user, **kwargs):
        for key, value in kwargs.items():
            setattr(user, key, value)
        db.session.commit()
        return user

    @staticmethod
    def delete_user(user):
        db.session.delete(user)
        db.session.commit()
        return user

    @staticmethod
    def delete_all_users():
        User.query.delete()
        db.session.commit()

    @staticmethod
    def update_password(user, new_password):
        user.set_password(new_password)
        db.session.commit()

