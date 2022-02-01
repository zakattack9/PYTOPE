# python-test-environment

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
`docker build -t pytope .` 

#### Development Run
`docker run --rm -it -v "`pwd`:/root/pytope" -p 127.0.0.1:3000:3000 pytope`
