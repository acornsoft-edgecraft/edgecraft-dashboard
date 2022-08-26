<template>
  <div class="partial-container">
    <div class="page-wrapper">
      <section class="page-header">
        <K3PageTitle />
      </section>
      <section class="page-content">route.params.id :: {{ route.params.id }}</section>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
// Page meta
definePageMeta({ layout: "default", title: "클라우드 클러스터", public: true });
// Props
// const props = defineProps({}),
// Emits
// const emits = defineEmits(['eventname']),
// Properties
const route = useRoute();
// Compputed
// Watcher
// Methods
// Events
// Logics (like api call, etc)
</script>

<style scoped lang="scss"></style>
