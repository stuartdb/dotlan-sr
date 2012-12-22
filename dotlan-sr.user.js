// ==UserScript==
// @name Dotlan-SR
// @version 0.2.0
// @namespace https://github.com/stuartdb/dotlan-sr
// @author Stuart Baker
// @description Adds capital ship system range links to dotlan system pages.
// @include *://evemaps.dotlan.net/system/*
// @grant none
// @downloadURL https://github.com/stuartdb/dotlan-sr/raw/master/dotlan-sr.user.js
// @updateURL https://github.com/stuartdb/dotlan-sr/raw/master/dotlan-sr.meta.js
// @run-at document-end
// ==/UserScript==

function addNavbar() {
    var system = getCurrentSystem();

    var shipUrls = ["Panther,5", "Rorqual,5", "Nidhoggur,5", "Naglfar,5",
                 "Nomad,5", "Jump_Bridge,5", "Hel,5", "Ragnarok,5"];

    var linkNames = ["Black Ops", "Rorqual", "Carrier", "Dread",
                    "Jump Freighter", "Jump Bridge", "Super", "Titan"];

    var toolbar = document.getElementsByClassName("toolbar clearfix");
    var navbar = toolbar[0].cloneNode(false);
    var parentNode = toolbar[0].parentNode;
    parentNode.insertBefore(navbar, toolbar[0]);

    // Add the new toolbar name and link
    var dlsrli = document.createElement("li");
    var dlsrlink = document.createElement("a");
    dlsrlink.setAttribute("class", "active icon_range");
    dlsrlink.setAttribute("href", "https://github.com/stuartdb/dotlan-sr/");
    dlsrlink.textContent = "System Range:";
    dlsrli.appendChild(dlsrlink);
    navbar.appendChild(dlsrli);

    // Add all the ship range links to the new navigation bar
    for (var i = 0; i < shipUrls.length; i++) {
        var url = "/range/" + shipUrls[i] + "/" + system;
        var li = document.createElement("li");
        var link = document.createElement("a");
        link.setAttribute("class", "icon_jump");
        link.setAttribute("href", url);
        link.textContent = linkNames[i];
        li.appendChild(link);
        navbar.appendChild(li);
    }
}

function getCurrentSystem() {
    var title = document.title;
    var titleList = title.split(" - ");
    return titleList[1];
}

addNavbar();
