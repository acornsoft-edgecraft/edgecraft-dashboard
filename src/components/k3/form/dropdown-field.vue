<template>
    <div class="item-container">
        <div class="form-field">
            <K3Dropdown v-model="modelValue.$model"
                        :options="options"
                        :option-label="'name'"
                        :option-value="'value'"
                        :class="itemClass" />
        </div>
        <div class="error-field basic label pointing error"
             v-if="modelValue.$invalid">{{ errorMessages }}</div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    modelValue: { type: Object, default: () => { } },
    options: { type: Array<Object>, default: [] },
    optionLabel: { type: String, default: 'name' },
    optionValue: { type: String, default: 'value' },
    fieldName: { type: String, default: 'Field' }
})

const itemClass = computed(() => [useAttrs().class, /*{ 'p-invalid': props.modelValue.$invalid } */])
const errorMessages = computed(() => {
    props.modelValue.$touch();
    return props.modelValue.$errors.map(err => err.$message.replace('Value', props.fieldName)).join(",")
})
</script>

<style scoped lang="scss">
</style>