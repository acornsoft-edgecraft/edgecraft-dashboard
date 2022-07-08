<template>
    <component :is="icon.element ? icon.element : 'i'"
               class="vsm--icon"
               :class="typeof icon === 'string' || (icon instanceof String) ? icon : icon.class"
               aria-hidden="true"
               v-bind="icon.attributes">
        {{ icon.text }}
    </component>
</template>

<script setup lang="ts">
const props = defineProps({
    icon: { type: [String, Object as any], default: '' }
})
</script>

<style scoped lang="scss">
</style>