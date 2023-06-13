#-------------------------------------------
# STEP 1 : build executable binary
#-------------------------------------------
FROM node:18-alpine3.17 as build

RUN apk update && apk upgrade

WORKDIR /app

COPY . /app

# build the nuxt project to generate the artifacts in .output directory
RUN yarn install && yarn build

#-------------------------------------------
# STEP 2 : build a image
#-------------------------------------------
FROM node:18-alpine3.17

RUN apk update && apk upgrade && apk add dumb-init

WORKDIR /app
COPY --from=build /app/.output ./
COPY --from=build /app/scripts/shell-scripts/run.sh ./run.sh

# expose 3000 on container
EXPOSE 3000

CMD ["./run.sh"]
