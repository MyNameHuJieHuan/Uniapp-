<!--<script src="./util.js"></script>-->
<template>
    <view class="areaSelect">
        <div class="areaSelect_show">
            <view @tap="handleTap()" class="areaSelect_l">{{lineSlect}}</view>
            <view @tap="handleTap()" class="areaSelect_r iconfont">&#xe60c;</view>
        </div>
        <lbPicke ref="picker"
                 v-model="value"
                 mode="multiSelector"
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
  // import areaData from './area-data-min'
  // import { areaData } from '../areaData'

  import lbPicke from './lb-picker/index'
  export default {
    components: {
      lbPicke
    },
    data() {
      return {
        name: '',
        lineSlect:'请选择',
        value: [],
        inList: [],
      }
    },
    props:{
      join:{
        default:()=>{
          return ','
        }
      },
      // 搜索
      searchShow:{
        // type:Number,
        default:()=>{
          return false
        }
      },
      level:{
        default:()=>{
          return 3
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
      },
      list:{
        default:()=>{
          return []
        }
      }
    },
    created() {
      this.inList=this.list
      this.strToVal(this.val)
    },
    onLoad() {
    },
    methods: {
      // str转val
      strToVal(areaStr){
        let areaArr=[]
        if (areaStr) {
          this.lineSlect=areaStr
          let arr=areaStr.split(this.join)
          let mindArr=this.inList
          let inArr=[]
          arr.forEach((val,index)=>{
            inArr=mindArr.filter(val2=>{
              if (val2.label==val) {
                return val2
              }
            })
            mindArr=(inArr[0]&&inArr[0].children)?inArr[0].children:[]
            if (inArr.length>0) {
              areaArr.push(inArr[0].value)
            }
          })
          this.value= areaArr
          return areaArr
        }else{
          this.lineSlect='请选择'
          this.value= []
          return []
        }

      },
      handleTap () {
        this.$refs['picker'].show()
      },
      handleChange (item) {
      },
      handleConfirm (item) {
        this.lineSlect=item.item.map(val=>val.label).join(this.join)
        let value=item.item.map(val=>val.value).join(this.join)
        if (this.code==='') {
          this.$emit('selectValue',this.lineSlect)
        }else{
          this.$emit('selectValue',{value:this.lineSlect,code:this.code,id:value,})
        }
      },
      handleCancel (item) {
      },

    },
    watch:{
      val:{
        handler(val) {
          this.value=this.strToVal(val)
        },
        immediate: true,
        deep: true
      },
      list:{
        handler(val) {
          this.inList=val
        },
        immediate: true,
        deep: true
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "scss/iconfont.css";

    // @import 'index.scss'
    $red:#EE210C;
    .areaSelect{
        position: relative;
        width: 100%;
        .areaSelect_show{
            display: flex;
            justify-content: space-between;
            align-content: center;
        }
        .areaSelect_l{
            flex-shrink: 1;
            width: 100%;
        }
        .areaSelect_r{
            flex-shrink: 0;
            font-size: 28rpx;
            line-height: 40rpx;
        }
    }
</style>

