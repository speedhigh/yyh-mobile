<template>
	<view class="changeCard">
		<view class="wrap">
			<form @submit="formSubmit">
				<view class="inputBox">
					<view style="font-size:32upx; width: 200upx">新用户名：</view>
					<input maxlength="11" name="phone" v-model="InputTel" placeholder="请输入新用户名" />
				</view>
				<view class="logBox">
					<button class="log" form-type="submit">确认修改</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import request from '../../js_sdk/request/request.js' // 引进requst方法
	var graceChecker = require("../../js_sdk/graceui-dataChecker/graceChecker.js");
	export default {
		data() {
			return {
				InputCaptcha: '',
				InputTel: '',
				InputNewPhone: '',
				InputPass: '',
				timer: ''
			}
		},
		methods: {
			formSubmit: function(e) {

				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);

				if (checkRes) {
					console.log("表单信息", this.InputTel, this.InputPass, this.InputNewPhone, )
					// var 
					request({
						header: { 'Content-Type': 'application/x-www-form-urlencoded' },
						url: '/wx-yuyihui/applets/update_phone',
						method: 'POST',
						data: {
							phoneOld: this.InputTel,
							password: this.InputPass,
							phoneNew: this.InputNewPhone,
							verificationCode: this.InputCaptcha,
						},
						dataType: 'json',
						success: (res) => {
							// var result = JSON.parse(res.data);
							console.log(res, "更改电话返回的信息")
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
								console.log(res, "更改电话失败返回的信息")
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
    display: flex;
    align-items: center;
		margin-left: 32upx;
		padding-top: 20upx;
		margin-bottom: 10upx;
		box-sizing: border-box;
		border-bottom: 1upx solid #333333;
		position: relative;
		font-size: 28upx;
	}

	.input {
		float: left;
		line-height: 88upx;
	}

	.logBox {
    margin-top: 70upx;
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
