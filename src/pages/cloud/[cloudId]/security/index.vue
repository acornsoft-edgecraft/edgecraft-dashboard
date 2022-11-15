<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <K3DataTable
        :value="securites"
        v-model:filters="UI.tableSettings.filters.value"
        v-model:selection="selectedItem"
        dataKey="id"
        :autoLayout="true"
        :scrollable="true"
        :scrollHeight="UI.tableSettings.scrollHeight"
        removableSort
        :rows="UI.tableSettings.rows"
        :first="UI.tableSettings.first"
        :paginator="true"
        :paginatorTemplate="UI.tableSettings.pageReportTemplate"
        :rowsPerPageOptions="UI.tableSettings.rowPerPageOptions"
        :currentPageReportTemplate="UI.tableSettings.pageReportTemplate"
        :loading="isFetch"
        @page="onPage"
        stripedRows>
        <template #header>
          <BizCommonSearch :items="searchItems.items" :multi-select="searchItems.multiSelect" @reset="onReset" @change-value="changeValue" @multiselect-update="toggle" @start-dt="setStartDate" @end-dt="setEndDate">
            <template #search-right>
              <K3Button label="주기 설정" @click="onSetPeriod" />
              <K3Button label="실행" class="w-5rem" @click="onExecute" />
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
        <K3Column v-for="(col, index) of selectedColumns" :field="col.field" :header="col.header" :key="`${col.field}_index`" :sortable="col.sortable" :headerStyle="columnSize(col.field)" :bodyStyle="columnSize(col.field)">
          <template #body="slotProps">
            <NuxtLink v-if="slotProps.field == 'executed'" :to="`/cloud/${cloudId}/security/${slotProps.data.id}`">{{ Util.getDateLocaleString(slotProps.data.executed) }}</NuxtLink>
            <span v-if="slotProps.field == 'status'">{{ SecurityStatus[slotProps.data.status] }}</span>
            <span v-if="slotProps.field == 'result'">{{ slotProps.data.result }}</span>
          </template>
        </K3Column>
      </K3DataTable>

      <div class="flex justify-content-end mt-3">
        <NuxtLink to="/cloud">
          <K3Button label="클라우드 목록" class="p-button-secondary" />
        </NuxtLink>
      </div>
      <BizDialogsSecurityPeriod v-model="period" @close="close" @ok="ok" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { MessageTypes, SecurityStatus, SecurityStatusMap, StateKeys } from "~/models";

definePageMeta({ layout: "default", title: "클라우드 보안검증 결과", public: true });

const { UI, Util, Search } = useAppHelper();
const { securites, isFetch, fetch } = useSecurityService().getSecurites();

const search = Search.init(StateKeys.SEARCH_CLOUD_SC, { status: null, executed: { startDate: null, endDate: null } });
const route = useRoute();
const cloudId = route.params.cloudId;

const selectedItem = ref();
const columns = ref([
  { field: "executed", header: "executed", sortable: true },
  { field: "status", header: "status", sortable: true },
  { field: "result", header: "result", sortable: true },
]);
const selectedColumns = ref(columns.value);
const columnSize = (field) => {
  let size = 0;
  switch (field) {
    case "id":
      size = 10;
      break;
    case "status":
      size = 20;
      break;
    case "result":
      size = 20;
      break;
    case "executed":
      size = 30;
      break;
  }
  return `min-width: ${size}%`;
};
UI.tableSettings.initFilters({
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  executed: {
    operator: FilterOperator.AND,
    constraints: [
      { value: null, matchMode: FilterMatchMode.DATE_AFTER, name: "startDate" },
      { value: null, matchMode: FilterMatchMode.DATE_BEFORE, name: "endDate" },
    ],
  },
});

const onPage = (event) => {
  UI.tableSettings.first = event.first;
  UI.tableSettings.rows = event.rows;
};

const searchItems = ref({
  items: [
    { type: "dropdown", name: "status", label: "Status", value: search.value["status"], options: SecurityStatusMap(), class: "w-12rem" },
    { type: "calendar-range", name: "executed", label: "Executed", value: search.value.executed },
  ],
  multiSelect: { columns: columns.value, selectedColumns: selectedColumns.value, class: "w-20rem" },
});

const changeValue = (val) => {
  (UI.tableSettings.filters.value as any)[val.name].value = val.value;
};
const setStartDate = (event) => {
  (UI.tableSettings.filters.value as any).executed.constraints.find((v) => v.matchMode === FilterMatchMode.DATE_AFTER).value = event == null ? null : new Date(event);
};
const setEndDate = (event) => {
  (UI.tableSettings.filters.value as any).executed.constraints.find((v) => v.matchMode === FilterMatchMode.DATE_BEFORE).value = event == null ? null : new Date(event);
};
const toggle = (val) => {
  selectedColumns.value = columns.value.filter((col) => val.includes(col));
};
const onReset = () => {
  Search.reset(search, UI.tableSettings.filters);

  for (const val in searchItems.value.items) {
    if (Util.isObject(searchItems.value.items[val].value)) {
      for (const obj in searchItems.value.items[val].value) {
        searchItems.value.items[val].value[obj] = null;
      }
    } else {
      searchItems.value.items[val].value = null;
    }
  }
};

const period = ref({ display: false });
const onSetPeriod = () => {
  period.value.display = true;
};
const ok = (val) => {
  period.value.display = false;
};
const close = () => {
  period.value.display = false;
};
const onExecute = () => {
  UI.showConfirm(
    MessageTypes.INFO,
    "보안검증 실행",
    "보안검증을 실행하시겠습니까?",
    () => {
      // TODO: call api
    },
    () => {}
  );
};

watch(
  () => [(UI.tableSettings.filters.value as any).status.value, (UI.tableSettings.filters.value as any).executed.constraints[0].value, (UI.tableSettings.filters.value as any).executed.constraints[1].value],
  () => {
    Search.set(search, UI.tableSettings.filters);
  }
);

onMounted(() => {
  fetch();

  Search.get(search, UI.tableSettings.filters);
});

onUnmounted(() => {
  if (!useRouter().currentRoute.value.path.includes(useRoute().path)) {
    Search.destroy(search);
    UI.tableSettings.first = 0;
  }
});
</script>

<style scoped lang="scss">
.page-content {
  :deep(.p-progressbar-value) {
    overflow: visible;
    justify-content: start;
    background-color: #17a2b8;
  }

  :deep(.p-datatable) {
    .p-datatable-header {
      border-top: none;
    }
  }
}
</style>
