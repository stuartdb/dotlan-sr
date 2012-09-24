// ==UserScript==
// @name           	Dotlan-SR
// @version        	0.1
// @namespace      	https://github.com/stuartdb/dotlan-sr
// @author         	Stuart Baker
// @description    	Adds capital ship system range links to dotlan system pages.
// @include        	*://evemaps.dotlan.net/system/*
// @grant   		none
// @downloadURL    	https://github.com/stuartdb/dotlan-sr/raw/master/dotlan-sr.user.js
// @updateURL    	https://github.com/stuartdb/dotlan-sr/raw/master/dotlan-sr.meta.js
// @run-at 			document-end
// ==/UserScript==

function addRangeLink() {
	var url = "/range/";
	var shipSkill = "Leviathan,5/";
	var system = getCurrentSystem();
	var navUrl = url + shipSkill + system;

	var navList = document.createElement("li");

	var navLink = document.createElement("a");
	navLink.setAttribute("class", "icon_range");
	navLink.setAttribute("href", navUrl);
	navLink.textContent = "Titan Range";

	navList.appendChild(navLink);


	var toolBarList = document.getElementsByClassName("toolbar clearfix");
	toolBarList[0].appendChild(navList);
}

function getCurrentSystem() {
	var pathname = document.location.pathname;
	return pathname.substring(8,14);
}

addRangeLink();