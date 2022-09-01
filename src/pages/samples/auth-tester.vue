<template>
    <div class="page-wrapper">
        <section class="page-header">
            <K3PageTitle />
        </section>
        <section class="page-content">
            <K3FormContainer>
                <template #header>User Login</template>
                <template #footer>
                    <div class="w-10 text-left">
                        Logged In: [{{ auth.isAuthenticated }}], Current User: [{{ auth.user || 'None' }}]
                    </div>
                    <div class="w-30 text-right">
                        <K3Button class="mr-2"
                                  label="Users"
                                  @click.prevent="onUsers" />

                        <K3Button class="mr-2"
                                  label="Register"
                                  @click.prevent="onRegister" />

                        <K3Button class="mr-2"
                                  v-if="!auth.isAuthenticated"
                                  label="Login"
                                  @click.prevent="onLogin" />

                        <K3Button class="mr-2"
                                  v-if="auth.isAuthenticated"
                                  label="Logout"
                                  @click.prevent="onLogout" />
                    </div>
                </template>
                <K3FormRow>
                    <K3FormColumn label="Email"
                                  label-align="right"
                                  :size="12">
                        <K3FormInputField class="w-full"
                                          v-model="v$.email"
                                          autofocus />
                    </K3FormColumn>
                    <K3FormColumn label="Pasword"
                                  label-align="right"
                                  :size="12">
                        <K3FormInputField class="w-full"
                                          v-model="v$.password" />
                    </K3FormColumn>
                </K3FormRow>
            </K3FormContainer>
            <K3DataTable class="mt-5"
                         :value="users"
                         dataKey="email"
                         :autoLayout="true"
                         :scrollable="true"
                         :scrollHeight="UI.tableSettings.scrollHeight"
                         selectionMode="single"
                         removableSort
                         :rows="10"
                         :paginator="false"
                         stripedRows>
                <template #loading>
                    <K3ProgressSpinner style="width: 50px; height: 50px"
                                       strokeWidth="8"
                                       fill="var(--surface-ground)"
                                       animationDuration=".5s" />
                </template>
                <template #empty>
                    <div class="w-full text-center">
                        <p class="text-orange-500">No users found.</p>
                    </div>
                </template>
                <!-- Columns -->
                <K3Column v-for="(col, index) of selectedColumns"
                          :class="col.class"
                          :field="col.field"
                          :header="col.header"
                          :sortable="col.sortable"
                          :key="`${col.field}_index`"
                          :headerStyle="columnSize(col.field)"
                          :bodyStyle="columnSize(col.field)">
                </K3Column>
                <K3Column header="Commands"
                          key="cmd"
                          class="flex justify-content-center"
                          headerStyle="min-width: 30px;"
                          bodyStyle="min-width: 30px;">
                    <template #body="slotProps">
                        <i class="fas fa-trash-can"
                           style="width: 10px; font-size: 1.5rem;"
                           @click="onDelete(slotProps.data.id)"></i>
                    </template>
                </K3Column>
            </K3DataTable>
            <K3DataTable class="mt-5"
                         :value="messages"
                         dataKey="id"
                         :autoLayout="true"
                         :scrollable="true"
                         :scrollHeight="UI.tableSettings.scrollHeight"
                         selectionMode="single"
                         removableSort
                         :rows="10"
                         :paginator="false"
                         stripedRows>
                <template #header>
                    <div class="flex flex-row justify-content-end">
                        <K3Button label="조회"
                                  @click="onQueryMessages" />
                    </div>
                </template>
                <template #loading>
                    <K3ProgressSpinner style="width: 50px; height: 50px"
                                       strokeWidth="8"
                                       fill="var(--surface-ground)"
                                       animationDuration=".5s" />
                </template>
                <template #empty>
                    <div class="w-full text-center">
                        <p class="text-orange-500">No messages found.</p>
                    </div>
                </template>
                <!-- Columns -->
                <K3Column v-for="(col, index) of mSelectedColumns"
                          :class="col.class"
                          :field="col.field"
                          :header="col.header"
                          :sortable="col.sortable"
                          :key="`${col.field}_index`"
                          :headerStyle="columnSize(col.field)"
                          :bodyStyle="columnSize(col.field)">
                </K3Column>
            </K3DataTable>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { defaultLogin, defaultLoginValidation, MessageTypes } from '~/models'
definePageMeta({ layout: 'default', title: 'Auth Tester', public: true })
// const props = defineProps({}),
// const emits = defineEmits(['eventname']),

const { Auth, API, UI } = useAppHelper()

const auth = Auth.get()
const users = ref([])
const messages = ref([])
const login = ref(defaultLogin)
login.value = { email: 'ccambo@acornsoft.io', password: 'Passw0rd!!' }
const v$ = useVuelidate(defaultLoginValidation, login)

const columns = ref([
    { field: "id", header: "ID", sortable: true, class: '' },
    { field: "email", header: "Email", sortable: true, class: '' }
]);
const selectedColumns = ref(columns.value);
const mColumns = ref([
    { field: "id", header: "ID", sortable: true, class: '' },
    { field: "message", header: "Message", sortable: true, class: '' }
]);
const mSelectedColumns = ref(mColumns.value);

const columnSize = (field) => {
    let size = 0;
    switch (field) {
        case "id":
            size = 20;
            break;
        case "email":
            size = 73;
            break;
        case "message":
            size = 80
            break;
    }

    return `min-width: ${size}%`;
};

const onUsers = async () => {
    const res = await API.get('', 'api/v1/users')
    if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "사용자 조회", `사용자를 조회할 수 없습니다. [${res.message}]`)
    } else {
        users.value = res.data
    }
}

const onRegister = async () => {
    const res = await API.post('', 'api/v1/register', login.value)
    if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "사용자 등록", `사용자 등록에 실패하였습니다. [${res.message}]`)
    } else {
        UI.showToastMessage(MessageTypes.INFO, "사용자 등록", `사용자 정보가 등록되었습니다.`)
        onUsers()
    }
}

const onDelete = async (id) => {
    const res = await API.delete('', `api/v1/users/${id}`)
    if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "사용자 삭제", `사용자 삭제에 실패하였습니다. [${res.message}]`)
        alert(`오륜데? -_- ==> [${res.message}, ${res.statusCode}]`)
    } else {
        UI.showToastMessage(MessageTypes.INFO, "사용자 삭제", `사용자 정보가 삭제되었습니다.`)
        onUsers()
    }
};

const onLogin = async () => {
    v$.value.$touch()

    if (!v$.value.$invalid) {
        const result = await Auth.login(login.value)
        if (!result) {
            UI.showToastMessage(MessageTypes.INFO, "로그인", `로그인 처리 되었습니다.`)
        }
    }
}

const onLogout = async () => {

}

const onQueryMessages = async () => {
    // TODO: check auth
    const res = await API.get('', 'api/v1/private/messages')
    if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "메시지 조회", `메시지를 조회할 수 없습니다. [${res.message}]`)
    } else {
        messages.value = res.data
    }
}

onMounted(() => onUsers())

</script>

<style scoped lang="scss">
</style>