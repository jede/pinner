'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
});

chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({lastFocusedWindow: true, active: true}, function(active){
    var current = active[0];
    chrome.tabs.update(current.id, {pinned: !current.pinned});
  });
});
