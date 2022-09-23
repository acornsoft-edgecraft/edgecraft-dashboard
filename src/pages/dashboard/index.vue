<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      Dashboard Page
      <!-- Content here -->
      {{ auth }}
    </section>
  </div>
</template>

<script setup lang="ts">
// imports
const { Auth } = useAppHelper();

// Page meta
definePageMeta({ layout: "default", title: "Dashboard", public: false });
// Props
// const props = defineProps({}),
// Emits
// const emits = defineEmits(['eventname']),
// Properties
const auth = Auth.get();

// Compputed
// Watcher
// Methods
// Events
// Logics (like api call, etc)
</script>

<style scoped lang="scss"></style>
