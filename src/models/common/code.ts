// TODO: 서버 코드 관리와 연계
export enum CloudTypes {
  Baremetal = 1,
  Openstack = 2,
}

export enum CloudStatus {
  Saved = 1, // 저장
  Provisioning = 2, // 설치중
  Provisioned = 3, // 설치완료
  Failed = 4, //설치 실패
  Deleting = 5, // 삭제중
  Deleted = 6, // 삭제완료
}

export enum BootstrapProviders {
  "Kubeadm" = 1,
  "MicroK8s" = 2,
  "K3s" = 3,
}

export enum K8sVersions {
  // "1.22.0" = 1,
  // "1.23.0" = 2,
  "1.23.3" = 3,
  "1.23.8+k3s2" = 4,
  // "1.24.3" = 6,
  "1.24.5" = 7,
  "1.25.6" = 9,
  "1.26.1" = 10,
}

export enum ImageChecksumTypes {
  md5 = 1,
  sha256 = 2,
  sha512 = 3,
}

export enum ImageFormats {
  raw = 1,
  qcow2 = 2,
  vdi = 3,
  vmdk = 4,
  "live-iso" = 5,
}

export enum BootModes {
  UEFI = 1,
  legacy = 2,
  UEFISecureBoot = 3,
}

export enum NodeTypes {
  "Master" = 1,
  "Worker" = 2,
}

export enum UserRoles {
  "Admin" = 1,
  "Manager" = 2,
  "User" = 3,
}

export enum ImageTypes {
  "Baremetal Cloud" = 1,
  "Openstack Cluster" = 2,
}

export enum ImageOsTypes {
  "Ubuntu 20.04" = 1,
  "Ubuntu 18.04" = 2,
}

export enum BenchmarksStatus {
  "In Progress" = 1,
  Completed = 2,
  Failed = 3,
}

export enum SecurityStatus {
  "In Progress" = 1,
  Completed = 2,
  Failed = 3,
}

export enum SecurityItemStatus {
  Pass = 1,
  Failed = 2,
}

export enum BackResType {
  Backup = "B",
  Restore = "R",
}

export enum BackResStatus {
  Running = "R",
  Completed = "C",
  Failed = "F",
  PartiallyFailed = "P",
}
