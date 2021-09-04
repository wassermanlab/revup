import os
import sys

from flask import Flask
from flask_cors import CORS
from flask_dynamo import Dynamo
from dotenv import load_dotenv, find_dotenv
from flask_mail import Mail

# Load the environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(find_dotenv())

app = Flask(__name__, static_folder='./app/build', static_url_path='/')
app.config.from_mapping(
    SECRET_KEY=os.environ.get("SECRET_KEY")
)

# Setup database
# TODO: Add this to a config file
app.config['DYNAMO_TABLES'] = [
    {
         "TableName":'revup_snv',
         "KeySchema":[dict(AttributeName='id', KeyType='HASH')],
         "AttributeDefinitions": [dict(AttributeName='id', AttributeType='S')],
         "ProvisionedThroughput": dict(ReadCapacityUnits=5, WriteCapacityUnits=5)
    }
]
app.config['DYNAMO_ENABLE_LOCAL'] = os.environ.get('DYNAMO_ENABLE_LOCAL', False)
app.config['DYNAMO_LOCAL_HOST'] = os.environ.get('DYNAMO_LOCAL_HOST', '')
app.config['DYNAMO_LOCAL_PORT'] = os.environ.get('DYNAMO_LOCAL_PORT', '')

dynamo = Dynamo(app)

# Setup mail server
app.config.update(dict(
    MAIL_SERVER = 'smtp.googlemail.com',
    MAIL_PORT = 465,
    MAIL_USE_TLS = False,
    MAIL_USE_SSL = True,
    MAIL_USERNAME = os.environ.get('REVUP_SENDER_USERNAME'),
    MAIL_PASSWORD = os.environ.get('REVUP_SENDER_PASSWORD')
))

mail = Mail(app)

# load the instance config, if it exists, when not testing
app.config.from_pyfile('config.py', silent=True)

# ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

cors = CORS(app, resources={
    r"/*": {"origins": ["http://revup-classifier.ca", "http://www.revup-classifier.ca", "http://localhost:3000",]}
})

import webpage_rvs.src.routes
