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
          <div class="flex justify-content-end">
            <NuxtLink :to="`/cloud/${cloudId}/cluster`" class="m-2"><K3Button label="클러스터 목록" icon="pi pi-list" class="p-button-secondary" /></NuxtLink>
          </div>
        </template>
      </K3Card>
      <!-- Backup Block -->
      <K3Card class="mt-2">
        <template #title>Backup</template>
        <template #content>
          <K3FormContainer>
            <K3FormRow>
              <K3FormColumn label="Backup Name">
                <div class="item-container">
                  <div class="form-field">
                    <K3InputText :value="backupParam.name" @input="onInput(backupParam, $event)" @keyup.delete="onKeyUp(backupParam, $event)" @paste="onPaste(backupParam, $event)" autofocus> </K3InputText>
                    <small class="ml-2 text-red-300">영문소문자와 숫자만 가능합니다.</small>
                    <K3Button label="Backup 실행" icon="pi pi-play" class="mx-3" @click="onBackup" />
                  </div>
                  <div class="error-field basic label pointing error" v-if="vb$.$invalid">{{ vb$.name.$errors[0].$message.replace("Value", "Backup Name") }}</div>
                </div>
              </K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
        </template>
      </K3Card>
      <!-- Restore Block -->
      <K3Card class="mt-2">
        <template #title>Restore</template>
        <template #content>
          <K3FormContainer>
            <K3FormRow>
              <K3FormColumn label="Restore Name">
                <div class="item-container">
                  <div class="form-field">
                    <K3InputText :value="restoreParam.name" @input="onInput(restoreParam, $event)" @keyup.delete="onKeyUp(restoreParam, $event)" @paste="onPaste(restoreParam, $event)"> </K3InputText>
                    <small class="ml-2 text-red-300">영문소문자와 숫자만 가능합니다.</small>
                    <K3Button label="Restore 실행" icon="pi pi-play" class="mx-3" @click="onRestore" />
                    <K3Tag style="padding: 0.65rem !important; font-size: 0.95rem" :severity="Util.getSeverity('INFO')">사용할 백업: {{ selectedBackups?.name || "None" }}</K3Tag>
                  </div>
                  <div class="error-field basic label pointing error" v-if="vr$.$invalid">{{ restoreValidations() }}</div>
                </div>
              </K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Backup / Restore List">
                <K3DataTable
                  :value="backresList"
                  v-model:filters="UI.tableSettings.filters.value"
                  v-model:selection="selectedBackups"
                  dataKey="backres_uid"
                  class="w-full"
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
                  :metakeySelection="false"
                  stripedRows
                  @rowSelect="onRowSelected"
                  @page="onPage">
                  <template #header>
                    <BizCommonSearch :items="searchItems.items" @reset="onReset" @change-value="changeValue" @multiselect-update="toggle" @start-dt="setStartDate" @end-dt="setEndDate"> </BizCommonSearch>
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
                      <span v-if="slotProps.field === 'status'" :class="statusMark(slotProps.data.status)">
                        {{ Util.getEnumKeyName(BackResStatus, slotProps.data.status) }}
                      </span>
                      <span v-else-if="slotProps.field === 'type'">
                        {{ Util.getEnumKeyName(BackResType, slotProps.data.type) }}
                      </span>
                      <span v-else-if="slotProps.field === 'created'">
                        {{ Util.getDateLocaleString(slotProps.data.created) }}
                      </span>
                      <span v-else>
                        {{ slotProps.data[slotProps.field] }}
                      </span>
                    </template>
                  </K3Column>
                </K3DataTable>
                <K3Overlay :active="isProcessing" loader="bars" background-color="#830205" />
              </K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
        </template>
      </K3Card>
    </section>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { defaultBackupParamInfo, defaultBackupValidation, defaultRestoreParamInfo, defaultRestoreValidation, MessageTypes, BackResTypeMap, BackResStatus, BackResStatusMap, BootstrapProviders, K8sVersions, CloudStatus, StateKeys, BackResType } from "~/models";

definePageMeta({ layout: "default", title: "클라우드 클러스터 Backup & Restore", public: true });

const { Util, UI, Search } = useAppHelper();
const { cluster, backresList, isFetch, fetch } = useClusterService().getBackResList();
const { isProcessing, execute } = useClusterService().execBackRes();

const route = useRoute();
const cloudId = route.params.cloudId;
const clusterId = route.params.clusterId;
const backupParam = ref(Util.clone(defaultBackupParamInfo));
const restoreParam = ref(Util.clone(defaultRestoreParamInfo));
const vb$ = UI.getValidate(defaultBackupValidation, backupParam);
const vr$ = UI.getValidate(defaultRestoreValidation, restoreParam);
const search = Search.init(StateKeys.SEARCH_CLUSTER_BC, { status: null, type: null, created: { startDate: null, endDate: null } });
const searchItems = ref({
  items: [
    { type: "dropdown", name: "status", label: "작업 상태", options: BackResStatusMap(), value: search.value["status"], class: "w-12rem" },
    { type: "dropdown", name: "type", label: "작업 유형", options: BackResTypeMap(), value: search.value["type"], class: "w-12rem" },
    { type: "calendar-range", name: "created", label: "실행 시각", value: search.value.created },
  ],
});
const columns = ref([
  { field: "name", header: "작업 명칭", sortable: true },
  { field: "type", header: "작업 유형", sortable: true },
  { field: "status", header: "작업 상테", sortable: true },
  { field: "reason", header: "메시지", sortable: true },
  { field: "backup_name", header: "백업 명칭", sortable: true },
  { field: "created", header: "실행 시각", sortable: true },
]);
const selectedColumns = ref(columns.value);
const selectedBackups = ref();

UI.tableSettings.initFilters({
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  type: { value: null, matchMode: FilterMatchMode.EQUALS },
  created: {
    operator: FilterOperator.AND,
    constraints: [
      { value: null, matchMode: FilterMatchMode.DATE_AFTER, name: "startDate" },
      { value: null, matchMode: FilterMatchMode.DATE_BEFORE, name: "endDate" },
    ],
  },
});

const columnSize = (field) => {
  let size = 0;
  switch (field) {
    case "name":
    case "type":
    case "status":
    case "backup_name":
      size = 10;
      break;
    case "created":
      size = 20;
      break;
    case "reason":
      size = 40;
      break;
  }

  return `min-width: ${size}%`;
};
const statusMark = (val) => {
  return val === "R" ? `text-cyan-500` : val === "C" ? "text-yellow-500" : "text-orange-500";
};
const onKeyUp = (item, event) => {
  item.name = event.target.value;
};
const onPaste = (item, event) => {
  const val = event.clipboardData.getData("text/plain");
  if (val !== null) {
    const reg = /[^0-9|^a-z|^A-Z]/g;
    event.target.value = val.replace(reg, "");
    item.name = event.target.value;
    event.preventDefault();
  }
};
const onInput = (item, event) => {
  if (event.data !== null) {
    const reg = /[a-z]|[A-Z]|[0-9]/;
    if (reg.exec(event.data) === null) {
      event.target.value = item.name;
      event.preventDefault();
    } else {
      item.name += event.data;
    }
  }
};
const onBackup = () => {
  vb$.value.$touch();

  if (!vb$.value.$invalid) {
    UI.showConfirm(
      MessageTypes.INFO,
      "클러스터 백업",
      "백업을 실행하시겠습니까?",
      () => onExecute(backupParam, true),
      () => {}
    );
  }
};
const onRestore = () => {
  vr$.value.$touch();

  if (!vr$.value.$invalid) {
    UI.showConfirm(
      MessageTypes.INFO,
      "클러스터 복원",
      "복원을 실행하시겠습니까?",
      () => onExecute(restoreParam, false),
      () => {}
    );
  }
};
const restoreValidations = () => {
  if (vr$.value.name.$invalid) {
    return vr$.value.name.$errors[0].$message.replace("Value", "Restore Name");
  }
  if (vr$.value.backres_uid.$invalid) {
    return "아래의 백업에서 사용할 백업을 선택해야 합니다. (Complete 상태만 가능)";
  }
};
const onExecute = async (item, isBackup) => {
  let result;
  const title = isBackup ? "백업" : "복원";

  try {
    result = await execute(cloudId, clusterId, item, isBackup);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, `${title} 실행`, err);
  }

  if (result.isError) return;
  UI.showToastMessage(MessageTypes.INFO, `${title} 실행`, result.message || `${title} 작업을 요청하였습니다.`);
  refresh();
};
const onPage = (event) => {
  UI.tableSettings.first = event.first;
  UI.tableSettings.rows = event.rows;
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
const toggle = (val) => {
  selectedColumns.value = columns.value.filter((col) => val.includes(col));
};
const changeValue = (val) => {
  (UI.tableSettings.filters.value as any)[val.name].value = val.value;
};
const setStartDate = (event) => {
  (UI.tableSettings.filters.value as any).created.constraints.find((v) => v.matchMode === FilterMatchMode.DATE_AFTER).value = event == null ? null : new Date(event);
};
const setEndDate = (event) => {
  (UI.tableSettings.filters.value as any).created.constraints.find((v) => v.matchMode === FilterMatchMode.DATE_BEFORE).value = event == null ? null : new Date(event);
};
const refresh = () => {
  backresList.value = [];
  fetch(cloudId, clusterId);
};
const onRowSelected = (event) => {
  if (event.data.type === "R") {
    selectedBackups.value = null;
    restoreParam.value.backres_uid = null;
  } else if (event.data.status !== "C") {
    selectedBackups.value = null;
    restoreParam.value.backres_uid = null;
  } else {
    restoreParam.value.backres_uid = event.data.backres_uid;
  }
};

onMounted(() => {
  fetch(cloudId, clusterId);
  Search.get(search, UI.tableSettings.filters);
});
onUnmounted(() => {
  if (!useRouter().currentRoute.value.path.includes(route.path)) {
    Search.destroy(search);
    UI.tableSettings.first = 0;
  }
});
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
