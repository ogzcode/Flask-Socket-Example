from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_login import LoginManager
from flask_socketio import SocketIO

login_manager = LoginManager()
login_manager.login_view = "login"

app = Flask(__name__)
app.config.from_object(Config)

socketio = SocketIO(app)

login_manager.init_app(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)


from app import models, routes


if __name__ == "__main__":
    socketio.run(app)
