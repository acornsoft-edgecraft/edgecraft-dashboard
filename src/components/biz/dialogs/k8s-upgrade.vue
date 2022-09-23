<template>
  <K3Dialog header="Kubernetes Cluster Upgrade" v-model:visible="modelValue.display" :modal="true" :style="{ width: '50vw' }" @hide="onHide">
    <div>
      현재 Kubernetes Cluster Version : <span class="font-medium text-lg">{{ K8sVersions[modelValue.current] }}</span>
    </div>
    <div v-if="upgradable">
      <K3FormContainer class="no-style">
        <K3FormRow>
          <K3FormColumn>
            <div class="font-medium text-lg">업그레이드 할 Kubernetes Cluster Version을 선택하세요.</div>
            <K3FormDropdownField v-model="v.version" :options="versions" :optionLabel="'name'" :optionValue="'value'" field-name="Kubernetes Version" />
          </K3FormColumn>
        </K3FormRow>
      </K3FormContainer>
    </div>
    <div class="font-medium text-lg text-orange-500 mt-3" v-else>업그레이드 가능한 버전이 없습니다.</div>

    <template #footer>
      <template v-if="upgradable">
        <K3Button label="Cancel" icon="pi pi-times" @click="close" class="p-button-text" />
        <K3Button label="Upgrade" icon="pi pi-check" @click="upgrade" autofocus />
      </template>
      <template v-else>
        <K3Button label="Close" icon="pi pi-times" @click="close" class="p-button-text" />
      </template>
    </template>
  </K3Dialog>
</template>

<script setup lang="ts">
import { K8sVersions, K8sVersionMap } from "~/models";

const { UI } = useAppHelper();
const { required } = UI.getValidators();

const props = defineProps({
  modelValue: { type: Object, default: {} },
});
const emits = defineEmits(["close", "upgrade"]);

const v = UI.getValidate({ version: { required } }, ref({ version: "" }));

const upgradable = computed(() => props.modelValue.current < Object.keys(K8sVersions).length / 2);
const versions = computed(() => K8sVersionMap().filter((val) => val.value > props.modelValue.current));

const close = () => {
  emits("close");
};
const upgrade = () => {
  v.value.$touch();

  if (!v.value.$invalid) {
    emits("upgrade", v.value.version.$model);
  }
};
const onHide = () => {
  emits("close");
};

onMounted(() => {});
</script>

<style scoped lang="scss">
.form-container.no-style {
  margin-top: 1rem;
  box-shadow: none;

  .form-column {
    padding: 0.5rem;
  }

  :deep(.p-dropdown) {
    margin-left: 1rem;
    width: 10rem;
  }
}
</style>
