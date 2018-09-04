import router from '../router';
import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
    /*baseURL: 'http://prc33.858.im',
    baseURL1: 'http://prc4.858.im',*/
    baseURL: 'http://192.168.1.40:38080',
    baseURL1: 'http://192.168.1.40:48080',
    timeout: 3000 ,
});

service.interceptors.request.use(config => {
    var token = localStorage.getItem("accessToken");
    let tokenUrl = '?accessToken=' + token;
    if (config.host == 1)
        config.url = config.url.replace(config.baseURL, config.baseURL1) + tokenUrl;
    else
        config.url += tokenUrl;
    return config
}, error => {
    return Promise.reject(error)
});

service.interceptors.response.use(response => {
    if(response.data.code ==1) {
        Message({
            message: response.data.msg,
            type: 'error',
            duration: 2 * 1000
        });
    }else if(response.data.code ==99){
        router.replace({
            path: '/login'
        });
    }else{
        return response;
    }
},
error => {
    return Promise.reject(error)
});

export default service
