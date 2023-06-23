<template>
    <BizBenchmarksTotals :model="model.totals" />
    <K3Divider />
    <K3TabView>
        <K3TabPanel v-for="(control, index) in controls" :key="index" :header="`${control.id}. ${control.node_type}`">
            <div class="flex align-content-start flex-wrap mb-2">
                <div class="flex align-items-center justify-content-center text-lg font-semibold mr-2 text-color-secondary">
                    {{ control.text }}
                </div>
                <div class="flex align-items-center justify-content-center gap-2">
                    <K3Button class="p-button-outlined p-button-rounded" icon="pi pi-plus" @click="expandAll(index)" />
                    <K3Button class="p-button-outlined p-button-rounded" icon="pi pi-minus" @click="collapseAll" />
                </div>
            </div>
            <K3DataTable v-model:expandedRowGroups="expandedRowGroups" :value="control.tests" rowGroupMode="subheader" expandableRowGroups groupRowsBy="parents.section">
                <template #groupheader="slotProps">
                    <span class="font-semibold">{{ slotProps.data.parents.section }} {{ slotProps.data.parents.desc }}</span>
                </template>
                <K3Column field="parents.section" header="Section" />
                <K3Column field="test_number" header="Number" headerStyle="width:7%" />
                <K3Column header="Status" headerStyle="width:7%">
                    <template #body="slotProps">
                        <K3Tag :value="slotProps.data.status" :severity="Util.getSeverity(`${slotProps.data.status}`)" />
                    </template>
                </K3Column>
                <K3Column header="Description" headerStyle="width:86%">
                    <template #body="slotProps">
                        <div class="flex flex-column gap-2">
                            <div class="flex font-medium" v-if="slotProps.data.test_desc"><span class="font-semibold mr-2">Desc: </span>{{ slotProps.data.test_desc }}</div>
                            <div class="flex text-800" v-if="slotProps.data.audit"><span class="font-semibold mr-2">Audit: </span>{{ slotProps.data.audit }}</div>
                            <div class="flex text-800" v-if="slotProps.data.remediation"><span class="font-semibold mr-2">Remediation: </span>{{ slotProps.data.remediation }}</div>
                            <div class="flex text-800" v-if="slotProps.data.actual_value"><span class="font-semibold mr-2">Actual Value: </span>{{ slotProps.data.actual_value }}</div>
                            <div class="flex text-800" v-if="slotProps.data.expected_result"><span class="font-semibold mr-2">Expected Result: </span>{{ slotProps.data.expected_result }}</div>
                            <div class="flex text-800" v-if="slotProps.data.reason"><span class="font-semibold mr-2">Reason: </span>{{ slotProps.data.reason }}</div>
                        </div>
                    </template>
                </K3Column>
            </K3DataTable>
        </K3TabPanel>
    </K3TabView>
</template>
<script setup lang="ts">
const { Util } = useAppHelper();
const props = defineProps({
    model: { type: Object, required: true },
})

const controls = ref([])
const getList = () => {
    controls.value = props.model.controls.map((c) => {
        const tests = []
        c.tests.forEach((t) => {
            const parents = {
                section: t.section,
                type: t.type,
                desc: t.desc,
            }
            t.results.forEach((r) => {
                tests.push({
                    parents,
                    ...r
                })
            })
        })
        return {
            id: c.id,
            node_type: c.node_type,
            text: c.text,
            tests: tests,
        }
    })
}
const expandedRowGroups = ref([]);
const expandAll = (index) => {
    const sections = controls.value[index].tests.map((t) => t.parents.section);
    expandedRowGroups.value = [...new Set(sections)];
};
const collapseAll = () => {
    expandedRowGroups.value = null;
};

onMounted(() => {
    getList()
})
</script>
<style scoped lang="scss">
:deep(.p-datatable) {
    .p-datatable-thead > tr > th {
        background: #f8f9fa !important;
    }
}
</style>
