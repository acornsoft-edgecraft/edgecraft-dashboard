<template>
  <div calss="p-card">
    <h5 class="form-title">Baremetal 설치 정보</h5>
    <div class="field grid">
      <label class="col-1">BMC Credential</label>
      <div class="col-11">
        <div class="field grid">
          <label for="secret_name" class="col-1">Secret Name</label>
          <div class="col-11">
            <K3InputText id="secret_name" v-model="v$.secret_name.$model" type="text" class="text-base text-color w-full" :class="{ 'p-invalid': v$.secret_name.$invalid }" />
            <small v-if="v$.secret_name.$invalid" class="p-error">{{ v$.secret_name.required.$message.replace("Value", "Secret Name") }}</small>
          </div>
        </div>
        <div class="field grid">
          <label for="user_name" class="col-1">User Name</label>
          <div class="col-11">
            <K3InputText id="user_name" v-model="v$.user_name.$model" type="text" class="text-base text-color w-full" :class="{ 'p-invalid': v$.user_name.$invalid }" />
            <small v-if="v$.user_name.$invalid" class="p-error">{{ v$.user_name.required.$message.replace("Value", "User Name") }}</small>
          </div>
        </div>
        <div class="field grid">
          <label for="pwd" class="col-1">Password</label>
          <div class="col-11">
            <K3InputText id="pwd" v-model="v$.password.$model" type="text" class="text-base text-color w-full" :class="{ 'p-invalid': v$.password.$invalid }" />
            <small v-if="v$.password.$invalid" class="p-error">{{ v$.password.required.$message.replace("Value", "Password") }}</small>
          </div>
        </div>
      </div>
    </div>
    <div class="field grid">
      <label for="image_url" class="col-2">Image URL</label>
      <div class="col-10">
        <K3InputText id="image_url" v-model="v$.image_url.$model" type="text" class="text-base text-color w-full" :class="{ 'p-invalid': v$.image_url.$invalid }" />
        <small v-if="v$.image_url.$invalid" class="p-error">{{ v$.image_url.required.$message.replace("Value", "Image URL") }}</small>
      </div>
    </div>
    <div class="field grid">
      <label for="image_checksum" class="col-2">Image Checksum</label>
      <div class="col-10">
        <K3InputText id="image_checksum" v-model="v$.image_checksum.$model" type="text" class="text-base text-color w-full" :class="{ 'p-invalid': v$.image_checksum.$invalid }" />
        <small v-if="v$.image_checksum.$invalid" class="p-error">{{ v$.image_checksum.required.$message.replace("Value", "Image Checksum") }}</small>
      </div>
    </div>
    <div class="field grid">
      <label for="image_checksum_type" class="col-2">Image Checksum Type</label>
      <div class="col-10">
        <K3Dropdown id="image_checksum_type" v-model="v$.image_checksum_type.$model" :options="ImageChecksumTypesMap()" :optionLabel="'name'" :optionValue="'value'" class="mr-2 w-3" />
        <!-- <K3InputText id="image_checksum_type" v-model="v$.image_checksum_type.$model" type="text" class="text-base text-color w-full" :class="{ 'p-invalid': v$.image_checksum_type.$invalid }" /> -->
        <small v-if="v$.image_checksum_type.$invalid" class="p-error">{{ v$.image_checksum_type.required.$message.replace("Value", "Image Checksum Type") }}</small>
      </div>
    </div>
    <div class="field grid">
      <label for="image_format" class="col-2">Image Format</label>
      <div class="col-10">
        <K3Dropdown id="image_format" v-model="v$.image_format.$model" :options="ImageFormatsMap()" :optionLabel="'name'" :optionValue="'value'" class="mr-2 w-3" />
        <!-- <K3InputText id="image_checksum" v-model="v$.image_checksum.$model" type="text" class="text-base text-color w-full" :class="{ 'p-invalid': v$.image_checksum.$invalid }" /> -->
        <small v-if="v$.image_format.$invalid" class="p-error">{{ v$.image_format.required.$message.replace("Value", "Image Format") }}</small>
      </div>
    </div>
    <div class="field grid">
      <label for="cp_kubeadm_config" class="col-2">Control Plane Kubeadm Extra Config</label>
      <div class="col-10">
        <K3Accordion :multiple="true" v-for="(config, index) in kubeadmConfigs" :key="index">
          <K3AccordionTab :header="config.header">
            <K3Textarea :id="setConfigId('cp', config.id)" v-model="modelValue.cp_kubeadm_extra_config[config.id]" type="text" rows="4" class="text-base text-color surface-overlay border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
          </K3AccordionTab>
        </K3Accordion>
      </div>
    </div>
    <div class="field grid">
      <label for="worker_kubeadm_config" class="col-2">Workers Kubeadm Extra Config</label>
      <div class="col-10">
        <K3Accordion :multiple="true" v-for="(config, index) in kubeadmConfigs" :key="index">
          <K3AccordionTab :header="config.header">
            <K3Textarea :id="setConfigId('worker', config.id)" v-model="modelValue.worker_kubeadm_extra_config[config.id]" type="text" rows="4" class="text-base text-color surface-overlay border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
          </K3AccordionTab>
        </K3Accordion>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { ImageChecksumTypesMap, ImageFormatsMap, defaultBaremetalInfoValidation, baremetalInfo } from "~/models";

const props = defineProps({
  modelValue: { type: Object, required: true },
});

const v$ = useVuelidate(defaultBaremetalInfoValidation, ref(props.modelValue as baremetalInfo));

const kubeadmConfigs = [
  { header: "Pre Kubeadm Commands", id: "pre_kubeadm_commands" },
  { header: "Post Kubeadm Commands", id: "post_kubeadm_commands" },
  { header: "files", id: "files" },
  { header: "users", id: "users" },
  { header: "ntp", id: "ntp" },
  { header: "format", id: "format" },
];

const setConfigId = (prefix, id) => {
  return `${prefix}_${id}`;
};

onMounted(() => {});
</script>

<style scoped lang="scss"></style>
