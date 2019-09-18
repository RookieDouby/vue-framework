import baseDomain from './base'
import QS from 'qs'
import axios from '@/utils/http'

const article = {
    articleList() {
        return axios.get(`${baseDomain.env1}/getArticleList`)
    },
    //详情
    articleDetail(id, params) {
        return axios.get(`${baseDomain.env1}/topic/${id}`, {
            params: params
        })
    },
    //post提交
    login(params) {
        return axios.post(`${baseDomain.env1}/accesstoken`, QS.stringify(params))
    }
}

export default article