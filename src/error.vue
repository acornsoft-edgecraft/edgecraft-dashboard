<template>
  <div class="app-container">
    <div class="error-container">
      <div class="content grid">
        <div class="col-12 xl:col-6">
          <div class="error-wrapper">
            <div class="logo">
              <Logo />
            </div>
            <h1>{{ error.statusCode }}</h1>
            <hr />
            <h4>{{ error.message }}</h4>
            <div class="button-wrapper">
              <NuxtLink to="/cloud">
                <i class="pi pi-home" />
                Go Home
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from "~/layouts/components/logo.vue";

const props = defineProps({
  error: Object,
});
</script>
<style scope lang="scss">
.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  overflow: hidden;

  .content {
    justify-content: center;
    padding: 0.5rem;
    min-width: 80%;

    .error-wrapper {
      width: 100%;
      height: 100%;
      border-radius: 33px;
      background: var(--surface-0);
      padding: 3rem 2rem 4rem;

      .logo {
        display: flex;
        margin: 0;
      }

      h1,
      h4,
      p,
      div.button-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      hr {
        width: 50%;
        margin-left: auto;
        margin-right: auto;
      }

      .button-wrapper {
        margin-top: 4rem;

        i {
          margin-right: 0.5rem;
        }
      }
    }
  }
}
</style>
