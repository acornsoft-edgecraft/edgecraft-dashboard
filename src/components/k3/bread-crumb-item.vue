<template>
    <li :class="containerClass(item)"
        v-if="visible(item)">
        <template v-if="!template">
            <router-link v-if="item.to"
                         :to="item.to"
                         custom
                         v-slot="{ navigate, href, isActive, isExactActive }">
                <a :href="href"
                   :class="linkClass({ isActive, isExactActive })"
                   @click="onClick($event, navigate)">
                    <span v-if="item.icon"
                          :class="iconClass"></span>
                    <span v-if="item.label"
                          class="p-menuitem-text">{{ label(item) }}</span>
                </a>
            </router-link>
            <a v-else-if="item.url"
               :href="item.url || '#'"
               :class="linkClass(item)"
               @click="onClick"
               :target="item.target">
                <span v-if="item.icon"
                      :class="iconClass"></span>
                <span v-if="item.label"
                      class="p-menuitem-text">{{ label(item) }}</span>
            </a>
            <div v-else>
                <span v-if="item.icon"
                      :class="iconClass"></span>
                <span v-if="item.label"
                      class="p-menuitem-text p-plain-text">{{ label(item) }}</span>
            </div>
        </template>
    </li>
</template>

<script setup lang="ts">
import { isTemplateElement } from '@babel/types';


const props = defineProps({
    item: null, template: null, exact: null
})

const containerClass = (item) => [{ 'p-disabled': disabled(item) }, item.class]
const linkClass = (routerProps) => ['p-menuitem-link', {
    'router-link-active': routerProps && routerProps.isActive,
    'router-link-active-exact': props.exact && routerProps && routerProps.isExactActive
}]
const visible = (item) => typeof item.visible === 'function' ? item.visible() : item.visible !== false
const disabled = (item) => typeof item.disabled === 'function' ? item.disabled() : item.disabled
const label = (item) => typeof item.label === 'function' ? item.label() : item.label

const iconClass = computed(() => ['p-menuitem-icon', props.item.icon])

const onClick = (event?, navigate?) => {
    if (props.item.command) {
        props.item.command({ originalEvent: event, item: props.item })
    }
    if (props.item.to && navigate) navigate(event)
}
</script>

<style scoped lang="scss">
.p-plain-text {
    cursor: default;
}
</style>