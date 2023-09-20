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

const { Routing } = useAppHelper();

onMounted(() => {
  navigateTo("/cloud")
})
</script>

<style scoped lang="scss"></style>
