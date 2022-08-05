<template>
    <div class="item-container">
        <div class="form-field">
            <K3InputText v-model="modelValue.$model"
                         :type="type"
                         :class="itemClass" />
        </div>
        <div class="error-field basic label pointing error"
             v-if="modelValue.$invalid">{{ errorMessages }}</div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    modelValue: { type: Object, default: () => { } },
    type: { type: String, default: 'text' },
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