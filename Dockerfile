# global args with defaults; must redeclare for each build stage
ARG PYTOPE_ENV=dev
ARG DIR=/root/pytope

# base docker images with necessary packages installed
FROM docker AS base
RUN apk add --no-cache --update \
      py3-pip \
      npm \
      tmux \
      git \
      bash

# build instructions specific for dev environment
FROM base AS base-dev
ARG DIR
ARG PYTOPE_ENV
VOLUME ${DIR}

# build instructions specific for prod environment
FROM base AS base-prod
ARG DIR
ARG PYTOPE_ENV
RUN git clone https://docker_img_env:UnpyVDQNqzktj2qUFB6i@gitlab.com/haydenlhannappel/python-test-environment.git $DIR && \
    cd $DIR && \
    pip3 install -r ./server/requirements.txt && \
    cd app && \
    npm install

# final build configurations for both dev and prod
FROM base-${PYTOPE_ENV} AS final
ENV FLASK_APP=server
ENV PYTOPE_ENV=$PYTOPE_ENV
EXPOSE 3000

# copy the boot script to start PYTOPE
COPY boot.sh /tmp/
RUN chmod +x /tmp/boot.sh && \
    echo set -g mouse on > ~/.tmux.conf

CMD ["sh", "-c", "/tmp/boot.sh"]
