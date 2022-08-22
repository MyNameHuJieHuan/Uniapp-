<template>
	<view class="message">
		<!-- 消息管理页面 -->
		<uni-nav-bar title="消息管理" color="#ffffff" background-color="#00aded" left-icon="left" @clickLeft="back"/>
		<view class="content">
			<uni-card v-for="(item,index) in list">
			  <uni-forms :modelValue="item" id="index" >
					<view @click="openMessage(item.sendUserId)">
						<uni-forms-item class="inputs" label="联系人" name="userName">
						  <uni-easyinput type="text" v-model="item.sendUserName" disabled/>
						</uni-forms-item>
					</view>
				</uni-forms>
			</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		created(){
			// 获取读者的相关消息
			this.getMessageList();
		},
		onShow(){
			uni.setNavigationBarTitle({
			　　title: '消息'
			});
		},
		methods: {
			back(){
				uni.redirectTo({
					url:"./index"
				})
			},
			openMessage(sendUserId){
				// 根据对应的userId打开对应的消息聊天室
				console.log("点击了")
				uni.setStorage({
					key: 'sendUserId',
					data: sendUserId
				});
				uni.redirectTo({
					url: './messageList2?sendUserId='+sendUserId,
				});
				// 每次跳转的时候,将发送者Id存储到cookie中,并每次在这个地方进行更新
				
			},
			// 获取缓存中的userId
			getMessageList(){
				const that = this
				uni.getStorage({
					key:"userId",
					success: function (res) {
						console.log(res.data);
						this.userId = res.data;
						that.getMessageInfo(this.userId);
						console.log(this.userId)
					}
				});
			},
			// 管理员可以和所有的用户联系
			async getMessageInfo(userId){
				// 调用后端请求 
				const res = await this.$myRequest({
					url:"/app/getMessageInfoByUserId?userId="+userId,
					method:"POST",
				});
				console.log(res)
				this.list = res.data.list
				console.log(this.list)
			},
		}
	}
</script>

<style>
	.message{
		margin-top: 20px;
	}
</style>
