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
  openstack_cloud: "",
  openstack_cloud_provider_conf_b64: "",
  openstack_cloud_yaml_b64: "",
  openstack_cloud_cacert_b64: "",
  dns_nameservers: "",
  failure_domain: "",
  image_name: "",
  ssh_key_name: "",
  external_network_id: "",
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
  api_server_floating_ip: { required, ipAddress },
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
