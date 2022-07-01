<template>
    <div class=" layout-footer flex blue-container p-2">
        Footer
        <div class="flex info">
            <!-- <div class="flex-none align-items-center justify-content-center mr-2">{{ (clusterInfo as any).kubernetesVersion }}</div>
            <div class="flex-none align-items-center justify-content-center mr-2">{{ (clusterInfo as any).platform }}</div> -->
        </div>
        <div class="flex-grow-1 flex" />
        <div class="flex-none flex version-logo align-items-center justify-content-center">
            <!-- <K3MemoryViewer /> -->
            <div class="mr-2"><b>Version </b> {{ version }} By</div>
            <div class="flex logo"><img alt="Logo"
                     src="/images/acornsoft_logo.png" /></div>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * 여기서는 해당 화면 생성 이전에 처리할 설정을 구성합니다.
 * this 등의 사용이 불가능합니다.
 */
// imports
// Properties
// const { context } = ContextService();
// const { clusterInfo } = await ClusterService().clusterFetch(context.value.currentContext);
// Compputed
const version = computed(() => useRuntimeConfig().version);
// Watcher
// Methods
// Events
// Logics
</script>

<style scoped lang="scss">
</style>
