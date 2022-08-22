<template>
  <view class="formList" :style="{background:inConfig.background}" :class="inConfig.theme">
    <form @submit="submit" @reset="reset">
      <view v-for="(item,index) in inFormArr" class="formListItem" :key="item.code">
        <view class="inputItem" v-if="inputArr.includes(item.el)" :style="[inConfig.inputItemStyle]" :class="{yzm:item.el=='yzm',fromNoMid:noMid.includes(item.el)}">
          <view v-if="inConfig.required && item.required" class="isRequired" :style="[inConfig.requiredStyle]"><view class="isRequiredIn" :style="[inConfig.requiredInStyle]">{{inConfig.requiredContent}}</view></view>
          <view class="list_label"
                v-if="inConfig.labelShow"
                :style="[labelStyle]"
                :class="inConfig.required?'labelReq':''"
          >
            <view class="list_label_in" :style="[inConfig.labelStyleIn]">{{item.label}}</view>
          </view>
          <view class="theInput" :style="[inConfig.inputStyleOut]" :class="{inputReq:(inConfig.required&&!inConfig.labelShow),noBorder:noBorder.includes(item.el)}">
            <input @input="inputChange(item)" @confirm="keydown" @focus="getFocus(item)" @blur="getBlur(item)" v-if="item.el=='input' && item.type=='text'" v-model="inFormObj[item.code]" type="text" :maxlength="item.maxlength"
                   :placeholder="item.placeholder" />
            <input @input="inputChange(item)" @confirm="keydown" @focus="getFocus(item)" @blur="getBlur(item)" v-if="item.type=='number'" v-model="inFormObj[item.code]" type="number" :maxlength="item.maxlength"
                   :placeholder="item.placeholder" />
            <input @input="inputChange(item)" @confirm="keydown" @focus="getFocus(item)" @blur="getBlur(item)" v-if="item.type=='digit'" v-model="inFormObj[item.code]" type="digit" :maxlength="item.maxlength"
                   :placeholder="item.placeholder" />
            <input @input="inputChange(item)" @confirm="keydown" @focus="getFocus(item)" @blur="getBlur(item)" v-if="item.type=='idcard'" v-model="inFormObj[item.code]" type="idcard" :maxlength="item.maxlength"
                   :placeholder="item.placeholder" />
            <input @input="inputChange(item)" @confirm="keydown" @focus="getFocus(item)" @blur="getBlur(item)" v-if="item.type=='password'" :password="!item.showValue" v-model="inFormObj[item.code]" type="text" :maxlength="item.maxlength"
                   :placeholder="item.placeholder" />
            <textarea @input="inputChange(item)"  :autoHeight="item.autoHeight" :style="{height:item.height||'200rpx'}" @confirm="keydown" v-if="item.el=='textArea'"  v-model="inFormObj[item.code]" :maxlength="item.maxlength" :placeholder="item.placeholder" auto-height />
            <!-- 清除按钮 -->
            <view
                class="formList_clear"
                v-if="item.el=='input'"
            >
              <view class="input_clear" :style="{display: inFormObj[item.code].length>0?'flex':'none'}" @click="clearValue(item.code)"></view>
              <view v-if="item.type=='password'" @click="showValue(item)" class="input_eye iconfont" :class="item.showValue?'icon_xianshi dark':'icon_yincang'"></view>
            </view>
            <!-- 验证码 -->
            <input  @confirm="keydown" @focus="getFocus(item)" @blur="getBlur(item)" v-if="item.el=='yzm'" class="yzmInput" v-model="inFormObj[item.code]" type="number" :maxlength="item.maxlength"
                    :placeholder="item.placeholder" />
            <view v-if="item.el=='yzm'" class="send" :class="[item.className,{disabledClick:!yzmTitle[item.sort].send}]" :style="item.style">
              <text :style="{display:inFormObj[item.code].length>0 && item.clear?'inline-block':'none'}"  class="formList_clear yzm_clear" @click="clearValue(item.code)">&emsp;</text>
              <text class="yzml"></text>
              <text @click="sendYzm(item)">{{yzmTitle[item.sort].str}}</text>
            </view>
            <!-- 右边点击事件 -->
            <view class="rightClick"  v-if="item.rightClick" :style="[item.rightClickStyle]">
              <view @click="rightClick(item)"  v-if="backType(item.rightClick,'String')">{{item.rightClick}}</view>
              <view style="display: flex" v-if="backType(item.rightClick,'Array')">
                <view v-for="it in item.rightClick" @click="rightClick(item,it)"  :style="[...it.style]" :class="it.className||''" :key="it.valueRight">{{it.text}}</view>
              </view>
            </view>
            <!-- 右边点击获取微信的手机事件 -->
            <button v-if="item.getPhone"
                    class="textBtton rightClick"
                    open-type="getPhoneNumber"
                    bindgetphonenumber="getPhoneNumber"
                    :style="[item.style]"
                    @getphonenumber="getPhoneNumber">
              {{item.getPhone}}
            </button>
            <!--span 文本显示-->
            <view v-if="item.el=='span'">{{inFormObj[item.code]}}</view>
            <!--地区选择器-->
            <view class="w100" v-if="item.el=='area'">
              <areaSelect ref="area" :level="item.level" :list="item.list||inConfig.areaData" :searchShow="item.search" :code="item.code" :val="inFormObj[item.code]" :join="item.join" @selectValue="areaSelect"/>
            </view>
            <view class="w100" v-if="item.el=='select'">
              <mySelect ref="select" :level="item.level" :resh="item.resh?true:false" :searchShow="item.search" :code="item.code" :list="item.list" :outLineSlect="item.placeholder" :val="inFormObj[item.code]" :join="item.join" @selectValue="mySelect"/>
            </view>
            <!--switch-->
            <view v-if="item.el=='s'" class="sw">
              <switch  class="s" :color="item.color||'#1cbbb4'" @change="switchChange(item)" :checked="inFormObj[item.code]" />
            </view>
            <!--img-->
            <view v-if="item.el=='img'" class="formListImg">
              <image class="img" :class="item.sq?'':'yuan'" :src="inFormObj[item.code]" />
            </view>
            <!--checkBox-->
            <view v-if="item.el=='checkBox'" class="formCheckBox">
              <view  class="formCheckBox_item" v-for="i in item.list" @click="checkBoxChange(item,i)">
                <view
                    :style="{borderColor:inFormObj[item.code].includes(i.value)?item.activeColor||'#1677FF':item.color||'#9AA3AC',color:inFormObj[item.code].includes(i.value)?item.activeColor||'#1677FF':item.color||'#9AA3AC'}"
                    class="formCheckBox_state"
                    :class="[backCheckBoxClass(item,i)]"
                ></view>
                <view :style="{color:inFormObj[item.code].includes(i.value)?item.activeColor||'#1677FF':item.color||'#9AA3AC'}" v-html="i.label"></view>
              </view>
            </view>
            <!--上传文件-->
            <view class="formList_upfile" v-if="item.el=='update'">
              <view class="formList_imgitem"
                    :style="{display:inFormObj[item.code].length>0?'block':'none',width: `${Math.floor(10000/item.rows) /100}%`,paddingTop: `${Math.floor(10000/item.rows) /100}%`}"
                    v-for="(i,index) in inFormObj[item.code+'_list']" :key="i.path">
                <view class="formList_mid">
                  <view @click="delFile(item,i,index)" class="formList_imgdel iconfont icon_shanchu"></view>
                  <view class="formList_border">
                    <view class="formList_filetype">
                      <view class="formList_filetype_in">{{getType(i)}}</view>
                    </view>
                    <image v-if="isImg(i)" @click="viewImg(i)" class="formList_img" :src="i.path" />
                  </view>
                </view>
              </view>
              <view @click="updateFile(item)" class="formList_imgitem" :style="{display:inFormObj[item.code].length<item.max?'block':'none',width: `${Math.floor(10000/item.rows) /100}%`,paddingTop: `${Math.floor(10000/item.rows) /100}%`}">
                <view class="formList_mid">
                  <view class="formList_imgadd iconfont icon_jiahao"></view>
                </view>
              </view>
            </view>
            <!--  签名 signature-->
            <view class="formList_signature" v-if="item.el=='signature'">
              <signature :config="item.config" v-model="inFormObj[item.code]"></signature>
            </view>
            <view v-if="item.el=='date'">
              <datetimePicker
                  @change='dateChange(item)'
                  :ref="`dateTime${item.num}`"
                  :key="item.code"
                  :type="item.timeType"
                  :item="item"
                  :startYear="item.startYear"
                  :endYear="item.endYear"
                  :datestring="inFormObj[item.code]"
                  :isAll="true"
                  :current="false"
                  :placeholder="item.placeholder" />
              <input class="dateValue" @click="toggleTab(item)" v-model="inFormObj[item.code]" type="text"
                     :disabled="true"
                     :placeholder="item.placeholder"/>
            </view>
          </view>
        </view>
        <view v-if="item.el=='line'" class="formList_line" :style="[item.style]">
          <view class="line" :style="[item.styleIn]">{{item.content}}</view>
        </view>
        <view class="formListAdd" :style="[item.styleAdd]" v-if="item.add">
          <div class="itemAdd" :style="[item.styleItemAdd]" @click="itemAdd(item,index)">{{item.addName||'+'}}</div>
          <div class="itemAdd" :style="[item.styleItemReduce]" @click="itemReduce(item,index)">{{item.reduce||'-'}}</div>
        </view>
      </view>
    </form>
  </view>
</template>

<script>
/* 获取验证后的数据
* this.$refs.formRef.checkForm()
* 不通过是false
* 手动更新视图 obj可以不传
* this.$refs.formRef.changeForm(obj)
* formObj：可以设置默认值
*
* */

/* formArr
* el:span,input（默认）,yzm,area,select
* label:表单前面名字，只有el=line时不是必填
* code：挂载字段，只有el=line时不是必填
* required：是否必填，默认必填
* type：input的输入规则,text（默认普通文本）,number（数字）,digit（小数点，数值）,idcard（身份证）,password（密码）
* rexType：input的验证规则，在下面refObject里
* maxlength：最大长度
* minlength：最小长度
* placeholder：没写时的提示
* sameCode：需要相同时的字段
* errTip:验证不通过错误提示，默认可以不写使用的label
* */

/* 组件全局配置 config
* theme：
* */

/* enter按钮事件传出，传出的是验证通过的结果
* @enter="enter"
* */

/*
* 单独的对象
*
* date,选择时间组件
* type:
* date 年月日(默认)
* year-month 年月
* year 年
* datetime 年月日 时分
* datetime-all 年月日 时分秒
* time 时分秒
* hour-minute 时分
*
*
* select，单选
* list:[],
*
* line,分割线
* 默认高度 height:'20rpx'
*
* yzm,验证码组件
*  relatCode关联的表单
*  接收验证码 @yzmRelatCode="yzmRelatCode"
*  time，yzm专属，倒计时时间
*  storage:el是yzm时是否存储发送验证码时间，默认60秒不能再次点击，可以用time修改
*
* getPhone,通过微信小程序获取手机
* getPhone:'xxx'
* @getPhoneObj 接收一个对象包含encryptedData，iv，code，后端接收后可以拿来解析
*
* */


let timeout
// 验证规则 phone手机号，email 邮箱，idCard身份证验证，无算法验证
import areaSelect from './areaSelect'
import mySelect from './mySelect'
import datetimePicker from './bory-dateTimePicker'
import signature from './sin-signature'
import { isCardID } from './tools'
import {refObject, refArr, backType} from './util'
const getAreaStr=(code,split=',',provinces)=>{
  let provincCode=parseInt(code.substr(0, 2))+'0000'
  let cityCode=parseInt(code.substr(0, 4))+'00'
  let countyCode=parseInt(code.substr(0, 6))
  return `${provinces[provincCode]}${split}${provinces[cityCode]?provinces[cityCode]+split:''}${provinces[countyCode]}`
}
export default {
  components: {
    areaSelect,
    mySelect,
    signature,
    datetimePicker
  },
  data() {
    return {
      code:'',
      addObj:{},
      // 中间存储的数组list
      midFormList:[],
      inFormObjArr:[],
      inputArr:['input','textArea','checkBox','yzm','area','span','s','select','yzm','date','img','update','signature'],
      noBorder:['s','textArea','checkBox','update','signature'],
      noMid:['textArea','checkBox','update','signature'],
      inputNoArr:['yzm','area','span','s','select','yzm','date','img','checkBox','update','signature'],
      title: 'formList',
      yzmTitle: {
        0:{
          str:'发送验证码',
          send:true,
        }
      },
      inFormArr: [],
      inFormObj: {},
      formCheckObj: {},
      inConfig: {
        pureMode: false,// 是否只返回表单数据（纯净模式）
        labelShow: true,// 是否显示label
        required: true,// 是否显示*
        requiredContent:'*',// 是否显示X清除
        requiredStyle:{
          color:'red'
        },//*外部样式
        requiredInStyle:{

        },//*内部样式
        labelStyle:{},
        labelStyleIn:{},
        inputStyleOut:{},
        labelWidth: '5em',// label文字宽度
        labelAlign: 'left',// label对齐方式
        background: '#fff',// 背景颜色
        once:true,// 输入错误提示，所有验证是否只提醒第一个
        clear:true,// 是否显示X清除
        theme:'',// 是否显示X清除
        areaData:[]
      }
    }
  },
  props: {
    // ...datetimePicker.props,
    formArr: {
      default: () => {
        return []
      }
    },
    formObj: {
      default: () => {
        return {}
      }
    },
    // 组件配置
    config: {
      default: () => {
        return {}
      }
    },
  },
  created() {
    this.midFormList=[...this.formArr]
    this.changeInObj()
    this.changeForm(this.formObj)
    let autoLabel=1
    this.formArr.forEach(val=>{
      if (val.label) {
        if (val.label.length>autoLabel) {
          autoLabel=val.label.length
        }
      }
    })
    this.inConfig.labelWidth = autoLabel+'em'
    this.inConfig = Object.assign(this.inConfig, this.config)
  },
  onReady(){
  },
  mounted () {
    this.changeForm(this.formObj)
  },
  computed:{
    labelStyle(){
      let back={width: this.inConfig.labelWidth}
      if (this.inConfig.labelAlign=='justify') {
        back['text-align-last']='justify'
        back['text-align']='justify'
      }else{
        back['text-align']=this.inConfig.labelAlign
      }
      back=Object.assign(back,this.config.labelStyle)
      return  back
    }
  },
  methods: {
    backType(val,str){
      return backType(val,str)
    },
    // @change监听值的变化
    changeValue(item,type,value=''){
      let valueIn=value||this.inFormObj[item.code]||''
      this.$emit('change',{...item,changeType:type,value:valueIn})
    },
    // 输入框的监听
    inputChange(item){
      this.changeValue(item,'input')
    },
    // 自己增长
    itemAdd(item,index){
      let {code,el,addMax,label,addMaxError,oldCode}=item
      let obj={...item}
      oldCode=oldCode?oldCode:code
      obj.oldCode=obj.oldCode?obj.oldCode:code
      obj.oldLabel=obj.oldLabel?obj.oldLabel:label
      if (!this.addObj[oldCode]) {
        this.addObj[code]={
          codeList:[],
          num:0,
          code,
          label
        }
        obj.oldCode=code
      }
      if (addMax&&(addMax<=this.addObj[oldCode].num)) {
        uni.showToast({
          title: addMaxError||`${obj.oldLabel}最多添加${addMax}次`,
          icon: 'none',
          duration: 2000
        })
        return
      }
      this.addObj[oldCode].num++
      obj.code=oldCode+this.addObj[oldCode].num
      obj.label=obj.oldLabel+this.addObj[oldCode].num
      this.addObj[oldCode].codeList.push(obj.code)
      this.midFormList.splice(index+1,0,obj)
      this.changeValue(obj,'add')
      this.changeInObj()
    },
    // 减少
    itemReduce(item,index){
      let {code,oldCode}=item
      if (oldCode) {
        this.addObj[oldCode].num--
        this.addObj[oldCode].codeList=this.addObj[oldCode].codeList.filter(v=>v!=code)
      }
      this.midFormList.splice(index,1)
      this.changeInObj()
      this.changeValue(item,'reduce')
    },
    // 上传图片
    updateFile(item){
      let _this=this
      if (item.model=='img') {
        uni.chooseImage({
          count: item.max||9,
          sizeType: ['original', 'compressed'],
          sourceType: ['album'],
          success: (res)=> {
            uni.showLoading({
              mask: true,
            })
            const {tempFilePaths,tempFiles} = res;
            _this.updateFiles(item,tempFilePaths,tempFiles)
          }
        })
      }
      if (item.model=='file') {
        let extension=item.extension
        uni.chooseFile({
          count: item.max||9,
          extension,
          success: function (res) {
            const {tempFilePaths,tempFiles} = res;
            _this.updateFiles(item,tempFilePaths,tempFiles)
          }
        })
      }
      if (item.model=='video') {
        uni.chooseVideo({
          count: item.max||9,
          sourceType: ['camera', 'album'],
          success: function (res) {
            const {tempFilePaths,tempFiles} = res;
            _this.updateFiles(item,tempFilePaths,tempFiles)
          }
        })
      }
    },
    // uni.uploadFile 上传文件
    updateFiles(item,tempFilePaths,tempFiles){
      let _this=this
      if (item.uniCloud) {
        let afterLen=tempFiles.length+_this.inFormObj[item.code].length
        let midAr=afterLen>item.max?tempFiles.slice(0,item.max-_this.inFormObj[item.code].length):tempFiles
        _this.inFormObj[item.code+'_list']=[..._this.inFormObj[item.code+'_list'],...midAr]
        // 循环上传文件
        midAr.forEach(val=>{
          uniCloud.uploadFile({
            filePath:val.path,
            cloudPath:item.filePre+ val.name,
            onUploadProgress: (progressEvent)=> {},
            success(success) {
              uni.hideLoading()
              _this.inFormObj[item.code].push(success.fileID)
              _this.inFormArr=JSON.parse(JSON.stringify(_this.inFormArr))
              _this.changeValue(item,'file')
            },
            fail(fail){
              uni.hideLoading()
            }
          })
        })
      }else{
        let afterLen=tempFilePaths.length+_this.inFormObj[item.code].length
        let midArr=(afterLen>item.max)?tempFilePaths.slice(0,item.max-_this.inFormObj[item.code].length):tempFilePaths
        let midFileArr=(afterLen>item.max)?tempFiles.slice(0,item.max-_this.inFormObj[item.code].length):tempFiles
        _this.inFormObj[item.code]=[..._this.inFormObj[item.code],...midArr]
        _this.inFormObj[item.code+'_list']=[..._this.inFormObj[item.code+'_list'],...midFileArr]
        uni.hideLoading()

        _this.$emit('addFile',midFileArr)
        // 使用阿里云oss上传图片
        if (item.aLiYunOss) {
          midFileArr.forEach(val=>{
            let sign = item.sign|| this.config.sign // 获取签名等信息
            uni.uploadFile({
              url: sign.host,
              filePath: val.path,
              fileType: 'image',
              name: val.name,
              formData: {
                name: item.filePre+ val.name,
                'key': val,
                'policy': sign.policy,
                'OSSAccessKeyId': sign.accessId,
                'success_action_status': '200', //让服务端返回200,不然，默认会返回204
                'signature': sign.signature,
              },
              success: (res) => {
                if (res.statusCode != 200) {
                  uni.showToast({
                    title: '上传失败',
                    icon: 'none',
                    duration: 2000
                  })
                }else{
                  uni.showToast({
                    title: '上传成功',
                    icon: 'success',
                    duration: 2000
                  })
                  _this.inFormObj[item.code].push(sign.host+'/'+val.name)
                  _this.changeValue(item,'file')
                }
              },
              fail: (err) => {
                uni.showModal({
                  content: err.errMsg,
                  showCancel: false
                });
              }
            });
          })
        }
      }
    },
    isImg(i){
      return /image/.test(i.type)
    },
    getType(i){
      if (!/image/.test(i.type)) {
        return i.name
      }
    },
    // 预览图片
    viewImg(i){
      uni.previewImage({
        current:i.path,
        urls: [i.path],
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏'],
          success: (data)=> {
          },
          fail: (err)=> {
            console.log(err.errMsg);
          }
        }
      })
    },

    // 删除图片
    delFile(item,i,index){
      let file=this.inFormObj[item.code].splice(index,1)
      this.inFormObj[item.code+'_list'].splice(index,1)
      if (item.uniCloud) {
        uniCloud.deleteFile({
          fileList: file
        })
      }
    },
    // 显示底部时间组件
    toggleTab(item) {
      this.$refs[`dateTime${item.num}`][0].show();
    },
    // 日期改变事件
    dateChange(item){
      this.inFormObj[item.code]=this.$refs[`dateTime${item.num}`][0].inDateString
      this.changeValue(item,'date')
    },
    // switch按钮改变事件
    switchChange(item){
      this.inFormObj[item.code]=!this.inFormObj[item.code]
      this.changeValue(item,'switch')
    },
    // checkBox按钮改变事件
    checkBoxChange(item,i){
      let value=i.value
      let label=i.label
      let labelCode=item.getLabel||item.code+'_label'
      let index=this.inFormObj[item.code].indexOf(value)
      if (index>-1&&item.multi) {
        this.inFormObj[item.code].splice(index, 1)
        this.inFormObj[labelCode].splice(index, 1)
      }else{
        if (item.multi) {
          if (this.inFormObj[item.code].length==0) {
            this.inFormObj[item.code]=[]
            this.inFormObj[labelCode]=[]
          }
          this.inFormObj[item.code].push(value)
          this.inFormObj[labelCode].push(label)
        }else{
          this.inFormObj[item.code]=[value]
          this.inFormObj[labelCode]=[label]
        }
      }
      item.otherValue=this.inFormObj[labelCode]
      this.changeValue(item,'checkBox')
    },
    backCheckBoxClass(item,i){
      let val=i.value
      let check=this.inFormObj[item.code].includes(val)
      let bk=''
      bk+=check?' check ':''
      if (item.custom) {
        bk+=check?item.customCheck:item.customNoCheck
      }else{
        bk+=item.solid?' noBorderCheck':''
        bk+=item.round&&!check?' icon_yuanxingweixuanzhong':''
        bk+=item.round&&item.solid&&check?' icon_yuanxingxuanzhongfill':''
        bk+=item.round&&!item.solid&&check?' icon_yuanxingxuanzhong':''
        bk+=!item.round&&!check?' icon_xuanzekuang-duoxuanweixuan':''
        bk+=!item.round&&item.solid&&check?' icon_xuanze-fangkuang-tianchong':''
        bk+=!item.round&&!item.solid&&check?' icon_xuanzekuang-duoxuanyixuan':''
      }
      return bk
    },
    // 获得焦点时
    getFocus(item){
      this.formCheckObj[item.code].focus=true
      this.changeForm()
    },
    //失去焦点时
    getBlur(item){
      this.formCheckObj[item.code].focus=false
    },
    // enter事件
    keydown(e){
      if (this.checkForm()) {
        this.$emit('enter', this.checkForm())
      }
    },
    // 清除输入框的值
    clearValue(code){
      this.inFormObj[code]=''
      this.changeValue(this.formCheckObj[code],'input')
      this.changeForm()
    },
    showValue(item){
      this.inFormArr[item.id].showValue=!this.inFormArr[item.id].showValue
      this.inFormArr=JSON.parse(JSON.stringify(this.inFormArr))
    },
    // 省市区选择结果
    areaSelect(val){
      let item=this.formCheckObj[val.code]
      this.inFormObj[item.code]=val.value
      this.inFormObj[item.getValue||item.code+'_id']=val.id
      item.otherValue=val.id
      this.changeValue(item,'area')
    },
    mySelect(val){
      let item=this.formCheckObj[val.code]
      this.inFormObj[item.code]=val.value
      this.inFormObj[item.getValue||item.code+'_id']=val.idStr
      item.otherValue=val.idStr
      this.changeValue(item,'select')
    },
    // 手动改变fron的值
    changeForm(obj={}){
      this.inFormObj = Object.assign(this.inFormObj,obj)
    },
    // 添加默认值
    changeInObj() {
      let _this=this
      let inFormObj = {}
      // 统计date组件个数
      let dateNum = 0
      let yzmNum = 0
      this.inFormObjArr=[]

      let inFormArr = this.midFormList.map((value,id) => {
        value.focus = false
        value.id = id
        // 默认使用输入框
        if (!value.el) {
          value.el = 'input'
        }
        // if (value.add) {
        //   this.addObj[value.code]={
        //     codeList:[],
        //     num:0,
        //     code:value.code
        //   }
        // }

        if (value.type=='password') {
          value.showValue = false
        }
        if (value.el=='update') {
          inFormObj[value.code]=[]
          inFormObj[value.code+'_list']=[]
        }
        if (value.el=='yzm') {
          value.sort=yzmNum
          this.yzmTitle[yzmNum]={}
         this.yzmTitle[yzmNum].str=value.button||'获取验证码'
         this.yzmTitle[yzmNum].send=true

          yzmNum++
        }
        if (value.el=='checkBox') {
          if ( value.list&&value.list.length>0&&backType(value.list[0],'String')) {
            value.list=value.list.map((val,index)=>{
              let obj={}
              if (backType(val,'String')) {
                obj= {
                  value:index+'',
                  label:val
                }
              }else{
                obj= {
                  ...val,
                  value:val.value+''||index+'',
                  label:val.label||index
                }
              }
              return obj
            })
          }
        }
        if (value.getPhone) {
          this.login()
        }
        if (value.el == 'date') {
          value.num=dateNum
          if (!value.type) {
            value.type='date'
          }
          if (!value.startYear) {
            value.startYear=1900
          }
          if (!value.endYear) {
            value.endYear=new Date().getFullYear()+5
          }
          dateNum++
        }
        value.errTipRx=value.errTip==value.label?true:false
        if (!value.errTip) {
          value.errTip = value.label+'没有填写'
        }
        if (!value.type && value.el == 'input') {
          value.type = 'text'
        }
        if (value.el == 'span') {
          if (!value.height) value.height = '20rpx'
          if (!value.color) value.color = '#f5f5f5'
        }
        // 右边点击事件样式，设置默认
        if (value.rightClick && !value.ightClickStyle) {
          value.ightClickStyle = {}
        }

        if (!value.maxlength) {
          value.maxlength = 20
        }
        if (value.code) {
          this.inFormObjArr.push(value.code)
          inFormObj[value.code] = ''
          // 添加checkBox的
          let arr=['update','checkBox']
          if (arr.includes(value.el)) {
            inFormObj[value.code] = []
          }
        }
        if (value.el === 'select'||value.el === 'select_multi') {
          value.selectType= value.selectType?value.selectType:'label'
        }
        // 多选必须有数组 取出传入的ID，设置默认值的汉字 在 select 里会反写出来
        if (value.el === 'select' && this.firstTime) {
          let choseStr = value.arr.filter(value2 => value2.id === this.labeForm[value.code])
          _this.labeForm[value.code] = choseStr.text
          _this.firstTime = false

        }
        // 多选必须有数组 取出传入的ID，设置默认值的汉字 在multiSelect里会反写出来
        if (value.el === 'select_multi' && this.firstTime) {
          let choseArr = this.labeForm[value.code] ? this.labeForm[value.code].split(',').map(value => parseInt(value)) : []
          let strArr = [],
              idArr = []
          value.arr.filter(value2 => choseArr.includes(value2.id)).map(value3 => {
            strArr.push(value3.text)
            idArr.push(value3.id)
          })
          _this.labeForm[value.code] = strArr.join(',')
          _this.firstTime = false
        }

        // 默认提示语
        if (!value.placeholder) {
          if (value.el === 'input' || value.el === 'yzm') {
            value.placeholder = `请输入${value.label}`
          }
          if (value.el === 'select'|| value.el === 'date') {
            value.placeholder = `请选择${value.label}`
          }
        }
        // 验证码默认不存储时间
        if (value.el === 'yzm') {
          value.storage=value.storage?value.storage:false
          if (value.storage) {
            _this.timers(value,true)
          }
        }
        if (value.required == undefined || value.required == null) {
          value.required = true
        }
        if (value.required == '0') {
          value.required = false
        }

        if (!value.pattern) {
          value.pattern = ''
        }
        // 默认必填
        if (!value.rules) {
          value.rules = [{
            required: value.required,
            message: ' '
          }]
        }
        // 分割线的默认高度
        if (value.el === 'line' && !value.height) {
          value.height = '20rpx'
        }
        // 添加验证规则
        if (refArr.includes(value.rexType)) {
          let reg = {
            required: true,
            pattern: refObject[value.rexType],
            message: `请输入正确的${value.label}`
          }
          value.pattern = refObject[value.rexType]
          value.rules.push(reg)
        }
        this.formCheckObj[value.code] = value
        return value
      })
      this.inFormArr = inFormArr
      this.inFormObj = Object.assign(inFormObj, this.formObj)
    },
    // 检查值 tips是否弹出提示
    checkForm(tips=true) {
      let timer = 0
      let back = true
      let backObj={}
      for (let val in this.inFormObj) {
        if (this.inFormObjArr.includes(val)) {
          let item=this.formCheckObj[val]
          // 设置switch，默认值
          if (this.formCheckObj[val].el=='s'&& this.inFormObj[val]=='') {
            this.inFormObj[val]=false
          }
          // 提示处理
          let tipsErr=(err)=>{
            back = false
            setTimeout(() => {
              if (tips) {
                uni.showToast({
                  title: err,
                  duration: 800,
                  icon: 'none'
                })
              }
            }, timer)
            if (this.inConfig.once) return false
            timer += 1000
          }
          if (this.formCheckObj[val].required && this.inFormObj[val] == '' && this.formCheckObj[val].el!='s') {
            tipsErr(this.formCheckObj[val].errTips?this.formCheckObj[val].errTips:`${this.replaceSpace(this.formCheckObj[val].errTip)}`)
            if (this.inConfig.once) return false
          }
          if (this.formCheckObj[val].required && typeof this.inFormObj[val]=='object'&&this.inFormObj[val].length==0) {
            tipsErr(this.formCheckObj[val].errTips?this.formCheckObj[val].errTips:`${this.replaceSpace(this.formCheckObj[val].errTip)}`)
            if (this.inConfig.once) return false
          }
          // 内部验证规则
          if (this.formCheckObj[val].rexType && this.inFormObj[val] != '') {
            let isD=true
            // 身份证
            if (this.formCheckObj[val].rexType=='idCard') {
              isD=isCardID(this.inFormObj[val])
            }
            // 内置的规则
            if ((refArr.includes(this.formCheckObj[val].rexType)&&!refObject[this.formCheckObj[val].rexType].test(this.inFormObj[val])) || !isD) {
              tipsErr(this.formCheckObj[val].errTips?this.formCheckObj[val].errTips:`${this.formCheckObj[val].label}格式不对`)
              if (this.inConfig.once) return false
            }
            if (backType(isD,'Object')) {
              this.inFormObj[item.ageCode||'age']=isD.age
              this.inFormObj[item.sexCode||'sex']=isD.sex
              this.inFormObj[item.birthdayCode||'birthday']=isD.birthday
              this.inFormObj[item.provinceCode||'province']=isD.province
              this.inFormObj[item.ageStrCode||'ageStr']=isD.ageStr
              // 如果传入了省市区code
              if (this.config.provinces) {
                this.inFormObj[item.areaCode||'area']=getAreaStr(isD.idCode,item.split||',',this.config.provinces)
              }
            }

          }
          // 自定义验证规则
          if (this.formCheckObj[val].rexStr&&!this.formCheckObj[val].rexStr.test(this.inFormObj[val])) {
            tipsErr(this.formCheckObj[val].errTips?this.formCheckObj[val].errTips:`${this.formCheckObj[val].label}格式不对`)
            if (this.inConfig.once) return false
          }
          // 最小长度
          if (this.formCheckObj[val].minlength && this.inFormObj[val] != '') {
            if (this.inFormObj[val].length < this.formCheckObj[val].minlength) {
              tipsErr(this.formCheckObj[val].errTips?this.formCheckObj[val].errTips:`${this.formCheckObj[val].label}最小长度是${this.formCheckObj[val].minlength}`)
              if (this.inConfig.once) return false
            }
          }
          // 相同值处理
          if (this.formCheckObj[val].sameCode) {
            let sameCode = this.formCheckObj[val].sameCode
            if (this.inFormObj[val] !== this.inFormObj[sameCode]) {
              tipsErr(`${this.formCheckObj[val].label}与${this.formCheckObj[sameCode].label}不同`)
              if (this.inConfig.once) return false
            }
          }
          backObj[val]=this.inFormObj[val]
          // checkBox 处理
          if (this.formCheckObj[val].el=='checkBox') {
            backObj[item.getLabel||item.code+'_label']=this.inFormObj[item.getLabel||item.code+'_label']
          }
          // select 处理
          if (this.formCheckObj[val].el=='select'||this.formCheckObj[val].el=='area') {
            let selectType=this.formCheckObj[val].selectType
            if (selectType=='value') {
              backObj[val]=this.inFormObj[val+'_id']
            }
            if (selectType=='label') {
              backObj[val]=this.inFormObj[val]
            }
            backObj[item.getValue||item.code+'_id']=this.inFormObj[item.getValue||item.code+'_id']
          }
        }
      }
      if (back) {
        return this.inConfig.pureMode?{...backObj}:{...this.inFormObj,...backObj}
      }
      return back
    },
    // 不验证得结果
    getForm(){
      return this.inFormObj
    },
    replaceSpace(str){
      // .不能清除
      let arr = [' ', '&ensp;', '&emsp;', '&nbsp;', '\/', '\,',]
      arr.forEach(val => {
        let rex =new RegExp(val,"ig");
        str = str.replace(rex, '')
      })
      return str
    },
    // 创建定时
    timers(item,m=false){
      let defaTime=item.time?parseInt(item.time):item.time||60
      let nowTime=parseFloat(new Date().getTime())
      let oldTime=uni.getStorageSync(`checkPhneTime${item.sort}`)?parseFloat(uni.getStorageSync(`checkPhneTime${item.sort}`)):0
      let timeEx=parseInt((nowTime-oldTime)/1000)
      let t =item.time?parseInt(item.time):item.time||60
      if (item.storage) {
        if (timeEx < defaTime) {
          t = defaTime - timeEx
        }else if(timeEx > defaTime && m){
          return false
        }else{
          uni.setStorageSync(`checkPhne${item.sort}`, this.inFormObj[item.relatCode])
          uni.setStorageSync(`checkPhneTime${item.sort}`, new Date().getTime())
        }
      }
      let timer =t
      this.yzmTitle[item.sort].send=false
      this.$emit('yzmRelatCode', this.inFormObj[item.relatCode])
      let setI = setInterval(() => {
        this.yzmTitle[item.sort].str = `${item.after||'重新获取'}(${timer}${item.unit||'s'})`
        this.yzmTitle=JSON.parse(JSON.stringify(this.yzmTitle))
        timer--
        if (timer == 0) {
          timer = t
          this.yzmTitle[item.sort].send=true
          this.yzmTitle=JSON.parse(JSON.stringify(this.yzmTitle))
          clearInterval(setI)
          this.yzmTitle[item.sort].str = item.button||`获取验证码`
        }
      }, 1000)
    },
    // 发送验证码
    sendYzm(item) {
      if (this.yzmTitle[item.sort].send) {
        let yzmRelatCode = ''
        if (this.inFormObj[item.relatCode] === '') {
          uni.showToast({
            title: `${this.replaceSpace(this.formCheckObj[item.relatCode].errTip)}`,
            icon: 'none'
          })
          yzmRelatCode = false
        }
        // 不需要验证
        if (!this.formCheckObj[item.relatCode].rexType) {
          this.timers(item)
        }
        if (this.inFormObj[item.relatCode] !== '' && this.formCheckObj[item.relatCode].rexType) {
          if (!refObject[this.formCheckObj[item.relatCode].rexType].test(this.inFormObj[item.relatCode])) {
            let tips=this.formCheckObj[item.relatCode].errTips?this.formCheckObj[item.relatCode].errTip:`${this.formCheckObj[item.relatCode].label}格式不对`
            uni.showToast({
              title: tips,
              duration: 800,
              icon: 'none'
            })
            yzmRelatCode = false
          } else {
            yzmRelatCode=this.inFormObj[item.relatCode]
            this.timers(item)
          }
        }
        this.$emit('yzmRelatCode', {code:item.relatCode,results:yzmRelatCode})
      } else {
        this.$emit('yzmRelatCode', {code:item.relatCode,results:false})
        return false
      }

    },
    // 右边点击事件
    rightClick(item,it={}) {
      item.value=this.inFormObj[item.code]
      this.$emit('rightClick', {...item,...it})
    },
    // 右边点击事件
    getPhoneNumber(e) {
      let userInfo = {};
      userInfo.encryptedData=encodeURIComponent(e.detail.encryptedData)
      userInfo.iv = e.detail.iv;
      userInfo.code = this.code
      this.$emit('getPhoneObj',userInfo)
    },
    // 登录更新
    login(){
      uni.login({
        provider: "weixin",
        success: (loginRes) => {
          this.code =loginRes.code
        },
      });
    },
    submit(e) {
    },
    // 重置结果，str代表保留某些值不重置
    reset(str='') {
      let arrVlues=['update','checkBox']
      if (typeof str=='string') {
        let arr=str.split(',')
        for (let key in  this.inFormObj) {
          if (!arr.includes(key)&&key) {
            let item=this.formCheckObj[key]
            if (item&&item.code) {
              if (arrVlues.includes(item.el)) {
                this.inFormObj[key]=[]
              }else{
                this.inFormObj[key]=''
              }
            }
          }
        }
      }
    }
  },
  watch:{
    formArr:{
      handler(val) {
        this.midFormList=[...val]
        this.changeInObj()
      },
      immediate: true,
      deep: true
    },
    inFormObj:{
      handler(val) {
        this.$emit('update:formObj',val)
        this.$emit('valid',this.checkForm(false))
      },
      immediate: true,
      deep: true
    },
    formObj:{
      handler(val) {
        this.inFormObj=val
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "scss/iconfont.css";
@import "scss/formList";
</style>
