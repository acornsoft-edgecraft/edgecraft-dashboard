import { required, requiredIf } from "@vuelidate/validators";

export interface openstackConfInfo {
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
}

export const defaultOpenstackConfInfo: openstackConfInfo = {
  openstack_cloud: "1",
  openstack_cloud_provider_conf_b64: "1",
  openstack_cloud_yaml_b64: "1",
  openstack_cloud_cacert_b64: "1",
  dns_nameservers: "1",
  failure_domain: "1",
  image_name: "1",
  ssh_key_name: "1",
  external_network_id: "1",
  api_server_floating_ip: "1",
  use_bastion_host: false,
  bastion_flavor: "",
  bastion_image_name: "",
  bastion_ssh_key_name: "",
};

export const defaultOpenstackConfValidation = {
  openstack_cloud: { required },
  openstack_cloud_provider_conf_b64: { required },
  openstack_cloud_yaml_b64: { required },
  openstack_cloud_cacert_b64: { required },
  dns_nameservers: { required },
  failure_domain: { required },
  image_name: { required },
  ssh_key_name: { required },
  external_network_id: { required },
  api_server_floating_ip: { required },
  use_bastion_host: { required },
  // @ts-ignore
  bastion_flavor: { required: requiredIf((_, vm) => vm.use_bastion_host) },
  // @ts-ignore
  bastion_image_name: { required: requiredIf((_, vm) => vm.use_bastion_host) },
  // @ts-ignore
  bastion_ssh_key_name: { required: requiredIf((_, vm) => vm.use_bastion_host) },
};