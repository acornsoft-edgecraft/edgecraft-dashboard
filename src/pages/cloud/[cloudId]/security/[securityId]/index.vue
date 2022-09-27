<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <K3Card>
        <template #title>보안검증 결과</template>
        <template #content>
          <K3FormContainer>
            <K3FormRow>
              <K3FormColumn label="Cloud Name" label-align="right">{{ security.cloud_name }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Status" label-align="right">{{ SecurityStatus[security.status] }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Result" label-align="right">{{ security.result }}</K3FormColumn>
            </K3FormRow>
            <K3FormRow>
              <K3FormColumn label="Executed" label-align="right">{{ security.executed }}</K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
        </template>
      </K3Card>
      <K3Card>
        <template #title>보안검증 세부항목</template>
        <template #content>
          <BizSecurityTreeTable :items="security.items" :columns="columns" :expand-btns="true" :showExpandAll="true" :scrollable="true" scrollHeight="600px">
            <template #result="slotProps"> {{ SecurityItemStatus[slotProps.item] }} </template>
          </BizSecurityTreeTable>
        </template>
      </K3Card>

      <div class="flex justify-content-end button-wrapper">
        <NuxtLink :to="`/cloud/${route.params.cloudId}/security`">
          <K3Button label="보안검증결과 목록" class="p-button-secondary" />
        </NuxtLink>
      </div>
      <K3Overlay :active="isFetch" loader="bars" background-color="#830205" />
    </section>
  </div>
</template>

<script setup lang="ts">
// imports
import { SecurityStatus, SecurityItemStatus } from "~/models";

// Page meta
definePageMeta({ layout: "default", title: "클라우드 보안검증 결과", public: true });
// Props
// const props = defineProps({}),
// Emits
// const emits = defineEmits(['eventname']),
// Properties
const route = useRoute();

const { security, isFetch, fetch } = useSecurityService().getSecurity();

const columns = ref([
  { field: "cis_id", header: "CIS ID", expander: true, headerStyle: { "min-width": "12%" } },
  { field: "recommendation", header: "Recommendation description", headerStyle: { "min-width": "80%" } },
  { field: "result", header: "Result", headerStyle: { "min-width": "8%" }, hasSlot: true },
]);

// Compputed
// Watcher
// Methods
// Events
onMounted(() => {
  fetch(route.params.securityId);
});
// Logics (like api call, etc)
</script>

<style scoped lang="scss">
.p-card {
  margin-top: 1rem;
}

.button-wrapper {
  margin-top: 1rem;
  .p-button {
    width: 10rem;
    margin-left: 0.5em;
  }
}
</style>
