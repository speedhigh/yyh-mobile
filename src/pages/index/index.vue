<template>
	<!--首页-->
	<view class="index">
		<view class="top">
			<search class="search"></search>
			<swiper class="swiper" indicator-active-color='#fff' :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			 :duration="duration">
				<swiper-item v-for="(item,index) in bannerList" :key='index'>
					<view class="swiper-item uni-bg-red">
						<image :src="item.imgs"></image>
					</view>
					<view class="swiper-title">
						<view class="swiper-title-box">{{ item.title }}</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 八个分类 -->
		<classify></classify>
		<image @click="goMember()" class="adv" src="../../static/images/index/banner.png" mode=""></image>
		<!-- 不同国家 -->
		<country></country>
		<hotDrugs></hotDrugs>

		<view class="footer">
			啊哦~滑到底了呀~
		</view>
	</view>
</template>

<script>
	import request from '../../js_sdk/request/request.js' //引进requst方法
	import search from '../../components/search.vue'
	import classify from '../../components/classify.vue'
	import country from '../../components/country.vue'
	export default {
		components: {
			search,
			classify,
			country,
		},
		data() {
			return {
				seacrchIcon: require("../../static/images/index/搜索.png"),
				inputPlaceHolder: "请输入要搜索的药品名和症状",

				//头部导航
				headTabIdx: 0,
				params: "#fff",
				bannerList: [{
						id: 1,
						imgs: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/fb84c5a1-08b9-421f-87a2-f518dcdc0c88.png'
					},
					{
						id: 2,
						imgs: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/4ab50bc2-9511-47fd-b9f1-cdf83d6e20d0.png'
					},
					{
						id: 3,
						imgs: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/93f4aa7a-5c82-4029-9735-78e6a07b97ac.png'
					},
					{
						id: 4,
						imgs: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/b8ed5f30-fcba-4e95-9022-62146044584c.png'
					},
				], //轮播图

				/*图片轮播*/
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				commodityId: '',
				searchContent: "",
				indexCurrent: 1,
			}
		},
		onLoad() {
			console.log("初次进入");
				(function(w, d, e, x) {
					console.log("客服")
					w[e] = function() {
						w.cbk = w.cbk || []
						w.cbk.push(arguments);
					}
					x = d.createElement("script");
					x.async = true;
					x.id = "zhichiScript";
					x.className = "zhiCustomBtn"; //该class绑定到自定义按钮上 第一步
					// ***为您的自定义域名
					x.src = "http://mobile.yuyihui.com.cn/#/.sobot.com/chat/frame/v2/entrance.js?sysnum=3542411be2184c8cb6b48d66ca1b2730";
					d.body.appendChild(x);
				})(window, document, "zc");
				zc("config", {
					custom: true, //设置自定义生效 第二步
				})
			// setTimeout(function(){
			uni.request({
				url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/home_page/nocheck/search",
				// url: "http://47.105.107.186:8886/wx-yuyihui/applets/home_page/nocheck/search",
				method: 'GET',
				data: {
					current: 1,
					size: 8,
					searchContent: "",
				},
				success: (res) => {
					console.log(res, "返回的信息");
					this.contTwoList = res.data.data.records;

				},
				fail: (err) => {
					console.log(err)
				}
			})
			// },1000)
		},
		mounted() {
			console.log("初次进入mounted");
			uni.navigateTo({
				url: '../news/news'
			})
		},
		onLaunch() {
			console.log("只触发一次的小程序初始化")
		},

		methods: {
			//官网复制的轮播
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			goSearch(e) {
				console.log("去搜索", e);
				this.searchContent = e;
				uni.navigateTo({
					url: `../../pages2/searchDetail/searchDetail?searchContent=${this.searchContent}&country=&priNav=&secNav=`,
				})
			},
			getColor(params) {
				let str = '#FFFFFF'
				return {
					'background-color': str
				}
			},
			goMember() {

				request({
					// 提交订单
					url: "/wx-yuyihui/applets/user_interface/get_current_user",
					method: 'GET',
					success: (res) => {
						uni.navigateTo({
							url: "../memberCard/memberCard"
						})
						/** 
						console.log("获取用户成功:", res);
						if (res.data.code == '0') {
							console.log('已登录')
							uni.navigateTo({
								url: "../memberCard/memberCard"
							})
						} else {
							uni.showToast({
								title: "请您先登录,再办卡",
								icon: "none"
							})
						}
						*/
					},
					fail: (err) => {
						console.log("获取当前用户:", err)
						// alert("支付测试失败:",err)
					}
				})
				
			}

		}
	}
</script>

<style scoped>
	page {
		background: #fff;
		padding: 0 0upx;
		width: 750upx;
		box-sizing: border-box;
	}

	.adv {
		width: 686upx;
		height: 178upx;
		margin: 36upx 0 0;
	}

	.index {
		height: 100%;
		margin-left: 32upx;
	}

	.top {
		background-color: #2da5be;
		width: 750upx;
		margin-left: -32upx;
		margin-top: 0;
		padding-bottom: 30upx;
		border-radius: 0 0 30upx 30upx;

	}

	.search {
		position: relative;
		z-index: 99;
		margin-left: 32upx;
	}

	.swiper {
		width: 686upx;
		margin: 20upx 0 0upx 32upx;
		height: 280upx;
		border-radius: 20upx;
		overflow: hidden;
	}

	.swiper-item image {
		width: 100%;
		height: 311rpx;
		display: block;
	}

	.footer {
		width: 686upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 28upx;
		color: #666;
		text-align: center;
	}
</style>
