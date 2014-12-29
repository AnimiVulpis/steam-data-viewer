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
	var gameList = [];
	function communityPageLoaded(response) {
		var userPageUrl = response.target.response.querySelector(".menuitem.supernav.username").getAttribute("href").slice(0, -5);
		var xhr = new XMLHttpRequest();
		xhr.onload = gamePageLoaded;
		xhr.open("GET", userPageUrl + "games?tab=all");
		xhr.responseType = "document";
		xhr.send();
	}
	function gamePageLoaded(response) {
		var gameListScript = response.target.response.querySelector("script[language]").textContent;
//		better performance than indexOf possible?
		var startIndex = gameListScript.indexOf("[");
		var endIndex = gameListScript.indexOf("];\n");
		var gamesAsJson = JSON.parse(gameListScript.slice(startIndex, endIndex + 1));
		debugger;
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
