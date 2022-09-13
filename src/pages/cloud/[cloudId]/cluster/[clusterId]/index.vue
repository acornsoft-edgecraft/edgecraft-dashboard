<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content cluster-info-wrap">
      <div class="flex justify-content-end ci-button">
        <K3Button label="Kore-Board" icon="pi pi-external-link" iconPos="right" class="p-button mr-2" @click="goKoreboard" v-if="provisioned" />
        <K3Button label="k8s Cluster Upgrade" class="p-button mr-2" @click="onUpgrade" v-if="provisioned" />
        <K3Button label="클러스터 삭제" class="p-button-danger" @click="onDelete" />
      </div>
      <K3Card>
        <template #title>클러스터 정보</template>
        <template #content>
          <K3FormContainer>
            <K3FormRow>
              <K3FormColumn label="Cluster Name" label-align="right">{{ cluster.cluster.name }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Cluster Status" label-align="right">{{ CloudStatus[cluster.cluster.status] }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Cluster Desc" label-align="right">{{ cluster.cluster.desc }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Kubernetes Version" label-align="right">{{ K8sVersions[cluster.k8s.version] }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Created" label-align="right">{{ cluster.cluster.created }}</K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
        </template>
      </K3Card>

      <K3TabView v-if="cluster.cluster.status < CloudStatus.Provisioned">
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

      <K3Card>
        <template #title>노드 정보</template>
        <template #content>
          <NodesetInfo v-model="cluster.nodes.master_sets" :type="NodeTypes.MASTER" @add-nodeset="addNodeset" />
          <NodesetInfo v-model="cluster.nodes.worker_sets" :type="NodeTypes.WORKER" @add-nodeset="addNodeset" />
        </template>
      </K3Card>

      <DClusterNodeset v-model="clusterNodeset" @close="close" @ok="ok" />
      <DK8sUpgrade v-model="k8sUpgrade" @close="close" @upgrade="upgrade" />
      <div class="flex justify-content-end ci-button">
        <NuxtLink :to="list">
          <K3Button label="클러스터 목록" class="p-button-secondary" />
        </NuxtLink>
      </div>
      <K3Overlay :active="isFetch" loader="bars" background-color="#830205" />
    </section>
  </div>
</template>

<script setup lang="ts">
// imports
import NodesetInfo from "~/components/biz/cluster/nodeset-info.vue";
import DClusterNodeset from "~/components/biz/dialogs/cluster-nodeset.vue";
import DK8sUpgrade from "~/components/biz/dialogs/k8s-upgrade.vue";
import { CloudStatus, K8sVersions, NodeTypes, MessageTypes } from "~/models";
// Page meta
definePageMeta({ layout: "default", title: "클라우드 클러스터 상세", public: true });
// Props
// const props = defineProps({}),
// Emits
// const emits = defineEmits(['eventname']),
// Properties
const route = useRoute();
const cloudId = route.params.cloudId;
const { UI, Routing } = useAppHelper();
const { cluster, isFetch, fetch } = useClusterService().getCluster();
const provisioned = computed(() => cluster.value.cluster.status == CloudStatus.Provisioned);
const list = `/cloud/${cloudId}/cluster`;

// Compputed
// Watcher
// Methods
const goKoreboard = () => {
  // TOGO: go koreboard
};

const k8sUpgrade = ref({ current: "", display: false });
const onUpgrade = () => {
  k8sUpgrade.value = { current: cluster.value.k8s.version, display: true };
};
const upgrade = (val) => {
  k8sUpgrade.value.display = false;

  // TODO: call api - kubernetes cluster upgrade
};

const onDelete = () => {
  UI.showConfirm(
    MessageTypes.ERROR,
    "클러스터 삭제",
    `<${cluster.value.cluster.name}> 클러스터를 삭제하시겠습니까?\n 관련된 모든 정보가 삭제됩니다.`,
    () => {
      // TODO: delete cluster
      Routing.moveTo(list);
    },
    () => {}
  );
};

const clusterNodeset = ref({ item: {}, display: false });
const addNodeset = (data) => {
  clusterNodeset.value = data;
};
const ok = (val) => {
  console.log("ok", val);
  clusterNodeset.value.display = false;
  cluster.value.nodes.worker_sets.push(val.item);
};
const close = () => {
  k8sUpgrade.value.display = false;
  clusterNodeset.value.display = false;
};

// Events
onMounted(() => {
  fetch(1);
});
// Logics (like api call, etc)
</script>

<style scoped lang="scss">
.cluster-info-wrap {
  .p-card,
  .p-tabview,
  .p-fieldset,
  .ci-button {
    margin-top: 1rem;
  }

  .ci-button:last-child {
    margin-bottom: 2rem;
  }
}

::v-deep(.dark-demo-terminal) {
  background-color: #212121;
  color: #ffffff;
  min-height: 200px;
}
</style>
