<template>
	<view class="me">
		<view class="wrap">
			<!-- 未登录页面 -->
			<view class="page1" @click="messageYou" v-show="logState == 0">
				<view class="topNo">
					<view class="first">
						<img @click.stop="login" class="head" :src="headImg2" mode="">
						<view @click.stop="login" hover-stop-propagation="true" class="logName" url="../nolog/nolog">登录</view>
					</view>
				</view>
			</view>

			<!-- 登录后 -->
			<view class="page2" v-show="logState == 1">
				<view class="top">
					<view style="position: relative">
						<img :src="typeImaRole" style="width:100%; height:100%">
						<view class="info">
							<p>用户{{ user }}</p>
							<p style="font-size: 22upx; margin-top:10upx">{{ dueDate }}到期</p>
						</view>
						<view class="cardno">
							NO.{{ cardno.slice(0,4) + ' ' + cardno.slice(4,8) + ' ' + cardno.slice(8,12) + ' ' + cardno.slice(12)}}
						</view>
					</view>
					<!--
					<view class="first">
						<image wx:if='headImg' class="head" :src="headImg" mode=""></image>
						<image class="type" :src="typeImaRole" mode=""></image>
						<view class="nameid">
							用户id__{{user}}
						</view>
						<view class="cardno">
							卡号 : {{cardno}}
						</view>
					</view>
					-->
				</view>
				<navigator url="../changeInfo/changeInfo" style="margin-top: -75upx; position: relative" @click="fixInfo">
					<img :src="dividersImg" alt="" style="width:100%">
				</navigator >
				<view class="second">
					<navigator :url="item.url" class="items" v-for="(item,i) in items" :key='i'>
						<image class="itemsImg" :src="item.img" mode=""></image>
						{{ item.name }}
					</navigator>
				</view>
				<!-- 广告banner区 -->
				<!-- 其他功能区 -->
				<view class="other" v-for="(item,i) in otherList" :key='i'>
					<navigator :url="item.url" class="iconBox">
						<image class="icon" :src="item.img" mode=""></image>
						<view class="name">{{ item.name }}</view>
						<!-- <view class="name">
							{{item.name}}
						</view> -->
						<image class="right" :src="item.img2" mode=""></image>
					</navigator>


				</view>

				<view c class="loging">
					<view class="logout" @click="logout">
						退出登录
					</view>

				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import request from '../../js_sdk/request/request.js' //引进requst方法
	export default {
		data() {
			return {
				yonghuwx: [],
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
				user: "",
				dueDate:"",
				// headImg: require("../../static/images/我的/头像.png"),
				headImg2: require("../../static/images/我的/头像未登录.png"),
				typeImg: require("../../static/images/我的/游客登录.png"),
				// typeImg1: require("../../static/images/我的/悦享会员.png"),
				// typeImg2: require("../../static/images/我的/尊享会员.png"),
				yueCardImg: require("../../static/images/我的/悦享.png"),
				zunCardImg: require("../../static/images/我的/尊享.png"),
				dividersImg: require("../../static/images/我的/上面的盖子.png"),
				typeImaRole: undefined,
				cardno: "未绑定",
				logState: 0,
				items: [{
						name: '会员办理',
						img: require("../../static/images/我的/会员权益icon.png"),
						img2: require("../../static/images/我的/展开 登录.png"),
						id: 1,
						url: '../memberCard/memberCard',
					},
					{
						name: '会员权益',
						img: require("../../static/images/我的/会员办理icon.png"),
						id: 2,
						url: '../memberBenefit/memberBenefit'
					},
					{
						name: '我的收藏',
						img: require("../../static/images/我的/我的收藏icon.png"),
						id: 3,
						url: '../../pages2/myCollection/myCollection'
					},
					{
						name: '浏览历史',
						img: require("../../static/images/我的/订单查询icon.png"),
						id: 4,
						url: '../../pages2/watchHistory/watchHistory'
					},
					
				],
				// 其他功能区
				otherList: [{
						name: '药品购买流程',
						img: require("../../static/images/我的/药品.png"),
						img2: require("../../static/images/我的/展开 登录.png"),
						id: 0,
						url: '../../pages2/buyCommodity/buyCommodity',
					},
					{
						name: '权益卡绑定',
						img: require("../../static/images/我的/权益卡改绑icon.png"),
						img2: require("../../static/images/我的/展开 登录.png"),
						id: 1,
						url: '../changeCard/changeCard',
					},
					{
						name: '手机号改绑',
						img: require("../../static/images/我的/手机号改绑icon.png"),
						img2: require("../../static/images/我的/展开 登录.png"),
						id: 2,
						url: '../changePhone/changePhone',
					},
					{
						name: '密码修改',
						img: require("../../static/images/我的/密码修改icon.png"),
						img2: require("../../static/images/我的/展开 登录.png"),
						id: 3,
						url: '../changePassword/changePassword',
					},
					// {
					// 	name: '浏览历史',
					// 	img: require("../../static/images/我的/浏览历史icon.png"),
					// 	img2: require("../../static/images/我的/展开 登录.png"),
					// 	id: 4,
					// 	url: '../changePassword/changePassword',
					// },

					{
						name: '关于我们',
						img: require("../../static/images/我的/关于我们icon.png"),
						img2: require("../../static/images/我的/展开 登录.png"),
						id: 6,
						url: '../aboutMe/aboutMe',
					},
				],
			};
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
							console.log(infoRes)
							that.yonghuwx = infoRes.userInfo
						}
					});
				}
			});

			// start
			request({
				url: "/wx-yuyihui/applets/user_interface/get_current_user",
				method: 'get',
				success: (res) => {
					console.log(res)
					// console.log(res, " 用户信息", res.data.data.roleStr, res.data.data.cardno);
					if (res.data.code == '0') {
						this.logState = 1;
						uni.setStorage({
							key: 'user',
							data: res.data.data,
						})
						// res.data.data包含了所有的用户信息
						this.user = res.data.data.phone;
						this.dueDate = res.data.data.dueDate
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
							this.typeImaRole = this.yueCardImg
							// this.typeImg = ""
							// this.typeImg2 = ""
						} else {
							this.typeImaRole = this.zunCardImg
							// this.typeImg = ""
							// this.typeImg1 = ""
						}
					}
				},
				fail: (err) => {
					console.log('-----------------------',err)
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
		onLoad(option) {
			let that = this;
			uni.login({
				provider: "weixin",
				success: function(data) {
					// 获取用户信息				
					uni.getUserInfo({
						provider: 'weixin',
						success: function(infoRes) {
							that.yonghuwx = infoRes.userInfo
						}
					});
				}
			});
			if (option.id == '32123') {
				console.log('登录了')
				this.logState = 1;
				this.user = option.name;

			};
			// start
			request({
				url: "/wx-yuyihui/applets/user_interface/get_current_user",
				method: 'get',

				success: (res) => {
					console.log(res, " 用户信息", res.data.data.roleStr, res.data.data.cardno);
					if (res.data.code == '0') {
						this.logState = 1;
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
			messageYou: function() {
				uni.showToast({
					title: "请您先登录",
					icon: "none"
				})
			},
			login: function(e) {
				// e.stopPropagation()
				uni.navigateTo({
					url: '../../pages2/choiceLog/choiceLog'
				})
			},
			logout: function(e) {
				this.logState = 0;
				console.log("退出登录", this.logState)
				uni.showToast({
					title: "退出成功"
				})
				uni.setStorage({
					key: 'xtoken',
					data: '1',
				});
			},
		},

	}
</script>

<style scoped>
	.me {
		position: relative;
		padding-bottom: 30upx;
	}

	.wrap {
		width: 750upx;
		min-height: 20upx;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto 20upx;
		padding-bottom: 170upx;
	}

	.top {
		padding: 40upx 32upx 0 32upx;
		width: 100%;
		height: 400upx;
		box-sizing: border-box;
		background: #2da5be;
	}

	.first {
		width: 686upx;
		height: 100upx;
		margin: 40upx auto 60upx;
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
		left: 470upx;
		top: 20upx;
		width: 100upx;
		height: 32upx;
	}
	.logName{
		position: absolute;
		top: 20upx;
		left: 120upx;
		font-size: 50upx;
		color: #fff;
	}
	.name {
		position: absolute;
		top: 0upx;
		left: 120upx;
		font-size: 32upx;
		color: #fff;
	}
	.info {
		position: absolute;
		top: 40upx;
		left: 156upx;
		font-size: 30upx;
		color: #FBD6A0;
	}
	.cardno {
		position: absolute;
		top: 180upx;
		left: 32upx;
		font-size: 30upx;
		color: #FBD6A0;
	}

	.second {
		height: 160upx;
		background-color: #fff;
		display: flex;
		justify-content: space-around;
		padding: 26upx 16upx;
		box-sizing: border-box;
	}

	.items {
		width: 98upx;
		height: 108upx;
		margin-left: 35upx;
		margin-right: 35upx;
		font-size: 24upx;
	}

	.itemsImg {
		width: 74upx;
		height: 74upx;
		margin-left: 12upx;
	}

	.topNo {
		padding-top: 1upx;
		width: 750upx;
		height: 1000upx;
		background: url('../../static/images/我的/操作栏底2.png') no-repeat 0 0;
		background-size: 750upx 912upx;
	}

	.first {
		width: 686upx;
		height: 600upx;
		margin: 20upx auto 40upx;
		position: relative;
	}

	.head {
		width: 100upx;
		height: 100upx;
		margin-right: 20upx;
	}

	.type {
		width: 100upx;
		height: 32upx;
		margin-bottom: 6upx;
	}

	.nameid {
		position: absolute;
		top: 12upx;
		left: 120upx;
		font-size: 32upx;
		color: #fff;
	}

	.other {
		width: 686upx;
		height: 100upx;
		margin-left: 32upx;
		margin-top: 10upx;
		border-bottom: 1upx solid #f5f5f5;

	}

	.iconBox {
		width: 686upx;
		height: 88upx;
		position: relative;
	}

	.name {
		width: 386upx;
		height: 88upx;
		margin-left: -30upx;
		line-height: 88upx;
		font-size: 28upx;
		color: #4c4c4c;
		display: inline-block;
		position: absolute;
		top: 0;
		z-index: 99;
	}

	.right {
		width: 14upx;
		height: 24upx;
		position: absolute;
		right: 20upx;
		bottom: 32upx;
	}

	.icon {
		width: 48upx;
		height: 48upx;
		margin-left: 20upx;
		margin-top: 20upx;
	}

	.loging {
		width: 360upx;
		height: 72upx;
		background-color: #2da5be;
		border-radius: 36upx;
		font-size: 32upx;
		color: #fff;
		line-height: 72upx;
		text-align: center;
		margin-left: 215upx;
		margin-top: 70upx;
	}
</style>
