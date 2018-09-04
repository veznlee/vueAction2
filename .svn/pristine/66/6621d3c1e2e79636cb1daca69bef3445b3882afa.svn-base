import axios from 'axios'

// create an axios instance
const service = axios.create({
    baseURL: 'http://192.168.1.139:2002'/*process.env.BASE_API*/, // api的base_url
    timeout: 5000 ,// request timeout

})

// request interceptor
service.interceptors.request.use(config => {
    /*if (accessToken) {
        config.headers.Authorization = accessToken
    }*/
    return config
}, error => {
    Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error)
    })

export default service
