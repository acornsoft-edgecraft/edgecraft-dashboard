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
        :paginator="true"
        :paginatorTemplate="UI.tableSettings.paginatorTemplate"
        :rowsPerPageOptions="UI.tableSettings.rowPerPageOptions"
        :currentPageReportTemplate="UI.tableSettings.pageReportTemplate"
        :loading="isFetch"
        stripedRows>
        <template #header>
          <div class="header flex justify-content-between">
            <div class="search-left">
              <span>Email: </span>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <K3InputText class="flex" v-model="(UI.tableSettings.filters.value as any).email.value" placeholder="Search" />
              </span>
              <span>Name: </span>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <K3InputText class="flex" v-model="(UI.tableSettings.filters.value as any).name.value" placeholder="Search" />
              </span>
              <span>Role: </span>
              <K3Dropdown v-model="(UI.tableSettings.filters.value as any).role.value" :options="UserRolesMap()" :optionLabel="'name'" :optionValue="'value'" @change="userRoleSelected" placeholder="선택" :showClear="true" class="w-10rem" />
              <K3Button label="초기화" class="p-button-outlined p-button-plain" @click="onReset" />
            </div>
            <div class="search-right toggle flex align-content-center">
              <K3MultiSelect :modelValue="selectedColumns" class="flex w-18rem" :options="columns" optionLabel="header" @update:modelValue="toggle" placeholder="Select Columns" />
              <NuxtLink to="/management/user/register">
                <K3Button label="사용자 등록" />
              </NuxtLink>
              <K3Button label="사용자 삭제" class="p-button-danger" @click="onDelete" />
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
        <K3Column selection-mode="multiple" header-style="min-width: 5%" body-style="min-width: 5%"></K3Column>
        <K3Column v-for="(col, index) of selectedColumns" :field="col.field" :header="col.header" :key="`${col.field}_index`" :sortable="col.sortable" :headerStyle="columnSize(col.field)" :bodyStyle="columnSize(col.field)">
          <template #body="slotProps">
            <NuxtLink v-if="slotProps.field == 'email'" :to="`/management/user/register/${slotProps.data.id}`" @click="goList()">{{ slotProps.data.email }}</NuxtLink>
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
// const props = defineProps({}),
// const emits = defineEmits(['eventname']),
const { UI, State } = useAppHelper();
const { users, isFetch, fetch } = useUserService().getUsers();

const defaultSearch = { email: null, name: null, role: null };
const search = State.state(StateKeys.SEARCH, () => defaultSearch);

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

const userRoleSelected = (event) => {
  (UI.tableSettings.filters.value as any).role.value = event.value;
};

const toggle = (val) => {
  selectedColumns.value = columns.value.filter((col) => val.includes(col));
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

const goList = () => {
  for (const val in UI.tableSettings.filters.value) {
    if (val === "global") continue;
    Object.assign(search.value, { [val]: UI.tableSettings.filters.value[val].value });
  }
};
const onReset = () => {
  for (const val in UI.tableSettings.filters.value) {
    UI.tableSettings.filters.value[val].value = null;
  }
  search.value = defaultSearch;
};

onMounted(() => {
  fetch();

  for (const val in search.value) {
    (UI.tableSettings.filters.value as any)[val].value = search.value[val];
  }
});

onUnmounted(() => {
  if (!useRouter().currentRoute.value.path.includes(useRoute().path)) {
    search.value = undefined;
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
