<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <div class="stepper-container">
        <K3Stepper :steps="steps" v-model="cloud" @completed-step="completedStep" @active-step="activeStep" @stepper-finished="finished" @visible-change="onVisibleChange" :keep-alive="false" :top-buttons="true" />
        <K3Overlay :active="active" loader="bars" background-color="#830205" />
      </div>

      <div class="flex button-wrapper">
        <div class="flex flex-grow-1 flex-shrink-1 align-items-start justify-content-start">
          <K3Button label="클라우드 삭제" class="p-button-danger" @click="onDelete" v-if="cloudId" />
        </div>
        <div class="flex flex-grow-1 flex-shrink-1 align-items-end justify-content-end">
          <NuxtLink :to="list">
            <K3Button label="클라우드 목록" class="p-button-secondary" />
          </NuxtLink>
        </div>
      </div>

      <BizDialogsConfirmSave v-model="save" @close="close" @ok="ok" />
    </section>
  </div>
</template>

<script setup lang="ts">
import PCloudInfo from "~/partialViews/cloud/cloud-step.vue";
import PClusterInfo from "~/partialViews/cloud/cluster-step.vue";
import PNodeInfo from "~/partialViews/cloud/node-step.vue";
import PEtcdStorageInfo from "~/partialViews/cloud/etcd-storage-step.vue";
import POpenstackInfo from "~/partialViews/cloud/openstack-step.vue";
import PReviewInfo from "~/partialViews/cloud/review-step.vue";
import { CloudStatus, CloudTypes, MessageTypes } from "~/models";

definePageMeta({ layout: "default", title: "클라우드 등록", public: true });

const { UI, Routing } = useAppHelper();
const { cloud, isFetch, fetch } = useCloudService().getCloud();
const { isInsFetch, insFetch } = useCloudService().insertCloud();
const { isUpFetch, upFetch } = useCloudService().updateCloud();
const { isDelFetch, delFetch } = useCloudService().deleteCloud();
const route = useRoute();
const cloudId = route.params.cloudId || "";
const list = "/cloud";

const active = computed(() => unref(isFetch || isInsFetch || isUpFetch || isDelFetch));

const steps = [
  { icon: "fas fa-cloud", name: "cloud", title: "CLOUD 정보", subTitle: "Cloud 구성 정보를 설정합니다", component: PCloudInfo, completed: false, visible: true },
  { icon: "fas fa-circle-nodes", name: "cluster", title: "CLUSTER 정보", subTitle: "Cluster 구성 정보를 설정합니다", component: PClusterInfo, completed: false, visible: true },
  { icon: "fas fa-server", name: "node", title: "NODE 정보", subTitle: "Node 구성 정보를 설정합니다", component: PNodeInfo, completed: false, visible: true },
  { icon: "fas fa-database", name: "etcdstorage", title: "ETCD/STORAGE 정보", subTitle: "ETCD 및 Storage 구성 정보를 설정합니다", component: PEtcdStorageInfo, completed: false, visible: true },
  { icon: "fas fa-cubes-stacked", name: "openstack", title: "OPENSTACK 정보", subTitle: "Openstack 구성 정보를 설정합니다", component: POpenstackInfo, completed: false, visible: false },
  { icon: "fas fa-list-check", name: "review", title: "Review", subTitle: "구성 정보를 검증합니다.", component: PReviewInfo, completed: true, visible: true },
];

watch(
  () => cloud.value.cloud?.type,
  (val) => {
    if (val == CloudTypes.Openstack) {
      onVisibleChange({ name: "openstack", visible: true });
    }
  }
);

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

const save = ref({ type: "클라우드", display: false });
const finished = (payload) => {
  save.value.display = true;
};
const close = () => {
  save.value.display = false;
};
const ok = (val) => {
  save.value.display = false;
  cloud.value.save_only = val;
  onSubmit();
};

const onSubmit = async () => {
  const label = cloudId ? "수정" : "등록";

  let result;
  try {
    result = cloudId ? await upFetch(cloudId, cloud.value) : await insFetch(cloud.value);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, `클라우드 ${label}`, err);
  }
  if (result.isError) return;

  UI.showToastMessage(MessageTypes.INFO, `클라우드 ${label}`, result.message || `클라우드를 ${label}하였습니다.`);
  Routing.moveTo(list);
};

// Step Visible On/Off 처리
const onVisibleChange = (val) => {
  steps.find((item) => {
    if (item.name === val.name) item.visible = val.visible;
  });
};

const onDelete = () => {
  UI.showConfirm(MessageTypes.ERROR, "클라우드 삭제", "클라우드를 삭제하시겠습니까?", deleteCloud, () => {});
};
const deleteCloud = async () => {
  let result;
  try {
    result = await delFetch(cloudId);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, "클라우드 삭제", err);
  }
  if (result.isError) return;

  UI.showToastMessage(MessageTypes.INFO, "클라우드 삭제", result.message || "클라우드를 삭제하였습니다.");
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

  if (cloud.value.cloud.status > CloudStatus.Saved) {
    Routing.moveTo(`${list}/${cloudId}`);
  }
};

onMounted(() => {
  if (cloudId) {
    getCloud();
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

.button-wrapper {
  margin-top: 1rem;
}
</style>
