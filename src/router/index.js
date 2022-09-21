import Vue from 'vue'
import VueRouter from 'vue-router'
import Back from '@/components/Backset.vue'
import App from '@/App.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/app',
  name: 'App',
  component: App
},
{
  path: '/',
  component: App
},
{
  path: '/back',
  name: 'Back',
  component: Back
}
]

const router = new VueRouter({
  routes
})

export default router
