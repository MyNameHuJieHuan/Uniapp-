<template>
	<view class="content">
		<view class="head">
			<image src="">
				
			</image>
		</view>
		<!-- 预约记录查询 -->
		<button class="btn" @click="getForward()" >
			预约记录
		</button>
		<!-- 借记卡查询 -->
		<button class="btn" @click="getDebit()">
			借记卡
		</button>
		<!-- 设置管理 -->
		<button class="btn" @click="setting()">
			设置
		</button>
	</view>
</template>

<script>
export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		onShow(){
			uni.setNavigationBarTitle({
			　　title: '我的'
			});
		},
		methods: {
			getForward(){
				uni.redirectTo({
					url:"./forward",
				});
			},
			getDebit(){
				uni.redirectTo({
					url:"./debit",
				});
			},
			setting(){
				//跳转到设置界面
				uni.redirectTo({
					url:"./setting",
				});
			}
		}
	}
</script>

<style>
	.btn{
		border-radius: 20px;
		border: 1px solid #333333;
		text-align: left;
		margin-top: 8px;
	}
</style>
