<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <div class="flex justify-content-end">
        <NuxtLink :to="`/cloud/${cloudId}/app/register`">
          <K3Button label="배포" class="px-6" />
        </NuxtLink>
      </div>

      <K3Fieldset legend="설치된 목록"></K3Fieldset>
      <K3Fieldset legend="설치 가능 목록"></K3Fieldset>
      <div class="flex justify-content-end mt-3">
        <NuxtLink to="/cloud">
          <K3Button label="클라우드 목록" class="p-button-secondary px-4" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// imports
// Page meta
definePageMeta({ layout: "default", title: "클라우드 애플리케이션", public: true });
// Props
// const props = defineProps({}),
// Emits
// const emits = defineEmits(['eventname']),
// Properties
const route = useRoute();
const cloudId = route.params.cloudId;
// Compputed
// Watcher
// Methods
// Events
// Logics (like api call, etc)
</script>

<style scoped lang="scss">
.p-fieldset {
  margin-top: 1rem;
}
</style>
