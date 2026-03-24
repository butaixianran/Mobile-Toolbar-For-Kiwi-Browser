(function(){

"use strict";
console.log("run mobile toolbar for kiwi background");

//open last closed tab saved by this extension
function openLastTab() {
    console.log("get last tab url saved by extension");
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
        //save tab's url for undo button
        console.log("restoring tab with url: " + sender.tab.url);
        chrome.storage.local.set({undoUrl: sender.tab.url});

        //close tab
        chrome.tabs.remove(sender.tab.id);

    } else if (request.ask === "reload") {
        chrome.tabs.reload(sender.tab.id);
    } else if (request.ask === "create") {
        chrome.tabs.create({url:"chrome://newtab"});
    } else if (request.ask === "undo") {

        //get closed url by chrome.sessions.getRecentlyClosed
        // get last session (maxResults: 1)
        chrome.sessions.getRecentlyClosed({ maxResults: 1 }, (sessions) => {
            
            if (sessions && sessions.length > 0) {
                console.log("recently closed sessions found, use chrome.sessions API to restore");
                const lastSession = sessions[0];
                const sessionId = lastSession.tab ? lastSession.tab.sessionId : lastSession.window.sessionId;
                // restore and this session will be removed from list
                chrome.sessions.restore(sessionId, (restored) => {
                    if (restored.window){
                        console.log("restroe a window");

                    } else if (restored.tab) {
                        console.log("restroe a tab");
                    }
                    else {
                        console.log("nothing to restore, use saved url");
                        openLastTab();
                    }
                });

            } else {
                console.log("no recently closed sessions found, use undoUrl saved by extension");
                openLastTab();
            }
        });


    } else {
        console.log("unknow msg, do nothing");
    }
  }
);


})();








