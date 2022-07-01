<template>
  <h1 class="flex m-0">
    <span class="flex title-marker mr-1">{{ marker }}</span>
    {{ title }}
    <button v-if="addNew"
            type="button"
            @click="moveTo">
      <i class="icon-button pi pi-plus-circle"></i>
    </button>
  </h1>
</template>

<script setup lang="ts">
/**
 * 여기서는 해당 화면 생성 이전에 처리할 설정을 구성합니다.
 * this 등의 사용이 불가능합니다.
 */
// imports
//import { MessageTypes } from "~/models/enums";

// Props
const props = defineProps({
  addNew: { type: Boolean, default: false },
  group: { type: String, default: "" },
  resource: { type: String, default: "" },
});
// Emits
// const emits = defineEmits(['eventname'])
// Properties
const title = ref(useRoute().meta.title as string);
// Compputed
const marker = computed(() => title.value.charAt(0).toUpperCase());
// Watcher
// Methods
const moveTo = () => {
  // if (props.group && props.resource) {
  //   useRouter().push(`/cluster/create?group=${props.group}&resource=${props.resource}`);
  // } else {
  //   UIHelper.showToastMessage(MessageTypes.ERROR, "리소스 생성", "리소스 유형이 지정되지 않았습니다.");
  // }
};
// Events
// Logics (like api call, etc)
</script>

<style scoped lang="scss">
.title-marker {
  color: #ffffff;
  background-color: #17a2b8;
  display: inline-block;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: top;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

h1 {
  border-bottom: 1px solid #dee2e6;
}

button {
  border: none;
}

.icon-button {
  padding-top: 6px;
  font-size: 1.8rem;
  color: slategray;
  cursor: pointer;
}
</style>
