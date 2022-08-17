<template>
    <K3Dialog header="Labels 설정"
              v-model:visible="display"
              :modal="true"
              :style="{ width: '50vw' }"
              @hide="onHide">
        <K3FormContainer class="no-style">
            <K3ValidateEach v-for="(item, index) in items"
                            :key="index"
                            :state="(item as any)"
                            :rules="vRules">
                <template #default="{ v }">
                    <K3FormRow direction="horizontal">
                        <K3FormColumn label="Key"
                                      label-align="right"
                                      label-width="100px"
                                      :size="5">
                            <K3FormInputField class="w-full"
                                              v-model="v.key"
                                              field-name="Key" />
                        </K3FormColumn>
                        <K3FormColumn label="Value"
                                      label-align="right"
                                      label-width="100px"
                                      :size="6">
                            <K3FormInputField class="w-full"
                                              v-model="v.value"
                                              field-name="Value" />
                        </K3FormColumn>
                        <K3FormColumn :size="1"
                                      item-align="center">
                            <K3Button icon="pi pi-times"
                                      class="p-button-rounded p-button-outlined"
                                      @click="removeItem(index)" />
                        </K3FormColumn>
                    </K3FormRow>
                </template>
            </K3ValidateEach>
            <K3FormRow direction="horizontal">
                <K3FormColumn :size="12"
                              item-align="right">
                    <K3Button v-if="items.length > 0"
                              class="mr-2"
                              label="Clear All"
                              @click="clearItems" />
                    <K3Button label="Add"
                              @click="addItem" />
                </K3FormColumn>
            </K3FormRow>
        </K3FormContainer>
        <template #footer>
            <K3Button label="CLOSE"
                      icon="pi pi-times"
                      @click="close"
                      class="p-button-text" />
            <K3Button label="OK"
                      icon="pi pi-check"
                      @click="ok"
                      autofocus />
        </template>
    </K3Dialog>
</template>

<script setup lang="ts">
import { MessageTypes } from '~/models';

const { UI, Util } = useAppHelper()
const { required } = UI.getValidators()

const props = defineProps({
    modelValue: { type: Array<Object>, default: () => { } },
    display: { type: Boolean, default: false },
    closeLabel: { type: String, default: 'CLOSE' },
    okLabel: { type: String, default: 'OK' }
})
const emits = defineEmits(['close', 'ok'])

const items = ref([])
const v = UI.getValidate();

const vRules = {
    key: { required },
    value: { required }
}
const addItem = () => {
    items.value.push({ key: "", value: "" })
}
const clearItems = () => {
    items.value.splice(0, items.value.length)
}
const removeItem = (index) => {
    items.value.splice(index, 1)
}
const close = () => {
    clearItems()
    items.value.push(...Util.clone(props.modelValue))
    emits('close')
}
const ok = () => {
    v.value.$touch()
    if (v.value.$invalid) {
        UI.showMessage(MessageTypes.WARN, "필수항목 검증", "Key/Value를 모두 입력하셔야 합니다.")
    } else {
        emits('ok', Util.clone(items.value))
    }
}
const onHide = () => {
    emits('close')
}

onMounted(() => {
    items.value.push(...Util.clone(props.modelValue))
})
</script>

<style scoped lang="scss">
</style>