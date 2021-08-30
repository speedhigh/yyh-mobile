<template>
	<view class="hotDrugs">
		<scroll-view scroll-y="true" class="wrap">
			<view class="top">
				当季热门药品
			</view>
			<view class="item" v-for="(item,i) in list" :key="i" @click="go(item.id)">

				<view class="imgBox">
					<image class="thumbnail" :src="item.thumbnail" mode=""></image>
				</view>
				<view class="rightBox">
					<text class="one">{{item.namechs}}</text>
					<text class="two" v-text="item.symptom"></text>
					<text class="price">¥{{item.price}}</text>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import request from '../../js_sdk/request/request.js' //引进requst方法
	export default {
		data() {
			return {
				list: [{
						id: 1,
						title: '111'
					},
					{
						id: 2,
						title: '111'
					},
					{
						id: 3,
						title: '111'
					},
					{
						id: 4,
						title: '111'
					},
					{
						id: 5,
						title: '111'
					},
					{
						id: 6,
						title: '111'
					},
				]
			};
		},
		methods:{
			go(a) {
				console.log(a)
				this.commodityId = a;
				uni.navigateTo({
					url: `../../pages2/details/details?id=${this.commodityId}`,
				})
			},
		},
		mounted() {
			// request({
			// 	url: "/wx-yuyihui/applets/home_page/nocheck/get_hot_drug",
			// 	method: 'get',
			// 	params:{
			// 		currentPage:'1',
			// 		pageSize:'3',
			// 	},
			// 	success: (res) => {
			// 		console.log("50个热门药品", res);
				
			// 		console.log(this.countryList)
			// 	},
			// 	fail: (err) => {
			// 		console.log(err)
			// 	}
			// })
			uni.request({
				url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/home_page/nocheck/get_hot_drug",
				method: 'get',
				data: {
					currentPage:'1',
					pageSize:'50',
				},
				success: (res) => {
					console.log("50返回的信息", res);
					this.list =res.data.data.records;
			
				},
				fail: (err) => {
					console.log(err)
				}
			})
		}
	}
</script>

<style scoped>
	.hotDrugs {
		margin-top: 30upx;
		width: 686upx;
		height: 100%;
		background-color: #ffffff;
		box-shadow: 2px 2px 2px #f7f7f7, 2px -2px 2px #f7f7f7, -2px 2px 2px #f7f7f7, -2px -2px 2px #f7f7f7;
		padding: 0 20upx 20upx;
		box-sizing: border-box;
	}
	.wrap {
		white-space: nowrap;
		height: 100%;
	}
	.top {
		height: 80upx;
		width: 646upx;
		line-height: 80upx;
		font-size: 28upx;
		font-weight: bold;
		color: #333;
		border-bottom: 1px solid #e6e6e6;
	}
		
	.item {
		height: 220upx;
		width: 646upx;
		color: #333;
		padding: 30upx 0;
		box-sizing: border-box;
		border-bottom: 1px solid #e6e6e6;
	}
	
	.imgBox {
		width: 220upx;
		height: 160upx;
		margin-right: 30upx;
		// background-color: skyblue;
		float: left;
		border-radius: 10upx;
		overflow: hidden;
	
	}
	.thumbnail{
		width: 220upx;
		height: 160upx;
	}
	.rightBox {
		float: left;
		width: 394upx;
		height: 160upx;
		// background-color: pink;
		position: relative;
		padding: 0;
		
	}
	.one{
		font-size: 28upx;
		color: #333;
		line-height: 32upx;
		display:block;
		position: absolute;
		top: 0;
		width: 394upx;
		height: 66upx;
		overflow: hidden;
		padding: 0 4upx;
		overflow: hidden;
		white-space: normal;
		word-break: break-all;
		word-wrap: break-word;
	}
	
	.one:after {
		content: '';
		position: absolute;
		right: 11upx;
		bottom: 0;
		background: #fff;
		padding-left: 2upx;
	}	
	.two{
		font-size: 24upx;
		color: #666;
		display:block;
		position: absolute;
		top: 70upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 394upx;
		height: 30upx;
	}
	.price{
		font-size: 34upx;
		color: #ff1919;
		display:block;
		position: absolute;
		bottom: 0;
	}
</style>
