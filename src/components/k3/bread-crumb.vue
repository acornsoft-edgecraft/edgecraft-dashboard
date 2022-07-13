<template>
    <nav class="p-breadcrumb p-component"
         arial-label="Breadcrumb">
        <ul>
            <K3BreadCrumbItem v-if="home && model.length > 0"
                              class="p-breadcrumb-home"
                              :item="home"
                              :template="$slots.item"
                              :exact="exact" />
            <template v-for="item of model"
                      :key="item.label">
                <li class="p-breadcrumb-chevron pi pi-chevron-right"></li>
                <K3BreadCrumbItem :item="item"
                                  :template="$slots.item"
                                  :exact="exact" />
            </template>
        </ul>
    </nav>
</template>

<script setup lang="ts">
const props = defineProps({
    model: { type: Array<any>, default: null },
    home: { type: null, default: null },
    exact: { type: Boolean, default: true }
})
</script>

<style scoped lang="scss">
.p-breadcrumb {
    overflow-x: auto;
}

.p-breadcrumb ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
}

.p-breadcrumb .p-menuitem-text {
    line-height: 1;
}

.p-breadcrumb .p-menuitem-link {
    text-decoration: none;
}

.p-breadcrumb::-webkit-scrollbar {
    display: none;
}
</style>