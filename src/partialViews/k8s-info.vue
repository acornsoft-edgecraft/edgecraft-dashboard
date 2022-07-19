<template>
    <div calss="p-card">
        <h5 class="form-title">Kubernetes 설치 정보</h5>
        <div class="field grid">
            <label for="version"
                   class="col-1">Version</label>
            <div class="col-11">
                <K3InputText id="version"
                             v-model="modelValue.version"
                             type="text"
                             autofocus
                             class="text-base text-color w-full"
                             :class="{ 'p-invalid': v.version.$invalid }" />
                <small v-if="v.version.$invalid"
                       class="p-error">{{ v.version.required.$message.replace('Value', 'Kubernetes Version') }}</small>
            </div>
        </div>
        <div class="field grid">
            <label for="pod_cidr"
                   class="col-1">POD CIDR</label>
            <div class="col-11">
                <K3InputText id="pod_cidr"
                             v-model="modelValue.pod_cidr"
                             type="text"
                             class="text-base text-color w-full"
                             :class="{ 'p-invalid': v.pod_cidr.$invalid }" />
                <small v-if="v.pod_cidr.$invalid"
                       class="p-error">{{ v.pod_cidr.required.$message.replace('Value', 'POD CIDR') }}</small>
            </div>
        </div>
        <div class="field grid">
            <label for="svc_cidr"
                   class="col-1">Service CIDR</label>
            <div class="col-11">
                <K3InputText id="svc_cidr"
                             v-model="modelValue.svc_cidr"
                             type="text"
                             class="text-base text-color w-full"
                             :class="{ 'p-invalid': v.svc_cidr.$invalid }" />
                <small v-if="v.svc_cidr.$invalid"
                       class="p-error">{{ v.svc_cidr.required.$message.replace('Value', 'Service CIDR') }}</small>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    modelValue: { type: Object, required: true },
    v: { type: Object, required: true }
})
onMounted(() => { });
</script>

<style scoped lang="scss">
</style>