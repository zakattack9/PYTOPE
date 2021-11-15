FROM docker

RUN apk add --no-cache py3-pip
RUN pip3 install \
      coverage \
      docker \
      flask \
      flask-socketio
