<template>
	<view class="body">
		<view class="wrap" v-for="(item,i) in imgList" :key="i">
			<view class="wrapBox" v-show="item.id == imgId">
				<image class="bodyImg" :src="item.img" mode="widthFix"></image>
			</view>

		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgId: '',
				imgList: [{
						id: 11,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/c1eb8649-ba42-4a12-bfb1-72e9e227d6f7.jpg'
					},
					{
						id: 12,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/453cebbc-1933-44a1-98a9-a44ef7651177.jpg'
					},
					{
						id: 13,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/21661410-6965-45be-b2e8-b87ff4aeb1a9.jpg'
					},
					{
						id: 14,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/1add61a4-e18a-41fd-8038-bb029001eb70.jpg'
					},
					{
						id: 15,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/9dbbed38-f3e3-4aa4-bb83-9184a3a2ce1c.jpg'
					},
					{
						id: 16,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/11d645a4-aa5b-4265-9f90-975b3a1cfd3f.jpg'
					},
					// 2
					{
						id: 21,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/816ec9e3-53ec-42b0-97fc-f175e551bdb6.jpg'
					},
					{
						id: 22,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/af3fdc62-e2ce-409b-aee1-223d098426ee.jpg'
					},
					{
						id: 23,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/c302af07-3119-4120-9731-ab5573672fe0.jpg'
					},
					// 3
					{
						id: 31,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/6c8947fd-2bb7-4a69-a6e3-6b900f07dbcb.jpg'
					},
					{
						id: 32,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/9174a656-ec50-4fec-8d4b-826d535073f7.jpg'
					},
					{
						id: 33,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/254a0316-39de-4f13-ab86-8710e44596ba.jpg'
					},
					{
						id: 34,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/82a617d7-37ca-4062-b66a-568477d820b6.jpg'
					},
					// 4
					{
						id: 41,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/9ed23996-8abe-4eb8-aa29-d35dec86b935.jpg'
					},
					{
						id: 42,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/261bff0a-67e9-4bbd-a08c-f16a69727e03.jpg'
					},
					{
						id: 43,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/f70f7a1e-1eaa-4942-abfa-93a954babdd4.jpg'
					},
					{
						id: 44,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/cc75e2d6-4a63-4645-8275-8fd6c4c46103.jpg'
					},
					// 5
					{
						id: 51,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/4c4f90b4-32fc-4f89-b685-96a18854bc62.jpg'
					},
					{
						id: 52,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/32b8f69b-0a37-4787-ac45-e478a5293bd3.jpg'
					},
					// 6
					{
						id: 61,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/f877b93b-c0e3-40c6-9e94-0f065a634e83.jpg'
					},
					{
						id: 62,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/73bc6e25-b927-48f5-8d08-82945b31dae8.jpg'
					},
				]
			};
		},
		mounted(option) {

		},
		onLoad(option) {
			this.imgId = option.id;
			console.log(option, "进入套餐详情", this.imgId)
		}
	}
</script>

<style scoped >
	.body {
		width: 750upx;
	}

	.bodyImg {
		width: 750upx
	}
</style>
