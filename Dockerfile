FROM node:12-alpine
WORKDIR /app
COPY package.json package.json
RUN apk add --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp
COPY . /app
ENTRYPOINT npm run start
EXPOSE 8080
CMD [ "http-server", "dist" ]
