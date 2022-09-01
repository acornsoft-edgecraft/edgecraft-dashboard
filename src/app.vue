<template>
    <div class="app-container">
        <K3Toast position="top-right"
                 group="tr" />
        <K3Toast position="top-left"
                 group="tl" />
        <K3Toast position="bottom-left"
                 group="bl" />
        <K3Toast position="bottom-right"
                 group="br" />
        <K3ConfirmDialog />
        <K3MessageBox :msg="msg" />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
// imports
import { StateKeys, defaultMessageType } from "~/models";
import { Chart } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

// 초기화
useAppHelper().initialize()

const msg = useAppHelper().State.state(StateKeys.MESSAGE, () => defaultMessageType);

// Chartjs 설정
Chart.register(annotationPlugin);
</script>

<style scoped lang="scss">
</style>