<template>
  <div class="p-card w-full mt-3">
    <K3Panel :header="`${type}Set`">
      <template #icons v-if="type === NodeTypes.WORKER">
        <K3Button icon="pi pi-plus" class="mr-2" @click="addNodeSet" />
      </template>
      <K3ValidateEach v-for="(item, index) in data" :key="index" :state="item" :rules="vRules">
        <template #default="{ v }">
          <K3FormContainer class="no-style iter">
            <K3FormRow>
              <K3FormColumn label="Namespace" label-align="right">
                <K3FormInputField v-model="v.namespace" field-name="Namespace" class="w-full" />
              </K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Node Name" label-align="right">
                <K3FormInputField v-model="v.name" field-name="Node Name" class="w-full" />
              </K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Node Count" label-align="right">
                <K3FormInputNumber v-model="v.node_count" :min="1" field-name="Node Count" input-id="node_count" />
              </K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Flavor" label-align="right">
                <K3FormInputField v-model="v.flavor" field-name="Flavor" class="w-full" />
              </K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Labels" label-align="right">
                <K3FormKeyValueField v-model="v.labels" caption="Labels 설정" />
              </K3FormColumn>
            </K3FormRow>
            <K3FormRow v-if="index > 0 && type === NodeTypes.WORKER">
              <K3FormColumn item-align="right">
                <K3Button icon="pi pi-minus" class="mr-2" @click="removeNodeSet(index)" />
              </K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
        </template>
      </K3ValidateEach>
    </K3Panel>
  </div>
</template>

<script setup lang="ts">
// imports
import useVuelidate from "@vuelidate/core";
import { NodeTypes, defaultNodesetInfoValidation, defaultNodesetInfo } from "~/models";

const { Util } = useAppHelper();

const v = useVuelidate();

// Page meta
// Props
const props = defineProps({
  modelValue: { type: Array<any>, default: [] },
  type: { type: String, default: NodeTypes.MASTER },
});
// Emits
// Properties
const data = reactive(props.modelValue);
const vRules = defaultNodesetInfoValidation;

// Compputed
// Watcher
// Methods
const addNodeSet = () => {
  data.push({ ...Util.clone(defaultNodesetInfo) });
};

const removeNodeSet = (index) => {
  data.splice(index, 1);
};
// Events
onMounted(() => {
  console.log("data", props.type, data.length);
});
// Logics (like api call, etc)
</script>

<style scoped lang="scss">
.iter {
  padding-bottom: 1.5rem;
  // border-bottom: 0.2rem dotted lightskyblue;
  margin-top: 1.5rem;
}
</style>
