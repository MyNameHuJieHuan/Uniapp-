<template>
	<view class="recommendSelect">
		<!-- 首先根据后端维护的标签数据，进行对标签数据的展示 -->
		<view v-for="(item,index) in formList">
			<view class="topic" id= "index">
				<view style="margin-left: 5px;">题目{{index+1}}:{{item.title}}</view>
				<view >
					<radio class="radio" v-if="item.optionA!=''" :id="index+'A'">A:{{item.optionA}}</radio>
					<radio class="radio" v-if="item.optionB!=''" :id="index+'B'">B:{{item.optionB}}</radio>
					<radio class="radio" v-if="item.optionC!=''" :id="index+'C'">C:{{item.optionC}}</radio>
					<radio class="radio" v-if="item.optionD!=''" :id="index+'D'">D:{{item.optionD}}</radio>
				</view>
			</view>
		</view>
		<!-- 确定标签选择取消和确定按钮 -->
		<view class="submit">
			<button class="but" type="primary" @click="onCancel">取消</button>
			<button class="but" type="primary" @click="onSure">确定</button>
		</view>
	</view>
</template>

<script>
export default {
  data() {
		return {
			formList:[],
			userId:''
		}
	},
	created(){
		this.getUserId();
		this.getSubjectList();
	},
	methods:{
		onSure(){
			// 提交表单,判断已经都填好了吗
			// if(){
				
			// }
			this.insetCorrelation(this.userId);
		},
		async insetCorrelation(userId){
			console.log(userId)
			const res = await this.$myRequest({
				url:"/app/insetCorrelation",
				method:"POST",
				data:{
					userId: userId,
					value: this.value
				}
			});
			console.log(res)
			// 新增成功后直接返回到用户首页
			//跳转到读者tabar操作界面
			if(res.data.code == 0){
				uni.switchTab({
					url:"../tabbar/home/home",
				});
			}
		},
		onCancel(){
			// 返回登录页面
			uni.redirectTo({
				url:"./login"
			})
		},
		async getSubjectList(){
			// 获取标签的基础数据
			// 调用后端请求
			const res = await this.$myRequest({
				url:"/app/getSubjectList",
				method:"POST",
			});
			this.formList = res.data.list;
			console.log("formList",this.formList)
		},
		getUserId(){
			const that = this
			uni.getStorage({
				key:"userId",
				success: function (res) {
					console.log(res.data);
					that.userId = res.data;
					console.log(that.userId)
				}
			});
		},
		confirm(e,index) {
			this.result = '';
			e.map((val, index) => {
				// this.result += this.result == '' ? val.label : '-' + val.label;
				let result = val.label
				this.result += result;
			})
		},
	},
}
</script>

<style>
	.submit{
		display: flex;
		flex-wrap: nowrap;
		margin-top: 50px;
	}
	.topic{
		margin-bottom: 20px;
	}
	.radio{
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 5px;
	}
</style>
