<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content"></section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default", title: "Home", public: true });

useCloudService().currentCloud.value = "Home Cloud";
useClusterService().currentCluster.value = "Cluster #1";
</script>

<style scoped lang="scss"></style>
