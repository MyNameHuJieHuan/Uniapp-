<template>
	<view class="setting">
		<uni-nav-bar color="#ffffff" background-color="#00aded" :status-bar="true" left-icon="arrowleft" left-text="返回" fixed="true"
			title="设置" @clickLeft="back" />
			<!-- 预约记录查询 -->
		<button class="btn" @click="goback()" >
			退出登录
		</button>	
	</view>
</template>

<script>
export default {
  data() {
		return {
		}
	},
	methods:{
		goback(){
			uni.redirectTo({
				url: '../../login/login'
			})
		},
		back() {
			console.log("点击了返回")
			uni.switchTab({
				url: './mine'
			})
		},
	},
}
</script>

<style>
	.btn{
		border-radius: 2px;
	}
</style>
