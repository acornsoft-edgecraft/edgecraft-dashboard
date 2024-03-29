<template>
  <div class="p-card w-full mt-3">
    <K3Panel :header="`${NodeTypes[type]}Set`">
      <template #icons v-if="type === NodeTypes.Worker">
        <K3Button icon="pi pi-plus" class="mr-2" @click="addNodeSet" />
      </template>
      <K3ValidateEach v-for="(item, index) in data" :key="index" :state="item" :rules="vRules(type)">
        <template #default="{ v }">
          <K3FormContainer class="no-style">
            <K3FormRow>
              <K3FormColumn label="Name" label-align="right">
                <K3FormInputField v-model="v.name" field-name="Name" class="w-full" />
              </K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Node Count" label-align="right">
                <K3FormInputNumber v-model="v.node_count" :min="1" field-name="Node Count" input-id="node_count" />
                <div class="ml-3 text-red-300" v-if="type === NodeTypes.Master">{{ masterSetNodeCountWarning }}</div>
              </K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Flavor" label-align="right">
                <K3FormInputField v-model="v.flavor" field-name="Flavor" class="w-full" />
              </K3FormColumn>
            </K3FormRow>
            <!-- <K3FormRow>
              <K3FormColumn label="Labels" label-align="right">
                <K3FormKeyValueField v-model="v.labels" caption="Labels 설정" />
              </K3FormColumn>
            </K3FormRow> -->
            <K3FormRow v-if="index > 0 && type === NodeTypes.Worker" class="no-bg-row">
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
import useVuelidate from "@vuelidate/core";
import { NodeTypes, BootstrapProviders, defaultNodesetInfoValidation, defaultNodesetInfo } from "~/models";

const { Util } = useAppHelper();

const v = useVuelidate();

const props = defineProps({
  modelValue: { type: Array<any>, default: [] },
  type: { type: Number, default: NodeTypes.Master },
  bootstrapProvider: { type: Number, default: BootstrapProviders.Kubeadm },
});

const data = reactive(props.modelValue);
const vRules = (type) => defaultNodesetInfoValidation(type);
const masterSetNodeCountWarning = computed(() => (props.type === NodeTypes.Master && props.bootstrapProvider !== BootstrapProviders.Kubeadm ? `${BootstrapProviders[props.bootstrapProvider]} 부트스트랩에서는 생성 후 노드 수를 조정할 수 없습니다.` : ''));

const addNodeSet = () => {
  data.push({ ...Util.clone(defaultNodesetInfo) });
};

const removeNodeSet = (index) => {
  data.splice(index, 1);
};

onMounted(() => {
  // if (!useRoute().params.cloudId && props.bootstrapProvider !== BootstrapProviders.Kubeadm && props.type === NodeTypes.Worker) {
  //   data.map((c) => {
  //     c.flavor = "m1.small"
  //   })
  // }
})
</script>

<style scoped lang="scss">
.form-container.no-style {
  box-shadow: none;
  border: 1px solid #dee2e6;
  background: #ffffff;
  border-radius: 6px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  .no-bg-row {
    background-color: var(--surface-0);

    .p-button {
      margin: 0.5rem 0;
    }
  }
}
</style>
