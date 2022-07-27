<template>
    <div class="p-card">
        {{ modelValue }}
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    modelValue: { type: Object, required: true }
})
const emits = defineEmits(['can-continue'])

const beforeNextStep = (): boolean => {
    return true;
}

onActivated(() => {
    emits('can-continue', { value: true })
})

onMounted(() => {
    emits('can-continue', { value: true })
});

defineExpose({ beforeNextStep })
</script>

<style scoped lang="scss">
</style>