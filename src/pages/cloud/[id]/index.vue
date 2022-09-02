<template>
  <div class="partial-container">
    <div class="page-wrapper">
      <section class="page-header">
        <K3PageTitle />
      </section>
      <section class="page-content">
        <div class="flex justify-content-end mt-3">
          <K3Button label="Kore-Board"
                    icon="pi pi-external-link"
                    iconPos="right"
                    class="p-button mr-2"
                    @click="goKoreboard"
                    v-if="provisioned" />
          <K3Button label="k8s Cluster Upgrade"
                    class="p-button mr-2"
                    @click="onUpgrade"
                    v-if="provisioned" />
          <K3Button label="클라우드 삭제"
                    class="p-button-danger"
                    @click="onDelete" />
        </div>
        <K3Card class="mt-3">
          <template #title>클라우드 정보</template>
          <template #content>
            <K3FormContainer>
              <K3FormRow>
                <K3FormColumn label="Cloud Name"
                              label-align="right">{{ cloud.cloud.name }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Cloud Type"
                              label-align="right">{{ CloudTypes[cloud.cloud.type] }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Cloud Status"
                              label-align="right">{{ CloudStatus[cloud.cloud.status] }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Cloud Desc"
                              label-align="right">{{ cloud.cloud.desc }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Kubernetes Version"
                              label-align="right">{{ K8sVersions[cloud.cluster.k8s.version] }}</K3FormColumn>
              </K3FormRow>
              <K3FormRow>
                <K3FormColumn label="Created"
                              label-align="right">{{ cloud.cloud.created }}</K3FormColumn>
              </K3FormRow>
            </K3FormContainer>
          </template>
        </K3Card>

        <K3TabView class="mt-3"
                   v-if="cloud.cloud.status == CloudStatus.Saved || cloud.cloud.status == CloudStatus.Provisioning">
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

        <K3Card class="mt-3"
                v-if="provisioned">
          <template #title>노드 정보</template>
          <template #content>
            <NodeList :type="NodeTypes.MASTER"
                      v-model="cloud.nodes.master_nodes"
                      @add-node="addNode" />
            <NodeList :type="NodeTypes.WORKER"
                      v-model="cloud.nodes.worker_nodes"
                      @add-node="addNode" />
          </template>
        </K3Card>

        <DCloudNode v-model="cloudNode"
                    @close="close"
                    @ok="ok" />
        <DK8sUpgrade v-model="k8sUpgrade"
                     @close="close"
                     @upgrade="upgrade" />

        <div class="flex justify-content-end mt-3">
          <NuxtLink to="/cloud">
            <K3Button label="목록"
                      class="p-button-secondary" />
          </NuxtLink>
        </div>
        <K3Overlay :active="isFetch"
                   loader="bars"
                   background-color="#830205" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import NodeList from "~/partialViews/cloud/node-list.vue";
import DCloudNode from "~/partialViews/dialogs/cloud-node.vue";
import DK8sUpgrade from "~/partialViews/dialogs/k8s-upgrade.vue";
import { CloudTypes, CloudStatus, K8sVersions, MessageTypes, NodeTypes, defaultBaremetalHostInfo, defaultNodeInfo } from "~/models";

// Page meta
definePageMeta({ layout: "default", title: "클라우드 상세정보", public: true });
// Props
// const props = defineProps({}),
// Emits
// const emits = defineEmits(['eventname']),
// Properties
const route = useRoute();
const { UI, Util, Routing } = useAppHelper();
const { cloud, isFetch, fetch } = useCloudService().getCloud();
const provisioned = computed(() => cloud.value.cloud.status == CloudStatus.Provisioned);

// Compputed

// Watcher
// Methods
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

const accept = () => {
  // TODO: delete cloud
  Routing.moveTo("/cloud");
};
const reject = () => { };
const onDelete = () => {
  UI.showConfirm(MessageTypes.ERROR, "클라우드 삭제", `<${cloud.value.cloud.name}> 클라우드를 삭제하시겠습니까?\n 관련된 모든 정보가 삭제됩니다.`, accept, reject);
};

const cloudNode = ref({ item: {}, type: "", display: false });
const addNode = (data) => {
  cloudNode.value = data;
};
const ok = (val) => {
  cloudNode.value.display = false;
  console.log("add node", val);
  let nodes;
  if (val.type == NodeTypes.MASTER) {
    nodes = cloud.value.nodes.master_nodes;
  } else if (val.type == NodeTypes.WORKER) {
    nodes = cloud.value.nodes.worker_nodes;
  }
  nodes.push(val.item);

  console.log(" nodes ", nodes);
  // TODO: call api - add node
};

const close = () => {
  cloudNode.value.display = false;
  k8sUpgrade.value.display = false;
};

// Events
onMounted(() => {
  // fetch(route.params.id);
  fetch(1);
});
// Logics (like api call, etc)
</script>

<style scoped lang="scss">
::v-deep(.dark-demo-terminal) {
  background-color: #212121;
  color: #ffffff;
  min-height: 200px;

  .p-terminal-command {
    color: #80cbc4;
  }

  .p-terminal-prompt {
    color: #ffd54f;
  }

  .p-terminal-response {
    color: #9fa8da;
  }
}
</style>
