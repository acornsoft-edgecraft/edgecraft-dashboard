<template>
  <K3FormContainer class="no-bg">
    <template #header>ETCD 설정</template>
    <K3FormRow class="h-3rem">
      <K3FormColumn>
        <K3FormCheckField v-model="v$.use_external_etcd" id="use_external_etcd" label="External ETCD" @input="changeValue" />
      </K3FormColumn>
    </K3FormRow>
    <template v-if="data.use_external_etcd">
      <K3FormRow>
        <K3FormColumn label="Endpoints" label-align="right" :size="12">
          <K3FormContainer class="no-style">
            <K3ValidateEach v-for="(item, index) in data.endpoints" :key="index" :state="item" :rules="defaultEndpointValidation">
              <template #default="{ v }">
                <K3FormRow direction="horizontal" :overflow-wrap="true">
                  <K3FormColumn>
                    <K3FormInputField v-model="v.ip_address" field-name="IP Address" placeholder="IP Address" class="w-17rem align-self-start" />
                    <span>:</span>
                    <K3FormInputField v-model="v.port" field-name="Port" placeholder="Port" class="w-17rem align-self-start" />
                    <K3Button icon="pi pi-plus" v-if="index === 0" @click="addEndpoint" />
                    <K3Button icon="pi pi-minus" v-else @click="removeEndpoint(index)" />
                  </K3FormColumn>
                </K3FormRow>
              </template>
            </K3ValidateEach>
          </K3FormContainer>
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="CA File" label-align="right">
          <K3FormInputField v-model="v$.ca_file" field-name="CA File" class="w-full" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="CERT File" label-align="right">
          <K3FormInputField v-model="v$.cert_file" field-name="CERT File" class="w-full" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="KEY File" label-align="right">
          <K3FormInputField v-model="v$.key_file" field-name="KEY File" class="w-full" />
        </K3FormColumn>
      </K3FormRow>
    </template>
  </K3FormContainer>
</template>

<script setup lang="ts">
import { defaultETCDInfoValidation, defaultEndpointValidation } from "~/models";

const { UI } = useAppHelper();
const props = defineProps({
  modelValue: { type: Object, required: true },
});

const data = ref(props.modelValue);
const v$ = UI.getValidate(defaultETCDInfoValidation, data);

const changeValue = (val) => {
  if (!val) {
    data.value.endpoints = [{ ip_address: "", port: "" }];
    data.value.ca_file = "";
    data.value.cert_file = "";
    data.value.key_file = "";
  }
};

const addEndpoint = () => {
  data.value.endpoints.push(useAppHelper().Util.clone({ ip_address: "", port: "" }));
};
const removeEndpoint = (index) => {
  data.value.endpoints.splice(index, 1);
};
</script>

<style scoped lang="scss">
.form-container.no-style {
  width: 100%;
  box-shadow: none;

  span {
    align-self: flex-start;
    margin: 0.5rem;
  }
  .p-button {
    margin: 0 1rem;
    align-self: flex-start;
  }
}
</style>
