<template>
	<view class="bottom">
		<view class="btn" v-for="(item,i) in tabBarList" :key="i">
			<uni-badge class="badge" size="small" :text="item.listText" absolute="rightTop" type="error" v-if="i == 0 && item.badge">
				<view :class="item.selectClass" @tap="onclick(item.URL)">
					{{item.title}}
				</view>
			</uni-badge>
			<view :class="item.selectClass" @tap="onclick(item.URL)" v-else>
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	name:'uni_tabBer';
	export default{
		//props接收父组件传递得数据
		props: {
			tabBarList: {
				type: Array,
				value: []
			}
		},
		methods:{
			// 点击切换页面
			onclick(URL){
				uni.redirectTo({
					url:URL
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bottom{
		Position:fixed;
		bottom: 0;
		width: 100%;height: 100rpx;
		display: flex;
		justify-content: space-between;
		border-top: 0rpx solid #6699ff;
		.btn{
			width: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			.badge{
				width: 100%;
				.tableBtn{
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100rpx;width: 100%;
					border-right: 0rpx solid #808080;
					background-color: #fff;
				}
				.tableBtn1{
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100rpx;width: 100%;
					border-right: 0rpx solid #808080;
					background-color: #fff;
				}
				.select{
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #1677FF;
					color: #fff;
					height: 100rpx;width: 100%;
				}
			}
			.tableBtn{
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100rpx;width: 100%;
				border-right: 0rpx solid #808080;
				background-color: #fff;
			}
			.tableBtn1{
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100rpx;width: 100%;
				border-right: 0rpx solid #808080;
				background-color: #fff;
			}
			.select{
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #1677FF;
				color: #fff;
				height: 100rpx;width: 100%;
			}
		}
	}
</style>
