<template>
	<view class="">
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					{{label}}
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="checkA" :range="listA">
						<view class="uni-input">{{listA[checkA]}}</view>
					</picker>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	// 下拉模板
	// import formList from '../../components/formList/selectPicker'
	// <selectPicker />
	export default {
		components: {
			// formList
		},
		data() {
			return {
				name: '',
				listA: [],
				checkA:0,
				childType:''
			}
		},
		props:{
			// 选中的值
			check:{
				// type:Number,
				default:()=>{
					return 0
				}
			},
			// 选中的值
			list:{
				type:Array,
				default:()=>{
					return []
				}
			},
			label:{
				type:String,
				default:()=>{
					return '请选择'
				}
			},
		},
		onLoad() {
		},
		created () {
			this.childType=this.checkType(this.list[0])
			if (this.childType=="Object") {
				this.listA=this.list.map(val=>val.text)
				let c=this.list.filter(value =>value.id== this.check)
				if (c.length>0) {
					this.checkA=c[0]
				}
				// else{
				// 	this.checkA=0
				// }
			}else{
				this.listA=this.list
				this.checkA=this.check
			}
			
		},
		methods: {
			// 选择事件
			bindPickerChange: function(e) {
				this.checkA = e.target.value
				this.$emit('selectObj',this.list[this.checkA])
			},
		}
	}
</script>

<style lang="scss" scoped>
	// @import 'index.scss'
</style>
