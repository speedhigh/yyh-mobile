<template>
	<qs-page :header="true" :footer="true">
		<!-- 页面头部 -->
		<block slot="header">
			<status-bar></status-bar>
		</block>
		<block slot="header-placeholder">
			<status-bar></status-bar>
		</block>

		<!-- 页面底部 -->
		<block slot="footer">
			<view class="u-flex my-page-footer">
				<view class="footer-action" @click="goBack">
					<u-icon name="arrow-left" size="36"></u-icon>
				</view>
				<view class="u-flex-1">
					<u-search placeholder="说两句..." :show-action="false"></u-search>
				</view>
				<view class="footer-action" @click="tip">
					<u-icon name="arrow-upward" size="36"></u-icon>
				</view>
				<view class="footer-action" @click="tip">
					<u-icon name="star" size="36"></u-icon>
				</view>
				<view class="footer-action" @click="tip">
					<u-icon name="zhuanfa" size="36"></u-icon>
				</view>
				<view class="footer-action" @click="tip">
					<u-icon name="more-dot-fill" size="36"></u-icon>
				</view>
			</view>
		</block>
		<!-- 页面主体 -->
		<view class="news-detail">
			<!-- #ifdef MP -->
			<nav-bar></nav-bar>
			<!-- #endif -->
			<!-- #ifndef MP -->
			<u-gap height="40"></u-gap>
			<!-- #endif -->
			<view class="detail-title">{{article.articleTitle}}</view>
			<view class="detail-extra">
				<text>{{article.updateTime.slice(0,10)}} </text>
				<text class="u-m-l-30">{{article.articleType}}</text>
			</view>
			<view class="detail-content">
				<!-- <view class="u-m-b-20" v-html="article.articleContent">
					
				</view> -->
				<rich-text class="u-m-b-20" :nodes="richText"></rich-text>
				<!-- 	<view class="u-m-b-20">
					6月23日消息 今天在WWDC 2020大会上，苹果发布了iOS 14、iPadOS14系统，首次（正式）介绍了其最新版的iPhone软件，它为iOS主屏幕带来了多年来最大的变化：小插件，另外还有App资源库、画中画模式等。
				</view>
				<view class="u-m-b-20">
					今天苹果面向开发人员发布了iOS 14/iPadOS 14开发者预览版/公开测试版 Beta ，具体版本号为18A5301，开启新一轮的iOS/iPadOS系统测试，大家可以到【果粉圈】集中讨论。
				</view> -->
				<!-- <image class="inner" :src="commodityList.image" mode="widthFix"></image> -->
			</view>

			<u-loadmore status="nomore" color="#999999"></u-loadmore>
			<u-gap height="120"></u-gap>
		</view>
	</qs-page>
</template>

<script>
	export default {
		data() {
			return {
				article: {},
				richText: '',
			};
		},
		onLoad(option) {
			console.log("资讯详情", option)
			this.search(option.id)
		},
		methods: {
			// 打开页面
			openPage(path) {
				this.$u.route({
					url: '/pages/' + path
				});
			},
			// 提示
			tip() {
				return this.$u.toast('暂未开通');
			},
			// 返回
			goBack() {
				uni.navigateBack();
			},
			search(a) {
				// start
				uni.request({
					url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/article/no_check/get_drug_detail",
					method: 'get',
					data: {
						id: a
					},
					success: (res) => {
						console.log(a, "返回的资讯信息", res);

						this.article = res.data.data;
						// this.richText = res.data.data.articleContent;
						this.richText = res.data.data.articleContent.replace(/<img/g,
							'<img mode="widthFix" style="width:320px;margin-left:10px" ');


						//  mode="widthFix"
						// var newImg = document.getElementsByTagName('img');
						// for(let i =0;i< newImg.length;i++){
						// 	newImg[i].mode = "widthFix";
						// 	newImg[i].style.width = "300upx";
						// }

					},
					fail: (err) => {
						console.log(err)
					}
				})
				// end
			}
		}
	};
</script>

<style scoped>
	.my-page-footer {
		height: 32upx;
		background-color: #FFFFFF;
		padding: 0 10rpx;

	}

	.footer-action {
		padding: 0 20rpx;
	}

	.news-detail {
		background-color: #ffffff;

		
	}
	.detail-title {
		border-left: 10rpx solid #d81e06;
		padding: 0 30rpx;
		font-size: $uni-font-size-title;
		font-weight: bold;
		color: $uni-color-title;
		line-height: 1.5;
	}
	
	.detail-extra {
		padding: 20rpx 30rpx;
		font-size: 24rpx;
		color: $uni-text-color-grey;
	

	}
	.u-m-l-30 {
		margin-left: 10upx;
	}
	.detail-content {
		padding: 30rpx 30rpx;
		font-size: $uni-font-size-paragraph;
		color: $uni-color-paragraph;
		line-height: 2;
	}
</style>
