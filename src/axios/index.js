import axios from 'axios'
import store from '../store'
 const instance = axios.create({
     baseURL:'http://localhost:4400'
 })
 var token = store.getters.Token
 instance.defaults.headers.common['Authorization'] = 'Bearer '+ token

 export default instance