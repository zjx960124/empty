import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueContextMenu from 'vue-contextmenu'
import vuescroll from 'vuescroll'
import VueClipboard from 'vue-clipboard2'
import Print from 'vue-print-nb'
import scroll from 'vue-seamless-scroll'


import '@/styles/index.scss'
import '@/styles/common.scss'
import '@/assets/font/font.css'

import App from './App'
import store from './store'
import router from './router'

import '@/icons'
import '@/permission'
import globalVariable from '@/api/global_variable'
import '@/utils/dialog'
import PageForm from '@/components/PageForm'
import PageTable from '@/components/PageTable'
import JsTree from '@/components/JsTree'
import Tinymce from '@/components/tinymce/index.vue'
import pinyin from 'js-pinyin'
import FormBuild from '@/views/draw/build/index';
import formCreate from '@form-create/element-ui'
import FcDesigner from '@form-create/designer'



import {
  sameKeySetValue,
  isEmpty,
  filterParams
} from '@/utils/index'
import {
  processingImgUrl
} from '@/utils/common'

import fontSize from '@/utils/css'


Vue.prototype.pinyin = pinyin
Vue.prototype.globalData = globalVariable
Vue.prototype.sameKeySetValue = sameKeySetValue
Vue.prototype.isEmpty = isEmpty
Vue.prototype.filterParams = filterParams
Vue.prototype.processingImgUrl = processingImgUrl
Vue.prototype.fontSize = fontSize;
VueClipboard.config.autoSetContainer = true

Vue.filter('locale', function (val) {
  return Number.isFinite(val) ? val.toLocaleString('zh', { style: 'decimal' }) : 0;
})

const fitChartSize = (size, defalteWidth = 1920) => {
  let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (!clientWidth) return size;
  let scale = (clientWidth / defalteWidth);
  return Number((size*scale).toFixed(3));
}
const fitChartHeight = (size, defalteHeight = 1080) => {
  let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  if (!clientHeight) return size;
  let scale = (clientHeight / defalteHeight);
  return Number((size*scale).toFixed(3));
}

Vue.prototype.fitChartSize = fitChartSize;
Vue.prototype.fitChartHeight = fitChartHeight;

Vue.use(ElementUI)
Vue.use(VueContextMenu)
Vue.use(vuescroll)
Vue.use(VueClipboard)
Vue.use(Print)
Vue.use(formCreate)
Vue.use(FcDesigner)
Vue.use(scroll)
Vue.use(FormBuild)

Vue.component('PageForm', PageForm)
Vue.component('PageTable', PageTable)
Vue.component('JsTree', JsTree)
Vue.component('tinymce', Tinymce)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
