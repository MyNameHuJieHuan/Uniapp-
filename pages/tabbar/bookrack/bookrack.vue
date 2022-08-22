<template>
	<view class="content">
		<uni-nav-bar color="#ffffff" background-color="#007AFF" :status-bar="true" fixed="true" title="书架" />
		<!-- 搜索栏 -->
		<view class="search">
			<uni-search-bar placeholder="请输入书名" v-model="context" :radius="100" @input="change" @cancel="cancel"></uni-search-bar>
		</view>
		<!-- 搜索隐藏栏 -->
		<uni-collapse>
		    <uni-collapse-item :open="status">
		      <view v-for="(item,index) in selectList" id="index">
		      	<view @click="readBook(item)">
		      		<image :mode="mode" :src="item.bookImageUrl" style="margin-left: 10px; width: 70px;height: 100px;"></image>
		      		<view>
		      			<span style="font-size: 8px;margin-left: 25px;">{{item.bookName}}</span>
		      		</view>
		      	</view>
		      </view>
		    </uni-collapse-item>
		</uni-collapse>
		<view class="bookRackInfo">
			<view v-for="(item,index) in list" id="index">
				<view @click="readBook(item)">
					<image :mode="mode" :src="item.bookImageUrl" style="margin-top:10px;width: 30%;height: 100px;"></image>
					<view>
						<span style="font-size: 8px;">{{item.bookName}}</span>
					</view>
				</view>
			</view>
		</view>
		<!-- 用户提示 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mode: 'scaleToFill',
				list:[],
				selectList:[],
				context:"",
				status:false
			}
		},
		created(){
			// 获取用户相关信息
			this.getUserId();
		},
		onShow(){
			uni.setNavigationBarTitle({
			　　title: '书架'
			});
		},
		methods: {
			readBook(item){
				// 跳转到阅读界面
				console.log("item",item)
				// 将书籍id传到阅读界面
				uni.redirectTo({
					url: './reading?bookId='+item.bookId,
				});
			},
			// 获取书架相关信息
			async getBookrackList(userId){
				// 调用后端请求
				console.log(userId)
				this.userId = userId
				const res = await this.$myRequest({
					url:"/app/getBookrackList",
					method:"POST",
					data:{
						userId:this.userId
					}
				});
				// 遍历list
				for(let i=0;i<res.data.list.length;i++){
					res.data.list[i].bookImageUrl = "/static/bookimage/"+res.data.list[i].bookImageUrl
				}
				this.list = res.data.list
			},
			getUserId(){
				const that = this
				uni.getStorage({
					key:"userId",
					success: function (res) {
						console.log("res",res.data);
						this.userId = res.data;
						that.getBookrackList(res.data)
					}
				});
			},
			change(res){
				// 将隐藏栏打开
				this.status = true
				console.log(res)
				// 调用接口进行查询
				this.selectBookList(res);
			},
			async selectBookList(res){
				// 调用后端请求
				console.log(this.userId)
				const ress = await this.$myRequest({
					url:"/app/selectBookList",
					method:"POST",
					data:{
						con:res,
						userId:this.userId
					}
				});
				console.log(ress)
				if(ress.data.code == 500){
					uni.showToast({
						title:ress.data.msg
					})
				}else{
					// 遍历list
					for(let i=0;i<ress.data.list.length;i++){
						ress.data.list[i].bookImageUrl = "/static/bookimage/"+ress.data.list[i].bookImageUrl
					}
					this.selectList = ress.data.list
				}
			},
			cancel(res){
				// 当用户点击取消时,将搜索栏中的所有内容清除并关闭折叠框
				this.status = false,
				this.context = ""
			}
		}
	}
</script>

<style>
</style>
