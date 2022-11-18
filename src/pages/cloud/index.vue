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
        dataKey="cloud_uid"
        :autoLayout="true"
        :scrollable="true"
        :scrollHeight="UI.tableSettings.scrollHeight"
        selectionMode="single"
        removableSort
        :rows="UI.tableSettings.rows"
        :first="UI.tableSettings.first"
        :paginator="true"
        :paginatorTemplate="UI.tableSettings.paginatorTemplate"
        :rowsPerPageOptions="UI.tableSettings.rowPerPageOptions"
        :currentPageReportTemplate="UI.tableSettings.pageReportTemplate"
        :loading="isFetch"
        @rowSelect="rowSelected"
        @rowUnselect="rowUnselected"
        @page="onPage"
        stripedRows>
        <template #header>
          <BizCommonSearch :items="searchItems.items" :multiSelect="searchItems.multiSelect" @reset="onReset" @change-value="changeValue" @multiselect-update="toggle">
            <template #search-right>
              <NuxtLink to="/cloud/register">
                <K3Button label="클라우드 등록" />
              </NuxtLink>
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
        <K3Column v-for="(col, index) of selectedColumns" :class="col.class" :field="col.field" :header="col.header" :sortable="col.sortable" :key="`${col.field}_${index}`" :headerStyle="columnSize(col.field)" :bodyStyle="columnSize(col.field)">
          <template #body="slotProps">
            <span v-if="slotProps.field === 'type'">{{ CloudTypes[slotProps.data.type] }} </span>
            <NuxtLink v-else-if="slotProps.field === 'name'" :to="page(slotProps.data)">{{ slotProps.data.name }}</NuxtLink>
            <span v-else-if="slotProps.field === 'status'">{{ CloudStatus[slotProps.data.status] }} </span>
            <span v-else-if="slotProps.field === 'nodeCount'">{{ slotProps.data.nodeCount }}</span>
            <span v-else-if="slotProps.field === 'version'">{{ K8sVersions[slotProps.data.version] }}</span>
            <span v-else-if="slotProps.field === 'created'">{{ Util.getDateLocaleString(slotProps.data.created) }}</span>
            <span v-else>{{ slotProps.data[slotProps.field] }}</span>
          </template>
        </K3Column>
        <K3Column header="Commands" key="cmd" class="flex justify-content-center" headerStyle="min-width: 30px;" bodyStyle="min-width: 30px;">
          <template #body="slotProps">
            <i class="fas fa-ellipsis-v icon-command" @click="showCommand(slotProps.data.cloud_uid, $event)" />
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

const { UI, Util, Search } = useAppHelper();
const { clouds, isFetch, fetch } = useCloudService().getClouds();

const search = Search.init(StateKeys.SEARCH_CLOUD, { name: null, type: null, status: null });

const menu = ref();
const selectedItem = ref();
const columns = ref([
  { field: "type", header: "Type", sortable: true },
  { field: "name", header: "Cloud Name", sortable: true },
  { field: "status", header: "Status", sortable: true },
  { field: "nodeCount", header: "Node Count", sortable: true, class: "flex justify-content-end" },
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
      size = 45;
      break;
    case "status":
      size = 10;
      break;
    case "nodeCount":
    case "version":
      size = 5;
      break;
    case "created":
      size = 15;
      break;
  }

  return `min-width: ${size}%`;
};

UI.tableSettings.initFilters({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  type: { value: null, matchMode: FilterMatchMode.EQUALS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const searchItems = ref({
  items: [
    { type: "dropdown", name: "type", label: "Cloud Type", value: search.value["type"], options: CloudTypesMap(), class: "w-11rem" },
    { type: "text", name: "name", label: "Name", value: search.value["name"] },
    { type: "dropdown", name: "status", label: "Status", value: search.value["status"], options: CloudStatusMap(), class: "w-12rem" },
  ],
  multiSelect: { columns: columns.value, selectedColumns: selectedColumns.value, class: "w-20rem" },
});
const toggle = (val) => {
  selectedColumns.value = columns.value.filter((col) => val.includes(col));
};
const changeValue = (val) => {
  (UI.tableSettings.filters.value as any)[val.name].value = val.value;
};
const onReset = () => {
  Search.reset(search, UI.tableSettings.filters);

  for (const val in searchItems.value.items) {
    searchItems.value.items[val].value = null;
  }
};

const page = (data) => `/cloud/${data.status === CloudStatus.Saved ? "register/" : ""}${data.cloud_uid}`;

const rowSelected = (event) => {
  // TODO: Row selected
};
const rowUnselected = (event) => {
  // TODO: Row unselected
};

const onPage = (event) => {
  UI.tableSettings.first = event.first;
  UI.tableSettings.rows = event.rows;
};

const refresh = () => {
  clouds.value = [];
  fetch();
};

const showCommand = (id, event) => {
  selectedItem.value = clouds.value.find((c) => c.cloud_uid === id);
  menu.value.show(event);
};

const menus = computed(() => {
  const to = `/cloud/${selectedItem?.value?.cloud_uid}`;
  const disabled = [true, true];

  // TODO
  // if (selectedItem?.value?.status === CloudStatus.Saved) {
  //   return [{ label: "클라우드 생성", icon: "pi pi-cloud-upload", command: () => provision(selectedItem.value) }];
  // } else {
  if (selectedItem?.value?.status === CloudStatus.Provisioned) {
    if (selectedItem?.value?.type === CloudTypes.Openstack) disabled[0] = false;
    disabled[1] = false;
  }

  return [{ label: "클러스터 목록", icon: "pi pi-list", to: `${to}/cluster`, disabled: disabled[0] }, { separator: true }, { label: "애플리케이션", icon: "fas fa-shapes", to: `${to}/app`, disabled: disabled[1] }, { separator: true }, { label: "보안검증 결과", icon: "fas fa-shield-halved", to: `${to}/security`, disabled: disabled[1] }];
  // }
});
const provision = (item) => {
  console.log("provision", item);
  refresh();
};

watch(
  () => [(UI.tableSettings.filters.value as any).type.value, (UI.tableSettings.filters.value as any).status.value, (UI.tableSettings.filters.value as any).name.value],
  (val) => {
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

.icon-command {
  width: 10px;
  padding: 0 1.2rem;
}
</style>
