<template>
  <div class="partial-container m-0 p-0">
    <div calss="p-card">
      <h5 class="form-title">등록 정보 확인</h5>
      <div class="field grid">
        <div class="field col-12">
          <K3Accordion :multiple="true" :activeIndex="[0, 1, 2, 3, 4]">
            <K3AccordionTab header="Cloud 정보"> {{ modelValue.cloud }} </K3AccordionTab>
            <K3AccordionTab header="Cluster 정보"> {{ modelValue.cluster }} </K3AccordionTab>
            <K3AccordionTab header="Node 정보"> {{ modelValue.nodes }} </K3AccordionTab>
            <K3AccordionTab header="ETCD/Storage 정보"> {{ modelValue.etcd_storage }} </K3AccordionTab>
            <K3AccordionTab header="OpenStack 정보"> {{ modelValue.openstack }} </K3AccordionTab>
          </K3Accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Object, required: true },
});
const emits = defineEmits(["can-continue"]);

const beforeNextStep = (): boolean => {
  return true;
};

onActivated(() => {
  emits("can-continue", { value: true });
});

onMounted(() => {
  emits("can-continue", { value: true });
});

defineExpose({ beforeNextStep });
</script>

<style scoped lang="scss"></style>
