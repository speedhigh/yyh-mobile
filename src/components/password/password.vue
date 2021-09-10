<template>
	<view class="nolog">
		<view class="wrap">
			<form @submit="formSubmit" @reset="formReset">
				<view class="inputBox">
					<image class="icon" :src="iconUser" mode=""></image>
					<input class="input" maxlength="11" v-model="inputTel" name="账号" placeholder="请输入您的手机号" />
				</view>
				<view class="inputBox">
					<image class="icon" :src="iconPass" mode=""></image>
					<input class="input" password="true" v-model="inputPass" name="密码" placeholder="请输入密码" />
				</view>
				<view class="logBox">
					<button class="log" form-type="submit">登录</button>

					<!-- <button type="default" form-type="reset">Reset</button> -->
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../js_sdk/graceui-dataChecker/graceChecker.js");
	// var Utils = require("../../js_sdk/utils/utils.js");
	export default {
		data() {
			return {
				iconUser: require('../../static/images/登录页面/icon1.png'),
				iconPass: require('../../static/images/登录页面/icon2.png'),
				inputTel: '',
				inputPass: '',
			}
		},

		onLoad() {
			console.log("开始请求")
		},
		methods: {

			formSubmit: function(e) {
				// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				// var formdata = e.detail.value
				//定义表单规则
				var rule = [{
						name: "账号",
						checkType: "phoneno",
						checkRule: "11",
						//  /^1[3|4|5|7|8][0-9]{9}$/
						errorMsg: "请输入正确的手机号"
					},
					{
						name: "密码",
						checkType: "string",
						checkRule: "6,18",
						errorMsg: "请输入6-18位的密码"
					}
				];

				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);

				if (checkRes) {
					console.log(this.inputPass, this.inputTel)
					// start

					uni.request({
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						// url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/no_check/login",
						url: "http://192.168.1.109:8886/wx-yuyihui/applets/no_check/login",
						method: 'POST',
						data: {
							phone: this.inputTel,
							password: this.inputPass,
							type: 1,
							verificationCode: '',
							// 登陆方式（1：密码登录，2：验证码登录;微信当前手机号登陆
						},
						dataType: 'json',
						success: (res) => {

							if (res.data.code == "0") {
								// 成功
								console.log(res, '登录返回的信息', res.data.data.xtoken)
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
					// end
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
				// md5加密没弄好,先这样
				// uni.showToast({
				// 	title: '登录成功',
				// });

				// setTimeout(function() {
				// 	uni.reLaunch({
				// 		url: "../me/me?id=1&name=cxy"
				// 	})
				// }, 600)

			},
			formReset: function(e) {
				console.log('清空数据')
			}
		}
	}
</script>

<style scoped>
	.nolog {
		padding-top: 30upx;
	}

	.wrap {
		width: 750upx;
		min-height: 120upx;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto 20upx;
	}

	.inputBox {
		width: 570upx;
		height: 88upx;
		margin-left: 90upx;
		padding-top: 20upx;
		margin-bottom: 10upx;
		box-sizing: border-box;
		border-bottom: 1upx solid #E6E6E6;
		font-size: 28upx;

	}

	.icon {
		width: 48upx;
		height: 48upx;
		float: left;
		margin-right: 10upx;
		margin-left: 10upx;
	}

	.input {
		float: left;
		height: 48upx;
		width: 460upx;
		line-height: 48upx;
	}

	.log {
		width: 570upx;
		height: 72upx;
		font-size: 32upx;
		background-color: #2da5be;
		border-radius: 36upx;

		color: #fff;
		line-height: 72upx;
		text-align: center;
		margin-top: 20upx;
	}
</style>
