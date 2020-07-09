import axios from 'axios'
import {baseUrl} from '../helpers/constants'

const api = axios.create({
  baseURL: baseUrl.external,
})

export default api