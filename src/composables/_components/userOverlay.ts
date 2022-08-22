import { ComponentInternalInstance, h, render } from "vue";
import Overlay from '~/components/k3/overlay.vue'

function createComponent(component: any, props: any, parentContainer: Element) {
    const vnode = h(component, props)
    const container = document.createElement('div')
    parentContainer.appendChild(container)
    render(vnode, container)

    return vnode.component
}

function removeElement(el: Element) {
    if (typeof el.remove !== 'undefined') {
        el.remove()
    } else {
        el.parentNode?.removeChild(el)
    }
}

export function useOverlay(globalProps: any = {}, globalSlots: any = {}) {
    let instance: ComponentInternalInstance | any = null

    const loader = {
        show(props: any = globalProps, slots: any = globalSlots) {
            const forceProps = { programatic: true, lockScroll: true, isFulPage: false }
            const propsData = Object.assign({}, globalProps, props, forceProps)
            let container = propsData.container

            if (!container) {
                container = document.body;
                propsData.isFulPage = true;
            }

            instance = createComponent(Overlay, propsData, container)
            const mergedSlots = Object.assign({}, globalSlots, slots)
            Object.keys(mergedSlots).map((name) => {
                if (instance !== null) instance.slots[name] = mergedSlots[name]
            })
        },
        hide() {
            if (instance !== null) {
                instance.ctx.hide()
                const root = instance.vnode.el
                removeElement(root.parentElment)
            }
        }
    }

    return loader
}