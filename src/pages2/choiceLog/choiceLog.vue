<template>
	<view class="choiceLog">
		<image class="backImg" :src="back" mode=""></image>
		<!-- <button class="one" open-type="getPhoneNumber" @click="one" @getphonenumber="getPhoneNumber" @getuserinfo="appLoginWx">微信授权手机号登录</button> -->
		<!-- <view class="two" @click="two"> 账号密码登录</view>
		<view class="two three" @click="three"> 手机验证码登录</view> -->

		<password class="password" v-show="showId == 1"></password>
		<verify class="verify" v-show="showId == 2"></verify>
		<view class="otherBox">
			<text class="other1" v-show="showId == 1" @click="showId =2 ">短信验证码登录</text>
			<text class="other1" v-show="showId == 2" @click="showId =1 ">账号密码登录</text>
			<text class="other2" @click="goRegister">注册</text>
		</view>
	</view>
</template>

<script>
	var wxLog = require('../../js_sdk/utils/WXBizDataCrypt.js')
	import verify from '../../components/verify/verify.vue'
	import password from '../../components/password/password.vue'
	export default {
		memberObj: {
			name: '初始姓名',
		},
		data() {
			return {
				showId: 1,
				sKey: "",
				name: "选择登陆",
				code: '',
				back: require('../../static/images/登录页面/选择登陆.png')
			};
		},
		onShow() {
			let _this = this
			uni.login({
				provider: "weixin",
				success: function(data) {
					console.log('login的数据', data, data.code);
					_this.code = data.code;

				}
			})
			// end
		},
		methods: {
			one() {
				console.log("微信授权手机号登录")

			},
			two() {
				uni.navigateTo({
					url: '../../pages/nolog/nolog'
				})
			},
			three() {
				uni.navigateTo({
					url: '../../pages2/verifyLog/verifyLog'
				})
			},
			goRegister(){
				uni.navigateTo({
					url: '../../pages2/register/register'
				})
			},
			appLoginWx(e) {
				console.log('用戶信息', e);
			},
			getPhoneNumber(e) {
				// console.log(e)
				// console.log(e.detail.iv)
				// console.log(e.detail.encryptedData)
				// console.log(this)
				let _this = this
				uni.request({
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					// url: 'https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/user_interface/no_check/get_session_key',
					url: 'https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/user_interface/no_check/get_session_key',
					method: 'POST',
					data: {
						js_code: _this.code,
					},
					dataType: 'json',
					success: (res) => {
						// console.log('1',_this);
						console.log(e)
						var encryptedData = e.detail.encryptedData;
						var iv = e.detail.iv;
						var pc = new wxLog('wxa1a4ff9c9a76354d', res.data.data.session_key)

						var data = pc.decryptData(encryptedData, iv)
						console.log('解密后 data: ', data, data.phoneNumber)
						// uni.reLaunch({
						// 	url: `../../pages/me/me?id=32123&name=${data.phoneNumber}`
						// })
						// 2
						uni.request({
							header: {
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/no_check/login",
							method: 'POST',
							data: {
								phone: data.phoneNumber,
								type: 3,
								// 登陆方式（1：密码登录，2：验证码登录; 3微信当前手机号登陆
							},
							dataType: 'json',
							success: (res) => {
								console.log(res, '授权登录返回的信息')

								if (res.data.code == "0") {
									// 成功
									var user = res.data.data.user.phone;
									uni.showToast({
										title: res.data.msg,
									});

									uni.setStorage({
										key: 'xtoken',
										data: res.data.data.xtoken,
										success: function() {
											uni.getStorage({
												key: 'xtoken',
												success: function(res) {
													console.log(res, "得到的xtoken");
												}
											});
										}
									});
									setTimeout(function() {
										uni.reLaunch({
											url: `../../pages/me/me?id=32123&name=${user}`
										})
									}, 600)
								} else {
									uni.showToast({
										// title: '用户名或者密码错误',
										title: res.data.msg,
										icon: "none"
									});
								}
							},
							fail: (err) => {
								console.log(err, "uni错误")
							}
						})
						// 2end
					}
				})



				// setTimeout(function() {
				// 	uni.reLaunch({
				// 		// &name=${user}
				// 		url: `../../pages/me/me?id=32123`
				// 	})
				// }, 600)
			},

		}
	}
</script>

<style scoped>
	/* 后修改的登录选择 */
	.verify {
		position: absolute;
		top: 472upx;
	}

	.password {
		position: absolute;
		top: 472upx;
	}

	.otherBox {
		width: 570upx;
		height: 30upx;
		position: absolute;
		top: 800upx;
		/* background-color: #0000EE; */
		margin-left: 90upx;
	}

	.other1 {
		float: left;
		font-size: 26upx;
		color: #333;
	}

	.other2 {
		float: right;
		font-size: 26upx;
		color: #333;
	}

	/* 后修改的登录选择end */
	.choiceLog {
		width: 750upx;
		height: 100%;
		overflow: hidden;
		position: relative;


	}

	.backImg {
		width: 750upx;
		height: 1200upx;
	}

	.one {
		position: absolute;
		width: 570upx;
		height: 72upx;
		background-color: #2da5be;
		color: #fff;
		top: 812upx;
		left: 90upx;
		border-radius: 36upx;
		text-align: center;
		font-size: 32upx;
		line-height: 72upx;
	}

	.two {
		position: absolute;
		width: 260upx;
		height: 60upx;
		background-color: #fff;
		color: #2da5be;
		top: 1026upx;
		left: 90upx;
		text-align: center;
		border-radius: 30upx;
		border: 1px solid #2da5be;
		font-size: 26upx;
		line-height: 60upx;
	}

	.three {

		left: 400upx;
	}
</style>
