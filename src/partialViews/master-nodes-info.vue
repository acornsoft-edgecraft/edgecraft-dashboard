<template>
    <div calss="p-card">
        <h5 class="form-title">Master Nodes</h5>
        <div class="field grid">
            <div class="field col-12 text-right">
                <K3Button icon="pi pi-plus" />
            </div>
        </div>
        <div class="field grid iterator">
            <div class="field col-12">
                <K3Divider align="left"
                           type="solid">Baremetal Host</K3Divider>
            </div>
            <div class="field col-6">
                <label for="host_name">Host Name</label>
                <K3InputText id="host_name"
                             type="text"
                             autofocus
                             class="text-base text-color w-full" />
            </div>
            <div class="field col-6">
                <label for="bmc_address">BMC Address</label>
                <K3InputText id="bmc_address"
                             type="text"
                             class="text-base text-color w-full" />
            </div>
            <div class="field col-6">
                <label for="boot_mac">Boot MAC Address</label>
                <K3InputText id="boot_mac"
                             type="text"
                             autofocus
                             class="text-base text-color w-full" />
            </div>
            <div class="field col-6">
                <label for="boot_mode">Boot Mode</label>
                <K3InputText id="boot_mode"
                             type="text"
                             class="text-base text-color w-full" />
            </div>
            <div class="field col-6">
                <div class="field-checkbox mt-2 mb-2">
                    <label for="online">Online (power)</label>
                    <K3Checkbox class="ml-3"
                                id="online" />
                </div>
            </div>
            <div class="field col-6">
                <div class="field-checkbox h-full">
                    <label for="online">Online (power)</label>
                    <K3Checkbox class="ml-3"
                                id="online" />
                </div>
            </div>
            <div class="field col-12">
                <K3Divider align="left"
                           type="solid">Node</K3Divider>
            </div>
            <div class="field col-6">
                <label for="node_name">Node Name</label>
                <K3InputText id="node_name"
                             type="text"
                             autofocus
                             class="text-base text-color w-full" />
            </div>
            <div class="field col-6">
                <label for="node_address">IP Address</label>
                <K3InputText id="node_address"
                             type="text"
                             class="text-base text-color w-full" />
            </div>
            <div class="field col-12">
                <label for="labels">Labels</label>
                <K3InputText id="labels"
                             type="text"
                             class="text-base text-color w-full" />
            </div>
            <div class="field col-12 text-right mt-5">
                <K3Button icon="pi pi-minus" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
onMounted(() => { });
</script>

<style scoped lang="scss">
</style>