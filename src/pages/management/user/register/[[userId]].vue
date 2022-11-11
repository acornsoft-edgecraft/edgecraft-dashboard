<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content">
      <K3FormContainer>
        <K3FormRow>
          <K3FormColumn label="Email" label-align="right">
            <K3FormInputField v-model="v$.email" field-name="Email" class="w-30rem" :disabled="existsEmail" />
            <K3Button label="이메일 중복체크" @click="onCheckEmail" :disabled="existsEmail" class="align-self-start" />
          </K3FormColumn>
        </K3FormRow>
        <K3FormRow>
          <K3FormColumn label="Name" label-align="right">
            <K3FormInputField v-model="v$.name" field-name="Name" class="w-30rem" />
          </K3FormColumn>
        </K3FormRow>
        <K3FormRow>
          <K3FormColumn label="Password" label-align="right">
            <K3FormPasswordField v-model="v$.password" field-name="Password" :toggle-mask="true" inputClass="w-30rem" />
          </K3FormColumn>
        </K3FormRow>
        <K3FormRow>
          <K3FormColumn label="Role" label-align="right">
            <K3FormDropdownField v-model="v$.role" :options="UserRolesMap()" :option-label="'name'" :option-value="'value'" field-name="Role" class="w-15rem" />
          </K3FormColumn>
        </K3FormRow>
      </K3FormContainer>

      <div class="flex button-wrapper">
        <div class="flex-grow-1 flex-shrink-1 flex align-items-start justify-content-start">
          <K3Button label="삭제" icon="pi pi-trash" class="p-button-danger" @click="onDelete" v-if="userId" />
        </div>
        <div class="flex-grow-1 flex-shrink-1 flex align-items-end justify-content-end">
          <NuxtLink :to="list">
            <K3Button label="취소" icon="pi pi-times" class="p-button-secondary" />
          </NuxtLink>
          <K3Button :label="label" icon="pi pi-check" @click="onSubmit" />
        </div>
      </div>
      <K3Overlay :active="active" loader="bars" background-color="#830205" />
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
const userId = route.params.userId || "";
const existsEmail = ref(false);
const list = "/management/user";
const label = userId ? `수정` : `등록`;

definePageMeta({ layout: "default", title: "User Management", public: true });

const v$ = UI.getValidate(defaultUserInfoValidation, user);

const active = computed(() => unref(isFetch || isInsFetch || isUpFetch || isDelFetch));

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
const onSubmit = async () => {
  v$.value.$touch();

  if (v$.value.$invalid) return;
  if (!existsEmail.value) {
    UI.showMessage(MessageTypes.ERROR, "이메일 중복체크", "이메일 중복체크를 해주세요.");
    return;
  }

  let result;
  try {
    result = userId ? await upFetch(userId, user.value) : await insFetch(user.value);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, `사용자 ${label}`, err);
  }
  if (!result) return;

  UI.showToastMessage(MessageTypes.INFO, `사용자 ${label}`, `사용자를 ${label}하였습니다.`);
  Routing.moveTo(list);
};
const onDelete = () => {
  UI.showConfirm(MessageTypes.ERROR, "사용자 삭제", "사용자를 삭제하시겠습니까?", deleteUser, () => {});
};
const deleteUser = async () => {
  let result;
  try {
    result = await delFetch(userId);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, "사용자 삭제", err);
  }
  if (!result) return;

  UI.showToastMessage(MessageTypes.INFO, "사용자 삭제", `사용자를 삭제하였습니다.`);
  Routing.moveTo(list);
};
const getUser = async () => {
  let result;
  try {
    result = await fetch(userId);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, "사용자 정보", err);
  }
  if (!result) {
    Routing.moveTo(list);
  }
};

onMounted(() => {
  if (userId) {
    getUser();
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
