'use strict';

var Pinner = {
  closeUnpinned: function() {
    chrome.tabs.query({lastFocusedWindow: true, pinned: false}, function(unpinned) {
      var ids = unpinned.map(function(tab){
        return tab.id
      })
      chrome.tabs.remove(ids);
    });
  },
  togglePinned: function () {
  
    chrome.tabs.query({lastFocusedWindow: true, active: true}, function(active){
      var current = active[0];
      chrome.tabs.update(current.id, {pinned: !current.pinned});
    });
  }
}

chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
});

chrome.commands.onCommand.addListener(function(command) {
  if(command == "toggle-pinned")
    Pinner.togglePinned();
  else if(command == "close-unpinned")
    Pinner.closeUnpinned();
});
