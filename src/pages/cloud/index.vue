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
              <K3Dropdown v-model="(UI.tableSettings.filters.value as any).type.value" :options="CloudTypesMap()" :optionLabel="'name'" :optionValue="'value'" class="w-11rem" placeholder="선택" :showClear="true" @change="typeSelected" />
              <span>Status: </span>
              <K3Dropdown v-model="(UI.tableSettings.filters.value as any).status.value" :options="CloudStatusMap()" :optionLabel="'name'" :optionValue="'value'" class="w-12rem" placeholder="선택" :showClear="true" @change="statusSelected" />
              <span>Name: </span>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <K3InputText class="flex" v-model="(UI.tableSettings.filters.value as any).name.value" placeholder="Search" autofocus />
              </span>
              <K3Button label="초기화" class="p-button-outlined p-button-plain" @click="onReset" />
            </div>
            <div class="search-right toggle flex align-content-center">
              <K3MultiSelect class="flex w-20rem" :modelValue="selectedColumns" :options="columns" optionLabel="header" @update:modelValue="toggle" placeholder="Select Columns" />
              <NuxtLink to="/cloud/register">
                <K3Button label="클라우드 등록" />
              </NuxtLink>
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
            <NuxtLink v-else-if="slotProps.field === 'name'" :to="page(slotProps.data)">{{ slotProps.data.name }}</NuxtLink>
            <span v-else-if="slotProps.field === 'status'">{{ CloudStatus[slotProps.data.status] }} </span>
            <span v-else-if="slotProps.field === 'nodeCount'">{{ slotProps.data.nodeCount }}</span>
            <span v-else-if="slotProps.field === 'version'">{{ K8sVersions[slotProps.data.version] }}</span>
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
import { CloudTypes, CloudTypesMap, CloudStatus, K8sVersions, CloudStatusMap, MessageTypes, StateKeys } from "~/models";

definePageMeta({ layout: "default", title: "Clouds List", public: true });

const { UI, Search } = useAppHelper();
const { clouds, isFetch, fetch } = useCloudService().getClouds();

const search = Search.init(StateKeys.SEARCH_CLOUD, { name: null, type: null, status: null });

const menu = ref();
const selectedItem = ref();
const columns = ref([
  { field: "type", header: "Type", sortable: true },
  { field: "name", header: "Cloud Name", sortable: true },
  { field: "status", header: "Status", sortable: true },
  { field: "nodeCount", header: "Nodes", sortable: true, class: "flex justify-content-end" },
  { field: "version", header: "Version", sortable: true },
  { field: "created", header: "Created", sortable: true },
]);
const selectedColumns = ref(columns.value);
const columnSize = (field) => {
  let size = 0;
  switch (field) {
    case "type":
      size = 5;
      break;
    case "name":
      size = 55;
      break;
    case "status":
      size = 10;
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

UI.tableSettings.initFilters({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  type: { value: null, matchMode: FilterMatchMode.EQUALS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const page = (data) => `/cloud/${data.status == CloudStatus.Saved ? "register/" : ""}${data.id}`;

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

const menus = computed(() => {
  const to = `/cloud/${selectedItem?.value?.id}`;
  const disabled = [true, true];

  if (selectedItem?.value?.status == CloudStatus.Provisioned) {
    if (selectedItem?.value?.type == CloudTypes.Openstack) disabled[0] = false;
    disabled[1] = false;
  }

  return [
    { label: "클러스터 목록", icon: "pi pi-list", to: `${to}/cluster`, disabled: disabled[0], command: () => rowMenuProcessing("1") },
    { separator: true },
    { label: "애플리케이션", icon: "fas fa-shapes", to: `${to}/app`, disabled: disabled[1], command: () => rowMenuProcessing("2") },
    { separator: true },
    { label: "보안검증 결과", icon: "fas fa-shield-halved", to: `${to}/security`, disabled: disabled[1], command: () => rowMenuProcessing("3") },
  ];
});

const onReset = () => {
  Search.reset(search, UI.tableSettings.filters);
};

watch(
  () => [(UI.tableSettings.filters.value as any).type.value, (UI.tableSettings.filters.value as any).status.value, (UI.tableSettings.filters.value as any).name.value],
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

.search-left {
  span:not(:first-child) {
    margin-left: 0.5rem;
  }

  .p-button {
    margin-left: 1rem;
  }
}
.search-right {
  .p-button {
    margin-left: 0.5rem;
  }
}
</style>
