document.addEventListener('DOMContentLoaded', function() {
    var queryInfo = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(queryInfo, function(tabs) {
        var tab = tabs[0];
        chrome.extension.sendMessage({tabId: tab.id}, function(response) {
            var field = document.getElementById('blocked_request');
            var arrayLength = response.length;
            for (var i = 0; i < arrayLength; i++) {
                field.value += response[i] + "\n";
            }
        });
    });
});
