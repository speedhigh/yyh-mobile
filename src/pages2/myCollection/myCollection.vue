<template>
	<!--搜索-->
	<view>



		<!-- 头部搜索 -->
		<!-- 	<view class="searchBox">

			<input @focus="searchFocus()" class="search" type="text" :placeholder="inputPlaceHolder" v-model="seacrchContnt" />
			<image @click="goSearch(seacrchContnt)" class="searchIcon" :src="seacrchIcon" mode=""></image>
		</view> -->

		<!--主体-->
		<view class="idxMain">
		<view class="shopOver" v-show="!contTwoList">
			
			<image class="noContent" src="../../static/images/暂无内容.png" mode=""></image>
		<!-- 	只保留最近的50条浏览记录哟~ -->
		</view>
			<!--内容2 商品-->
			<view class="shopOver" >
				<!-- <view class="contTitle">
							<view class="idxMainBox">推荐商品</view>
						</view> -->
				<view class="idxMainBox">
					<view class="shopLt" v-for="(item,index) in contTwoList" :key='index' @click="goCommodity(item.id)">
						<view class="shopImg">
							<image :src="item.thumbnail" mode="aspectFill"></image>
						</view>
						<view class="shopTxt">{{ item.namechs }}</view>
						<view class="shopMoney"><text></text><text>{{ item.symptom}}</text></view>
						<view class="shopMoney"><text>价格:</text><text class="money">￥{{ item.price }}</text></view>
					</view>
				</view>
			</view>
			<!--内容2-->
		<view class="shopOver" v-show="length < 1 && contTwoList">
				只保留最近的50条收藏哟~
		</view>

		</view>
		<!--主体-->

	</view>
</template>

<script>
	import request from '../../js_sdk/request/request.js' //引进requst方法
	export default {
		data() {
			return {
				seacrchIcon: require("../../static/images/index/搜索.png"),
				inputPlaceHolder: "请输入要搜索的药品名和症状",
				length: '',
				contTwoList: [

				],

				commodityId: '',
				searchContent: "",
				Current: 1,
			}
		},
		onLoad(option) {
			// start

			console.log("搜索的是啥", option)
			this.search();

		},
		onReachBottom: function() {
			this.Current++;
			request({
				url: "/wx-yuyihui/applets/user_interface/get_mycollection",
				method: 'post',
				data: {
					current: this.Current,
					size: 8,
				},
				success: (res) => {
					console.log("返回的信息", res);
					// res.data.data.length
					this.contTwoList = this.contTwoList.concat(res.data.data);
					this.length = res.data.data.length;
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		methods: {
			//首页头部tab点击切换
			// IsHeadTabClick: function(index, item) {
			// 	this.headTabIdx = index;
			// },
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
			// 去资讯详情
			goCommodity(e) {
				console.log("去资讯详情", e, this.interval);
				this.commodityId = e;
				uni.navigateTo({
					url: `../../pages2/details/details?id=${this.commodityId}`,
				})

			},
			goSearch(e) {
				console.log("去搜索", e);
				this.searchContent = e;
				uni.navigateTo({
					url: `../../pages2/searchDetail/searchDetail?searchContent=${this.searchContent}`,
				})
			},
			searchFocus() {
				console.log("聚焦");
				this.inputPlaceHolder = "";
			},
			// start
			search() {
				request({
					url: "/wx-yuyihui/applets/user_interface/get_mycollection",
					method: 'post',
					data: {
						current: 1,
						size: 8,
					},
					success: (res) => {
						console.log("返回的信息", res);
						this.contTwoList = res.data.data;
						this.length = res.data.data.length;
					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
			// end
		}
	}
</script>

<style scoped>
	page {
		background: #fff;
		padding: 0 32rpx;
		width: 750upx;
		box-sizing: border-box;
	}
.noContent{
		width: 686upx;
		height: 500upx;
		margin-left: 32upx;
		margin-bottom: 122upx;
		margin-top: 315upx;
	}
	.searchBox {
		position: relative;
	}

	.searchIcon {
		position: absolute;
		right: 35upx;
		top: 15upx;
		width: 40upx;
		height: 32upx;
		z-index: 99;

	}

	.search {
		width: 686upx;
		height: 60upx;
		// background-color: skyblue;
		border-radius: 30upx;
		text-align: center;
		margin: 30upx 0;
		border: 1px solid #f1f1f1;
		font-size: 26upx;
		color: #999999;
	}

	.swiper {
		width: 686upx;
		height: 280upx;
		border-radius: 20upx;
		overflow: hidden;
	}

	.swiper-item image {
		width: 100%;
		height: 307rpx;
		display: block;
	}


	.contBg {
		background: #FFFFFF;
		overflow: hidden;
		margin-bottom: 30upx;
	}

	.contOver {
		border-bottom: 1px #EDEDED solid;
		overflow: hidden;
		transition: all 0.4s;
		position: relative;
	}

	.contOver:active {
		background: #E2E2E2;
	}

	.contOver:last-child {
		border-bottom: none;
	}

	.contOverLt {
		float: left;
		width: 60%;
	}

	.contTxt {
		color: #333333;
		font-weight: bold;
		font-size: 30upx;
		width: 100%;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		padding-top: 30upx;
	}

	.contTime {
		color: #888888;
		font-size: 24upx;
		// margin-top: 40upx;
		position: absolute;
		bottom: 30upx;
	}

	.contRtImg {
		float: right;
		width: 35%;
		height: 155upx;
		margin: 30upx 0;
	}

	.contRtImg image {
		width: 100%;
		height: 100%;
		display: block;
		border-radius: 6upx;
	}

	.contTitle {
		background: #FFFFFF;
		font-size: 30upx;
		color: #3B7ED5;
		height: 80upx;
		line-height: 80upx;
		border-bottom: 1px #F5F5F5 solid;
	}

	.shopOver {
		overflow: hidden;
		margin-bottom: 30upx;
	}

	.shopLt {
		float: left;
		width: 48.5%;
		background: #FFFFFF;
		height: 370upx;
		border: 1px #F2F2F2 solid;
		border-radius: 12upx;
		transition: all 0.4s;
		margin-top: 15upx;
	}

	.shopLt:nth-child(2n) {
		float: right;
	}

	.shopLt:active {
		background: #E2E2E2;
	}

	.shopImg {
		height: 220upx;
	}

	.shopImg image {
		width: 210upx;
		height: 210upx;
		margin-top: 6upx;
		margin-left: 56upx;
		display: block;
		border-radius: 12upx;
	}
	
	.shopTxt {
		font-size: 28upx;
		color: #333333;
		padding: 10upx 20upx 0 10upx;
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.shopMoney {
		padding: 0 20upx;
		font-size: 24upx;
		padding: 8upx 14upx 0 12upx;
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #aaa;
		height: 36upx;
		line-height: 36upx;

	}
		.money {
			font-size: 32upx;
			color: red;
		}


	// 五个分类
	.sort {
		margin-top: 30upx;
		margin-bottom: 30upx;
		width: 686upx;
		height: 102upx;
		box-sizing: border-box;


	
	}
	.items {
		// 每个137
		width: 100upx;
		height: 100upx;
		margin-right: 19upx;
		margin-left: 18upx;
		display: inline-block;
		text-align: center;
	
	}
	
	.items img {
		width: 74upx;
		height: 74upx;
		margin-bottom: 5upx;
	}
		
	.name {
		font-size: 24upx;
		color: #333;
	}
	.items:nth-child(5) {
		margin-right: 0;
	}
</style>
