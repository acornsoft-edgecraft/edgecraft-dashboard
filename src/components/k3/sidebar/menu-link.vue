<template>
    <a v-if="isHyperLink"
       v-bind="$attrs">
        <slot />
    </a>
    <router-link v-else
                 v-slot="{ href, navigate }"
                 custom
                 :to="$attrs.href">
        <a v-bind="$attrs"
           :href="href"
           @click="navigate">
            <slot />
        </a>
    </router-link>
</template>

<script setup lang="ts">
const props = defineProps({
    item: { type: Object, required: true }
})

const isHyperLink = computed(() => !props.item.href || props.item.external)
</script>

<style scoped lang="scss">
</style>