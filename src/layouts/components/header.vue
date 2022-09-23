<template>
  <div class="layout-header flex flex-row p-2">
    <Logo />
    <HeaderTitle />
    <ul class="menu hidden lg:flex origin-top" v-if="auth.isAuthenticated">
      <li>
        <K3Button class="p-link button">
          <i class="pi pi-calendar"></i>
          <span>Events</span>
        </K3Button>
      </li>
      <li>
        <K3Button class="p-link button">
          <i class="pi pi-cog"></i>
          <span>Settings</span>
        </K3Button>
      </li>
      <li>
        <K3Button class="p-link button">
          <i class="pi pi-user"></i>
          <span>Profile</span>
        </K3Button>
      </li>
      <li>
        <K3Button class="p-link button" @click="onLogout">
          <i class="pi pi-sign-out"></i>
          <span>Logout</span>
        </K3Button>
      </li>
    </ul>
    <ul class="menu hidden lg:flex origin-top" v-else>
      <li>
        <K3Button class="p-link button" @click="onLogin">
          <i class="pi pi-sign-in"></i>
          <span>Login</span>
        </K3Button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import HeaderTitle from "./header-title.vue";
import Logo from "./logo.vue";

import { MessageTypes } from "~/models";
/**
 * 여기서는 해당 화면 생성 이전에 처리할 설정을 구성합니다.
 * this 등의 사용이 불가능합니다.
 */
// Properties
const { UI, Auth, Routing } = useAppHelper();

const auth = Auth.get();
const messages = ref([]);
// Compputed
// Watcher
// Methods
const onLogin = () => {
  Routing.moveTo("/login");
};
const onLogout = () => {
  UI.showConfirm(
    MessageTypes.INFO,
    "로그아웃",
    "로그아웃 하시겠습니까?",
    () => {
      Auth.logout(false).then((logoutAuth) => {
        if (logoutAuth.isAuthenticated) {
          UI.showToastMessage(MessageTypes.WARN, "로그아웃", "로그아웃 처리중 문제가 발생하였습니다.");
        } else {
          UI.showToastMessage(MessageTypes.INFO, "로그아웃", "로그아웃 처리되었습니다.");
          auth.value = logoutAuth;
          messages.value = [];
          Routing.moveTo("/login");
        }
      });
    },
    () => {
      UI.showToastMessage(MessageTypes.INFO, "로그아웃", "로그아웃이 취소되었습니다.");
    }
  );
};
</script>

<style scoped lang="scss"></style>
