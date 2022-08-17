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
                                          field-name="Name" />
                    </K3FormColumn>
                </K3FormRow>
                <K3FormRow>
                    <K3FormColumn label="Cloud 유형"
                                  label-align="right">
                        <K3FormDropdownField v-model="v.type"
                                             :options="CloudTypesMap()"
                                             :option-label="'name'"
                                             :option-value="'value'"
                                             field-name="Type" />
                    </K3FormColumn>
                </K3FormRow>
                <K3FormRow>
                    <K3FormColumn label="Cloud 설명"
                                  label-align="right">
                        <K3FormTextareaField v-model="v.desc"
                                             rows="4"
                                             class="w-full" />
                    </K3FormColumn>
                </K3FormRow>
                <K3FormRow>
                    <K3FormColumn label="Labels"
                                  label-align="right">
                        <K3FormKeyValueField v-model="v.labels"
                                             caption="Labels 설정" />
                    </K3FormColumn>
                </K3FormRow>
            </K3FormContainer>

            <br />
            Model Result: {{ defaultCloudInfo }}
            <br />

            <K3FormContainer class="mt-5 mb-5">
                <template #header>Baremetal 설치 정보</template>
                <K3FormRow>
                    <K3FormColumn label="BMC Credential"
                                  label-align="right">
                        <K3FormContainer class="no-style w-full">
                            <K3FormRow direction="vertical">
                                <K3FormColumn label="Secret Name"
                                              label-align="right">
                                    <K3FormInputField v-model="v2.secret_name"
                                                      field-name="Secret name" />
                                </K3FormColumn>
                                <K3FormColumn label="User Name"
                                              label-align="right">
                                    <K3FormInputField v-model="v2.user_name"
                                                      field-name="User name" />
                                </K3FormColumn>
                                <K3FormColumn label="Password"
                                              label-align="right">
                                    <K3FormInputField v-model="v2.password"
                                                      field-name="User password" />
                                </K3FormColumn>
                                <K3FormColumn label="Kubeadm Extra Config"
                                              label-align="right">
                                    <K3Accordion class="w-full"
                                                 :activeIndex="0">
                                        <K3AccordionTab header="Test">
                                            <K3Textarea v-model="defaultCloudInfo.desc"
                                                        rows="4"
                                                        class="w-full" />
                                        </K3AccordionTab>
                                    </K3Accordion>
                                </K3FormColumn>
                            </K3FormRow>
                        </K3FormContainer>
                    </K3FormColumn>
                </K3FormRow>
            </K3FormContainer>

            <br />
            Model Result: {{ defaultBaremetalInfo }}
            <br />

            <K3FormContainer class="mt-5 mb-5">
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
import { CloudTypes, CloudTypesMap, cloudInfo } from '~/models';

definePageMeta({ layout: 'default', title: 'Form Tester', public: true })

const { required, minLength } = useAppHelper().UI.getValidators()

const defaultCloudInfo = ref({
    name: "ff",
    type: CloudTypes.Baremetal,
    desc: "",
    labels: [{ key: '1', value: '1' }, { key: '2', value: '2' }, { key: '3', value: '3' }, { key: '4', value: '4' }, { key: '5', value: '5' }, { key: '6', value: '6' }, { key: '7', value: '7' }]
});
const defaultCloudInfoValidation = {
    name: { required, minLength: minLength(4) },
    type: { required },
    desc: { required },
    labels: { required }
};
const defaultBaremetalInfo = ref({
    secret_name: "ㅁㅁ",
    user_name: "ㅇㅇ",
    password: "ㄹㄹ",
});
const defaultBaremetalInfoValidation = {
    secret_name: { required },
    user_name: { required },
    password: { required },
};

const v = useAppHelper().UI.getValidate(defaultCloudInfoValidation, defaultCloudInfo)
const v2 = useAppHelper().UI.getValidate(defaultBaremetalInfoValidation, defaultBaremetalInfo)
</script>

<style scoped lang="scss">
</style>