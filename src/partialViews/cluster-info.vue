<template>
    <div class="partial-container m-0 p-0">
        <K8SInfo class="mb-3"
                 v-model="state.k8s"
                 :v="v$.k8s" />
        <BaremetalInfo class="mb-3"
                       v-model="state.secret"
                       :v="v$.secret" />
    </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import K8SInfo from './k8s-info.vue'
import BaremetalInfo from './baremetal-info.vue'

const props = defineProps({
    modelValue: { type: Object, required: true },
    v: { type: Object, required: true }
})
const emits = defineEmits(['can-continue'])

const state = reactive({
    k8s: {
        version: '',
        pod_cidr: '',
        svc_cidr: '',
    },
    secret: {
        secret_name: '',
        user_name: '',
        password: '',
    }
})

const rules = {
    k8s: {
        version: { required },
        pod_cidr: { required },
        svc_cidr: { required }
    },
    secret: {
        secret_name: { required },
        user_name: { required },
        password: { required }
    }
}

const v$ = useVuelidate(rules, state)

watch(() => v$.value, (val) => {
    console.log(`watch >>> ${val.$invalid}`)
    if (!val.$invalid) {
        emits('can-continue', { value: true })
    }
})

const beforeNextStep = (): boolean => {
    v$.value.$touch()

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
</style>