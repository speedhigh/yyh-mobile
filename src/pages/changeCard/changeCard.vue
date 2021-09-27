<template>
	<view class="changeCard">
		<!-- 权益卡绑定 -->
		<view class="wrap">
			<form @submit="formSubmit" @reset="formReset">
				<view class="inputBox">
					<image class="icon" :src="iconUser" mode=""></image>
					<input class="input" disabled maxlength="11" name="phone" v-model="InputTel" placeholder="请输入您的手机号" />
				</view>

				<view class="inputBox">
					<image class="icon" :src="iconPass" mode=""></image>
					<input class="input" password="true" name="yzm" placeholder="请输入验证码" v-model="InputCaptcha" />
					<view class="send" @click="sendCaptcha" type="default" :style="{backgroundColor:captchaState==true?'#2da5be':'#ddd'}">{{captcha}}</view>
				</view>

				<view class="inputBox">
					<image class="icon" :src="iconUser" mode=""></image>
					<input class="input" maxlength="14" name="card" v-model="InputCard" placeholder="请输入您的权益卡号" />
					<image class="get" @click="scanCode()" src="https://yuyihui-re.oss-cn-beijing.aliyuncs.com/f28ff3cd-dbad-43c1-a683-e7c3a58d1722.png">
					</image>
				</view>
				<view class="inputBox">
					<image class="icon" :src="iconPass" mode=""></image>
					<input class="input" maxlength="11" password="true" v-model="InputPass" name="密码" placeholder="请输入您的权益卡密码" />
				</view>
				<view class="logBox">
					<button class="log" form-type="submit">确认</button>

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
				InputCaptcha: '',
				InputTel: '',
				InputCard: '',
				InputPass: '',
				captcha: '发送验证码',
				captchaState: true,
				timer: '',
				iconUser: require('../../static/images/登录页面/icon1.png'),
				iconPass: require('../../static/images/登录页面/icon2.png'),
				// 防抖节流相关
				sendAxiosState: true,
			}
		},

		onLoad() {
			console.log("开始请求")
			// this.sendCaptcha()
		},
		mounted: function() {
			let that = this;
			console.log(1);
			uni.getStorage({
				key: 'user',
				success: function(res) {
					console.log(res, "得到的user");
					that.InputTel = res.data.phone;
				}
			});

		},
		methods: {
			cardChange(card) {
				this.InputCard = card;
			},
			scanCode() {
				let _this = this
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log(res);
						console.log('条码内容：' + res.result);
						_this.InputCard = res.result;
						wx.nextTick(function() {
							_this.InputCard = res.result
							console.log("data數據", _this.InputCard)

						})
					},

				});
			},

			formSubmit: function(e) {
				// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				// var formdata = e.detail.value
				//定义表单规则
				var rule = [{
						name: "phone",
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
					{
						name: "card",
						checkType: "string",
						checkRule: "14",
						errorMsg: "请输入正确位数的权益卡号"
					},
					{
						name: "密码",
						checkType: "string",
						checkRule: "6",
						errorMsg: "请输入正确位数的权益卡密码"
					}
				];

				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);

				if (checkRes && this.sendAxiosState == true) {
					this.sendAxiosState == false,
						// 请求已经发送暂时停止发送
						// {"phone":"17662731139","verificationCode":"123456","cardno":"89897220220614","cardpw":"346348"}
						request({
							header: {
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							url: '/wx-yuyihui/applets/bind_card',
							method: 'POST',
							data: {
								phone: this.InputTel,
								verificationCode: this.InputCaptcha,
								cardno: this.InputCard,
								cardpw: this.InputPass,
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
										this.sendAxiosState == true;
										uni.reLaunch({
											url: "../me/me?id=1&name=cxy"
										})
									}, 100)
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
					this.sendAxiosState == true;

				}




			},
			formReset: function(e) {
				console.log('清空数据')
			},

			sendCaptcha: function(e) {
				console.log("发送验证码", this.InputTel, this.captchaState)
				let reg = /^1[3-9][0-9]{9}$/;

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
						// url: "http://192.168.1.109:8886/wx-yuyihui/applets/no_check/send_captcha",
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
		position: relative;

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

	.get {
		color: #2da5be;
		text-align: center;
		text-decoration: underline;
		position: absolute;
		font-size: 12upx;
		right: 20upx;
		top: 20upx;
		width: 48upx;
		height: 48upx;
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
		/* background-color: skyblue; */
		line-height: 56upx;
		height: 56upx;
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
