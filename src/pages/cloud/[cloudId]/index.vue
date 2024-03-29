<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <div class="flex justify-content-between mt-3">
        <div class="flex justify-content-start">
          <K3Button label="클라우드 삭제" icon="pi pi-trash" class="p-button-danger" @click="onDelete" />
        </div>
        <div class="flex justify-content-end">
          <K3Button icon="pi pi-refresh" class="p-button-text mr-2" @click="getCluster" />
          <K3Button label="k8s Cluster Upgrade" class="p-button mr-2" @click="onUpgrade" v-if="succeed" />
          <NuxtLink v-if="provisioned" :to="goBenchmarks">
            <K3Button label="CIS Benchmarks" class="p-button mr-2 p-button-info" />
          </NuxtLink>
          <NuxtLink v-if="provisioned" :to="goBackRes">
            <K3Button label="Backup & Restore" class="p-button mr-2 p-button-help" />
          </NuxtLink>
          <NuxtLink :to="list">
            <K3Button label="클라우드 목록" icon="pi pi-list" class="p-button-secondary" />
          </NuxtLink>
        </div>
      </div>
      <div class="info-wrapper">
        <K3Accordion :multiple="true" :activeIndex="[0, 1, 2, 3, 4]">
          <K3AccordionTab header="Cloud 정보">
            <K3FormContainer>
              <K3FormRow>
                <K3FormColumn label="클라우드 명" label-align="right">{{ cluster.cluster.name }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Namespace" label-align="right">{{ cluster.cluster.namespace }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Cloud Status" label-align="right">
                  {{ CloudStatus[cluster.cluster.status] }}
                  <div class="status-msg" v-if="msg !== ResMessages.SUCCEED">({{ msg }})</div>
                </K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="설명" label-align="right"><div v-html="Util.getReplaceNewlineToBr(cluster.cluster.desc)"></div></K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Created" label-align="right">{{ Util.getDateLocaleString(cluster.cluster.created) }}</K3FormColumn>
              </K3FormRow>
            </K3FormContainer>
          </K3AccordionTab>
          <K3AccordionTab header="Kubernetes 설치 정보">
            <K3FormContainer>
              <K3FormRow>
                <K3FormColumn label="Bootstrap Provider" label-align="right">{{ BootstrapProviders[cluster.k8s.bootstrap_provider] }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Kubernetes Version" label-align="right">{{ K8sVersions[cluster.k8s.version] }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="POD CIDR" label-align="right">{{ cluster.k8s.pod_cidr }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Service CIDR" label-align="right">{{ cluster.k8s.svc_cidr }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Service Domain" label-align="right">{{ cluster.k8s.svc_domain }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow v-if="cluster.k8s.bootstrap_provider === BootstrapProviders.Kubeadm">
                <K3FormColumn label="Control Plane Kubeadm Extra Config" label-align="right">
                  <K3FormContainer class="no-style w-full">
                    <K3FormRow direction="vertical" v-for="(config, index) in kubeadmConfigs" :key="index">
                      <K3FormColumn :label="config.header" label-align="right"><div v-html="Util.getReplaceNewlineToBr(cluster.k8s.cp_kubeadm_extra_config[config.id])"></div></K3FormColumn>
                    </K3FormRow>
                  </K3FormContainer>
                </K3FormColumn>
              </K3FormRow>
              <K3FormRow v-if="cluster.k8s.bootstrap_provider === BootstrapProviders.Kubeadm">
                <K3FormColumn label="Workers Kubeadm Extra Config" label-align="right">
                  <K3FormContainer class="no-style w-full">
                    <K3FormRow direction="vertical" v-for="(config, index) in kubeadmConfigs" :key="index">
                      <K3FormColumn :label="config.header" label-align="right"><div v-html="Util.getReplaceNewlineToBr(cluster.k8s.worker_kubeadm_extra_config[config.id])"></div></K3FormColumn>
                    </K3FormRow>
                  </K3FormContainer>
                </K3FormColumn>
              </K3FormRow>
            </K3FormContainer>
          </K3AccordionTab>
          <K3AccordionTab header="Openstack 정보">
            <K3FormContainer>
              <K3FormRow>
                <K3FormColumn label="Node CIDR" label-align="right">{{ cluster.openstack.node_cidr }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Openstack Cloud" label-align="right">{{ cluster.openstack.openstack_cloud }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Openstack Cloud Provider Conf B64" label-align="right">{{ cluster.openstack.openstack_cloud_provider_conf_b64 }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Openstack Cloud Yaml B64" label-align="right">{{ cluster.openstack.openstack_cloud_yaml_b64 }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Openstack Cloud CaCert B64" label-align="right">{{ cluster.openstack.openstack_cloud_cacert_b64 }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="DNS Nameservers" label-align="right">{{ cluster.openstack.dns_nameservers }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Failure Domain" label-align="right">{{ cluster.openstack.failure_domain }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Image Name" label-align="right">{{ cluster.openstack.image_name }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="SSH Key Name" label-align="right">{{ cluster.openstack.ssh_key_name }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="External Network ID" label-align="right">{{ cluster.openstack.external_network_id }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="API Server Floating IP" label-align="right">{{ cluster.openstack.api_server_floating_ip }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow v-if="!cluster.openstack.use_bastion_host">
                <K3FormColumn label="Bastion Host" label-align="right">{{ Util.getUseYnKo(cluster.openstack.use_bastion_host) }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow v-if="cluster.openstack.use_bastion_host">
                <K3FormColumn label="Bastion Host" label-align="right">
                  <K3FormContainer class="no-style w-full">
                    <K3FormRow>
                      <K3FormColumn label="Flavor" label-align="right">{{ cluster.openstack.bastion_flavor }}</K3FormColumn>
                    </K3FormRow>
                    <K3FormRow>
                      <K3FormColumn label="Image Name" label-align="right">{{ cluster.openstack.bastion_image_name }}</K3FormColumn>
                    </K3FormRow>
                    <K3FormRow>
                      <K3FormColumn label="SSH Key Name" label-align="right">{{ cluster.openstack.bastion_ssh_key_name }}</K3FormColumn>
                    </K3FormRow>
                    <K3FormRow>
                      <K3FormColumn label="Floating IP" label-align="right">{{ cluster.openstack.bastion_floating_ip }}</K3FormColumn>
                    </K3FormRow>
                  </K3FormContainer>
                </K3FormColumn>
              </K3FormRow>
            </K3FormContainer>
          </K3AccordionTab>
          <K3AccordionTab header="Node 정보">
            <K3FormContainer class="no-style">
              <K3FormRow>
                <K3FormColumn label="Load Balancer" label-align="right">{{ Util.getUseYnKo(cluster.nodes.use_loadbalancer) }}</K3FormColumn>
              </K3FormRow>
            </K3FormContainer>
            <BizClusterNodesets v-model="cluster.nodes.master_sets" :type="NodeTypes.Master" :succeed="succeed" :params="{ cloudId: cloudId, clusterId: clusterId, bootstrapProvider: cluster.k8s.bootstrap_provider }" @add-nodeset="addNodeset" />
            <BizClusterNodesets v-model="cluster.nodes.worker_sets" :type="NodeTypes.Worker" :succeed="succeed" :params="{ cloudId: cloudId, clusterId: clusterId, bootstrapProvider: cluster.k8s.bootstrap_provider }" @add-nodeset="addNodeset" />
          </K3AccordionTab>
          <K3AccordionTab header="ETCD/Storage 정보">
            <K3Fieldset legend="ETCD 설정" :toggleable="true">
              <K3FormContainer class="no-style">
                <K3FormRow>
                  <K3FormColumn label="External ETCD" label-align="right">{{ Util.getUseYnKo(cluster.etcd_storage.etcd.use_external_etcd) }}</K3FormColumn>
                </K3FormRow>
                <K3FormRow v-if="cluster.etcd_storage.etcd.use_external_etcd">
                  <K3FormColumn label="Endpoints" label-align="right" :size="12">
                    <K3FormContainer class="no-style w-full">
                      <K3FormRow direction="horizontal" :overflow-wrap="true" v-for="(item, index) in cluster.etcd_storage.etcd.endpoints" :key="index">
                        <K3FormColumn label="IP" label-align="right" :size="6">{{ item.ip_address }}</K3FormColumn>
                        <K3FormColumn label="Port" label-align="right" :size="6">{{ item.port }}</K3FormColumn>
                      </K3FormRow>
                    </K3FormContainer>
                  </K3FormColumn>
                  <K3FormColumn label="CA File" label-align="right">{{ cluster.etcd_storage.etcd.ca_file }}</K3FormColumn>
                  <K3FormColumn label="CERT File" label-align="right">{{ cluster.etcd_storage.etcd.cert_file }}</K3FormColumn>
                  <K3FormColumn label="KEY File" label-align="right">{{ cluster.etcd_storage.etcd.key_file }}</K3FormColumn>
                </K3FormRow>
              </K3FormContainer>
            </K3Fieldset>
            <K3Fieldset legend="STORAGE Class 설정" :toggleable="true">
              <K3FormContainer class="no-style">
                <K3FormRow>
                  <K3FormColumn label="Ceph" label-align="right">{{ Util.getUseYnKo(cluster.etcd_storage.storage_class.use_ceph) }}</K3FormColumn>
                </K3FormRow>
                <K3FormRow v-if="cluster.etcd_storage.storage_class.use_ceph">
                  <K3FormColumn label="Label 1" label-align="right">{{ cluster.etcd_storage.storage_class.label1 }}</K3FormColumn>
                  <K3FormColumn label="Label 2" label-align="right">{{ cluster.etcd_storage.storage_class.label2 }}</K3FormColumn>
                  <K3FormColumn label="Label 3" label-align="right">{{ cluster.etcd_storage.storage_class.label3 }}</K3FormColumn>
                </K3FormRow>
              </K3FormContainer>
            </K3Fieldset>
          </K3AccordionTab>
        </K3Accordion>
      </div>

      <div class="flex justify-content-between mt-3">
        <div class="flex justify-content-start align-items-start">
          <K3Button label="클라우드 삭제" icon="pi pi-trash" class="p-button-danger" @click="onDelete" />
        </div>
        <div class="flex justify-content-end align-items-end">
          <NuxtLink :to="list">
            <K3Button label="클라우드 목록" icon="pi pi-list" class="p-button-secondary" />
          </NuxtLink>
        </div>
      </div>

      <BizDialogsClusterNodeset v-model="clusterNodeset" @close="close" @ok="ok" />
      <BizDialogsK8sUpgrade v-model="k8sUpgrade" @close="close" @upgrade="upgrade" />
      <K3Overlay :active="active" loader="bars" background-color="#830205" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { CloudStatus, K8sVersions, BootstrapProviders, NodeTypes, MessageTypes, ResMessages, kubeadmConfigs } from "~/models";

definePageMeta({ layout: "default", title: "엣지 클라우드 상세", public: true });

const { UI, Util, Routing } = useAppHelper();
const { cluster, isFetch, fetch } = useClusterService().getCluster();
const { isDelFetch, delFetch } = useClusterService().deleteCluster();
const { isUpFetch, upgradeFetch } = useClusterService().upgradeCluster();
const { isAddFetch, addFetch } = useClusterService().addNodeSet();
const { isGetFetch, getFetch } = useClusterService().getNodeSets();

const route = useRoute();
const cloudId = UI.cloudId;
const clusterId = route.params.cloudId;
const list = `/cloud`;

const msg = ref(undefined);

const active = computed(() => unref(isFetch || isDelFetch || isGetFetch || isAddFetch));
const succeed = computed(() => cluster.value.cluster.status === CloudStatus.Provisioned && msg.value === ResMessages.SUCCEED);
const provisioned = computed(() => cluster.value.cluster.status === CloudStatus.Provisioned);

const goBenchmarks = `${list}/${clusterId}/benchmarks`;
const goBackRes = `${list}/${clusterId}/backres`;

const k8sUpgrade = ref({ 
  current: "", 
  bootstrap_provider: "", 
  display: false, 
});
const onUpgrade = () => {
  k8sUpgrade.value = { 
    current: cluster.value.k8s.version, 
    bootstrap_provider: cluster.value.k8s.bootstrap_provider, 
    display: true,
  };
};
const upgrade = (val) => {
  k8sUpgrade.value.display = false;
 
  // TODO: call api - kubernetes cluster upgrade
  UI.showDialog(
    MessageTypes.ERROR, 
    "클라우드 업그레이드", 
    `<${cluster.value.cluster.name}> 클라우드를 업그레이드 하시겠습니까? \n기존의 어플리케이션은 초기화됩니다.`, 
    defineAsyncComponent(() => import("@/components/biz/dialogs/confirm-dialog.vue")),
    () => upgradeCluster(val), 
    () => {}
  );

};
const upgradeCluster = async (val) => {
  let result;
  try {
    result = await upgradeFetch(cloudId, clusterId, val);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, "클라우드 업그레이드", err);
  }
  if (result.isError) return;

  UI.showToastMessage(MessageTypes.INFO, "클라우드 업그레이드", result.message || "클라우드를 업그레이드 하였습니다.\n클라우드 상세 정보에서 확인할 수 있습니다.");
  Routing.moveTo(list);
};
const onDelete = () => {
  let msg;
  switch (cluster.value.cluster.status) {
    case CloudStatus.Provisioned:
    case CloudStatus.Failed:
      msg = "Provision 된 클라우드가 삭제 후 'Deleted' 상태로 변경됩니다.";
      break;
    case CloudStatus.Deleting:
    case CloudStatus.Deleted:
      msg = "저장된 데이터가 모두 삭제됩니다.";
      break;
  }
  UI.showConfirm(MessageTypes.ERROR, "클라우드 삭제", `<${cluster.value.cluster.name}> 클라우드를 삭제하시겠습니까?\n ${msg}`, deleteCluster, () => {});
};
const deleteCluster = async () => {
  let result;
  try {
    result = await delFetch(cloudId, clusterId);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, "클라우드 삭제", err);
  }
  if (result.isError) return;

  UI.showToastMessage(MessageTypes.INFO, "클라우드 삭제", result.message || "클라우드를 삭제하였습니다.");
  Routing.moveTo(list);
};
const getCluster = async () => {
  let result;
  try {
    result = await fetch(cloudId, clusterId);
    msg.value = result.message;
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, `클라우드 정보`, err);
  }
  if (result.isError) Routing.moveTo(list);

  if (cluster.value.cluster.status === CloudStatus.Saved) {
    Routing.moveTo(`${list}/register/${clusterId}`);
  }
};

const clusterNodeset = ref({ item: {}, display: false });
const addNodeset = (data) => {
  clusterNodeset.value = data;
};
const ok = async (val) => {
  clusterNodeset.value.display = false;

  let result;
  try {
    result = await addFetch(cloudId, clusterId, val.item);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, `노드셋 생성`, err);
  }
  if (result.isError) return;

  UI.showToastMessage(MessageTypes.INFO, `노드셋 생성`, result.message || "클라우드의 노드셋이 생성되었습니다.");
  getNodesets();
};
const close = () => {
  k8sUpgrade.value.display = false;
  clusterNodeset.value.display = false;
};
const getNodesets = async () => {
  let result;
  try {
    result = await getFetch(cloudId, clusterId);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, `노드셋 목록`, err);
  }
  if (result.isError) return;

  cluster.value.nodes = result.data;
};

onMounted(() => {
  if (clusterId) {
    getCluster();
  }
});
</script>

<style scoped lang="scss">
.info-wrapper {
  background-color: #fff;
  padding: 0.25rem;
  margin: 1rem 0;

  .p-accordion {
    margin: 0.25rem;

    :deep(.p-accordion-header-text) {
      font-size: 1.1rem;
    }

    .p-fieldset:not(:first-child) {
      margin-top: 1rem;
    }
  }

  .form-container {
    box-shadow: none;
  }
}

.status-msg {
  padding-left: 0.5rem;
  color: var(--orange-500);
  font-weight: 500;
}

.dark-demo-terminal {
  background-color: #212121;
  color: #ffffff;
  min-height: 200px;
}
</style>
