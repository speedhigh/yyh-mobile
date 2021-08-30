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
			this.getAxios();
		},
		methods: {
			// 89897220220609
			getAxios: function() {
				uni.request({
					// url: "https://47.105.107.186:8886/ow-yuyihui/article_ask/detail?id=1",
					url: "https://www.yuyihui.com.cn:8886/ow-yuyihui/article_ask/detail?id=1",
					
					method: 'get',
					success: (res) => {
						console.log(res, "返回的信息");
					},
					fail: (err) => {
						console.log(err)
					}


				})
			},
			
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
