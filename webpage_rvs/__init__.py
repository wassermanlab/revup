import os
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.config.from_mapping(
    SECRET_KEY='dev'
)

# load the instance config, if it exists, when not testing
app.config.from_pyfile('config.py', silent=True)

# ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

cors = CORS(app, resources={
    r"/*": {"origins": ["http://localhost:3000"]}
})

import webpage_rvs.routes
