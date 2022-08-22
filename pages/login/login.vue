<template>
	<view class="login">
		<view class="background">
		  <image
		    src="/static/login/login.jpg"
		    width="100%"
		    height="100%"
		    class="img"
		  ></image>
		</view>
		<view class="login_form">
		  <view class="user">
				<input class="inp" type="text" v-model="userName" 
				placeholder="请输入用户名"/>
		  </view>
		  <view class="password1">
				<input class="inp" type="password" v-model="password"
				placeholder="请输入密码"/>
		  </view>
		  <view class="loginBtn">
		    <button class="btn" @click="onclick">登  录</button>
		  </view>
		  <view class="registerBtn">
		     <button class="btn" @click="register">注  册</button>
		  </view>
		</view>
	</view>
</template>

<script>
import * as token from '../../utils/token.js'
export default {
  data() {
		return {
			//登录的用户名
			userName:"",
			password:"",
			// userName: "李四",
			// userName: "王五",
			//登录的用户名
			// userName: "张三",
			// password: "123",
		}
	},
	methods:{
		async onclick(){
			console.log("点击了")
		 const res = await	this.$myRequest({
				url:"/app/login",
				method:"POST",
				data:{
					userName: this.userName,
					password:this.password
				}
			});
			console.log(res)
			if(res.data.code != 0){
				uni.showToast({
					title:"登录失败"
				})
				return
			}
			if(res.statusCode == 200){
				// 判断当前用户是管理员还是读者
				console.log(res.data.userId)
				// 登录成功,将当前一些账号信息存储到数据缓存中
				uni.setStorage({
					key: 'userId',
					data: res.data.userId
				});
				if(res.data.roleId==1){
					// 管理员
					//跳转到管理员界面
					uni.redirectTo({
						url:"../bookmanager/index",
					});
				}else{
					// 读者时
					// 判断当前用户是否是第一次登录
					if(res.data.status==2){
						uni.redirectTo({
							url:"./recommendSelect",
						});
					}else{
						console.log("进入了")
						//跳转到读者tabar操作界面
						uni.switchTab({
							url:"../tabbar/home/home",
						});
					}
				}
				// 将当前的账号信息存储在cookie中,方便其他页面调用
			}else{
				// 判断当前用户输入的用户名是否没有注册,没有则提示注册
			}
		},
		register(){
			//跳转到注册界面
			uni.redirectTo({
				url:"./register",
			});
		}
	}
}
</script>

<style lang="scss">
	.img {
      width: 100%;
      height: 100%;
      /**宽高100%是为了图片铺满屏幕 */
    }
	.login_form{
		margin-top: 80px;
	}
	.loginBtn{
		padding-top: 30px;
	}
	.registerBtn{
		padding-top: 30rpx;
	}
	.btn {
	  background-color: #00aded;
	  color: #ffffff;
	  border-radius: 80rpx;
		width:180px;
	}
	.inp{
		display: flex;
		margin-top: 10px;
		text-align: center;
		border-radius: 10px;
		border: 1px solid #2C405A;
		margin-left: 60px;
		width: 200px;
		height: 40px;
	}
</style>
