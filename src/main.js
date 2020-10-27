import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import i18n from './i18n/i18n'
import 'element-ui/lib/theme-chalk/index.css'
import Moment from 'moment'
import './assets/js/rem';
import localTime from './assets/js/localTime';
import toThousands from './assets/js/toThousands';
import './assets/styles/common.less'
Vue.prototype.moment = Moment
Vue.prototype.localTime = localTime
Vue.prototype.toThousands = toThousands
Vue.use(ElementUI)
Vue.config.productionTip = false

router.afterEach(() => {
  window.scrollTo(0, 0);
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
