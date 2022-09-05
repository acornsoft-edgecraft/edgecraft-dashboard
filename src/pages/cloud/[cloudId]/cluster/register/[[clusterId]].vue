<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <div class="stepper-container">
        <K3Stepper :steps="steps" v-model="cluster" @completed-step="completedStep" @active-step="activeStep" @stepper-finished="finished" :keep-alive="false" :top-buttons="true" />
        <K3Overlay :active="isFetch" loader="bars" background-color="#830205" />
      </div>

      <div class="flex justify-content-end mt-3">
        <NuxtLink :to="`/cloud/${cloudId}/cluster`">
          <K3Button label="클러스터 목록" class="p-button-secondary" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// imports
import PClusterInfo from "~/partialViews/cluster/cluster-step.vue";
import POpenstackInfo from "~/partialViews/cluster/openstack-step.vue";

// Page meta
definePageMeta({ layout: "default", title: "클라우드 클러스터 생성", public: true });
// Props
// const props = defineProps({}),
// Emits
// const emits = defineEmits(['eventname']),
// Properties
const { cluster, isFetch, fetch } = useClusterService().getCluster();
const route = useRoute();
const cloudId = route.params.cloudId;
const clusterId = route.params.clusterId || 0;

const steps = [
  { icon: "fas fa-circle-nodes", name: "cluster", title: "CLUSTER 정보", subTitle: "Cluster 구성 정보를 설정합니다", component: PClusterInfo, completed: false, visible: true },
  { icon: "fas fa-cubes-stacked", name: "openstack", title: "OPENSTACK 정보", subTitle: "Openstack 구성 정보를 설정합니다", component: POpenstackInfo, completed: false, visible: true },
  { icon: "fas fa-server", name: "node", title: "NODE 정보", subTitle: "Node 구성 정보를 설정합니다", component: PClusterInfo, completed: false, visible: true },
  { icon: "fas fa-database", name: "etcdstorage", title: "ETCD/STORAGE 정보", subTitle: "ETCD 및 Storage 구성 정보를 설정합니다", component: PClusterInfo, completed: false, visible: true },
  { icon: "fas fa-list-check", name: "review", title: "Review", subTitle: "구성 정보를 검증합니다", component: PClusterInfo, completed: true, visible: true },
];
// Compputed
// Watcher
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
  alert("finished");

  // TODO: call api
};
// Events
onMounted(() => {
  // fetch(clusterId);
  fetch(1);
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
