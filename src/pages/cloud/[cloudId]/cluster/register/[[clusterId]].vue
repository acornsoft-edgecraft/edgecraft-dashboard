<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <div class="stepper-container">
        <K3Stepper :steps="steps" v-model="cluster" @completed-step="completedStep" @active-step="activeStep" @stepper-finished="finished" :keep-alive="false" :top-buttons="true" />
        <K3Overlay :active="active" loader="bars" background-color="#830205" />
      </div>

      <div class="flex justify-content-between mt-3">
        <div class="flex align-items-start justify-content-start">
          <K3Button label="클러스터 삭제" icon="pi pi-trash" class="p-button-danger" @click="onDelete" v-if="clusterId" />
        </div>
        <div class="flex align-items-end justify-content-end">
          <NuxtLink :to="list">
            <K3Button label="클러스터 목록" icon="pi pi-list" class="p-button-secondary" />
          </NuxtLink>
        </div>
      </div>

      <BizDialogsConfirmSave v-model="save" @close="close" @ok="ok" />
    </section>
  </div>
</template>

<script setup lang="ts">
import PClusterInfo from "~/partialViews/cluster/cluster-step.vue";
import POpenstackInfo from "~/partialViews/cluster/openstack-step.vue";
import PNodeInfo from "~/partialViews/cluster/node-step.vue";
import PEtcdStorageInfo from "~/partialViews/cluster/etcd-storage-step.vue";
import PReviewInfo from "~/partialViews/cluster/review-step.vue";
import { MessageTypes, CloudStatus } from "~/models";

definePageMeta({ layout: "default", title: "클라우드 클러스터", public: true });

const { UI, Routing } = useAppHelper();
const { cluster, isFetch, fetch } = useClusterService().getCluster();
const { isInsFetch, insFetch } = useClusterService().insertCluster();
const { isUpFetch, upFetch } = useClusterService().updateCluster();
const { isDelFetch, delFetch } = useClusterService().deleteCluster();

const route = useRoute();
const cloudId = route.params.cloudId;
const clusterId = route.params.clusterId || "";
const list = `/cloud/${cloudId}/cluster`;

const active = computed(() => unref(isFetch || isInsFetch || isUpFetch || isDelFetch));

const steps = [
  { icon: "fas fa-circle-nodes", name: "cluster", title: "CLUSTER 정보", subTitle: "Cluster 구성 정보를 설정합니다", component: PClusterInfo, completed: false, visible: true },
  { icon: "fas fa-cubes-stacked", name: "openstack", title: "OPENSTACK 정보", subTitle: "Openstack 구성 정보를 설정합니다", component: POpenstackInfo, completed: false, visible: true },
  { icon: "fas fa-server", name: "node", title: "NODE 정보", subTitle: "Node 구성 정보를 설정합니다", component: PNodeInfo, completed: false, visible: true },
  { icon: "fas fa-database", name: "etcdstorage", title: "ETCD/STORAGE 정보", subTitle: "ETCD 및 Storage 구성 정보를 설정합니다", component: PEtcdStorageInfo, completed: false, visible: true },
  { icon: "fas fa-list-check", name: "review", title: "Review", subTitle: "구성 정보를 검증합니다", component: PReviewInfo, completed: true, visible: true },
];

const completedStep = (payload) => {
  steps.forEach((s) => (s.completed = s.name === payload.name));
};
const activeStep = (payload) => {
  steps.forEach((s) => {
    if (s.name === payload.name) {
      if (s.completed) s.completed = false;
    }
  });
};

const save = ref({ type: "클러스터", display: false });
const finished = async (payload) => {
  save.value.display = true;
};
const close = () => {
  save.value.display = false;
};
const ok = (val) => {
  save.value.display = false;
  cluster.value.save_only = val;
  onSubmit();
};

const onSubmit = async () => {
  const label = clusterId ? "수정" : "등록";
  let result;
  try {
    result = clusterId ? await upFetch(cloudId, clusterId, cluster.value) : await insFetch(cloudId, cluster.value);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, `클러스터 ${label}`, err);
  }
  if (result.isError) return;

  UI.showToastMessage(MessageTypes.INFO, `클러스터 ${label}`, result.message || `클러스터를 ${label}하였습니다.`);
  Routing.moveTo(list);
};

const onDelete = () => {
  UI.showConfirm(MessageTypes.ERROR, "클러스터 삭제", "클러스터를 삭제하시겠습니까? 관련된 정보가 삭제됩니다.", deleteCluster, () => {});
};
const deleteCluster = async () => {
  let result;
  try {
    result = await delFetch(cloudId, clusterId);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, "클러스터 삭제", err);
  }
  if (result.isError) return;

  UI.showToastMessage(MessageTypes.INFO, "클러스터 삭제", result.message || "클러스터를 삭제하였습니다.");
  Routing.moveTo(list);
};
const getCluster = async () => {
  let result;
  try {
    result = await fetch(cloudId, clusterId);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, `클러스터 정보`, err);
  }
  if (result.isError) Routing.moveTo(list);

  if (cluster.value.cluster.status > CloudStatus.Saved) {
    Routing.moveTo(`${list}/${clusterId}`);
  }
};

onMounted(() => {
  if (clusterId) {
    getCluster();
  }
});
</script>

<style scoped lang="scss">
.page-content {
  margin-top: 0.5rem;
}

.stepper-container {
  position: relative;
}
</style>
