<template>
  <div class="page-container">
    <div class="page-wrapper">
      <!-- <section class="page-header">
        <K3PageTitle />
      </section> -->
      <section class="page-content">
        <div class="login-container">
          <div class="content grid">
            <div class="col-12 xl:col-6">
              <div class="login-wrapper">
                <div class="logo">
                  <Logo />
                </div>
                <div class="form-container no-style md:w-10">
                  <label for="email">Email</label>
                  <K3FormInputField v-model="v$.email" field-name="Email" id="email" class="w-full" placeholder="Email" />
                  <label for="password">Password</label>
                  <K3FormPasswordField v-model="v$.password" field-name="Password" inputId="password" class="w-full" inputClass="w-full" placeholder="Password" :toggleMask="true" />

                  <div class="button-wrapper">
                    <K3Button label="Sign In" class="p-button-lg w-full" @click="onSignIn" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// imports
import Logo from "~/layouts/components/logo.vue";
import { defaultLoginValidation, defaultLogin, MessageTypes } from "~/models";

// Page meta
definePageMeta({ layout: "empty", title: "Login", public: true });
// Props
const { UI, Auth, Routing } = useAppHelper();
// const props = defineProps({}),
// Emits
// const emits = defineEmits(['eventname']),
// Properties
// const auth = ref();
const auth = Auth.get();
const login = ref(defaultLogin);
const v$ = UI.getValidate(defaultLoginValidation, login);
// Compputed
// Watcher

// Methods
const hasAuth = () => {
  const auth = unref(Auth.get());

  return auth.isAuthenticated;
};
const onSignIn = async () => {
  v$.value.$touch();

  if (v$.value.$invalid) return;

  auth.value = await Auth.login(login.value);
  if (auth.value.isAuthenticated) {
    UI.showToastMessage(MessageTypes.INFO, "로그인", `로그인 처리 되었습니다.`);
    Routing.moveTo("/dashboard");
  }
};

onMounted(() => {
  if (auth.value.isAuthenticated) {
    Routing.moveTo("/dashboard");
  }
});
// Logics (like api call, etc)
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  overflow: hidden;

  .content {
    justify-content: center;
    padding: 0.5rem;
    min-width: 80%;

    .login-wrapper {
      width: 100%;
      height: 100%;
      border-radius: 33px;
      background: var(--surface-0);
      padding: 2rem 1.5rem 2rem 1.5rem;

      .logo {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
      }
      .form-container.no-style {
        box-shadow: none;
        margin-left: auto;
        margin-right: auto;

        label {
          font-size: 1.25rem;
          font-weight: 500;
        }
        .item-container {
          margin-top: 0.5rem;
          margin-bottom: 1rem;

          :deep(.p-inputtext) {
            padding: 1rem;
          }
        }
      }

      .button-wrapper {
        margin-top: 1rem;
        :deep(.p-button) {
          padding: 1rem;
        }
      }
    }
  }
}
</style>
