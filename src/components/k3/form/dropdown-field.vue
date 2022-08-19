<template>
    <div class="item-container">
        <div class="form-field">
            <K3Dropdown v-model="modelValue.$model"
                        :options="options"
                        :option-label="'name'"
                        :option-value="'value'"
                        :class="itemClass"
                        @change="onChange"
                        @focus="onFocus"
                        @blur="onBlur"
                        @before-show="onBeforeShow"
                        @before-hide="onBeforeHide"
                        @show="onShow"
                        @hide="onHide"
                        @filter="onFilter" />
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
const emits = defineEmits(['change', 'focus', 'blur', 'before-show', 'before-hide', 'show', 'hide', 'filter'])

const itemClass = computed(() => [useAttrs().class, /*{ 'p-invalid': props.modelValue.$invalid } */])
const errorMessages = computed(() => {
    props.modelValue.$touch();
    return props.modelValue.$errors.map(err => err.$message.replace('Value', props.fieldName)).join(",")
})

const onChange = (event) => {
    emits('change', event)
}
const onFocus = (event) => {
    emits('focus', event)
}
const onBlur = (event) => {
    emits('blur', event)
}
const onBeforeShow = () => {
    emits('before-show')
}
const onBeforeHide = () => {
    emits('before-hide')
}
const onShow = () => {
    emits('show')
}
const onHide = () => {
    emits('hide')
}
const onFilter = (event) => {
    emits('filter', event)
}
</script>

<style scoped lang="scss">
</style>