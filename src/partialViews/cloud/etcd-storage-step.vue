<template>
  <div class="partial-container m-0 p-0">
    <K3FormContainer>
      <template #header>ETCD 설정</template>
      <K3FormRow class="h-3rem">
        <K3FormColumn>
          <K3FormCheckField v-model="v$.etcd.use_external_etcd" id="use_external_etcd" label="External ETCD" />
        </K3FormColumn>
      </K3FormRow>
      <template v-if="data.etcd.use_external_etcd">
        <K3FormRow>
          <K3FormColumn label="Endpoints" label-align="right" :size="12">
            <K3FormContainer class="no-style">
              <K3ValidateEach v-for="(item, index) in data.etcd.endpoints" :key="index" :state="item" :rules="defaultEndpointValidation">
                <template #default="{ v }">
                  <K3FormRow direction="horizontal" :overflow-wrap="true">
                    <K3FormColumn>
                      <K3FormInputField v-model="v.ip_address" field-name="IP Address" placeholder="IP Address" />
                      <span class="mx-2">:</span>
                      <K3FormInputField v-model="v.port" field-name="Port" placeholder="Port" />
                      <K3Button icon="pi pi-plus" class="ml-3" v-if="index === 0" @click="addEndpoint" />
                      <K3Button icon="pi pi-minus" class="ml-3" v-else @click="removeEndpoint(index)" />
                    </K3FormColumn>
                  </K3FormRow>
                </template>
              </K3ValidateEach>
            </K3FormContainer>
          </K3FormColumn>
        </K3FormRow>
        <K3FormRow>
          <K3FormColumn label="CA File" label-align="right">
            <K3FormInputField v-model="v$.etcd.ca_file" field-name="CA File" class="w-full" />
          </K3FormColumn>
        </K3FormRow>
        <K3FormRow>
          <K3FormColumn label="CERT File" label-align="right">
            <K3FormInputField v-model="v$.etcd.cert_file" field-name="CERT File" class="w-full" />
          </K3FormColumn>
        </K3FormRow>
        <K3FormRow>
          <K3FormColumn label="KEY File" label-align="right">
            <K3FormInputField v-model="v$.etcd.key_file" field-name="KEY File" class="w-full" />
          </K3FormColumn>
        </K3FormRow>
      </template>
    </K3FormContainer>
    <K3FormContainer>
      <template #header>STORAGE Class 설정</template>
      <K3FormRow class="h-3rem">
        <K3FormColumn>
          <K3FormCheckField v-model="v$.storage_class.use_ceph" id="use_ceph" label="Use Ceph" />
        </K3FormColumn>
      </K3FormRow>
      <template v-if="data.storage_class.use_ceph">
        <K3FormRow>
          <K3FormColumn label="Label 1" label-align="right">
            <K3FormInputField v-model="v$.storage_class.label1" field-name="Label1" class="w-full" />
          </K3FormColumn>
        </K3FormRow>
        <K3FormRow>
          <K3FormColumn label="Label 2" label-align="right">
            <K3FormInputField v-model="v$.storage_class.label2" field-name="Label2" class="w-full" />
          </K3FormColumn>
        </K3FormRow>
        <K3FormRow>
          <K3FormColumn label="Label 3" label-align="right">
            <K3FormInputField v-model="v$.storage_class.label3" field-name="Label3" class="w-full" />
          </K3FormColumn>
        </K3FormRow>
      </template>
    </K3FormContainer>

    <!-- 
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
      </div> -->
  </div>
</template>

<script setup lang="ts">
import { defaultEtcdStorageInfoValidataion, defaultEndpointValidation } from "~/models";

const props = defineProps({
  modelValue: { type: Object, required: true },
});
const emits = defineEmits(["can-continue"]);

const data = ref(props.modelValue.etcd_storage);

const v$ = useAppHelper().UI.getValidate(defaultEtcdStorageInfoValidataion, data);

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
