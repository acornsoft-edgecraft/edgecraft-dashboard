<template>
    <div v-for="item of options"
         :key="item.key"
         class="form-field align-items-center mr-20">
        <label v-if="labelAlign === 'left' && item.label"
               class="mr-2"
               :class="{ disabled: item.disabled }"
               :for="item.key">{{ item.label }}</label>
        <K3RadioButton :class="`${labelAlign === 'left' ? 'mr-5' : 'mr-2'}`"
                       :inputId="item.key"
                       :name="name"
                       :value="item.key"
                       :disabled="item.disabled"
                       v-model="modelValue.$model" />
        <label v-if="labelAlign === 'right' && item.label"
               class="mr-5"
               :class="{ disabled: item.disabled }"
               :for="item.key">{{ item.label }}</label>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    modelValue: { type: Object, default: () => { } },
    options: { type: Array<{ key: string, label: sring, disabled: boolean }>, default: () => [{ id: '', label: '', disabled: false }] },
    labelAlign: { type: String, default: 'right' },
    name: { type: String, default: 'checks' }
})
</script>

<style scoped lang="scss">
.form-field {
    width: unset;

    label {
        position: relative;
        top: -2px;
    }

    label.disabled {
        color: gray;
        opacity: 50%;
    }
}
</style>