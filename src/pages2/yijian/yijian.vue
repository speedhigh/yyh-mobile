<template>
	<view class="yijian">
		<view class="top">
			<search class="search"></search>
			<swiper class="swiper" indicator-active-color='#fff' :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			 :duration="duration">
				<swiper-item v-for="(item,index) in bannerList" :key='index'>
					<view class="swiper-item uni-bg-red">
						<image :src="item.img"></image>
					</view>
					<view class="swiper-title">
						<view class="swiper-title-box">{{ item.title }}</view>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 四大优势 -->
		<view class="advantageBox">
			<view class="advantage" v-for="(item,i) in advantageList" :key='i'>
				<view class="first">
					<image :src="item.img" class="firstImg" mode=""></image>
				</view>
				<view class="second">
					{{item.adv}}
				</view>
				<view class="third">
					{{item.describe}}
				</view>
			</view>
		</view>
		<!-- 四大优势end -->

		<!-- 体检套餐 -->
		<view class="packageBox">
			<view class="title">
				体检套餐
			</view>
			<view v-show="detailsState == -1" class="package" v-for="(item,i) in packageList" :key='i' @click="goPackage(i)">
				<image class="packImg" :src="item.img" mode=""></image>
			</view>
			<!-- 显示不同的套餐 -->
			<view class="details" v-show="detailsState == 0 ">
				<p class="main">体检套餐-福系列</p>
				<p class="other" v-for="(item,i) in packageList[0].content" :key='i' @click="goPackageDetail(item.id)">{{item.title}}</p>
				<text class="return" @click="returnPackage">返回上一层</text>
			</view>
			<!-- 1 -->
			<view class="details" v-show="detailsState == 1 ">
				<p class="main">体检套餐-寿系列</p>
				<p class="other" v-for="(item,i) in packageList[1].content" :key='i' @click="goPackageDetail(item.id)">{{item.title}}</p>
				<text class="return" @click="returnPackage">返回上一层</text>
			</view>
			<!-- 2 -->
			<view class="details" v-show="detailsState == 2 ">
				<p class="main">体检套餐-康系列</p>
				<p class="other" v-for="(item,i) in packageList[2].content" :key='i' @click="goPackageDetail(item.id)">{{item.title}}</p>
				<text class="return" @click="returnPackage">返回上一层</text>
			</view>
			<!-- 3-->
			<view class="details" v-show="detailsState == 3 ">
				<p class="main">体检套餐-宁系列</p>
				<p class="other" v-for="(item,i) in packageList[3].content" :key='i' @click="goPackageDetail(item.id)">{{item.title}}</p>
				<text class="return" @click="returnPackage">返回上一层</text>
			</view>
			<!-- 4 -->
			<view class="details" v-show="detailsState == 4">
				<p class="main">体检套餐-尊系列</p>
				<p class="other" v-for="(item,i) in packageList[4].content" :key='i' @click="goPackageDetail(item.id)">{{item.title}}</p>
				<text class="return" @click="returnPackage">返回上一层</text>
			</view>
			<!-- 5 -->
			<view class="details" v-show="detailsState == 5 ">
				<p class="main">体检套餐-享系列</p>
				<p class="other" v-for="(item,i) in packageList[5].content" :key='i' @click="goPackageDetail(item.id)">{{item.title}}</p>
				<text class="return" @click="returnPackage">返回上一层</text>
			</view>
		</view>
		<!-- 体检套餐end -->

		<!-- 专家 -->
		<view class="professorBox">
			<view class="title">
				国外知名专家
			</view>
			<view class="professor" v-for="(item,i) in professorList" :key='i'>
				<view class="left">
					<image class="proImg" :src="item.image" mode=""></image>
				</view>
				<view class="center">
					<view class="one">
						<text class="txt1">{{item.name}}</text>
						<text class="txt2">{{item.position}}</text>
					</view>
					<view class="two">
						<text>{{item.advantage}}</text>
					</view>
				</view>
				<view class="right" @click="goProfessorDetail(item.id)">
					了解TA
				</view>
			</view>
		</view>
		<!-- 专家end -->
		<!-- 医院 -->
		<view class="hospitalBox">
			<view class="title">
				<text>日本合作医院</text>
				<text class="more" @click="goHosptialList()">查看更多 ></text>
			</view>
			<view class="hospital" v-for="(item,i) in hospitalList" :key='i' @click="goHosptialDetail(item.id)">
				<view class="imgBox">
					<image class="hospitalImg" :src="item.hospitalThumbnail" mode=""></image>
				</view>
				<view class="rightBox">
					<text class="one">{{item.hospitalName}}</text>
					<text class="two">{{item.country}}</text>
					<text class="price">{{item.hospitalSynopsis}}</text>
				</view>
			</view>
		</view>
		<!-- 医院end -->

		<view class="footer">
			啊哦~滑到底了呀~
		</view>
	</view>
</template>

<script>
	import request from '../../js_sdk/request/request.js' //引进requst方法
	export default {
		components: {},
		data() {
			return {
				bannerList: [{
						id: 1,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/fb84c5a1-08b9-421f-87a2-f518dcdc0c88.png'
					},
					{
						id: 2,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/4ab50bc2-9511-47fd-b9f1-cdf83d6e20d0.png'
					},
					{
						id: 3,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/93f4aa7a-5c82-4029-9735-78e6a07b97ac.png'
					},
					{
						id: 4,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/b8ed5f30-fcba-4e95-9022-62146044584c.png'
					},
				], //轮播图

				/*图片轮播*/
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				/*图片轮播end*/
				advantageList: [{
					id: 1,
					title: 1,
					adv: '接转诊平台',
					describe: '与多家知名医院签订战略合作协议， 作为接转诊平台缩短预约流程，畅通 医检渠道',
					img: '../../static/images/医检/接转诊平台.png'
				}, {
					id: 2,
					title: 1,
					adv: '身元保证',
					describe: '日本政府认可并颁发的赴日医检担保 资质证明，赴日医检正规机构的资质与信誉证明',
					img: '../../static/images/医检/身元保证.png'
				}, {
					id: 3,
					title: 1,
					adv: '服务专业',
					describe: '多年深耕赴日医检，有丰富经验的专业团队，直接对话专业医院和专家,享受VIP式的服务',
					img: '../../static/images/医检/服务专业.png'
				}, {
					id: 4,
					title: 1,
					adv: '检治结合',
					describe: '对检测出的病情直接给出治疗方案，并可通过接转诊平台提供相关权威医院诊疗预约服务 ',
					img: '../../static/images/医检/检治结合.png'
				}, ],
				packageList: [{
						id: 1,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/ce77632d-f440-4258-9ee5-1a4a18c17812.png',
						content: [{
								id: 11,
								title: '福自健康-消化道防治专项套餐'
							},
							{
								id: 12,
								title: '福自健康-重疾尖端早诊专项套餐'
							},
							{
								id: 13,
								title: '福自健康-甲状腺权威诊察专项套餐'
							},
							{
								id: 14,
								title: '福自健康-头颈血管诊察专项套餐'
							},
							{
								id: 15,
								title: '福自健康-脑部精细诊察专项套餐'
							},
							{
								id: 16,
								title: '福自健康-呵护女士健康专项套餐'
							},
						]
					}, {
						id: 2,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/8720732c-ab65-43ec-a081-8c437014d749.png',
						content: [{
								id: 21,
								title: '寿知人生-身体基本预警筛查套餐'
							},
							{
								id: 22,
								title: '寿知人生-身体优选预警筛查套餐'
							},
							{
								id: 23,
								title: '寿知人生-身体防癌预警筛查套餐'
							},

						]
					},
					{
						id: 3,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/2a432fc7-a240-45fd-9616-676138b1e9f4.png',
						content: [{
								id: 31,
								title: '康能颐享-健康甄选筛查男士套餐'
							}, {
								id: 32,
								title: '康能颐享-健康甄选筛查女士套餐'
							},
							{
								id: 33,
								title: '康能颐享-健康精密筛查男士套餐'
							},
							{
								id: 34,
								title: '康能颐享-健康精密筛查女士套餐'
							},

						]
					},
					{
						id: 4,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/22fd15d2-7b58-400b-b34c-9e65dec76133.png',
						content: [{
								id: 41,
								title: '无恙则宁-高端深度筛查男士套餐'
							},
							{
								id: 42,
								title: '无恙则宁-高端深度筛查女士套餐'
							},
							{
								id: 43,
								title: '无恙则宁-至臻全面筛查男士套餐'
							},
							{
								id: 44,
								title: '无恙则宁-至臻全面筛查女士套餐'
							},

						]
					},
					{
						id: 5,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/6190638e-e2e5-441a-abbd-b166733ad5da.png',
						content: [{
								id: 51,
								title: '尊贵阜康-健康无忧风情文化男士套餐'
							}, {
								id: 52,
								title: '尊贵阜康-健康无忧风情文化女士套餐'
							},


						]
					},
					{
						id: 6,
						img: 'https://yuyihui-re.oss-cn-beijing.aliyuncs.com/293bae7c-1463-4140-b8d9-fbe650c86017.png',
						content: [{
								id: 61,
								title: '尊享生命-品质生活豪华专享男士套餐'
							}, {
								id: 62,
								title: '尊享生命-品质生活豪华专享女士套餐'
							},

						]
					},
				],
				professorList: ['1', '2', '1'],
				hospitalList: ['1', '2', '1', '2'],
				// 套餐详情
				detailsState: -1,
				professorId: 0,
			};
		},

		methods: {
			goPackage(a) {
				this.detailsState = a;
				console.log(a, this.detailsState);
			},
			returnPackage() {
				this.detailsState = -1;
				console.log('返回', this.detailsState)
			},
			goPackageDetail(a) {
				uni.navigateTo({
					url: `../../pages/bodyPackage/bodyPackage?id=${a}`
				})
			},
			goProfessorDetail(a) {
				this.professorId = a;
				console.log(this.professorId)
				uni.navigateTo({
					url: `../../pages/professorDetail/professorDetail?id=${this.professorId}`
				})
			},
			goHosptialDetail(a) {
				uni.navigateTo({
					url: `../../pages/hospitalDetail/hospitalDetail?id=${a}`
				})
			},
			goHosptialList() {
				uni.navigateTo({
					url: "../../pages/hospitalList/hospitalList"
				})
			}
		},
		mounted() {
			request({
				url: "/wx-yuyihui/applets/medical_examination/nocheck/get_expert",
				method: 'get',

				success: (res) => {
					console.log("专家", res);

					this.professorList = res.data.data;
				},
				fail: (err) => {
					console.log(err)
				}
			})
			// 医院
			// request({
			// 	url: "/wx-yuyihui/applets/home_page/nocheck/get_hot_drug",
			// 	method: 'get',
			// 	params:{
			// 		currentPage:'1',
			// 		pageSize:'3',
			// 	},
			// 	success: (res) => {
			// 		console.log("50个热门药品", res);

			// 		console.log(this.countryList)
			// 	},
			// 	fail: (err) => {
			// 		console.log(err)
			// 	}
			// })
			uni.request({
				url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/medical_examination/nocheck/get_hospital",
				// url: 'http://192.168.1.109:8886/wx-yuyihui/applets/medical_examination/nocheck/get_hospital',
				method: 'get',
				data: {
					currentPage: '1',
					pageSize: '4',
				},
				success: (res) => {
					console.log("医院", res);
					this.hospitalList = res.data.data.records;

				},
				fail: (err) => {
					console.log(err)
				}
			})
		}
	};
</script>

<style scoped>
	.top {
		width: 750upx;
		margin-top: 0;
		padding-bottom: 30upx;
		border-radius: 0 0 30upx 30upx;
	}

	.search {
		position: relative;
		z-index: 99;
	}

	.swiper {
		width: 686upx;
		margin: 20upx 0 0upx 0upx;
		height: 280upx;
		border-radius: 20upx;
		overflow: hidden;
	}

	.swiper-item image {
		width: 100%;
		height: 311rpx;
		display: block;
	}

	.yijian {
		padding: 0 30upx 0;
	}

	.advantageBox {
		width: 686upx;
		height: 520upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.advantage {
		display: flex;
		width: 334upx;
		height: 250upx;
		box-shadow: 2upx 2upx 2upx #f7f7f7, 2upx -2upx 2upx #f7f7f7, -2upx 2upx 2upx #f7f7f7, -2upx -2upx 2upx #f7f7f7;
		box-sizing: border-box;
		padding: 20upx 14upx;
		flex-direction: column;
		align-items: center;
		margin-bottom: 30upx;
	}

	.first {
		display: flex;
		width: 80upx;
		height: 80upx;
	}

	.firstImg {
		width: 80upx;
		height: 80upx;
	}

	.second {
		display: flex;
		font-size: 22upx;
		color: #333;
		margin: 20upx 0;
		font-weight: bold;
	}

	.third {
		display: flex;
		font-size: 20upx;
		line-height: 24upx;
		letter-spacing: -1upx;
		color: #666;
		text-align: center;
	}

	.packageBox {
		width: 686upx;
		height: 660upx;
	  box-shadow: 2upx 2upx 2upx #f7f7f7, 2upx -2upx 2upx #f7f7f7, -2upx 2upx 2upx #f7f7f7, -2upx -2upx 2upx #f7f7f7;
		padding: 20upx;
		box-sizing: border-box;
		margin: 40upx 0 30upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		flex-direction: row;
		position: relative;


	}

	.title {
		width: 646upx;
		height: 52upx;
		font-size: 28upx;
		border-bottom: 1px solid #e6e6e6;

	}

	.package {
		width: 310upx;
		height: 160upx;
		border-radius: 10upx;
		background-color: skyblue;
		overflow: hidden;


	}

	.packImg {
		width: 310upx;
		height: 160upx;
	}

	.details {
		width: 686upx;
		height: 580upx;
		position: absolute;
		top: 80upx;
		left: 0upx;
		z-index: 99;
		text-align: center;
		font-size: 28upx;
		color: #666;

	}


	.main {
		font-size: 36upx;
		color: #333;
		margin-top: 40upx;
		margin-bottom: 40upx;
		font-weight: bold;
	}

	.other {
		margin-bottom: 20upx;
	}

	.return {
		width: 150upx;
		height: 42upx;
		box-sizing: border-box;
		font-size: 24upx;
		line-height: 42upx;
		text-align: center;
		color: #fff;
		background-color: #2da5be;
		border-radius: 6upx;
		position: absolute;
		bottom: 30upx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.professorBox {
		width: 686upx;
		height: 538upx;
		box-shadow: 2upx 2upx 2upx #f7f7f7, 2upx -2upx 2upx #f7f7f7, -2upx 2upx 2upx #f7f7f7, -2upx -2upx 2upx #f7f7f7;
		padding: 20upx;
		box-sizing: border-box;
		margin: 30upx 0 30upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		flex-direction: row;
		position: relative;

	}

	.title {
		width: 646upx;
		height: 52upx;
		font-size: 28upx;
		border-bottom: 1px solid #e6e6e6;

	}

	.professor {
		width: 646upx;
		height: 152upx;
		box-sizing: border-box;
		padding: 30upx 0;
		display: flex;
		overflow: hidden;
		border-bottom: 1px solid #e6e6e6;
		flex-direction: row;
		position: relative;
	}

	.left {
		width: 92upx;
		height: 92upx;
		margin-right: 20upx;
		background-color: pink;

	}

	.proImg {
		width: 92upx;
		height: 92upx;
	}

	.center {
		width: 396upx;
		height: 92upx;
		margin-right: 54upx;
		position: relative;
	}

	.center .one {
		margin-bottom: 20upx;
	}

	.txt1 {
		font-size: 28upx;
		color: #333;
		margin-right: 20upx;
	}

	.txt2 {
		font-size: 24upx;
		color: #666;
	}

	.center .two {
		font-size: 24upx;
		color: #666;
	}

	.right {
		width: 100upx;
		height: 44upx;
		background-color: #2da5be;
		margin-top: 22upx;
		text-align: center;
		font-size: 22upx;
		color: #fff;
		border-radius: 6upx;
		line-height: 44upx;
	}

	.hospitalBox {
		width: 686upx;
		height: 964upx;
	  box-shadow: 2upx 2upx 2upx #f7f7f7, 2upx -2upx 2upx #f7f7f7, -2upx 2upx 2upx #f7f7f7, -2upx -2upx 2upx #f7f7f7;
		padding: 20upx;
		box-sizing: border-box;
		margin: 30upx 0 30upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		flex-direction: row;


	}

	.title {
		width: 646upx;
		height: 52upx;
		font-size: 28upx;
		border-bottom: 1px solid #e6e6e6;
		line-height: 52upx;

	}

	.more {
		float: right;
		font-size: 24upx;
		color: #666;
		line-height: 52upx;
	}

	.hospital {
		width: 646upx;
		height: 220upx;
		box-sizing: border-box;
		padding: 30upx 0;
		display: flex;
		overflow: hidden;
		border-bottom: 1px solid #e6e6e6;
	}

	.imgBox {
		width: 220upx;
		height: 160upx;
		margin-right: 30upx;
		background-color: skyblue;
		float: left;
		border-radius: 10upx;
		overflow: hidden;

	}

	.hospitalImg {
		width: 220upx;
		height: 160upx;
	}

	.rightBox {
		float: left;
		width: 394upx;
		height: 160upx;
		overflow: hidden;
		position: relative;
		padding: 0;


	}

	.one {
		font-size: 28upx;
		height: 30upx;
		line-height: 28upx;
		color: #333;
		display: block;
		position: absolute;
		top: 0;
		width: 390upx;
		overflow: hidden;
		text-overflow: ellipsis;
		 white-space: nowrap;
	}

	.two {
		font-size: 24upx;
		color: #666;
		display: block;
		position: absolute;
		top: 40upx;
	}

	.price {
		font-size: 24upx;
		color: #666;
		display: block;
		position: absolute;
		line-height: 34upx;
		top:82upx;
		height: 68upx;
		width: 100%;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.footer {
		width: 686upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 28upx;
		color: #666;
		text-align: center;
	}
</style>
