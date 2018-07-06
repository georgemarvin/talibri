// ==UserScript==
// @name         Talibri Local Timestamps
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       Marvin George
// @match        https://*talibri.com/*
// @require  https://momentjs.com/downloads/moment.min.js
// @require  https://momentjs.com/downloads/moment-timezone-with-data-2012-2022.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        none
// ==/UserScript==

function convertTimezone (timetext) {
    var timeStr     = timetext;
    var origTime    = moment.tz (timeStr, "MM/DD hh:mm", "America/Detroit");
    var localTime   = origTime.tz (Intl.DateTimeFormat().resolvedOptions().timeZone).format("MM/DD HH:mm");

    return localTime;
}

function replaceChatTimeStamps() {
    'use strict';

    console.log("replaceChatTimeStamps");

    const messages = document.getElementById('messages');
    var cards = messages.getElementsByClassName('card-text');
    for(var i=0;i<cards.length;i++){
        var messageText = cards[i].childNodes[3].data;
        var timeTextIndexStart = messageText.indexOf("(")+1;
        var timeTextIndexEnd = messageText.indexOf(")");
        var timeText = messageText.substring(timeTextIndexStart,timeTextIndexEnd);
        cards[i].childNodes[3].data=cards[i].childNodes[3].data.replace(timeText, convertTimezone(timeText));
    }

}

function replaceNotificationTimeStamps() {
    'use strict';

    console.log("replaceNotificationTimeStamps");

    const notifications = document.getElementById('notifications');
    var notInfo = notifications.getElementsByClassName('notification-info');
    for(var i=0;i<notInfo.length;i++){
        var messageText = notInfo[i].childNodes[0].data;
        //console.log("messageText: "+messageText);
        var timeTextIndexStart = messageText.indexOf("(")+1;
        //console.log("timeTextIndexStart: "+timeTextIndexStart);
        var timeTextIndexEnd = messageText.indexOf(")");
        //console.log("timeTextIndexEnd: "+timeTextIndexEnd);

        var timeText = messageText.substring(timeTextIndexStart,timeTextIndexEnd);
        //console.log("timeText: "+timeText);
        //console.log("convertTimezone(timeText): "+convertTimezone(timeText));
        notInfo[i].childNodes[0].data=notInfo[i].childNodes[0].data.replace(timeText, convertTimezone(timeText));
    }

}

waitForKeyElements(".main-chat-panel", replaceChatTimeStamps);
waitForKeyElements(".navbar-fixed-top", replaceNotificationTimeStamps);
