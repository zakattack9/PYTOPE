# global args with defaults; must redeclare for each build stage
ARG PYTOPE_ENV=dev
ARG DIR=/root/pytope

FROM docker AS base
RUN apk add --no-cache --update \
      py3-pip \
      npm \
      tmux \
      git

FROM base AS base-dev
ARG DIR
ARG PYTOPE_ENV
VOLUME ${DIR}

FROM base AS base-prod
ARG DIR
ARG PYTOPE_ENV
RUN git clone -b 83-zak https://docker_img_env:UnpyVDQNqzktj2qUFB6i@gitlab.com/haydenlhannappel/python-test-environment.git $DIR
RUN cd $DIR && \
    pip3 install -r ./server/requirements.txt && \
    cd app && \
    npm install

FROM base-${PYTOPE_ENV} AS final
ENV FLASK_APP=server
ENV PYTOPE_ENV=$PYTOPE_ENV
EXPOSE 3001

COPY boot.sh /tmp/
RUN chmod +x /tmp/boot.sh && \
    echo set -g mouse on > ~/.tmux.conf

CMD ["sh", "-c", "/tmp/boot.sh"]
