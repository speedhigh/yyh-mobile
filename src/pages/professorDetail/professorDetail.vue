
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
			<rich-text class="txt" :nodes="item.content"></rich-text>
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
					title: '优势病症',
					content: ["111111"]
				}, {
					title: '专家简介',
					content: ["2222", "2222222222222"]
				}, ]
			};
		},
		onLoad(option) {
			console.log('进入专家详情')
			console.log('医检传过来的数据', option)
			uni.request({
				// url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/medical_examination/nocheck/get_expert_by_id",
				url: "http://192.168.1.109:8886/wx-yuyihui/applets/medical_examination/nocheck/get_expert_by_id",
				method: 'GET',
				data: {
					id: option.id,
				},
				success: (res) => {
					console.log("专家", res)
					// 1
					this.bannerList[0].imgs = res.data.data.detailImage;

					this.list[0].content = res.data.data.advantage;
					this.list[1].content = res.data.data.resume;

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

<style  scoped>

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
		margin-bottom: 20upx;
	}
	.title {
		border-left: 5px solid #2da5be;;
		padding-left: 10upx;
		font-size: 28upx;
		color: #333;
		margin-bottom: 20upx;
		font-weight: bold;
	}
		
	.txt {
		font-size: 24upx;
		color: #666;
		margin-bottom: 30upx;
	}
</style>
