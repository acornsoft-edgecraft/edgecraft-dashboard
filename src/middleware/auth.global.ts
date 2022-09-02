const { Auth } = useAppHelper()

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = Auth.get()
    if (auth.value.isAuthenticated) {
        if (to.path === '/login') {
            return navigateTo(from.path)
        }
    } else {
        if (!to.meta.public) {
            return navigateTo('/login')
        }
    }
})