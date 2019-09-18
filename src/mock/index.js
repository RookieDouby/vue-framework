import Mock from 'mockjs'
import userInfo from './mockdata/userInfo.json';
import articleList from './mockdata/articleList.json'

Mock.mock(/\/getUserInfo/, /get|post/i, userInfo);
Mock.mock(/\/getArticleList/, /get|post/i, articleList);