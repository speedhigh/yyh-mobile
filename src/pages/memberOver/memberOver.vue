<template>
	<view class="over">
		<image class="img" :src="state==1? img1:img2" mode=""></image>
		<view class="o1">
			<text>{{state ==1? '恭喜您办理成功！':'很抱歉，支付失败...'}}</text>
		</view>

		<view class="o2">
			<text>{{state ==1? '我们将在和您核实后的3-5个工作日发出':'请检查相关信息后重新进行支付'}}</text>
		</view>
		<view class="back" @click="back()">
			返回首页
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: '1',
				img1: require('../../static/images/我的/new/成功.png'),
				img2: require('../../static/images/我的/new/失败.png'),

			}
		},
		methods: {
			back() {
				console.log(1)
				uni.reLaunch({
					url: '../../pages/index/index'
				})
			}
		}
	}
</script>

<style scoped>
	.over {
		padding-top: 1upx;
	}

	.back {
		width: 360upx;
		height: 72upx;
		font-size: 32upx;
		color: #fff;
		line-height: 72upx;
		text-align: center;
		border-radius: 36upx;
		margin: 60upx auto;
		background-color: #2da5be;
	}

	.img {
		width: 160upx;
		height: 160upx;
		margin-top: 360upx;
		margin-left: 290upx;
	}

	.o1 {
		text-align: center;
		margin-top: 50upx;
		margin-bottom: 30upx;
		font-size: 28upx;
	}

	.o2 {
		text-align: center;
		font-size: 28upx;
	}
</style>
