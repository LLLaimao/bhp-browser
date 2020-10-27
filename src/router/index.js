import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../pages/Index.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: '/home',
    children: [
      { path: '/home', name: 'home', component: () => import('../pages/modules/Home.vue') },
      { path: '/transactions', name: 'transactions', component: () => import('../pages/modules/Transactions.vue') },
      { path: '/block', name: 'block', component: () => import('../pages/modules/Block.vue') },
      { path: '/blockMessage', name: 'blockMessage', component: () => import('../pages/modules/BlockMessage.vue') },
      { path: '/assets', name: 'assets', component: () => import('../pages/modules/Assets.vue') },
      { path: '/assetInfo', name: 'assetInfo', component: () => import('../pages/modules/AssetInfo.vue') },
      { path: '/addresses', name: 'addresses', component: () => import('../pages/modules/Addresses.vue') },
      { path: '/detailsTran', name: 'detailsTran', component: () => import('../pages/modules/DetailsTran.vue') },
      { path: '/registerAdd', name: 'registerAdd', component: () => import('../pages/modules/RegisterAdd.vue') },
      { path: '/contracts', name: 'contracts', component: () => import('../pages/modules/Contracts.vue') },
      { path: '/contractMessage', name: 'contractMessage', component: () => import('../pages/modules/ContractMessage.vue') },
      
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
