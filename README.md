# Python Test Operator's Environment (PYTOPE)

## Running PYTOPE

There are various ways to run PYTOPE locally on your machine. The preferred method is to run the entire application, front and back-end, within a Docker container; however, if a less memory intensive method is preferred, the [Manual Method](https://gitlab.com/haydenlhannappel/python-test-environment/-/tree/83-zak#manual-method) section will suffice.

### Docker Method

The following steps assume you have Docker Desktop installed on your machine with the Docker
daemon already running in the background. Because we are bind mounting local volumes from your
to the container, **Windows** systems must make sure that their C drive is selected under
_Resources > File Sharing_ in the Docker Desktop settings; Mac and Linux systems does not require this step.

##### Docker environment types

- In the **dev** environment,
- the entire project from your local machine is bind mounted to the container;
- simply put, changes made locally on your machine are automatically reflected within the container. B
- ind mounting is done so that hot reloading is still functional, allowing you to make changes to both the front and back-end code on your local machine while having those changes implemented immediately without any restarting or refreshing needed within the container.
- In the **test** environment, no bind mounting is performed. Rather the code is pulled directly from the `main` branch of the python-test-environment repository on GitLab using an access token hard coded into `Dockerfile.test`. This environment is helpful for testing the latest code on `main` without needing to manually pull down the code or switch branches.

Both Docker images use tmux to run and display all running PYTOPE processes/servers. After the container starts successfully (wait for the top right tmux pane to show that the React development server has started successfully), head over to `localhost:3000` to interact with the PYTOPE GUI. The Flask server should be running in the left tmux pane. In the dev environment, the bottom right tmux pane is the SASS live compiler that automatically transforms SCSS to CSS when changes are detected. Again, once the Flask and React servers are running, they should automatically update/refresh upon saving code changes.

##### Exiting the container

To exit the PYTOPE dev/test container, select any one of the three or two panes and hit `Ctrl+c` to kill the server/process. The alias `exitp` has been sourced into each pane. Entering `exitp` will end the tmux session and subsequently kill the container.

##### When to build/rebuild the images

The dev or test environment needs to have its Docker image built at least once before a container can be spun up. If the dependencies in `app/package.json` or `server/requirements.txt` are modified, the _development_ Docker image must be rebuilt; failure to do so will result in missing dependencies once the container is booted. If the code in `main` is updated/modified, the _test_ Docker image must be rebuilt so that it contains the latest code.

#### Automated Docker Setup (Recommended)

A `pytope.py` script has been created to simplify the process of building and starting up the PYTOPE container environment; this eliminates the need to manually run the Docker commands as provided in the [Manual Docker Setup](https://gitlab.com/haydenlhannappel/python-test-environment/-/tree/83-zak#manual-docker-setup) section. To successfully use this script, you must be in the root project folder. For information on the command arguments use `python3 pytope.py -h`.

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
# if specifying dev for <env> the following shorthand can be used
$ python3 pytope.py
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
$ docker run --rm -it -v "${PWD}:/root/pytope" -p 127.0.0.1:3000:3000 pytope:dev .
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

The following sections can be used to run the PYTOPE application without Docker. Each section, React, Sass, Flask, assumes a new terminal session or process will be used to execute the set of commands.

##### Start React front-end:

```bash
$ cd app
$ npm i
$ npm start
```

##### Start Sass compiler:

```bash
$ cd app
# npm i should have already been run
$ npm run sass
```

##### Start Flask server (Windows):

```powershell
$ cd server
# `pip3 install venv` if venv is not already installed
$ python3 -m venv venv
$ .\venv\Scripts\activate
$ pip3 install -r requirements.txt
$ $env:FLASK_APP = "server.py"
$ flask run

MAKE SURE DOCKER IS RUNNING

# use to deactivate the virtual env
$ deactivate
```

##### Start Flask server (Linux/MacOS):

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

## Resources

- https://www.doc.ic.ac.uk/~nuric/coding/how-to-discover-and-run-unit-tests-programmatically-in-python.html
- https://mherman.org/blog/dockerizing-a-react-app/
