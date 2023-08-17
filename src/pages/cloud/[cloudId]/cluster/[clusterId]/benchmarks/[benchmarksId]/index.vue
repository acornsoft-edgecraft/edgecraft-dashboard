<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <div class="flex justify-content-end mt-3">
        <K3Button icon="pi pi-fresh" class="p-button-text mr-2" @click="getBenchmarks" />
        <NuxtLink :to="list"><K3Button label="Benchmarks 실행결과 목록" icon="pi pi-list" class="p-button-secondary" /></NuxtLink>
      </div>
      <div class="info-wrapper" v-if="benchmarks">
        <K3FormContainer>
          <K3FormRow>
            <K3FormColumn label="실행 시각">{{ Util.getDateLocaleString(benchmarks.created_at) }}</K3FormColumn>
          </K3FormRow>
          <K3FormRow>
            <K3FormColumn label="CIS Benchmarks Version">{{ benchmarks.cis_version }}</K3FormColumn>
          </K3FormRow>
          <K3FormRow>
            <K3FormColumn label="실행 상태">{{ BenchmarksStatus[benchmarks.status] }}</K3FormColumn>
          </K3FormRow>
          <K3FormRow v-if="benchmarks.status == 3">
            <K3FormColumn label="실패 이유">{{ benchmarks.reason }}</K3FormColumn>
          </K3FormRow>
          <K3FormRow v-if="benchmarks.status == 2">
            <K3FormColumn label="실행 결과">
              <BizBenchmarksTotals :model="benchmarks.totals" />
            </K3FormColumn>
          </K3FormRow>
        </K3FormContainer>
      </div>
      <K3Card v-if="benchmarks && benchmarks.status == 2 && benchmarks.results">
        <template #subtitle>노드 별 상세 실행결과</template>
        <template #content>
          <K3Accordion :multiple="true">
            <K3AccordionTab v-for="(result, index) in benchmarks.results" :key="index" :header="result.node_name">
              <BizBenchmarksResults :model="result" />
            </K3AccordionTab>
          </K3Accordion>
        </template>
      </K3Card>
      <div class="flex justify-content-end mt-3">
        <NuxtLink :to="list"><K3Button label="Benchmarks 실행결과 목록" icon="pi pi-list" class="p-button-secondary" /></NuxtLink>
      </div>
      <K3Overlay :active="active" loader="bars" background-color="#830205" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { MessageTypes, BenchmarksStatus } from "~/models";

definePageMeta({ layout: "default", title: "클라우드 클러스터 CIS Benchmarks", public: true });

const { UI, Util, Routing } = useAppHelper();
const { benchmarks, isFetch, fetch } = useClusterService().getBenchmarks();

const route = useRoute();
const cloudId = route.params.cloudId;
const clusterId = route.params.clusterId;
const benchmarksId = route.params.benchmarksId;
const list = `/cloud/${cloudId}/cluster/${clusterId}/benchmarks`

const active = computed(() => unref(isFetch));
const getBenchmarks = async () => {
  let result;
  try {
    result = await fetch(cloudId, clusterId, benchmarksId);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, "Benchmarks 정보", err);
  }
  if (result.isError) Routing.moveTo(list);
}

onMounted(() => {
  if (benchmarksId) {
    getBenchmarks();
  }
});
</script>

<style scoped lang="scss">
.info-wrapper {
  background-color: #fff;
  padding: 0.25rem;
  margin: 1rem 0;

  .form-container {
    box-shadow: none;
  }
}

.p-card {
  margin-top: 1rem;

  :deep(.p-card-subtitle) {
    font-size: 1.2rem;
    font-weight: 600;
    color: #000;
  }
}
</style>
