<template>
    <div class="page-wrapper">
        <section class="page-header">
            <K3PageTitle />
        </section>
        <section class="page-content">
            <K3FormContainer>
                <template #header>Iframe Viewer</template>
                <template #footer>
                    <K3Button class="mr-2"
                              label="fetch"
                              @click.prevent="onFetch" />
                    <K3Button class="mr-2"
                              label="nuxt useFetch"
                              @click.prevent="onNuxtFetch" />
                    <K3Button class="mr-2"
                              label="@vueuse useFetch"
                              @click.prevent="onVueUseFetch" />
                </template>
                <K3FormRow>
                    <K3FormColumn vertical-layout
                                  :size="12">
                        {{ docs }}
                    </K3FormColumn>
                </K3FormRow>
            </K3FormContainer>
        </section>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default', title: 'API Tester', public: true })
// const props = defineProps({}),
// const emits = defineEmits(['eventname']),

const { API } = useAppHelper()

const docs = ref("")
const queries = ref("")

const url = 'http://192.168.88.151:32080/openapi/swagger/index.html#/'
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiVVVJRCI6ImY0MzNkMzIwLTBkZTgtNDNjZi05ZDBmLWJmMTJmNmZjNGY5MiIsIlVzZXJuYW1lIjoiYWRtaW4ua29yZXNlcnZlIiwiTmlja05hbWUiOiJzdXBlciBhZG1pbiIsIkF1dGhvcml0eUlEIjoiZ3JvdXA6YWRtaW4iLCJleHAiOjE2NjE5MzI1MTMsImlzcyI6IktPUkVTRVJWRSIsIm5iZiI6MTY2MTMyNjcxM30.PtzWPZdYWHZdCdAvnvl40-KiWxz5olYegoGteHudf2I"

const addQueries = (url) => url + (queries.value ? `?${queries.value}` : '')

const onFetch = () => {
    docs.value = ""
    fetch(addQueries(url), { headers: { Authorization: token } }).then(res => res.text()).then(data => docs.value = data)
}
const onNuxtFetch = async () => {
    docs.value = ""
    const { data } = await useFetch(addQueries(url), { initialCache: false, headers: { Authorization: token } })
    effect(() => docs.value = data.value as string)
}
const onVueUseFetch = async () => {
    docs.value = ""
    const { error, data, statusCode } = await API.call(addQueries(url), { headers: { Authorization: token } })
    docs.value = data.value as string
}

</script>

<style scoped lang="scss">
</style>