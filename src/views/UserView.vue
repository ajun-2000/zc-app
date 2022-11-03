<template>
	<div id="user-view">
		<button @click="clickH">退出</button>
	</div>
</template>

<script>
	export default {
		emits : ['changebadge'],
		methods : {
			clickH(){
				window.localStorage.removeItem('token');
				window.localStorage.removeItem('username');
				this.$router.push('/login');
				this.$emit('changebadge');
			}
		}
	}
</script>

<style>
</style>