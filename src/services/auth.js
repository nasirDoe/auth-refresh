import axios from 'axios'
import jwtDecode from 'jwt-decode'

export const useAuth = () => {
  const register = async (payload) => {
    const { data } = await axios.post('/register', payload)
    return data
  }

  const login = async (email, password) => {
    const { data } = await axios.post('/login', { email, password })
    return data
  }

  const logout = async () => {
    await axios.delete('/logout')
  }

  const getUsers = async () => {
    const { data } = await axios.get('/users')
    return data
  }

  const decodedToken = (token) => {
    return token && jwtDecode(token)
  }

  const getMe = async (userId) => {
    const { data } = await axios.get(`/me/${userId}`)
    return data
  }

  const doUpdate = async (userId, data) => {
    const response = await axios.put(`/me/${userId}`, data)
    return response
  }

  return {
    register,
    login,
    logout,
    getUsers,
    decodedToken,
    getMe,
    doUpdate,
  }
}
