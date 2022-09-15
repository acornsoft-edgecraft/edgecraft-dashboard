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

export enum K8sVersions {
  "1.22.0" = 1,
  "1.23.0" = 2,
}

export enum ImageChecksumTypes {
  md5,
  sha256,
  sha512,
}

export enum ImageFormats {
  raw,
  qcow2,
  vdi,
  vmdk,
  "live-iso",
}

export enum BootModes {
  UEFI,
  legacy,
  UEFISecureBoot,
}

export enum NodeTypes {
  MASTER = "Master",
  WORKER = "Worker",
}

export enum UserRoles {
  Admin = "Admin",
  Manager = "Manager",
  User = "User",
}
