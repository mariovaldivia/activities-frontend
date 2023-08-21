import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
// import authHeader from '../services/auth-header'
import { refreshToken } from 'src/services/users';
import { useUserStore } from 'src/stores/users';
import { globalRouter } from '../router/globalRouter';
// import router from 'src/router/index';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: 'http://localhost:8009',
  // headers: authHeader()

});

api.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log("interceptor", response, response.status)
  return response;
}, function (error) {
  const userToken = useUserStore()
  // const router = useRouter()
  const originalConfig = error.config;
  console.log('error', error.response, error.response.status)
  if (error.response.status === 401 && !originalConfig._retry) {
    originalConfig._retry = true;
    if (userToken.getToken == null) {
      globalRouter.router?.push('/login')

    }
    refreshToken(userToken.getToken.refresh)
      .then(function (response) {
        console.log('refresh token', response.data.access)
        userToken.setTokenRefresh(response.data.access)
        originalConfig.headers.Authorization = `Bearer ${userToken.getToken?.access}`
        // axios.defaults.headers.common['Authorization'] = `Bearer ${userToken.getToken?.access}`
        return api(originalConfig)
      })
      .catch(function (_error) {
        console.log('status', _error)
        if (_error.response.status == 401) {
          userToken.removeToken()
        }
        globalRouter.router?.push('/login')
      })

  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
