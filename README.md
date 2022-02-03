# Python Test Operator's Environment (PYTOPE)

## Running PYTOPE
There are various ways to run PYTOPE locally on your machine. The preferred method is to run the entire application, front and back-end, within a Docker container. However, if a less memory intensive method is preferred, any of the other setup sections will suffice.

### Docker
The following steps assume you have Docker Desktop installed on your machine with the Docker daemon already running in the background. Because we are bind mounting local volumes from your machine to the container, **Windows** systems must make sure that their C drive is selected under *Resources > File Sharing* in the Docker Desktop settings; Mac and Linux systems does not require this step. 

#### Automated Setup (Recommended)
A `pytope.py` script has been created to simplify the process of starting up the PYTOPE runtime container environment; this eliminates the need to manually run the Docker commands as seen in the next section. To successfully use this script you must be in the root project folder.

##### To build the image
```bash
# navigate to root project folder
$ python3 pytope.py <env>
```

##### To start the container

Start React Frontend (Windows):
cd app
npm i
npm start

Start Flask Server (Windows):
cd flask-server
.\venv\Scripts\activate
$env:FLASK_APP = "server.py"
flask run

## Docker
The following build commands should be run in the root project folder where the `Dockerfile` resides.

### Production Build
`docker build -t pytope-prod --build-arg PYTOPE_ENV=prod .`

#### Production Run
`docker run --rm -it pytope-prod`

### Development Build
`docker build -t pytope:dev -f Dockerfile.dev .`

#### Development Run
`docker run --rm -it -v "${PWD}:/root/pytope" -p 127.0.0.1:3000:3000 pytope`
