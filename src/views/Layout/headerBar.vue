<template>
	<div>
		<div class="header-bar">
		</div>
		<router-view></router-view>
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
		youngStudents() {
			return this.$store.getters.youngStudents;
		}
	},
	mounted() {
	}
}
</script>
