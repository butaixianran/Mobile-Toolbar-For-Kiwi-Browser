(function(){

"use strict";
console.log("run mobile toolbar for kiwi background");

//open last closed tab saved by this extension
function openLastTab() {
    console.log("get last tab url saved by extension");
    //get undoList from storage, and get last url, then save undoList to storage
    chrome.storage.local.get(['undoList'], function(result) {
        let undoList = result.undoList || [];
        if (undoList.length > 0) {
            let lastUrl = undoList.pop();
            console.log("open last tab with url: " + lastUrl);
            chrome.tabs.create({url: lastUrl}); 
            //save undoList to storage
            chrome.storage.local.set({undoList: undoList});
        } else {
            console.log("no url in undoList, do nothing");
        }
    });

}

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
        //load undoList from storage, and add current url to undoList, then save undoList to storage
        chrome.storage.local.get(['undoList'], function(result) {
            let undoList = result.undoList || [];
            undoList.push(sender.tab.url);
            //undoList only save 30 url, if more than 30, remove the first one
            if (undoList.length > 30) {
                undoList.shift();
            }
            chrome.storage.local.set({undoList: undoList});
        });

        //close tab
        chrome.tabs.remove(sender.tab.id);

    } else if (request.ask === "reload") {
        chrome.tabs.reload(sender.tab.id);
    } else if (request.ask === "create") {
        chrome.tabs.create({url:"chrome://newtab"});
    } else if (request.ask === "undo") {
        openLastTab();
    } else {
        console.log("unknow msg, do nothing");
    }
  }
);


})();








