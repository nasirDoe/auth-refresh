import Cookies from 'js-cookie'
export default {
  namespaced: true,
  state: () => ({
    token: Cookies.get('_auth.token') || null,
  }),
  mutations: {
    SET_USER_TOKEN(state, token) {
      state.token = token
      Cookies.set('_auth.token', token)
    },
    DESTROY_TOKEN(state) {
      state.token = null
      Cookies.remove('_auth.token')
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
}
