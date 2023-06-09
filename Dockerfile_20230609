#-------------------------------------------
# STEP 1 : build executable binary
#-------------------------------------------
FROM node:18.8.0-alpine as builder

ADD . /usr/src/app

WORKDIR /usr/src/app
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
RUN npm rebuild esbuild
RUN npm install --no-optional
RUN npm run generate

#-------------------------------------------
# STEP 2 : build a image
#-------------------------------------------
FROM nginx:1.23.1-alpine

RUN rm -rf /usr/share/nginx/html/connect /usr/share/nginx/html/device /usr/share/nginx/html/event /usr/share/nginx/html/system /usr/share/nginx/html/tag /usr/share/nginx/html/test /usr/share/nginx/html/user /usr/share/nginx/html/auth /usr/share/nginx/html/emit-prop /usr/share/nginx/html/monitoring /usr/share/nginx/html/dashboard

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# mjs mime 추가
RUN sed -i 's/js;/js mjs;/' /etc/nginx/mime.types


ENV HOST 0.0.0.0
ENV BACKEND_PORT 3001

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

## docker build -t edgecraft .
## docker run --rm --name edgecraft -p 80:80 edgecraft
## docker exec -it edgecraft /bin/sh