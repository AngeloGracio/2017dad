
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
import VueResources from 'vue-resource';
import VueSocketio from 'vue-socket.io';
import AuthResource from './auth/Auth';

Vue.use(VueRouter);
Vue.use(VueResources);
Vue.use(AuthResource);

const HomeCmp = Vue.component('home-page', require('./components/HomePageComponent.vue'));
const LoginCmp = Vue.component('login', require('./components/Login.vue'));
const LogoutCmp = Vue.component('logout', require('./components/Logout.vue'));
const ProfileCmp = Vue.component('profile', require('./components/Profile.vue'));
const RegisterCmp = Vue.component('register', require('./components/Register.vue'));
const AdminCmp = Vue.component('register', require('./components/Admin.vue'));
const PicCmp = Vue.component('register', require('./components/Picture.vue'));
const JogoCmp = Vue.component('jogo', require('./components/singleplayer_memory.vue'));
const LobbyCmp = Vue.component('jogo-mp', require('./components/lobby.vue'))

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: HomeCmp
    },
    {
        path: '/login',
        component: LoginCmp,
        meta:{
            forVisitor: true
        }
    },
    {
        path: '/register',
        component: RegisterCmp,
        meta:{
            forVisitor: true
        }
    },
    {
        path: '/logout',
        component: LogoutCmp,
        meta:{
            forAuth: true
        }
    },
    {
        path: '/admin',
        component: AdminCmp,
        meta:{
            forAdmin: true
        }
    },
    {
        path: '/pic',
        component: PicCmp,
        meta:{
            forAdmin: true
        }
    },
    {
        path: '/profile',
        component: ProfileCmp,
        meta:{
            forAuth: true
        }
    },
    {
        path: '/jogo',
        component: JogoCmp,
        meta:{
            forAuth: true
        }
    },
        {
        path: '/lobby',
        component: LobbyCmp,
        meta:{
            forAuth: true
        }
    },
];

const router = new VueRouter({
    routes:routes
});



router.beforeEach(
    (to,from, next)  => {
        if (to.matched.some(record => record.meta.forVisitor)){
            if (Vue.auth.isAutenticated()){
                next({
                    path: '/home'
                })
            } else{
                next()
            }
        }
        else if (to.matched.some(record => record.meta.forAuth)){
            if (!Vue.auth.isAutenticated()){
                next({
                    path: '/login'
                })
            } else{
                next()
            }
        }
        else if (to.matched.some(record => record.meta.forAdmin)){
            if (!Vue.auth.isAutenticated()) {
                next({
                    path: '/login'
                })
            }
            /*
            if (! this.userLog.nickname == 'admin'){
                console.log("Not Admin");
                next({
                    path: '/home'
                })
            }
            */
            else {
                next()
            }
        }
        else{
            next()
        }
    }
);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//Vue.component('example-component', require('./components/ExampleComponent.vue'));
const app = new Vue({
    router,
    data:{
        userLog: undefined,
    }
}).$mount('#app');