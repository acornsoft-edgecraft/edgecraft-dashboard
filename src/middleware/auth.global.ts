const { Auth } = useAppHelper();

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = Auth.get();
  if (auth.value.isAuthenticated) {
    if (to.path === "/login") {
      if (from.path === "/login") return navigateTo("/");
      return navigateTo(from.path);
    }
  } else {
    if (!to.meta.public) {
      return navigateTo("/login");
    }
  }
});
