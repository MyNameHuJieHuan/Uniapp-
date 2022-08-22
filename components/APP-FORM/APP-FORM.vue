<template>
	<view>
			<formList @change="change"  :formArr="formArr" :formObj.sync="formObj" :config="config" />
	</view>
</template>
<script>
	import urlConfig from '../../utils/appconfig.js'
	export default {
		name: "APP-FORM",
		props: {
			formId: {
				type: Number,
				default: "",
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
				type: Object,
				default: {},
			},
			type: {
				type: String,
				default: 'input'
			}
		},
		data() {
			return {
				formArr: [],
				formObj: this.formObjFA
			};
		},
		mounted() {
			this.dianji()
			console.log("formArr")
			console.log(this.formArr)
			console.log("this.formObj")
			console.log(this.formObj)
		},
		methods: {
			change(val){
				this.$emit("onchange",val)
				console.log(val)
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

<style>

</style>
