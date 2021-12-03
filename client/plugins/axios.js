export default ({ app, $auth, $axios, store, redirect, route, $root, $echo }) => {

  // Request interceptor
  $axios.interceptors.request.use((request) => {

    request.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    // request.headers.common['X-Socket-Id'] = store.getters['socket/getSocketId']
    const token = "";

    if (token) {

      request.headers.common['Authorization'] = `Bearer ${token}`

    }

    return request

  })

  // Response interceptor
  $axios.interceptors.response.use(response => response, (error) => {
    const { status } = error.response || {}

    if (status >= 500) {
      console.error('Error has occured please contact admin');
    }

    console.log(route.name);
    if (status === 401 && route.name == 'auth' || route.name === 'index') {
      return Promise.reject(error)
    }

    if (status === 401) { 
      redirect('/');
      
    }

    return Promise.reject(error)

  })
}