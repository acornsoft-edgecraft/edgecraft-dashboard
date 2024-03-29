import { required, requiredIf, CIDR, ipAddress } from "~/models/common/validators";

export interface openstackConfInfo {
  node_cidr: String;
  openstack_cloud: String;
  openstack_cloud_provider_conf_b64: String;
  openstack_cloud_yaml_b64: String;
  openstack_cloud_cacert_b64: String;
  dns_nameservers: String;
  failure_domain: String;
  image_name: String;
  ssh_key_name: String;
  external_network_id: String;
  api_server_floating_ip: String;
  use_bastion_host: Boolean;
  bastion_flavor: String;
  bastion_image_name: String;
  bastion_ssh_key_name: String;
  bastion_floating_ip: String;
}

export const defaultOpenstackConfInfo: openstackConfInfo = {
  node_cidr: "10.6.0.0/24",
  openstack_cloud: "openstack",
  openstack_cloud_provider_conf_b64: "",
  openstack_cloud_yaml_b64: "",
  openstack_cloud_cacert_b64: "Cg==",
  dns_nameservers: "168.126.63.1",
  failure_domain: "nova",
  image_name: "edgecraft-kube-v1.23.3",
  ssh_key_name: "hostacloud",
  external_network_id: "396da06f-3577-4e5c-9bda-b7400b917282",
  api_server_floating_ip: "",
  use_bastion_host: false,
  bastion_flavor: "",
  bastion_image_name: "",
  bastion_ssh_key_name: "",
  bastion_floating_ip: "",
};

export const defaultOpenstackConfValidation = {
  node_cidr: { required, CIDR },
  openstack_cloud: { required },
  openstack_cloud_provider_conf_b64: { required },
  openstack_cloud_yaml_b64: { required },
  openstack_cloud_cacert_b64: { required },
  dns_nameservers: { required },
  failure_domain: { required },
  image_name: { required },
  ssh_key_name: { required },
  external_network_id: { required },
  api_server_floating_ip: { ipAddress },
  use_bastion_host: { required },
  // @ts-ignore
  bastion_flavor: { required: requiredIf((_, vm) => vm.use_bastion_host) },
  // @ts-ignore
  bastion_image_name: { required: requiredIf((_, vm) => vm.use_bastion_host) },
  // @ts-ignore
  bastion_ssh_key_name: { required: requiredIf((_, vm) => vm.use_bastion_host) },
  // @ts-ignore
  bastion_floating_ip: { ipAddress },
};
