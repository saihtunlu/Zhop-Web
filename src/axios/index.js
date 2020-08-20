import axios from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';
axios.defaults.adapter = throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter));
axios.defaults.withCredentials = true;
axios.defaults.baseURL = `https://zhop.admin.saihtunlu.me/api/`;

export default axios;
