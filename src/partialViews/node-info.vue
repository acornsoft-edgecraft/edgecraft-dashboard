<template>
    <div calss="p-card">
        <div class="grid">
            <div class="field col-12">
                <div class="field-checkbox">
                    <K3Checkbox class="mr-2"
                                id="use_loadbalancer" />
                    <label for="use_loadbalancer">Loadbalancer</label>
                    <K3InputText id="lb_address"
                                 type="text"
                                 placeholder="IP Address"
                                 class="ml-5 text-base text-color" />
                    <span class="ml-2 mr-2">:</span>
                    <K3InputText id="
                            version"
                                 type="text"
                                 placeholder="Port"
                                 class="text-base text-color" />
                </div>
            </div>
        </div>

        <MasterNodesInfo />
    </div>
</template>

<script setup lang="ts">
import MasterNodesInfo from './master-nodes-info.vue';

const props = defineProps({
    modelValue: { type: Object, required: true },
    v: { type: Object, required: true }
})
const emits = defineEmits(['can-continue'])

const beforeNextStep = (): boolean => {
    return true;
}

onActivated(() => {
    if (!props.v?.value.$invalid) {
        emits('can-continue', { value: true })
    }
})

onMounted(() => {
});

defineExpose({ beforeNextStep })
</script>

<style scoped lang="scss">
</style>