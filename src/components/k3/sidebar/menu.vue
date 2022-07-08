<template>
    <div ref="sidebarMenuRef"
         class="v-sidebar-menu"
         :class="sidebarClass"
         :style="{ 'max-width': sidebarWidth }">
        <slot name="header" />
        <K3SidebarMenuScroll>
            <ul class="vsm--menu"
                :style="{ 'width': sidebarWidth }">
                <K3SidebarMenuItem v-for="item in computedMenu"
                                   :key="item.id"
                                   :item="item">
                    <template #dropdown-icon="{ isOpen }">
                        <slot name="dropdown-icon"
                              v-bind="{ isOpen }">
                            <span class="vsm--arrow_default" />
                        </slot>
                    </template>
                </K3SidebarMenuItem>
            </ul>
        </K3SidebarMenuScroll>
        <slot name="footer" />
        <button v-if="!hideToggle"
                class="vsm--toggle-btn"
                @click="onToggleClick">
            <slot name="toggle-icon">
                <span class="vsm--toggle-btn_default" />
            </slot>
        </button>
    </div>
</template>

<script setup lang="ts">
import { initSidebarMenu } from '~/composables/_components'

const props = defineProps({
    menu: { type: Array, required: true },
    collapsed: { type: Boolean, default: false },
    width: { type: String, default: '290px' },
    widthCollapsed: { type: String, default: '65px' },
    showChild: { type: Boolean, default: false },
    theme: { type: String, default: '' },
    showOneChild: { type: Boolean, default: false },
    rtl: { type: Boolean, default: false },
    relative: { type: Boolean, default: false },
    hideToggle: { type: Boolean, default: false },
    disableHover: { type: Boolean, default: false },
    linkComponentName: { type: String, default: undefined }
})
const emits = defineEmits(['item-click', 'update:collapsed'])
const context = getCurrentInstance()

const { getSidebarRef: sidebarMenuRef, getIsCollapsed: isCollapsed, updateIsCollapsed, unsetMobileItem, updateCurrentRoute } = initSidebarMenu(props, context)

const computedMenu = computed(() => {
    let id = 0
    function transformItems(items) {
        function randomId() {
            return `${Date.now() + '' + id++}`
        }
        return items.map(item => {
            return { id: randomId(), ...item, ...(item.child && { child: transformItems(item.child) }) }
        })
    }
    return transformItems(props.menu)
})

const sidebarWidth = computed(() => {
    return isCollapsed.value ? props.widthCollapsed : props.width
})

const sidebarClass = computed(() => {
    return [
        !isCollapsed.value ? 'vsm_expanded' : 'vsm_collapsed',
        props.theme ? `vsm_${props.theme}` : '',
        props.rtl ? 'vsm_rtl' : '',
        props.relative ? 'vsm_relative' : ''
    ]
})

const onToggleClick = () => {
    unsetMobileItem()
    updateIsCollapsed(!isCollapsed.value)
    context.emit('update:collapsed', isCollapsed.value)
}

watch(() => props.collapsed, (currentCollapsed) => {
    unsetMobileItem()
    updateIsCollapsed(currentCollapsed)
})

const router = getCurrentInstance().appContext.config.globalProperties.$router
if (!router) {
    onMounted(() => {
        window.addEventListener('hashchange', updateCurrentRoute)
    })
    onUnmounted(() => {
        window.removeEventListener('hashchange', updateCurrentRoute)
    })
}
</script>

<style scoped lang="scss">
</style>