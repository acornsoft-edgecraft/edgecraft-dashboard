<template>
  <div class="partial-container m-0 p-0">
    <K3FormContainer>
      <template #header>CLOUD 정보</template>
      <K3FormRow>
        <K3FormColumn label="Cloud 명" label-align="right">
          <K3FormInputField v-model="v$.name" field-name="Name" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Cloud 유형" label-align="right">
          <K3FormDropdownField v-model="v$.type" :options="CloudTypesMap()" :option-label="'name'" :option-value="'value'" field-name="Type" @change="changeCloudType" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Cloud 설명" label-align="right">
          <K3Textarea v-model="modelValue.cloud.desc" rows="4" class="w-full" />
        </K3FormColumn>
      </K3FormRow>
    </K3FormContainer>
  </div>
</template>

<script setup lang="ts">
// imports
import useVuelidate from "@vuelidate/core";
import { CloudTypesMap, cloudInfo, defaultCloudInfo, defaultCloudInfoValidation } from "~/models";

// Page meta
// Props
const props = defineProps({
  modelValue: { type: Object, required: true },
});

// Emits
const emits = defineEmits(["can-continue", "is-openstack"]);

// Properties
// const v$ = useVuelidate(defaultCloudInfoValidation, ref(props.modelValue.cloud as cloudInfo));
const v$ = useAppHelper().UI.getValidate(defaultCloudInfoValidation, ref(props.modelValue.cloud as cloudInfo));

const changeCloudType = (event) => {
  console.log(event);
  if (event.value == 2) {
    emits("is-openstack", { value: true });
  } else {
    emits("is-openstack", { value: false });
  }
};

// Compputed
// Watcher
watch(
  () => v$.value,
  (val) => {
    console.log(`watch >>> ${val.$invalid}`);
    if (!val.$invalid) {
      emits("can-continue", { value: true });
    } else {
      emits("can-continue", { value: false });
    }
  }
);
// Methods
const beforeNextStep = (): boolean => {
  console.log(`beforeNextStep validation >>> ${JSON.stringify(props.modelValue)}`);
  if (v$.value.$invalid) {
    return false;
  }
  return true;
};
// Events

onActivated(() => {
  if (!v$.value.$invalid) {
    emits("can-continue", { value: true });
  } else {
    emits("can-continue", { value: false });
  }
});

defineExpose({ beforeNextStep });
// Logics (like api call, etc)
</script>

<style scoped lang="scss"></style>
