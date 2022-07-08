<template>
    <div class="app-container">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
// imports
import { Chart } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

/**
 * 초기화
 */
useAppHelper().initialize()

// Chartjs 설정
Chart.register(annotationPlugin);
</script>

<style scoped lang="scss">
</style>