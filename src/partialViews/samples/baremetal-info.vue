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
  </div>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { defaultSecretInfoValidation, secretInfo } from "~/models/samples";

const props = defineProps({
  modelValue: { type: Object, required: true },
});

const v$ = useVuelidate(defaultSecretInfoValidation, ref(props.modelValue as secretInfo));

onMounted(() => {});
</script>

<style scoped lang="scss"></style>
