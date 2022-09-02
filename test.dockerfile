#-------------------------------------------
# STEP 1 : build executable binary
#-------------------------------------------
FROM node:18.8.0-alpine as builder

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY package.json .
RUN yarn install
COPY . .

# build
RUN yarn build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "yarn", "start" ]