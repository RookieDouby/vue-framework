import axios from 'axios';
import QS from 'qs'
import { Toast } from 'vant'
import store from '@/store'
import { router } from '@/router';

if(process.env.NODE_ENV == 'development') {
    // axios.defaults.baseURL = 'https://easy-mock.com/mock/5d81c674229be747d294dbc9/zhd'
    axios.defaults.baseURL = 'http://localhost:8080'
} else if(process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = 'https://www.ceshi.com'
} else if(process.env.NODE_ENV == 'production'){
    axios.defaults.baseURL = 'https://www.production.com';
}

const tip = msg => {
    Toast({
        message: msg,
        duration: 1000,
        forbidClick: true
    })
}

// 跳转登录页，带上当前页面url, 登陆后跳转
const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}

// 请求失败的统一处理
const errorHandle = (status, other) => {
    switch(status) {
        // 401:未登录,跳转到登录页面，并携带当前页面的路径(方便登陆后重定向)    
        case 401:
            toLogin();
            break;
        //403token过期， 对用户进行提示，
        // 清除本地的token 和 vuex 中的token对象
        // 跳转到登录页面
        case 403:
            tips('登录过期，请重新登录')
            localStorage.removeItem('token');
            store.commit('loginSuccess', null);
            //跳转到登录页面，将当前页面的fullPath传过去，登录后重定向
            setTimeout(() => {
                toLogin();
            }, 1000)
            break;
        //404请求不存在
        case 404:
            tip('请求的资源不存在')
            break;
        default: 
            console.log(err);
    }
}
//设置超时时间
const instance = axios.create({timeout: 1000})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//请求拦截
instance.interceptors.request.use(
    config => {
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error)
    }
)

//响应拦截器
axios.interceptors.response.use(
    response => {
        //返回状态码为200，借口调用成功，可以正常拿到数据
        if(response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response);
        }
    },
    //状态码不是2开头的情况，根据后台返回的状态码进行操作，登录过期错误提示等
    error => {  
        const { response } = error;
        if(response) {
            errorHandle(response.status, response.data.message)
            return Promise.reject(response)
        } else {
            //处理断网情况
            // 请求超时或者断网时，更新state中的network状态
            if(!window.navigator.online) {
                store.commit('changeNextWork', false)
            } else {
                return Promise.reject(error)
            }
        }
    }
)

export default instance;