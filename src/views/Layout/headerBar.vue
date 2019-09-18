<template>
	<div>
		<div class="header-bar">
			<div class="left-area">
				<span>></span>
			</div>
			<div class="title-area">
				<span>首页</span>
			</div>
			<div class="right-area">
				<span>🔍</span>
			</div>
		</div>
        <div v-if="!network">
            <h3>我没网了！</h3>
            <button @click="handleRefresh">刷新</button>
        </div>
		<router-view v-if="network"></router-view>
	</div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
	data() {
		return {
			name: this.$store.state.user
		}
	},
	computed: {
		...mapState(['network']),
		youngStudents() {
			return this.$store.getters.youngStudents;
		}
	},
	mounted() {
	},
	created() {
		this.$store.commit('setNetwork', window.navigator.onLine)
	},
	methods: {
        handleRefresh() {
            this.$router.replace('/refresh')
        }
	}
}
</script>
<style lang="scss" scoped>
	.header-bar {
		height: 40px;
		line-height: 40px;
		background: lightblue;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}
</style>