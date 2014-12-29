"use strict";
var gatherButton = document.getElementById("gatherData");
gatherButton.addEventListener("click", chrome.extension.getBackgroundPage().collectOwnGames);
