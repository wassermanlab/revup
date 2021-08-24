# RevUP

## Project Setup
RevUP is a bioinformatics tool made up of a front end written in React.js and a backend written in Flask. The front end collects data from users and sends this information to the backend to be processed and produce an RVE (regulatory variant evidence) score. This score represents the accumulated clinical and functional evidence that the regulatory variant in question plays a causative role in a disease. The interface for RevUP can be found [here](http://www.revup-classifier.ca/home).

The structure of the files included in this project is shown below:
```
~/revup
├── README.md
├── RVE-score.txt
├── Remap_Variant_interest.tsv
├── app
│   ├── README.md
│   ├── package.json
│   ├── public
│   ├── src
│   └── yarn.lock
├── requirements.txt
├── setup.py
├── webpage_rvs
│   ├── __init__.py
│   ├── instance
│   └── src
│       ├── __pycache__
│       ├── constants.py
│       ├── helpers.py
│       ├── routes.py
│       ├── templates.py
│       └── variant.py
└── wsgi.py
```

The `app` directory contains all of the code related to the front end, and the `webpage_rvs` directory contains all the code to produce the backend.

## Software Installation
### Install Dependencies
1. **Install backend dependencies**

* Install Brew and Python (MacOS only)
```
# Install Brew
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

# Install Python and pip
$ brew install python

# Verify the installation worked
$ python3 --version
$ pip3 --version
```

* Install Python (Ubuntu only)
```
$ sudo apt update
$ sudo apt-get install python3-pip

# Verify the installation worked
$ python3 --version
$ pip3 --version
```

2. **Install the AWS CLI**

* Download the installer from the Amazon website and install the CLI. Then, run the following command and fill in the information:
```
$ aws configure
AWS Access Key ID [None]: YOUR_AWS_KEY_ID
AWS Secret Access Key [None]: YOUR_AWS_SECRET_KEY
Default region name [None]: us-west-2
Default output format [None]: ENTER
```
** Note: you can leave these fields blank if you do not have an AWS account

3. **Install a local version of AWS DynamoDB**
* Download the zip [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)
* Extract contents and copy the extracted directory to a location of your choice
* To start DynamoDB on your computer, open a command prompt, navigate to the directory where you extracted `DynamoDBLocal.jar`, and run the following command
```
$ java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```
** Note: DynamoDB uses port 8000 by default, and if port 8000 is unavailable the above command will throw an exception. You will need to use the `-port` option to overcome this, more info is available using `java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -help`
* Before you can access DynamoDB programmatically or through the AWS CLI you must configure credentials to enable authorization for your applications. Downloadable DynamoDB requires any credentials to work, so using the below example will work
```
AWS Access Key ID: "fakeMyKeyID"
AWS Secret Access Key: "fakeSecretAccessKey"
```
* Create the tables that you need locally
```
$ aws dynamodb create-table \
  --table-name revup_snv \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --endpoint-url http://localhost:8000
```

4. **Install frontend dependencies**

* Install Node.js and npm (MacOS only)
 ```
# Install Nodejs and npm
$ brew install node

# Verify the installation worked
$ node -v     # should be at least v8.10.0
$ npm -v      # should be at least 3.5.2
```

* Install Node.js and npm (Ubuntu only)
```
$ sudo apt-get install nodejs
$ sudo apt-get install npm

# Check the installation worked
$ nodejs --version          # should be at least v8.10.0
$ npm --version             # should be at least 3.5.2
```

* Alternatively, you can install [nvm](https://github.com/nvm-sh/nvm) to manage your node versions on both MacOS and Ubuntu
```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash

# Add the following line to your bash_profile or bashrc
$export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

# Verify the installation
$ command -v nvm

# Install the latest version of node
$ nvm isntall node

# Install a specific version of node
$ nvm install 14.5.0

# Create an alias and use it
$ nvm alias wrv 14.5.0
$ nvm use wrv

# List all versions of node installed
$ nvm ls

# Or create an .nvmrc file and use that
$ echo "14.5.0" > .nvmrc
$ nvm use
```

* Install Yarn (MacOS only)
```
$ brew install yarn

# Verify the installation worked
$ yarn -v 
```

* Install Yarn (Ubuntu only)
```
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
$ sudo apt-get install yarn

# Check the installation worked
$ yarn --version            # should be at least 1.22.4
```

### Code Setup
1. If you haven't done so already, clone the GitHub repo:
```
git clone https://github.com/wassermanlab/revup.git
cd revup
```

2. Make a virtual environment using Python3 and install the requirements
```
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

3. Ask for the `.env` file and copy it into the parent directory, then source it
```
source .env
```

4. Start the backend
```
flask run
```

5. Install associated packages for the frontend
```
yarn install 
```

6. Start the front end
```
yarn start
```
