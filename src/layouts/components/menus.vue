<template>
    <div class="mb-3 layout-menu-items">
        <ul v-if="items">
            <template v-for="(item, i) of items">
                <li v-if="visible(item) && !item.separator"
                    :key="item.label || i"
                    :class="[{ 'layout-menuitem-category': root, 'active-menuitem': activeIndex === i && !item.to && !item.disabled }]"
                    role="none">
                    <template v-if="root">
                        <div class="layout-menuitem-root-text">{{ item.label }}</div>
                        <menus :items="visible(item) && item.items"
                               @menuitem-click="$emit('menuitem-click', $event)"></menus>
                    </template>
                    <template v-else>
                        <router-link v-if="item.to"
                                     :to="item.to"
                                     :class="[item.class, 'p-ripple', { 'p-disabled': item.disabled }]"
                                     :style="item.style"
                                     @click="onMenuItemClick($event, item, i)"
                                     :target="item.target"
                                     exact
                                     role="menuitem"
                                     v-ripple>
                            <i :class="item.icon"></i>
                            <span>{{ item.label }}</span>
                            <i v-if="item.items"
                               class="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>
                            <K3Badge v-if="item.badge"
                                     :value="item.badge"></K3Badge>
                        </router-link>
                        <a v-if="!item.to"
                           :href="item.url || '#'"
                           :style="item.style"
                           :class="[item.class, 'p-ripple', { 'p-disabled': item.disabled }]"
                           @click="onMenuItemClick($event, item, i)"
                           :target="item.target"
                           role="menuitem"
                           v-ripple>
                            <i :class="item.icon"></i>
                            <span>{{ item.label }}</span>
                            <i v-if="item.items"
                               class="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>
                            <K3Badge v-if="item.badge"
                                     :value="item.badge"></K3Badge>
                        </a>
                        <transition name="layout-submenu-wrapper">
                            <menus v-show="activeIndex === i"
                                   :items="visible(item) && item.items"
                                   @menuitem-click="$emit('menuitem-click', $event)"></menus>
                        </transition>
                    </template>
                </li>
                <li class="p-menu-separator"
                    :style="item.style"
                    v-if="visible(item) && item.separator"
                    :key="'separator' + i"
                    role="separator"></li>
            </template>
        </ul>
    </div>
</template>

<script setup lang="ts">
// imports
// Props
const props = defineProps({
    items: Array<any>,
    root: {
        type: Boolean,
        default: false,
    },
});
// Emits
const emits = defineEmits(["menuitem-click"]);
// Properties
const activeIndex = ref(null);
// Compputed
// Watcher
// Methods
const visible = (item) => {
    return typeof item.visible === "function" ? item.visible() : item.visible !== false;
};

const onMenuItemClick = (event, item, index) => {
    if (item.disabled) {
        event.preventDefault();
        return;
    }

    if (!item.to && !item.url) {
        event.preventDefault();
    }

    //execute command
    if (item.command) {
        item.command({ originalEvent: event, item: item });
    }
    activeIndex.value = index === activeIndex.value ? null : index;

    emits("menuitem-click", {
        originalEvent: event,
        item: item,
    });
};
// Events
// Logics (like api call, etc)
</script>

<style scoped lang="scss">
</style>