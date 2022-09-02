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
RUN yarn generate

#-------------------------------------------
# STEP 2 : build a image
#-------------------------------------------
FROM nginx:1.23.1-alpine

RUN rm -rf /usr/share/nginx/html/connect /usr/share/nginx/html/device /usr/share/nginx/html/event /usr/share/nginx/html/system /usr/share/nginx/html/tag /usr/share/nginx/html/test /usr/share/nginx/html/user /usr/share/nginx/html/auth /usr/share/nginx/html/emit-prop /usr/share/nginx/html/monitoring /usr/share/nginx/html/dashboard

COPY --from=builder /usr/src/nuxt-app/dist /usr/share/nginx/html

ENV HOST 0.0.0.0
ENV BACKEND_PORT 3001

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]