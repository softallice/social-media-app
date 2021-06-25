import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { LocalStorage, LoadingBar } from "quasar";

/*
사용자 관리 및 feathers API 연결
*/
LoadingBar.setDefaults({
  color: "secondary",
  size: "15px",
  position: "top"
});


const api = axios.create({ baseURL: 'http://localhost:3030' })

export default boot(({ app }) => {
  
  /*토큰 추가 */
  // const token = LocalStorage.getItem("feathers-jwt")
  // if (token) {
  //   delete api.defaults.headers.common.Authorization
  //   api.defaults.headers.common['Authorization'] = 'Bearer ' + token
  // }

  // api.interceptors.request.use(
  //   function(config) {
  //     LoadingBar.start()
  //     return config
  //   },
  //   function(error) {
  //     LoadingBar.stop()
  
  //     return Promise.reject(error)
  //   }
  // )

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
