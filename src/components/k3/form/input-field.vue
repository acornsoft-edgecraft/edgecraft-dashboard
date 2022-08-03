<template>
    <div class="item-container">
        <K3InputText v-model="modelValue.$model"
                     :class="itemClass" />
        <div class="form-field basic label pointing error"
             v-if="modelValue.$invalid">{{ errorMessages }}</div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    modelValue: { type: Object, default: () => { } },
    fieldName: { type: String, default: 'Field' }
})

const itemClass = computed(() => [useAttrs().class, /*{ 'p-invalid': props.modelValue.$invalid } */])
const errorMessages = computed(() => props.modelValue.$errors.map(err => err.$message.replace('Value', props.fieldName)).join(","))
</script>

<style scoped lang="scss">
.form-field.basic.error.label {
    background: none #fff !important;
    color: #db2828 !important;
    border-color: #db2828 !important;
}

.form-field.pointing.label,
.form-field[class*="pointing above"].label {
    margin-top: 0.7em;
}

.form-field.pointing.label {
    position: relative;
}

.form-field.basic.label {
    background: none #fff;
    border: 1px solid rgba(34, 36, 38, .15);
    color: rgba(0, 0, 0, .87);
    box-shadow: none;
}

.form-field.error.label,
.form-field.error.labels .label {
    background-color: #db2828 !important;
    border-color: #db2828 !important;
    color: #fff !important;
}

.form-field.label:last-child {
    margin-right: 0;
}

.form-field.label,
.form-field.labels .label {
    font-size: .85714286rem;
}

.form-field.label {
    display: inline-block;
    line-height: 1;
    vertical-align: baseline;
    margin: 0 0.14285714em;
    background-color: #e8e8e8;
    background-image: none;
    padding: 0.5833em 0.833em;
    color: rgba(0, 0, 0, .6);
    text-transform: none;
    font-weight: 700;
    border: 0 solid transparent;
    border-radius: 0.28571429rem;
    transition: background .1s ease;
}

.form-field.basic.pointing.label:before,
.form-field.basic[class*="pointing above"].label:before {
    margin-top: -5px;
}

.form-field.basic.pointing.label:before {
    border-color: inherit;
}

.form-field.pointing.label:before,
.form-field[class*="pointing above"].label:before {
    border-width: 1px 0 0 1px;
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
    top: 0;
    left: 50%;
}

.form-field.pointing.label:before {
    position: absolute;
    content: '';
    transform: rotate(45deg);
    background-image: none;
    z-index: 2;
    width: 0.6666em;
    height: 0.6666em;
    transition: background .1s ease;
}

.form-field.pointing.label:before {
    background-color: inherit;
    background-image: inherit;
    border-width: none;
    border-style: solid;
    border-color: inherit;
}
</style>