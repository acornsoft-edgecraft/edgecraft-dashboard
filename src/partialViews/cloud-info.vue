<template>
    <div class="partial-container m-0 p-0">
        <div calss="p-card">
            <h5 class="form-title">CLOUD 정보</h5>
            <div class="field grid">
                <label for="cloudname"
                       class="col-1">Cloud 명</label>
                <div class="col-11">
                    <K3InputText id="cloudname"
                                 v-model="v$.name.$model"
                                 type="text"
                                 autofocus
                                 class="text-base text-color w-full" />
                    <small v-if="v$.name.$invalid"
                           class="p-error">{{ v$.name.required.$message.replace('Value', 'Name') }}</small>
                </div>
            </div>
            <div class="field grid">
                <label for="cloudtyep"
                       class="col-1">Cloud 유형</label>
                <div class="col-11">
                    <K3Dropdown id="cloudtype"
                                v-model="v$.type.$model"
                                :options="CloudTypesMap()"
                                :optionLabel="'name'"
                                :optionValue="'value'"
                                class="mr-2" />
                    <small v-if="v$.type.$invalid"
                           class="p-error">{{ v$.type.required.$message?.replace('Value', 'Type') }}</small>
                </div>
            </div>
            <div class="field grid">
                <label for="clouddesc"
                       class="col-1">Cloud 설명</label>
                <div class="col-11">
                    <K3Textarea id="clouddesc"
                                v-model="v$.desc.$model"
                                type="text"
                                rows="4"
                                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"></K3Textarea>
                    <small v-if="v$.desc.$invalid"
                           class="p-error">{{ v$.desc.required?.$message?.replace('Value', 'Desc') }}</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { CloudTypesMap } from '../models';

const state = reactive({
    name: "",
    type: 1,
    desc: ""
})
const rules = {
    name: { required, minLength: minLength(5), maxLength: maxLength(50) },
    type: { required },
    desc: { required, minLength: minLength(5) }
}

const v$ = useVuelidate(rules, state)

const emits = defineEmits(['can-continue'])

watch(() => v$.value, (val) => {
    console.log(`watch >>> ${val.$invalid}`)
    if (!val.$invalid) {
        emits('can-continue', { value: true })
    }
})

const beforeNextStep = (): boolean => {
    console.log(`validation >>> ${JSON.stringify(state)}`)
    if (v$.value.$invalid) {
        return false;
    }
    return true;
}

onActivated(() => {
    if (!v$.value.$invalid) {
        emits('can-continue', { value: true })
    }
})

onMounted(() => {
});

defineExpose({ beforeNextStep })
</script>

<style scoped lang="scss">
.field>label {
    justify-content: end;
}
</style>