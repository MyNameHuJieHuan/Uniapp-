<template>
	<view class="addForward">
		<uni-nav-bar color="#ffffff" background-color="#00aded" :status-bar="true" left-icon="arrowleft" left-text="返回" fixed="true"
			title="预约新增" @clickLeft="back" />
		<!-- 使用表单进行对预约记录的提交 -->
		<!-- 选择图书馆 -->
		<view class="selectLibrary">
			<label class="text1">预约图书馆：</label>
			<picker selectLibrary @change="bindPickerChange" :range="list" :range-key="'libraryName'">	
			<!-- //@change用于获取下拉框改变的值，:range用于循环遍历array数组将数组内容循环 -->
				<view class="picker">
					{{index>0 ? list[index].libraryName : index==0 ? list[0].libraryName :'请选择图书馆'}}
				</view>
			</picker>
		</view>
		<!-- 选择图书馆预约时间 -->
		<view class="forwardTime">
			<label class="text2">预约时间：</label>
			<uni-section class="select2"
			  :title="'日期时间用法：'"
			  type="line"
			></uni-section>
			<view class="example-body">
			  <uni-datetime-picker
			    type="datetime"
			    v-model="datetimesingle"
			  />
			</view>
		</view>
		<!-- 确认提交预约 -->
		<view class="submit">
			<button class="but" type="primary" @click="onCancel">取消</button>
			<button class="but" type="primary" @click="onSure">确定</button>
		</view>
	</view>
</template>

<script>
import xflSelect from '../../../components/xfl-select/xfl-select.vue';     //导入	
export default{
	data(){
		return{
			list:[],
			newList:[],
			index:-1,
			library:"",
			datetimesingle: [],
		}
	},
	created(){
		// 调用后端接口,获取图书馆下拉框的初始数据
		this.getLibraryList();
	},
	methods:{
		async getLibraryList(){
			// 调用后端请求
			const res = await this.$myRequest({
				url:"/app/getLibraryNameList",
				method:"POST",
			});
			this.list = res.data.list
		},
		bindPickerChange(e){
			// 用于输出改变索引值
			this.index = e.target.value			//将数组改变索引赋给定义的index变量
			this.library=this.list[this.index]		//将array【改变索引】的值赋给定义的jg变量
		},
		onSure(){
			// 判断当前用户的图书馆是否已经选择
			console.log("library",this.library)
			if(this.library == ""){
				uni.showToast({
					title:"请选择图书馆"
				})
				return
			}else{
				// 调用预约的接口
				this.getForward();
			}
		},
		getForward(){
			console.log("进来了")
			const that = this
			uni.getStorage({
				key:"userId",
				success: function (res) {
					let userId = res.data;
					that.insertForward(userId);
				}
			});
		},
		async insertForward(userId){
			// 调用后端请求
			console.log(this.datetimesingle.length)
			// 判断当前选择的时间有没有选择小时，没有默认为0点
			if(this.datetimesingle.length == 11){
				this.datetimesingle = this.datetimesingle+" 00:00:00"
			}
			let libraryIds = this.library.libraryId;
			const res = await this.$myRequest({
				url:"/app/insertForward",
				method:"POST",
				data:{
					userId:userId,
					libraryId:libraryIds,
					forwardTime:this.datetimesingle
				}
			});
			console.log(res)
			// 成功的时候调用返回方法
			this.back();
		},
		onCancel(){
			this.library = "",
			// 取消将所有选择的数据进行清空
			this.datetimesingle ="";
			// 并返回预约记录界面
			uni.redirectTo({
				url: './forward'
			})
		},
		back() {
			console.log("点击了返回")
			uni.redirectTo({
				url: './forward'
			})
		},
	}
}
</script>

<style>
	.selectLibrary{
		display: flex;
		flex-wrap: wrap;
		margin-top: 30px;
		margin-bottom: 30px;
		width: 300px;
		.text1{
			width: 100px;
			height: 20px;
		}
		
	}
	.select1{
		width: 150px;
		border: 0.5px solid #000000;
	}
	.select2{
		width: 150px;
	}
	.submit{
		display: flex;
		flex-wrap: nowrap;
		margin-top: 50px;
	}
</style>
