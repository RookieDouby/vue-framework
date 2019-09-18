<template>
    <div>
        <button class="hello" @click="showPop">
            显示
        </button>
        <pop v-if="isPopShown" :father="this" :confirmWay="confirmWay.bind(this)" :closeWay="closeWay" :baseCancel="baseCancel" :cancelWay="cancelWay">
            <div slot="title">这是一个弹窗</div>
        </pop>
        <div>{{msg}}</div>
        <router-link :to="{path: '/shoppingCart'}">购物车</router-link>
    </div>
</template>
<script>
import pop from '@/components/pop.vue';
import { apiUserInfo } from '@/request/api'

export default {
    data() {
        return {
            pop: false,
            msg: '你还没有点确认',
            isPopShown: false
        }
    },
    components: {
        pop
    },
    created() {
        this.$api.article.articleList()
            .then(res => {
                console.log(res)
            }); 
    },
    methods: {
        showPop() {
            this.isPopShown = !this.isPopShown;
        },
        closeWay() {
            this.msg = '对话框关闭了'
        },
        confirmWay() {
            this.msg = '你点了确定!'
        },
        cancelWay() {
            this.msg = "你点了取消!"
        },
        baseCancel() {
            console.log('这个组件点了cancel')
        },
    }
}
</script>
