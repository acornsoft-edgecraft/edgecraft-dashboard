<template>
    <div class="item-container">
        <div class="form-field">
            <!-- IME 문제로 v-model을 그대로 사용하지 않고 이벤트로 사용 -->
            <K3InputText :value="modelValue.$model"
                         :type="type"
                         :class="itemClass"
                         @input="changeWord"
                         v-bind="useAttrs()" />
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

const changeWord = (e) => {
    props.modelValue.$model = e.target.value
}
</script>

<style scoped lang="scss">
</style>