import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { NGROK_ADDRESS } from 'config'

const instance = axios.create({
  baseURL: NGROK_ADDRESS
})

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  err => Promise.reject(err)
)

export default instance
