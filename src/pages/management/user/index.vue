<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <K3DataTable
        :value="users"
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
        :paginatorTemplate="UI.tableSettings.paginatorTemplate"
        :rowsPerPageOptions="UI.tableSettings.rowPerPageOptions"
        :currentPageReportTemplate="UI.tableSettings.pageReportTemplate"
        :loading="isFetch"
        @page="onPage"
        stripedRows>
        <template #header>
          <BizCommonSearch :items="searchItems.items" :multi-select="searchItems.multiSelect" @reset="onReset" @change-value="changeValue" @multiselect-update="toggle">
            <template #search-right>
              <NuxtLink to="/management/user/register">
                <K3Button label="사용자 등록" icon="pi pi-plus" />
              </NuxtLink>
              <K3Button label="사용자 삭제" icon="pi pi-trash" class="p-button-danger" @click="onDelete" />
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
        <K3Column selection-mode="multiple" header-style="min-width: 5%" body-style="min-width: 5%"></K3Column>
        <K3Column v-for="(col, index) of selectedColumns" :field="col.field" :header="col.header" :key="`${col.field}_index`" :sortable="col.sortable" :headerStyle="columnSize(col.field)" :bodyStyle="columnSize(col.field)">
          <template #body="slotProps">
            <NuxtLink v-if="slotProps.field == 'email'" :to="`/management/user/register/${slotProps.data.id}`">{{ slotProps.data.email }}</NuxtLink>
            <span v-if="slotProps.field == 'name'">{{ slotProps.data.name }}</span>
            <span v-if="slotProps.field == 'role'">{{ UserRoles[slotProps.data.role] }}</span>
            <span v-if="slotProps.field == 'created'">{{ slotProps.data.created }}</span>
          </template>
        </K3Column>
      </K3DataTable>
    </section>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode } from "primevue/api";
import { MessageTypes, StateKeys, UserRoles, UserRolesMap } from "~/models";

definePageMeta({ layout: "default", title: "User Management", public: true });

const { UI, Search } = useAppHelper();
const { users, isFetch, fetch } = useUserService().getUsers();

const search = Search.init(StateKeys.SEARCH_USER, { email: null, name: null, role: null });

const selectedItem = ref();
const columns = ref([
  { field: "email", header: "Email", sortable: true },
  { field: "name", header: "Name", sortable: true },
  { field: "role", header: "Role", sortable: true },
  { field: "created", header: "Created", sortable: true },
]);
const selectedColumns = ref(columns.value);
const columnSize = (field) => {
  let size = 0;
  switch (field) {
    case "email":
      size = 35;
      break;
    case "name":
      size = 30;
      break;
    case "role":
      size = 15;
      break;
    case "created":
      size = 15;
      break;
  }
  return `min-width: ${size}%`;
};

UI.tableSettings.initFilters({
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  role: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const onPage = (event) => {
  UI.tableSettings.first = event.first;
  UI.tableSettings.rows = event.rows;
};

const searchItems = ref({
  items: [
    { type: "text", name: "email", label: "Email", value: search.value["email"] },
    { type: "text", name: "name", label: "Name", value: search.value["name"] },
    { type: "dropdown", name: "role", label: "Role", value: search.value["role"], options: UserRolesMap(), class: "w-10rem" },
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

const onDelete = () => {
  const item = unref(selectedItem.value);
  if (!item) {
    UI.showMessage(MessageTypes.ERROR, "사용자 삭제", "삭제할 사용자를 선택해주세요.");
    return;
  }

  UI.showConfirm(
    MessageTypes.ERROR,
    "사용자 삭제",
    `총 ${item.length} 명의 사용자를 삭제하시겠습니까?`,
    () => {
      // TODO: call api
      const selected = item.map((i) => i.id);
    },
    () => {}
  );
};

watch(
  () => [(UI.tableSettings.filters.value as any).email.value, (UI.tableSettings.filters.value as any).name.value, (UI.tableSettings.filters.value as any).role.value],
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
