<template>
    <div class="page-wrapper">
        <section class="page-header">
            <K3PageTitle />
        </section>
        <section class="page-content mt-2">
            <K3FormContainer>
                <template #header>CLOUD 정보</template>
                <K3FormRow>
                    <K3FormColumn label="Cloud 명"
                                  label-align="right">
                        <K3FormInputField v-model="v.name"
                                          class="w-full"
                                          field-name="Name" />
                    </K3FormColumn>
                </K3FormRow>
                <K3FormRow>
                    <K3FormColumn>TEST</K3FormColumn>
                </K3FormRow>
                <K3FormRow>
                    <K3FormColumn>TEST</K3FormColumn>
                </K3FormRow>
            </K3FormContainer>
            <K3FormContainer>
                <template #header>Form Header</template>
                <template #footer>Footer</template>
                <K3FormRow direction="horizontal"
                           :overflow-wrap="true">
                    <K3FormColumn label="TEST A"
                                  label-align="left"
                                  vertical-layout
                                  :size="6">
                        <K3InputText class="w-full"
                                     v-tooltip.bottom="'Test Tooltips'" />
                    </K3FormColumn>
                    <K3FormColumn label="TEST B"
                                  vertical-layout
                                  :size="6">
                        <K3InputText class="w-full" />
                    </K3FormColumn>
                    <K3FormColumn label="TEST C"
                                  label-align="left"
                                  :size="6">
                        <K3InputText class="w-full" />
                    </K3FormColumn>
                    <K3FormColumn label="TEST D"
                                  label-align="right"
                                  :size="6">
                        <K3InputText class="w-full" />
                    </K3FormColumn>
                </K3FormRow>
            </K3FormContainer>
        </section>
    </div>
</template>

<script setup lang="ts">
import { CloudTypesMap, cloudInfo, defaultCloudReg, defaultCloudInfoValidation } from '~/models';

definePageMeta({ layout: 'default', title: 'Form Tester', public: true })

const v = useAppHelper().UI.getValidate(defaultCloudInfoValidation, ref(defaultCloudReg.cloud as cloudInfo))
</script>

<style scoped lang="scss">
</style>