<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content cloud-info-container">
      <div class="flex justify-content-end button-wrapper">
        <K3Button label="Kore-Board" icon="pi pi-external-link" iconPos="right" class="p-button mr-2" @click="goKoreboard" v-if="provisioned" />
        <K3Button label="k8s Cluster Upgrade" class="p-button mr-2" @click="onUpgrade" v-if="provisioned" />
        <K3Button label="클라우드 삭제" class="p-button-danger" @click="onDelete" />
      </div>
      <K3Card>
        <template #title>클라우드 정보</template>
        <template #content>
          <K3FormContainer>
            <K3FormRow>
              <K3FormColumn label="Cloud Name" label-align="right">{{ cloud.cloud.name }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Cloud Type" label-align="right">{{ CloudTypes[cloud.cloud.type] }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Cloud Status" label-align="right">{{ CloudStatus[cloud.cloud.status] }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Cloud Desc" label-align="right">{{ cloud.cloud.desc }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Created" label-align="right">{{ cloud.cloud.created }}</K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
          <K3FormContainer class="mt-2">
            <K3FormRow>
              <K3FormColumn label="Kubernetes Version" label-align="right">{{ K8sVersions[cloud.cluster.k8s.version] }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="POD CIDR" label-align="right">{{ cloud.cluster.k8s.pod_cidr }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Service CIDR" label-align="right">{{ cloud.cluster.k8s.svc_cidr }}</K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
        </template>
      </K3Card>

      <K3TabView v-if="cloud.cloud.status < CloudStatus.Provisioned">
        <K3TabPanel header="Cluster">
          <div class="dark-demo-terminal"></div>
        </K3TabPanel>
        <K3TabPanel header="Machine">
          <div class="dark-demo-terminal"></div>
        </K3TabPanel>
        <K3TabPanel header="Kubeadm">
          <div class="dark-demo-terminal"></div>
        </K3TabPanel>
        <K3TabPanel header="...">
          <div class="dark-demo-terminal"></div>
        </K3TabPanel>
      </K3TabView>

      <K3Card v-if="provisioned">
        <template #title>노드 정보</template>
        <template #content>
          <BizCloudNodeList :type="NodeTypes.Master" v-model="cloud.nodes.master_nodes" @add-node="addNode" />
          <BizCloudNodeList :type="NodeTypes.Worker" v-model="cloud.nodes.worker_nodes" @add-node="addNode" />
        </template>
      </K3Card>

      <BizDialogsCloudNode v-model="cloudNode" @close="close" @ok="ok" />
      <BizDialogsK8sUpgrade v-model="k8sUpgrade" @close="close" @upgrade="upgrade" />

      <div class="flex justify-content-end button-wrapper">
        <NuxtLink :to="list">
          <K3Button label="클라우드 목록" class="p-button-secondary" />
        </NuxtLink>
      </div>
      <K3Overlay :active="isFetch || isDelFetch" loader="bars" background-color="#830205" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { CloudTypes, CloudStatus, K8sVersions, MessageTypes, NodeTypes } from "~/models";

definePageMeta({ layout: "default", title: "클라우드 상세정보", public: true });

const { UI, Routing } = useAppHelper();
const { cloud, isFetch, fetch } = useCloudService().getCloud();
const { isDelFetch, delFetch } = useCloudService().deleteCloud();

const route = useRoute();
const cloudId = route.params.cloudId || "";
const list = "/cloud";

const provisioned = computed(() => cloud.value.cloud.status == CloudStatus.Provisioned);

const goKoreboard = () => {
  // TOGO: go koreboard
};

const k8sUpgrade = ref({ current: "", display: false });
const onUpgrade = () => {
  k8sUpgrade.value = { current: cloud.value.cluster.k8s.version, display: true };
};
const upgrade = (val) => {
  k8sUpgrade.value.display = false;

  // TODO: call api - kubernetes cluster upgrade
};

const onDelete = () => {
  UI.showConfirm(MessageTypes.ERROR, "클라우드 삭제", `<${cloud.value.cloud.name}> 클라우드를 삭제하시겠습니까?\n 관련된 모든 정보가 삭제됩니다.`, deleteCloud, () => {});
};
const deleteCloud = async () => {
  let result;
  try {
    result = await delFetch(cloudId);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, "클라우드 삭제", err);
  }
  if (!result) return;

  UI.showToastMessage(MessageTypes.INFO, "클라우드 삭제", "클라우드를 삭제하였습니다.");
  Routing.moveTo(list);
};
const getCloud = async () => {
  let result;
  try {
    result = await fetch(cloudId);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, "클라우드 정보", err);
  }
  if (!result) Routing.moveTo(list);

  if (cloud.value.cloud.status == CloudStatus.Saved) {
    Routing.moveTo(`${list}/register/${cloudId}`);
  }
};

const cloudNode = ref({ item: {}, type: "", display: false });
const addNode = (data) => {
  cloudNode.value = data;
};
const ok = (val) => {
  cloudNode.value.display = false;

  let nodes;
  if (val.type == NodeTypes.Master) {
    nodes = cloud.value.nodes.master_nodes;
  } else if (val.type == NodeTypes.Worker) {
    nodes = cloud.value.nodes.worker_nodes;
  }
  nodes.push(val.item);

  // TODO: call api - add node
  console.log(" nodes ", nodes);
};

const close = () => {
  cloudNode.value.display = false;
  k8sUpgrade.value.display = false;
};

onMounted(() => {
  if (cloudId) {
    getCloud();
  }
});
</script>

<style scoped lang="scss">
.cloud-info-container {
  .p-card,
  .p-tabview,
  .p-fieldset,
  .button-wrapper {
    margin-top: 1rem;
  }
}
// :deep(.dark-demo-terminal) {
.dark-demo-terminal {
  background-color: var(--surface-900);
  color: var(--surface-0);
  min-height: 200px;
}
</style>
