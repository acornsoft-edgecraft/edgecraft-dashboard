<template>
    <div class="component-container card">
        <div class="step-container">
            <K3Steps :model="steps"
                     :readonly="readonly" />
        </div>
        <router-view v-slot="{ Component }"
                     :formData="data"
                     @prev-page="prevPage($event)"
                     @next-page="nextPage($event)"
                     @complete="complete">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup lang="ts">
const router = useRouter()

const props = defineProps({
    steps: { type: Array<any>, default: null },
    data: { type: Object, default: null },
    readonly: { type: Boolean, default: true },
    exact: { type: Boolean, default: true }
})

const prevPage = (event) => { }
const nextPage = (event) => { }
const complete = () => { }

</script>

<style scoped lang="scss">
</style>