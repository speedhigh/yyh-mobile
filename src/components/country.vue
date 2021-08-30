<template>
	<!-- name="country" -->
	<view id="countryBox">
		<!-- 咨询客服 -->
		
		<image class="zhiCustomBtn" @click="contact" src="../static/images/index/咨询客服.png" mode=""></image>
		<view class="fiveCountry" v-for="(item,i) in countryList" :key="i">
			<view @click="more(i)" class="topBox">
				<image class="countryImg" :src="item.img" mode=""></image>
			</view>
			<scroll-view :class="['bottomBox',`item${i+1}`]" scroll-x="true">
				<view @click="go(item2.id)" class="commodity" v-for="(item2,i2) in item.list" :key="i2">
					<view class="imgBox">
						<image class="imgcontent" :src="item2.thumbnail" mode=""></image>
					</view>
					<view class="contentBox">
						<view class="one">{{item2.namechs}}</view>
						<text class="two">{{item2.symptom}}</text>
						<text class="price">¥{{item2.price}}</text>
					</view>
				</view>
				<view @click="more(i)" class="commodity">
					<!-- 这个是第六个查看更多 -->
					<view class="imgBox">
						<image class="imgcontent" src="../static/images/我的/会员权益icon.png" mode=""></image>
					</view>
					<view class="contentBox">
						<text class="one">1
							<</text> <text class="two">3
						</text>
						<text class="price">444</text>
					</view>
					<view class="other">
						<view class="content">
							查看更多内容
						</view>
						<image class="more" src="../static/images/index/更多.png" mode=""></image>
					</view>
				</view>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	import request from '../js_sdk/request/request.js' //引进requst方法
	export default {
		name: "country",
		props: {
			src: {
				type: String,
				default: "国家"
			},
			color: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				countryList: [{
						id: 1,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/a9318aef-bcfa-47a1-9203-1447d398d76b.png',
						title: "111",
						list: [],
					}, {
						id: 2,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/1663b398-47d9-4940-8848-8e9396e03d1c.png',
						title: "2222",
						list: [],
					}, {
						id: 3,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/ac66dbca-3059-4adc-a0aa-1d74c17e1b5a.png',
						title: "3333",
						list: [],
					}, {
						id: 4,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/0f848f01-3436-4108-aaaf-5dc0643ca3db.png',
						title: "4444",
						list: [],
					},
					{
						id: 5,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/c6b01030-d6b3-4cf9-a4aa-14c09888aaaf.png',
						title: "5555",
						list: [],
					},
				],
				// 每个国家
				list: [{
						id: 1,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/a9318aef-bcfa-47a1-9203-1447d398d76b.png',
						title: "111"
					}, {
						id: 2,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/1663b398-47d9-4940-8848-8e9396e03d1c.png',
						title: "2222"
					}, {
						id: 3,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/ac66dbca-3059-4adc-a0aa-1d74c17e1b5a.png',
						title: "3333"
					}, {
						id: 4,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/0f848f01-3436-4108-aaaf-5dc0643ca3db.png',
						title: "4444"
					},
					{
						id: 5,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/c6b01030-d6b3-4cf9-a4aa-14c09888aaaf.png',
						title: "5555"
					},
				],
			};
		},
		methods: {
			// 智齿客服
			zhichi() {
					// x.src = "http://mobile.yuyihui.com.cn/#/.sobot.com/chat/frame/v2/entrance.js?sysnum=3542411be2184c8cb6b48d66ca1b2730";
					// window.location.href = "http://mobile.yuyihui.com.cn.sobot.com/chat/frame/v2/entrance.js?sysnum=3542411be2184c8cb6b48d66ca1b2730";
			  (function (w, d, e, x) {
			    w[e] = function () {
			      w.cbk = w.cbk || [];
			      w.cbk.push(arguments);
			    }
			    x = d.createElement('script');
			    x.async = true;
			    x.id = 'zhichiScript';
			    x.src = 'https://mobile.yuyihui.sobot.com/chat/frame/v2/entrance.js?sysnum=0a9c8b7967564fd7b97e2c1a693e7747';
			    d.body.appendChild(x);
			  })(window, document, 'zc');
			  zc('config',{
				  cutom:true,
			     // channelid: 1,
			  })
			},
			contact(){
				this.zhichi()
			},
			// 跳转到详情
			go(a) {
				console.log(a)
				this.commodityId = a;
				uni.navigateTo({
					url: `../../pages2/details/details?id=${this.commodityId}`,
				})
			},
			more(i) {
				console.log(i);
				let country = '日本';
				switch (i) {
					case 0:
						country = '日本'
						break;
					case 1:
						country = '韩国'
						break;
					case 2:
						country = '泰国'
						break;
					case 3:
						country = '新加坡'
						break;
					case 4:
						country = '印度'
						break;
				}
				uni.navigateTo({
					url: `../../pages2/searchDetail/searchDetail?country=${country}&priNav=&secNav=&searchContent=`,
				})
			}
			// scroll(){
			// 	console.log('滚动了')
			// }
		},
		mounted() {
			request({
				url: "/wx-yuyihui/applets/home_page/nocheck/get_drug_and_country",
				method: 'get',
				success: (res) => {
					console.log("五个国家", res.data.data);
					this.countryList[0].list = res.data.data.日本;
					this.countryList[1].list = res.data.data.韩国;
					this.countryList[2].list = res.data.data.泰国;
					this.countryList[3].list = res.data.data.新加坡;
					this.countryList[4].list = res.data.data.印度;
					console.log(this.countryList)
				},
				fail: (err) => {
					console.log(err)
				}
			})
		}
	}
</script>

<style scoped>
	#countryBox {
		width: 686upx;
		height: 100%;
	}

	.zhiCustomBtn {
		position: fixed;
		right: 32upx;
		bottom: 130upx;
		width: 120upx;
		height: 120upx;
		z-index: 99;
	}

	.fiveCountry {
		width: 686upx;
		height: 540upx;
		border-radius: 10upx;
		margin-top: 28upx;
		margin-bottom: 10upx;
		overflow: hidden;
		box-shadow: 2upx 2upx 2upx #f7f7f7, 2upx -2upx 2upx #f7f7f7, -2upx 2upx 2upx #f7f7f7, -2upx -2upx 2upx #f7f7f7;
	}

	.topBox {
		width: 686upx;
		height: 140upx;


	}

	.topBox .countryImg {
		width: 686upx;
		height: 140upx;
	}


	.bottomBox {
		width: 100%;
		height: 100%;
		// min-height: 400upx;
		// background-color: aqua;
		white-space: nowrap;
		padding: 20upx;
		box-sizing: border-box;
	}

	.commodity {
		display: inline-block;
		width: 196upx;
		height: 360upx;
		margin-right: 11upx;
		background-color: #fff;
		padding: 0 8upx 16upx;
		box-sizing: border-box;
		position: relative;
		border-radius: 8upx;
	}

	.other {
		position: absolute;
		width: 196upx;
		height: 360upx;
		background-color: #fff;
		top: 0;
		left: 0;
		z-index: 9;

	}

	.content {
		display: block;
		margin: 140upx auto 30upx;
		margin-left: 20upx;
		font-size: 26upx;
		color: #666;
	}

	.more {
		display: block;
		margin: 0 auto;
		height: 32upx;
		width: 32upx;
	}

	.imgBox {
		width: 176upx;
		height: 196upx;
		border-bottom: 1px solid #E6E6E6;

	}

	.imgcontent {
		width: 132upx;
		height: 115upx;
		margin-left: 24upx;
		margin-top: 32upx;
	}

	.contentBox {
		position: relative;

	}

	.one {
		font-size: 28upx;
		line-height: 32upx;
		display: block;
		// background-color: skyblue;
		width: 176upx;
		height: 66upx;
		color: #333;
		display: block;
		position: absolute;
		top: 16upx;
		padding: 0 4upx;
		overflow: hidden;
		white-space: normal;
		word-break: break-all;
		word-wrap: break-word;

	}

	.one:after {
		content: '... ';
		position: absolute;
		right: 11upx;
		bottom: 0;
		background: #fff;
		padding-left: 2upx;
	}

	.two {
		font-size: 24upx;
		color: #666;
		display: block;
		position: absolute;
		top: 82upx;
		width: 176upx;
		height: 32upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.price {
		font-size: 34upx;
		color: #ff1919;
		display: block;
		position: absolute;
		top: 120upx;
	}

	.item1 {
		background-color: #ffe5e6;
	}

	.item2 {
		background-color: #b3dff8;
	}

	.item3 {
		background-color: #cafcd6;
	}

	.item4 {
		background-color: #d7cbfd;
	}

	.item5 {
		background-color: #fdf9ca;
	}
</style>
