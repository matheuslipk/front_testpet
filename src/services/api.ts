import axios from 'axios'
import {baseUrl} from '../helpers/constants'

const api = axios.create({
  baseURL: baseUrl.local,
})

export default api