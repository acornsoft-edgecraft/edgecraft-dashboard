<template>
    <div class="partial-container m-0 p-0">
        CLUSTER Info
    </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['can-continue'])

onMounted(() => {
    emits('can-continue', { value: true })
});
</script>

<style scoped lang="scss">
</style>