<template>
	<view class="changeCard">
		<view class="wrap">
			<form @submit="formSubmit" @reset="formReset">
				<view class="inputBox">
					<image class="icon" :src="iconUser" mode=""></image>
					<input class="input" maxlength="11" name="newPhone" v-model="InputNewPhone" placeholder="请输入您的手机号" />
				</view>
				<view class="inputBox">
					<image class="icon" :src="iconUser" mode=""></image>
					<input class="input" password="true" name="yzm" placeholder="请输入验证码" v-model="InputCaptcha" />
					<view class="send" @click="sendCaptcha" type="default" :style="{backgroundColor:captchaState==true?'#2da5be':'#ddd'}">
						{{captcha}}</view>
				</view>


				<view class="logBox">
					<button class="log" form-type="submit">确认登录</button>

					<!-- <button type="default" form-type="reset">Reset</button> -->
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import request from '../../js_sdk/request/request.js' //引进requst方法
	var graceChecker = require("../../js_sdk/graceui-dataChecker/graceChecker.js");
	export default {
		data() {
			return {
				InputCaptcha: '',
				InputTel: '',
				InputNewPhone: '',
				InputPass: '',
				captcha: '发送验证码',
				captchaState: true,
				timer: '',
				iconUser: require('../../static/images/登录页面/icon1.png'),
				iconPass: require('../../static/images/登录页面/icon2.png'),
			}
		},

		onLoad() {
			console.log("开始请求")
			// this.getAxios();
			// this.sendCaptcha()
		},
		methods: {
			formSubmit: function(e) {
				// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				// var formdata = e.detail.value
				//定义表单规则
				var rule = [{
						name: "newPhone",
						checkType: "string",
						checkRule: "11",
						errorMsg: "请输入正确的手机号"
					},
					{
						name: "yzm",
						checkType: "notnull",
						checkRule: "4",
						errorMsg: "验证码不能为空"
					},


				];

				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);

				if (checkRes) {
					console.log(this.InputNewPhone, this.InputCaptcha)
					// start

					uni.request({
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/no_check/login",
						method: 'POST',
						data: {
							phone: this.InputNewPhone,
							verificationCode: this.InputCaptcha,
							type: 2,
							// 登陆方式（1：密码登录，2：验证码登录;微信当前手机号登陆
						},
						dataType: 'json',
						success: (res) => {
							console.log(res, '登录返回的信息')

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
					// end
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}




			},
			formReset: function(e) {
				console.log('清空数据')
			},

			sendCaptcha: function(e) {
				console.log("发送验证码", this.InputNewPhone, this.captchaState)
				let reg = /^1[3-9][0-9]{9}$/;
				// 小程序中禁用不好使
				if (this.captchaState == false) {
					return;
				}
				if (reg.test(this.InputNewPhone) && this.captchaState == true) {
					var i = 10;
					this.timer = setInterval(() => {
						i = i - 1;
						this.captcha = i + "s";
						if (i == 0) {
							this.captcha = "点击重新发送";
							i = 10;
							this.captchaState = true;
							clearInterval(this.timer);
						}
					}, 1000);
					this.captchaState = false;
					this.captcha = "10s";
					console.log("成功");
					// start
					uni.request({
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						url: 'https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/no_check/send_captcha',
						method: 'POST',
						data: {
							phone: this.InputNewPhone,
						},
						dataType: 'json',
						success: (res) => {

							if (res.data.code == "0") {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
								console.log(res, "发送短信成功")
								return;
							} else {

								// 失败
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						}
					})
					// end

				} else {
					uni.showToast({
						title: "请输入正确的手机号",
						icon: "none"
					})
					return;
				}
			}
		}
	}
</script>

<style scoped>
	.changeCard {
		padding-top: 30upx;
	}

	.wrap {
		width: 750upx;
		min-height: 120upx;
		// background-color: aqua;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto 20upx;

	}

	.inputBox {
		width: 686upx;
		height: 88upx;
		margin-left: 32upx;
		padding-top: 20upx;
		margin-bottom: 10upx;
		box-sizing: border-box;
		border-bottom: 1upx solid #333333;
		position: relative;


	}

	.send {
		position: absolute;
		right: 0;
		top: 14upx;
		width: 180upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
		font-size: 26upx;
		color: #fff;
		background-color: #2da5be;
		border-radius: 30upx;
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
		line-height: 88upx;
	}

	// 登录
	.logBox {}

	.log {
		width: 360upx;
		height: 72upx;
		background-color: #2da5be;
		border-radius: 36upx;
		font-size: 32upx;
		color: #fff;
		line-height: 72upx;
		text-align: center;
		margin-left: 215upx;
		margin-top: 20upx;

	}
</style>
