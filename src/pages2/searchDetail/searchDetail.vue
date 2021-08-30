<template>
	<!--搜索-->
	<view>
		<!--主体-->
		<view class="idxMain">
			<!--面包屑-->
			<!-- <view class="breadBox">
				<text class="breadTxt">日本 > 消化及肛肠用药 > 其他风热感冒</text>
				<view class="right">
					筛选
					<image class="select" src="../../static/images/index/筛选.png" mode=""></image>
				</view>
			</view> -->
			<!-- 面包屑结束 -->
			<view v-cloak class="shopOver" v-show="length < 1 && sorryState">
				{{this.sorry}}
			</view>
			<view class="shopOver" v-show="length >= 1">
				<view class="idxMainBox">
					<view class="wrapBox" v-for="(item,index) in contTwoList" :key='index' @click="goCommodity(item.id)">
						<view class="imgBox">
							<image class="thumbnail" :src="item.thumbnail" mode="aspectFill"></image>
						</view>
						<view class="rightBox">
							<text class="one">{{ item.namechs }}</text>
							<text class="two">{{ item.symptom}}</text>
							<text class="price">价格:￥{{ item.price }}</text>
						</view>
					</view>
				</view>
			</view>
			<!--内容2-->
			<view class="footer" v-show="sorryState">
				啊哦~滑到底了呀~
			</view>
		</view>
		<!--主体end-->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				seacrchIcon: require("../../static/images/index/搜索.png"),
				inputPlaceHolder: "请输入要搜索的药品名和症状",
				sorry:"抱歉,您要搜索的内容暂无",
				sorryState:false,
				length: '',
				contTwoList: [

				],
				a:'',//储存搜索对象
				commodityId: '',
				searchContent: "",
				indexCurrent: "1",
			}
		},
		onLoad(option) {
			// start

			console.log("搜索的是啥", option)
			this.search(option);
		},
		methods: {
			//首页头部tab点击切换
			// IsHeadTabClick: function(index, item) {
			// 	this.headTabIdx = index;
			// },
			//官网复制的轮播
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			// 去资讯详情
			goCommodity(e) {
				console.log("去资讯详情", e, this.interval);
				this.commodityId = e;
				uni.navigateTo({
					url: `../../pages2/details/details?id=${this.commodityId}`,
				})

			},
			goSearch(e) {
				console.log("去搜索", e);
				this.searchContent = e;
				uni.navigateTo({
					url: `../../pages2/searchDetail/searchDetail?searchContent=${this.searchContent}&country=&priNav=&secNav=&searchContent=`,
				})
			},
			searchFocus() {
				console.log("聚焦");
				this.inputPlaceHolder = "";
			},
			// start
			search(a) {
				console.log("搜索的内容", a)
				this.a = a
				uni.request({
					url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/home_page/nocheck/search",
					// url: "http://47.105.107.186:8886/wx-yuyihui/applets/home_page/nocheck/search",
					method: 'get',
					data: {
						'current': 1,
						'size': 8,
						'searchContent': a.searchContent,
						'country': a.country,
						'priNav': a.priNav,
						'secNav': a.secNav,
					},
					success: (res) => {
						console.log(a, "返回的信息", res);
						this.contTwoList = res.data.data.records;
						this.length = res.data.data.total;
						this.sorryState =true;
					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
			// end
		},
		onReachBottom: function() {
			this.indexCurrent++;
			let  a = this.a;
			uni.request({
				url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/home_page/nocheck/search",
				// url: "http://47.105.107.186:8886/wx-yuyihui/applets/home_page/nocheck/search",
				
				method: 'GET',
				data: {
					current: this.indexCurrent,
					size: 8,
					'searchContent': a.searchContent,
					'country': a.country,
					'priNav': a.priNav,
					'secNav': a.secNav,
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
		},
	}
</script>

<style scoped>
	// 开始
	[clock]{
		display: none;
	}
	.idxMain {
		background: #fff;
		width: 750upx;
		box-sizing: border-box;
	}

	.breadBox {
		width: 750upx;
		height: 80upx;
		line-height: 80upx;
		box-sizing: border-box;
		padding: 0 32upx;
		background-color: #2da5be;
	}

	.breadTxt {
		font-size: 28upx;
		color: #fff;
	}

	.right {
		width: 130upx;
		height: 48upx;
		margin-top: 16upx;
		border-left: 1px solid #fff;
		padding-left: 26upx;
		box-sizing: border-box;
		float: right;
		line-height: 48upx;
		font-size: 28upx;
		position: relative;
		color: #fff;

	}

	.select {
		width: 28upx;
		height: 28upx;
		position: absolute;
		right: 11upx;
		top: 14upx;
	}

	// 商品开始
	.idxMainBox {
		width: 686upx;
		margin-left: 32upx;
		min-height: 222upx;
	}

	.wrapBox {
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
		background-color: skyblue;
		float: left;
		border-radius: 10upx;
		overflow: hidden;

	}

	.thumbnail {
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

	.one {
		font-size: 28upx;
		color: #333;
		display: block;
		position: absolute;
		top: 0;
		width: 394upx;
		height: 74upx;
		overflow: hidden;
	}

	.two {
		font-size: 24upx;
		color: #666;
		display: block;
		position: absolute;
		top: 82upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 394upx;
		height: 34upx;
	}

	.price {
		font-size: 34upx;
		color: #ff1919;
		display: block;
		position: absolute;
		bottom: 0;
	}

	// 商品结束
	// footer
	.footer {
		width: 686upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 28upx;
		color: #666;
		text-align: center;
	}

	// footer end
</style>
