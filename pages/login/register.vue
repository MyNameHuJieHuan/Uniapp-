<template>
	<view class="register">
		<uni-nav-bar color="#ffffff" background-color="#00aded" :status-bar="true" left-icon="arrowleft" left-text="返回" fixed="true"
			title="注册" @clickLeft="back" />
		<view class="user">
			<input class="inp" type="text" v-model="userName" 
			placeholder="请输入用户名"/>
		</view>
		<view class="password1">
			<input class="inp" type="password" v-model="password"
			placeholder="请输入密码"/>
		</view>
		<view class="password2">
			<input class="inp" type="password" v-model="password2"
			placeholder="请确认密码"/>
		</view>
		<view class="mobile">
			<input class="inp" type="mobile" v-model="mobile"
			placeholder="请输入手机号码"/>
		</view>
		<view class="email">
			<input class="inp" type="email" v-model="email"
			placeholder="请输入邮箱"/>
		</view>
		<view class="loginBtn">
			<button class="btn" @click="oncancel">取  消</button>
		  <button class="btn" @click="onclick">确  定</button>
		</view>
	</view>
</template>

<script>
import * as checkExp from '../../utils/checkExp.js'
export default {
  data() {
		return {
			userName:'',
			password:'',
			password2:'',
			mobile:'',
			email:''
		}
	},
	methods:{
		oncancel(){
			console.log("点击了取消")
			uni.redirectTo({
				url: './login'
			})
		},
		onclick(){
			// 判断两次输入的密码是否一致
			if(this.password != this.password2){
				uni.showToast({
					title:"两次的密码输入不一致",icon:'error'
				})
				this.password = "",
				this.password2 = ""
			}
			// 判断手机号输入是否符合格式
			else if(!checkExp.checkMobile(this.mobile)){
				uni.showToast({
					title:"手机号格式错误",icon:'error'
				})
			}
			// 判断邮箱输入是否符合格式
			else if(!checkExp.checkEmail(this.email)){
				uni.showToast({
					title:"邮箱格式错误",icon:'error'
				})
			}else{
				// 当所有的表单数据都输入正确的时候,将其提交到后端
				this.register();
			}
		},
		async register(){
			const res = await	this.$myRequest({
				url:"/app/register",
				method:"POST",
				data:{
					userName: this.userName,
					password:this.password,
					mobile:this.mobile,
					email:this.email
				}
			});
			console.log(res)
			// 如果注册成功则跳到登录界面
			if(res.data.code == 0){
				uni.redirectTo({
					url:"./login"
				})
				// 并且清空表单
				this.userName = "",
				this.password = "",
				this.password2 = "",
				this.mobile = "",
				this.email = ""
			}
		},
		back() {
			uni.redirectTo({
				url: './login'
			})
		},
	},
}
</script>

<style>
	.user{
		margin-top:80px;
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
	.loginBtn{
		display: flex;
		justify-content: center;
		margin-top:30px
	}
	.btn {
	  background-color: #00aded;
	  color: #ffffff;
		margin-right:20px;
		margin-left: 20px;
	  border-radius: 80rpx;
		width:100px;
	}
</style>
