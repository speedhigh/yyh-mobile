<template>
	<view>
		<view class="top">
			<view class="first">
				<image wx:if='headImg' class="head" :src="headImg" mode=""></image>
				<image class="type" :src="typeImaRole" mode=""></image>
				<!-- <image wx:show='typeImg1' class="type" :src="typeImg1" mode=""></image>
				<image wx:show='typeImg2' class="type" :src="typeImg2" mode=""></image> -->
				<view class="nameid">
					用户id__{{user}}
				</view>
				<view class="cardno">
					卡号 : {{cardno}}
				</view>
			</view>
		</view>
		<view class="choose">
			<text :class="[show ==1 ? 'c1 cActive':'c1']" @click="show =1">
				<image style="width: 22upx;height: 22upx;margin-right: 10upx;" src="../../static/images/我的/new/荐.png" mode=""></image>余益惠尊享卡
			</text>
			<text :class="[show ==2 ? 'c1 c2 cActive':'c1 c2']" @click="show =2">余益惠悦享卡</text>
		</view>

		<view class="center">
			<!-- 尊享 -->
			<view class="sort" v-show="show ==1">
				<image style="width: 243upx;height: 159upx;" src="../../static/images/我的/new/图层2.png" mode=""></image>
				<view style="width: 406upx;height: 160upx;margin-left: 30upx;float: right;display: inline-block;" class="right">
					<view class="r1">

						余益惠权益卡 — 尊享卡
					</view>
					<view class="r2">
						尊享多种权益，购买海外药品和赴日医检的必备选择
					</view>
					<view class="r3">
						¥1180
					</view>
					<view class="handle" url="index" @click="goZx()">
						马上办理
					</view>
				</view>
			</view>

			<view class="content" v-show="show ==1">
				<image class="zun" src="../../static/images/我的/new/尊享优势栏.png" mode=""></image>
			</view>
			<!-- 悦享 -->
			<view class="sort" v-show="show ==2">
				<image style="width: 243upx;height: 159upx;" src="../../static/images/我的/new/图层2.png" mode=""></image>
				<view style="width: 406upx;height: 160upx;margin-left: 30upx;float: right;display: inline-block;" class="right">
					<view class="r1">
						余益惠权益卡 — 悦享卡
					</view>
					<view class="r2">
						悦享多种权益，购买海外药品和赴日医检的必备选择
					</view>
					<view class="r3">
						¥680
					</view>
					<view class="handle" url="index" @click="goYx()">
						马上办理
					</view>
				</view>
			</view>
			<view class="content" v-show="show ==2">
				<image class="yue" src="../../static/images/我的/new/悦享优势栏.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../js_sdk/request/request.js' //引进requst方法
	export default {
		data() {
			return {
				show: 1,
				user: "",
				headImg: require("../../static/images/我的/头像.png"),
				headImg2: require("../../static/images/我的/头像未登录.png"),
				typeImg: require("../../static/images/我的/游客登录.png"),
				typeImg1: require("../../static/images/我的/悦享会员.png"),
				typeImg2: require("../../static/images/我的/尊享会员.png"),
				typeImaRole: undefined,
			}
		},
		onShow(option) {
			console.log('onshow')
			let that = this;
			uni.login({
				provider: "weixin",
				success: function(data) {
					// 获取用户信息				
					uni.getUserInfo({
						provider: 'weixin',
						success: function(infoRes) {
							that.yonghuwx = infoRes.userInfo
							console.log('6666666666', that.yonghuwx)
						}
					});
				}
			});

			// start
			request({
				url: "/wx-yuyihui/applets/user_interface/get_current_user",
				method: 'get',

				success: (res) => {
					console.log(res, " 用户信息", res.data.data.roleStr, res.data.data.cardno);
					if (res.data.code == '0') {
						this.logState = 1;
						uni.setStorage({
							key: 'user',
							data: res.data.data,
						})
						// res.data.data包含了所有的用户信息
						this.user = res.data.data.phone;
						if (res.data.data.cardno == '0') {
							this.cardno = "未绑定权益卡"
						} else {
							this.cardno = res.data.data.cardno
						}
						if (res.data.data.roleStr == '普通用户') {
							this.typeImaRole = this.typeImg
							// this.typeImg1 = ""
							// this.typeImg2 = ""
						} else if (res.data.data.roleStr == '悦享会员') {
							this.typeImaRole = this.typeImg1
							// this.typeImg = ""
							// this.typeImg2 = ""
						} else {
							this.typeImaRole = this.typeImg2
							// this.typeImg = ""
							// this.typeImg1 = ""
						}
					}
				},
				fail: (err) => {
					console.log(err)
				}
			})
			// end

			// `1
			uni.getUserInfo({
				success: function(res) {
					console.log(res);

				}
			})

			// 1end
		},
		methods: {
			goZx() {
				uni.navigateTo({
					url:`../memberHandle/memberHandle?id=1`
				})
				// uni.showToast({
				// 	// title: '用户名或者密码错误',
				// 	title: '手机端暂不支持支付,请先去PC端',
				// 	icon: "none"
				// });
			},
			goYx() {
				uni.navigateTo({
					url:`../memberHandle/memberHandle?id=2`
				})
			
			}
		}
	}
</script>

<style scoped>
	.top {
		padding: 1px 0 0;
		width: 750upx;
		height: 220upx;
		background-color: #2da5be;
	}

	.first {
		margin-left: 32upx;
		margin-top: 40upx;
		position: relative;
	}

	.head {
		width: 100upx;
		height: 100upx;
		position: absolute;
		top: 10upx;
		margin-right: 20upx;
	}

	.type {
		position: absolute;
		left: 480upx;
		top: 20upx;
		width: 100upx;
		height: 32upx;
	}

	.logName {
		position: absolute;
		top: 20upx;
		left: 152upx;
		font-size: 50upx;
		color: #fff;
	}

	.name {
		position: absolute;
		top: 0upx;
		left: 152upx;
		font-size: 32upx;
		color: #fff;
	}

	.nameid {
		position: absolute;
		top: 12upx;
		left: 120upx;
		font-size: 32upx;
		color: #fff;
	}

	.cardno {
		position: absolute;
		top: 66upx;
		left: 120upx;
		font-size: 24upx;
		color: #fff;
	}

	/* 选项卡 */
	.choose {
		width: 750upx;
		border-bottom: 1px #e6e6e6 solid;
	}

	.c1 {
		width: 240upx;
		height: 88upx;
		display: inline-block;
		text-align: center;
		box-sizing: border-box;
		line-height: 88upx;

		font-size: 28upx;
		color: #333;
		margin-left: 76upx;
	}

	.c2 {
		margin-left: 118upx;
	}

	.cActive {
		border-bottom: 1px #2da5be solid;
	}

	/* 选择不同的卡 */
	.sort {
		width: 686upx;
		height: 200upx;
		margin-left: 32upx;
		margin-top: 40upx;
		/* clear: both; */
	}

	.r1 {
		font-size: 28upx;
		color: #333;
		margin-bottom: 8upx;
	}

	.r2 {
		font-size: 24upx;
		color: #666;
		margin-bottom: 8upx;
	}

	.r3 {
		font-size: 36upx;
		color: red;
	}

	.right {
		position: relative;
	}

	.handle {
		position: absolute;
		width: 160upx;
		height: 42upx;
		right: 0;
		bottom: 0;
		background-color: #2DA5BE;
		font-size: 24upx;
		line-height: 42upx;
		text-align: center;
		color: #fff;
		border-radius: 20upx;
	}

	/* 下方詳情 */
	.center {
		width: 686upx;
		height: 100%;
		padding-bottom: 2upx;
	}

	.zun {
		width: 750upx;
		height: 1626upx;
	}

	.yue {
		width: 750upx;
		height: 1410upx;
	}
</style>
