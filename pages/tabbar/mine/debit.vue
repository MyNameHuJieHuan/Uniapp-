<template>
	<view class="debit">
		<uni-nav-bar color="#ffffff" background-color="#00aded" :status-bar="true" left-icon="arrowleft" left-text="返回" fixed="true"
			title="借记卡" @clickLeft="back" />
		<uni-card>
		  <uni-forms :modelValue="formData">
				<uni-forms-item class="inputs" label="借记卡编码" name="debitCode">
				  <uni-easyinput type="text" v-model="formData.debitCode" disabled/>
				</uni-forms-item>
		    <view class="user">
					<uni-forms-item class="inputs" label="姓名" name="userName">
					  <uni-easyinput type="text" v-model="formData.userName" disabled/>
					</uni-forms-item>
				</view>
				<uni-forms-item class="inputs" label="手机号" name="mobile">
				  <uni-easyinput type="text" v-model="formData.mobile" disabled/>
				</uni-forms-item>
				<uni-forms-item class="inputs" label="邮箱" name="email">
				  <uni-easyinput type="text" v-model="formData.email" disabled/>
				</uni-forms-item>
				<view class="user">
					<uni-forms-item class="inputs" label="借计卡状态" name="status">
					  <uni-easyinput type="text" v-model="formData.status"disabled />
					</uni-forms-item>
				</view>
				<uni-forms-item class="inputs" label="借计卡级别" name="debitLevel">
				  <uni-easyinput type="text" v-model="formData.debitLevel" disabled/>
				</uni-forms-item>
				<uni-forms-item class="inputs" label="有效期" name="debitValidity">
				  <uni-easyinput type="text" v-model="formData.debitValidity" disabled/>
				</uni-forms-item>
		  </uni-forms>
		</uni-card>
	</view>
</template>

<script>
export default {
  data() {
		return {
			formData:{},
			userId:""
		}
	},
	created(){
		this.getDebit();
	},
	methods:{
		getDebit(){
			const that = this
			uni.getStorage({
				key:"userId",
				success: function (res) {
					// 调用后端请求
					this.userId = res.data;
					console.log(this.userId)
					that.getDebitInfo(res.data);
				}
			})
		},
		async getDebitInfo(userId){
			console.log(userId)
			const res = await this.$myRequest({
				url:"/app/getDebitInfoByUserId?userId="+userId,
				method:"POST",
			})
			console.log(res)
			this.formData = res.data.map
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
	.user{
		display: flex;
		flex-wrap: nowrap;
	}
	.inputs{
		height: 40px;
	}
</style>
