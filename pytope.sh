#!/bin/sh

# builds the docker image with env=[dev | prod]
# starts the container:
#   - mounts volume if env is dev
#   - opens a pseudo-terminal with tmux panes:
#       - pane for react app output (npm start)
#       - pane for flask server output (flask run)
#       - pane for sass output: dev only (npm run sass)
# after container boots, localhost:3001 should be available
# choose "dev" as default env and "." as volume directory

