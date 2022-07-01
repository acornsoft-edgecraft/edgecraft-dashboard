<template>
  <div class="header-title-container align-items-center">
    Header Title
    <!-- <K3Tag :value="context.currentContext" />
    <K3Tag :value="'aa / bb / cc'"
           class="breadcrum" /> -->
  </div>
</template>

<script setup lang="ts">
/**
 * 여기서는 해당 화면 생성 이전에 처리할 설정을 구성합니다.
 * this 등의 사용이 불가능합니다.
 */
// imports

// Props
// const props = defineProps({}),
// Emits
// const emits = defineEmits(['eventname']),
// Properties
//const { context } = ContextService();
// Compputed
// Watcher
// Methods
// Events
// Logics (like api call, etc)
</script>

<style scoped lang="scss">
.header-title-container {
  display: flex;

  .p-tag {
    margin: 0 0.5rem 0 0;
    padding: 0.2rem 1rem 0.2rem 1rem;
    background-color: var(--indigo-100);
    //border-left: 6px solid darkgray;
    font-size: 1.5rem;
    color: var(--text-coor);
  }

  .p-tag.breadcrum {
    padding: 0.2rem 1rem 0.2rem 1rem;
    background-color: var(--orange-100);
    //border-left: 6px solid green;
    color: var(--text-color-secondary);
  }
}
</style>
