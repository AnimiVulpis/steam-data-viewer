"ust strict";
var displayRules = {
	conditions: [
		new chrome.declarativeContent.PageStateMatcher({
			pageUrl: {
				hostEquals: "steamcommunity.com"
			},
//			only display if logged in; in which case there should be
//			an account pulldown menu
			css: ["#account_pulldown"]
		})
	],
	actions: [
		new chrome.declarativeContent.ShowPageAction()
	]
};

function collectOwnGames() {
//	check if I can get the source of the calling of this function
//	as an alternative to using chrome.extension.getViews...?
	function communityPageLoaded(response) {
		var userPageUrl = response.target.response.querySelector(".menuitem.supernav.username").getAttribute("href").slice(0, -5);
		var xhr = new XMLHttpRequest();
		xhr.onload = gamePageLoaded;
		xhr.open("GET", userPageUrl + "games?tab=all");
		xhr.responseType = "document";
		xhr.send();
	}
	function gamePageLoaded(response) {
//		splitting the lines first seems (further tests needed) to yield better performance
		var gameListLine = response.target.response.querySelector("script[language]").textContent.split("\n")[1];
		var startIndex = gameListLine.indexOf("[");
		var endIndex = gameListLine.indexOf("];");
		var gameList = JSON.parse(gameListLine.slice(startIndex, endIndex + 1));
		var gameObject = gameList.reduce(function toObj(previousVal, currentVal, index, list) {
			previousVal[list[index].appid] = currentVal;
			return previousVal;
		}, {});
//		add error handling; in case the tab does not exist anymore, if any error handling is necessary
		var extensionViewPage = chrome.extension.getViews({type: "tab"})[0];
		extensionViewPage.viewdata.gameList = gameList;
		extensionViewPage.viewdata.showGames();
	}
	var xhr = new XMLHttpRequest();
	xhr.onload = communityPageLoaded;
	xhr.open("GET", "http://steamcommunity.com");
	xhr.responseType = "document";
	xhr.send();
}

chrome.runtime.onInstalled.addListener(function onUpdate() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function onRemoveRules() {
		chrome.declarativeContent.onPageChanged.addRules([displayRules]);
	});
});

chrome.pageAction.onClicked.addListener(function iconClicked(tab) {
	chrome.tabs.create({
		url: "viewdata/viewdata.html",
		index: tab.index + 1
	});
});
