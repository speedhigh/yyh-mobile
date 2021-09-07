<template>
	<view>
		<!-- 空盒子用来防止消息过少时 拉起键盘会遮盖消息 -->
		<view :animation="anData" style="height:0;">

		</view>
		<!-- 消息体 -->
		<scroll-view scroll-with-animation scroll-y="true" @touchmove="hideKey" style="width: 750upx;" :style="{'height':srcollHeight}"
		 :scroll-top="go">
			<!-- 用来获取消息体高度 -->
			<view id="okk" scroll-with-animation>
				<!-- 消息 -->
				<view class="flex-column-start" v-for="(x,i) in msgList" :key="i">
					<!-- 用户消息 头像可选加入-->
					<view v-if="x.my" class="flex justify-end padding-right one-show  align-start  padding-top">
						<!-- 	<image v-if="!x.my" class="chat-img" src="../../static/..." mode="aspectFill" ></image> -->
						<view class="flex justify-end" style="width: 400upx;">
							<view class="margin-left padding-chat bg-cyan" style="border-radius: 35upx;">
								<text style="word-break: break-all;">{{x.msg}}</text>
							</view>
						</view>
						<!-- <image class="chat-img margin-left" src="../../static/..." mode="aspectFill" ></image> -->
					</view>
					<!-- 机器人消息 -->
					<view v-if="!x.my" class="flex-row-start margin-left margin-top one-show">
						<view class="chat-img flex-row-center">
							<image style="height: 75upx;width: 75upx;" :src="robot" mode="aspectFit"></image>
						</view>
						<view class="flex" style="width: 500upx;">
							<view class="margin-left padding-chat flex-column-start" style="border-radius: 35upx;background-color: #f9f9f9;">
								<text style="word-break: break-all;">{{x.msg}}</text>
								<!-- 消息模板 =>初次问候 -->
								<view class="flex-column-start" v-if="x.type==1" style="color: #2fa39b;">
									<text style="color: #838383;font-size: 22upx;margin-top: 15upx;">你可以这样问我:</text>
									<text @click="answer(index)" style="margin-top: 30upx;" v-for="(item,index) in x.questionList" :key="index">{{item}}</text>
									<!-- 	<view class="flex-row-start  padding-top-sm">
									<text class="my-neirong-sm">没有你要的答案?</text>
									<text class="padding-left" style="color: #007AFF;">换一批</text>
								</view> -->
								</view>
								<!-- 消息模板 =>多个答案 -->
								<view class="flex-column-start" v-if="x.type==2" style="color: #2fa39b;">
									<text style="color: #838383;font-size: 22upx;margin-top: 15upx;">猜你想问:</text>
									<!-- 连接服务器应该用item.id -->
									<text @click="answer(index)" style="margin-top: 30upx;" v-for="(item,index) in x.questionList" :key="index">{{item}}</text>
								</view>
								<!-- 消息模板 => 无法回答-->
								<view class="flex-column-start" v-if="x.type==0">
									<text class="padding-top-sm" style="color: #2fa39b;">提交意见与反馈</text>
									<text style="color: #838383;font-size: 22upx;margin-top: 15upx;">下面是一些常见问题,您可以点击对应的文字快速获取答案:</text>
									<text @click="answer(index)" style="margin-top: 30upx;color: #2fa39b;" v-for="(item,index) in x.questionList"
									 :key="index">{{item}}</text>
									<!-- 	<view class="flex-row-start  padding-top-sm">
									<text class="my-neirong-sm">没有你要的答案?</text>
									<text class="padding-left" style="color: #1396c5;">换一批</text>
								</view> -->
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- loading是显示 -->
				<view v-show="msgLoad" class="flex-row-start margin-left margin-top">
					<view class="chat-img flex-row-center">
						<image style="height: 75upx;width: 75upx;" :src="robot" mode="aspectFit"></image>
					</view>
					<view class="flex" style="width: 500upx;">
						<view class="margin-left padding-chat flex-column-start" style="border-radius: 35upx;background-color: #f9f9f9;">
							<view class="cuIcon-loading turn-load" style="font-size: 35upx;color: #3e9982;">

							</view>
						</view>
					</view>
				</view>
				<!-- 防止消息底部被遮 -->
				<view style="height: 120upx;">

				</view>
			</view>

		</scroll-view>

		<!-- 底部导航栏 -->
		<view class="flex-column-center" style="position: fixed;bottom: -180px;" :animation="animationData">
			<view class="bottom-dh-char flex-row-around" style="font-size: 55upx;">
				<!-- vue无法使用软键盘"发送" -->
				<input v-model="msg" class="dh-input" type="text" style="background-color: #f0f0f0;" @confirm="sendMsg"
				 confirm-type="search" placeholder-class="my-neirong-sm" placeholder="用一句简短的话描述您的问题" />
				<view @click="sendMsg" class="cu-tag bg-cyan round">
					发送
				</view>
				<text @click="ckAdd" class="cuIcon-roundaddfill text-brown"></text>
			</view>
			<!-- 附加栏(自定义) -->
			<view class="box-normal flex-row-around flex-wrap">
				<!-- 	<view class="tb-text">
					<view class="cuIcon-form"></view>
					<text >功能1</text>
				</view>
				<view class="tb-text">
					<view class="cuIcon-form"></view>
					<text>功能2</text>
				</view> -->

			</view>
		</view>




	</view>
</template>

<script>
	// upx和px的比率
	var l
	// 可用窗口高度
	var wh
	// 顶部空盒子的高度
	var mgUpHeight
	export default {
		onLoad() {
			// 如果需要缓存消息缓存msgList即可
			// 监听键盘拉起
			// 因为无法控制键盘拉起的速度,所以这里尽量以慢速处理
			uni.onKeyboardHeightChange(res => {
				const query = uni.createSelectorQuery()
				query.select('#okk').boundingClientRect(data => {
					// 若消息体没有超过2倍的键盘则向下移动差值,防止遮住消息体
					var up = res.height * 2 - data.height - l * 110
					console.log(up)
					if (up > 0) {
						// 动态改变空盒子高度
						this.msgMove(up, 300)
						// 记录改变的值,若不收回键盘且发送了消息用来防止消息过多被遮盖
						mgUpHeight = up
					}
					// 收回
					if (res.height == 0) {
						this.msgMove(0, 0)
					}
				}).exec();
			})
			var query = uni.getSystemInfoSync()

			l = query.screenWidth / 750
			wh = query.windowHeight
			this.srcollHeight = query.windowHeight + "px"
		},
		data() {
			return {
				msgLoad: false,
				anData: {},
				animationData: {},
				showTow: false,
				robot: require('../../static/images/客服.png'),
				// 消息体,定义机器人初次的消息(或者自定义出现时机)
				// my->谁发的消息 msg->消息文本 type->客服消息模板类型 questionList->快速获取问题答案的问题列表
				msgList: [{
					my: false,
					msg: "你好我是客服机器人小鱼,请问有什么问题可以帮助您?",
					type: 1,
					questionList: ["如何激活权益卡", "我想了解业务流程", "手机号如何更换"]
				}],
				msg: "",
				go: 0,
				srcollHeight: 0
			}
		},
		methods: {
			// 切换输入法时移动输入框(按照官方的上推页面的原理应该会自动适应不同的键盘高度-->官方bug)
			goPag(kh) {
				this.upTowmn(0, 250)
				if (this.keyHeight != 0) {
					if (kh - this.keyHeight > 0) {
						this.upTowmn(this.keyHeight - kh, 250)
					}

				}
			},
			// 移动顶部的空盒子
			msgMove(x, t) {
				var animation = uni.createAnimation({
					duration: t,
					timingFunction: 'linear',
				})

				this.animation = animation

				animation.height(x).step()

				this.anData = animation.export()
			},
			// 保持消息体可见
			msgGo() {
				const query = uni.createSelectorQuery()
				// 延时100ms保证是最新的高度
				setTimeout(() => {
					// 获取消息体高度
					query.select('#okk').boundingClientRect(data => {
						// 如果超过scorll高度就滚动scorll
						if (data.height - wh > 0) {
							this.go = data.height - wh

						}
						// 保证键盘第一次拉起时消息体能保持可见
						var moveY = wh - data.height
						// 超出页面则缩回空盒子
						if (moveY - mgUpHeight < 0) {
							// 小于0则视为0
							if (moveY < 0) {
								this.msgMove(0, 200)
							} else {
								// 否则缩回盒子对应的高度
								this.msgMove(moveY, 200)
							}
						}

					}).exec();
				}, 100)
			},
			// 回答问题的业务逻辑
			answer(id) {
				// 这里应该传入问题的id,模拟就用index代替了

				console.log(id)
				if (id == 0) {
					// loading
					this.msgLoad = true
					// 这里连接服务器获取答案
					// 下面模拟请求
					setTimeout(() => {
						// 取消loading
						this.msgLoad = false
						this.msgList.push({
							my: false,
							msg: "小鱼暂时不知道哦",
							type: -1
						})
						this.msgGo()
					}, 2000)
				} else if (id == 1) {
					// loading
					this.msgLoad = true
					// 这里连接服务器获取答案
					// 下面模拟请求
					setTimeout(() => {
						// 取消loading
						this.msgLoad = false
						this.msgList.push({
							my: false,
							msg: "业务流程...",
							type: -1
						})
						this.msgGo()
					}, 2000)
				}else{
					this.msgLoad = true
					// 这里连接服务器获取答案
					// 下面模拟请求
					setTimeout(() => {
						// 取消loading
						this.msgLoad = false
						this.msgList.push({
							my: false,
							msg: "emmm...",
							type: -1
						})
						this.msgGo()
					}, 2000)
					}

			},
			sendMsg() {
				// 我发送的消息
				// 消息为空不做任何操作
				if (this.msg == "") {
					return 0;
				}
				// 显示消息 msg消息文本,my鉴别是谁发的消息(不能用俩个消息数组循环,否则消息不会穿插)
				this.msgList.push({
					"msg": this.msg,
					"my": true
				})
				// 保证消息可见
				this.msgGo()
				// 回答问题
				this.msgKf(this.msg)
				// 清除消息
				this.msg = ""
			},
			msgKf(x) {
				// loading
				this.msgLoad = true;
				// x就是输入框输入的
				console.log(x, "发送信息返回的")
				// 这里连接服务器获取答案
				// 发送消息返回的请求
				// 下面模拟请求
				setTimeout(() => {
					// 取消loading
					this.msgLoad = false
					// this.msgList.push({my:false,msg:"娜娜还在学习中,没能明白您的问题,您点击下方提交反馈与问题,我们会尽快人工处理(无法回答模板)",type:0,questionList:["如何注销用户","我想了解业务流程","手机号如何更换"]})

					if (x == "你好") {
						this.msgList.push({
							my: false,
							msg: "你也好呀",
							type: -1
						})
					} else {
						this.msgList.push({
							my: false,
							msg: "不知道你在説啥",
							type: -1
						})
					}
					// this.msgList.push({my:false,msg:"根据您的问题,已为您匹配了下列问题(多个答案模板)",type:2,questionList:["如何注销用户","我想了解业务流程","手机号如何更换"]})
					this.msgGo()
				}, 2000)
			},
			// 不建议输入框聚焦时操作此动画
			ckAdd() {
				if (!this.showTow) {
					this.upTowmn(-180, 350)
				} else {
					this.upTowmn(0, 200)
				}
				this.showTow = !this.showTow
			},
			hideKey() {
				uni.hideKeyboard()
			},
			// 拉起/收回附加栏
			upTowmn(x, t) {

				var animation = uni.createAnimation({
					duration: t,
					timingFunction: 'ease',
				})

				this.animation = animation

				animation.translateY(x).step()

				this.animationData = animation.export()
			}
		}
	}
</script>

<style>
	@import "../../js_sdk/colorui/main.css";
	@import "../../js_sdk/colorui/icon.css";
	@import "../../js_sdk/css/index-app.css";

	.bottom-dh-char {
		background-color: #f9f9f9;
		width: 750upx;
		height: 110upx;
	}

	.center-box {
		width: 720upx;
		padding-left: 25upx;
	}

	.hui-box {
		width: 750upx;
		height: 100%;

	}

	.dh-input {
		width: 500upx;
		height: 65upx;
		border-radius: 30upx;
		padding-left: 15upx;
		background-color: #FFFFFF;
		font-size: 33upx;
	}

	.box-normal {
		width: 750upx;
		height: 180px;
		background-color: #FFFFFF;
	}

	.tb-text view {
		font-size: 55upx;
	}

	.tb-text text {
		font-size: 25upx;
		color: #737373;
	}

	.chat-img {
		border-radius: 50%;
		width: 100upx;
		height: 100upx;
		background-color: #f7f7f7;
	}

	.padding-chat {
		padding: 17upx 20upx;
	}

	.tb-nv {
		width: 50upx;
		height: 50upx;
	}
</style>
