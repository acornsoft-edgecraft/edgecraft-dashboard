<template>
    <div class="layout-container">
        <Header />
        <div class="layout-main">
            <slot />
        </div>
        <Footer />
    </div>
</template>

<script setup lang="ts">

// imports
import Footer from "./components/footer.vue";
import Header from "./components/header.vue";
// Page meta
definePageMeta({ name: "default" });
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