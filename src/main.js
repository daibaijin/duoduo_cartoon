import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import { Button, Select,Form } from 'element-ui';
Vue.config.productionTip = false

//注册, 将axios挂在到Vue构造函数的原型对象中, 这样可以在组件实例中直接使用 this.axios()
Vue.use(VueAxios, axios)

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(ElementUI);
Vue.use(Button)
Vue.use(Select)
Vue.use(Form)

// import 'lib-flexible/flexible'

// import { 
  
//   Tabbar,
//   TabbarItem,
//   Search,
//   Sidebar,
//   SidebarItem,
//   NavBar,
//   Stepper,
//   GoodsAction, 
//   GoodsActionIcon, 
//   GoodsActionButton 
//  } from 'vant';


  
//   Vue.use(Tabbar)
//   Vue.use(TabbarItem)
//   Vue.use(Search)
//   Vue.use(Sidebar)
//   Vue.use(SidebarItem)
//   Vue.use(NavBar)
//   Vue.use(Stepper)
//   Vue.use(GoodsAction)
//   Vue.use(GoodsActionIcon)
//   Vue.use(GoodsActionButton)


// Vue.config.productionTip = false





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
