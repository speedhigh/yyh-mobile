<template>
  <view class="main">
    <!-- tabbar -->
    <view class="tabbar">
      <view 
        v-for="(item, index) in tabList" 
        :key="index"
        v-show="item.id !== 1" 
        class="tab"
        @click="changeTab(item.id)"
      >
        <view :style="{'color':item.id === activeId ? '#2DA5BE':'#333333'}">{{ item.title }}</view>
        <view v-show="item.id === activeId" class="line" />
      </view>
    </view>
    <view v-if="showLoading" class="prompt-text">加载中，请稍后……</view>
    <view v-else>
      <view v-for="(item, index) in list" :key="index">
        <order-card v-if="item.state === activeId || activeId === 0 && item.state !== 1" :msg="item" />
      </view>
      <view v-if="showEmpty" class="empty-box">
        <img :src="emptyImg" class="empty-img">
        <view class="prompt-text" style="margin-top: -36px">暂无数据</view>
      </view>
      <view v-else class="prompt-text">没有更多了~</view>
    </view>
  </view>
</template>

<script>
import request from '../../js_sdk/request/request.js'
import OrderCard from './component/OrderCard.vue'
export default {
  components: {
    OrderCard
  },
  data() {
    return {
      emptyImg: require("../../static/images/empty.png"),
      showLoading: true,
      tabList: [
        { id: 0, title: '全部' },
        { id: 1, title: '已付款' },
        { id: 2, title: '待发货' },
        { id: 3, title: '待收货' },
        { id: 4, title: '已收货' }
      ],
      list: [],
      activeId: 0
    }
  },
  mounted() {
    request({
      url: "/wx-yuyihui/ordertbl/get_all_ordertbl",
      method: 'GET',
      success: (res) => {
        this.showLoading = false
        console.log(res.data.data)
        this.list = res.data.data
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  computed: {
    showEmpty() {
      if(this.activeId === 0) {
        if ( this.list.length === 0 ) {
          return true
        } else {
          return this.list.filter(item => item.state === 1).length === this.list.length
        }
        return 
      } else {
        let arr = this.list.filter(item => item.state === this.activeId)
        return arr.length === 0
      }
    }
  },
  methods: {
    changeTab(id) {
      this.activeId = id
    }
  }
}
</script>

<style>
.main {
  background-color: #f5f5f5;
  min-height: 100vh;
}
.tabbar {
  width: 100%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-around;
}
.tab {
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
}
.line {
  margin: 5px auto;
  display: block;
  width: 20px;
  height: 2px;
  background: #2DA5BE;
}
.prompt-text {
  text-align: center;
  font-size: 14px;
  padding: 12px;
  color: #666666;
}
.empty-box {
  width: 80%;
  margin: 70px auto;
}
.empty-img {
  width: 100%
}
</style>