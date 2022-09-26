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
        :paginator="true"
        :paginatorTemplate="UI.tableSettings.pageReportTemplate"
        :rowsPerPageOptions="UI.tableSettings.rowPerPageOptions"
        :currentPageReportTemplate="UI.tableSettings.pageReportTemplate"
        :loading="isFetch"
        stripedRows>
        <template #header>
          <div class="header flex justify-content-between">
            <div class="search-left">
              <span>상태: </span>
              <K3Dropdown v-model="selectedStatus" :options="SecurityStatusMap(true)" :optionLabel="`name`" :optionValue="`value`" @change="statusSelected" class="w-10rem" />
              <span>실행일: </span>
              <BizCommonCalendarRange v-model="selectedExecuted" @start-dt="setStartDate" @end-dt="setEndDate" />
            </div>
            <div class="search-right toggle flex align-content-center">
              <K3MultiSelect :modelValue="selectedColumns" class="flex" :options="columns" optionLabel="header" @update:modelValue="toggle" placeholder="Select Columns" style="width: 20rem" />
              <K3Button label="주기 설정" @click="onSetPeriod" />
              <K3Button label="실행" class="w-5rem" @click="onExecute" />
            </div>
          </div>
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
            <span v-if="slotProps.field == 'id'">{{ slotProps.data.id }}</span>
            <NuxtLink v-if="slotProps.field == 'executed'" :to="`/cloud/${cloudId}/security/${slotProps.data.id}`">{{ slotProps.data.executed }}</NuxtLink>
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
// imports
import { FilterMatchMode } from "primevue/api";
import { MessageTypes, SecurityStatus, SecurityStatusMap } from "~/models";

// Page meta
definePageMeta({ layout: "default", title: "클라우드 보안검증 결과", public: true });
// Props
// const props = defineProps({}),
// Emits
// const emits = defineEmits(['eventname']),
// Properties
const route = useRoute();
const cloudId = route.params.cloudId;
const { UI } = useAppHelper();
const { securites, isFetch, fetch } = useSecurityService().getSecurites();

const selectedItem = ref();
const selectedStatus = ref(0);
const selectedExecuted = ref({ startDate: null, endDate: null });
const columns = ref([
  { field: "id", header: "id", sortable: true },
  { field: "executed", header: "실행일", sortable: true },
  { field: "status", header: "상태", sortable: true },
  { field: "result", header: "결과", sortable: true },
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
  startDate: { value: null, matchMode: FilterMatchMode.DATE_AFTER },
  endDate: { value: null, matchMode: FilterMatchMode.DATE_BEFORE },
});

// Compputed
// Watcher
// Methods
const statusSelected = (event) => {
  if (event.value == 0) event.value = null;
  (UI.tableSettings.filters.value as any).status.value = event.value;
};

const setStartDate = (event) => {
  console.log("setStartDate", event, new Date(event));
  (UI.tableSettings.filters.value as any).startDate.value = event;
};
const setEndDate = (event) => {
  console.log("setEndDate", event, new Date(event));
  (UI.tableSettings.filters.value as any).endDate.value = event;
};
const toggle = (val) => {
  selectedColumns.value = columns.value.filter((col) => val.includes(col));
};

const period = ref({ display: false });
const onSetPeriod = () => {
  period.value.display = true;
};
const ok = (val) => {
  period.value.display = false;
  console.log("ok", val);
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

// Events
onMounted(() => {
  fetch();
});
// Logics (like api call, etc)
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
.search-left {
  span:not(:first-child) {
    margin-left: 0.5rem;
  }
}
.search-right {
  .p-button {
    margin-left: 0.5rem;
  }
}
</style>
