import Vue from 'vue';
import App from './App.vue';
import router from './router';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Ea from 'e-admin';
import 'e-admin/lib/index.css';
import '@/style/e.css';

import 'prismjs/themes/prism.css';
import '@/style/markdown-segmentfault.css';
import '@/style/index.less';

Vue.use(ElementUI).use(Ea);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
