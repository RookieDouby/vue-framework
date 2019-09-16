<template>
    <div class="shopping-page">
        <div class="shopping-header">
            <h1 class="text-white">购物车</h1>
        </div>
        <div class="shopping-list">
            <div class="goods-wrapper">
                <input type="checkbox">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .shopping-page {
        .shopping-header {
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: lightblue;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        }
        .goods-wrapper {
            padding: 5px 10px;
        }
    }
</style>