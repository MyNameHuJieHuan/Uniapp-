<template>
    <view class="mySelect">
        <view class="mySelect_show">
            <view @tap="handleTap()" class="mySelect_l">{{lineSlect}}</view>
            <view @tap="handleTap()" class="mySelect_r iconfont">&#xe60c;</view>
        </view>
        <lbPicke ref="picker"
                 v-model="value"
                 :mode="mode"
                 :list="inList"
                 :searchShow="searchShow"
                 :level="level"
                 @change="handleChange"
                 @confirm="handleConfirm"
                 @cancel="handleCancel">
        </lbPicke>
    </view>
</template>
<script>
  // 地区选择
  // <areaSelect />
  // import areaSelect from '../../components/formList/areaSelect'
  import lbPicke from './lb-picker/index'
  import {backType, isArray} from './util'
  export default {
    components: {
      lbPicke
    },
    data() {
      return {
        name: '',
        lineSlect:'请选择',
        value: [],
        inList:[]
      }
    },
    props:{
      // 是否刷新
      resh:{
        default:()=>{
          return true
        }
      },
      isObj:{
        default:()=>{
          return false
        }
      },
      join:{
        default:()=>{
          return ','
        }
      },
      // 是否显示搜框
      searchShow:{
        default:()=>{
          return false
        }
      },
      outLineSlect:{
        default:()=>{
          return '请选择'
        }
      },
      list:{
        default:()=>{
          return ['1','n']
        }
      },
      level:{
        default:()=>{
          return 1
        }
      },
      code:{
        default:()=>{
          return ''
        }
      },
      val:{
        default:()=>{
          return ''
        }
      }
    },
    onLaunch(){
    },
    created() {
      this.setList()
      // this.strToVal(this.val)
    },
    mounted(){

    },
    onLoad() {
    },

    methods: {
      setList(){
        this.lineSlect=this.outLineSlect
        this.inList=this.list.map((val,index)=>{
          let obj={}
          if (backType(val,'String')) {
           //onsole.log(val)
            obj= {
              value:index+''||'',
              label:val
            }
          }else{
            obj= {
              ...val,
              value:val.value+''||index+'',
              label:val.label||index,
            }
          }
          return obj
        })
        this.strToVal(this.val)
      },
      strToVal(areaStr){
        let areaArr=[]
        if (areaStr) {
          areaStr+=''
          this.lineSlect=areaStr
          let arr=areaStr.split(this.join)
          let mindArr=this.inList
          let inArr=[]
          arr.forEach((val,index)=>{
            inArr=mindArr.filter(val2=>val2.label==val)
            mindArr=(inArr[0]&&inArr[0].children)?inArr[0].children:[]
            if (inArr.length>0) {
              areaArr.push(inArr[0].value)
            }
          })
          this.value= areaArr
          return areaArr
        }else{
          this.value= []
          this.lineSlect=this.outLineSlect||'请选择'
          return []
        }
      },
      handleTap () {
        this.$refs['picker'].show()
      },
      handleChange (item) {
      },
      handleConfirm (item) {
        if (!item) return
        this.lineSlect=''
        let idStr=''
        if (isArray(item.item)) {
          this.lineSlect=item.item.map(val=>val.label).join(this.join)
          idStr=item.item.map(val=>val.value).join(this.join)
        }else{
          this.lineSlect=item.item.label
          idStr=item.item.value
        }
        if (this.code==='') {
          this.$emit('selectValue',this.lineSlect)
        }else{
          this.$emit('selectValue',{value:this.lineSlect,code:this.code,idStr})
        }
      },
      handleCancel (item) {
      },
    },
    watch:{
      val:{
        handler(val) {
          this.strToVal(val)
        },
        immediate: true,
        deep: true
      } ,
      list:{
        handler(val,old) {
          // console.log('mySelect',this.code,val)
          if (val!=old) {
            this.setList()
          }
        },
        immediate: true,
        deep: true
      }
    },
    computed:{
      mode(){
        let back='selector'
        if (this.level>1) {
          back='multiSelector'
        }
        return back
      }
    }

  }
</script>
<style lang="scss" scoped>
@import "scss/iconfont.css";
.mySelect{
  position: relative;
  width: 100%;
  .mySelect_show{
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .mySelect_l{
    flex-shrink: 1;
    width: 100%;
  }
  .mySelect_r{
    flex-shrink: 0;
    font-size: 28rpx;
    line-height: 40rpx;
  }
}

</style>

