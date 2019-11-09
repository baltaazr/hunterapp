import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://dataservice.accuweather.com'
})

export default instance
