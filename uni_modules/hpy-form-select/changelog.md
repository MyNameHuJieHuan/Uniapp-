## 0.0.6（2021-11-27）
- 污染源数据错误修正、v-model兼容vue3
- dataList 为对象数组[{name:'张三', age:'18'}, {name:'李四', age:'19'}]时，需要设置name、text属性，name为实际保存的value值，text为显示的值
- <hpy-form-select :dataList="dataList" text="name" name="age" v-model="formData.age" @change="change" />
- ======================================================================================================
- dataList 为普通数组['张三', '李四'] name、text可不设置
- <hpy-form-select :dataList="dataList" v-model="formData.name" @change="change" />
