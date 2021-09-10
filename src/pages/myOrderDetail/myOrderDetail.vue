<template>
  <view class="main">

    <!-- address -->
    <view class="section">
      <view class="flex items-center">
        <view class="address-top-tag">默认</view>
        <view class="text-gray-600">{{ dtlMsg.detail }}</view>
      </view>
      <view style="font-size: 16px; margin: 9px 0px">香港路14-1号智慧大厦14楼前台</view>
      <view class="text-gray-600">安昊程<text style="margin-left: 12px">170****8695</text></view>
    </view>

    <!-- card -->
    <view class="section">
      <view class="flex items-center">
        <view>订单号：{{ dtlMsg.id }}</view>
        <view class="ml-auto">订单状态：{{ stateList[dtlMsg.state] }}</view>
      </view>
      <view class="flex" style="margin-top: 16px">
        <img :src="cardImg" class="card-img">
        <view class="card-msg">
          <view style="margin-bottom: 13px">{{ dtlMsg.productName }}</view>
          <view class="text-gray-900">x{{ dtlMsg.count }}</view>
          <view class="card-bottom">
            <view style="color: #FF3333; font-size: 11px; font-weight: 800">
              <text style="font-size: 18px">{{ dtlMsg.unitPrice * 1 }}</text>￥
            </view>
          </view>
        </view> 
      </view>
    </view>

    <!-- msg -->
    <view class="section">
      <view style="font-size: 14px;">
        订单信息
      </view>
      <view class="msg-content text-gray-600">
        订单编号：{{ dtlMsg.id }}
      </view>
      <view class="msg-content text-gray-600">
        订单状态：{{ orderState }}
      </view>
      <view class="msg-content text-gray-600">
        创建时间：2021-05-12 14.00.57
      </view>
      <view class="msg-content text-gray-600">
        付款时间：2021-05-12 14.00.57
      </view>
    </view>

  </view>
</template>

<script>
import request from '../../js_sdk/request/request.js'
export default {
  data() {
    return {
      cardImg: require("../../static/images/我的/权益卡.jpg"),
      showLoading: true,
      orderId: null,
      dtlMsg: {id: 0},
      stateList:['全部','已付款','待发货','待收货','已收货']
    }
  },
  onLoad(option) {
    this.orderId = option.id
  },
  computed: {
    orderState() {
      if(this.dtlMsg.state === 2) { return '待发货' }
      if(this.dtlMsg.state === 3) { return '待收货' }
      if(this.dtlMsg.state === 4) { return '交易成功啦！' }
    }
  },
  mounted() {
    request({
      url: `/wx-yuyihui/ordertbl/getOrderInfo?id=${this.orderId}`,
      method: 'GET',
      success: (res) => {
        this.showLoading = false
        Object.assign(this.dtlMsg, res.data.data)
        console.log(res.data.data)
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
}
</script>

<style>
.main {
  background-color: #f5f5f5;
  min-height: 100vh;
  font-size: 12px;
}
.section {
  padding: 16px;
  box-sizing: border-box;
  margin-bottom: 10px;
  background-color: #FFFFFF;
}
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.text-gray-600 {
  color: #666666;
}
.text-gray-900 {
  color: #999999;
}
.ml-auto {
  margin-left: auto;
}
.address-top-tag {
  padding: 1px 5px;
  margin-right: 11px;
  background: #2DA5BE;
  border-radius: 3px;
  font-size: 9px;
  color: #FFFFFF;
  line-height: 16px;
}
.card-img {
  width: 100px;
  height: 100px;
  border-radius: 8px; 
  flex-shrink: 0;
  display: block;
}
.card-msg {
  margin-left: 10px;
  flex-grow: 1;
  padding: 8px 0px;
  font-size: 12px;
}
.card-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.msg-content {
  margin-top: 15px;
}
</style>