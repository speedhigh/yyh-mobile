
<template>
	<!-- 专家详情组件 -->

	<view class="hospital">
		<!-- 轮播 -->
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
		<!-- 轮播结束 -->
		<view class="loopBox" v-for="(item,i) in list" :key="i">
			<view class="title">
				{{item.title}}
			</view>
			<view class="txt">
				<rich-text :nodes="item.content"></rich-text>
			</view>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				//轮播图
				bannerList: [{
						id: 1,
						imgs: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/fb84c5a1-08b9-421f-87a2-f518dcdc0c88.png'
					},


				],


				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				/*图片轮播*/
				list: [{
					title: '优势科室',
					content: ["111111"]
				}, {
					title: '医院简介',
					content: ["2222", "2222222222222"]
				}, ]
			};
		},
		onLoad(option) {
			console.log('医愿传过来的数据', option)
			uni.request({
				// url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/hospital/nocheck/get_detail_by_id",
				url: "http://192.168.1.109:8886/wx-yuyihui/applets/hospital/nocheck/get_detail_by_id",
				method: 'GET',
				data: {
					id: option.id,
				},
				success: (res) => {
					console.log("医院详情", res)
					// 1
					this.bannerList[0].imgs = res.data.data.hospitalThumbnail;

					this.list[0].content = res.data.data.hospitalSynopsis;
					this.list[1].content = res.data.data.hospitalContent;

				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		mounted() {

		}
	}
</script>

<style scoped>

	.swiper {
		width: 686upx;
		margin: 30upx 0;
		height: 280upx;
		border-radius: 20upx;
		overflow: hidden;
	}

	.swiper-item image {
		width: 100%;
		height: 311rpx;
		display: block;
	}

	.hospital {
		width: 750upx;
		padding: 0 32upx;
		box-sizing: border-box;

	
	}
	.loopBox {
		position: relative;
	}
	.title {
		height: 30upx;
		border-left: 6upx solid #2da5be;
		padding-left: 10upx;
		font-size: 28upx;
		line-height: 30upx;
		color: #333;
		margin-bottom: 30upx;
		font-weight: bold;
	}
		
	.txt {
		font-size: 24upx;
		color: #666;
		margin-bottom: 30upx;
	}
</style>
