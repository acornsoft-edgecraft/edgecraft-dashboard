<template>
  <div class="partial-container m-0 p-0">
    <K3FormContainer class="no-bg">
      <template #header>Baremetal 설치 정보</template>
      <K3FormRow>
        <K3FormColumn label="namespace" label-align="right">
          <K3FormInputField v-model="v$.namespace" field-name="namespace" class="w-6" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="BMC Credential" label-align="right">
          <K3FormContainer class="no-style w-full">
            <K3FormRow direction="vertical">
              <K3FormColumn label="Secret Name" label-align="right">
                <K3FormInputField v-model="v$.secret_name" field-name="Secret Name" class="w-7" />
              </K3FormColumn>
              <K3FormColumn label="User Name" label-align="right">
                <K3FormInputField v-model="v$.user_name" field-name="User Name" class="w-7" />
              </K3FormColumn>
              <K3FormColumn label="Password" label-align="right">
                <K3FormInputField v-model="v$.password" field-name="Password" class="w-7" />
              </K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Image URL" label-align="right">
          <K3FormInputField v-model="v$.image_url" field-name="Image URL" class="w-9" placeholder="예) http://192.168.0.1/ubuntu.qcow2" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Image Checksum" label-align="right">
          <K3FormInputField v-model="v$.image_checksum" field-name="Image Checksum" class="w-9" placeholder="예) http://192.168.0.1/ubuntu.qcow2.md5sum" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Image Checksum Type" label-align="right">
          <K3FormDropdownField v-model="v$.image_checksum_type" field-name="Image Checksum Type" :options="ImageChecksumTypesMap()" class="w-6" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Image Format" label-align="right">
          <K3FormDropdownField v-model="v$.image_format" field-name="Image Format" :options="ImageFormatsMap()" class="w-6" />
        </K3FormColumn>
      </K3FormRow>
    </K3FormContainer>
  </div>
</template>

<script setup lang="ts">
import { ImageChecksumTypesMap, ImageFormatsMap, defaultBaremetalInfoValidation, baremetalInfo } from "~/models";

const props = defineProps({
  modelValue: { type: Object, required: true },
});

const v$ = useAppHelper().UI.getValidate(defaultBaremetalInfoValidation, ref(props.modelValue as baremetalInfo));
</script>

<style scoped lang="scss">
.form-container.no-style {
  box-shadow: none;
}
</style>
