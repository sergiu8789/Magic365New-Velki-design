import fetch from './LiveScoresApiInterceptor';

const LiveScoreApiService = {}


LiveScoreApiService.getScoreId = function (url) {
	return fetch({
		url: url,
		method: 'get'
	})
}

LiveScoreApiService.getLiveScore = function (url) {
	return fetch({
		url: url,
		method: 'get'
	})
}

LiveScoreApiService.getIP = function (url) {
	return fetch({
		url: url,
		method: 'get'
	})
}

export default LiveScoreApiService;
