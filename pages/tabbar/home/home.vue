<template>
	<view class="content">
		<uni-nav-bar color="#ffffff" background-color="#00aded" :status-bar="true" fixed="true" title="首页" />
		<!-- 推荐轮播图 -->
		<!-- 分段器 -->
		<view>
			<uni-segmented-control :current="currents" :values="items" style-type="text" active-color="#4cd964" @clickItem="onClickItem">
				
			</uni-segmented-control>
		</view>
		<!-- 书籍展示 -->
		<view class="bookInfo">
			<view v-for="(item,index) in bookRows" id="index">
				<view @click="readBook(item)" style="width: 30%;">
					<image :mode="mode" :src="item.bookImageUrl" style="margin-top: 5px; margin-left: 10px; width: 70px;height: 100px;"></image>
					<view>
						<span style="font-size: 8px;text-align: center;">{{item.bookName}}</span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			items: [],
			currents: 0,
			info: [{
			  content: '内容 A'
			}, {
			  content: '内容 B'
			}, {
			  content: '内容 C'
			}],
			userId:'',
			contentMap:{},
			current: 0,
			mode: 'round',
			currentIndex:0,
			list:[],
			bookRows: []
		};
	},
	created(){
		// 获取用户相关信息
		this.getUserId();
	},
	onShow(){
		uni.setNavigationBarTitle({
		　　title: '推荐'
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
		async getSectionalizerList(userId){
			console.log("进入了")
			this.userId = userId;
			const res = await this.$myRequest({
				url:"/app/getSectionalizerList",
				method:"POST",
				data:{
					userId:this.userId
				}
			});
			this.contentMap = res.data.content
			this.items = Object.keys(this.contentMap)
			this.onClickItem({currentIndex: 0})
			console.log("contentMap",this.contentMap)
		},
		getUserId(){
			const that = this
			uni.getStorage({
				key:"userId",
				success: function (res) {
					console.log(res.data);
					this.userId = res.data;
					that.getSectionalizerList(this.userId)
					console.log(this.userId)
				}
			});
		},
		getCommendList(userId){
			console.log(userId)
		},
		changes(e) {
		  this.current = e.detail.current;
			// 根据分段器改变的数据转换相对应的数据
		},
		onClickItem({currentIndex}){
			const key = this.items[currentIndex]
			this.bookRows = this.contentMap[key]
			console.log(this.bookRows)
		}
	}
};
</script>

<style>
</style>
