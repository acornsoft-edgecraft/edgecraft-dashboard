<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <K3Card>
        <template #content>
          <K3FormContainer>
            <K3FormRow>
              <K3FormColumn label="클러스터 명">{{ cluster.name }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="클러스터 상태">{{ CloudStatus[cluster.status] }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Bootstrap Provider">{{ BootstrapProviders[cluster.bootstrap_provider] }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Kubernetes Version">{{ K8sVersions[cluster.version] }}</K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
        </template>
      </K3Card>
      <K3Card class="mt-2">
        <template #title>Backup</template>
        <template #content>
          <K3FormContainer>
            <K3FormRow>
              <K3FormColumn label="백업 이름">
                <K3InputText :value="backresParam.name" @input="checkValue($event)" @keyup.delete="removeData($event)"> </K3InputText>
                <small class="ml-2 text-red-300">영문소문자와 숫자만 가능합니다.</small>
                <K3Button label="Backup 실행" icon="pi pi-play" class="mx-3" @click="" /> [{{ backresParam.name }}]
              </K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
          <!-- <div class="flex my-3">
            <K3Button label="Benchmarks 실행" icon="pi pi-play" class="px-3" @click="execute" v-if="cluster.status === CloudStatus.Provisioned" />
            <span class="text-danger font-semibold" v-else>[Benchmarks 실행은 클러스터가 Provisioned 상태일 때만 가능합니다.]</span>
          </div> -->
        </template>
      </K3Card>

      <K3Card class="mt-2">
        <template #title>Restore</template>
        <template #content></template>
      </K3Card>
    </section>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { MessageTypes, BenchmarksStatus, BenchmarksStatusMap, StateKeys, BootstrapProviders, K8sVersions, CloudStatus } from "~/models";

definePageMeta({ layout: "default", title: "클라우드 클러스터 Backup & Restore", public: true });

const { cluster, isFetch, fetch } = useClusterService().getBenchmarksList();

const route = useRoute();
const cloudId = route.params.cloudId;
const clusterId = route.params.clusterId;
const backresParam = ref({ backresId: "", name: "" });

// const props = defineProps({}),
// const emits = defineEmits(['eventname']),

const removeData = (event) => {
  backresParam.value.name = event.target.value;
};
const checkValue = (event) => {
  if (event.data !== null) {
    const reg = /[a-z]|[A-Z]|[0-9]/;
    if (reg.exec(event.data) === null) {
      event.target.value = backresParam.value.name;
      event.preventDefault();
    } else {
      backresParam.value.name += event.data;
    }
    //     } else {
    //       event.preventDefault();
    //       //event.target.value = backresParam.value.name;
    //     }
  }
};

const changeValue = (val, event) => {
  alert(`${event.data}, ${val}`);
  return false;
  //   let val = event.value;
  //   if (item.type == "text") val = event.target.value;
  //   emits("change-value", { name: item.name, value: val });
};

onMounted(() => {
  fetch(cloudId, clusterId);
});
</script>

<style scoped lang="scss">
.p-card {
  margin-top: 1rem;

  :deep(.p-card-body) {
    padding: 0.5rem;
  }
  :deep(.p-card-content) {
    padding: 0;
  }
}

.form-container {
  box-shadow: none;
  padding: 0;
}
</style>
