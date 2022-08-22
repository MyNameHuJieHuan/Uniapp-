<template>
	<view class="content">
		<uni-nav-bar color="#ffffff" background-color="#00aded" :status-bar="true" fixed="true" title="聊天" />
		<!-- 消息展示界面 -->
		<view class="message">
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
			openMessage(sendUserId){
				// 根据对应的userId打开对应的消息聊天室
				console.log("点击了")
				uni.setStorage({
					key: 'sendUserId',
					data: sendUserId
				});
				uni.redirectTo({
					url: './messageList?sendUserId='+sendUserId,
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
			// 获取当前userId下的所有与其联系过的联系人名单
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
	.content {
		text-align: center;
		height: 400upx;
	}
	.message{
		width: 320px;
		height: 510px;
	}
	.inputs{
		display: flex;
		flex-wrap: nowrap;
		height: 36px;
		/* border: 1px solid #dfdfdf; */
	}
	.inp{
		width: 260 px;
		height: 45px;
		padding-right: 40px;
		border: 0.5px solid #dfdfdf;
	}
</style>
