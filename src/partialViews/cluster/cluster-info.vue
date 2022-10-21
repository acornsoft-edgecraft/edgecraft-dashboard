<template>
  <K3FormContainer class="no-bg">
    <template #header>CLUSTER 정보</template>
    <K3FormRow>
      <K3FormColumn label="Cluster 명" label-align="right">
        <K3FormInputField v-model="v$.name" field-name="name" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
    <K3FormRow>
      <K3FormColumn label="Namespace" label-align="right">
        <K3FormInputField v-model="v$.namespace" field-name="namespace" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
    <K3FormRow>
      <K3FormColumn label="Cluster 설명" label-align="right">
        <K3FormTextareaField v-model="v$.desc" rows="4" :auto-resize="true" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
  </K3FormContainer>
</template>

<script setup lang="ts">
// imports
import { defaultClusterInfoValidation } from "~/models/cluster";

const { UI } = useAppHelper();
// Page meta
// Props
const props = defineProps({
  modelValue: { type: Object, required: true },
});
// Emits
// Properties

const v$ = UI.getValidate(defaultClusterInfoValidation, props.modelValue);
// Compputed
// Watcher
// Methods
// Events
// Logics (like api call, etc)
</script>

<style scoped lang="scss"></style>
