<template>
	<view name="search" class="searchBox">
		<input @focus="searchFocus()" confirm-type="search" @confirm="confirmTap(seacrchContnt)" class="search" type="text" :placeholder="inputPlaceHolder"
		 v-model="seacrchContnt" />
		<image @click="goSearch(seacrchContnt)" class="searchIcon" src="https://yuyihui-re.oss-cn-beijing.aliyuncs.com/a6db50b2-9c3d-4863-9416-571c1a82094f.png"
		 mode=""></image>
	</view>
</template>

<script>
	export default {
		name: "search",
		//属性
		data() {
			return {
				inputPlaceHolder: "请输入要搜索的药品名和症状",
			}
		},
		methods: {
			goSearch(e) {
				console.log("去搜索", e);
				this.searchContent = e;
				uni.navigateTo({
					url: `../../pages2/searchDetail/searchDetail?searchContent=${this.searchContent}&country=&priNav=&secNav=`,
				})

			},
			searchFocus() {
				console.log("聚焦");
				this.inputPlaceHolder = "";
			},
			confirmTap: function(e) {
				console.log('我点击了回车')
				console.log("去搜索", e);
				this.searchContent = e;
				uni.navigateTo({
					url: `../../pages2/searchDetail/searchDetail?searchContent=${this.searchContent}&country=&priNav=&secNav=`,
				})
			},
		}

	}
</script>

<style scoped>
	.searchBox {
		position: relative;
		background-color: #fff;
		width: 686upx;
		border-radius: 30upx;
		margin-left: 32upx;
	}

	.searchIcon {
		position: absolute;
		left: 20upx;
		top: 11upx;
		width: 40upx;
		height: 40upx;
		z-index: 99;

	}

	.search {
		width: 686upx;
		height: 60upx;
		// background-color: skyblue;
		border-radius: 32upx;
		text-align: center;
		margin: 0upx 0;
		border: 0px solid #f1f1f1;
		font-size: 26upx;
		color: #999999;
	}
</style>
