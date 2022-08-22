<template>
	<view class="index">
		<view class="bookEntry">
		  <button class="btn" @click="bookEntry">图书录入</button>
		</view>
		<view class="message">
		  <button class="btn" @click="bookBorrow">借还管理</button>
		</view>
		<view class="message">
		  <button class="btn" @click="message">消息管理</button>
		</view>
		<view class="back">
		  <button class="btn" @click="back">退出登录</button>
		</view>
	</view>
</template>

<script>
export default {
  data() {
		return {
		}
	},
	methods:{
		bookEntry(){
			//跳转到注册界面
			uni.redirectTo({
				url:"./bookEntry",
			});
		},
		bookBorrow(){
			uni.redirectTo({
				url:"./bookBorrow",
			});
		},
		message(){
			//跳转到注册界面
			uni.redirectTo({
				url:"./message",
			});
		},
		back(){
			//跳转到注册界面
			uni.redirectTo({
				url:"../login/login",
			});
		}
	}
}
</script>

<style>
	.bookEntry{
		margin-top: 150px;
	}
	.btn {
	  background-color: #00aded;
		width: 200px;
		margin-top: 20px;
	  color: #ffffff;
	  border-radius: 80rpx;
	}
</style>
