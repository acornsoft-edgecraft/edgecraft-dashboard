<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <div class="stepper-container">
        <K3Stepper :steps="steps" v-model="cloud" @completed-step="completedStep" @active-step="activeStep" @stepper-finished="finished" @visible-change="onVisibleChange" :keep-alive="false" :top-buttons="true" />
        <K3Overlay :active="isFetch || isInsFetch || isUpFetch" loader="bars" background-color="#830205" />
      </div>

      <div class="flex justify-content-end mt-3">
        <NuxtLink to="/cloud">
          <K3Button label="클라우드 목록" class="p-button-secondary" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// imports
import PCloudInfo from "~/partialViews/cloud/cloud-step.vue";
import PClusterInfo from "~/partialViews/cloud/cluster-step.vue";
import PNodeInfo from "~/partialViews/cloud/node-step.vue";
import PEtcdStorageInfo from "~/partialViews/cloud/etcd-storage-step.vue";
import POpenstackInfo from "~/partialViews/cloud/openstack-step.vue";
import PReviewInfo from "~/partialViews/cloud/review-step.vue";
import { CloudTypes } from "~/models";

// Page meta
definePageMeta({ layout: "default", title: "클라우드 등록", public: true });
// Props
// const props = defineProps({}),
// Emits
// const emits = defineEmits(['eventname']),
// Properties
const { Routing } = useAppHelper();
const { cloud, isFetch, fetch } = useCloudService().getCloud();
const { isInsFetch, insFetch } = useCloudService().insertCloud();
const { isUpFetch, upFetch } = useCloudService().updateCloud();
const route = useRoute();
const cloudId = route.params.cloudId || 0;

const steps = [
  { icon: "fas fa-cloud", name: "cloud", title: "CLOUD 정보", subTitle: "Cloud 구성 정보를 설정합니다", component: PCloudInfo, completed: false, visible: true },
  { icon: "fas fa-circle-nodes", name: "cluster", title: "CLUSTER 정보", subTitle: "Cluster 구성 정보를 설정합니다", component: PClusterInfo, completed: false, visible: true },
  { icon: "fas fa-server", name: "node", title: "NODE 정보", subTitle: "Node 구성 정보를 설정합니다", component: PNodeInfo, completed: false, visible: true },
  { icon: "fas fa-database", name: "etcdstorage", title: "ETCD/STORAGE 정보", subTitle: "ETCD 및 Storage 구성 정보를 설정합니다", component: PEtcdStorageInfo, completed: false, visible: true },
  { icon: "fas fa-cubes-stacked", name: "openstack", title: "OPENSTACK 정보", subTitle: "Openstack 구성 정보를 설정합니다", component: POpenstackInfo, completed: false, visible: false },
  { icon: "fas fa-list-check", name: "review", title: "Review", subTitle: "구성 정보를 검증합니다.", component: PReviewInfo, completed: true, visible: true },
];
// Compputed
// Watcher
watch(
  () => cloud.value.cloud?.type,
  (val) => {
    if (val == CloudTypes.Openstack) {
      onVisibleChange({ name: "openstack", visible: true });
    }
  }
);
// Methods
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
const finished = (payload) => {
  // TODO: call api
  if (cloudId == 0) {
    insFetch(cloud.value);
  } else {
    upFetch(cloudId, cloud.value);
  }
  Routing.moveTo("/cloud");
};

// Step Visible On/Off 처리
const onVisibleChange = (val) => {
  steps.find((item) => {
    if (item.name === val.name) item.visible = val.visible;
  });
};

// Events
onMounted(() => {
  fetch(cloudId);
});

// Logics (like api call, etc)
</script>

<style scoped lang="scss">
.page-content {
  margin-top: 0.5rem;
}

.stepper-container {
  position: relative;
}
</style>
