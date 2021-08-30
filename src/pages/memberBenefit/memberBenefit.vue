<template>
	<view class="memberBenefit">
		<!-- 会员权益 -->
		<!-- <view class="imgBox" v-for="(item,i) in imgList">
			<image class="img" :src="item" mode=""></image>
		</view>
		<view class="imgBox imgBox2">
			<image class="img img2" src="../../static/images/会员权益/会员权益15.jpg" mode=""></image>
		</view>
		<view class="imgBox imgBox2">
			<image class="img img2" src="../../static/images/会员权益/会员权益16.jpg" mode=""></image>
		</view>
		<view class="imgBox">
			<image class="img " src="../../static/images/会员权益/会员权益17.jpg" mode=""></image>
		</view>
		<view class="imgBox imgBox3">
			<image class="img img3" src="../../static/images/会员权益/会员权益18.jpg" mode=""></image>
		</view> -->
		<view class="imgBox ">
			<image class="img" src="https://yuyihui-re.oss-cn-beijing.aliyuncs.com/5d3a5508-8ef3-47fd-9357-2ad5ce6bf849.jpg" mode=""></image>
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [
					// require('../../static/images/会员权益/会员权益1.jpg'),
					// require('../../static/images/会员权益/会员权益2.jpg'),
					// require('../../static/images/会员权益/会员权益3.jpg'),
					// require('../../static/images/会员权益/会员权益4.jpg'),
					// require('../../static/images/会员权益/会员权益5.jpg'),
					// require('../../static/images/会员权益/会员权益6.jpg'),
					// require('../../static/images/会员权益/会员权益7.jpg'),
					// require('../../static/images/会员权益/会员权益8.jpg'),
					// require('../../static/images/会员权益/会员权益9.jpg'),
					// require('../../static/images/会员权益/会员权益10.jpg'),
					// require('../../static/images/会员权益/会员权益11.jpg'),
					// require('../../static/images/会员权益/会员权益12.jpg'),
					// require('../../static/images/会员权益/会员权益13.jpg'),
					// require('../../static/images/会员权益/会员权益14.jpg'),
			
				]
			};
		}
	}
</script>

<style scoped>
	.memberBenefit {
		position: relative;

	}
	.imgBox {
		width: 750upx;
		height: 4852upx;
		margin-top: 0;
		margin-bottom: 0;
		overflow: hidden;	
	}
	
	.img {
		width: 750upx;
		height: 4852upx;
		margin-top: 0;
		margin-bottom: 0;
	}
	.img2 {
		width: 750upx;
		height: 150upx;
		margin-top: 0;
		margin-bottom: 0;
	}
	.img3 {
		width: 750upx;
		height: 52upx;
		margin-top: 0;
		margin-bottom: 0;
	}
	
	.imgBox2 {
		width: 750upx;
		height: 150upx;
		margin-top: 0;
		margin-bottom: 0;
		overflow: hidden;	
	}
	.imgBox3 {
		width: 750upx;
		height: 52upx;
		margin-top: 0;
		margin-bottom: 0;
		overflow: hidden;	
	}
</style>
