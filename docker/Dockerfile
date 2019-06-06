# File: ./Dockerfile
FROM node:8.12.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn add serverless -g

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]