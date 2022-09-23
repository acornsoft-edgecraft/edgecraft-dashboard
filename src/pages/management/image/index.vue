<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <K3DataTable
        :value="images"
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
              <span>Name: </span>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <K3InputText class="flex" v-model="(UI.tableSettings.filters.value as any).name.value" placeholder="Search" autofocus />
              </span>
              <span>Type: </span>
              <K3Dropdown v-model="selectedType" :options="ImageTypesMap(true)" :optionLabel="'name'" :optionValue="'value'" @change="typeSelected" class="w-12rem" />
              <span>OS: </span>
              <K3Dropdown v-model="selectedOs" :options="ImageOsTypesMap(true)" :optionLabel="'name'" :optionValue="'value'" @change="osSelected" class="w-10rem" />
            </div>
            <div class="search-right toggle flex align-content-center">
              <K3MultiSelect :modelValue="selectedColumns" class="flex" :options="columns" optionLabel="header" @update:modelValue="toggle" placeholder="Select Columns" style="width: 20em" />
              <NuxtLink to="/management/image/register">
                <K3Button label="이미지 등록" />
              </NuxtLink>
              <K3Button label="이미지 삭제" class="p-button-danger" @click="onDelete" />
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
            <NuxtLink v-if="slotProps.field == 'name'" :to="`/management/image/register/${slotProps.data.id}`">{{ slotProps.data.name }}</NuxtLink>
            <span v-if="slotProps.field == 'type'">{{ ImageTypes[slotProps.data.type] }}</span>
            <span v-if="slotProps.field == 'format'">{{ ImageFormats[slotProps.data.format] }}</span>
            <span v-if="slotProps.field == 'size'">{{ slotProps.data.size }}</span>
            <span v-if="slotProps.field == 'os'">{{ ImageOsTypes[slotProps.data.os] }}</span>
            <span v-if="slotProps.field == 'created'">{{ slotProps.data.created }}</span>
          </template>
        </K3Column>
      </K3DataTable>
    </section>
  </div>
</template>

<script setup lang="ts">
import { FilterMatchMode } from "primevue/api";
import { ImageTypes, ImageOsTypes, ImageFormats, ImageTypesMap, ImageOsTypesMap, MessageTypes } from "~/models";

definePageMeta({ layout: "default", title: "Image Management", public: true });
// const props = defineProps({}),
// const emits = defineEmits(['eventname']),

const { UI } = useAppHelper();
const { images, isFetch, fetch } = useImageService().getImages();

const selectedItem = ref();
const selectedType = ref(0);
const selectedOs = ref(0);
const columns = ref([
  { field: "name", header: "Name", sortable: true },
  { field: "type", header: "Type", sortable: true },
  { field: "format", header: "Format", sortable: true },
  { field: "size", header: "Size", sortable: true },
  { field: "os", header: "OS", sortable: true },
  { field: "created", header: "Created", sortable: true },
]);
const selectedColumns = ref(columns.value);
const columnSize = (field) => {
  let size = 0;
  switch (field) {
    case "name":
      size = 30;
      break;
    case "type":
      size = 16;
      break;
    case "format":
      size = 12;
      break;
    case "size":
      size = 12;
      break;
    case "os":
      size = 12;
      break;
    case "created":
      size = 13;
      break;
  }
  return `min-width: ${size}%`;
};

UI.tableSettings.initFilters({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  type: { value: null, matchMode: FilterMatchMode.EQUALS },
  os: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const typeSelected = (event) => {
  if (event.value == 0) event.value = null;
  (UI.tableSettings.filters.value as any).type.value = event.value;
};

const osSelected = (event) => {
  if (event.value == 0) event.value = null;
  (UI.tableSettings.filters.value as any).os.value = event.value;
};

const toggle = (val) => {
  selectedColumns.value = columns.value.filter((col) => val.includes(col));
};

const onDelete = () => {
  const item = unref(selectedItem.value);
  if (!item) {
    UI.showMessage(MessageTypes.ERROR, "이미지 삭제", "삭제할 이미지를 선택해주세요.");
    return;
  }

  UI.showConfirm(
    MessageTypes.ERROR,
    "이미지 삭제",
    `총 ${item.length} 개의 이미지를 삭제하시겠습니까?`,
    () => {
      // TODO: call api
      const selected = item.map((i) => i.id);
    },
    () => {}
  );
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
