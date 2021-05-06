import os
import sys

from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo


app = Flask(__name__, static_folder='./app/build', static_url_path='/')
app.config.from_mapping(
    SECRET_KEY='dev'
)
# TODO: Add this to a config file
app.config["MONGO_URI"] = "mongodb://localhost:27017/revup_test"
mongo_client = PyMongo(app)
#mongo_client = PyMongo(app, uri="mongodb://localhost:27017/revup_test")
db = mongo_client.db

# load the instance config, if it exists, when not testing
app.config.from_pyfile('config.py', silent=True)

# ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

cors = CORS(app, resources={
    r"/*": {"origins": ["http://localhost:3000", "https://regulatory-variants.netlify.app"]}
})

import webpage_rvs.src.routes
