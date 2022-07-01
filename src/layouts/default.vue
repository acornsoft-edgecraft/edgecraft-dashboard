<template>
    <div :class="containerClass">
        <Sidebar @toggle-sidebar="onToggleSidebar" />
        <div class="layout-main-wrapper flex flex-column">
            <Header />
            <div class="layout-main">
                <slot />
            </div>
            <Footer />
        </div>
    </div>
</template>

<script setup lang="ts">

// imports
import Footer from "./components/footer.vue";
import Header from "./components/header.vue";
import Sidebar from "./components/sidebar.vue";
// Page meta
definePageMeta({ name: "default" });
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
const onToggleSidebar = () => {
    sidebarMode.value = sidebarMode.value === 'static' ? 'overlay' : 'static'
    console.log(`sidebar event arrived >> ${sidebarMode.value} `)

    event.preventDefault()
}
// Events
// Logics (like api call, etc)
</script>

<style scoped lang="scss">
</style>