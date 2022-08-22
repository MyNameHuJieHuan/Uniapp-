
## hpy-form-select 下拉选择器 基于 [picker](https://uniapp.dcloud.io/component/picker?id=picker) 简单封装

> **组件名：hpy-form-select

从底部弹起的滚动选择器。支持五种选择器，通过mode来区分，分别是普通选择器，多列选择器，时间选择器，日期选择器，省市区选择器，默认是普通选择器

## API

### FilePicker Props

| 属性名			| 类型			| 默认值	| 可选值			| 说明																	|
| v-model/value	| Array\Object	| -			| -			| 绑定的数据
| dataList		| Array / Array＜Object＞ -				| 选择器数据								|
| title			| String								| 默认标题：请选择			|
| text			| String								| 显示值的key								|
| name	  		| String								| 保存值的key		
| disabled	  	| Boolean								| 是否禁用

## 使用示例
## dataList 为对象数组时，name为实际保存的value值，text为显示的值
## dataList 为对象数组[{name:'张三', age:'18'}, {name:'李四', age:'19'}]时，需要设置name、text属性，name为实际保存的value值，text为显示的值
## <hpy-form-select :dataList="dataList" text="name" name="age" v-model="formData.age" @change="change" />
## ======================================================================================================
## dataList 为普通数组['张三', '李四'] name、text可不设置
## <hpy-form-select :dataList="dataList" v-model="formData.name" @change="change" />
## 类似：
## <select>
###    <option value="name">text</option>
## </select>

```html
	<hpy-form-select :dataList="hobbyList" text="text" name="value" v-model="formData.hobbySelect" @change="change" />
	 
	<uni-group title="基础信息" margin-top="0">
		<uni-forms-item label="姓名" name="name">
			<uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
		</uni-forms-item>
		
		<uni-forms-item label="爱好2" name="hobby2">
			<hpy-form-select :dataList="hobbyList" text="text" name="value" v-model="formData.hobbySelect"/>
		</uni-forms-item>
		
		<uni-forms-item label="出生时间(年)" name="birthYear" >
			<hpy-form-select mode="date" fields="year" v-model="formData.birthYear" />
		</uni-forms-item>
	</uni-group>
```

```javascript
export default {
		data() {
			return {
				formData:{
					hobbySelect:''
				},
				hobbyList: [{
					text: '足球',
					value: 1
				}, {
					text: '篮球',
					value: 2
				}, {
					text: '游泳',
					value: 3
				}],
			}
		},
		methods:{
			change(e){
				console.log(e.index);
				console.log(e.value);
				console.log(e.data);
			}
		}
}

```