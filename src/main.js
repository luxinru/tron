import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './registerServiceWorker'
import '@/assets/styles/reset.scss'
// import { Notify, Dialog } from 'vant';
import Vant from 'vant';
import {
  Locale
} from 'vant';
// 引入英文语言包
import enUS from 'vant/es/locale/lang/en-US';
import jaJP from 'vant/es/locale/lang/ja-JP';
import koKR from './ko-Kr';

import vueTouch from "vue-plugin-touch"
import 'amfe-flexible'
import VueI18n from 'vue-i18n'
import en from './lang/en'
import jp from './lang/jp'
import kr from './lang/kr'
import ar from './lang/ar'
import de from './lang/de'
import fr from './lang/fr'
import pt from './lang/pt'
import tr from './lang/tr'
import es from './lang/es'
import id from './lang/id'

import $ from "jquery"
import requestAnimationFrameHack from './utils/requestAnimationFram'
import jequeryExtensFly from './utils/fly'

requestAnimationFrameHack()
jequeryExtensFly($)
window.$ = $

const lang = window.localStorage.getItem('lang') || 'en'
switch (lang) {
  case 'jp':
    Locale.use('ja-JP', jaJP);
    break;
  case 'kr':
    Locale.use('ko-KR', koKR);
    break;
  default:
    Locale.use('en-US', enUS);
    break;
}

Vue.use(VueI18n);

const messages = {
  en,
  jp,
  kr,
  ar,
  de,
  fr,
  pt,
  tr,
  es,
  id,
}

const i18n = new VueI18n({
  locale: window.localStorage.getItem('lang') || 'en',
  messages, // 设置地区信息
})

// Vue.use(Notify).use(Dialog).use(vueTouch);
Vue.use(vueTouch);
Vue.use(Vant);
// const ua = navigator.userAgent

// if(ua.indexOf("bsl") >= 0 ) {

//   // alert("mainjs")
//   var x = 1;

//   function appFinishiLoad() {
//     BSL.PhoneID('id');
//   }

// function id(i) {
//     if(i.indexOf('-') < 0){
//         BSL.OpenStep();
//     }
//     alert(i)
//     setInterval(function () {
//       BSL.GetStepCount('step');
//       x++;
//     }, 1000);
//   }

//   function step(s) {
//     alert(s)
//     //document.body.innerHTML = '��' + x + '�λ�ò���Ϊ' + s;
//   }
//   BSL.PhoneID('id');

// }
Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')