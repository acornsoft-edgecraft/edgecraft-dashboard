<template>
  <svg version="1.1"
       id="Layer_1"
       xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink"
       x="0px"
       y="0px"
       :width="width"
       :height="height"
       :fill="color"
       viewBox="0 0 30 30"
       style="enable-background:new 0 0 30 30;"
       xml:space="preserve">
    <rect x="0"
          y="0"
          width="4"
          height="10"
          :fill="color">
      <animateTransform attributeType="xml"
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 20; 0 0"
                        begin="0"
                        dur="0.6s"
                        repeatCount="indefinite" />
    </rect>
    <rect x="10"
          y="0"
          width="4"
          height="10"
          :fill="color">
      <animateTransform attributeType="xml"
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 20; 0 0"
                        begin="0.2s"
                        dur="0.6s"
                        repeatCount="indefinite" />
    </rect>
    <rect x="20"
          y="0"
          width="4"
          height="10"
          :fill="color">
      <animateTransform attributeType="xml"
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 20; 0 0"
                        begin="0.4s"
                        dur="0.6s"
                        repeatCount="indefinite" />
    </rect>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  color: { type: String, default: "#FF7700" },
  height: { type: Number, default: 64 },
  width: { type: Number, default: 64 },
});
</script>

<style scoped lang="scss">
</style>