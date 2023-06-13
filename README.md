# edgecraft-dashboard


## docker build

- backend uri 환경변수를 정의 해야 한다

```sh
## default env
# ENV BACKEND_BASE_URL=http://192.168.88.201
# ENV BACKEND_BASE_PORT=31810

$ docker build -e BACKEND_BASE_URL=http://192.168.88.201 -e BACKEND_BASE_PORT=31810 --tag edgecraft-dashboard .
```

**--Update Required--**



