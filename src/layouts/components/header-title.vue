<template>
  <div class="header-title-container align-items-center">
    <K3Tag v-if="keyPath"
           class="mr-3"
           severity="success"
           :value="keyPath" />
    <!-- <K3Breadcrumb :home="home"
                  :model="useAppHelper().Route.breadcrumbs()">
    </K3Breadcrumb> -->
    <K3BreadCrumb v-if="breadcrumbs.length > 0"
                  :home="home"
                  :model="breadcrumbs">
    </K3BreadCrumb>
  </div>
</template>

<script setup lang="ts">
const home = ref({ icon: 'pi pi-home', to: '/' })

const breadcrumbs = computed(() => useAppHelper().Route.breadcrumbs())
const cloudName = computed(() => useCloudService().currentCloud.value)
const clusterName = computed(() => useClusterService().currentCluster.value)
const keyPath = computed(() => (cloudName.value && clusterName.value) ? `${cloudName.value} >> ${clusterName.value}` : '')
</script>

<style scoped lang="scss">
.header-title-container {
  display: flex;

  .p-tag {
    //margin: 0 0.5rem 0 0;
    padding: 0.4rem 1rem 0.4rem 1rem;
    background-color: var(--green-100);
    border: 1px solid magenta;
    border-left: 5px solid magenta;
    font-size: 1.2rem;
    color: var(--text-coor);
  }

  .p-breadcrumb {
    padding: 0.65rem 1rem 0.65rem 1rem;
    background-color: var(--orange-100);
    border: 1px solid green;
    border-left: 5px solid green;
    color: var(--text-color-secondary);
    font-size: 1.2rem;
    color: var(--text-coor);
  }
}
</style>
