<template>
    <div class="page-container">
        <div class="page-wrapper">
            <section class="page-header">
                <K3PageTitle />
            </section>
            <section class="page-content">
                Dashbaord Page
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
  * 여기서는 해당 화면 생성 이전에 처리할 설정을 구성합니다.
  * this 등의 사용이 불가능합니다.
  */
// imports
// Page meta
definePageMeta({ layout: 'default', title: 'Dashboard', public: false })
// Props
// const props = defineProps({}),
// Emits
// const emits = defineEmits(['eventname']),
// Properties
// Compputed
// Watcher
// Methods
// Events
// Logics (like api call, etc)
</script>

<style scoped lang="scss">
</style>