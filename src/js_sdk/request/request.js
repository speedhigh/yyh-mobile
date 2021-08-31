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

	return uni.request(options);
}
export default request;
