<template>
	<view class="content"></view>
</template>
 
<script>
	export default {
		data() {
			return {
				activity: null,
				receiver: null,
				intentFilter: null
			}
		},
		created: function(option) {
			this.initScan()
			this.startScan();
		},
		onHide: function() {
			this.stopScan();
		},
		destroyed: function() {
			//页面退出时一定要卸载监听,否则下次进来时会重复，造成扫一次出2个以上的结果/
			this.stopScan();
		},
		methods: {
			/**
			* 编写人：hukui；
			* 方法作用：开启扫描监听，并返回监听到的值
			* 参数：unll；
			* 返回值：抛出扫描监听到的值；
			* 注意：
			* */ 
			initScan() {
				let _this = this;
				//获取activity
				this.activity = plus.android.runtimeMainActivity(); 
				var IntentFilter = plus.android.importClass('android.content.IntentFilter');
				this.intentFilter = new IntentFilter();
				// 参数：PDA的广播名称；
				this.intentFilter.addAction('com.android.server.scannerservice.broadcast') 
				this.receiver = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
					onReceive: function(context, intent) {
						plus.android.importClass(intent);
						// 参数：PDA的广播标签；即监听的扫描按键
						let content = intent.getStringExtra('scannerdata');
						// 抛出扫描的值
						uni.$emit('scancodedate', content)
					}
				});
			},
			startScan() {
				this.activity.registerReceiver(this.receiver, this.intentFilter);
			},
			stopScan() {
				this.activity.unregisterReceiver(this.receiver);
			}
		}
	}
</script>
 
<style>
</style>