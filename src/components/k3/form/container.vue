<template>
    <div :class="containerClass">
        <div class="top"
             v-if="!!slots['header']">
            <slot name="header"></slot>
        </div>
        <div class="content">
            <slot />
        </div>
        <div class="bottom"
             v-if="!!slots['footer']">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
const slots = useSlots()

const containerClass = computed(() => [
    'form-container',
    useAttrs().class,
])
</script>

<style scoped lang="scss">
</style>