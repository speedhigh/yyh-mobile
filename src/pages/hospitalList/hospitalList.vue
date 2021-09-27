<template>
	<!-- 医院列表组件 -->
	<view class="hospital">
		<view class="hospitalBox">
		<!-- 	<view class="title">
				<text>日本合作医院</text>
				<text class="more" @click="goHosptialList()">查看更多 ></text>
			</view> -->
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
			<view class="footer">
				啊哦~滑到底了呀~
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hospitalList: ['1', '2', '1', '2'],
				indexCurrent: 1,
			};
		},
		methods: {
			goHosptialDetail(a) {
				uni.navigateTo({
					url: `../hospitalDetail/hospitalDetail?id=${a}`
				})
			}
		},
		mounted() {
			uni.request({
				// url: "http://47.105.107.186:8886/wx-yuyihui/applets/medical_examination/nocheck/get_hospital",
				url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/medical_examination/nocheck/get_hospital",
				// url: "http://192.168.1.109:8886/wx-yuyihui/applets/medical_examination/nocheck/get_hospital",
				method: 'get',
				data: {
					currentPage: '1',
					pageSize: '8',
				},
				success: (res) => {
					console.log("医院", res);
					this.hospitalList = res.data.data.records;

				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		onLaunch() {
			console.log("只触发一次的小程序初始化")
		},
		onReachBottom: function() {
			var that = this;
			that.indexCurrent++;
			uni.request({
				url: "https://www.yuyihui.com.cn:8886/wx-yuyihui/applets/medical_examination/nocheck/get_hospital",
				// url: "http://192.168.1.109:8886/wx-yuyihui/applets/medical_examination/nocheck/get_hospital",
				method: 'GET',
				data: {
					currentPage: that.indexCurrent,
					pageSize: "6",
				},
				success: (res) => {
					console.log("到底啦", res.data.data)

					var next_data = res.data.data.records;
					this.hospitalList = this.hospitalList.concat(next_data);

				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
	}
</script>

<style scoped>
	
	.hospitalBox {
		width: 750upx;
		height: 100%;
		box-sizing: border-box;
		margin: 10upx 0 30upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		flex-direction: row;
		display: block;
	}
	.hospital {
		width: 750upx;
		box-sizing: border-box;
		margin: 0 32upx;
	}


	.hospital {
		width: 646upx;
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
		color: #333;
		display: block;
		position: absolute;
		top: 0;
		white-space: nowrap;
		/* overflow: hidden; */
		text-overflow: ellipsis;
	}

	.two {
		font-size: 24upx;
		color: #666;
		display: block;
		position: absolute;
		top: 56upx;
	}

	.price {
		font-size: 24upx;
		width: 368upx;
		word-wrap: break-word;
		color: #666;
		display: block;
		position: absolute;
		top: 100upx;
	}

	.footer {
		width: 686upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 28upx;
		color: #666;
		text-align: center;
		margin-bottom: 10upx;
	}
</style>
