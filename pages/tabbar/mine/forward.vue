<template>
	<view class="forward">
		<uni-nav-bar color="#ffffff" background-color="#00aded" :status-bar="true" left-icon="arrowleft" rightIcon="plusempty" left-text="返回" fixed="true"
			title="预约记录" @clickLeft="back" @clickRight="InsertForward"/>
		<uni-card v-for="formData in formList">
		  <uni-forms>
				<uni-forms-item class="inputs" label="预约记录编码" name="debitCode">
				  <uni-easyinput type="text" v-model="formData.forwardCode" disabled/>
				</uni-forms-item>
		    <view class="user">
					<uni-forms-item class="inputs" label="姓名" name="userName">
					  <uni-easyinput type="text" v-model="formData.userName"disabled/>
					</uni-forms-item>
				</view>
				<uni-forms-item class="inputs" label="手机号" name="mobile">
				  <uni-easyinput type="text" v-model="formData.mobile" disabled/>
				</uni-forms-item>
				<uni-forms-item class="inputs" label="邮箱" name="mobile">
				  <uni-easyinput type="text" v-model="formData.email" disabled/>
				</uni-forms-item>
				<uni-forms-item class="inputs" label="预约图书馆名" name="library">
				  <uni-easyinput type="text" v-model="formData.libraryName" disabled/>
				</uni-forms-item>
				<uni-forms-item class="inputs" label="预约时间" name="forwardTime">
				  <uni-easyinput type="text" v-model="formData.forwardTime" disabled/>
				</uni-forms-item>
		  </uni-forms>
		</uni-card>
	</view>
</template>

<script>
export default {
  data() {
		return {
			formList:[],
			userId:""
		}
	},
	created(){
		this.getForward();
	},
	onShow(){
		uni.setNavigationBarTitle({
		　　title: '入馆预约'
		});
	},
	methods:{
		getForward(){
			const that = this
			uni.getStorage({
				key:"userId",
				success: function (res) {
					console.log(res.data);
					this.userId = res.data;
					that.getForwardInfo(this.userId);
					console.log(this.userId)
				}
			});
		},
		InsertForward(){
			// 跳转到新增预约记录的界面
			uni.redirectTo({
				url:'./addForward'
			})
		},
		async getForwardInfo(userId){
			// 调用后端请求
			const res = await this.$myRequest({
				url:"/app/getForwardInfoByUserId?userId="+userId,
				method:"POST",
			});
			this.formList = res.data.list
			console.log(this.formList)
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
