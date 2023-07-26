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

**--Update Required--**

