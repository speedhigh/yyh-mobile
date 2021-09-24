<template>
	<view class="commodity">
		<view class="topImgBox">
			<image :src="commodityList.thumbnail" mode="heightFix"></image>
		</view>
		<!--  v-for="(item,i) in commodityList" :key='i' -->
		<view class="content">
			<view class="title">
				{{commodityList.namechs}}
			</view>
			<!-- <view v-show="" class="page1">
				{{commodityList.symptom}}
			</view> -->
			<view class="messBox">
				<view class="one">
					<text class="spec big">¥{{commodityList.price}}</text><text>{{commodityList.country}}</text><text>规格:{{commodityList.specification}}</text>
				</view>
				<view class="two">
					药品数据均来自<text class="spec">香港木子药品网muzimed.com</text>
				</view>
				<view class="right">
					<image @click="choice(commodityList.id)" class="like" :src="likeState? likeImg : unlikeImg" mode=""></image>
					<text class="zi">{{likeState?'已收藏':"未收藏"}}</text>
				</view>
			</view>
			<!-- 循环的说明 -->
			<text class="book">药品说明书:</text>
			<view class="list">
				[特 征] :<rich-text class="listContent" :nodes="commodityList.characteristic"></rich-text>
			</view>
			<view class="list">
				[功能功效] :<rich-text class="listContent" :nodes="commodityList.symptom"></rich-text>
			</view>
			<view class="list">
				[有效成分] :<rich-text class="listContent" :nodes="commodityList.ingredient"></rich-text>
			</view>
			<!-- 用法用量 -->
			<view class="div">
				<p v-show="commodityList.dosage != ',,' || commodityList.mode || commodityList.time" class="yfyl">[用法用量]:</p>
				<p>{{commodityList.mode}} {{commodityList.time}}</p>

				<t-table v-show="commodityList.dosage != ',,'" border="1" cellspacing="1" cellpadding="1">
					<t-tr bgcolor="#e6e6e6">
						<t-td>年龄</t-td>
						<t-td>每日次数</t-td>
						<t-td>每次数量</t-td>
					</t-tr>
					<t-tr bgcolor="#f5f5f5" v-for="(item4,i4) in commodityList.dosage.split(';')" :key="i4">
						<t-td v-for="(item5,i5) in item4.split(',')" :key="i5">{{item5}}</t-td>
					</t-tr>
				</t-table>
			</view>
			<!-- 用法用量end -->
			<view class="list">
				[注意事项] :<rich-text class="listContent" :nodes="commodityList.precaution"></rich-text>
			</view>
			<view class="list">
				[不良反应] :<rich-text class="listContent" :nodes="commodityList.sideeffect"></rich-text>
			</view>
			<view class="list">
				[禁忌] :<rich-text class="listContent" :nodes="commodityList.contraindication"></rich-text>
			</view>
			<view class="list">
				[如何保存] :<rich-text class="listContent" :nodes="commodityList.storage"></rich-text>
			</view>

		</view>
		<!-- 详情图 -->

		<view class="longImg">

			<image class="inner" :src="commodityList.image" @tap="_previewImage(commodityList.image)" mode="widthFix"></image>


		</view> -->
		<!-- <view class="longImg">
			<image class="lookimg" :src="commodityList.image" mode="widthFix"></image>
			</view> -->
	</view>
</template>
<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	import request from '../../js_sdk/request/request.js' //引进requst方法
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	export default {
		components: {
			uParse,
			tTable,
			tTh,
			tTr,
			tTd
		},
		data() {
			return {
				commodityImg: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/e869703c-65c9-4a30-a3cf-1914bbcb04c4.jpg',
				likeState: false,
				likeImg: require('../static/images/商品详情/已收藏.png'),
				unlikeImg: require('../static/images/商品详情/未收藏.png'),
				longImg: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/954216bb-22a8-48cd-931e-6343cf6f1237.jpg',
				commodityList: {
					title: "小林制药眼药水小林制药眼药水小林制药眼药水小林制药眼药水小林制药眼药水小",
					price: "111",
					country: "日本",
					num: "60粒",
					mess: "香港木子药品网muzimed.com",
					list1: '111111111111111111111111',
					list2: '222222222',
					list3: '333333333333333333333333333333333333333333333333333333333333',
				},
				logState: false,
				scale: 1,
				type: '',
				content: '',

			};
		},
		methods: {
			_previewImage(image) {
				var imgArr = [];
				imgArr.push(image);
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0]
				});
			},
			choice: function(e) {
				if(!uni.getStorageSync('xtoken')) {
					uni.showToast({
						title: '请您先登录',
						icon: 'none'
					})
					return
				}
				uni.getStorage({
					key: 'xtoken',
					success: function(res) {
						console.log(res.data, "点击收藏得到的xtoken");
					}
				});
				console.log(e, "药品id", typeof(e))
				if (this.likeState == false) {
					// 此时未收藏,点击添加到收藏
					// start
					request({
						// url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/drug/no_check/get_drug_detail",
						url: "/wx-yuyihui/applets/user_interface/add_mycollection",
						method: 'post',
						data: {
							drugId: e
						},
						success: (res) => {
							console.log("添加到收藏", res);
							if (res.data.code == '0' && res.data.msg == '添加成功') {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								})
								this.likeState = !this.likeState;
							} else {
								uni.showToast({
									title: res.data.msg,
									// title: '请您先登录',
									icon: 'none'
								})
							}
							this.back()
						},
						fail: (err) => {
							console.log(err)
						}
					})
					// end
				} else {
					// start
					request({
						url: "/wx-yuyihui/applets/user_interface/delete_mycollection",
						method: 'post',
						data: {
							drugId: e
						},
						success: (res) => {
							console.log("移除收藏", res);
							if (res.data.code == '0') {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								})
								this.likeState = !this.likeState;
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								})
							}
							this.back()
						},
						fail: (err) => {
							console.log(err)
						}
					})
					// end

				}
			},
			back() {
				let pages = getCurrentPages()
				if (pages.length > 1) {
					let beforePage = pages[pages.length - 2]
					if(beforePage.route === 'pages2/myCollection/myCollection') {
						console.log('bbb',beforePage)
						beforePage.search()
					}
				}
			},
			search(a) {
				// start
				console.log('药品搜索');
				uni.getStorage({
					key: 'xtoken',
					success: function(res) {
						console.log(res.data, "得到的xtoken");
					}
				});
				// start 登录了

				request({
					// url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/drug/no_check/get_drug_detail",
					url: "/wx-yuyihui/applets/drug/no_check/get_drug_detail",
					method: 'POST',
					data: {
						id: a
					},
					success: (res) => {
						console.log(a, "返回的药品信息", res);
						// this.contOneList = res.data.data.records;
						// this.length = res.data.data.total;
						this.likeState = res.data.data.collected;
						this.commodityList = res.data.data;
					},
					fail: (err) => {
						console.log(err)
					}
				})
				// end
			}
		},
		onLoad(option) {
			console.log("首页带过来的数据", option, typeof(option.id))
			this.search(option.id);
			var a = Number(option.id)

			request({
				url: "/wx-yuyihui/applets/user_interface/add_history",
				method: 'POST',
				data: {
					drugId: a
				},
				success: (res) => {
					console.log("添加到历史", res);
					if (res.data.code == '0' && res.data.msg == '添加成功') {
						// uni.showToast({
						// 	title: res.data.msg,
						// 	icon: 'none'
						// })
					} else {
						// uni.showToast({
						// 	title: res.data.msg,
						// 	icon: 'none'
						// })
					}
				},
				fail: (err) => {
					console.log(err)
				}

			})
		},
	}
</script>

<style scoped>
	@import url("@/components/u-parse/u-parse.css");

	.commodity {
		width: 686upx;
		min-height: 300upx;
		margin-left: 32upx;
		padding: 32upx 0;
	}

	.topImgBox {
		width: 686upx;
		height: 360upx;
		border-radius: 20upx;
		border: 1px solid #bcbcbc;
		overflow: hidden;
	}

	.topImgBox image {
		height: 360upx;
		margin-left: 170upx;
	}

	.book {
		font-size: 26upx;
		color: #4d4d4d;
		margin-bottom: 20upx;
		font-weight: bold;
	}

	.title {
		font-size: 32upx;
		line-height: 42upx;
		width: 686upx;
		height: 84upx;
		margin: 40upx 0 20upx;
		font-weight: bold;
	}

	.messBox {
		width: 686upx;
		height: 74upx;
		margin-bottom: 40upx;
		font-size: 26upx;
		position: relative;
	}



	.spec {
		color: red;
		font-size: 26upx;
	}

	.big {
		font-size: 32upx;
	}

	.one {
		position: absolute;
		top: 0;
		left: 0;
	}

	.one text {
		margin-right: 20upx;
		font-size: 26upx;
	}

	.two {
		position: absolute;
		left: 0;
		bottom: -10upx;
	}

	.right {
		position: absolute;
		top: 0;
		right: 0;
		width: 74upx;
		height: 74upx;
		text-align: center;
		font-size: 18upx;
	}

	.right .zi{
		display: inline-block;
	}

	.like {
		width: 48upx;
		height: 48upx;
	}

	.list {
		margin-bottom: 20upx;
		font-size: 26upx;
		width: 686upx;

	}

	.list text {
		width: 686upx;
		font-size: 26upx;
		word-break: break-all;
		word-wrap: break-word;
	}

	.div{
		margin-bottom: 20upx;
		font-size: 26upx;
		width: 686upx;
	}

	.div text {
		width: 686upx;
		font-size: 26upx;
		word-break: break-all;
		word-wrap: break-word;
	}

	.listContent {
		font-size: 26upx;
	}

	.longImg {
		width: 686upx;
	}

	.inner {
		width: 686upx;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
	}
</style>
