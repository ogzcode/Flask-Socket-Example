from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config.from_object(Config)

socketio = SocketIO(app, cors_allowed_origins="*")

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app.routes import auth_routes, user_routes, room_routes, message_routes, block_routes
from app import socket

app.register_blueprint(auth_routes)
app.register_blueprint(user_routes)
app.register_blueprint(room_routes)
app.register_blueprint(message_routes)
app.register_blueprint(block_routes)


@app.route("/")
def index():
    return "Hello, World!"


if __name__ == "__main__":
    socketio.run(app)
