FROM node:12-alpine as package

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN apk --no-cache add python make g++ git

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

# The instructions for second stage
FROM node:12-alpine as builder

WORKDIR /usr/src/app
COPY --from=package node_modules node_modules
COPY . .

RUN yarn build

# static server
FROM nginx:alpine as nginx

COPY /srv/conf.d /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html

RUN chmod -R 0755 /usr/share/nginx/html/*

EXPOSE 80
