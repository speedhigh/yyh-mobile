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
			<view class="txt" v-for="(item2,i2) in item.content" :key="i2">
				{{item2}}
			</view>
		</view>
	</view>
	
	
</template>
<!-- 
	       昨天 
	       verse1
	       清晨的操场 学生们三三两两
		   下过雨后的路上 折射着温暖的阳光 
	       刚下公车的小孩 兴奋的冲向等待她的朋友
		   他们的单纯的感情  让人羡慕
			
		   |
		    hook
		   |
	       verse2
	         回忆录 每一步
			周围的人也在教我 别再感情里率先出手
			好坏都要带着面具 多考虑考虑别人的感受
				好吧确实就是我的错 是我渐渐变冷漠
				不必想象未来的轮廓  一加一等于三说过
				世界说等于二是因为他们不对
		   他们在嘲讽
		   直行的道路 你怎么走得跌跌撞撞
			|
			hook
			|
			verse3
	       左手边手机传来震颤
	       带走了我喜欢的青春  还好我更喜欢今天
		   因为手表显示在 五点二十一分 
		   因为阳光洒落在此时的清晨
		   就让它在心里简单的生根 
		   就让它遮住想要开口的单纯
	       做你想做的 这世界本就混沌
	       做你想做的 就像青春的单纯
	       做你想做的 就算大人不懂孩子的想法
	       做你想做的 别让喜欢与爱变的复杂
	       time
	 
	 -->
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
					title: '专家1',
					content: ["111111"]
				}, {
					title: '专家2',
					content: ["2222", "2222222222222"]
				}, ]
			};
		},
		onLoad(option) {
			console.log('进入专家详情')
			console.log('医检传过来的数据',option)
		},
		mounted() {
			uni.request({
				// url: "https://47.105.107.186:8886/wx-yuyihui/applets/medical_examination/nocheck/get_expert_by_id",
				// url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/medical_examination/nocheck/get_expert_by_id",
				url: "http://192.168.1.109:8886/wx-yuyihui/applets/medical_examination/nocheck/get_expert_by_id",
			
				method: 'GET',
				data: {
					id: 1,	
				},
				success: (res) => {
					console.log("到底啦", res.data.data)
					// 1
					// this.contTwoList.push(res.data.data.records);
					// 2
					var next_data = res.data.data.records;
					// this.contTwoList = this.contTwoList.slice(0,8).concat(next_data);
					this.contTwoList = this.contTwoList.concat(next_data);
			
				},
				fail: (err) => {
					console.log(err)
				}
			})
		}
	}
</script>

<style lang="less">
	@main :#2da5be;

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

		.loopBox {
			.title {
				border-left: 6px solid @main;
				padding-left: 10upx;
				font-size: 28upx;
				color: #333;
				margin-bottom: 30upx;
				font-weight: bold;
				// border-radius: 6upx;
			}

			.txt {
				font-size: 24upx;
				color: #666;
				margin-bottom: 30upx;
			}
		}
	}
</style>
