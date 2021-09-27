<template>
	<view class="changeCard">
		<view class="wrap">
			<form @submit="formSubmit" @reset="formReset">
				<view class="inputBox">
					<image class="icon" :src="iconUser" mode=""></image>
					<input class="input" maxlength="11" name="phone" v-model="InputTel" placeholder="请输入您要修改的账户" />
				</view>
				<view class="inputBox">
					<image class="icon" :src="iconPass" mode=""></image>
					<input class="input" maxlength="20" password="true" v-model="InputPass" name="pass" placeholder="请输入您的验证码" />
					<view class="send" @click="sendCaptcha" type="default" :style="{backgroundColor:captchaState==true?'#2da5be':'#ddd'}">
						{{captcha}}</view>
				</view>
				<view class="inputBox">
					<image class="icon" :src="iconPass" mode=""></image>
					<input class="input" maxlength="20" password="true" name="newPass1" v-model="newPass1" placeholder="请输入您的新密码" />
				</view>
				<view class="inputBox">
					<image class="icon" :src="iconPass" mode=""></image>
					<input class="input" maxlength="20" password="true" name="newPass2" v-model="newPass2" placeholder="请再次输入您的新密码" />
				</view>
				<!-- 	<view class="inputBox">
					<image class="icon" :src="iconUser" mode=""></image>
					<input class="input" password="true" name="yzm" placeholder="请输入验证码" v-model="InputCaptcha" />
					<view class="send" @click="sendCaptcha" type="default" :style="{backgroundColor:captchaState==true?'#0095ff':'#ddd'}">
						{{captcha}}</view>
				</view> -->
				<view class="logBox">
					<button class="log" form-type="submit">确认修改</button>
					<!-- <button type="default" form-type="reset">Reset</button> -->
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../js_sdk/graceui-dataChecker/graceChecker.js");
	import request from '../../js_sdk/request/request.js' //引进requst方法
	export default {
		data() {
			return {
				InputTel: '',
				InputPass: '',
				newPass1: '',
				newPass2: '',
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
				var rule = [
					{
						name: "phone",
						checkType: "string",
						checkRule: "11",
						errorMsg: "请输入正确的手机号"
					},
					{
						name: "pass",
						errorMsg: "请输入验证码"
					}, 
					{
						name: "newPass1",
						checkType: "string",
						checkRule: "6,16",
						errorMsg: "请输入合理的新密码"
					}, 
					{
						name: "newPass2",
						checkType: "string",
						checkRule: "6,16",
						errorMsg: "请输入合理的新密码"
					},
				];
				if (this.newPass1 != this.newPass2) {
					uni.showToast({
						title: '倆次密码不一致',
					});
					return
				}
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);

				if (checkRes) {
					request({
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						url: '/wx-yuyihui/applets/update_password',
						method: 'POST',
						data: {
							phone: this.InputTel,
							verificationCode: this.InputPass,
							passwordNew: this.newPass2,
						},
						dataType: 'json',
						success: (res) => {
							// var result = JSON.parse(res.data);
							console.log(res, "更改成功")
							if (res.data.code == '0') {
								// 成功
								uni.showToast({
									title: res.data.msg,
								});
								setTimeout(function() {
									uni.reLaunch({
										url: "../me/me?id=1&name=cxy"
									})
								}, 600)
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								});
								return
							}
						}
					});
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
				console.log("发送验证码", this.InputTel)
				let reg = /^1[3-9][0-9]{9}$/;
				// 小程序中禁用不好使
				if (this.captchaState == false) {
					return;
				}
				if (reg.test(this.InputTel) && this.captchaState == true) {
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
						url: 'https://www.yuyihui.com.cn:8886//wx-yuyihui/applets/no_check/send_captcha',
						// url: "http://192.168.1.109:8886//wx-yuyihui/applets/no_check/send_captcha",
						method: 'POST',
						data: {
							phone: this.InputTel,
						},
						dataType: 'json',
						success: (res) => {
							if (res.data.code == "C_1") {
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
