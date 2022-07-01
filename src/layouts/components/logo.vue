<template>
  <div class="logo-container">
    <img alt="Logo"
         src="favicon.svg" />
    <span class="brand-text text-info font-bold align-bottom"> K</span>
    <span class="align-bottom">ore</span>
    <sup>
      <i class="fas fa-sm fa-cubes ml-1 text-warning"></i>
    </sup>
    <span class="brand-text text-info font-bold align-bottom"
          text-sm
          ml-1> C</span>
    <span class="align-bottom">onsole</span>
  </div>
</template>

<script setup>
/**
 * 여기서는 해당 화면 생성 이전에 처리할 설정을 구성합니다.
 * this 등의 사용이 불가능합니다.
 */
// Props
// const props = defineProps({}),
// Emits
// const emits = defineEmits(['eventname']),
// Properties
// Compputed
// Watcher
// Methods
// Events
</script>

<style scoped lang="scss">
.logo-container {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;
  border-radius: 0px;

  img {
    height: 2.5rem;
    margin-right: 0.5rem;
  }

  .brand-text {
    display: inline-block;
    margin-left: 0;
    opacity: 1;
    visibility: visible;
  }

  .text-info {
    color: #17a2b8 !important;
  }

  a.text-info:focus,
  a.text-info:hover {
    color: #0f6674 !important;
  }

  .text-warning {
    color: #ffc107 !important;
  }

  a.text-warning:focus,
  a.text-warning:hover {
    color: #ba8b00 !important;
  }

  .font-weight-bold {
    font-weight: 700 !important;
  }

  .align-bottom {
    vertical-align: bottom !important;
  }

  sub,
  sup {
    position: relative;
    font-size: 75%;
    line-height: 0;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }
}
</style>
