<template>
	<view class="all">
		<!--  
		<view class="zx">
			<image v-show="type==1" :class="type==1?'zximg active':'zximg'" @click="type=1" src="../../static/images/我的/new/尊享版触发.png"
			 mode=""></image>
			<image v-show="type==2" :class="type==1?'zximg active':'zximg'" @click="type=1" src="../../static/images/我的/new/尊享版未触发.png"
			 mode=""></image>
		</view>
		<view class="yx">
			<image v-show="type==2" :class="type==2?'zximg active':'zximg'" @click="type=2" src="../../static/images/我的/new/悦享版触发.png"
			 mode=""></image>
			<image v-show="type==1" :class="type==2?'zximg active':'zximg'" @click="type=2" src="../../static/images/我的/new/悦享版未触发.png"
			 mode=""></image>
		</view>
		-->
		<!-- 	<view class="">
			<text>{{type == 1? '尊享':'悦享'}} </text>
		</view> -->
		<view class="address">
			填写收货地址
		</view>
		<view class="addressContent">
			<view class="a">
				<text class="aTxt">收货人</text>
				<input v-model="name" class="aInput" type="text" value="" />
			</view>
			<view class="a">
				<text class="aTxt">联系电话</text>
				<input v-model="phone" class="aInput" type="text" value="" />
			</view>
			<view class="a">
				<text class="aTxt">选择地区</text>
				<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
					<text class='choiceContent'>{{regionName}}</text>
				</pick-regions>
				<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
					<image class="choice" src="../../static/images/我的/new/right.png" mode=""></image>
				</pick-regions>
			</view>
			<view class="a a1 ">
				<text class="aTxt">详细地址</text>
				<textarea v-model="address" type="" class="aInput area" type="text" value="" />
				</view>
		</view>
	
		<view class="card">
			<view style="font-size: 32upx;">是否办理实体卡</view>
			<view style="font-size: 16upx; margin-left:20upx">(需12元工本费)</view>
		</view>
		<view class="cardContent" @click="cardType = !cardType">
			<view style="font-size: 28upx;">办理实体卡</view>
			<image class="cardPick" v-show="cardType" src="../../static/images/我的/new/触发.png"></image>
			<image class="cardPick" v-show="!cardType"  src="../../static/images/我的/new/未触发.png"></image>
		</view>

		<view class="address">
			选择支付方式
		</view>
		<view class="addressContent2">
			<view class="a2" @click="payType =1">
				<image src="../../static/images/我的/new/微信.png" mode=""></image>
				<text class="aTxt a2Txt">微信支付</text>
				<image class="pick" v-show="payType==1" src="../../static/images/我的/new/触发.png" mode=""></image>
				<image class="pick" v-show="payType==0"  src="../../static/images/我的/new/未触发.png" mode=""></image>
			</view>
		<view class="a2 aspect" @click="payType =0">
			<image src="../../static/images/我的/new/支付宝.png" mode=""></image>
			<text class="aTxt a2Txt">支付宝支付</text>
			<image class="pick" v-show="payType==0"  src="../../static/images/我的/new/触发.png" mode=""></image>
			<image class="pick" v-show="payType==1"  src="../../static/images/我的/new/未触发.png" mode=""></image>
		</view>
		</view>
		<button class="confirm" @click="confirm()">
			确认
		</button>	
	</view>
</template>

<script>
	import pickRegions from '../../components/pick-regions/pick-regions.vue'
	import request from '../../js_sdk/request/request.js' //引进requst方法
	export default {
		components: {
			pickRegions,
		},
		data() {
			return {
				// 权益卡种类 1 尊享 2悦享
				name:"",
				phone:"",
				address:"",
				orderId:"",
				type: '',
				// 1 微信  0支付宝
				payType:'1',
				cardType:false,
				region: [],
				defaultRegion: ['广东省', '广州市', '番禺区'],
				defaultRegionCode: '440113'
			}
		},
		onLoad(option){
			console.log('权益卡办理', option);
			this.type = option.id || localStorage.getItem("type") ;
		},
		onShow(option) {
		console.log('权益卡办理', option,this.orderId);
		// this.type = option.id || localStorage.getItem("type") ;
		// 	this.name = localStorage.getItem("name");
		// 	this.phone =localStorage.getItem("phone");
		// 	this.address = 	localStorage.getItem("address");
		// 	this.orderId =	localStorage.getItem("orderId");
		
			
		},
		onReady() {
			// console.log("ready",localStorage.getItem('orderId'))
			if(sessionStorage.getItem('orderId')){
				wx.showModal({
				  title: '点击支付后的弹窗',
				  content: '您是否完成支付？',
				  success: function (res) {
				    if (res.confirm) {  
				    	console.log('点击确认回调')
						 	request({
						 	// 提交订单
						 	url: "/wx-yuyihui/applets/pay/query_order_status",
						 	method: 'POST',
						 	data: {
								// 没有this
						 		outTradeNo: sessionStorage.getItem('orderId'),	
						 	},
						 	success: (res) => {
						 		console.log("支付状态成功:", res,res.data.msg)
								uni.showToast({
									title:res.data.msg,
									icon:"none"
								})
						 		if(res.data.code == '0'){
						 			console.log("支付了")
						 			uni.showToast({
						 				title:"支付成功",
						 				icon:"none"
						 			})
									sessionStorage.removeItem("orderId")
						 			uni.navigateTo({
						 				url:'../memberOver/memberOver'
						 			})
						 		}
						 		if(res.data.code == '1'){
						 			uni.showToast({
						 				title:"您好,没有支付哦",
						 				icon:"none"
						 			})
									sessionStorage.removeItem("orderId")
						 		}
						 	
						 	},
						 	fail: (err) => {
						 		console.log("支付状态失败:",err)
						 		uni.showToast({
						 			title:"支付失败",
						 			icon:none
						 		})
								sessionStorage.removeItem("orderId")
						 	}
						 })
				        } else {   
				          console.log('点击取消回调')
						this.orderId = "";
						sessionStorage.removeItem("orderId")
				        }
				      }
				    })
				}
			
		},
		onUnload() {
			// localStorage.setItem("type","")
			// localStorage.setItem("name","")
			// localStorage.setItem("phone","")
			// localStorage.setItem("address","")
		},
		computed: {
			regionName() {
				// 转为字符串
				return this.region.map(item => item.name).join(' ')
			}
		},
		methods: {
			// 获取选择的地区
			handleGetRegion(region) {
				this.region = region
				console.log("地址",this.region)
			},
			// urlencode方法
			str2ASCII(val) {
				return ("0" + val.charCodeAt(0).toString(16)).slice(-2);
			},
			 UrlEncode(str) {
			      var res = "";
			      var strSpec = "!\"#$%&'()*+,/:;<=>?[]^`{|}~%";
			      var text = "";
			
			      for (var i = 0; i < str.length; i++) {
			        var chr = str.charAt(i);
			        var c = this.str2ASCII(chr);
			        text += chr + ":" + c + "n";
			        if (parseInt("0x" + c) > 0x7f) {
			          res += "%" + c.slice(0, 2) + "%" + c.slice(-2);
			        } else {
			          if (chr == " ") res += "+";
			          else if (strSpec.indexOf(chr) != -1) res += "%" + c.toString(16);
			          else res += chr;
			        }
			      }
			      console.log(res, "res");
			      return res;
			    },
			
				// urlencode方法结束
			confirm() {
				// 支付宝支付没开通
				if(this.payType == 0) {
					uni.showToast({ title:"支付宝支付暂未开通", icon:'none' })
					return
				}
				var price;
				var detail;
				if(this.cardType ){ price = '212' }else{ price = '200' }
				if(this.name=="" || this.phone==""|| this.address==""||this.region==""||this.address ==""){
					uni.showToast({
						title:"请填写完整信息",
						icon:"none"
					})
					return;
				}
				detail = this.region[0].name + this.region[1].name + this.region[2].name + this.address
				console.log("信息",price,this.name,this.phone,this.address,this.region,detail)
				
				request({
					// 提交订单
					url: "/wx-yuyihui/applets/pay/submit_order",
					method: 'POST',
					data: {
						totalAmount:price,
						subject:'微信支付',
						// 0 支付宝 1 微信
						paymethod:parseInt(this.payType),
						name: this.name,
						phone: this.phone,
						detail:detail,	
					},
					success: (res) => {
						console.log('---------------',res)
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
						// 成功储存在local中 ,防止safari等浏览器返回刷新的问题
						localStorage.setItem("type",this.type)
						localStorage.setItem("name",this.name)
						localStorage.setItem("phone",this.phone)
						localStorage.setItem("address",this.address)
						console.log("支付测试成功:", res);
						// this.orderId = res.data.data.outTradeNo
						sessionStorage.setItem("orderId",this.orderId)
						// var web = `http://mobile.yuyihui.com.cn/#/pages/memberHandle/memberHandle?id=${this.type}&name=${this.name}&phone=${this.phone}&address=${this.address}`
						// console.log(this.name,this.UrlEncode(web))
						// var aim;
						// // escape()，encodeURI()，以及encodeURIComponent()
						// aim = res.data.data.mweb_url+"&redirect_url="+this.UrlEncode(web)
						// window.location.href = aim
						// window.location.href = res.data.data.mweb_url
						wx.showModal({
							title: '点击支付后的弹窗',
							content: '您是否完成支付？',
							success: function (res) {
								if (res.confirm) {
									request({
									// 提交订单
									url: "/wx-yuyihui/applets/pay/query_order_status",
									method: 'POST',
									data: {
										// 没有this
										outTradeNo: sessionStorage.getItem('orderId'),	
									},
								 	success: (res) => {
								 		console.log("支付状态成功:", res)	
										// uni.showToast({
										// 	title:res.data.code,
										// 	icon:"none"
										// })
								 		if(res.data.code == '0'){
								 			console.log("支付了")
								 	
								 			uni.showToast({
								 				title:"支付成功",
								 				icon:"none"
								 			})
											sessionStorage.removeItem("orderId")
								 			uni.navigateTo({
								 				url:'../memberOver/memberOver'
								 			})
								 		}
								 		if(res.data.code == '1'){
								 			uni.showToast({
								 				title:"您好,没有支付哦",
								 				icon:"none"
								 			})
											sessionStorage.removeItem("orderId")
								 		}
								 	},
								 	fail: (err) => {
								 		console.log("支付状态失败:",err)
								 		uni.showToast({
								 			title:"支付失败",
								 			icon:none
								 		})
										sessionStorage.removeItem("orderId")
								 	}
								 })
						        } else {   
						          console.log('点击取消回调')
								this.orderId = "";
								sessionStorage.removeItem("orderId")
						        }
						      }
						    })
					},
					fail: (err) => {
						console.log("支付失败:",err)
						uni.showToast({
							title:"支付失败",
							icon:none
						})
					}
				})
				
			},
			// orderState(a){
				
			// 	request({
			// 		// 提交订单
			// 		url: "/wx-yuyihui/applets/pay/query_order_status",
			// 		method: 'POST',
			// 		data: {
			// 			outTradeNo: this.orderId,	
			// 		},
			// 		success: (res) => {
			// 			console.log("支付状态成功:", res,res.data.code)
			// 			if(res.data.code == '1'){
			// 				console.log("未支付")
						
			// 			}
			// 			window.location.href = res.data.data.mweb_url
			// 			if(res.data.code == '0'){
			// 				console.log("支付了")
			// 				uni.navigateTo({
			// 					url:'../memberOver/memberOver'
			// 				})
			// 			}
			// 		},
			// 		fail: (err) => {
			// 			console.log("支付状态失败:",err)
			// 		}
			// 	})
			// },
			yes(){
				
			},
			no(){
				
			}
		}

	}
</script>

<style scoped>
	.orderState{
		width: 500upx;
		height: 300upx;
		background-color: skyblue;
		position: fixed;
		top: 200upx;
		left: 100upx;
		z-index: 999;
	}
	.all {
		width: 750upx;
		height: 100%;
		padding: 1upx 30upx;
		box-sizing: border-box;
		
	}

	.zx {
		width: 326upx;
		height: 180upx;
		margin-top: 40upx;
		margin-right: 34upx;
		display: inline-block;
		border-radius: 10upx;
		box-shadow: 2upx 2upx 2upx #f7f7f7, 2upx -2upx 2upx #f7f7f7, -2upx 2upx 2upx #f7f7f7, -2upx -2upx 2upx #f7f7f7;
	}

	.zximg {
		width: 326upx;
		height: 180upx;
	}

	.active {
		border-radius: 10upx;
		box-shadow: 2upx 2upx 2upx #9ee1ef, 2upx -2upx 2upx #9ee1ef, -2upx 2upx 2upx #9ee1ef, -2upx -2upx 2upx #9ee1ef;
	}

	.yx {
		width: 326upx;
		height: 180upx;
		border-radius: 10upx;
		display: inline-block;
		box-shadow: 2upx 2upx 2upx #f7f7f7, 2upx -2upx 2upx #f7f7f7, -2upx 2upx 2upx #f7f7f7, -2upx -2upx 2upx #f7f7f7;
	}

	/* 地址 */
	.address {
		font-size: 32upx;
		color: #333;
		margin-top: 40upx;
		margin-bottom: 30upx;
	}

	.addressContent {
		width: 686upx;
		height: 430upx;
		box-sizing: border-box;
		padding: 0 20upx;
		border-radius: 10upx;
		box-shadow: 2upx 2upx 2upx #f7f7f7, 2upx -2upx 2upx #f7f7f7, -2upx 2upx 2upx #f7f7f7, -2upx -2upx 2upx #f7f7f7;
	}
	.a{
		width: 646upx;
		height: 100upx;
		box-sizing: border-box;
		border-bottom: 1px solid #E6E6E6;
		position: relative;
	}
	.choice{
		position: absolute;
		right: 0;
		z-index: 999;
		top: 37upx;
		width: 14upx;
		height: 24upx;
		

	}
	.choice h2{
		font-size: 32upx;
		color: #333;
	}
	.a1{
		border-bottom:none;
	}
	.aTxt{
		font-size: 28upx;
		color: #333333;
		line-height: 100upx;
	}
	.aInput{
		position: absolute;
		top: 30upx;
		left: 188upx;
		font-size: 28upx;
		color: #333333;
	}
	.area{
			line-height: 30upx;
			width: 450upx;
			height: 60upx;
			overflow: hidden;
	}
	.choiceContent{
		width: 380upx;
		position: absolute;
		top: 30upx;
		left: 188upx;
		font-size: 28upx;
		color: #333333;
		display: block;
		line-height: 30upx;
		height: 60upx;
		overflow: hidden;
		font-weight: none;
	}
	/* 实体卡 */
	.card {
		margin-top: 40upx;
		margin-bottom: 30upx;
		display: flex;
		align-items: flex-end;
	}
	.cardContent {
		width: 686upx;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30upx;
		border-radius: 10upx;
		box-shadow: 2upx 2upx 2upx #f7f7f7, 2upx -2upx 2upx #f7f7f7, -2upx 2upx 2upx #f7f7f7, -2upx -2upx 2upx #f7f7f7;
	}
	.cardPick {
		width: 16upx;
		height: 16upx;
	}
	/* 支付方式 */
	.addressContent2 {
		width: 686upx;
		height: 100%;
		overflow: hidden;
		box-sizing: border-box;
		padding: 0upx 20upx;
		border-radius: 10upx;
		box-shadow: 2upx 2upx 2upx #f7f7f7, 2upx -2upx 2upx #f7f7f7, -2upx 2upx 2upx #f7f7f7, -2upx -2upx 2upx #f7f7f7;
	}
	.a2 image{
		width: 48upx;
		height: 48upx;
		position: absolute;
		top: 26upx;
	}
	.a2{
		width: 646upx;
		height: 100upx;
		box-sizing: border-box;
		border-bottom: 1px solid #E6E6E6;
		position: relative;
	}
	.a2Txt{
		margin-left: 60upx;
	}
	.aspect{
		border: none;
	}
	.a2 .pick{
		width: 16upx;
		height: 16upx;
		position: absolute;
		right: 20upx;
		top: 42upx;
	}
	.confirm{
		width: 360upx;
		height: 72upx;
		font-size: 32upx;
		color: #fff;
		line-height: 72upx;
		text-align: center;
		border-radius: 36upx;
		margin: 60upx auto;
		background-color: #2da5be;
		}
</style>
