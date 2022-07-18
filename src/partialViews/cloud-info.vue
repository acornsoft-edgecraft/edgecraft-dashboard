<template>
    <div class="partial-container m-0 p-0">
        <div calss="p-card">
            <h5 class="form-title">CLOUD 정보</h5>
            <div class="field grid">
                <label for="cloudname"
                       class="col-1">Cloud 명</label>
                <div class="col-11">
                    <K3InputText id="cloudname"
                                 type="text"
                                 autofocus
                                 class="text-abse text-color surface-overlay p-2 border-1 border-solid surface-border border-round apperance-none outline-none focus:border-primary w-full" />
                </div>
            </div>
            <div class="field grid">
                <label class="col-1">Cloud 유형</label>
                <div class="col-11">
                    <div class="field-radiobutton">
                        <K3RadioButton id="cloudtype1"
                                       name="type"
                                       value="Baremetal" />
                        <label for="cloudtype1">Baremetal</label>
                        <K3RadioButton class="ml-4"
                                       id="cloudtype2"
                                       name="type"
                                       value="Openstack" />
                        <label for="cloudtype2">Openstack</label>

                    </div>
                </div>
            </div>
            <div class="field grid">
                <label for="clouddesc"
                       class="col-1">Cloud 설명</label>
                <div class="col-11">
                    <textarea id="clouddesc"
                              type="text"
                              rows="4"
                              class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['can-continue'])

const beforeNextStep = (): boolean => {
    return false;
}

onMounted(() => {
    emits('can-continue', { value: true })
});

defineExpose({ beforeNextStep })
</script>

<style scoped lang="scss">
.field>label {
    justify-content: end;
}
</style>