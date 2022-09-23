<template>
  <K3FormContainer class="no-bg">
    <template #header>CLOUD 정보</template>
    <K3FormRow>
      <K3FormColumn label="Cloud 명" label-align="right">
        <K3FormInputField v-model="v$.name" field-name="Name" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
    <K3FormRow>
      <K3FormColumn label="Cloud 유형" label-align="right">
        <K3FormDropdownField v-model="v$.type" :options="CloudTypesMap()" :option-label="'name'" :option-value="'value'" field-name="Type" @change="onTypeChange" class="w-6" />
      </K3FormColumn>
    </K3FormRow>
    <K3FormRow>
      <K3FormColumn label="Cloud 설명" label-align="right">
        <K3FormTextareaField v-model="v$.desc" rows="4" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
  </K3FormContainer>
</template>

<script setup lang="ts">
import { CloudTypesMap, CloudTypes, defaultCloudInfoValidation } from "~/models";

const { UI } = useAppHelper();

const props = defineProps({
  modelValue: { type: Object, required: true },
});
const emits = defineEmits(["visible-change"]);

const v$ = UI.getValidate(defaultCloudInfoValidation, props.modelValue);

const onTypeChange = (event) => {
  let visible = false;
  switch (event.value) {
    case CloudTypes.Openstack:
      visible = true;
  }
  emits("visible-change", { name: "openstack", visible });
};

onMounted(() => {});
</script>

<style scoped lang="scss"></style>
