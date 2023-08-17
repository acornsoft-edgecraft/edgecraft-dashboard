<template>
    <div class="flex flex-row">
        <div class="flex align-items-center mr-3"><K3Tag value="PASS" />{{ model.total_pass }}</div>
        <div class="flex align-items-center mr-3"><K3Tag value="WARN" :severity="Util.getSeverity('WARN')" />{{ model.total_warn }}</div>
        <div class="flex align-items-center mr-3"><K3Tag value="INFO" :severity="Util.getSeverity('INFO')" />{{ model.total_info }}</div>
        <div class="flex align-items-center mr-3"><K3Tag value="FAIL" :severity="Util.getSeverity('FAIL')" />{{ model.total_fail }}</div>
        <div class="flex align-items-center p-rate" v-if="show"><K3ProgressBar :value="rate" /></div>
    </div>
</template>
<script setup lang="ts">
const { Util } = useAppHelper();
const props = defineProps({
    model: { type: Object, required: true },
    show: { type: Boolean, default: true },
});

const total = computed(() => {
    return props.model.total_pass + props.model.total_warn + props.model.total_info + props.model.total_fail;
})
const rate = computed(() => {
    return 100 - Math.round(props.model.total_fail / total.value * 100);
})
</script>
<style scoped lang="scss">

.p-tag {
    margin-left: 1rem;
    margin-right: 0.5rem;
}
.p-tag:first-child {
    margin-left: 0.1rem;
}

.p-rate {
    border-left: 1px solid #a0a2a3;
    padding-left: 1rem;
}
.p-progressbar {
    width: 10rem;
    background: #bfc1c2;

    :deep(.p-progressbar-value) {
        background-color: var(--purple-500);
    }
}
</style>
