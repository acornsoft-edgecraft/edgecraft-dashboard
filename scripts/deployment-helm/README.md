# edgecraft-dashboard
## docker build

- backend uri 환경변수를 정의 해야 한다

```sh
## default env
# ENV BACKEND_BASE_URL=http://192.168.88.201
# ENV BACKEND_BASE_PORT=31810

$ docker build --tag edgecraft-dashboard .
$ docker run -d --name edgecraft-dashboard -e BACKEND_BASE_URL=http://192.168.88.201 -e BACKEND_BASE_PORT=31810  -p 3000:3000 edgecraft-dashboard
```

## Deployment in kubernetes

### 1. Deployment yaml 작성
```sh
## step-1. ConfigMap for Backend Service
$ vi edgecraft-dashboard-deploy-77.yaml
---
apiVersion: v1
kind: Service
metadata:
  name: edgecraft-dashboard-service
  namespace: edgecraft
spec:
  type: NodePort
  selector:
    app: edgecraft-dashboard
  ports:
  - name: edgecraft-dashboard-service-port
    protocol: TCP
    port: 3000
    targetPort: 3000
    nodePort: 31030

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: edgecraft-dashboard
  namespace: edgecraft
  labels:
    app: edgecraft-dashboard
spec:
  replicas: 1
  selector:
    matchLabels:
      app: edgecraft-dashboard
  template:
    metadata:
      labels:
        app: edgecraft-dashboard
    spec:
      containers:
      - name: edgecraft-dashboard
        image: ghcr.io/acornsoft-edgecraft/edgecraft-dashboard:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
          protocol: TCP
        env:
        - name: BACKEND_BASE_URL
          valueFrom:
            configMapKeyRef:
              name: edgecraft-dashboard-env
              key: BACKEND_BASE_URL
        - name: BACKEND_BASE_PORT
          valueFrom:
            configMapKeyRef:
              name: edgecraft-dashboard-env
              key: BACKEND_BASE_PORT
        resources:
          limits:
            cpu: 200m
            memory: 200Mi
          requests:
            cpu: 100m
            memory: 100Mi
        securityContext:
          privileged: false
          # readOnlyRootFilesystem: true
          runAsNonRoot: false
          allowPrivilegeEscalation: false

---
apiVersion: v1
kind: ConfigMap
metadata:
  name: edgecraft-dashboard-env
  namespace: edgecraft
data:
  BACKEND_BASE_URL: "https://edgecraft-api.k3.acornsoft.io"
  BACKEND_BASE_PORT: ""

## step-2. 
$ kubectl apply -f edgecraft-dashboard-deploy-77.yaml
```

### 2. Nuxt build 적용 방법 

Nuxt build시 적용되는 BACKEND_BASE_URL, BACKEND_BASE_PORT 값을 Nuxt 실행 파일을 직접 수정해서 적용 해야 한다.
이를 위해 아래와 같이 RUN Script를 작성 한다.
```sh
## step-1. configmap 내용을 nuxt 실행 파일에 직접 수정한다.
$ vi run.sh
#!/bin/sh

set -x
set -eE

index=0
scheme=""
url=""
for i in $(echo $BACKEND_BASE_URL | tr "://" "\n")
do
    index=$((index + 1))
    if [ $index == 1 ]; then
        scheme=$i
    else
        url=$i
    fi
done

check_str="\"production\""
change_str="backendUrl\:\"$scheme\:\\\u002F\\\u002F$url\"\,backendPort\:\"$BACKEND_BASE_PORT\""
change_str2="\"backendUrl\"\:\"$scheme\:\/\/$url\"\,\"backendPort\"\:\"$BACKEND_BASE_PORT\""

public_list=$(grep -l -r -i "$check_str" public)
server_list=$(grep -l -r -i "$check_str" server)

for i in $public_list
do
    sed -i -e "s/\($check_str\).*\(version\)/\1\,$change_str\,\2/" $i
done

for i in $server_list
do
    sed -i -e "s/\(\(NUXT_\).*\($check_str\)\).*\(\(\"version\).*\(public\)\)/\1\,$change_str2\,\4/" $i
    sed -i -e "s/\(\(public\).*\($check_str\)\).*\(\"version\)/\1\,$change_str2\,\4/" $i
done

dumb-init node ./server/index.mjs
```

### 3. edgecraft-dashboard container image 생성

```sh
## step-1. edgecraft-dashboard 이미지 생성 Dockerfile 작성
$ vi Dockerfile
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
```

**--Update Required--**



