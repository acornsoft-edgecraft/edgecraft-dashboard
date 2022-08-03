<template>
    <div class="form-container">
        <div class="top"
             v-if="!!slots['header']">
            <slot name="header"></slot>
        </div>
        <div class="content">
            <slot />
        </div>
        <div class="bottom"
             v-if="!!slots['footer']">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
const slots = useSlots()
</script>

<style scoped lang="scss">
.form-container {
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.22);
    margin: 0;
    padding: 0.25rem;
    font-size: 1rem;

    .top {
        margin: 0.25rem;
        padding: 0.25rem 1rem;
        background-color: #324354;
        display: flex;
        align-items: center;
        position: relative;
        justify-content: center;
        min-height: 3rem;
        color: white;
        font-weight: 600;
        font-size: 1.25rem;
    }

    .content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow: hidden;
        margin: 0.25rem;
        padding: 0.25rem;
        border: 1px solid darkgrey;
        background-color: whitesmoke;
        justify-content: center;
    }

    .bottom {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0.25rem;
        padding: 1rem;
        border-top: 1px solid #cccccc;
        justify-content: flex-end;
    }
}
</style>