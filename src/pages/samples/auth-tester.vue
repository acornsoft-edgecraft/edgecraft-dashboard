<template>
    <div class="page-wrapper">
        <section class="page-header">
            <K3PageTitle />
        </section>
        <section class="page-content">
            <K3FormContainer>
                <template #header>User Login</template>
                <template #footer>
                    <K3Button class="mr-2"
                              label="Users"
                              @click.prevent="onUsers" />

                    <K3Button class="mr-2"
                              label="Register"
                              @click.prevent="onRegister" />

                    <K3Button class="mr-2"
                              label="Login"
                              @click.prevent="onLogin" />
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
        </section>
    </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { IAuth, ILogin, defaultLogin, defaultLoginValidation } from '~/models'
definePageMeta({ layout: 'default', title: 'Auth Tester', public: true })
// const props = defineProps({}),
// const emits = defineEmits(['eventname']),

const { Auth, API, UI } = useAppHelper()

const users = ref([])
const login = ref(defaultLogin)
login.value = { email: 'ccambo@acornsoft.io', password: 'Passw0rd!!' }
const v$ = useVuelidate(defaultLoginValidation, login)

const columns = ref([
    { field: "id", header: "ID", sortable: true, class: '' },
    { field: "email", header: "Email", sortable: true, class: '' }
]);
const selectedColumns = ref(columns.value);

const columnSize = (field) => {
    let size = 0;
    switch (field) {
        case "id":
            size = 20;
            break;
        case "email":
            size = 73;
            break;
    }

    return `min-width: ${size}%`;
};

const onUsers = async () => {
    const res = await API.get('', 'api/v1/users')
    if (res.isError) {
        alert('오륜데? -_-')
    } else {
        users.value = res.data
    }
}

const onRegister = async () => {
    const res = await API.post('', 'api/v1/register', login.value)
    if (res.isError) {
        alert('오륜데? -_-')
    } else {
        alert('등록 됨!! ^^')
        onUsers()
    }
}

const onDelete = async (id) => {
    const res = await API.delete('', `api/v1/users/${id}`)
    if (res.isError) {
        alert('오륜데? -_-')
    } else {
        alert('삭제 됨!! ^^')
        onUsers()
    }
};

const onLogin = async () => {
    v$.value.$touch()

    if (!v$.value.$invalid) {
        const result = await Auth.login(login.value)
        if (!result) {
            alert('OK')
        } else {
            alert(result)
        }
    } else {
        alert('오류는 우짤라고?')
    }
}

onMounted(() => onUsers())

</script>

<style scoped lang="scss">
</style>