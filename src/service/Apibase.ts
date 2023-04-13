import axios from 'axios'
import { getApiBaseUrl } from '../utils/getRequestHeaders'

const ApiBase = axios.create({ baseURL: getApiBaseUrl() })

export { ApiBase }