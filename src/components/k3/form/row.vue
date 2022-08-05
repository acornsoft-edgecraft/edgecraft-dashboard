<template>
    <div :class="rowClass">
        <slot />
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    direction: { type: String, default: 'horizontal' },
    overflowWrap: { type: Boolean, default: true }
})

const rowClass = computed(() => [
    'form-row',
    'flex',
    `flex-${props.direction === 'horizontal' ? 'row' : 'column'}`,
    props.overflowWrap ? 'flex-wrap' : ''
])
</script>

<style scoped lang="scss">
</style>