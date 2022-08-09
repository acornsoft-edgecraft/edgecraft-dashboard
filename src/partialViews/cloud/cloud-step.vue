<template>
  <div class="partial-container m-0 p-0">
    <div calss="p-card">
      <h5 class="form-title">CLOUD 정보</h5>
      <div class="field grid">
        <label for="cloudname" class="col-1">Cloud 명</label>
        <div class="col-11">
          <K3InputText id="cloudname" v-model="v$.name.$model" type="text" autofocus class="text-base text-color w-full" />
          <small v-if="v$.name.$invalid" class="p-error">{{ v$.name.required.$message.replace("Value", "Name") }}</small>
        </div>
      </div>
      <div class="field grid">
        <label for="cloudtype" class="col-1">Cloud 유형</label>
        <div class="col-11">
          <K3Dropdown id="cloudtype" v-model="v$.type.$model" type="text" :options="CloudTypesMap()" :optionLabel="'name'" :optionValue="'value'" class="mr-2 w-2" @change="changeCloudType" />
          <small v-if="v$.type.$invalid" class="p-error">{{ v$.type.required.$message?.replace("Value", "Type") }}</small>
        </div>
      </div>
      <div class="field grid">
        <label for="clouddesc" class="col-1">Cloud 설명</label>
        <div class="col-11">
          <K3Textarea id="clouddesc" v-model="modelValue.cloud.desc" type="text" rows="4" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
          <!-- <small v-if="v$.desc.$invalid" class="p-error">{{ v$.desc.required?.$message?.replace("Value", "Desc") }}</small> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import useVuelidate from "@vuelidate/core";
import { CloudTypesMap, cloudInfo, defaultCloudInfoValidation } from "~/models";

// Page meta
// Props
const props = defineProps({
  modelValue: { type: Object, required: true },
});

// Emits
const emits = defineEmits(["can-continue", "is-openstack"]);

// Properties
const v$ = useVuelidate(defaultCloudInfoValidation, ref(props.modelValue.cloud as cloudInfo));

const changeCloudType = (event) => {
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
