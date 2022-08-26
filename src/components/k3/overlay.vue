<template>
    <transition :name="transition">
        <div ref="root"
             tabindex="0"
             class="comp-overlay is-active"
             :class="{ 'is-full-page': isFullPage }"
             v-show="isActive"
             :aria-busy="isActive"
             aria-label="Loading"
             :style="{ zIndex }">
            <div class="comp-background"
                 @click.prevent="cancel"
                 :style="bgStyle" />
            <div class="comp-icon"
                 :style="`z-index: ${zIndex + 1}`">
                <slot name="before" />
                <slot name="default">
                    <K3LoadersBars v-if="loader === 'bars'"
                                   :color="color"
                                   :width="width"
                                   :height="height" />
                    <K3LoadersBarsEq v-if="loader === 'bars_eq'"
                                     :color="color"
                                     :width="width"
                                     :height="height" />
                    <K3LoadersBarsBound v-if="loader === 'bars_bound'"
                                        :color="color"
                                        :width="width"
                                        :height="height" />
                    <K3LoadersBarsTrans v-if="loader === 'bars_trans'"
                                        :color="color"
                                        :width="width"
                                        :height="height" />
                    <K3LoadersDots v-if="loader === 'dots'"
                                   :color="color"
                                   :width="width"
                                   :height="height" />
                    <K3LoadersSpinner v-if="loader === 'spinner'"
                                      :color="color"
                                      :width="width"
                                      :height="height" />
                </slot>
                <slot name="after" />
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
interface BgStyle {
    background: string | undefined;
    opacity: number | undefined;
    backdropFilter: string | undefined;
}

const props = defineProps({
    active: Boolean,
    programmatic: Boolean,
    container: [Object, Function, HTMLElement],
    isFullPage: { type: Boolean, default: false, },
    enforceFocus: { type: Boolean, default: true, },
    lockScroll: { type: Boolean, default: false, },
    transition: { type: String, default: "fade", },
    canCancel: Boolean,                                         // Allow user to hide the loader
    onCancel: { type: Function, default: () => { return; }, },  // Do something on cancel
    color: String,
    backgroundColor: String,
    blur: { type: String, default: "2px", },
    opacity: Number,
    width: Number,
    height: Number,
    zIndex: { type: Number, default: 9001, },
    loader: { type: String, default: "bars", },
});
const emits = defineEmits(['hide', 'update:active'])

const root = ref(null)
const isActive = ref<boolean>(props.active)

const bgStyle = computed(() => {
    const ret = { background: props.backgroundColor, opacity: props.opacity, backdropFilter: `blur(${props.blur}` };
    return ret;
})

watch(() => props.active, () => { isActive.value = props.active })
watch(isActive, () => {
    isActive.value ? disableScroll() : enableScroll()
})

const hide = () => {
    emits('hide')
    emits('update:active', false)
    // Timeout for the animation complete before destroying
    if (props.programmatic) {
        isActive.value = false;
        setTimeout(() => { return }, 150)
    }
}

const cancel = () => {
    if (!props.canCancel || !isActive.value) return;

    hide()
    props.onCancel()
}

const disableScroll = () => {
    if (props.isFullPage && props.lockScroll) {
        document.body.classList.add('comp-shown');
    }
}

const enableScroll = () => {
    if (props.isFullPage && props.lockScroll) {
        document.body.classList.remove('comp-shown')
    }
}

const onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
        cancel()
    }
}

onMounted(() => {
    if (props.programmatic) {
        isActive.value = true
        document.addEventListener("keyup", onKeyUp)
    }
})

onUnmounted(() => {
    document.removeEventListener("keyup", onKeyUp)
})
</script>

<style scoped lang="scss">
.comp-shown {
    overflow: hidden;
}

.comp-overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    align-items: center;
    display: none;
    justify-content: center;
    overflow: hidden;
    z-index: 99999;
}

.comp-overlay.is-active {
    display: flex;
}

.comp-overlay.is-full-page {
    z-index: 99999;
    position: fixed;
}

.comp-overlay .comp-background {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: lightslategrey;
    opacity: 0.3;
}

.comp-overlay .comp-icon .comp-parent {
    position: relative;
}

.comp-icon {
    z-index: translateZ(1px);
}
</style>