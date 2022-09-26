<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <K3Card>
        <template #content>
          Kubernetes Version:
          <span>{{ K8sVersions[version] }}</span>
        </template>
      </K3Card>
      <BizSecurityTreeTable :items="items" :columns="columns" selectionMode="checkbox" :selectedKeys="selectedKeys" :expandBtns="true" :loading="loading" @selected-keys="onSelectedKeys" />

      <div class="flex justify-content-end button-wrapper">
        <NuxtLink to="/management/security">
          <K3Button label="취소" icon="pi pi-times" class="p-button-secondary" />
        </NuxtLink>
        <K3Button label="저장" icon="pi pi-check" @click="onSubmit" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { K8sVersions } from "~/models";
// TEST DATA
import cis from "~/pages/samples/cis.json";
import cis22 from "~/pages/samples/cis.22.json";
import selectedKey from "~/pages/samples/selectedKey.json";

definePageMeta({ layout: "default", title: "Security Verification Management", public: true });
// const props = defineProps({}),
// const emits = defineEmits(['eventname']),
const route = useRoute();
const version = route.params.version as any;

const items = ref();
const loading = ref(false);
const selectedKeys = ref();

const columns = [
  { field: "cis_id", header: "CIS ID", expander: true, headerStyle: { "min-width": "12%" } },
  { field: "recommendation", header: "Recommendation description", headerStyle: { "min-width": "60%" } },
  { field: "scoring_type", header: "Scoring Type", headerStyle: { "min-width": "10%" } },
  { field: "level", header: "Level", headerStyle: { "min-width": "8%" } },
  { field: "status", header: "Status", headerStyle: { "min-width": "10%" } },
];

const onSelectedKeys = (val) => {
  console.log("onSelectedKeys", val);
  selectedKeys.value = val;
};
const onSubmit = () => {
  console.log("onsubmit");
};

onMounted(() => {
  loading.value = true;
  if (version == 1) {
    items.value = cis22;
  } else {
    items.value = cis;
  }
  loading.value = false;
  selectedKeys.value = selectedKey;
});
</script>

<style scoped lang="scss">
:deep(.p-treetable) {
  .p-treetable-header {
    border-top: none;
  }
}
.p-card {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;

  :deep(.p-card-content) {
    padding: 0;

    span {
      font-weight: 700;
    }
  }
}

.button-wrapper {
  margin-top: 1rem;

  .p-button {
    width: 7rem;
    margin-left: 0.5rem;
  }
}
</style>
