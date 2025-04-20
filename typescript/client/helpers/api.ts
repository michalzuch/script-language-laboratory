import { apiUrl } from '@/helpers/consts'
import axios from 'axios'

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
