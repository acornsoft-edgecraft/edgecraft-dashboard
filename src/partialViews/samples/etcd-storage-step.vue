<template>
  <div class="m-0 p-0">
    <div>
      <h5 class="form-title">ETCD 설정</h5>
      <div class="field grid">
        <div class="field col-12 field-checkbox">
          <K3Checkbox id="use_external_etcd" v-model="data.etcd.use_external_etcd" :binary="true" class="mr-2" />
          <label for="use_external_etcd" class="pt-1">External ETCD</label>
        </div>
        <div class="field col-12" v-if="data.etcd.use_external_etcd">
          <label class="mt-2">Endpoints</label>
          <K3ValidateEach v-for="(item, index) in data.etcd.endpoints" :key="index" :state="item" :rules="defaultEndpointValidation">
            <template #default="{ v }">
              <div class="flex flex-row" :class="{ 'mt-2': index > 0 }">
                <div class="field">
                  <K3InputText v-model="v.ip_address.$model" type="text" placeholder="IP Address" class="text-base text-color w-full" :class="{ 'p-invalid': v.ip_address.$invalid }" />
                  <small v-if="v.ip_address.$invalid" class="p-error">{{ v.ip_address.required.$message?.replace("Value", "IP Address") }}</small>
                </div>
                <div class="ml-2 mr-2 pt-2">:</div>
                <div class="field">
                  <K3InputText v-model="v.port.$model" type="text" placeholder="Port" class="text-base text-color w-full" :class="{ 'p-invalid': v.port.$invalid }" />
                  <small v-if="v.port.$invalid" class="p-error">{{ v.port.required.$message?.replace("Value", "IP Address") }}</small>
                </div>
                <K3Button icon="pi pi-plus" class="ml-3" v-if="index === 0" @click="addEndpoint" />
                <K3Button icon="pi pi-minus" class="ml-3" v-else @click="removeEndpoint(index)" />
              </div>
            </template>
          </K3ValidateEach>
        </div>
        <div class="field col-12 mt-2" v-if="data.etcd.use_external_etcd">
          <label for="ca_file">CA File</label>
          <K3InputText id="ca_file" v-model="v$.etcd.ca_file.$model" type="text" class="text-base text-color w-full" :class="{ 'p-invalid': v$.etcd.ca_file.$invalid }" />
          <small v-if="v$.etcd.ca_file.$invalid" class="p-error">{{ v$.etcd.ca_file.required.$message?.replace("Value", "CA File") }}</small>
        </div>
        <div class="field col-12 mt-2" v-if="data.etcd.use_external_etcd">
          <label for="cert_file">CERT File</label>
          <K3InputText id="cert_file" v-model="v$.etcd.cert_file.$model" type="text" class="text-base text-color w-full" :class="{ 'p-invalid': v$.etcd.cert_file.$invalid }" />
          <small v-if="v$.etcd.cert_file.$invalid" class="p-error">{{ v$.etcd.cert_file.required.$message?.replace("Value", "Cert File") }}</small>
        </div>
        <div class="field col-12 mt-2" v-if="data.etcd.use_external_etcd">
          <label for="key_file">KEY File</label>
          <K3InputText id="key_file" v-model="v$.etcd.key_file.$model" type="text" class="text-base text-color w-full" :class="{ 'p-invalid': v$.etcd.key_file.$invalid }" />
          <small v-if="v$.etcd.key_file.$invalid" class="p-error">{{ v$.etcd.key_file.required.$message?.replace("Value", "Key File") }}</small>
        </div>
      </div>
    </div>
    <div>
      <h5 class="form-title mt-5">STORAGE Class 설정</h5>
      <div class="field grid">
        <div class="field col-12 field-checkbox">
          <K3Checkbox id="use_ceph" v-model="data.storage_class.use_ceph" :binary="true" class="mr-2" />
          <label for="use_ceph" class="pt-1">Use Ceph</label>
        </div>
        <div class="field col-12 mt-2" v-if="data.storage_class.use_ceph">
          <label for="label1" class="mt-2">Label 1</label>
          <K3InputText id="label1" v-model="v$.storage_class.label1.$model" type="text" class="text-base text-color w-full" :class="{ 'p-invalid': v$.storage_class.label1.$invalid }" />
          <small v-if="v$.storage_class.label1.$invalid" class="p-error">{{ v$.storage_class.label1.required.$message?.replace("Value", "Label1") }}</small>
        </div>
        <div class="field col-12" v-if="data.storage_class.use_ceph">
          <label for="label2" class="mt-2">Label 2</label>
          <K3InputText id="label2" v-model="v$.storage_class.label2.$model" type="text" class="text-base text-color w-full" :class="{ 'p-invalid': v$.storage_class.label2.$invalid }" />
          <small v-if="v$.storage_class.label2.$invalid" class="p-error">{{ v$.storage_class.label2.required.$message?.replace("Value", "Label2") }}</small>
        </div>
        <div class="field col-12" v-if="data.storage_class.use_ceph">
          <label for="label3" class="mt-2">Label 3</label>
          <K3InputText id="label3" v-model="v$.storage_class.label3.$model" type="text" class="text-base text-color w-full" :class="{ 'p-invalid': v$.storage_class.label3.$invalid }" />
          <small v-if="v$.storage_class.label3.$invalid" class="p-error">{{ v$.storage_class.label3.required.$message?.replace("Value", "Label3") }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { defaultEtcdStorageInfoValidataion, defaultEndpointValidation } from "~/models/samples";

const props = defineProps({
  modelValue: { type: Object, required: true },
});
const emits = defineEmits(["can-continue"]);

const data = ref(props.modelValue.etcd_storage);

const v$ = useVuelidate(defaultEtcdStorageInfoValidataion, data);

const addEndpoint = () => {
  data.value.etcd.endpoints.push(useAppHelper().Util.clone({ ip_address: "", port: "" }));
};
const removeEndpoint = (index) => {
  data.value.etcd.endpoints.splice(index, 1);
};

watch(
  () => v$.value,
  (val) => {
    v$.value.$touch(); // 자식의 오류 여부 검증

    console.log(`watch >>> ${val.$invalid}`);
    console.log(`errors >>> ${JSON.stringify(val.$errors)}`);
    if (!val.$invalid) {
      emits("can-continue", { value: true });
    } else {
      emits("can-continue", { value: false });
    }
  }
);

const beforeNextStep = (): boolean => {
  v$.value.$touch();

  console.log(`validation >>> ${JSON.stringify(props.modelValue)}`);
  if (v$.value.$invalid) {
    return false;
  }
  return true;
};

onActivated(() => {
  v$.value.$touch();

  if (!v$.value.$invalid) {
    emits("can-continue", { value: true });
  } else {
    emits("can-continue", { value: false });
  }
});

onMounted(() => {});

defineExpose({ beforeNextStep });
</script>

<style scoped lang="scss"></style>
