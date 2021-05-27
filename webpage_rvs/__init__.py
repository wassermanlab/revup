import os
import sys

from flask import Flask
from flask_cors import CORS
from flask_dynamo import Dynamo
from dotenv import load_dotenv, find_dotenv

# Load the environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(find_dotenv())

app = Flask(__name__, static_folder='./app/build', static_url_path='/')
app.config.from_mapping(
    SECRET_KEY=os.environ.get("SECRET_KEY")
)
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

# load the instance config, if it exists, when not testing
app.config.from_pyfile('config.py', silent=True)

# ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

cors = CORS(app, resources={
    r"/*": {"origins": ["http://localhost:3000", "https://regulatory-variants.netlify.app", "http://ec2-44-231-133-239.us-west-2.compute.amazonaws.com"]}
})

import webpage_rvs.src.routes
