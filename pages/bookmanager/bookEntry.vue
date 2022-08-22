<template>
	<view class="bookEntry">
		<!-- 图书录入页面 -->
		<uni-nav-bar title="图书录入" color="#ffffff" background-color="#00aded" left-icon="left" rightIcon="scan" @clickLeft="back" @clickRight="onScan"/>
		<view>
			<uni-card title="图书信息" v-if="bookInfo!=''">
				<uni-forms>
					<uni-forms-item label="ISBN编码">
						<uni-easyinput type="text" v-model="bookInfo.ISBN" disabled></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="图书名">
						<uni-easyinput type="text" v-model="bookInfo.book_name" disabled></uni-easyinput>
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
				</uni-forms>
			</uni-card>
		</view>
		<!-- 确定图书录入取消和确定按钮 -->
		<view class="submit" v-if="bookInfo!=''">
			<button class="but" type="primary" @click="onCancel">取消</button>
			<button class="but" type="primary" @click="onSure">确定</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bookInfo:"",
			ISBN:"",
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
					// 调用新增书籍接口
					that.insertBookInfo(userId);
				}
			});
		},
		async insertBookInfo(userId){
			// 调用后端请求
			const res = await this.$myRequest({
				url:"/app/insertBookInfo",
				method:"POST",
				data:{
					bookInfo :this.bookInfo,
					userId :userId,
					ISBN :this.ISBN,
				}
			});
			console.log("res",res)
			// 当确定成功的时候将library里的数据清空
			if(res.data.msg =="success"){
				this.bookInfo = "";
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
			// 调用后端请求
			const res = await this.$myRequest({
				url:"/app/getBookInfo?ISBNCode="+ISBNCode,
				method:"POST",
			});
			console.log(res)
			// 判断是否扫码成功
			if(res.data.msg == "success"){
				// 将获取到的数据进行渲染
				this.bookInfo = res.data
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
