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
        dataKey="cluster_uid"
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
              <NuxtLink :to="`/cloud/register`">
                <K3Button label="클라우드 등록" icon="pi pi-plus"></K3Button>
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
        <K3Column v-for="(col, index) of selectedColumns" :field="col.field" :header="col.header" :key="`${col.field}_${index}`" :class="col.class" :sortable="col.sortable" :headerStyle="columnSize(col.field)" :bodyStyle="columnSize(col.field)">
          <template #body="slotProps">
            <NuxtLink v-if="slotProps.field == 'name'" :to="page(slotProps.data)">{{ slotProps.data.name }}</NuxtLink>
            <span v-if="slotProps.field == 'bootstrap_provider'">{{ BootstrapProviders[slotProps.data.bootstrap_provider] }}</span>
            <span v-if="slotProps.field == 'version'">{{ K8sVersions[slotProps.data.version] }}</span>
            <span v-if="slotProps.field == 'status'">{{ CloudStatus[slotProps.data.status] }}</span>
            <span v-if="slotProps.field == 'node_count'">{{ slotProps.data.node_count }}</span>
            <span v-if="slotProps.field == 'created'">{{ Util.getDateLocaleString(slotProps.data.created) }}</span>
          </template>
        </K3Column>
        <K3Column header="Commands" key="cmd" class="flex justify-content-center" headerStyle="min-width: 30px" bodyStyle="min-width:30px">
          <template #body="slotProps">
            <i class="fas fa-ellipsis-v icon-command" @click="showCommand(slotProps.data.cluster_uid, $event)" />
          </template>
        </K3Column>
      </K3DataTable>
      <K3ContextMenu ref="menu" :model="menus" />
      <K3Overlay :active="isProFetch" loader="bars" background-color="#830205" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode } from "primevue/api";
import { MessageTypes, CloudStatus, CloudStatusMap, BootstrapProviderMap, BootstrapProviders, K8sVersions, StateKeys } from "~/models";

definePageMeta({ layout: "default", title: "엣지 클라우드", public: true });

const { UI, Util, Search } = useAppHelper();
const { clusters, isFetch, fetch } = useClusterService().getClusters();
const { isProFetch, proFetch } = useClusterService().provisionCluster();
const { isDelFetch, delFetch } = useClusterService().deleteCluster();

const search = Search.init(StateKeys.SEARCH_CLUSTER, { status: null, name: null, bootstrap_provider: null });
const route = useRoute();
const cloudId = UI.cloudId;

const menu = ref();
const selectedItem = ref();
const columns = ref([
  { field: "bootstrap_provider", header: "Bootstrap Provider", sortable: true },
  { field: "name", header: "Cloud Name", sortable: true },
  { field: "version", header: "Version", sortable: true },
  { field: "status", header: "Status", sortable: true },
  { field: "node_count", header: "Node Count", sortable: true, class: "flex justify-content-end" },
  { field: "created", header: "Created", sortable: true },
]);
const selectedColumns = ref(columns.value);
const columnSize = (field) => {
  let size = 0;
  switch (field) {
    case "name":
      size = 32;
      break;
    case "status":
      size = 10;
      break;
    case "node_count":
      size = 7;
      break;
    case "version":
      size = 10;
      break;
    case "created":
    case "bootstrap_provider":
      size = 15;
      break;
  }

  return `min-width: ${size}%`;
};
UI.tableSettings.initFilters({
  bootstrap_provider: { value: null, matchMode: FilterMatchMode.EQUALS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const searchItems = ref({
  items: [
    { type: "dropdown", name: "bootstrap_provider", label: "Bootstrap Provider", value: search.value["bootstrap_provider"], options: BootstrapProviderMap(), class: "w-10rem" },
    { type: "text", name: "name", label: "Cloud Name", value: search.value["name"] },
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

const page = (data) => `/cloud/${data.status === CloudStatus.Saved ? "register/" : ""}${data.cluster_uid}`;

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
  clusters.value = [];
  fetch(cloudId);
};

const showCommand = (id, event) => {
  selectedItem.value = clusters.value.find((c) => c.cluster_uid === id);
  menu.value.show(event);
};

const menus = computed(() => {
  const to = `/cloud/${selectedItem?.value?.cluster_uid}`;

  if (selectedItem?.value?.status === CloudStatus.Saved) {
    return [{ label: "클라우드 생성", icon: "pi pi-cloud-upload", command: () => provision(selectedItem.value) }];
  } else if (selectedItem?.value?.status === CloudStatus.Deleted) {
    return [{ label: "클라우드 삭제", icon: "pi pi-trash", command: () => del(selectedItem.value) }];
  } else {
    const disabled = !(selectedItem?.value?.status === CloudStatus.Provisioned);

    return [{ label: "CIS Benchmarks", icon: "fas fa-shield-halved", to: `${to}/benchmarks`, disabled: disabled }, { separator: true }, { label: "Backup & Restore", icon: "fas fa-arrows-rotate", to: `${to}/backres`, disabled: disabled }];
  }
});

const provision = (item) => {
  UI.showConfirm(
    MessageTypes.INFO,
    "클라우드 생성",
    "클라우드를 생성하시겠습니까?",
    () => onProvision(item),
    () => {}
  );
};
const onProvision = async (item) => {
  let result;
  try {
    result = await proFetch(item.cloud_uid, item.cluster_uid);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, "클라우드 생성", err);
  }
  if (result.isError) return;

  UI.showToastMessage(MessageTypes.INFO, "클라우드 생성", result.message || "클라우드를 생성 요청하였습니다.");
  refresh();
};

const del = (item) => {
  UI.showConfirm(
    MessageTypes.ERROR,
    "클라우드 삭제",
    "클라우드를 삭제하시겠습니까? 저장된 데이터가 모두 삭제됩니다.",
    () => onDelete(item),
    () => {}
  );
};
const onDelete = async (item) => {
  let result;
  try {
    result = await delFetch(item.cloud_uid, item.cluster_uid);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, "클라우드 삭제", err);
  }
  if (result.isError) return;

  UI.showToastMessage(MessageTypes.INFO, "클라우드 삭제", result.message || "클라우드를 삭제하였습니다.");
  refresh();
};

watch(
  () => [(UI.tableSettings.filters.value as any).name.value, (UI.tableSettings.filters.value as any).status.value, (UI.tableSettings.filters.value as any).bootstrap_provider.value],
  () => {
    console.log(search)
    Search.set(search, UI.tableSettings.filters);
  }
);

onMounted(() => {
  fetch(cloudId);

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
