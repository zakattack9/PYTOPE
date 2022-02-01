#!/bin/sh
# creates tmux panes and starts services:
#   - pane for react app (npm start)
#   - pane for flask server (flask run)
#   - pane for sass: dev only (npm run sass)
export PYTOPE_DIR=/root/pytope

add_exitp() {
  tmux send -t pytope 'alias exitp="tmux kill-session -t pytope" && clear' Enter
}

# create new tmux session and detach from client
tmux new -d -c "$PYTOPE_DIR/server" -s pytope
# start Flask WebSocket server (pane 0)
add_exitp
tmux send -t pytope "flask run" Enter

# split window into two horizontal panes
tmux splitw -h -c "$PYTOPE_DIR/app"
# start react app (pane 1)
add_exitp
tmux send -t pytope "npm start" Enter

# $PYTOPE_ENV set in Dockerfile
if [ $PYTOPE_ENV = "dev" ]; then
  # split pane on the right into to vertical panes
  tmux splitw -v -c "$PYTOPE_DIR/app"
  # start sass compiler (pane 2)
  add_exitp
  tmux send -t pytope "npm run sass" Enter
fi;

# attach tmux session to client for access
tmux attach -t pytope
