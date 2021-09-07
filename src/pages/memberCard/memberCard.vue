<template>
	<view style="padding-bottom:100upx">
		<view style="box">
			<img :src="bgImg" style="width:100%">
			<view class="coupon" @click="goZx">
				<img :src="couponImg" style="width:100%; height:100%">
			</view>
			<navigator url="../kefu/kefu" class="consult">
				<img :src="consultImg" style="width:100%; height:100%">
			</navigator>
		</view>
		<view class="footer">
			<button class="buy" @click="goZx">立即办理(支付200元)</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgImg: require("../../static/images/我的/余益惠权益卡办理引导图.jpg"),
				couponImg: require("../../static/images/我的/优惠券.jpg"),
				consultImg: require("../../static/images/我的/咨询.jpg")
			}
		},
		methods: {
			goZx() {
				uni.navigateTo({
					url:`../memberHandle/memberHandle?id=1`
				})
			}
		}
	}
</script>

<style scoped>
.box {
	width: 100%;
	height: 100%;
	position: relative;
}
.coupon {
	position: absolute;
	top: 1250upx;
	width: 100%;
	padding:0 70upx;
	box-sizing: border-box;
}
.consult {
	position: absolute;
	top: 2470upx;
	width: 100%;
	padding:0 200upx;
	box-sizing: border-box;
}
.footer {
	background:#efefef;
	position: fixed;
	bottom: 0;
	height: 110upx;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding:16upx 20upx;
	box-sizing: border-box;
}
.buy {
	width: 100%;
	height: 100%;
	background: #01677D;
	border-radius: 38upx;
	font-weight: 500;
	font-size: 30upx;
	color: #FFFFFF;
}
</style>
