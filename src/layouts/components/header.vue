<template>
    <div class="layout-header flex flex-row p-2">
        <Logo />
        <HeaderTitle />
        <ul class="menu hidden lg:flex origin-top">
            <li>
                <button class="p-link button">
                    <i class="pi pi-calendar"></i>
                    <span>Events</span>
                </button>
            </li>
            <li>
                <button class="p-link button">
                    <i class="pi pi-cog"></i>
                    <span>Settings</span>
                </button>
            </li>
            <li>
                <button class="p-link button">
                    <i class="pi pi-user"></i>
                    <span>Profile</span>
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import HeaderTitle from "./header-title.vue";
import Logo from "./logo.vue";

/**
 * 여기서는 해당 화면 생성 이전에 처리할 설정을 구성합니다.
 * this 등의 사용이 불가능합니다.
 */
// Properties
// Compputed
// Watcher
// Methods
// Emits
</script>

<style scoped lang="scss">
</style>
