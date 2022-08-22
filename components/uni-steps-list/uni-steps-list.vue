<template>
	<view class="steps_list">
		<view class="steps" v-for="(item,index) in stepsList" :key="index">
			<view :class="active > index ? 'steps_top_complete':'steps_top'">
				<view :class="active > index ?'steps_index_complete':'steps_index'">
					{{ index + 1 }}
				</view>
				<view class="steps_linkName">
					<view class="text">
						<text class="linkName">{{item.linkName}}</text>
						<text>{{ item.pointDate }}</text>
					</view>
					<view class="steps_icon" @click="onNavigation(index)" v-if="Navigation">
						<image src="../../static/uni_steps_list/map.png"></image>
					</view>
				</view>
			</view>
			<view :class="active > index ? 'steps_bottom_border_complete':'steps_bottom_border'"
				v-if="stepsList.length !== index + 1">
				<view class="steps_bottom_results" v-if="item.pointName || item.pointDate">
					<view class="steps_bottom_results_spot">
						<text class="pointName">{{ item.pointName }}</text>
						<text class="materialName">{{ item.materialName }}</text>
						<text class="materialName">{{ item.remark }}</text>
						<text v-if="item.weight">{{ item.weight }}t</text>
						<text v-if="item.netWeight">净重{{ item.netWeight }}t</text>
					</view>
				</view>
				<view class="steps_bottom_results" v-else>
					<view class="steps_bottom_results_spot">
						请等待....
					</view>
				</view>
			</view>
			<view :class="active > index ?'steps_bottom_complete':'steps_bottom'" v-else>
				<view class="steps_bottom_results" v-if="item.pointName || item.pointDate">
					<view class="steps_bottom_results_spot">
						{{ item.pointName}}  
						<text v-if="item.materialName">-{{ item.materialName }}</text>
						<text v-if="item.remark">-{{ item.remark }}</text>
						<text v-if="item.weight">{{ item.weight }}t</text>
						<text v-if="item.netWeight">净重{{ item.netWeight }}t</text>
					</view>
				</view>
				<view class="steps_bottom_results" v-else>
					<view class="steps_bottom_results_spot">
						请等待....
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			stepsList: {
				type: Array,
				default: null,
			},
			active: {
				type: Number,
				default: null,
			},
			Navigation: {
				type: Boolean,
				default: null,
			}
		},
		methods: {
			onNavigation() {

			}
		}
	}
</script>

<style lang="scss">
	.steps_list {
		width: 100%;

		.steps {
			width: 90%;
			margin: auto;
			margin-top: 10rpx;

			.steps_top {
				display: flex;
				color: #999999;

				.steps_index {
					background-color: #b0adad;
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #FFFFFF;
				}

				.steps_linkName {
					width: 100%;
					font-size: 14px;
					display: flex;
					align-items: center;
					padding-left: 20rpx;
					font-weight: 700;

					.text {
						width: 90%;
					}

					.steps_icon {
						image {
							width: 50rpx;
							height: 50rpx;
						}
					}
				}
			}

			.steps_top_complete {
				display: flex;
				color: #007AFF;

				.steps_index_complete {
					background-color: #007AFF;
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #FFFFFF;
				}

				.steps_linkName {
					width: 100%;
					font-size: 14px;
					display: flex;
					align-items: center;
					padding-left: 20rpx;
					font-weight: 700;

					.text {
						width: 90%;
						.linkName{
							margin-right: 60rpx;
						}
					}

					.steps_icon {
						image {
							width: 50rpx;
							height: 50rpx;
						}
					}
				}
			}

			.steps_bottom_border_complete {
				color: #007AFF;
				border-left: 2px solid #000000;
				width: 100%;
				height: 70rpx;
				margin-left: 15rpx;
				margin-top: 10rpx;

				.steps_bottom_results {
					width: 95%;
					height: 50rpx;
					display: flex;
					padding-top: 10rpx;
					margin-left: 40rpx;
					border-bottom: 2rpx solid #c2c2c2;
					.steps_bottom_results_spot {
						.pointName{
							margin-right: 30rpx;
						}
						.materialName {
							margin-right: 30rpx;
						}
					}
				}
			}

			.steps_bottom_border {
				border-left: 2px solid #000000;
				width: 100%;
				height: 70rpx;
				margin-left: 15rpx;
				margin-top: 10rpx;

				.steps_bottom_results {
					width: 95%;
					height: 50rpx;
					display: flex;
					padding-top: 10rpx;
					margin-left: 40rpx;
					border-bottom: 2rpx solid #c2c2c2;
				}
			}

			.steps_bottom_complete {
				color: #007AFF;
				border-left: 2rpx solid #FFFFFF;
				width: 100%;
				height: 100rpx;
				margin-left: 15rpx;
				margin-top: 10rpx;

				.steps_bottom_results {
					width: 95%;
					height: 50rpx;
					display: flex;
					padding-top: 10rpx;
					margin-left: 40rpx;
					border-bottom: 2rpx solid #c2c2c2;

					.steps_bottom_results_spot {
						width: 150rpx;
					}
				}
			}

			.steps_bottom {
				border-left: 2rpx solid #FFFFFF;
				width: 100%;
				height: 100rpx;
				margin-left: 15rpx;
				margin-top: 10rpx;

				.steps_bottom_results {
					width: 95%;
					height: 50rpx;
					display: flex;
					padding-top: 10rpx;
					margin-left: 40rpx;
					border-bottom: 2rpx solid #c2c2c2;

					.steps_bottom_results_spot {
						width: 150rpx;
					}
				}
			}
		}
	}
</style>
