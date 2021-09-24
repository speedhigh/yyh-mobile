<template>
	<view class="me">
		<view class="wrap">
			<image class="contentImg" src="https://yuyihui-re.oss-cn-beijing.aliyuncs.com/af37d53e-a3f7-4bff-aa36-fd4d5814a4da.jpg" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {	
			}
		},

		onLoad() {
			console.log("开始请求")
		}
	}
</script>

<style scoped >
	.me {
		position: relative;
	}
	.wrap {
		width: 750upx;
		min-height: 120upx;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto 20upx;	
	}
	.contentImg{
			width: 750upx;
			height: 3920upx;
	}
</style>
