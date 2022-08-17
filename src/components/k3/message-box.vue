<template>
  <div class="message-box-container">
    <K3Dialog :header="msg.title"
              v-model:visible="msg.display"
              :modal="true">
      <i class="message-icon"
         :class="icon"></i>
      <span class="p-confirm-dialog-message">
        {{ msg.content }}
      </span>
      <template #footer>
        <K3Button label="OK"
                  icon="pi pi-ok"
                  @click="closeModal"
                  autofocus />
      </template>
    </K3Dialog>
  </div>
</template>

<script setup>
const props = defineProps({ msg: {} });

const icon = computed(() => {
  return `icon pi ${props.msg.severity === "success" ? "pi-check" : props.msg.severity === "info" ? "pi-info-circle" : props.msg.severity === "warn" ? "pi-exclamation-triangle" : "pi-times-circle"}`;
});

const closeModal = () => {
  props.msg.display = false;
};
</script>

<style scoped lang="scss">
.p-dialog-content {
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  justify-content: center;


  .message-icon {
    padding-right: 10px;
    font-size: 2rem;
  }

  .p-confirm-dialog-message {
    position: relative;
    top: -0.5rem;
  }
}
</style>
