import Mock from 'mockjs'
import userInfo from './mockdata/userInfo.json'

Mock.mock(/\/getUserInfo/, /get|post/i, userInfo);