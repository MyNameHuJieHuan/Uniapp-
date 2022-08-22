<template>
	<view class="reading">
		<uni-nav-bar color="#ffffff" background-color="#007AFF" :status-bar="true" left-icon="arrowleft" left-text="返回" :rightIcon="bookMap.statue" @clickRight="addBook" fixed="true"
			title="" @clickLeft="back"/>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bookId:"",
				userId:"",
				bookMap:""
			}
		},
		created(){
			// 获取bookId获取该图书的图书资源
			this.getUserId();
		},
		onLoad(option) {
			this.bookId = decodeURIComponent(option.bookId);
			uni.setNavigationBarTitle({
				　title: this.userName
			});
		},
		methods:{
			getUserId(){
				const that = this
				uni.getStorage({
					key:"userId",
					success: function (res) {
						this.userId = res.data;
						that.getBookById(this.userId);
					}
				});
			},
			addBook(){
				// 首先判断该书籍是否已经添加进书架,如果已经添加了,则提示用户
				if(this.bookMap.statue == "checkmarkempty"){
					uni.showToast({
						title:"该书已经添加"
					})
					return
				}else{
					// 调用接口将该书添加给对应用户的书架中
					this.addBookInBookRack();
				}
			},
			async addBookInBookRack(){
				const res = await this.$myRequest({
					url:"/app/addBookInBookRack",
					method:"POST",
					data:{
						bookId:this.bookId,
						userId:this.userId
					}
				});
				console.log(res)
			},
			back(){
				uni.switchTab({
					url: './bookrack'
				})
			},
			async getBookById(userId){
				// 根据userId和bookId获取该数据的相关信息
				// 调用后端请求
				this.userId = userId
				const res = await this.$myRequest({
					url:"/app/getBookById",
					method:"POST",
					data:{
						bookId:this.bookId,
						userId:this.userId
					}
				});
				this.bookMap = res.data,
				// 调用相关接口进行阅读的识别
				console.log(this.bookMap)
				this.readTestFile(this.bookMap.bookTxtUrl)
			},
			// 读取txt文件
			readTestFile(bookTxtUrl) {
				console.log("bookTxt",bookTxtUrl)
			  const file = this.loadFile(bookTxtUrl)
			  console.log(this.unicodeToUtf8(file))
			},
			// 读取文件
			loadFile(name) {
				console.log("name",name)
			  const xhr = new XMLHttpRequest()
				console.log("000000")
			  const okStatus = document.location.protocol === 'file:' ? 0 : 200
				console.log("111111")
			  xhr.open('GET', name, false)
				console.log("2222222")
			  xhr.overrideMimeType('text/html;charset=utf-8')
				console.log("333333")
			  // 默认为utf-8
			  xhr.send(null)
				console.log("4444444")
			  return xhr.status === okStatus ? xhr.responseText : null},
			},
			unicodeToUtf8(data) {
				// unicode转utf-8
				console.log("data1",data)
				data = data.replace(/\\/g, '%')
				console.log("data",unescape(data))
				return unescape(data)
			}
	}
</script>

<style>
</style>
