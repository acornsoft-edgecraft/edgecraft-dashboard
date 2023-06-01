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
    </section>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { MessageTypes, BenchmarksStatus, BenchmarksStatusMap, StateKeys, BootstrapProviders, K8sVersions, CloudStatus } from "~/models";
definePageMeta({ layout: "default", title: "클라우드 클러스터 Backup & Restore Status", public: false });

const { cluster, isFetch, fetch } = useClusterService().getBenchmarksList();
// const props = defineProps({}),
// const emits = defineEmits(['eventname']),
</script>

<style scoped lang="scss"></style>
