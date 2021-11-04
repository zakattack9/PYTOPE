FROM docker

RUN apk add --no-cache py3-pip
RUN pip3 install \
      coverage \
      mock \
      docker \
      flask \
      flask-socketio
