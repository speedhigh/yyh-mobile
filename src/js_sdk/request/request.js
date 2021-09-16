import baseurl from './baseurl.js'
const request = function(options) {
	options.url = baseurl + options.url;
	options.data = JSON.stringify(options.data)
	// options.data = options.data.toString()
	const token = uni.getStorageSync('xtoken');
	// const username = uni.getStorageSync('username');
	if (token) {
		options.header = {
			'xtoken':token
		};
	}
	uni.addInterceptor('request', {
		success(req) {
			if(req.data.msg === "登录超时" && uni.getStorageSync('xtoken')) {
				console.log(req)
				alert('登录超时，请进行登录')
				uni.removeStorageSync('xtoken')
				uni.navigateTo({
					url: '../../pages2/choiceLog/choiceLog'
				})
			}
		}, 
		fail(err) {
			console.log('interceptor-fail',err)
		}, 
	})
	return uni.request(options);
}
export default request;
