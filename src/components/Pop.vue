<template>
    <div class="pop">
        <div class="cover">
            <div class="pop-content" ref="content" :style="contentSize">
                <div class="close-icon" @click="base()">X</div>
                <div>
                    <slot name="title"></slot>
                </div>
                <div class="button-group">
                    <button @click="baseConfirm">确 定</button>
                    <button @click="baseCancel">取 消</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            contentSize: {}
        }
    },
    props: ['father', 'confirmWay', 'cancelWay','closeWay'],
    methods: {
        baseClose() {
            this.baseHidden('closeWay');
        },
        baseConfirm() {
            this.baseHidden('confirmWay');
        },
        baseCancel() {
            this.baseHidden('cancelWay')
        },
        baseHidden(type) {
            const fn = this[type] || function(){};
            fn.call(this.father);
            this.father.isPopShown = false;
        },
        base(type) {
            this.baseHidden(type)
        }
    },
    mounted() {
        this.contentSize = {
            marginLeft: -this.$refs.content.clientWidth / 2 + 'px',
            marginTop: -this.$refs.content.clientHeight / 2 + 'px'
        }
    }
}
</script>
<style lang="scss" scoped>
    .cover {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .3);
        .close-icon {
            text-align: right;
            cursor: pointer;
        }
        .pop-content {
            border: 1px solid #000;
            padding: 10px;
            background: #fff;
            top: 50%;
            left: 50%;
            position: fixed;
        }
    }
</style>