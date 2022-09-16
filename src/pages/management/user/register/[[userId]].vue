<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <K3FormContainer>
        <K3FormColumn label="Email" label-align="right">
          <K3FormInputField v-model="v$.email" field-name="Email" class="w-30rem" :disabled="existsEmail" />
          <K3Button label="이메일 중복체크" @click="onCheckEmail" :disabled="existsEmail" />
        </K3FormColumn>
        <K3FormColumn label="Name" label-align="right">
          <K3FormInputField v-model="v$.name" field-name="Name" class="w-30rem" />
        </K3FormColumn>
        <K3FormColumn label="Password" label-align="right">
          <K3FormPasswordField v-model="v$.password" field-name="Password" :toggle-mask="true" inputClass="w-30rem" />
        </K3FormColumn>
        <K3FormColumn label="Role" label-align="right">
          <K3FormDropdownField v-model="v$.role" :options="UserRolesMap()" :option-label="'name'" :option-value="'value'" field-name="Role" class="w-15rem" />
        </K3FormColumn>
      </K3FormContainer>

      <div class="flex button-wrapper">
        <div class="flex-grow-1 flex-shrink-1 flex align-items-start justify-content-start">
          <K3Button label="삭제" icon="pi pi-trash" class="p-button-danger" @click="onDelete" v-if="userId > 0" />
        </div>
        <div class="flex-grow-1 flex-shrink-1 flex align-items-end justify-content-end">
          <NuxtLink to="/management/user">
            <K3Button label="취소" icon="pi pi-times" class="p-button-secondary" />
          </NuxtLink>
          <K3Button label="등록" icon="pi pi-check" @click="onSubmit" />
        </div>
      </div>
      <K3Overlay :active="isFetch || isInsFetch || isUpFetch || isDelFetch" loader="bars" background-color="#830205" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { defaultUserInfoValidation, MessageTypes, UserRolesMap } from "~/models";

const { user, isFetch, fetch } = useUserService().getUser();
const { isInsFetch, insFetch } = useUserService().insertUser();
const { isUpFetch, upFetch } = useUserService().updateUser();
const { isDelFetch, delFetch } = useUserService().deleteUser();
const { UI, Routing } = useAppHelper();

const route = useRoute();
const userId = route.params.userId || 0;
const existsEmail = ref(false);

definePageMeta({ layout: "default", title: "User Management", public: true });
// const props = defineProps({}),
// const emits = defineEmits(['eventname']),
const v$ = UI.getValidate(defaultUserInfoValidation, user);

const onCheckEmail = () => {
  v$.value.email.$touch();
  if (v$.value.email.$invalid) return;

  // TODO: call api
  const val = true;
  if (val) {
    UI.showMessage(MessageTypes.SUCCESS, "이메일 중복체크", "사용 가능한 이메일입니다.");
    existsEmail.value = true;
  } else {
    UI.showMessage(MessageTypes.ERROR, "이메일 중복체크", "사용할 수 없는 이메일입니다.");
  }
};
const onSubmit = () => {
  v$.value.$touch();

  if (v$.value.$invalid) return;
  if (!existsEmail.value) {
    UI.showMessage(MessageTypes.ERROR, "이메일 중복체크", "이메일 중복체크를 해주세요.");
    return;
  }

  // TODO: call api
  if (userId > 0) {
    upFetch(userId, user.value);
  } else {
    insFetch(user.value);
  }
  Routing.moveTo("/management/user");
};
const onDelete = () => {
  UI.showConfirm(
    MessageTypes.ERROR,
    "사용자 삭제",
    "사용자를 삭제하시겠습니까?",
    () => {
      // TODO: call api
      delFetch(userId);
      Routing.moveTo("/management/user");
    },
    () => {}
  );
};
onMounted(() => {
  fetch(userId);

  if (userId > 0) {
    existsEmail.value = true;
  }
});
</script>

<style scoped lang="scss">
.form-container {
  margin-top: 1rem;

  .p-button {
    margin-left: 0.5rem;
  }
}

.button-wrapper {
  margin-top: 1rem;
  .p-button {
    width: 7rem;
    margin-left: 0.5em;
  }
}
</style>
