import Vue from 'vue'
import axios from './axios'
Vue.prototype.$axios = axios

import App from './App.vue'
import router from "./router";
import store from './store'

//secure key
import VueCryptojs from 'vue-cryptojs'
Vue.use(VueCryptojs)

//import css
import './assets/css/responsive.css'
import './assets/css/main.css'
import "swiper/swiper-bundle.css";
// import icon 
import './assets/boxIcon/css/boxicons.min.css'
import 'material-icons/iconfont/material-icons.css';

//vue shared transition
import {
  SharedElementRouteGuard,
  SharedElementDirective
} from 'v-shared-element'
Vue.use(SharedElementDirective)

//Vue Moment
Vue.use(require("vue-moment"));

//share
import VueSocialSharing from 'vue-social-sharing'
Vue.use(VueSocialSharing);

//zoomer
import ProductZoomer from "vue-product-zoomer";
Vue.use(ProductZoomer)
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax)


//Vue Slider
import VueAgile from 'vue-agile'
Vue.use(VueAgile)

//vue lazy load
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'image/error.png',
  loading: 'image/loading.gif',
  attempt: 1
})

//vue  smooth scroll
import vueSmoothScroll from 'vue2-smooth-scroll'
Vue.use(vueSmoothScroll)


//vue back to top
import VmBackTop from 'vue-multiple-back-top'
Vue.component(VmBackTop.name, VmBackTop)

//transition 
import Transitions from 'vue2-transitions'
Vue.use(Transitions)

//languages
import i18n from './i18n'
Vue.config.productionTip = false
router.beforeEach(SharedElementRouteGuard)

new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')
