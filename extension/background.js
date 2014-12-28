var displayRules = {
	conditions: [
		new chrome.declarativeContent.PageStateMatcher({
			pageUrl: {
				hostEquals: "steamcommunity.com"
			}
		})
	],
	actions: [
		new chrome.declarativeContent.ShowPageAction()
	]
};

chrome.runtime.onInstalled.addListener(function() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([displayRules]);
	});
});

