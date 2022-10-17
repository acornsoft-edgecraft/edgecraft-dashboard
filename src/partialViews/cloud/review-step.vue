<template>
  <div class="partial-container m-0 p-0">
    <h5 class="form-title text-center">등록 정보 확인</h5>
    <K3Accordion :multiple="true" :activeIndex="[0, 1, 2, 3, 4]">
      <K3AccordionTab header="Cloud 정보">
        <K3FormContainer class="no-style">
          <K3FormRow>
            <K3FormColumn label="Cloud 명" label-align="right">{{ modelValue.cloud.name }}</K3FormColumn>
          </K3FormRow>
          <K3FormRow>
            <K3FormColumn label="Cloud 유형" label-align="right">{{ CloudTypes[modelValue.cloud.type] }}</K3FormColumn>
          </K3FormRow>
          <K3FormRow>
            <K3FormColumn label="Cloud 설명" label-align="right"><div v-html="Util.getReplaceNewlineToBr(modelValue.cloud.desc)"></div></K3FormColumn>
          </K3FormRow>
        </K3FormContainer>
      </K3AccordionTab>
      <K3AccordionTab header="Cluster 정보">
        <K3Fieldset legend="Kubernetes 설치 정보" :toggleable="true">
          <K3FormContainer class="no-style">
            <K3FormRow>
              <K3FormColumn label="Version" label-align="right">{{ K8sVersions[modelValue.cluster.k8s.version] }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="POD CIDR" label-align="right">{{ modelValue.cluster.k8s.pod_cidr }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Service CIDR" label-align="right">{{ modelValue.cluster.k8s.svc_cidr }}</K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
        </K3Fieldset>
        <K3Fieldset legend="Baremetal 설치 정보" :toggleable="true">
          <K3FormContainer class="no-style">
            <K3FormRow>
              <K3FormColumn label="BMC Credential" label-align="right">
                <K3FormContainer class="no-style w-full">
                  <K3FormRow direction="vertical">
                    <K3FormColumn label="Secret Name" label-align="right">{{ modelValue.cluster.baremetal.secret_name }}</K3FormColumn>
                    <K3FormColumn label="User Name" label-align="right">{{ modelValue.cluster.baremetal.user_name }}</K3FormColumn>
                    <K3FormColumn label="Password" label-align="right">{{ modelValue.cluster.baremetal.password }}</K3FormColumn>
                  </K3FormRow>
                </K3FormContainer>
              </K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Image URL" label-align="right">{{ modelValue.cluster.baremetal.image_url }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Image Checksum" label-align="right">{{ modelValue.cluster.baremetal.image_checksum }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Image Checksum Type" label-align="right">{{ ImageChecksumTypes[modelValue.cluster.baremetal.image_checksum_type] }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Image Format" label-align="right">{{ ImageFormats[modelValue.cluster.baremetal.image_format] }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Control Plane Kubeadm Extra Config" label-align="right">
                <K3FormContainer class="no-style w-full">
                  <K3FormRow direction="vertical" v-for="(config, index) in kubeadmConfigs">
                    <K3FormColumn :label="config.header" label-align="right"><div v-html="Util.getReplaceNewlineToBr(modelValue.cluster.baremetal.cp_kubeadm_extra_config[config.id])"></div></K3FormColumn>
                  </K3FormRow>
                </K3FormContainer>
              </K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Workers Kubeadm Extra Config" label-align="right">
                <K3FormContainer class="no-style w-full">
                  <K3FormRow direction="vertical" v-for="(config, index) in kubeadmConfigs">
                    <K3FormColumn :label="config.header" label-align="right"><div v-html="Util.getReplaceNewlineToBr(modelValue.cluster.baremetal.worker_kubeadm_extra_config[config.id])"></div></K3FormColumn>
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
            <K3FormColumn label="Use LoadBalancer" label-align="right">{{ modelValue.nodes.use_loadbalancer }}</K3FormColumn>
          </K3FormRow>
          <K3FormRow v-if="modelValue.nodes.use_loadbalancer">
            <K3FormColumn label="Load Balancer IP" label-align="right" :size="6">{{ modelValue.nodes.loadbalancer_address }}</K3FormColumn>
            <K3FormColumn label="Load Balancer Port" label-align="right" :size="6">{{ modelValue.nodes.loadbalancer_port }}</K3FormColumn>
          </K3FormRow>
        </K3FormContainer>
        <K3Fieldset legend="Master Nodes" :toggleable="true">
          <template v-for="(node, index) in modelValue.nodes.master_nodes" :key="index">
            <K3FormContainer class="node-wrapper no-style">
              <K3FormRow class="no-bg-row">
                <K3Divider align="left">Baremetal Host</K3Divider>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Host Name" label-align="right" :size="6">{{ node.BaremetalHost.host_name }}</K3FormColumn>
                <K3FormColumn label="BMC Address" label-align="right" :size="6">{{ node.BaremetalHost.bmc_address }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Boot MAC Address" label-align="right" :size="6">{{ node.BaremetalHost.boot_mac_address }}</K3FormColumn>
                <K3FormColumn label="Boot Mode" label-align="right" :size="6">{{ BootModes[node.BaremetalHost.boot_mode] }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Online (power)" label-align="right" :size="6">{{ node.BaremetalHost.online_power }}</K3FormColumn>
                <K3FormColumn label="Externally Provisioning" label-align="right" :size="6">{{ node.BaremetalHost.external_provisioning }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow class="no-bg-row">
                <K3Divider align="left">Node</K3Divider>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Node Name" label-align="right" :size="6">{{ node.Node.node_name }}</K3FormColumn>
                <K3FormColumn label="IP Address" label-align="right" :size="6">{{ node.Node.ip_address }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Labels" label-align="right">
                  <template v-for="(item, i) in node.Node.labels" :key="i">
                    <K3Chip :label="Util.getLabel(item)" />
                  </template>
                </K3FormColumn>
              </K3FormRow>
            </K3FormContainer>
          </template>
        </K3Fieldset>
        <K3Fieldset legend="Worker Nodes" :toggleable="true">
          <template v-for="(node, index) in modelValue.nodes.worker_nodes" :key="index">
            <K3FormContainer class="node-wrapper no-style">
              <K3FormRow class="no-bg-row">
                <K3Divider align="left">Baremetal Host</K3Divider>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Host Name" label-align="right" :size="6">{{ node.BaremetalHost.host_name }}</K3FormColumn>
                <K3FormColumn label="BMC Address" label-align="right" :size="6">{{ node.BaremetalHost.bmc_address }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Boot MAC Address" label-align="right" :size="6">{{ node.BaremetalHost.boot_mac_address }}</K3FormColumn>
                <K3FormColumn label="Boot Mode" label-align="right" :size="6">{{ BootModes[node.BaremetalHost.boot_mode] }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Online (power)" label-align="right" :size="6">{{ node.BaremetalHost.online_power }}</K3FormColumn>
                <K3FormColumn label="Externally Provisioning" label-align="right" :size="6">{{ node.BaremetalHost.external_provisioning }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow class="no-bg-row">
                <K3Divider align="left">Node</K3Divider>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Node Name" label-align="right" :size="6">{{ node.Node.node_name }}</K3FormColumn>
                <K3FormColumn label="IP Address" label-align="right" :size="6">{{ node.Node.ip_address }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Labels" label-align="right">
                  <template v-for="(item, i) in node.Node.labels" :key="i">
                    <K3Chip :label="Util.getLabel(item)" />
                  </template>
                </K3FormColumn>
              </K3FormRow>
            </K3FormContainer>
          </template>
        </K3Fieldset>
      </K3AccordionTab>
      <K3AccordionTab header="ETCD/Storage 정보">
        <K3Fieldset legend="ETCD 설정" :toggleable="true">
          <K3FormContainer class="no-style">
            <K3FormRow>
              <K3FormColumn label="External ETCD" label-align="right">{{ modelValue.etcd_storage.etcd.use_external_etcd }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow v-if="modelValue.etcd_storage.etcd.use_external_etcd">
              <K3FormColumn label="Endpoints" label-align="right" :size="12">
                <K3FormContainer class="no-style w-full">
                  <K3FormRow direction="horizontal" :overflow-wrap="true" v-for="(item, index) in modelValue.etcd_storage.etcd.endpoints" :key="index">
                    <K3FormColumn label="IP" label-align="right" :size="6">{{ item.ip_address }}</K3FormColumn>
                    <K3FormColumn label="Port" label-align="right" :size="6">{{ item.port }}</K3FormColumn>
                  </K3FormRow>
                </K3FormContainer>
              </K3FormColumn>
              <K3FormColumn label="CA File" label-align="right">{{ modelValue.etcd_storage.etcd.ca_file }}</K3FormColumn>
              <K3FormColumn label="CERT File" label-align="right">{{ modelValue.etcd_storage.etcd.cert_file }}</K3FormColumn>
              <K3FormColumn label="KEY File" label-align="right">{{ modelValue.etcd_storage.etcd.key_file }}</K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
        </K3Fieldset>
        <K3Fieldset legend="STORAGE Class 설정" :toggleable="true">
          <K3FormContainer class="no-style">
            <K3FormRow>
              <K3FormColumn label="Use Ceph" label-align="right">{{ modelValue.etcd_storage.storage_class.use_ceph }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow v-if="modelValue.etcd_storage.storage_class.use_ceph">
              <K3FormColumn label="Label 1" label-align="right">{{ modelValue.etcd_storage.storage_class.label1 }}</K3FormColumn>
              <K3FormColumn label="Label 2" label-align="right">{{ modelValue.etcd_storage.storage_class.label2 }}</K3FormColumn>
              <K3FormColumn label="Label 3" label-align="right">{{ modelValue.etcd_storage.storage_class.label3 }}</K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
        </K3Fieldset>
      </K3AccordionTab>
      <K3AccordionTab header="OpenStack 정보" v-if="modelValue.cloud.type == CloudTypes.Openstack">
        {{ modelValue.openstack }}
      </K3AccordionTab>
    </K3Accordion>
  </div>
</template>

<script setup lang="ts">
import { CloudTypes, K8sVersions, ImageChecksumTypes, ImageFormats, BootModes, kubeadmConfigs } from "~/models";

const { Util } = useAppHelper();
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

<style scoped lang="scss">
.p-accordion-content {
  .p-fieldset:not(:first-child) {
    margin-top: 1rem;
  }
}

.form-container.no-style.node-wrapper {
  box-shadow: none;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  background: var(--surface-0);
  color: var(--surface-900);
  padding: 0.5rem;
  margin-bottom: 1rem;

  .no-bg-row {
    background-color: var(--surface-0);
  }
}

.form-container {
  .form-container.no-style {
    box-shadow: none;
  }
}
</style>
