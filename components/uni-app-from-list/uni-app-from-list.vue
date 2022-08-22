<template>
  <view class="uni-app-from-list">
    <view v-for="(item, index) in formObjList" :key="index" class="from_style">
      <uni-card :title="title">
        <view class="top_from_style">
          <view class="top_from_row_style" v-if="item.orderNumber">
            <view class="lable">运输订单号：</view>
            <view class="value">{{ item.orderNumber }}</view>
          </view>
          <view class="top_from_row_style" v-if="item.capacityNumber">
            <view class="lable">车牌号：</view>
            <view class="value1">{{ item.capacityNumber }}</view>
          </view>
		  <view class="top_from_row_style" v-if="item.shipperUnitName">
		    <view class="lable">用车单位：</view>
		    <view class="value">{{ item.shipperUnitName }}</view>
		  </view>
          <view class="top_from_row_style" v-if="item.loadName">
            <view class="lable">装货地点：</view>
            <view class="value">{{ item.loadName }}</view>
          </view>
		  <view class="top_from_row_style" v-if="item.organizationCode">
		    <view class="lable">卸货厂区：</view>
		    <view class="value1">{{ item.organizationCode }}</view>
		  </view>
          <view class="top_from_row_style" v-if="item.unloadName">
            <view class="lable">卸货地点：</view>
            <view class="value">{{ item.unloadName }}</view>
          </view>
					<view class="top_from_row_style" v-if="item.startTime">
					  <view class="lable">计时开始时间：</view>
					  <view class="value">{{ item.startTime }}</view>
					</view>
					<view class="top_from_row_style" v-if="item.endTime">
					  <view class="lable">计时结束时间：</view>
					  <view class="value">{{ item.endTime }}</view>
					</view>
					<view class="top_from_row_style" v-if="item.resultTime">
					  <view class="lable">计时时长：</view>
					  <view class="value1">{{ item.resultTime }}</view>
					</view>
          <view
            class="Material_top_from_row_style"
            v-for="(tem, i) in item.materialMesList"
            :key="i"
          >
            <view class="top_from_row_style">
              <view class="lable">物资名称：</view>
              <view class="value1">{{ tem.materialName }}</view>
            </view>
			<view class="top_from_row_style" v-if="tem.netWeight">
			  <view class="lable">物资净重：</view>
			  <view class="value1">{{ tem.netWeight }}</view>
			</view>
			<view class="top_from_row_style" v-if="item.type">
			  <view class="lable">订单类型：</view>
			  <view class="value2">{{ item.type}}</view>
			</view>
			<view class="top_from_row_style" v-if="item.inwardType">
			  <view class="lable">内转订单类型：</view>
			  <view class="value5">{{ item.inwardType}}</view>
			</view>
			<view class="top_from_row_style" v-if="tem.loadName">
			  <view class="lable">装货点：</view>
			  <view class="value1">{{ tem.loadName }}</view>
			</view>
			<view class="top_from_row_style" v-if="tem.unloadName">
			  <view class="lable">卸货点：</view>
			  <view class="value1">{{ tem.unloadName }}</view>
			</view>
            <view
              class="top_from_row_style"
              v-if="tem.materialMC && tem.materialMC !== '()'"
            >
              <view class="lable">规格型号：</view>
              <view class="value" v-if="tem.materialMC !== '()'">{{
                tem.materialMC
              }}</view>
            </view>
            <view class="top_from_row_style" v-if="tem.weightNum">
              <view class="lable">物资数量：</view>
              <view class="value">{{ tem.weightNum }}</view>
            </view>
          </view>
		
            <view class="top_from_row_style" v-if="item.requirementTruckTime">
		    <view class="lable">用车时间：</view>
		    <view class="value">{{ item.requirementTruckTime }}</view>
		  </view>
		  <view class="top_from_row_style" v-if="item.shipperName">
            <view class="lable">发货单位：</view>
            <view class="value">{{ item.shipperName }}</view>
          </view>
          <view class="top_from_row_style" v-if="item.consigneeCompanyName">
            <view class="lable">收货单位：</view>
            <view class="value">{{ item.consigneeCompanyName }}</view>
          </view>
          <view class="top_from_row_style" v-if="item.saleDateOfReceipt">
            <view class="lable">截止日期：</view>
            <view class="value">{{ item.saleDateOfReceipt }}</view>
          </view>
		
          <view class="top_from_row_style" v-if="item.receiveAddressName">
            <view class="lable">收货地址：</view>
            <view class="value">{{ item.receiveAddressName }}</view>
          </view>
		
        </view>
        <view class="from_btn_style" v-if="btnBoolean">
          <button type="warn" @click="cancel(item.orderId)">拒绝</button>
          <button
            type="primary"
            @click="accept(item.orderId, item.capacityNumber)"
          >
            {{ acceptBtnText }}
          </button>
        </view>
      </uni-card>
    </view>
  </view>
</template>

<script>
export default {
  name: "uni-app-from-list",
  props: {
    acceptBtnText: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    //后端请求得到的表单数据
    formObjList: {
      type: Array,
      default: null,
    },
    //表单的样式
    config: {
      type: Object,
      default: null,
    },
    saleFormArr: {
      type: Array,
      default: null,
    },
    //判断是否需要按钮,默认不显示
    btnBoolean: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 抛出点击接受的事件
    accept(orderId, capacityNumber) {
      this.$emit("accept", orderId, capacityNumber);
    },
    // 抛出点击取消的事件
    cancel(orderId) {
      this.$emit("cancel", orderId);
    },
  },
};
</script>

<style lang="scss">
.uni-app-from-list {
  .from_style {
    .top_from_style {
      .top_from_row_style {
        border-bottom: 1px #b3b3b3 solid;
        .lable {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 5px;
        }
		.lable1 {
		  color: #d00000;
		  font-size: 16px;
		  font-weight: 500;
		  margin-bottom: 5px;
		}
        .value {
			font-size: 16px;
            padding-left: 12px;
        }
		.value1 {
			color: #d00000;
			font-size: 16px;
		    padding-left: 12px;
		}
		.value2{
			color: #d00000;
			font-size: 16px;
			padding-left: 12px;
		}
		.value5{
			color: #d00000;
			font-size: 16px;
			padding-left: 12px;
		}
      }
      .Material_top_from_row_style {
        .top_from_row_style {
          border-bottom: 1px #b3b3b3 solid;
          .lable {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 5px;
          }
          .value {
            font-size: 16px;
            padding-left: 12px;
          }
        }
      }
    }
    .from_btn_style {
      display: flex;
      justify-content: center;
      width: 100%;

      button {
        margin-top: 20rpx;
        margin-bottom: 8rpx;
        width: 30%;
      }
    }
  }
}
</style>
