from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_login import LoginManager

login_manager = LoginManager()

app = Flask(__name__)
app.config.from_object(Config)

login_manager.init_app(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)


from app import models, routes
