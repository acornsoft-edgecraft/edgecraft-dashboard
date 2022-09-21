<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <K3DataTable
        :value="clusters"
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
              <span>Status: </span>
              <K3Dropdown v-model="selectedStatus" :options="CloudStatusMap(true)" :optionLabel="'name'" :optionValue="'value'" @change="statusSelected" class="w-10rem" />
              <span>Cluster Name: </span>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <K3InputText class="flex" v-model="(UI.tableSettings.filters.value as any).name.value" placeholder="Search" autofocus />
              </span>
            </div>
            <div class="search-right toggle flex align-content-center">
              <K3MultiSelect :modelValue="selectedColumns" class="flex w-20rem" :options="columns" optionLabel="header" @update:modelValue="toggle" placeholder="Select Columns" />
              <NuxtLink :to="`/cloud/${cloudId}/cluster/register`">
                <K3Button label="클러스터 등록"></K3Button>
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
        <K3Column v-for="(col, index) of selectedColumns" :field="col.field" :header="col.header" :key="`${col.field}_index`" :class="col.class" :headerStyle="columnSize(col.field)" :bodyStyle="columnSize(col.field)">
          <template #body="slotProps">
            <NuxtLink v-if="slotProps.field == 'name'" :to="goPage(slotProps.data)">{{ slotProps.data.name }}</NuxtLink>
            <span v-if="slotProps.field == 'status'">{{ CloudStatus[slotProps.data.status] }}</span>
            <span v-if="slotProps.field == 'nodeCount'">{{ slotProps.data.nodeCount }}</span>
            <span v-if="slotProps.field == 'version'">{{ slotProps.data.version }}</span>
            <span v-if="slotProps.field == 'created'">{{ slotProps.data.created }}</span>
          </template>
        </K3Column>
        <K3Column header="Commands" key="cmd" class="flex justify-content-center" headerStyle="min-width: 30px" bodyStyle="min-width:30px">
          <template #body="slotProps">
            <i class="fas fa-ellipsis-v" style="width: 10px" @click="showCommand(slotProps.data.id, $event)"></i>
          </template>
        </K3Column>
      </K3DataTable>
      <K3ContextMenu ref="menu" :model="menus" />
      <div class="flex justify-content-end mt-3">
        <NuxtLink to="/cloud">
          <K3Button label="클라우드 목록" class="p-button-secondary" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// imports
import { FilterMatchMode } from "primevue/api";
import { CloudStatus, CloudStatusMap } from "~/models";
// Page meta
definePageMeta({ layout: "default", title: "클라우드 클러스터", public: true });
// Props
// const props = defineProps({}),
// Emits
// const emits = defineEmits(['eventname']),
// Properties
const { UI } = useAppHelper();
const { clusters, isFetch, fetch } = useClusterService().getClusters();
const route = useRoute();
const cloudId = route.params.cloudId;

UI.tableSettings.initFilters({
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
// Compputed
// Watcher
// Methods
const menu = ref();
const selectedItem = ref();
const selectedStatus = ref(0);
const columns = ref([
  { field: "name", header: "Cluster Name", sortable: true },
  { field: "status", header: "Status", sortable: true },
  { field: "nodeCount", header: "Nodes", sortable: true, class: "flex justify-content-end" },
  { field: "version", header: "Version", sortable: true },
  { field: "created", header: "Created", sortable: true },
]);
const selectedColumns = ref(columns.value);

const columnSize = (field) => {
  let size = 0;
  switch (field) {
    case "name":
      size = 50;
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

const statusSelected = (event) => {
  if (event.value == 0) event.value = null;
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
  selectedItem.value = clusters.value.find((c) => c.id === id);
  menu.value.show(event);
};

const goPage = (data) => {
  const page = data.status == CloudStatus.Saved ? "register/" : "";
  return `/cloud/${cloudId}/cluster/${page}${data.id}`;
};

const menus = computed(() => {
  const to = `/cloud/${cloudId}/cluster/${selectedItem?.value?.id}`;
  const disabled = !(selectedItem?.value?.status == CloudStatus.Provisioned);

  return [{ label: "애플리케이션", icon: "fas fa-shapes", to: `${to}/app`, disabled: disabled }, { separator: true }, { label: "보안검증 결과", icon: "fas fa-shield-halved", to: `${to}/security`, disabled: disabled }];
});

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
