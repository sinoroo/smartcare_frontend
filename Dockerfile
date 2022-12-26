FROM node:14-alpine

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN npm install
RUN apk add --no-cache git

COPY . /app

CMD ["npx", "serve", "-s", "build"]
