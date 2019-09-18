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

//设置超时时间
axios.defaults.timeout = 10000;

// post请求头的设置
axios.defaults.headers.post['Content-Type'] =  'application/x-www-form-urlencoded;charset=UTF-8';

//请求拦截
axios.interceptors.request.use(
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
        if(error.response.status) {
            switch (error.response.status) {
                // 401:未登录,跳转到登录页面，并携带当前页面的路径(方便登陆后重定向)
                case 401: 
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;
                //403token过期， 对用户进行提示，
                // 清除本地的token 和 vuex 中的token对象
                // 跳转到登录页面
                case 403:
                    Toast({
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });
                    localStorage.removeItem('token');
                    store.commit('loginSuccess', null);
                    //跳转到登录页面，将当前页面的fullPath传过去，登录后重定向
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        })
                    }, 1000);
                    break;
                //404请求不存在
                case 404:
                    Toast({
                        message: '网络请求不存在',
                        dutaion: 1500,
                        forbidClick: true
                    });
                    break;
                //其他错误，直接抛出错误提示
                default: 
                    Toast({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });
            }
            return Promise.reject(error.response);
        }
    }
)

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data);
        })
    })
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
    })
}