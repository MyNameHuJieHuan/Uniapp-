<template>
	<view>
		<view @click="showMask" class="qrcode">
			<canvas :style="{width:size+ 'px', height:size+ 'px', background:bgc}" canvas-id="couponQrcode"></canvas>
			
		</view>
		<view v-show="mask" @click="hide" class="cpt-mask qrcode">
			<canvas :style="{width:maskSize+ 'px', height:maskSize+ 'px', background:bgc}" canvas-id="couponQrcode2"></canvas>
		</view>
	</view>
</template>
<script>
	const qrCode = require('./weapp-qrcode.js')
	export default {
		data() {
			return {
				mask:true,
				maskStyle:'qrcode',
				bgc: 'rgba(200, 200, 200, 0.1)', //测试画布是否与内容相同大小
				canvasQrPath: '', //
				level: '',
				maskSize:230
			}
		},

		props: {
			text: {
				type: String,
				default: 'hello'
			},
			size: {
				type: Number,
				default: 800
			},
			quality: {
				type: String,
				default: 'L' //二维码质量L/M/Q/H
			},
			colorDark: {
				type: String,
				default: '#000000'
			},
			colorLight: {
				type: String,
				default: '#ffffff'
			},
		},
		// 在实例创建完成后被立即调用
		// 修改时间变为400ms
		created() {
			// if(this.text != null){
			// 	console.log("进来")
			// 	this.couponQrCode()
			// }
			
			setTimeout(() => {
				this.couponQrCode()
				this.couponQrCode2(230)
				this.mask=false;
			}, 500)
		},
		watch: {
			text() {
				this.couponQrCode()
				this.couponQrCode2(230)
			}
		},
		methods: {
			hide(){
				this.mask=false;
			},
			//展示蒙版
			showMask(){
				this.mask=true;
				// this.maskStyle=this.mask?'qrcode':'cpt-mask qrcode';
			},
			// 二维码生成工具
			couponQrCode() {
				var that = this;
				if (this.quality == 'L') {
					this.level = qrCode.CorrectLevel.L
				} else if (this.quality == 'M') {
					this.level = qrCode.CorrectLevel.M
				} else if (this.quality == 'Q') {
					this.level = qrCode.CorrectLevel.Q
				} else if (this.quality == 'H') {
					this.level = qrCode.CorrectLevel.H
				} else {
					this.level = qrCode.CorrectLevel.L
				}
				new qrCode('couponQrcode', {
					text: this.text,
					width: this.size,
					height: this.size,
					showLoading: true, // 是否显示loading
					loadingText: '二维码生成中', // loading文字
					colorDark: this.colorDark, //二维码暗部颜色
					colorLight: this.colorLight, //二维码亮部颜色
					correctLevel: this.level, //二维码质量L/M/Q/H
					usingIn: this //在自定义组件下，第二个参数传入组件实例this
				})
				// 把当前画布指定区域的内容导出生成图片，并返回文件路径。
				uni.canvasToTempFilePath({
					canvasId: 'couponQrcode',
					success: function(res) {
						// 在H5平台下，tempFilePath 为 base64
						// console.log('yz-qr图片路径:',res.tempFilePath)
						that.canvasQrPath = res.tempFilePath
					}
				}, this)
				this.$emit('update:canvasQrPath', that.canvasQrPath)
			},
			// 二维码生成工具
			couponQrCode2(size) {
				var that = this;
				if (this.quality == 'L') {
					this.level = qrCode.CorrectLevel.L
				} else if (this.quality == 'M') {
					this.level = qrCode.CorrectLevel.M
				} else if (this.quality == 'Q') {
					this.level = qrCode.CorrectLevel.Q
				} else if (this.quality == 'H') {
					this.level = qrCode.CorrectLevel.H
				} else {
					this.level = qrCode.CorrectLevel.L
				}
				new qrCode('couponQrcode2', {
					text: this.text,
					width:size,
					height:size,
					showLoading: true, // 是否显示loading
					loadingText: '二维码生成中', // loading文字
					colorDark: this.colorDark, //二维码暗部颜色
					colorLight: this.colorLight, //二维码亮部颜色
					correctLevel: this.level, //二维码质量L/M/Q/H
					usingIn: this //在自定义组件下，第二个参数传入组件实例this
				})
				// 把当前画布指定区域的内容导出生成图片，并返回文件路径。
				uni.canvasToTempFilePath({
					canvasId: 'couponQrcode2',
					success: function(res) {
						// 在H5平台下，tempFilePath 为 base64
						// console.log('yz-qr图片路径:',res.tempFilePath)
						that.canvasQrPath = res.tempFilePath
					}
				}, this)
				this.$emit('update:canvasQrPath', that.canvasQrPath)
			}
		}
	}
</script>

<style>
	.cpt-mask {
	    position: fixed;  
	    top: -300upx;  
	    left: 0;  
	    width: 100%;  
	    height: 100%;  
	    background-color: #ffffff;  
	    opacity: 1;  
	    z-index: 99;  
	}  
	.qrcode {
		padding: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
