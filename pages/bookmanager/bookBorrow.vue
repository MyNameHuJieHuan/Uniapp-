<template>
	<view class="bookEntry">
		<!-- 图书录入页面 -->
		<uni-nav-bar title="图书借还" color="#ffffff" background-color="#00aded" left-icon="left" rightIcon="scan" @clickLeft="back" @clickRight="onScan"/>
		<view>
			<uni-card title="图书信息" v-if="bookInfo!=''">
				<uni-forms>
					<uni-forms-item label="ISBN编码">
						<uni-easyinput type="text" v-model="bookInfo.book_code" disabled></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="图书名">
						<uni-easyinput type="text" v-model="bookInfo.book_name" disabled></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="馆存位置">
						<uni-easyinput type="text" v-model="'门号:'+bookInfo.door+'  行号:'+bookInfo.book_row+'  列号:'+bookInfo.book_line" disabled></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="作者">
						<uni-easyinput type="text" v-model="bookInfo.author" disabled></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="出版社">
						<uni-easyinput type="text" v-model="bookInfo.book_press" disabled></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="出版时间">
						<uni-easyinput type="text" v-model="bookInfo.press_time" disabled></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="定价">
						<uni-easyinput type="text" v-model="bookInfo.pricing" disabled></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="借书人">
						<uni-easyinput type="text" v-model="bookInfo.username"></uni-easyinput>
					</uni-forms-item>
				</uni-forms>
			</uni-card>
		</view>
		<!-- 确定图书录入取消和确定按钮 -->
		<view class="submit" v-if="bookInfo!=''">
			<button class="but" type="primary" @click="onCancel">{{cancel}}</button>
			<button class="but" type="primary" @click="onSure">{{status}}</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bookInfo:"",
			ISBN:"",
			status:"",
			cancel:"",
			circulationId:""
		}
	},
	methods: {
		onSure(){
			// 将获取到的书籍新增我们本地的图书馆数据库
			// 获取userId
			const that = this
			uni.getStorage({
				key:"userId",
				success: function (res) {
					let userId = res.data;
					// 调用新增或修改借还书接口
					that.insertCirculation(userId);
				}
			});
		},
		async insertCirculation(userId){
			// 调用后端请求
			console.log(this.bookInfo.statuss)
			const res = await this.$myRequest({
				url:"/app/insertCirculation",
				method:"POST",
				data:{
					bookId :this.bookInfo.book_id,
					userId :userId,
					statuss :this.bookInfo.statuss,
					user: this.bookInfo.username,
					circulationId:this.circulationId
				}
			});
			console.log("res",res)
			// 当确定成功的时候将library里的数据清空
			if(res.data.msg =="success"){
				this.bookInfo = "";
			}else{
				uni.showToast({
					title:res.data.message
				})
			}
		},
		onScan() {
		  // 只允许从相机扫码
			const that = this
			onlyFromCamera: false,
		  uni.scanCode({
		    success: function (res) {
					// 调用后端接口,查询图书ISBN编码对应的信息
					that.getBookInfo(res.result);
					this.ISBN = res.result;
		    }
		  });
		},
		async getBookInfo(ISBNCode){
			// 调用后端请求，查询借还书表判断该书的借还状态
			const res = await this.$myRequest({
				url:"/app/getCirculationInfo?ISBNCode="+ISBNCode,
				method:"POST"
			});
			console.log(res)
			// 判断是否扫码成功
			if(res.data.msg == "success"){
				// 将获取到的数据进行渲染
				this.bookInfo = res.data
				// 将按钮文字进行设计
				if(this.bookInfo.statuss == 0){
					this.status = "确认借书",
					this.cancel = "取消借书"
				}else{
					this.status = "确认还书",
					this.cancel = "取消还书",
					this.circulationId = this.bookInfo.circulation_id
				}
			}else{
				uni.showToast({
					title:"扫描失败，请重新扫码"
				})
			}
			
		},
		onCancel(){
			this.bookInfo = "",
			// 取消将所有选择的数据进行清空
			// 并返回预约记录界面
			uni.redirectTo({
				url: './index'
			})
		},
		back(){
			uni.redirectTo({
				url:"./index",
			});
		}
	}
}
</script>

<style>
	.bookEntry{
		margin-top: 20px;
	}
	.submit{
		display: flex;
		flex-wrap: nowrap;
		margin-top: 50px;
	}
</style>
