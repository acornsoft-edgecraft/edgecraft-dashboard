<template>
  <div class="partial-container m-0 p-0">
    <div calss="p-card">
      <h5 class="form-title">등록 정보 확인</h5>
      <div class="field grid">
        <div class="field col-12">
          <K3Accordion :multiple="true" :activeIndex="[0, 1, 2, 3, 4]">
            <K3AccordionTab header="Cloud 정보">
              <K3FormContainer class="no-style">
                <K3FormRow>
                  <K3FormColumn label="Cloud 명">{{ modelValue.cloud.name }}</K3FormColumn>
                </K3FormRow>
                <K3FormRow>
                  <K3FormColumn label="Cloud 유형">{{ CloudTypes[modelValue.cloud.type] }}</K3FormColumn>
                </K3FormRow>
                <K3FormRow>
                  <K3FormColumn label="Cloud 설명">{{ modelValue.cloud.desc }}</K3FormColumn>
                </K3FormRow>
              </K3FormContainer>
            </K3AccordionTab>
            <K3AccordionTab header="Cluster 정보">
              <K3Fieldset legend="Kubernetes 설치 정보" :toggleable="true">
                <K3FormContainer class="no-style">
                  <K3FormRow>
                    <K3FormColumn label="Version">{{ K8sVersions[modelValue.cluster.k8s.version] }}</K3FormColumn>
                  </K3FormRow>
                  <K3FormRow>
                    <K3FormColumn label="POD CIDR">{{ modelValue.cluster.k8s.pod_cidr }}</K3FormColumn>
                  </K3FormRow>
                  <K3FormRow>
                    <K3FormColumn label="Service CIDR">{{ modelValue.cluster.k8s.svc_cidr }}</K3FormColumn>
                  </K3FormRow>
                </K3FormContainer>
              </K3Fieldset>
              <K3Fieldset legend="Baremetal 설치 정보" :toggleable="true" class="mt-3">
                <K3FormContainer class="no-style">
                  <K3FormRow>
                    <K3FormColumn label="BMC Credential">
                      <K3FormContainer class="no-style w-full">
                        <K3FormRow direction="vertical">
                          <K3FormColumn label="Secret Name">{{ modelValue.cluster.baremetal.secret_name }}</K3FormColumn>
                          <K3FormColumn label="User Name">{{ modelValue.cluster.baremetal.user_name }}</K3FormColumn>
                          <K3FormColumn label="Password">{{ modelValue.cluster.baremetal.password }}</K3FormColumn>
                        </K3FormRow>
                      </K3FormContainer>
                    </K3FormColumn>
                    <K3FormColumn label="Image URL">{{ modelValue.cluster.baremetal.image_url }}</K3FormColumn>
                    <K3FormColumn label="Image Checksum">{{ modelValue.cluster.baremetal.image_checksum }}</K3FormColumn>
                    <K3FormColumn label="Image Checksum Type">{{ ImageChecksumTypes[modelValue.cluster.baremetal.image_checksum_type] }}</K3FormColumn>
                    <K3FormColumn label="Image Format">{{ ImageFormats[modelValue.cluster.baremetal.image_format] }}</K3FormColumn>
                    <K3FormColumn label="Control Plane Kubeadm Extra Config">
                      <K3FormContainer class="no-style w-full">
                        <K3FormRow direction="vertical">
                          <K3FormColumn label="Pre Kubeadm Commands">{{ modelValue.cluster.baremetal.cp_kubeadm_extra_config.pre_kubeadm_commands }}</K3FormColumn>
                          <K3FormColumn label="Post Kubeadm Commands">{{ modelValue.cluster.baremetal.cp_kubeadm_extra_config.post_kubeadm_commands }}</K3FormColumn>
                          <K3FormColumn label="files">{{ modelValue.cluster.baremetal.cp_kubeadm_extra_config.files }}</K3FormColumn>
                          <K3FormColumn label="users">{{ modelValue.cluster.baremetal.cp_kubeadm_extra_config.users }}</K3FormColumn>
                          <K3FormColumn label="ntp">{{ modelValue.cluster.baremetal.cp_kubeadm_extra_config.ntp }}</K3FormColumn>
                          <K3FormColumn label="format">{{ modelValue.cluster.baremetal.cp_kubeadm_extra_config.format }}</K3FormColumn>
                        </K3FormRow>
                      </K3FormContainer>
                    </K3FormColumn>
                    <K3FormColumn label="Workers Kubeadm Extra Config">
                      <K3FormContainer class="no-style w-full">
                        <K3FormRow direction="vertical">
                          <K3FormColumn label="Pre Kubeadm Commands">{{ modelValue.cluster.baremetal.worker_kubeadm_extra_config.pre_kubeadm_commands }}</K3FormColumn>
                          <K3FormColumn label="Post Kubeadm Commands">{{ modelValue.cluster.baremetal.worker_kubeadm_extra_config.post_kubeadm_commands }}</K3FormColumn>
                          <K3FormColumn label="files">{{ modelValue.cluster.baremetal.worker_kubeadm_extra_config.files }}</K3FormColumn>
                          <K3FormColumn label="users">{{ modelValue.cluster.baremetal.worker_kubeadm_extra_config.users }}</K3FormColumn>
                          <K3FormColumn label="ntp">{{ modelValue.cluster.baremetal.worker_kubeadm_extra_config.ntp }}</K3FormColumn>
                          <K3FormColumn label="format">{{ modelValue.cluster.baremetal.worker_kubeadm_extra_config.format }}</K3FormColumn>
                        </K3FormRow>
                      </K3FormContainer>
                    </K3FormColumn>
                  </K3FormRow>
                </K3FormContainer>
              </K3Fieldset>
            </K3AccordionTab>
            <K3AccordionTab header="Node 정보">
              <K3FormContainer class="no-style">
                <K3FormRow>
                  <K3FormColumn label="Use LoadBalancer">{{ modelValue.nodes.use_loadbalancer }}</K3FormColumn>
                </K3FormRow>
                <K3FormRow v-if="modelValue.nodes.use_loadbalancer">
                  <K3FormColumn label="Load Balancer IP" :size="6">{{ modelValue.nodes.loadbalancer_address }}</K3FormColumn>
                  <K3FormColumn label="Load Balancer Port" :size="6">{{ modelValue.nodes.loadbalancer_port }}</K3FormColumn>
                </K3FormRow>
              </K3FormContainer>
              <K3FormContainer class="no-style mt-3">
                <K3Fieldset legend="Master Nodes" :toggleable="true">
                  <template v-for="(node, index) in modelValue.nodes.master_nodes" :key="index">
                    <K3Divider type="dashed" v-if="index > 0" />
                    <K3Divider align="left">Baremetal Host</K3Divider>
                    <K3FormRow>
                      <K3FormColumn label="Host Name" :size="6">{{ node.baremetal.host_name }}</K3FormColumn>
                      <K3FormColumn label="BMC Address" :size="6">{{ node.baremetal.bmc_address }}</K3FormColumn>
                    </K3FormRow>
                    <K3FormRow>
                      <K3FormColumn label="Boot MAC Address" :size="6">{{ node.baremetal.boot_mac_address }}</K3FormColumn>
                      <K3FormColumn label="Boot Mode" :size="6">{{ node.baremetal.boot_mode }}</K3FormColumn>
                    </K3FormRow>
                    <K3FormRow>
                      <K3FormColumn label="Online (power)" :size="6">{{ node.baremetal.online_power }}</K3FormColumn>
                      <K3FormColumn label="Externally Provisioning" :size="6">{{ node.baremetal.external_provisioning }}</K3FormColumn>
                    </K3FormRow>
                    <K3Divider align="left">Node</K3Divider>
                    <K3FormRow>
                      <K3FormColumn label="Node Name" :size="6">{{ node.node.node_name }}</K3FormColumn>
                      <K3FormColumn label="IP Address" :size="6">{{ node.node.ip_address }}</K3FormColumn>
                    </K3FormRow>
                    <K3FormRow>
                      <K3FormColumn label="Labels">
                        <template v-for="(item, index) in node.node.labels" :key="index">
                          <K3Chip :label="`${item.key}=${item.value}`" />
                        </template>
                      </K3FormColumn>
                    </K3FormRow>
                  </template>
                </K3Fieldset>
              </K3FormContainer>
              <K3FormContainer class="no-style mt-3">
                <K3Fieldset legend="Worker Nodes" :toggleable="true">
                  <template v-for="(node, index) in modelValue.nodes.worker_nodes" :key="index">
                    <K3Divider type="dashed" v-if="index > 0" />
                    <K3Divider align="left">Baremetal Host</K3Divider>
                    <K3FormRow>
                      <K3FormColumn label="Host Name" :size="6">{{ node.baremetal.host_name }}</K3FormColumn>
                      <K3FormColumn label="BMC Address" :size="6">{{ node.baremetal.bmc_address }}</K3FormColumn>
                    </K3FormRow>
                    <K3FormRow>
                      <K3FormColumn label="Boot MAC Address" :size="6">{{ node.baremetal.boot_mac_address }}</K3FormColumn>
                      <K3FormColumn label="Boot Mode" :size="6">{{ node.baremetal.boot_mode }}</K3FormColumn>
                    </K3FormRow>
                    <K3FormRow>
                      <K3FormColumn label="Online (power)" :size="6">{{ node.baremetal.online_power }}</K3FormColumn>
                      <K3FormColumn label="Externally Provisioning" :size="6">{{ node.baremetal.external_provisioning }}</K3FormColumn>
                    </K3FormRow>
                    <K3Divider align="left">Node</K3Divider>
                    <K3FormRow>
                      <K3FormColumn label="Node Name" :size="6">{{ node.node.node_name }}</K3FormColumn>
                      <K3FormColumn label="IP Address" :size="6">{{ node.node.ip_address }}</K3FormColumn>
                    </K3FormRow>
                    <K3FormRow>
                      <K3FormColumn label="Labels">
                        <template v-for="(item, index) in node.node.labels" :key="index">
                          <K3Chip :label="`${item.key}=${item.value}`" class="mr-2" />
                        </template>
                      </K3FormColumn>
                    </K3FormRow>
                  </template>
                </K3Fieldset>
              </K3FormContainer>
            </K3AccordionTab>
            <K3AccordionTab header="ETCD/Storage 정보">
              <K3Fieldset legend="ETCD 설정" :toggleable="true">
                <K3FormContainer class="no-style">
                  <K3FormRow>
                    <K3FormColumn label="External ETCD">{{ modelValue.etcd_storage.etcd.use_external_etcd }}</K3FormColumn>
                  </K3FormRow>
                  <K3FormRow v-if="modelValue.etcd_storage.etcd.use_external_etcd">
                    <K3FormColumn label="Endpoints" :size="12">
                      <K3FormContainer class="no-style w-full">
                        <K3FormRow direction="horizontal" :overflow-wrap="true" v-for="(item, index) in modelValue.etcd_storage.etcd.endpoints" :key="index">
                          <K3FormColumn label="IP" :size="6">{{ item.ip_address }}</K3FormColumn>
                          <K3FormColumn label="Port" :size="6">{{ item.port }}</K3FormColumn>
                        </K3FormRow>
                      </K3FormContainer>
                    </K3FormColumn>
                    <K3FormColumn label="CA File">{{ modelValue.etcd_storage.etcd.ca_file }}</K3FormColumn>
                    <K3FormColumn label="CERT File">{{ modelValue.etcd_storage.etcd.cert_file }}</K3FormColumn>
                    <K3FormColumn label="KEY File">{{ modelValue.etcd_storage.etcd.key_file }}</K3FormColumn>
                  </K3FormRow>
                </K3FormContainer>
              </K3Fieldset>
              <K3Fieldset legend="STORAGE Class 설정" :toggleable="true" class="mt-3">
                <K3FormContainer class="no-style">
                  <K3FormRow>
                    <K3FormColumn label="Use Ceph">{{ modelValue.etcd_storage.storage_class.use_ceph }}</K3FormColumn>
                  </K3FormRow>
                  <K3FormRow v-if="modelValue.etcd_storage.storage_class.use_ceph">
                    <K3FormColumn label="Label 1">{{ modelValue.etcd_storage.storage_class.label1 }}</K3FormColumn>
                    <K3FormColumn label="Label 2">{{ modelValue.etcd_storage.storage_class.label2 }}</K3FormColumn>
                    <K3FormColumn label="Label 3">{{ modelValue.etcd_storage.storage_class.label3 }}</K3FormColumn>
                  </K3FormRow>
                </K3FormContainer>
              </K3Fieldset>
            </K3AccordionTab>
            <K3AccordionTab header="OpenStack 정보" v-if="modelValue.cloud.type == CloudTypes.Openstack">
              {{ modelValue.openstack }}
            </K3AccordionTab>
          </K3Accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CloudTypes, K8sVersions, ImageChecksumTypes, ImageFormats } from "~/models";

const props = defineProps({
  modelValue: { type: Object, required: true },
});
const emits = defineEmits(["can-continue"]);

const beforeNextStep = (): boolean => {
  return true;
};

onActivated(() => {
  emits("can-continue", { value: true });
});

onMounted(() => {
  emits("can-continue", { value: true });
  console.log(props.modelValue);
});

defineExpose({ beforeNextStep });
</script>

<style scoped lang="scss"></style>
