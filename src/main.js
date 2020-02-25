import Vue from 'vue'
import App from './App.vue'

// 引入video.js
import Video from 'video.js'
import VueVideoPlayer from 'vue-video-player'
Vue.use(VueVideoPlayer)
/* 不能直接引入js，否则会报错：videojs is not defined 
import 'video.js/dist/lang/zh-CN.js' */
import video_zhCN from 'video.js/dist/lang/zh-CN.json'
import video_en from  'video.js/dist/lang/en.json'
import 'video.js/dist/video-js.css'


import "../src/assets/css/_reset.scss"
import store from './store'
Video.addLanguage('zh-CN', video_zhCN);
Video.addLanguage('en', video_en);
Vue.prototype.$video = Video;
// 引入videojs-makers (打点用)
// import   'videojs-markers'

Vue.config.productionTip = false
;(function(){
  var rem = document.createElement('script');
  rem.src = './rem.js';
  document.body.appendChild(rem)
})()
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

