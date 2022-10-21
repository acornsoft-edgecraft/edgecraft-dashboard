<template>
  <K3FormContainer class="no-bg">
    <template #header>STORAGE Class 설정</template>
    <K3FormRow class="h-3rem">
      <K3FormColumn>
        <K3FormCheckField v-model="v$.use_ceph" id="use_ceph" label="Use Ceph" @input="changeValue" />
      </K3FormColumn>
    </K3FormRow>
    <template v-if="data.use_ceph">
      <K3FormRow>
        <K3FormColumn label="Label 1" label-align="right">
          <K3FormInputField v-model="v$.label1" field-name="Label1" class="w-full" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Label 2" label-align="right">
          <K3FormInputField v-model="v$.label2" field-name="Label2" class="w-full" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Label 3" label-align="right">
          <K3FormInputField v-model="v$.label3" field-name="Label3" class="w-full" />
        </K3FormColumn>
      </K3FormRow>
    </template>
  </K3FormContainer>
</template>

<script setup lang="ts">
import { defaultStorageClassInfoValidation } from "~/models";

const { UI } = useAppHelper();
const props = defineProps({
  modelValue: { type: Object, required: true },
});

const data = ref(props.modelValue);
const v$ = UI.getValidate(defaultStorageClassInfoValidation, data);

const changeValue = (val) => {
  if (!val) {
    data.value.label1 = "";
    data.value.label2 = "";
    data.value.label3 = "";
  }
};
</script>

<style scoped lang="scss"></style>
