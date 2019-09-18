import { get, post } from './http'

export const apiUserInfo = params => get('/getUserInfo', params)