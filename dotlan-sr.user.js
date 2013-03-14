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

function set_jdc() {
    var jdc_select = document.getElementById("jdc_select");
    if (jdc_select !== null) {
        return GM_setValue("jdc", jdc_select.selectedIndex);
    }
}

function get_jdc() {
    return GM_getValue("jdc", 5);
}

function addNavbar() {
    set_jdc();

    var system = getCurrentSystem();

    var shipUrls = ["Panther,", "Rorqual,", "Nidhoggur,", "Naglfar,",
                 "Nomad,", "Jump_Bridge,", "Hel,", "Ragnarok,"];

    var linkNames = ["Black Ops", "Rorqual", "Carrier", "Dread",
                    "Jump Freighter", "Jump Bridge", "Super", "Titan"];

    var toolbar = document.getElementsByClassName("toolbar clearfix");
    var navbar = toolbar[0].cloneNode(false);
    var parentNode = toolbar[0].parentNode;

    navbar.setAttribute("id", "range_ul");

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
        var url = "/range/" + shipUrls[i] + get_jdc() + "/" + system;
        var li = document.createElement("li");
        var link = document.createElement("a");
        link.setAttribute("class", "icon_jump");
        link.setAttribute("href", url);
        link.textContent = linkNames[i];
        li.appendChild(link);
        navbar.appendChild(li);
    }

    // Add jump skill selection
    var jdc_li = document.createElement("li");
    jdc_li.setAttribute("class", "right");

    var jdc_select = document.createElement("select");
    jdc_select.setAttribute("class", "slt");
    jdc_select.setAttribute("name", "jdc_select");
    jdc_select.setAttribute("id", "jdc_select");
    jdc_select.addEventListener("change", addNavbar, true);

    for (i = 0; i < 6; i = i + 1) {
        var jdc_option = document.createElement("option");
        jdc_option.setAttribute("label", i);
        jdc_option.setAttribute("value", i);
        // Just going to make jdc 5 the default selection
        if (i == get_jdc()) {
            jdc_option.setAttribute("selected", "true");
        }
        jdc_select.appendChild(jdc_option);
    }

    jdc_li.appendChild(jdc_select);
    navbar.appendChild(jdc_li);

    old_range_ul = document.getElementById("range_ul");
    parentNode.insertBefore(navbar, toolbar[0]);

    if (old_range_ul != null) {
        old_range_ul_parent = old_range_ul.parentNode;
        old_range_ul_parent.replaceChild(navbar, old_range_ul);
    } else {
        parentNode.insertBefore(navbar, toolbar[0]);
    }

}

function getCurrentSystem() {
    var title = document.title;
    var titleList = title.split(" - ");
    return titleList[1];
}

addNavbar();
