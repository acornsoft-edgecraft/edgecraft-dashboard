<template>
    <div class="layout-sidebar flex flex-column">
        <div class="logo-container flex flex-row align-items-center justify-content-center">
            <button class="flex flex-column toggle-button align-items-center"
                    @click="$emit('toggleSidebar')">
                <i class="fas fa-bars"></i>
            </button>
            <div class="flex flex-column logo">
                <Logo />
            </div>
        </div>
        <div class="info-container flex flex-row justify-content-center">
            <!-- <div class="flex flex-column context-container p-3">
                <Context />
            </div>
            <div class="flex flex-1 flex-column menu-container pt-3">
                <Menus :items="menu"
                       class="layout-menu"
                       :root="true"
                       @menuitem-click="onMenuItemClick" />
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * 여기서는 해당 화면 생성 이전에 처리할 설정을 구성합니다.
 * this 등의 사용이 불가능합니다.
 */
// imports
// import Menus from "./panel-menu.vue";
// import Context from "./context.vue";
import Logo from "./logo.vue";
//
// Properties
// Props
// Emits
const emits = defineEmits(['toggleSidebar'])
//const emits = defineEmits(["menuitem-click", "toggleMenu"]);
// Compputed
//const menu = computed(() => StateHelper.user.get().value.menus);
// Watcher
// Methods
// const onMenuItemClick = (event) => {
//     emits("menuitem-click", event);
// };
// Events
</script>
