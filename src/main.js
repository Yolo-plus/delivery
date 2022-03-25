import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store'  // 默认是index
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import loading from './common/images/loading.gif'

Vue.component(Button.name, Button)
Vue.use(VueLazyload, {
  loading
})

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router,
  store
})