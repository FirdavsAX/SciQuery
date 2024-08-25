import axios from 'axios'
import { API_BASE_URL } from '../config/Constants'

const http = axios.create({
    baseURL : API_BASE_URL,

})
export default http;