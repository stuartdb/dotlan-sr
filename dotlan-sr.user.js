// ==UserScript==
// @name dotlan-sr
// @version 1.0.3
// @namespace http://stuartdb.com
// @author Stuart Baker
// @description Adds capital ship system range links to dotlan system pages.
// @include *://evemaps.dotlan.net/system/*
// @grant GM_getValue
// @grant GM_setValue
// @downloadURL https://github.com/stuartdb/dotlan-sr/raw/master/dotlan-sr.user.js
// @run-at document-end
// ==/UserScript==

function set_jdc() {
    "use strict";
    var jdc_select = document.getElementById("jdc_select");
    if (jdc_select !== null) {
        return GM_setValue("jdc", jdc_select.selectedIndex);
    }
}

function get_jdc() {
    "use strict";
    return GM_getValue("jdc", 5);
}

function get_current_system() {
    "use strict";
    var title = document.title,
        title_list = title.split(" - ");
    return title_list[1];
}

function insert_range_bar() {
    "use strict";
    set_jdc();

    var i = 0,
        system,
        ship_names,
        link_names,
        existing_toolbar,
        range_ul,
        parentNode,
        git_li,
        git_link,
        range_url,
        range_link,
        range_li,
        jdc_li,
        jdc_select,
        jdc_option,
        old_range_ul,
        old_range_ul_parent;

    system = get_current_system();
    ship_names = ["Panther", "Rorqual", "Nidhoggur", "Naglfar",
                    "Nomad", "Jump_Bridge", "Hel", "Ragnarok"];
    link_names = ["Black Ops", "Rorqual", "Carrier", "Dread",
                    "Jump Freighter", "Jump Bridge", "Super", "Titan"];

    existing_toolbar = document.getElementsByClassName("toolbar clearfix");
    range_ul = existing_toolbar[0].cloneNode(false);
    parentNode = existing_toolbar[0].parentNode;

    range_ul.setAttribute("id", "range_ul");

    // Add the new toolbar name and link
    git_li = document.createElement("li");
    git_link = document.createElement("a");
    git_link.setAttribute("class", "active icon_range");
    git_link.setAttribute("href", "https://github.com/stuartdb/dotlan-sr/");
    git_link.textContent = "System Range:";
    git_li.appendChild(git_link);
    range_ul.appendChild(git_li);

    // Add all the ship range links to the new navigation bar
    for (i = 0; i < ship_names.length; i = i + 1) {
        range_url = "/range/" + ship_names[i] + ","  + get_jdc() + "/" + system;
        range_li = document.createElement("li");
        range_link = document.createElement("a");
        range_link.setAttribute("class", "icon_jump");
        range_link.setAttribute("href", range_url);
        range_link.textContent = link_names[i];
        range_li.appendChild(range_link);
        range_ul.appendChild(range_li);
    }

    // Add jump skill selection
    jdc_li = document.createElement("li");
    jdc_li.setAttribute("class", "right");

    jdc_select = document.createElement("select");
    jdc_select.setAttribute("class", "slt");
    jdc_select.setAttribute("name", "jdc_select");
    jdc_select.setAttribute("id", "jdc_select");
    jdc_select.addEventListener("change", insert_range_bar, true);

    for (i = 0; i < 6; i = i + 1) {
        jdc_option = document.createElement("option");
        jdc_option.setAttribute("label", i);
        jdc_option.setAttribute("value", i);
        jdc_option.textContent = i;
        // Just going to make jdc 5 the default selection
        if (i === get_jdc()) {
            jdc_option.setAttribute("selected", "true");
        }
        jdc_select.appendChild(jdc_option);
    }

    jdc_li.appendChild(jdc_select);
    range_ul.appendChild(jdc_li);

    old_range_ul = document.getElementById("range_ul");
    parentNode.insertBefore(range_ul, existing_toolbar[0]);

    if (old_range_ul !== null) {
        old_range_ul_parent = old_range_ul.parentNode;
        old_range_ul_parent.replaceChild(range_ul, old_range_ul);
    } else {
        parentNode.insertBefore(range_ul, existing_toolbar[0]);
    }
}

insert_range_bar();
