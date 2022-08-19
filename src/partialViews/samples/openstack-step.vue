<template>
    <div class="partial-container m-0 p-0">
        OpenStack Info
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    modelValue: { type: Object, default: () => { } },
    v: { type: Object, default: () => { } }
})
const emits = defineEmits(['can-continue'])

const beforeNextStep = (): boolean => {
    return true;
}

onActivated(() => {
    emits('can-continue', { value: true })
    // if (!props.v?.value.$invalid) {
    //     emits('can-continue', { value: true })
    // }
})

onMounted(() => {
    emits('can-continue', { value: true })
});

defineExpose({ beforeNextStep })
</script>

<style scoped lang="scss">
</style>