FROM node:9.8.0-alpine

WORKDIR /usr/src/sdd-api

COPY ./ ./

RUN apk add --no-cache --virtual .gyp \
    python \
    make \
    git \
    g++ 

CMD ["/bin/sh"]