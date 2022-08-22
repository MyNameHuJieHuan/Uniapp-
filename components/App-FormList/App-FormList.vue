<template>
	<view class="content">
		<view v-for="(item,index) in formObj" :key="index" class="style">
			<formList :formArr="formArr" :formObj.sync="formObj[index]" :config="config" />
			<button type="primary" @click="onclick(index)" :textButton="textButton"
				v-show="butthonDisplay">{{text}}</button>
		</view>
	</view>
</template>
<script>
	import urlConfig from '../../utils/appconfig.js'
	export default {
		name: "App-FormList",
		props: {
			textButton: {
				type: String,
				default: "抢单"
			},
			butthonDisplay: {
				type: Boolean,
				default: false
			},
			formId: {
				type: Number,
				default:null,
				required: true
			},
			config: {
				type: Object,
				default: {
					labelWidth: "4em",
					required: false,
					labelAlign: "justify"
				}
			},
			formObjFA: {
				type: Array,
				default:null,
			},
			type: {
				type: String,
				default: 'input'
			}
		},
		data() {
			return {
				formArr: [],
				formObj: this.formObjFA,
				text: this.textButton
			};
		},
		created() {
			this.dianji()
		},
		methods: {
			onclick(index) {
				this.$emit('onclick', index)
			},
			dianji() {
				uni.request({
					url: urlConfig + '/api/v1/cd/fromData/' + this.formId,
					method: 'GET',
					success: res => {
						const formdataJson = (res.data.data.form_data_json).replace(/input/g, this.type);
						this.formArr = JSON.parse(formdataJson)
					},
				});
			}
		}
	}
</script>
<style lang="scss">
	.content {
		.style {
			margin-bottom: 50rpx;
			padding-bottom: 50rpx;
			border-radius: 80rpx;
		}
	}
</style>
