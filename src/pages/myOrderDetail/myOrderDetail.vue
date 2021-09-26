<template>
  <view class="main">
    <!-- address -->
    <view class="section">
      <view class="flex items-center">
        <view class="address-top-tag">默认</view>
        <view class="text-gray-600">{{ dtlMsg.provandcity }}</view>
      </view>
      <view style="font-size: 16px; margin: 9px 0px">{{ dtlMsg.detail }}</view>
      <view class="text-gray-600">{{ dtlMsg.name }}<text style="margin-left: 12px">{{ dtlMsg.telephone }}</text></view>
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
              <text style="font-size: 18px">{{ +dtlMsg.unitPrice }}</text>￥
            </view>
          </view>
        </view> 
      </view>
    </view>

    <!-- msg -->
    <view class="section">
      <view style="font-size: 14px;">订单信息</view>
      <view class="msg-content"> 订单编号：{{ dtlMsg.id }}</view>
      <view class="msg-content">订单状态：{{ orderState }}</view>
      <view 
        v-if="dtlMsg.inserttime" 
        class="msg-content"
      >
        创建时间：{{ dtlMsg.inserttime }}
      </view>
      <view 
        v-if="dtlMsg.payTime" 
        class="msg-content"
      >
        付款时间：{{ dtlMsg.payTime }}
      </view>
    </view>
    <view v-if="LogisticsMsg.data.length > 0" class="section">
      <view style="font-size: 14px;">物流信息</view>
      <view class="msg-content"> 物流公司：{{ LogisticsMsg.com }}</view>
      <view class="msg-content"> 运单号码：{{ LogisticsMsg.nu }}</view>
    </view>
    <view v-if="LogisticsMsg.data.length > 0" class="logistics">
      <view 
        v-for="(item, index) in LogisticsMsg.data" 
        :key="index" 
        class="logistics-box"
        :class="index === 0 ? 'text-teal border-left': index !== LogisticsMsg.data.length - 1 ? 'border-left' : ''"
      >
        <view class="logistics-position">
          <view class="logistics-msg">
            <view v-if="index !== 0" class="logistics-tag" />
            <view v-else class="logistics-tag-sel">
              <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="12" height="12"><defs><style/></defs><path d="M512.14 802.757L195.643 487.114l121.14-121.139L512.14 562.186l385.596-386.45a511.854 511.854 0 1091.28 150.997z" fill="#2DA5BE"/></svg>
            </view>
            <view>{{ item.context }}</view>
          </view>
          <view class="logistics-date" :class="index !== LogisticsMsg.data.length - 1 ? 'border-bottom' : ''">{{ item.time }}</view>
        </view>
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
      dtlMsg: {id: null, state: null},
      stateList:['全部','已付款','待发货','待收货','已收货'],
      LogisticsMsg: {
        com: "韵达快递",
        creattime: null,
        data: [],
        ftime: null,
        id: null,
        nu: "",
        orderid: 11058,
        state: "",
        updatetime: null
      }
    }
  },
  onLoad(option) {
    this.orderId = option.id
  },
  computed: {
    orderState() {
      if(this.dtlMsg.state === 2) { return '待发货' }
      if(this.dtlMsg.state === 3) { return '已发货，请留意电话或短信以便及时接收快递' }
      if(this.dtlMsg.state === 4) { return '订单已签收' }
    }
  },
  mounted() {
    request({
      url: `/wx-yuyihui/ordertbl/getOrderInfo?id=${this.orderId}`,
      method: 'GET',
      success: (res) => {
        this.showLoading = false
        console.log(res.data.data)
        Object.assign(this.dtlMsg, res.data.data)
      },
      fail: (err) => { console.log(err) }
    })
    request({
      url: `/wx-yuyihui/ordertbl/get_logistics_information?id=${this.orderId}`,
      method: 'GET',
      success: (res) => {
        console.log('物流',res.data.data)
        Object.assign(this.LogisticsMsg, res.data.data)
      },
      fail: (err) => { console.log(err) }
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
.logistics {
  padding: 24px 12px 12px 24px;
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
.text-teal {
  color: #2DA5BE;
}
.bg-teal {
  background: #2DA5BE;
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
  color: #666666;
}
.logistics-box {
  padding: 24px 12px;
}
.border-left {
  border-left :solid 1px #E6E6E6;
}
.logistics-position {
  margin-top: -32px;
  margin-left: -15px;
}
.logistics-msg {
  display: flex;
  align-items: flex-start;
}
.logistics-tag {
  width: 5px;
  height: 5px;
  flex-shrink: 0;
  background:#666666;
  border-radius: 100%;
  margin: 6px 12px 0 0;
}
.logistics-tag-sel {
  flex-shrink: 0;
  margin: 4px 9px 0 -3px;
}
.logistics-date {
  margin: 3px 0px 0 17px;
  padding-bottom: 12px;
}
.border-bottom {
  border-bottom :solid 1px #F7F7F7;
}
</style>