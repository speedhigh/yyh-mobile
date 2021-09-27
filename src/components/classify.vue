<template>
	<view name="classify" class="classifyBox">
		<view class="classify">
			<span v-for="(item,i) in list" :key="i" class="item" @click="goSearch(item.search)">
				<view class="imgBox">
					<image class="classifyImg" :src="item.img" mode=""></image>
				</view>
				<view class="bottomBox">
					{{item.title}}
				</view>
			</span>
		</view>
		<view class="classify">
			<span v-for="(item,i) in list2" :key="i" class="item" @click="goSearch(item.search)">
				<view class="imgBox">
					<image class="classifyImg" :src="item.img" mode=""></image>
				</view>
				<view class="bottomBox">
					{{item.title}}
				</view>
			</span>
		</view>
	</view>
</template>

<script>
	export default {
		name: "classify",
		data() {
			return {
				list: [{
						id: '003',
						title: "呼吸系统",
						search:'呼吸系统用药',
						img: require('../static/images/首页分类区/呼吸系统.png')
					}, {
						id: '004',
						title: "关节骨外",search:'关节骨外用药',
						img: require('../static/images/首页分类区/关节骨外.png')
					}, {
						id: '005',
						title: "肛肠消化",search:'消化及肛肠用药',
						img: require('../static/images/首页分类区/肛肠消化.png')
					}, {
						id: '012',
						title: "疼痛缓解",search:'疼痛缓解',
						img: require('../static/images/首页分类区/疼痛缓解.png')
					},
					{
						id: '015',
						title: "滋补健美",search:'滋补健美',
						img: require('../static/images/首页分类区/滋补健美.png')
					},
				],
				list2: [{
						id: '009',
						title: "五官专科",search:'五官用药',
						img: require('../static/images/首页分类区/五官专科.png')
					}, {
						id: '008',
						title: "女性专科",search:'女性专科',
						img: require('../static/images/首页分类区/女性专科.png')
				
					}, {
						id: '014',
						title: "儿童专科",search:'儿科专科用药',
						img: require('../static/images/首页分类区/儿童专科.png')
				
					}, {
						id: '007',
						title: "皮肤专科",search:'皮肤用药',
						img: require('../static/images/首页分类区/皮肤专科.png')
				
					},
					{
						id: '020',
						title: "其他",search:'其他',
						img: require('../static/images/首页分类区/其他.png')
				
					},
				],
				priNav: "",
			};
		},
		methods: {
			goSearch(e) {
				console.log("去搜索", e);
				this.priNav = e;
				uni.navigateTo({
					url: `../../pages2/searchDetail/searchDetail?priNav=${this.priNav}&secNav=&searchContent=&country=`,
				})

			},
		}
	}
</script>

<style scoped>
	.classifyBox {
		/* box-shadow: 2px 2px 2px #f7f7f7, 2px -2px 2px #f7f7f7, -2px 2px 2px #f7f7f7, -2px -2px 2px #f7f7f7; */
		width: 686upx;
	}

	.classify {
		width: 686upx;
		height: 130upx;
		margin-top: 20upx;
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: space-around;
	}
	.item {
		width: 98upx;
		height: 130upx;
		display: inline-block;
	}
	.imgBox {
		margin-top: 8upx;
		margin-left: 10upx;
		width: 88upx;
		height: 88upx;
		display: block;
	}
		
		.classifyImg {
			width: 88upx;
			height: 88upx;
		
		}
	.bottomBox {
		/* font-size: 24upx; */
		font-size: 24upx;
		color: #333;
		width: 110upx;
		height: 26upx;
		text-align: center;
		float: left;
	}
</style>
