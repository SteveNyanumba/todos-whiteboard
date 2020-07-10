
require('bootstrap')
require('popper.js')
require('@popperjs/core')
require('@fortawesome/fontawesome-free')
const{AlertError, HasError,Form} = require('v-form')
const store = require('./store')

import VueRouter from 'vue-router'

window.$ = window.jquery = require('jquery')
//Initializing the Vue instances

window.axios = require('axios')
window.Vue = require('vue')


Vue.use(VueRouter)
//ROUTES
const routes = [
    {
        path: '/',
        component: require('./components/Todos.vue').default
    },
    {
        path: '/user/login',
        component: require('./components/login.vue').default
    },
    {
        path: '/user/register',
        component: require('./components/Register.vue').default
    }
]



window.Form = Form
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

Vue.component('App',require('./App.vue').default)
Vue.component('Navbar',require('./components/Navbar.vue').default)



window.Swal = require('sweetalert2')
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
}
})
window.Toast = Toast

const router = new VueRouter({
    routes,
    mode: 'history'
})

const app = new Vue({
    store,
    router,
    el:"#app"
    
})
