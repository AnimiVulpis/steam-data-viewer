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

chrome.runtime.onInstalled.addListener(function onUpdate() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function onRemoveRules() {
		chrome.declarativeContent.onPageChanged.addRules([displayRules]);
	});
});

