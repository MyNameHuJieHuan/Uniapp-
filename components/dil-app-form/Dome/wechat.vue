<template>
	<view class="content">
		首页
	<!-- <formList @change="change"  ref="formRef"  @chaxun="chaxun" :formArr="formArr1" :formObj.sync="formObj"  :config="config"  />		 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
					// formArr1: [],						
				 //    formObj:{},
				 //      config:{},
			}
		},
		// onLoad() {
		// 	this.dianji();
		// 	// this.dianji();
		// 	uni.request({
		// 		url:'http://192.168.1.241:8099/api/v1/ams/requirement/getSettlement',
		// 		method:'get',
		// 		success: (res) => {
		// 			const data=res.data.data
					
		// 			console.log(data)
		// 			console.log(this.formArr1[0])
		// 			this.formArr1[0].list=data					
		// 		}
		// 	})
		// },
		
		// methods: {
		// 	change(){
		// 	  console.log()
		// 	},
		// 	dianji(){
		// 		uni.request({
		// 			url:'http://192.168.1.241:8083/api/v1/cd/fromData/'+161,
		// 			method:'GET',					
		// 			success:(res)=>{
		// 			const data=res.data.data;
		// 			console.log(data.form_data_json);					
		// 			const formDataJson=JSON.parse(data.form_data_json);
		// 			console.log(formDataJson);
		// 			//纯展示用span
		// 			this.formArr1=JSON.parse(JSON.stringify(JSON.parse(formDataJson)).replace(/input/g,'span'))
		// 			},
		// 		})
		// 	}
		// }
	}
</script>

<style>
	/* .input_clear{
		disabled:true;
	} */
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}	

</style>
