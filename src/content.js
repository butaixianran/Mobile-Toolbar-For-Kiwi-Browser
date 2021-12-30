(function() {
  "use strict";
    //console.log("run mobile toolbar for kiwi");

    //init
    //1vh = 1% screen height
    let toolbarHeight = "5vh";
    let toolbarFontSize = "3vh";
    let showToolbarFontSize = "2vh";
    let buttonWidth = "14%";

    //adjust toolbar heigh and font size based on screen size
    if (window.screen.height < window.screen.width) {
        //it's a pad or desktop, not a mobile
        toolbarHeight = "10vh";
        toolbarFontSize = "6vh";
        showToolbarFontSize = "4vh";
    }

    //create a layer for toolbar
    let toolbar = document.createElement("div");
    toolbar.style.position = "fixed";
    toolbar.style.bottom = "0px";
    toolbar.style.height = toolbarHeight;
    toolbar.style.lineHeight = toolbarHeight;
    toolbar.style.width = "100%";
    toolbar.style["z-index"] = 10001;
    toolbar.style.color = "white";
    toolbar.style.background = "black";
    toolbar.style["text-align"] = "center";
    toolbar.style.display = "flex"; 
    toolbar.style.justifyContent = "center"; 


    //create a div to display toolbar
    let showToolbar = document.createElement("div");
    showToolbar.style.position = "fixed";
    showToolbar.style.bottom = "0px";
    showToolbar.style.right = "0px";
    showToolbar.style.height = toolbarHeight;
    showToolbar.style.lineHeight = toolbarHeight;
    showToolbar.style.width = toolbarHeight;
    showToolbar.style.borderRadius = "6px";
    showToolbar.style["z-index"] = 10000;
    showToolbar.style.background = "black";
    showToolbar.style.color = "white";
    showToolbar.style["text-align"] = "center";
    showToolbar.style.cursor = "pointer";
    showToolbar.style.display = "none"; 
    showToolbar.style.justifyContent = "center"; 
    showToolbar.style.alignItems = "center";


    //icon
    let showToolbarIcon = document.createElement('img');
    showToolbarIcon.src = chrome.runtime.getURL("icon/doubleleft.png");
    showToolbarIcon.style.height = showToolbarFontSize;
    showToolbarIcon.style.width = showToolbarFontSize;
    showToolbar.appendChild(showToolbarIcon);


    //add click event
    showToolbar.onclick=function(){
        //show toolbar
        toolbar.style.display = "flex";
        //hide showToolbar Button
        showToolbar.style.display = "none";

    };


    //set buttons
    const buttons = [
        {
            name:"backward",
            iconSrc:"icon/arrowleft.png",
            onClick:function(){
                chrome.runtime.sendMessage({ask: "backward"});
            }
        },
        {
            name:"forward",
            iconSrc:"icon/arrowright.png",
            onClick:function(){
                chrome.runtime.sendMessage({ask: "forward"});
            }
        },
        {
            name:"closeTab",
            iconSrc:"icon/close.png",
            onClick:function(){
                chrome.runtime.sendMessage({ask: "close"});
            }
        },
        {
            name:"reload",
            iconSrc:"icon/reload.png",
            onClick:function(){
                // chrome extension reload api doesn't work on Kiwi Browser
                // chrome.runtime.sendMessage({ask: "reload"});
                window.location.reload();
            }
        },
        {
            name:"undoButton",
            iconSrc:"icon/undo.png",
            onClick:function(){
                chrome.runtime.sendMessage({ask: "undo"});
            }
        },
        {
            name:"createTab",
            iconSrc:"icon/plus.png",
            onClick:function(){
                chrome.runtime.sendMessage({ask: "create"});
            }
        },
        {
            name:"hideToolbar",
            iconSrc:"icon/doubleright.png",
            onClick:function(){
                //hide toolbar
                toolbar.style.display = "none";
                //show showToolbar Button
                showToolbar.style.display = "flex";
            }
        }
    ];


    //add buttons to toolbar
    let button = null;
    let iconHelper = null;
    let buttonIcon = null;
    for (let b of buttons) {

        button = document.createElement("div");
        button.style.color = "white";
        button.style.backgroundColor = "transparent";
        button.style.width = buttonWidth;
        button.style.height = toolbarHeight;
        button.style.padding = "0px";
        button.style.cursor = "pointer";
        button.style.overflow = "hidden";
        button.style.display = "flex";
        button.style.textAlign = "center";
        button.style.alignItems = "center";
        button.style.justifyContent = "center";

        //icon
        buttonIcon = document.createElement('img');
        buttonIcon.style.height = toolbarFontSize;
        buttonIcon.style.width = toolbarFontSize;
        buttonIcon.src = chrome.runtime.getURL(b.iconSrc);
        button.appendChild(buttonIcon);
        

        //add click event
        button.onclick=b.onClick;

        //add to toolbar
        toolbar.appendChild(button);
    }

    //add toolbar to body
    document.body.appendChild(toolbar);
    document.body.appendChild(showToolbar);
    

})();