//功能：暴露接口
export const myRequest = (options) => { //暴露一个function：myRequest，使用options接收页面传过来的参数
	console.log("http://192.168.137.206:8018" +options.url)
	return new Promise((resolve, reject) => { //异步封装接口，使用Promise处理异步请求
		uni.request({ //发送请求
			url: "http://192.168.9.156:8018" + options.url, //接收请求的API
			method: options.method || 'GET', //接收请求的方式,如果不传默认为GET
			data: options.data || {}, //接r收请求的data,不传默认为空
			success: (res) => { //数据获取成功
				resolve(res) //成功,将数据返回
			},
			fail: (err) => { //失败操作
				uni.showToast({
					title: '请求失败！请联系管理员！',
					icon: 'none',
					mask: true
				});
				reject(err)
			}
		})
	})
}
