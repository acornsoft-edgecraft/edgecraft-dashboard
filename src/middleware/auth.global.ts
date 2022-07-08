export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAppHelper().State.auth.get()

    console.log(`Middleware(AUTH) called >> ${JSON.stringify(auth.value)}`)

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