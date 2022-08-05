<template>
    <div :class="columnClass">
        <div v-if="label"
             :class="labelClass"
             :style="labelStyle">{{ label }}</div>
        <div :class="itemClass"
             :style="itemStyle">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    size: { type: Number, default: 12 },
    verticalLayout: { type: Boolean, default: false },
    label: { type: String, default: '' },
    labelWidth: { type: String, default: '200px' },
    labelAlign: { type: String, default: 'center' },
    labelBackgroundColor: { type: String, default: 'slategray' },
    labelColor: { type: String, default: 'white' },
})

const columnClass = computed(() => [
    'form-column',
    `col-${props.size}`,
    props.verticalLayout ? 'vertical' : 'horizontal',
    useAttrs().class
])
const labelClass = computed(() => [
    'label',
    `align-items-center`,
    `justify-content-${props.labelAlign === 'left' ? 'start' : props.labelAlign === 'right' ? 'end' : 'center'}`
    //`text-${props.labelAlign}`
])
const labelStyle = computed(() => [
    { 'width': props.labelWidth },
    { 'background-color': props.labelBackgroundColor },
    { 'color': props.labelColor },
])
const itemClass = computed(() => [
    'item',
])
const itemStyle = computed(() => [
])
</script>

<style scoped lang="scss">
</style>