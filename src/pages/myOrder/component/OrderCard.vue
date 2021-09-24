<template>
  <view class="card">
    <view class="card-top">
      <view>订单号：{{ msg.id }}</view>
      <view>订单状态：{{ stateList[msg.state] }}</view>
    </view>
    <view class="card-content">
      <img :src="cardImg" class="card-content-img">          
      <view class="card-content-msg">
        <view style="margin-bottom: 13px">{{ msg.productName }}</view>
        <view style="color: #999999;">x1</view>
        <view class="card-content-bottom">
          <view style="color: #FF3333; font-size: 11px; font-weight: 800">
            <text style="font-size: 18px">{{ +msg.unitPrice }}</text>￥
          </view>
          <view style="margin-left: auto;">
            <view
              :class="msg.state === 3 ? 'button' : 'c-button'" 
              @click="toDetail(msg.id)"
            >
              查看订单
            </view>
            <view 
              v-if="msg.state === 3"
              class="c-button"
              @click="confirmOrder(msg.id)"
            >
              确认收货
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import request from '../../../js_sdk/request/request.js'
export default {
  props: {
    msg: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      cardImg: require("../../../static/images/我的/权益卡.jpg"),
      stateList:['全部','已付款','待发货','待收货','已收货']
    }
  },
  methods: {
    toDetail(id) {
      uni.navigateTo({ url: `../myOrderDetail/myOrderDetail?id=${id}` })
    },
    confirmOrder(id) {
      let dialog = confirm("确定已签收?")
      if (dialog) {
        request({
          url: `/wx-yuyihui/ordertbl/confirm_receipt?id=${id}`,
          method: 'get',
          success: (res) => {
            console.log(res.data)
            this.$emit('confirm')
            // uni.navigateTo({ url: `../myOrderDetail/myOrderDetail?id=${id}` })
          },
          fail: (err) => {
            console.log(err)
          }
        })
      }
    }
  }
}
</script>

<style>
  .card {
    margin-top: 10px;
    width: 100%;
    background-color: #FFFFFF;
    padding: 16px;
    box-sizing: border-box;
  }
  .card-top {
    padding: 0px 1px 16px 1px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #333333;
    line-height: 19px;
  }
  .card-content {
    display: flex;
  }
  .card-content-img {
    width: 100px;
    height: 100px;
    border-radius: 8px; 
    flex-shrink: 0;
    display: block;
  }
  .card-content-msg {
    margin-left: 10px;
    flex-grow: 1;
    padding: 8px 0px;
    font-size: 12px;
  }
  .card-content-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  .button {
    display: inline-block;
    width: 70px;
    height: 22px;
    border-radius: 11px;
    color: #666666;
    border: 1px solid #999999;
    font-size: 10px;
    background-color: #FFFFFF;
    text-align: center;
    line-height: 20px;
  }
  .c-button {
    display: inline-block;
    margin-left: 10px;
    width: 70px;
    height: 22px;
    border-radius: 11px;
    border: 1px solid #2DA5BE;
    color: #2DA5BE;
    font-size: 10px;
    background-color: #FFFFFF;
    text-align: center;
    line-height: 20px;
  }
</style>