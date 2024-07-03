export default defineNuxtRouteMiddleware((to, from) => {
    if(to.path !== '/' && useAuthStore().isLoggedIn === false) {
        return navigateTo('/')
    }else if(to.path === '/' && useAuthStore().isLoggedIn === true) {
        return navigateTo('/home')
    }
})