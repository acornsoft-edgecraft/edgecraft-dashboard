import { useSidebar } from "./useSidebarMenu";
import { activeRecordIndex, isSameRouteLocationParams, includesParams } from './useRouterLink'

export default function useMenuItem(props) {
    // const router = getCurrentInstance().appContext.config.globalProperties.$router
    const router = useRouter()
    const {
        getSidebarProps: sidebarProps,
        getIsCollapsed: isCollapsed,
        getActiveShow: activeShow,
        getMobileItem: mobileItem,
        getMobileItemRect: mobileItemRect,
        getCurrentRoute: currentRoute,
        updateActiveShow,
        setMobileItem,
        unsetMobileItem,
        clearMobileItemTimeout,
        emitItemClick
    } = useSidebar()
    const emitScrollUpdate = inject('emitScrollUpdate') as any
    const itemShow = ref(false)
    const itemHover = ref(false)

    const isLinkActive = (item, exact: boolean = false) => {
        if (!item.href || item.external) return false
        if (router) {
            const route = router.resolve(item.href)
            const routerCurrentRoute = router.currentRoute.value
            const activeIndex = activeRecordIndex(route, routerCurrentRoute)
            if (exact || item.exact) {
                return activeIndex > -1 &&
                    activeIndex === routerCurrentRoute.matched.length - 1 &&
                    isSameRouteLocationParams(routerCurrentRoute.params, route.params)
            }
            return activeIndex > -1 &&
                includesParams(routerCurrentRoute.params, route.params)
        } else {
            return item.href === currentRoute.value
        }
    }

    const isChildActive = (child) => {
        if (!child) return false
        return child.some(item => {
            return isLinkActive(item) || isChildActive(item.child)
        })
    }

    const active = computed(() => {
        return isLinkActive(props.item) || isChildActive(props.item.child)
    })

    const exactActive = computed(() => {
        return isLinkActive(props.item, true)
    })

    const show = computed({
        get: () => {
            if (!hasChild.value) return false
            if (isCollapsed.value && isFirstLevel.value) return hover.value
            if (sidebarProps.showChild) return true
            return sidebarProps.showOneChild && isFirstLevel.value ? props.item.id === activeShow.value : itemShow.value
        },
        set: show => {
            if (sidebarProps.showOneChild && isFirstLevel.value) {
                show ? updateActiveShow(props.item.id) : updateActiveShow(null)
            }
            itemShow.value = show
        }
    })

    const hover = computed(() => {
        return (isCollapsed.value && isFirstLevel.value) ? isMobileItem.value : itemHover.value
    })

    const isFirstLevel = computed(() => {
        return props.level === 1
    })

    const isHidden = computed(() => {
        if (isCollapsed.value) {
            if (props.item.hidden && props.item.hiddenOnCollapse === undefined) {
                return true
            } else {
                return props.item.hiddenOnCollapse === true
            }
        } else {
            return props.item.hidden === true
        }
    })

    const hasChild = computed(() => {
        return !!(props.item.child && props.item.child.length > 0)
    })

    const linkClass = computed(() => {
        return [
            'vsm--link',
            `vsm--link_level-${props.level}`,
            { 'vsm--link_mobile': isMobileItem.value },
            { 'vsm--link_hover': hover.value },
            { 'vsm--link_active': active.value },
            { 'vsm--link_disabled': props.item.disabled },
            { 'vsm--link_open': show.value },
            props.item.class
        ]
    })

    const linkAttrs = computed(() => {
        const href = props.item.href ? props.item.href : '#'
        const target = props.item.external ? '_blank' : '_self'
        const tabindex = props.item.disabled ? -1 : null
        const ariaCurrent = exactActive.value ? 'page' : null
        const ariaHaspopup = hasChild.value ? true : null
        const ariaExpanded = hasChild.value ? show.value : null

        return {
            href,
            target,
            tabindex,
            'aria-current': ariaCurrent,
            'aria-haspopup': ariaHaspopup,
            'aria-expanded': ariaExpanded,
            ...props.item.attributes
        }
    })

    const itemClass = computed(() => {
        return [
            'vsm--item',
            { 'vsm--item_mobile': isMobileItem.value }
        ]
    })

    const isMobileItem = computed(() => {
        return props.item.id === mobileItem.value?.id
    })

    const mobileItemDropdownStyle = computed(() => {
        return [
            { position: 'absolute' },
            { top: `${mobileItemRect.value.top + mobileItemRect.value.height}px` },
            !sidebarProps.rtl ? { left: sidebarProps.widthCollapsed } : { right: sidebarProps.widthCollapsed },
            { width: `${mobileItemRect.value.maxWidth}px` },
            { 'max-height': `${mobileItemRect.value.maxHeight}px` },
            { 'overflow-y': 'auto' }
        ]
    })

    const mobileItemStyle = computed(() => {
        return [
            { position: 'absolute' },
            { top: `${mobileItemRect.value.top}px` },
            !sidebarProps.rtl ? { left: sidebarProps.widthCollapsed } : { right: sidebarProps.widthCollapsed },
            { width: `${mobileItemRect.value.maxWidth}px` },
            { height: `${mobileItemRect.value.height}px` },
            { 'padding-right': `${mobileItemRect.value.padding}` },
            { 'padding-left': `${mobileItemRect.value.padding}` },
            { 'z-index': '20' }
        ]
    })

    const mobileItemBackgroundStyle = computed(() => {
        return [
            { position: 'absolute' },
            { top: `${mobileItemRect.value.top}px` },
            !sidebarProps.rtl ? { left: '0px' } : { right: '0px' },
            { width: `${mobileItemRect.value.maxWidth + parseInt(sidebarProps.widthCollapsed)}px` },
            { height: `${mobileItemRect.value.height}px` },
            { 'z-index': '10' }
        ]
    })

    const onLinkClick = (event) => {
        if (!props.item.href || props.item.disabled) {
            event.preventDefault()
            if (props.item.disabled) return
        }

        emitMobileItem(event, event.currentTarget.parentElement)

        if (hasChild.value) {
            if (!props.item.href || active.value) {
                show.value = !show.value
            }
        }

        emitItemClick(event, props.item)
    }

    const onMouseOver = (event) => {
        if (props.item.disabled) return
        event.stopPropagation()
        itemHover.value = true
    }

    const onMouseOut = (event) => {
        event.stopPropagation()
        itemHover.value = false
    }

    const onMouseEnter = (event) => {
        if (props.item.disabled) return
        if (sidebarProps.disableHover) {
            if (isMobileItem.value && hasChild.value) {
                clearMobileItemTimeout()
            }
        } else {
            clearMobileItemTimeout()
            emitMobileItem(event, event.currentTarget)
        }
    }

    const onMouseLeave = () => {
        if (sidebarProps.disableHover && !hasChild.value) return
        if (isMobileItem.value) {
            unsetMobileItem(false, !sidebarProps.disableHover ? 300 : undefined)
        }
    }

    const emitMobileItem = (event, itemEl) => {
        if (isMobileItem.value) return
        if (isCollapsed.value) {
            setTimeout(() => {
                if (isFirstLevel.value) {
                    if (!isMobileItem.value) {
                        setMobileItem({ item: props.item, itemEl })
                    }
                }
                if (event.type === 'click' && !hasChild.value) {
                    unsetMobileItem(false, !isFirstLevel.value ? 300 : undefined)
                }
            }, 0)
        }
    }

    const onExpandEnter = (el) => {
        el.style.height = el.scrollHeight + 'px'
    }

    const onExpandAfterEnter = (el) => {
        el.style.height = 'auto'
        if (!isCollapsed.value) {
            emitScrollUpdate()
        }
    }

    const onExpandBeforeLeave = (el) => {
        if (isCollapsed.value && isFirstLevel.value) {
            el.style.display = 'none'
            return
        }
        el.style.height = el.scrollHeight + 'px'
    }

    const onExpandAfterLeave = () => {
        if (!isCollapsed.value) {
            emitScrollUpdate()
        }
    }

    watch(() => active.value, () => {
        if (active.value) {
            show.value = true
        }
    }, {
        immediate: true
    })

    return {
        active,
        exactActive,
        show,
        hover,
        isFirstLevel,
        isHidden,
        hasChild,
        linkClass,
        linkAttrs,
        itemClass,
        isMobileItem,
        mobileItemDropdownStyle,
        mobileItemStyle,
        mobileItemBackgroundStyle,
        onLinkClick,
        onMouseOver,
        onMouseOut,
        onMouseEnter,
        onMouseLeave,
        onExpandEnter,
        onExpandAfterEnter,
        onExpandBeforeLeave,
        onExpandAfterLeave
    }
}