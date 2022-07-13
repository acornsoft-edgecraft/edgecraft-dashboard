<template>
  <div class="logo-container">
    <NuxtLink :to="to">
      <img alt="Logo"
           :src="source" />
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  source: { type: String, default: '/images/edgecraft_logo.png' },
  to: { type: String, default: '/' }
})
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
