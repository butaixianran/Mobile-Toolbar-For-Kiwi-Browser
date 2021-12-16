(function() {
  "use strict";
    console.log("run mobile toolbar for kiwi");

    //init
    //1vh = 1% screen height
    let toolbarHeight = "5vh";
    let toolbarFontSize = "3vh";
    let showToolbarFontSize = "2vh";

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
    //toolbar.style.border = "0px solid black";
    //toolbar.style.padding = "0px";
    toolbar.style["text-align"] = "center";
    //toolbar.style.display = "block";


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
    showToolbar.innerHTML = "<<";
    showToolbar.style.fontSize = showToolbarFontSize;
    showToolbar.style.fontWeight = "bold";
    showToolbar.style.cursor = "pointer";
    showToolbar.style.display = "none"; 

    //add click event
    showToolbar.onclick=function(){
        //show toolbar
        toolbar.style.display = "block";
        //hide showToolbar Button
        showToolbar.style.display = "none";

    };



    //add buttons to toolbar
    let backwardButton = document.createElement("button");
    backwardButton.style.color = "white";
    backwardButton.style.backgroundColor = "transparent";
    backwardButton.style.border = "0px solid black";
    backwardButton.style.width = "20%";
    backwardButton.style.height = toolbarHeight;
    backwardButton.style.lineHeight = toolbarHeight;
    backwardButton.style.border = "none";
    backwardButton.style.outline = "none";
    backwardButton.style.fontSize = toolbarFontSize;
    backwardButton.style.fontWeight = "bold";
    backwardButton.style.cursor = "pointer";
    backwardButton.style.overflow = "hidden";
    backwardButton.innerHTML = "<-";

    //add click event
    backwardButton.onclick=function(){
        chrome.runtime.sendMessage({ask: "backward"});
    };

    let forwardButton = document.createElement("button");
    forwardButton.style.color = "white";
    forwardButton.style.backgroundColor = "transparent";
    forwardButton.style.border = "0px solid black";
    forwardButton.style.width = "20%";
    forwardButton.style.height = toolbarHeight;
    forwardButton.style.lineHeight = toolbarHeight;
    forwardButton.style.border = "none";
    forwardButton.style.outline = "none";
    forwardButton.style.fontSize = toolbarFontSize;
    forwardButton.style.fontWeight = "bold";
    forwardButton.style.cursor = "pointer";
    forwardButton.style.overflow = "hidden";
    forwardButton.innerHTML = "->";

    //add click event
    forwardButton.onclick=function(){
        chrome.runtime.sendMessage({ask: "forward"});
    };


    let closeTabButton = document.createElement("button");
    closeTabButton.style.color = "white";
    closeTabButton.style.backgroundColor = "transparent";
    closeTabButton.style.border = "0px solid black";
    closeTabButton.style.width = "20%";
    closeTabButton.style.height = toolbarHeight;
    closeTabButton.style.lineHeight = toolbarHeight;
    closeTabButton.style.border = "none";
    closeTabButton.style.outline = "none";
    closeTabButton.style.fontSize = toolbarFontSize;
    closeTabButton.style.fontWeight = "bold";
    closeTabButton.style.cursor = "pointer";
    closeTabButton.style.overflow = "hidden";
    closeTabButton.innerHTML = "x";

    //add click event
    closeTabButton.onclick=function(){
        chrome.runtime.sendMessage({ask: "close"});
    };    

    let reloadTabButton = document.createElement("button");
    reloadTabButton.style.color = "white";
    reloadTabButton.style.backgroundColor = "transparent";
    reloadTabButton.style.border = "0px solid black";
    reloadTabButton.style.width = "20%";
    reloadTabButton.style.height = toolbarHeight;
    reloadTabButton.style.lineHeight = toolbarHeight;
    reloadTabButton.style.border = "none";
    reloadTabButton.style.outline = "none";
    reloadTabButton.style.fontSize = toolbarFontSize;
    reloadTabButton.style.fontWeight = "bold";
    reloadTabButton.style.cursor = "pointer";
    reloadTabButton.style.overflow = "hidden";
    reloadTabButton.innerHTML = "R";

    //add click event
    reloadTabButton.onclick=function(){
        chrome.runtime.sendMessage({ask: "reload"});
    };


    let newTabButton = document.createElement("button");
    newTabButton.style.color = "white";
    newTabButton.style.backgroundColor = "transparent";
    newTabButton.style.border = "0px solid black";
    newTabButton.style.width = "20%";
    newTabButton.style.height = toolbarHeight;
    newTabButton.style.lineHeight = toolbarHeight;
    newTabButton.style.border = "none";
    newTabButton.style.outline = "none";
    newTabButton.style.fontSize = toolbarFontSize;
    newTabButton.style.fontWeight = "bold";
    newTabButton.style.cursor = "pointer";
    newTabButton.style.overflow = "hidden";
    newTabButton.innerHTML = "+";

    //add click event
    newTabButton.onclick=function(){
        chrome.runtime.sendMessage({ask: "create"});
    };


    let hideToolbarButton = document.createElement("button");
    hideToolbarButton.style.color = "white";
    hideToolbarButton.style.backgroundColor = "transparent";
    hideToolbarButton.style.border = "0px solid black";
    hideToolbarButton.style.width = "20%";
    hideToolbarButton.style.height = toolbarHeight;
    hideToolbarButton.style.lineHeight = toolbarHeight;
    hideToolbarButton.style.border = "none";
    hideToolbarButton.style.outline = "none";
    hideToolbarButton.style.fontSize = toolbarFontSize;
    hideToolbarButton.style.fontWeight = "bold";
    hideToolbarButton.style.cursor = "pointer";
    hideToolbarButton.style.overflow = "hidden";
    hideToolbarButton.innerHTML = ">>";

    //add click event
    hideToolbarButton.onclick=function(){
        //hide toolbar
        toolbar.style.display = "none";
        //show showToolbar Button
        showToolbar.style.display = "block";

    };


    //append buttons to toolbar
    toolbar.appendChild(backwardButton);
    toolbar.appendChild(forwardButton);
    toolbar.appendChild(closeTabButton);
    //reload api doesn't work on Kiwi Browser
    //toolbar.appendChild(reloadTabButton);
    toolbar.appendChild(newTabButton);
    toolbar.appendChild(hideToolbarButton);

    //add toolbar to body
    document.body.appendChild(toolbar);
    document.body.appendChild(showToolbar);
    


})();