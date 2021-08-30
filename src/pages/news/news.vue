<template>
	<view>
		<!--头部导航-->
		<view class="headBox">
			<view class="headNavBox">
				<scroll-view scroll-x="true" scroll-top>
					<view :class="index == headNav ?'head headActive':'head '" v-for="(item,index) in headTabList" :key="index" @click="IsHeadTabClick(index,item)">
						{{ item }}
					</view>
				</scroll-view>
			</view>
		</view>

		<!--主体-->
		<view class="idxMain" v-show="headNav ==0">
			<!--轮播图-->
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
			<!--轮播图-->

			<!--内容1-->
			<view class="contBg">
				<view @click="goDetail(item.id)" class="contOver" v-for="(item,index) in contOneList" :key="index">
					<view class="idxMainBox">
						<view class="contOverLt">
							<view class="contTxt">{{ item.articleTitle }}</view>
							<view class="contTime">{{ item.articleType }} {{ item.updateTime.slice(0,10) }}</view>
						</view>
						<view class="contRtImg">
							<image :src="item.articleThumbnail"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--内容1end-->
		<!-- 内容2 海外药讯 -->
		<view class="yaoxunBox" v-show="headNav ==1">
			<!--轮播图-->
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
			<view class="a">
				<!-- 2222222222 -->
				<view class="contBg">
					<view @click="goDetail(item.id)" class="contOver" v-for="(item,index) in contOneList" :key="index">
						<view class="idxMainBox">
							<view class="contOverLt">
								<view class="contTxt">{{ item.articleTitle }}</view>
								<view class="contTime">{{ item.articleType }} {{ item.updateTime.slice(0,10) }}</view>
							</view>
							<view class="contRtImg">
								<image :src="item.articleThumbnail"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!--轮播图-->
		</view>
		<!-- 内容2end -->
		<!-- 内容3 -->
		<view class="enterpriseBox" v-show="headNav ==2">
			<!--轮播图-->
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
			<!--轮播图-->
			<view class="a">
				<!-- 3333333333333333 -->
				<view class="contBg">
					<view @click="goDetail(item.id)" class="contOver" v-for="(item,index) in contOneList" :key="index">
						<view class="idxMainBox">
							<view class="contOverLt">
								<view class="contTxt">{{ item.articleTitle }}</view>
								<view class="contTime">{{ item.articleType }} {{ item.updateTime.slice(0,10) }}</view>
							</view>
							<view class="contRtImg">
								<image :src="item.articleThumbnail"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 内容3end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headTabList: ['海外医讯', '海外药讯', '公司动态'],
				// 获取文章根据文章类型type(公司动态:[10,11,12],海外医讯:7,海外药讯:8), currentPage, pageSize
				sortType: [7],
				headNav: '0',
				articleCurrent: 1,
				articleId: '',
				bannerList: [{
						id: 1,
						imgs: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/9f3246f1-51a9-4586-bcf5-ff716d798054.png'
					},
					{
						id: 2,
						imgs: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/99ae1546-1b4c-4d8e-bc97-c43ef67d0d39.png'
					},
					{
						id: 3,
						imgs: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/cd350c83-88aa-4d34-ab88-7ae4f590c5d5.png'
					},
					{
						id: 4,
						imgs: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/138ca85b-d5bd-404d-ad92-3af8bc736607.png'
					},
				], //轮播图

				contOneList: [{
						id: 1,
						title: '《柳叶刀》 连发3文 糖尿病与认知障碍有紧密关联',
						author: '平台',
						updateTime: '2019-7-30',
						imgs: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/d6bb1106-7f39-4eff-985e-9e9792e931a6.jpg'
					},
					{
						id: 2,
						title: '《柳叶刀》 连发3文 糖尿病与认知障碍有紧密关联',
						author: '平台',
						updateTime: '2019-7-30',
						imgs: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/0c0d3bce-ff0e-4e75-9f85-fe232857d329.jpg'
					},
					// 	

				], //内容1

				/*图片轮播*/
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,

			}
		},
		onLoad() {
			// start
			uni.request({
				url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/medical_information/nocheck/get_article_by_type",
				method: 'POST',
				data: {
					"type": [7],
					"currentPage": 1,
					"pageSize": 6
				},
				success: (res) => {
					console.log(res, "返回的信息", res.data.data.records);
					this.contOneList = res.data.data.records;
				},
				fail: (err) => {
					console.log(err)
				}
			})
			// end
		},
		onReachBottom: function() {
			this.articleCurrent++;
			uni.request({
				url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/medical_information/nocheck/get_article_by_type",
				method: 'POST',
				data: {
					"type": this.sortType,
					"currentPage": this.articleCurrent,
					"pageSize": 6
				},
				success: (res) => {
					// console.log(res.data.data)
					// 1
					// this.contOneList.push(res.data.data.records);
					// 2
					var next_data = res.data.data.records;
					this.contOneList = this.contOneList.concat(next_data);

				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		methods: {
			//首页头部tab点击切换
			IsHeadTabClick: function(index, item) {
				console.log(index, item)
				this.headNav = index;
				this.articleCurrent = 1;
				if (index == 0) {
					this.sortType = [7]
					uni.request({
						url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/medical_information/nocheck/get_article_by_type",
						method: 'POST',
						data: {
							"type": this.sortType,
							"currentPage": this.articleCurrent,
							"pageSize": 6
						},
						success: (res) => {
							console.log(res.data.data)
							this.contOneList = res.data.data.records;

						},
						fail: (err) => {
							console.log(err)
						}
					})
				} else if (index == 1) {
					this.sortType = [8]
					uni.request({
						url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/medical_information/nocheck/get_article_by_type",
						method: 'POST',
						data: {
							"type": this.sortType,
							"currentPage": this.articleCurrent,
							"pageSize": 6
						},
						success: (res) => {
							this.contOneList = res.data.data.records;

						},
						fail: (err) => {
							console.log(err)
						}
					})
				} else {
					this.sortType = [10, 11, 12]
					uni.request({
						url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/medical_information/nocheck/get_article_by_type",
						method: 'POST',
						data: {
							"type": this.sortType,
							"currentPage": this.articleCurrent,
							"pageSize": 6
						},
						success: (res) => {
							this.contOneList = res.data.data.records;

						},
						fail: (err) => {
							console.log(err)
						}
					})
				}
			},
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
			goDetail: function(e) {
				console.log("去资讯详情", e);
				this.articleId = e;
				uni.navigateTo({
					url: `../newsDetail/newsDetail?id=${this.articleId}`
				})

			}

		}
	}
</script>

<style scoped>
	page {
		background: #fff;
		width: 750upx;
		padding: 0  0;
		box-sizing: border-box;
	}
	.swiper {
		border-radius: 20upx;
		height: 308upx;
		overflow: hidden;
		margin-bottom: 30upx;
	}

	.swiper-item image {
		width: 100%;
		height: 307rpx;
		display: block;
	}

	.headBox {
		width: 750upx;
		height: 72upx;
		box-sizing: border-box;
		background-color: #2da5be;


	}

	.headNavBox {
		position: relative;
	}

	.head {
		display: inline-block;
		width: 140upx;
		height: 60upx;
		margin: 0 50upx;
		font-size: 28upx;
		line-height: 60upx;
		text-align: center;
		color: #fff;
		box-sizing: border-box;
	}

	.headActive {
		/* background-color: #96525f; */
		border-bottom: 2px solid #fff;
	}

	.idxMain {
		width: 686upx;
		box-sizing: border-box;
		margin-left: 32upx;
		padding-top: 32upx;

	}

	.idxMainBox {
		width: 686upx;
		margin: 0 auto;
	}

	.contBg {
		background: #FFFFFF;
		box-sizing: border-box;
		width: 686upx;
		margin: 0 auto;
		margin-bottom: 20upx;
	}

	// 循环的资讯
	.contOver {
		width: 686upx;
		height: 220upx;
		margin: 0 auto 30upx;
		padding: 30upx 20upx;
		box-sizing: border-box;
		box-shadow: 2upx 2upx 2upx #f7f7f7, 2upx -2upx 2upx #f7f7f7, -2upx 2upx 2upx #f7f7f7, -2upx -2upx 2upx #f7f7f7;
		overflow: hidden;
		transition: all 0.4s;
		position: relative;
		border-radius: 10upx;
		overflow: hidden;
	}

	.contOverLt {
		float: left;
		width: 376upx;
		// background-color: pink;
		height: 160upx;
		position: relative;
	}

	.contTxt {
		color: #333333;
		font-weight: bold;
		font-size: 28upx;
		width: 100%;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.contTime {
		color: #888888;
		font-size: 24upx;
		position: absolute;
		bottom: 1upx;
	}

	.contRtImg {
		float: left;
		width: 220upx;
		height: 160upx;
		margin-left: 50upx;
	}

	.contRtImg image {
		width: 220upx;
		height: 160upx;
		display: block;
		border-radius: 6upx;
	}

	// 循环的资讯end
	// 内容2
	.yaoxunBox {
		width: 750upx;
		height: 1111upx;
		// background-color: skyblue;
		padding: 0 32upx;
		box-sizing: border-box;


	}

	.yaoxunBox .swiper {
		width: 686upx;
		border-radius: 20upx;
		height: 308upx;
		overflow: hidden;
		width: 686upx;
		margin-bottom: 30upx;
		margin-top: 30upx;
	}

	.yaoxunBox .swiper-item image {
		width: 100%;
		height: 307rpx;
		display: block;
	}

	// 内容3
	.enterpriseBox {
		width: 750upx;
		height: 1111upx;
		// background-color: pink;
		padding: 0 32upx;
		box-sizing: border-box;


	}

	.enterpriseBox .swiper {
		width: 686upx;
		border-radius: 20upx;
		height: 308upx;
		overflow: hidden;
		margin-bottom: 30upx;
		margin-top: 30upx;
	}

	.enterpriseBox .swiper-item image {
		width: 100%;
		height: 307rpx;
		display: block;
	}
</style>
