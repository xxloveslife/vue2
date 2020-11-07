import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import { getStore } from '@/utils/storage'


Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$http = axios;
axios.interceptors.request.use(config => {
  // 先查看token是否存在,也就是此次的router提交是否是携带token 的提交
  const token = getStore('token');
  // // test测试
  // let a = {
  //   result:[1,2,3,4,5]
  // }
  // let {numList} = a.result.find(item =>
  //   item%2==0
  // )
  // numList++
  // console.log('a',a);
  // console.log(token);
  if (token) {
    // 表示已经登录,已经登录的提交,需要携带token ,Authorization是后端传来的token的key值,在头文件里设置添加
    config.headers.common['Authorization'] = token

  }

  return config

}, error => {
  // const p = Promise.reject('出错了');
  // // 等同于
  // const p = new Promise((resolve, reject) => reject('出错了'))
  // p.then(null, function(s) {
  //   console.log(s)
  // });
  // 出错了

  return Promise.reject(error)
})
router.beforeEach((to, from, next) => {
  axios.post('/api/validate',{}).then(res => {
    // 每次跳转都验证下是否是登录状态,如果不是登录状态,在查看to的路径是否需要登录,
    let data = res.data;
    if(data.state  !== 1) {
      // 用户要登录
      if (to.matched.some(record => record.meta.auth)) {
        // console.log(to.fullPath);
        // 需要权限
        next({
          path: '/login',
          query: {
            redirect: to.fullPath,
          }
        })
      } else {
        next();
      }
    }else {
      // 已经登录,保存用户的信息
      store.commit('ISLOGING',data)

    }
  }).catch(error =>{
    console.log(error);
  })
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
