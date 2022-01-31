ARG env=dev

FROM docker AS base
RUN apk add --no-cache --update py3-pip npm
RUN pip3 install \
      coverage \
      docker \
      flask \
      flask-socketio
WORKDIR /root/user

FROM base AS base-dev
 

FROM base AS base-prod
RUN git clone https://docker_img_env:UnpyVDQNqzktj2qUFB6i@gitlab.com/haydenlhannappel/python-test-environment.git

FROM base-${env} AS final
