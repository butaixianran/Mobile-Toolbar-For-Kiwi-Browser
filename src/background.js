(function(){

"use strict";
console.log("run mobile toolbar for kiwi background");


//get msg from content script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("get msg");
    if (!request.ask) {
        console.log("can not find msg ask");
        return;
    }

    if (request.ask === "backward") {
        chrome.tabs.goBack(sender.tab.id);
    } else if (request.ask === "forward") {
        chrome.tabs.goForward(sender.tab.id);
    } else if (request.ask === "close") {
        //save tab's url for undo button
        chrome.storage.local.set({undoUrl: sender.tab.url});

        //close tab
        chrome.tabs.remove(sender.tab.id);

    } else if (request.ask === "reload") {
        chrome.tabs.reload(sender.tab.id);
    } else if (request.ask === "create") {
        chrome.tabs.create({});
    } else if (request.ask === "undo") {
        //get undo's url
        chrome.storage.local.get(['undoUrl'], function(result) {
          console.log('undoUrl is ' + result.undoUrl);

          //check null
          if(result && result.undoUrl) {
            //open tab
            chrome.tabs.create({ url: result.undoUrl });
            //remove saved tab url
            chrome.storage.local.set({undoUrl: ""});
          }

        });
    } else {
        console.log("unknow msg, do nothing");
    }
  }
);


})();








