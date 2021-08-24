# RevUP

## Project Setup
RevUP is comprised of a React.js front end and a Flask backend. The front end collects data from the user and sends it to the backend to be processed and produce a score.

The following shows the structure of this project:
```
~/revup
├── README.md
├── api
├── app
│   ├── README.md
│   ├── node_modules
│   ├── package.json
│   ├── public
│   ├── src
│   ├── yarn-error.log
│   └── yarn.lock
├── instance
├── requirements.txt
├── scripts
│   └── test_query.py
├── webpage_rvs
│   ├── __init__.py
│   └── __pycache__
└── wrv
    ├── bin
    ├── include
    ├── lib
    └── pyvenv.cfg
```

The `app` directory contains all of the code to produce the front end, the `webpage_rvs` directory contains all the code to produce the backend, the `api` directory contains all of the code to produce the API, the `scripts` directory contains test scripts, and the `wrv` directory contains the environment for the backend. 

## Software Installation
### Flask Backend
If you haven't done so already, clone the GitHub repo:
```
git clone <URL>
cd revup
```

Install any dependencies for MacOS
```
# Install Brew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

# Install python
brew install python

# Check the installation worked
python3 --version
pip3 --version
```

Install any dependencies for Ubuntu
```
# Install Python3
sudo apt update
sudo apt-get install python3-pip
```

Make a virtual environment using Python3 and install the requirements
```
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

Copy the `.env` file into the parent directory and source it
```
source .env
```

Run the backend
```
flask run
```

### React.js Frontend
`cd` into the `app` directory and continue setup of the front end
```
cd app/
```

Install dependencies for MacOS
#### 1. Nodejs
```
# Install Brew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

# Install Nodejs and npm
brew install node

# Check the installation worked
node -v     # should be at least v8.10.0
npm -v      # should be at least 3.5.2
```

Alternatively, you can install [nvm](https://github.com/nvm-sh/nvm) to manage your node versions
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash

# Add the following line to your bash_profile or bashrc
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

# Verify the installation
command -v nvm

# Install the latest version of node
nvm isntall node

# Install a specific version of node
nvm install 14.5.0

# Create an alias and use it
nvm alias wrv 14.5.0
nvm use wrv

# List all versions of node installed
nvm ls

# Or create an .nvmrc file and use that
echo "14.5.0" > .nvmrc
nvm use
```

#### 2. Yarn
```
brew install yarn

# Check that the installation worked
yarn -v     # should be at least 1.22.4
```

Install the associated packages
```
yarn install 
```

Run the front end
```
yarn start
```
