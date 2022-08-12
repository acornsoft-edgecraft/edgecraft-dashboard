<template>
  <div class="page-container">
    <div class="page-wrapper">
      <section class="page-header">
        <K3PageTitle />
      </section>
      <section class="page-content">
        <K3Stepper :steps="steps" v-model="cloudRegModel" @completed-step="completedStep" @active-step="activeStep" @stepper-finished="finished" :top-buttons="true" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
// import PCloudInfo from "~/partialViews/cloud/cloud-step.vue";
import PCloudInfo from "~~/src/partialViews/cloud/cloud-step-form.vue";
import PClusterInfo from "~/partialViews/cloud/cluster-step.vue";
import PNodeInfo from "~/partialViews/cloud/node-step.vue";
import PEtcdStorageInfo from "~/partialViews/cloud/etcd-storage-step.vue";
import POpenstackInfo from "~/partialViews/cloud/openstack-step.vue";
import PReviewInfo from "~/partialViews/cloud/review-step.vue";
import { defaultCloudReg } from "~/models";

// Page meta
definePageMeta({ layout: "default", title: "클라우드 등록", public: true });
// Props
// const props = defineProps({}),
// Emits
// const emits = defineEmits(['eventname']),
// Properties
const route = useRoute();
const { Util } = useAppHelper();
const { cloud, fetch } = useCloudService().getCloud(route.params.id);

const cloudRegModel = Util.clone(defaultCloudReg);

const steps = [
  { icon: "fas fa-cloud", name: "cloud", title: "CLOUD 정보", subTitle: "Cloud 구성 정보를 설정합니다", component: PCloudInfo, completed: false },
  { icon: "fas fa-circle-nodes", name: "cluster", title: "CLUSTER 정보", subTitle: "Cluster 구성 정보를 설정합니다", component: PClusterInfo, completed: false },
  { icon: "fas fa-server", name: "node", title: "NODE 정보", subTitle: "Node 구성 정보를 설정합니다", component: PNodeInfo, completed: false },
  { icon: "fas fa-database", name: "etcdstorage", title: "ETCD/STORAGE 정보", subTitle: "ETCD 및 Storage 구성 정보를 설정합니다", component: PEtcdStorageInfo, completed: false },
  { icon: "fas fa-cubes-stacked", name: "openstack", title: "OPENSTACK 정보", subTitle: "Openstack 구성 정보를 설정합니다", component: POpenstackInfo, completed: false },
  { icon: "fas fa-list-check", name: "review", title: "Review", subTitle: "구성 정보를 검증합니다.", component: PReviewInfo, completed: true },
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
  alert("잘 했어... ^^");
};
// Events
onMounted(() => {
  if (route.params.id != "") {
    fetch();
  }
  console.log("cloud", cloud);
});
// Logics (like api call, etc)
</script>

<style scoped lang="scss">
.page-content {
  margin-top: 0.5rem;
}
</style>
