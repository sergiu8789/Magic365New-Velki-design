import fetch from "./ApiInterceptor";

const ApiService = {};

ApiService.login = function (data) {
  return fetch({
    url: "user/login",
    method: "post",
    data: data,
  });
};

ApiService.forgotPassword = function (data) {
  return fetch({
    url: "user/forgot-password",
    method: "post",
    data: data,
  });
};

ApiService.resetPassword = function (data) {
  return fetch({
    url: "user/reset-password",
    method: "post",
    data: data,
  });
};

ApiService.profile = function (data) {
  return fetch({
    url: "/user/profile",
    method: "get",
  });
};

ApiService.transactionHistory = function (page) {
  return fetch({
    url: "/wallet/transaction-history?page_no=" + page,
    method: "get",
  });
};

ApiService.activityLogs = function (page) {
  return fetch({
    url: "/user/activity-logs?page_no=" + page,
    method: "get",
  });
};

ApiService.currentBets = function (page, status, market_type) {
  return fetch({
    url:
      "/bet/current-bets?page_no=" +
      page +
      "&status=" +
      status +
      "&market_type=" +
      market_type,
    method: "get",
  });
};

ApiService.changePassword = function (data) {
  return fetch({
    url: "user/change-password",
    method: "post",
    data: data,
  });
};

ApiService.wallet = function (data) {
  return fetch({
    url: "/wallet",
    method: "get",
  });
};

ApiService.sportsList = function () {
  return fetch({
    url: "/sports",
  });
};

ApiService.liveGamesList = function (type) {
  return fetch({
    url: "/sports/tournament-matches?type=" + type,
  });
};

ApiService.tournamentMatchList = function (type, trn_slug,time_type,startDate="",endDate="") {
  let trn = "";
  if (trn_slug) trn = trn_slug;
  else trn = "";
  return fetch({
    url:
      "/sports/tournament-matches?slug=" +
      type +
      "&trn_slug=" +
      trn +
      "&type="+
      time_type +
      "&s="+
      startDate + 
      "&e="+
      endDate,
  });
};

ApiService.getLiveScores = function () {
  return fetch({
    url: "",
  });
};

ApiService.placeBet = function (data) {
  return fetch({
    url: "/bet",
    method: "post",
    data: data,
  });
};

ApiService.fetchAllBets = function (
  id,
  market_id = "",
  market_type = "",
  market_name = ""
) {
  let name = "";
  if (market_name) {
    name = "&market_name=" + market_name;
  }
  return fetch({
    url:
      "/bet/user-match-bets?match_id=" +
      id +
      "&market_id=" +
      market_id +
      "&market_type=" +
      market_type +
      name,
    method: "get",
  });
};

ApiService.getGamePL = function (fromDate, toDate, marketType) {
  return fetch({
    url:
      "/bet/game-pl?from_date=" +
      fromDate +
      "&to_date=" +
      toDate +
      "&market_type=" +
      marketType,
    method: "get",
  });
};

ApiService.getBetsPL = function (page, fromDate, toDate, market_type) {
  return fetch({
    url:
      "/bet/bets-pl?page_no=" +
      page +
      "&from_date=" +
      fromDate +
      "&to_date=" +
      toDate +
      "&market_type=" +
      market_type,
    method: "get",
  });
};

ApiService.getMatchPL = function (id, market_type, market_name) {
  let name = "";
  if (market_name) {
    name = "&market_name=" + market_name;
  }
  return fetch({
    url: "/bet/match-pl?match_id=" + id + "&market_type=" + market_type + name,
    method: "get",
  });
};

ApiService.getBettingHistory = function (
  page,
  fromDate,
  toDate,
  status,
  market_type
) {
  return fetch({
    url:
      "/bet/betting-history?page_no=" +
      page +
      "&from_date=" +
      fromDate +
      "&to_date=" +
      toDate +
      "&status=" +
      status +
      "&market_type=" +
      market_type,
    method: "get",
  });
};

ApiService.liveMatchList = function () {
  return fetch({
    url: "/sports/homepage-match-list",
    method: "get",
  });
};

ApiService.bannersList = function () {
  let url = `/admin/Banner`;
  return fetch({
    url: url,
    method: "get",
  });
};
ApiService.getMatchOdds = function (match_id) {
  return fetch({
    url: "/sports/get-match-odds?match_id=" + match_id,
    method: "get",
  });
};

ApiService.getSports = function () {
  return fetch({
    url: "sports/get-sports",
    method: "get",
  });
};

ApiService.getFencyRecords = function () {
  return fetch({
    url: "fency-odds",
    method: "get",
  });
};

ApiService.getUserBetMatches = function () {
  return fetch({
    url: "/bet/user-matches",
    method: "get",
  });
};

ApiService.getGameMatches = function (type) {
  return fetch({
    url: "sports/get-game-matches?slug=" + type,
    method: "get",
  });
};

ApiService.getNews = function () {
  return fetch({
    url: "news",
    method: "get",
  });
};

ApiService.getCasinoResultsGet = function (data) {
  return fetch({
    url:
      "sports/get-casino-results?market_name=" +
      data.market_name +
      "&market_id=" +
      data.market_id,
    method: "get",
  });
};

ApiService.getScoreCard = function (id) {
  return fetch({
    url:"sports/fetch-match-score-urls?match_id="+id,
    method: "get"
  });
}
export default ApiService;
