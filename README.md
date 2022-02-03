# Python Test Operator's Environment (PYTOPE)

## Running PYTOPE
There are various ways to run PYTOPE locally on your machine. The preferred method is to run the entire application, front and back-end, within a Docker container. However, if a less memory intensive method is preferred, any of the other setup sections will suffice.

### Docker Method
The following steps assume you have Docker Desktop installed on your machine with the Docker daemon already running in the background. Because we are bind mounting local volumes from your machine to the container, **Windows** systems must make sure that their C drive is selected under *Resources > File Sharing* in the Docker Desktop settings; Mac and Linux systems does not require this step. 

#### Automated Docker Setup (Recommended)
A `pytope.py` script has been created to simplify the process of starting up the PYTOPE runtime container environment; this eliminates the need to manually run the Docker commands as seen in the next section. To successfully use this script you must be in the root project folder. For information on the command arguments use `python3 pytope.py -h`.

There are two type of Docker environments: dev and test. In the dev environment, the entire project from your local machine is bind mounted to the container; this means that changes made locally on your machine are automatically reflected within the container. Bind mounting is done such that hot reloading is still functional, this will allow you to make change to both the front and back-end code and have them implemented immediately on `localhost:3000`. In the test environment, no bind mounting is performed. Rather the code is pulled directly from the `main` branch of the 
python-test-environment repository on GitLab using an access token hard coded into `Dockerfile.test`. This environment is helpful for testing the latest code on `main` without modifying the development version of PYTOPE.

After the container starts successfully (wait for the top right tmux pane to show that the React development server has started successfully), head over to `localhost:3000` to interact with the PYTOPE GUI.

##### To build the image and start the container
```bash
# navigate to root project folder
# valid values for <env>: dev | test
$ python3 pytope.py -b <env>
```

##### To start the container
```bash
# navigate to root project folder
# the respective Docker should have already been built (dev or test)
$ python3 pytope.py <env>
```

#### Manual Docker Setup
These are the Docker commands that the `pytope.py` script uses under the hood to build the image and start a container.

##### Build the development image
```bash
# navigate to root project folder
$ docker build -t pytope:dev -f Dockerfile.dev .
```

##### Start the development image
```bash
# navigate to root project folder
$ docker run --rm -it -v "${PWD}:/root/pytope" -p 127.0.0.1:3000:3000 pytope .
```

##### Build the test image
```bash
# navigate to root project folder
$ docker build -t pytope:test -f Dockerfile.test .
```

##### Start the test image
```bash
# navigate to root project folder
$ docker run --rm -it -p 127.0.0.1:3000:3000 pytope:test
```

### Manual Method

##### Start React Frontend:
```bash
$ cd app
$ npm i
$ npm start
```

##### Start Sass Compiler:
```bash
$ cd app
# npm i should have already been run
$ npm run sass
```

##### Start Flask Server (Windows):
```bash
$ cd server
# `pip3 install venv` if venv is not already installed
$ python3 -m venv venv
$ .\venv\Scripts\activate
$ pip3 install -r requirements.txt
$ $env:FLASK_APP = "server.py"
$ flask run

# use to deactivate the virtual env
$ deactivate
```

##### Start Flask Server (Linux/MacOS):
```bash
$ cd server
# `pip3 install venv` if venv is not already installed
$ python3 -m venv venv
$ source venv/bin/activate
$ pip3 install -r requirements.txt
$ export FLASK_APP = "server.py"
$ flask run

# use to deactivate the virtual env
$ deactivate
```
