<template>
  <div class="partial-container m-0 p-0">
    <h5 class="form-title text-center">등록 정보 확인</h5>
    <K3Accordion :multiple="true" :activeIndex="[0, 1, 2, 3]">
      <K3AccordionTab header="Cloud 정보">
        <K3Fieldset legend="Cloud 정보" :toggleable="true">
          <K3FormContainer class="no-style">
            <K3FormRow>
              <K3FormColumn label="클라우드 명" label-align="right">{{ modelValue.cluster.name }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Namespace" label-align="right">{{ modelValue.cluster.namespace }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="설명" label-align="right"><div v-html="Util.getReplaceNewlineToBr(modelValue.cluster.desc)"></div></K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
        </K3Fieldset>
        <K3Fieldset legend="Kubernetes 설치 정보" :toggleable="true">
          <K3FormContainer class="no-style">
            <K3FormRow>
              <K3FormColumn label="Bootstrap Provider" label-align="right">{{ BootstrapProviders[modelValue.k8s.bootstrap_provider] }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Version" label-align="right">{{ K8sVersions[modelValue.k8s.version] }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="POD CIDR" label-align="right">{{ modelValue.k8s.pod_cidr }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Service CIDR" label-align="right">{{ modelValue.k8s.svc_cidr }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Service Dns Domain" label-align="right">{{ modelValue.k8s.svc_domain }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow v-if="modelValue.k8s.bootstrap_provider === BootstrapProviders.Kubeadm">
              <K3FormColumn label="Control Plane Kubeadm Extra Config" label-align="right">
                <K3FormContainer class="no-style w-full">
                  <K3FormRow direction="vertical" v-for="(config, index) in kubeadmConfigs" :key="index">
                    <K3FormColumn :label="config.header" label-align="right"><div v-html="Util.getReplaceNewlineToBr(modelValue.k8s.cp_kubeadm_extra_config[config.id])"></div></K3FormColumn>
                  </K3FormRow>
                </K3FormContainer>
              </K3FormColumn>
            </K3FormRow>
            <K3FormRow v-if="modelValue.k8s.bootstrap_provider === BootstrapProviders.Kubeadm">
              <K3FormColumn label="Workers Kubeadm Extra Config" label-align="right">
                <K3FormContainer class="no-style w-full">
                  <K3FormRow direction="vertical" v-for="(config, index) in kubeadmConfigs" :key="index">
                    <K3FormColumn :label="config.header" label-align="right"><div v-html="Util.getReplaceNewlineToBr(modelValue.k8s.worker_kubeadm_extra_config[config.id])"></div></K3FormColumn>
                  </K3FormRow>
                </K3FormContainer>
              </K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
        </K3Fieldset>
      </K3AccordionTab>
      <K3AccordionTab header="Openstack 정보">
        <K3FormContainer class="no-style">
          <K3FormRow>
            <K3FormColumn label="Node CIDR" label-align="right">{{ modelValue.openstack.node_cidr }}</K3FormColumn>
          </K3FormRow>
          <K3FormRow>
            <K3FormColumn label="Openstack Cloud" label-align="right">{{ modelValue.openstack.openstack_cloud }}</K3FormColumn>
          </K3FormRow>
          <K3FormRow>
            <K3FormColumn label="Openstack Cloud Provider Conf B64" label-align="right">{{ modelValue.openstack.openstack_cloud_provider_conf_b64 }}</K3FormColumn>
          </K3FormRow>
          <K3FormRow>
            <K3FormColumn label="Openstack Cloud Yaml B64" label-align="right">{{ modelValue.openstack.openstack_cloud_yaml_b64 }}</K3FormColumn>
          </K3FormRow>
          <K3FormRow>
            <K3FormColumn label="Openstack Cloud Cacert B64" label-align="right">{{ modelValue.openstack.openstack_cloud_cacert_b64 }}</K3FormColumn>
          </K3FormRow>
          <K3FormRow>
            <K3FormColumn label="DNS Nameservers" label-align="right">{{ modelValue.openstack.dns_nameservers }}</K3FormColumn>
          </K3FormRow>
          <K3FormRow>
            <K3FormColumn label="Failure Domain" label-align="right">{{ modelValue.openstack.failure_domain }}</K3FormColumn>
          </K3FormRow>
          <K3FormRow>
            <K3FormColumn label="Image Name" label-align="right">{{ modelValue.openstack.image_name }}</K3FormColumn>
          </K3FormRow>
          <K3FormRow>
            <K3FormColumn label="SSH Key Name" label-align="right">{{ modelValue.openstack.ssh_key_name }}</K3FormColumn>
          </K3FormRow>
          <K3FormRow>
            <K3FormColumn label="External Network ID" label-align="right">{{ modelValue.openstack.external_network_id }}</K3FormColumn>
          </K3FormRow>
          <K3FormRow>
            <K3FormColumn label="API Server Floating IP" label-align="right">{{ modelValue.openstack.api_server_floating_ip }}</K3FormColumn>
          </K3FormRow>
          <K3FormRow v-if="!modelValue.openstack.use_bastion_host">
            <K3FormColumn label="Bastion Host" label-align="right">
              {{ Util.getUseYnKo(modelValue.openstack.use_bastion_host) }}
            </K3FormColumn>
          </K3FormRow>
          <K3FormRow v-if="modelValue.openstack.use_bastion_host">
            <K3FormColumn label="Bastion Host" label-align="right">
              <K3FormContainer class="no-style w-full">
                <K3FormRow>
                  <K3FormColumn label="Flavor" label-align="right">{{ modelValue.openstack.bastion_flavor }}</K3FormColumn>
                </K3FormRow>
                <K3FormRow>
                  <K3FormColumn label="Image Name" label-align="right">{{ modelValue.openstack.bastion_image_name }}</K3FormColumn>
                </K3FormRow>
                <K3FormRow>
                  <K3FormColumn label="SSH Key Name" label-align="right">{{ modelValue.openstack.bastion_ssh_key_name }}</K3FormColumn>
                </K3FormRow>
                <K3FormRow>
                  <K3FormColumn label="Floating IP" label-align="right">{{ modelValue.openstack.bastion_floating_ip }}</K3FormColumn>
                </K3FormRow>
              </K3FormContainer>
            </K3FormColumn>
          </K3FormRow>
        </K3FormContainer>
      </K3AccordionTab>
      <K3AccordionTab header="Node 정보">
        <K3FormContainer class="no-style">
          <K3FormRow>
            <K3FormColumn label="Load Balancer" label-align="right">{{ Util.getUseYnKo(modelValue.nodes.use_loadbalancer) }}</K3FormColumn>
          </K3FormRow>
        </K3FormContainer>
        <K3Fieldset legend="MasterSet" :toggleable="true">
          <template v-for="(node, index) in modelValue.nodes.master_sets" :key="index">
            <K3FormContainer class="node-wrapper no-style">
              <K3FormRow>
                <K3FormColumn label="Name" label-align="right">{{ node.name }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Node Count" label-align="right">{{ node.node_count }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Flavor" label-align="right">{{ node.flavor }}</K3FormColumn>
              </K3FormRow>
              <!-- <K3FormRow>
                <K3FormColumn label="Labels" label-align="right">
                  <template v-for="(item, i) in node.labels" :key="i">
                    <K3Chip :label="Util.getLabel(item)" />
                  </template>
                </K3FormColumn>
              </K3FormRow> -->
            </K3FormContainer>
          </template>
        </K3Fieldset>
        <K3Fieldset legend="WorkerSet" :toggleable="true">
          <template v-for="(node, index) in modelValue.nodes.worker_sets" :key="index">
            <K3FormContainer class="node-wrapper no-style">
              <K3FormRow>
                <K3FormColumn label="Name" label-align="right">{{ node.name }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Node Count" label-align="right">{{ node.node_count }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Flavor" label-align="right">{{ node.flavor }}</K3FormColumn>
              </K3FormRow>
              <!-- <K3FormRow>
                <K3FormColumn label="Labels" label-align="right">
                  <template v-for="(item, i) in node.labels" :key="i">
                    <K3Chip :label="Util.getLabel(item)" />
                  </template>
                </K3FormColumn>
              </K3FormRow> -->
            </K3FormContainer>
          </template>
        </K3Fieldset>
      </K3AccordionTab>
      <K3AccordionTab header="ETCD/Storage 정보">
        <K3Fieldset legend="ETCD 설정" :toggleable="true">
          <K3FormContainer class="no-style">
            <K3FormRow>
              <K3FormColumn label="External ETCD" label-align="right">{{ Util.getUseYnKo(modelValue.etcd_storage.etcd.use_external_etcd) }}</K3FormColumn>
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
              <K3FormColumn label="Ceph" label-align="right">{{ Util.getUseYnKo(modelValue.etcd_storage.storage_class.use_ceph) }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow v-if="modelValue.etcd_storage.storage_class.use_ceph">
              <K3FormColumn label="Label 1" label-align="right">{{ modelValue.etcd_storage.storage_class.label1 }}</K3FormColumn>
              <K3FormColumn label="Label 2" label-align="right">{{ modelValue.etcd_storage.storage_class.label2 }}</K3FormColumn>
              <K3FormColumn label="Label 3" label-align="right">{{ modelValue.etcd_storage.storage_class.label3 }}</K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
        </K3Fieldset>
      </K3AccordionTab>
    </K3Accordion>
  </div>
</template>

<script setup lang="ts">
import { K8sVersions, BootstrapProviders, kubeadmConfigs } from "~/models";

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
}
</style>
