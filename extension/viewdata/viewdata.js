"use strict";
var viewdata = function viewdata() {
	var exports = {};
	var gameList;
	exports.gameList = gameList;
	var gatherButton = document.getElementById("gatherData");
	gatherButton.addEventListener("click", chrome.extension.getBackgroundPage().collectOwnGames);
	function showGames() {
		var thing = {};
		var dataviz = d3.select("#dataviz");
		dataviz.selectAll("div")
			.data(this.gameList)
			.enter()
			.append("div")
			.classed("gameItem", true)
			.append("p")
			.classed("gameTitle", true)
			.text(function addData(datum) {
				for (var item in datum) {
					thing[item] = (typeof thing[item] === "undefined" ? 1 : thing[item] + 1);
				}
				return datum.name;
			});
		console.log(thing);
	}
	exports.showGames = showGames;
	return exports;
}();

//information about how to construct various steam links
//gameInfo['link'] = ( "http://steamcommunity.com/app/" + gameInfo['appid'] );
//href="#{profile_link}/stats/#{friendlyURL}/?tab=achievements"
//href="#{profile_link}/stats/#{friendlyURL}/?tab=stats"
//href="#{profile_link}/stats/#{friendlyURL}/?tab=leaderboards"
//href="http://steamcommunity.com/stats/#{friendlyURL}/achievements/"
//href="http://steamcommunity.com/stats/#{friendlyURL}/leaderboards/"
