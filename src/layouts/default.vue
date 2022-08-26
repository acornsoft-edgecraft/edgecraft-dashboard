<template>
    <div class="layout-container flex flex-column">
        <Header />
        <div class="layout-main flex flex-row">
            <K3SidebarMenu v-model:collapsed="collapsed"
                           :menu="menus"
                           :show-one-child="true"
                           @update:collapsed="onToggleCollapsed"
                           @item-click="onItemClicked" />
            <div class="page-scroller flex-grow-1">
                <div class="page-container w-full">
                    <slot />
                </div>
                <K3ScrollTop target="parent"
                             :threshold="100" />
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Footer from "./components/footer.vue";
import Header from "./components/header.vue";

const { State } = useAppHelper()

const collapsed = false

const separator = {
    template: '<hr style="border: 0.175rem inset rgba(255, 255, 255, 0.7); margin: 10px 20px 10px 20px;">'
}

const menus = computed(() => State.getUser()?.value?.menus.map(m => {
    if (m.separator) {
        delete m.separator
        m.component = markRaw(separator)
    }

    return m
}))

const onToggleCollapsed = (collapsed) => {
    // TODO: Sidebar Menu Collapsed 상태에 따른 처리 (필요한 경우)
}

const onItemClicked = (event, item) => {
    // TODO: Menu Item 클릭에 따른 처리 (필요한 경우)
}
</script>

<style scoped lang="scss">
:deep(.p-scrolltop) {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
}
</style>