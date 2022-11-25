<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <K3FormContainer>
        <K3FormRow>
          <K3FormColumn label="애플리케이션" label-align="right"> </K3FormColumn>
        </K3FormRow>
        <K3FormRow>
          <K3FormColumn label="버전" label-align="right"></K3FormColumn>
        </K3FormRow>
        <K3FormRow>
          <K3FormColumn label="설명" label-align="right"></K3FormColumn>
        </K3FormRow>
        <K3FormRow>
          <K3FormColumn label="랄라" label-align="right"></K3FormColumn>
        </K3FormRow>
      </K3FormContainer>

      <div class="flex justify-content-between button-wrapper">
        <div class="flex align-items-start justify-content-start">
          <K3Button label="삭제" icon="pi pi-trash" class="p-button-danger" @click="onDelete" />
        </div>

        <div class="flex align-items-end justify-content-end">
          <NuxtLink :to="`/cloud/${route.params.cloudId}/app`">
            <K3Button label="취소" icon="pi pi-times" class="p-button-secondary" />
          </NuxtLink>
          <K3Button label="등록" icon="pi pi-check" @click="onSubmit" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// imports
// Page meta
definePageMeta({ layout: "default", title: "클라우드 애플리케이션 등록", public: true });
// Props
// const props = defineProps({}),
// Emits
// const emits = defineEmits(['eventname']),
// Properties
const route = useRoute();
// Compputed
// Watcher
// Methods
const onDelete = () => {};
const onSubmit = () => {};
// Events
// Logics (like api call, etc)
</script>

<style scoped lang="scss">
.form-container {
  margin-top: 1rem;
}
.button-wrapper {
  margin-top: 1rem;
  .p-button {
    width: 7rem;
    margin-left: 0.5em;
  }
}
</style>
