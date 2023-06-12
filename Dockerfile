#-------------------------------------------
# STEP 1 : build executable binary
#-------------------------------------------
FROM node:18-alpine3.17 as build

RUN apk update && apk upgrade

WORKDIR /app

COPY . /app

ENV BACKEND_BASE_URL=http://localhost
ENV BACKEND_BASE_PORT=80

# build the nuxt project to generate the artifacts in .output directory
RUN yarn install && yarn generate

#-------------------------------------------
# STEP 2 : build a image
#-------------------------------------------
FROM nginx:1.23.1-alpine

RUN apk update && apk upgrade && apk add dumb-init

RUN rm -rf /usr/share/nginx/html/connect /usr/share/nginx/html/device /usr/share/nginx/html/event /usr/share/nginx/html/system /usr/share/nginx/html/tag /usr/share/nginx/html/test /usr/share/nginx/html/user /usr/share/nginx/html/auth /usr/share/nginx/html/emit-prop /usr/share/nginx/html/monitoring /usr/share/nginx/html/dashboard

COPY --from=build /app/dist /usr/share/nginx/html

RUN sed -i 's/js;/js mjs;/' /etc/nginx/mime.types

# expose 80 on container
EXPOSE 80

ENTRYPOINT ["dumb-init", "nginx", "-g", "daemon off;"]