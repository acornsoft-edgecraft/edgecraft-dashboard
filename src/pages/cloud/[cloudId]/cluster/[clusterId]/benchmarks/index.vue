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
      <div class="flex my-3">
        <K3Button label="Benchmarks 실행" icon="pi pi-play" class="px-3" @click="execute" v-if="cluster.status === CloudStatus.Provisioned" />
        <span class="text-danger font-semibold" v-else>[Benchmarks 실행은 클러스터가 Provisioned 상태일 때만 가능합니다.]</span>
      </div>
      <K3DataTable 
        :value="benchmarks" 
        v-model:filters="UI.tableSettings.filters.value" 
        dataKey="benchmarks_uid" 
        :autoLayout="true" 
        :scrollable="true" 
        :scrollHeight="UI.tableSettings.scrollHeight" 
        selectionMode="single" 
        removableSort 
        :rows="UI.tableSettings.rows" 
        :first="UI.tableSettings.first" 
        :paginator="true" 
        :paginatorTemplate="UI.tableSettings.paginatorTemplate"
        :rowPerPageOptions="UI.tableSettings.rowPerPageOptions" 
        :currentPageReportTemplate="UI.tableSettings.pageReportTemplate"
        :loading="isFetch" 
        @page="onPage" 
        stripedRows>
        <template #header>
          <BizCommonSearch :items="searchItems.items" @reset="onReset" @change-value="changeValue" @multiselect-update="toggle" @start-dt="setStartDate" @end-dt="setEndDate">
            <template #search-right>
              <NuxtLink :to="`/cloud/${cloudId}/cluster`"><K3Button label="클러스터 목록" icon="pi pi-list" class="p-button-secondary" /></NuxtLink>
            </template>
          </BizCommonSearch>
        </template>
        <template #loading>
          <K3ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        </template>
        <template #empty>
          <div class="w-full text-center">
            <p class="text-orange-500">No records found.</p>
          </div>
        </template>
        <template #paginatorstart>
          <K3Button icon="pi pi-refresh" class="p-button-text" @click="refresh" />
        </template>
        <template #paginatorend></template>
        <K3Column v-for="col of selectedColumns" :field="col.field" :header="col.header" :key="`${col.field}_index`" :sortable="col.sortable" :headerStyle="columnSize(col.field)" :bodyStyle="columnSize(col.field)">
          <template #body="slotProps">
            <NuxtLink v-if="slotProps.field === 'created'" :to="`/cloud/${cloudId}/cluster/${clusterId}/benchmarks/${slotProps.data.benchmarks_uid}`">{{ Util.getDateLocaleString(slotProps.data.created) }}</NuxtLink>
            <span v-if="slotProps.field === 'status'">
              {{ BenchmarksStatus[slotProps.data.status] }}
            </span>            
            <span v-if="slotProps.field === 'totals'">
              <BizBenchmarksTotals :model="slotProps.data.totals" v-if="slotProps.data.status === 2" />
              <span v-if="slotProps.data.status === 3" class="text-red-600">{{ slotProps.data.reason }}</span>
            </span>
          </template>
        </K3Column>
      </K3DataTable>
      <K3Overlay :active="isExecFetch" loader="bars" background-color="#830205" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterOperator  } from 'primevue/api';
import { MessageTypes, BenchmarksStatus, BenchmarksStatusMap, StateKeys, BootstrapProviders, K8sVersions, CloudStatus } from '~/models';

definePageMeta({ layout: "default", title: "클라우드 클러스터 CIS Benchmarks", public: true });

const { UI, Util, Search } = useAppHelper();
const { cluster, benchmarks, isFetch, fetch } = useClusterService().getBenchmarksList();
const { isExecFetch, execFetch } = useClusterService().execBenchmarks();

const search = Search.init(StateKeys.SEARCH_CLUSTER_BC, { status: null, created: { startDate: null, endDate: null } });
const route = useRoute();
const cloudId = route.params.cloudId;
const clusterId = route.params.clusterId;

const columns = ref([
  { field: "created", header: "실행 시각", sortable: true },
  { field: "status", header: "실행 상태", sortable: true },
  { field: "totals", header: "실행 결과", sortable: false },
])
const selectedColumns = ref(columns.value);
const columnSize = (field) => {
  let size = 0;
  switch (field) {
    case "created":
      size = 30;
      break;
    case "status":
      size = 10;
      break;
    case "totals":
      size = 40;
      break;
  }

  return `min-width: ${size}%`;
}

UI.tableSettings.initFilters({
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  created: {
    operator: FilterOperator.AND,
    constraints: [
      { value: null, matchMode: FilterMatchMode.DATE_AFTER, name: "startDate" },
      { value: null, matchMode: FilterMatchMode.DATE_BEFORE, name: "endDate" },
    ],
  },
})

const searchItems = ref({
  items: [
    { type: "dropdown", name: "status", label: "실행 상태", options: BenchmarksStatusMap(), value: search.value["status"], class: "w-12rem" },
    { type: "calendar-range", name: "created", label: "실행 시각", value: search.value.created }
  ],
})

const onPage = (event) => {
  UI.tableSettings.first = event.first;
  UI.tableSettings.rows = event.rows;
}
const onReset = () => {
  Search.reset(search, UI.tableSettings.filters);

  for(const val in searchItems.value.items) {
    if (Util.isObject(searchItems.value.items[val].value)) {
      for(const obj in searchItems.value.items[val].value) {
        searchItems.value.items[val].value[obj] = null;
      }
    } else {
      searchItems.value.items[val].value = null;
    }
  }
}
const toggle = (val) => {
  selectedColumns.value = columns.value.filter((col) => val.includes(col));
}
const changeValue = (val) => {
  (UI.tableSettings.filters.value as any)[val.name].value = val.value;
}
const setStartDate = (event) => {
  (UI.tableSettings.filters.value as any).created.constraints.find((v) => v.matchMode === FilterMatchMode.DATE_AFTER).value = event == null ? null : new Date(event);
}
const setEndDate = (event) => {
  (UI.tableSettings.filters.value as any).created.constraints.find((v) => v.matchMode === FilterMatchMode.DATE_BEFORE).value = event == null ? null : new Date(event);
}

const refresh = () => {
  benchmarks.value = [];
  fetch(cloudId, clusterId);
}

const execute = () => {
  UI.showConfirm(
    MessageTypes.INFO,
    "Benchmarks 실행",
    "Benchmarks를 실행하시겠습니까?",
    () => onExecute(),
    () => {}
  );
}
const onExecute = async () => {
  let result;
  try {
    result = await execFetch(cloudId, clusterId);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, "Benchmarks 실행", err);
  }
  if (result.isError) return;

  UI.showToastMessage(MessageTypes.INFO, "Benchmarks 실행", result.message || "Benchmarks 실행 요청하였습니다.");
  refresh();
}

watch(
  () => [(UI.tableSettings.filters.value as any).status.value, (UI.tableSettings.filters.value as any).created.constraints[0].value, (UI.tableSettings.filters.value as any).created.constraints[1].value],
  () => {
    Search.set(search, UI.tableSettings.filters);
  }
)

onMounted(() => {
  fetch(cloudId, clusterId);

  Search.get(search, UI.tableSettings.filters);
});

onUnmounted(() => {
  if (!useRouter().currentRoute.value.path.includes(useRoute().path)) {
    Search.destroy(search);
    UI.tableSettings.first = 0;
  }
})
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
