<template>
    <div :class="containerClass">
        <div class="layout-main-wrapper flex flex-column">
            <div class="layout-main">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

// imports
// Page meta
definePageMeta({ name: "empty" });
// Props
// const props = defineProps({}),
// Emits
// const emits = defineEmits(['eventname']),
// Properties
let sidebarMode = ref('static')
// Compputed
const containerClass = computed(() => [
    "layout-container",
    "flex",
    "flex-row",
    {
        'off': sidebarMode.value === 'overlay',
        'on': sidebarMode.value === 'static'
    }
])
// Watcher
// Methods
// Events
// Logics (like api call, etc)
</script>

<style scoped lang="scss">
</style>