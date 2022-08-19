<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <K3DataTable
        :value="clouds"
        v-model:filters="UI.tableSettings.filters.value"
        v-model:selection="selectedItem"
        dataKey="id"
        :autoLayout="true"
        :scrollable="true"
        :scrollHeight="UI.tableSettings.scrollHeight"
        selectionMode="single"
        removableSort
        :rows="UI.tableSettings.rows"
        :paginator="true"
        :paginatorTemplate="UI.tableSettings.paginatorTemplate"
        :rowsPerPageOptions="UI.tableSettings.rowPerPageOptions"
        :currentPageReportTemplate="UI.tableSettings.pageReportTemplate"
        :loading="isFetch"
        @rowSelect="rowSelected"
        @rowUnselect="rowUnselected"
        stripedRows>
        <template #header>
          <div class="header flex justify-content-between">
            <div class="search-left">
              <span>Cloud Type: </span>
              <K3Dropdown v-model="selectedCloud" :options="CloudTypesMap(true)" :optionLabel="'name'" :optionValue="'value'" class="mr-2" @change="typeSelected" />
              <span>Status: </span>
              <K3Dropdown v-model="selectedStatus" :options="CloudStatusMap(true)" :optionLabel="'name'" :optionValue="'value'" class="mr-2" @change="statusSelected" />
              <span>Name: </span>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <K3InputText class="flex" v-model="(UI.tableSettings.filters.value as any).name.value" placeholder="Search" autofocus />
              </span>
            </div>
            <div class="search-right toggle flex align-content-center">
              <K3MultiSelect class="flex mr-2" :modelValue="selectedColumns" :options="columns" optionLabel="header" @update:modelValue="toggle" placeholder="Select Columns" style="width: 20em" />
              <NuxtLink to="/cloud/register"><K3Button label="클라우드 등록" /></NuxtLink>
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
        <!-- Columns -->
        <K3Column v-for="(col, index) of selectedColumns" :class="col.class" :field="col.field" :header="col.header" :sortable="col.sortable" :key="`${col.field}_index`" :headerStyle="columnSize(col.field)" :bodyStyle="columnSize(col.field)">
          <template #body="slotProps">
            <span v-if="slotProps.field === 'type'">{{ CloudTypes[slotProps.data.type] }} </span>
            <NuxtLink v-else-if="slotProps.field === 'name'" :to="`/cloud/register/${slotProps.data.id}`">{{ slotProps.data.name }}</NuxtLink>
            <span v-else-if="slotProps.field === 'status'">{{ CloudStatus[slotProps.data.status] }} </span>
            <span v-else-if="slotProps.field === 'nodeCount'">{{ slotProps.data.nodeCount }}</span>
            <span v-else-if="slotProps.field === 'created'">{{ slotProps.data.created }}</span>
            <span v-else>{{ slotProps.data[slotProps.field] }}</span>
          </template>
        </K3Column>
        <K3Column header="Commands" key="cmd" class="flex justify-content-center" headerStyle="min-width: 30px;" bodyStyle="min-width: 30px;">
          <template #body="slotProps">
            <i class="fas fa-ellipsis-v" style="width: 10px" @click="showCommand(slotProps.data.id, $event)"></i>
          </template>
        </K3Column>
      </K3DataTable>
      <K3ContextMenu ref="menu" :model="menus" />
    </section>
  </div>
</template>
<script setup lang="ts">
import { FilterMatchMode } from "primevue/api";
import { CloudTypes, CloudTypesMap, CloudStatus, CloudStatusMap, MessageTypes } from "~/models";

definePageMeta({ layout: "default", title: "Clouds List", public: true });

const { UI } = useAppHelper();
const { clouds, isFetch, fetch } = useCloudService().getClouds();

UI.tableSettings.initFilters({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  type: { value: null, matchMode: FilterMatchMode.EQUALS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const menu = ref();
const selectedItem = ref();
const selectedCloud = ref("");
const selectedStatus = ref("");
const columns = ref([
  { field: "type", header: "Type", sortable: true },
  { field: "name", header: "Cloud Name", sortable: true },
  { field: "status", header: "Status", sortable: true },
  { field: "nodeCount", header: "Nodes", sortable: true, class: "flex justify-content-end" },
  { field: "version", header: "Version", sortable: true },
  { field: "created", header: "Created", sortable: true },
]);
const selectedColumns = ref(columns.value);
const menus = [{ label: "클러스터 목록", icon: "pi pi-list", command: () => rowMenuProcessing("1") }, { separator: true }, { label: "어플리케이션", icon: "fas fa-shapes", command: () => rowMenuProcessing("2") }, { separator: true }, { label: "보안검증 결과", icon: "fas fa-shield-halved", command: () => rowMenuProcessing("3") }];

const columnSize = (field) => {
  let size = 0;
  switch (field) {
    case "type":
      size = 5;
      break;
    case "name":
      size = 60;
      break;
    case "status":
      size = 5;
      break;
    case "nodeCount":
      size = 5;
      break;
    case "version":
      size = 5;
      break;
    case "created":
      size = 12;
      break;
  }

  return `min-width: ${size}%`;
};

const typeSelected = (event) => {
  (UI.tableSettings.filters.value as any).type.value = event.value;
};
const statusSelected = (event) => {
  (UI.tableSettings.filters.value as any).status.value = event.value;
};
const rowSelected = (event) => {
  // TODO: Row selected
};
const rowUnselected = (event) => {
  // TODO: Row unselected
};

const toggle = (val) => {
  selectedColumns.value = columns.value.filter((col) => val.includes(col));
};

const showCommand = (id, event) => {
  selectedItem.value = clouds.value.find((c) => c.id === id);
  menu.value.show(event);
};

const rowMenuProcessing = (menuId) => {
  UI.showToastMessage(MessageTypes.INFO, "Row Menu", `menum #${menuId} selected with ${JSON.stringify(selectedItem.value)}`);
};

onMounted(() => {
  fetch();
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