<template>
    <component :is="badge.element ? badge.element : 'span'"
               class="vsm--badge"
               :class="badge.class"
               v-bind="badge.attributes">
        {{ badge.text }}
    </component>
</template>

<script setup lang="ts">
const props = defineProps({
    badge: { type: Object, default: () => { } }
})
</script>

<style scoped lang="scss">
</style>