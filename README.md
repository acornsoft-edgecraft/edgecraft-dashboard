# Edgecraft Dashboard
> Edgecraft dashboard

Edgecraft Dashboard는 클라우드 인프라/클러스터 구축 자동화를 위한 웹 기반 UI입니다. ```Kubernetes Cluster API``` 기반으로 사용자는 다중 Kubernetes 클러스터의 프로비저닝, 업그레이드, Cluster Lifecycle을 관리할 수 있습니다.
또한 다중 클러스터에서 실행되고 있는 애플리케이션 뿐만 아니라 클러스터 자체를 관리할 수 있습니다.

## Features

- Cluster Infrastructure Providers.
- Provisining a Kubernetes Cluster.
- Add/Delete Kubernetes worker node,
- Version Upgrade Kubernetes cluster.
- Deploys Single or Highly Available (HA) Kubernetes

## Getting Started

### Installation

- [edgecraft-api](https://github.com/acornsoft-edgecraft/edgecraft-api)가 먼저 준비되어 있어야 합니다.

사용자 환경에 맞게 configmap에서 ```BACKEND_BASE_URL```, ```BACKEND_BASE_PORT``` 값을 변경해 주세요

```bash
$ kubectl apply -f https://raw.githubusercontent.com/acornsoft-edgecraft/edgecraft-dashboard/main/scripts/install/kubernetes/edgecraft-dashboard.yaml
```

### Access

1. Open in your browser `http://<cluster-ip>:31030/`


## Documentation

* See [User Guide](./docs/user/README.md) page.
* See [Developer Guide](./docs/developer/README.md) page.

