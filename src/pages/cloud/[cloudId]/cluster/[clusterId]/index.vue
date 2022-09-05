<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      route :: {{ route }}
      <br />
    </section>
  </div>
</template>

<script setup lang="ts">
// imports
// Page meta
definePageMeta({ layout: "default", title: "클라우드 클러스터 상세", public: true });
// Props
// const props = defineProps({}),
// Emits
// const emits = defineEmits(['eventname']),
// Properties
// const { clusters, isFetch, fetch } = useClusterService().getClusters();
const route = useRoute();
// Compputed
// Watcher
// Methods
// Events
onMounted(() => {
  // fetch();
});
// Logics (like api call, etc)
</script>

<style scoped lang="scss"></style>
