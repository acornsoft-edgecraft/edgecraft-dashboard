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
            <K3FormDropdownField v-model="v.version" :options="versions" :optionLabel="'name'" :optionValue="'value'" field-name="Kubernetes Version" @change="onVersionChange" />
          </K3FormColumn>
        </K3FormRow>
        <K3FormRow>
          <K3FormColumn>
            <div class="font-medium text-lg">업그레이드에 사용할 이미지 명: </div>
            <K3FormInputField class="w-6 ml-2" v-model="v.image" field-name="Image Name" />
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
import { K8sVersions, K8sVersionMap, defaultUpgradeInfo, defaultUpgradeInfoValidation, BootstrapProviders } from "~/models";

const { UI, Util } = useAppHelper();

const props = defineProps({
  modelValue: { type: Object, default: {} },
});
const emits = defineEmits(["close", "upgrade"]);

const upgradeVal = ref(Util.clone(defaultUpgradeInfo));

const v = UI.getValidate(defaultUpgradeInfoValidation, upgradeVal);

const versions = computed(() => K8sVersionMap(false, props.modelValue.bootstrap_provider).filter((val) => val.value > props.modelValue.current));
const upgradable = computed(() => props.modelValue.bootstrap_provider === BootstrapProviders.Kubeadm && versions.value.length > 0);

const close = () => {
  emits("close");
};
const upgrade = () => {
  v.value.$touch();

  if (!v.value.$invalid) {
    emits("upgrade", upgradeVal.value);
  }
};
const onHide = () => {
  emits("close");
};

const onVersionChange = (item) => {
  upgradeVal.value.image = "edgecraft-kube-v" + K8sVersions[item.value];
}
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
