<template>
	<view class="content">
		<uni-nav-bar color="#ffffff" background-color="#00aded" :status-bar="true" left-icon="arrowleft" left-text="返回" fixed="true"
			:title="userName" @clickLeft="back"/>
		<!-- 消息展示界面 -->
		<!-- 将消息按照时间倒排 -->
		<view class="screen">
			<scroll-view class="message" v-for="(item,index) in list">
				<view class="send1" v-if="item.status == 0">
					<uni-card>
						<uni-forms>
							<uni-forms-item>
								<uni-easyinput type="text" v-model="item.insertTime" disabled></uni-easyinput>
							</uni-forms-item>
							<uni-forms-item>
								<uni-easyinput type="text" v-model="item.messageInfo" disabled></uni-easyinput>
							</uni-forms-item>
						</uni-forms>
					</uni-card>
				</view>
				<view class="send2" v-if="item.status == 1">
					<uni-card>
						<uni-forms>
							<uni-forms-item>
								<uni-easyinput class="time2" type="text" v-model="item.insertTime" disabled></uni-easyinput>
							</uni-forms-item>
							<uni-forms-item>
								<uni-easyinput type="text" v-model="item.messageInfo" disabled></uni-easyinput>
							</uni-forms-item>
						</uni-forms>
					</uni-card>
				</view>
			</scroll-view>
		</view>
		<!-- 消息输入框界面 -->
		<view class="inputs">
				<input class="inp" placeholder="请输入内容" v-model="matter"/>
				<button style="margin-right: 2px;" type="primary" @click="send">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				sendUserId:0,
				userName:"",
				matter:"",
				userId:0
			}
		},
		created(){
			// 获取读者的相关消息
			this.getsendUserId();
			this.getMessageList();
			// 获取聊天消息的高度
		},
		onLoad(option) {
			this.sendUserId = decodeURIComponent(option.sendUserId);
			uni.setNavigationBarTitle({
				　title: this.userName
			});
		},
		methods: {
			getsendUserId(){
				const _this = this;
				uni.getStorage({
					key:"sendUserId",
					success: function (res) {
						console.log(res.data)
						_this.sendUserId = res.data;
					}
				});
				console.log(_this.sendUserId)
				this.getMessageDetail(this.userId,_this.sendUserId)
			},
			send(){
				// 将输入框中的消息发送到相对应的联系人
				// 首先判断当前的输入是否为空,为空则提示用户不应该为空
				if(this.matter.trim() == ""){
					uni.showToast({
					  title: "发送的内容不能为空",
					  icon: 'none'
					})
				}else{
					this.sendMessage();
				}
			},
			async sendMessage(){
				// 发送消息
				const res = await this.$myRequest({
					url:"/app/insertMessage",
					method:"POST",
					data:{
						receivedUserId:this.sendUserId,
						sendUserId:this.userId,
						matter:this.matter
					}
				});
				// 清空输入框
				this.matter = "",
				// 刷新当前页面
				this.getMessageDetail(this.userId,this.sendUserId)
			},
			back(){
				uni.switchTab({
					url: './message'
				})
			},
			getMessageList(){
				const that = this
				uni.getStorage({
					key:"userId",
					success: function (res) {
						this.userId = res.data;
						that.getMessageDetail(this.userId,this.sendUserId);
					}
				});
			},
			async getMessageDetail(userId,sendUserId){
				// 调用后端请求
				console.log("isd",userId,sendUserId)
				this.userId = userId
				console.log("sendUserId",this.sendUserId)
				if(sendUserId != undefined){
					this.sendUserId = sendUserId
				}
				console.log("isd",userId,this.sendUserId)
				const res = await this.$myRequest({
					url:"/app/getMessageDetail",
					method:"POST",
					data:{
						sendUserId:this.userId,
						receivedUserId:this.sendUserId
					}
				});
				console.log(res)
				this.list = res.data.list
				// 遍历list
				for(let i =0;i<this.list.length;i++){
					if(this.list[i].status == 1){
						this.userName = this.list[i].sendUserName
						// 找到结果了,结束循环
						break;
					}
				}
				console.log(this.userName)
				console.log(this.list)
			}
		}
	}
</script>

<style scoped>
	.content {
		text-align: center;
	}
	.screen{
		height: 550px;
	}
	.message{
		display: flex;
	}
	.send1{
		background-color: #ffff7f;
		border: 1px solid #00ADED;
		margin-left: 100px;
		margin-bottom: 5px;
		margin-top: 5px;
	}
	.send2{
		background-color: #aaffff;
		border: 1px solid #ff5500;
		margin-right: 100px;
		margin-bottom: 5px;
		margin-top: 5px;
	}
	.inputs{
		position: fixed;
    bottom: 10px;
    left: 0;
    right: 0;
		display: flex;
		flex-wrap: nowrap;
		margin-bottom: 1px;
		border-radius: 10px;
		border: 1px solid #dfdfdf;
	}

	.inp{
		width: 250px;
		height: 45px;
		border-radius: 10px;
		border: 0.5px solid #dfdfdf;
	}
</style>
