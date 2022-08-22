<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <!-- <K3StepView :steps="steps" /> -->
      <div class="stepper-container">
        <K3Stepper :steps="steps"
                   v-model="cloud"
                   @completed-step="completedStep"
                   @active-step="activeStep"
                   @stepper-finished="finished"
                   @visible-change="onVisibleChange"
                   :keep-alive="false"
                   :top-buttons="true" />
        <K3Overlay :active="isFetch"
                   loader="bars"
                   background-color="#830205" />
      </div>
      <K3FormContainer>
        <K3FormRow direction="horizontal">
          <K3FormColumn label="Cloud 조회">
            <K3InputText class="mr-3"
                         v-model="index" />
            <K3Button class="mr-3"
                      label="조회"
                      @click.prevent="onClick" />
            <div class="field-checkbox">
              <K3Checkbox inputId="binary"
                          v-model="isFetch"
                          :binary="true" />
              <label for="binary">{{ `Overlay Test (isFetch: ${isFetch})` }}</label>
            </div>
          </K3FormColumn>
        </K3FormRow>
      </K3FormContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSampleService } from "~/composables/samples/useSampleService";
import PCloudInfo from "~/partialViews/samples/cloud-step.vue";
import PClusterInfo from "~/partialViews/samples/cluster-step.vue";
import PNodeInfo from "~/partialViews/samples/node-step.vue";
import PEtcdStorageInfo from "~/partialViews/samples/etcd-storage-step.vue";
import POpenstackInfo from "~/partialViews/samples/openstack-step.vue";
import PReviewInfo from "~/partialViews/samples/review-step.vue";

definePageMeta({ layout: "default", title: "Cloud Registration", public: true });

const { Util } = useAppHelper();
const { cloud, isFetch, fetch } = useSampleService().getCloud()

const steps = [
  { icon: "fas fa-cloud", name: "cloud", title: "CLOUD 정보", subTitle: "Cloud 구성 정보를 설정합니다", component: PCloudInfo, completed: false, visible: true },
  { icon: "fas fa-circle-nodes", name: "cluster", title: "CLUSTER 정보", subTitle: "Cluster 구성 정보를 설정합니다", component: PClusterInfo, completed: false, visible: true },
  { icon: "fas fa-server", name: "node", title: "NODE 정보", subTitle: "Node 구성 정보를 설정합니다", component: PNodeInfo, completed: false, visible: true },
  { icon: "fas fa-database", name: "etcdstorage", title: "ETCD/STORAGE 정보", subTitle: "ETCD 및 Storage 구성 정보를 설정합니다", component: PEtcdStorageInfo, completed: false, visible: true },
  { icon: "fas fa-cubes-stacked", name: "openstack", title: "OPENSTACK 정보", subTitle: "Openstack 구성 정보를 설정합니다", component: POpenstackInfo, completed: false, visible: false },
  { icon: "fas fa-list-check", name: "review", title: "Review", subTitle: "구성 정보를 검증합니다.", component: PReviewInfo, completed: true, visible: true },
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
const finished = (payload) => {
  alert("잘 했어... ^^");
};

// Step Visible On/Off 처리
const onVisibleChange = (val) => {
  steps.find(item => {
    if (item.name === val.name)
      item.visible = val.visible
  })
}

const index = ref(1)
const onClick = () => {
  console.log('clicked')
  fetch(index.value)
}
</script>

<style scoped lang="scss">
.page-content {
  margin-top: 0.5rem;
}

.stepper-container {
  position: relative;
}
</style>
