
<template>
  <div class="confirmation-content">
    <i :class="iconClass" style="font-size: 1.5rem;"></i>
    <pre class="pl-4">{{ message }}</pre>
  </div>
  <div class="flex justify-content-end">
    <K3Button label="No" icon="pi pi-times" @click="closeDialog({ buttonType: false })" class="p-button-text"></K3Button>
    <K3Button label="Yes" icon="pi pi-check" @click="closeDialog({ buttonType: true })" autofocus></K3Button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";

const iconStyle = ref({
  font_size: "1.5rem",
  color: "blue"
});

const iconClass = ref("");
const message = ref("");
const dialogRef = inject("dialogRef");

onMounted(() => {
  iconClass.value = dialogRef.value.data.iconClass + " " + "pi pl-2"
  message.value = dialogRef.value.data.message;
});

const closeDialog = (e) => {
  dialogRef.value.close(e);
};
</script>

<style scoped lang="scss">
.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: left;
}
</style>
