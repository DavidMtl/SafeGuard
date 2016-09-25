var logs = {};
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
	if (sender.id == chrome.runtime.id) {
		if (logs[msg.tabId] != undefined) {
			sendResponse(logs[msg.tabId]);
		} else {

		}
	}
});

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		var parser = document.createElement('a');
		parser.href = details.url;
		if (!parser.hostname.endsWith(".safenet")) {
			console.log(details.url);
			var tabId = details.tabId.toString();
			if (logs[tabId] == undefined) {
				logs[tabId] = [];
			}
			logs[tabId].push(details.url);

			chrome.browserAction.setBadgeBackgroundColor({color:[50, 52, 53, 255], tabId:details.tabId});
			chrome.browserAction.setBadgeText({text:logs[tabId].length.toString(), tabId:details.tabId});
			return {cancel: true};
		} else {
			return {cancel: false};
		}
	},
	{urls: ["*://*.safenet/*"]},
	["blocking"]
);

chrome.tabs.onActivated.addListener(function(info){
	if (logs[info.tabId] == undefined) {
		chrome.browserAction.setBadgeText({text:"", tabId:info.tabId});
	} else {
		chrome.browserAction.setBadgeBackgroundColor({color:[50, 52, 53, 255], tabId:info.tabId});
		chrome.browserAction.setBadgeText({text:logs[info.tabId].length.toString(), tabId:info.tabId});
	}
});

chrome.webNavigation.onCompleted.addListener(function(info) {
	if (logs[info.tabId] == undefined) {
		chrome.browserAction.setBadgeText({text:"", tabId:info.tabId});
	} else {
		chrome.browserAction.setBadgeBackgroundColor({color:[50, 52, 53, 255], tabId:info.tabId});
		chrome.browserAction.setBadgeText({text:logs[info.tabId].length.toString(), tabId:info.tabId});
	}
});
