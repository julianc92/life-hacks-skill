'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "amzn1.ask.skill.[my-unique-skill-ID]"; 
var SKILL_NAME = 'Life Hacks';

/**
 * Array containing life hacks.
 */
var FACTS = [
    "For a clogged drain, pour in a half cup of baking soda and one cup of vinegar, then rinse away after it stops foaming.",
    "Use frozen grapes to chill your white win without watering it down.",
    "Put a dry teabag inside your smelly shoes or gym bag to absorb the bad odors.",
    "Switching your phone to airplane mode before plugging it in will make it charge twice as fast.",
    "To cool your bottle of beer faster, wrap a wet paper towel around it and stick it in the freezer for a few minutes.",
    "The takeout box you get from a chinese restaraunt can unfold into a plate.",
    "If you lose your camera, go to StolenCameraFinder.com.  It will search the internet for images with the same serial number as your camera.",
    "When you are at a party or the bar, hold your drink at belly button level.  It makes you look more confident.",
    "Surround yourself with people that reflect who you want to be and how you want to feel.  Energy is contagioius.",
    "For the cheapest possible airline tickets, book your flight on a Tuesday at 3:00PM, six weeks before your departure date.",
    "If you are feeling depressed, do some cleaning.  Straightening out the physical aspects of your life also brings clarity to the mental aspects.",
    "When taking a photo, tilt your head to the right and slightly up.  It makes you look more attractive and intelligent.",
    "If you need to remember something in the morning, send yourself a text before bed and don't open it.",
    "If you are put on hold and don't hear background music, chances are you are just muted and they can still hear you.",
    "A standard power plug also works as a flathead screwdriver.",
    "You need motivation only until a habit is formed.  After that, routine will take care of the rest.",
    "When calling in sick for work, always use the word contagious.  No one will ever argue with you.",
    "Don't trust everything you see.  Even salt looks like sugar.",
    "Can't think of what to get someone for Christmas?  Tell them you already bought something, and then dare them to guess what it is.  They will guess things they actually want.",
    "To bypass free public wifi with a time limit, just clear your cookies and register again.",
    "Netflix now allows you to download shows and movies to view offline.",
    "Avoid ads on your phone apps by putting your phone into airplane mode."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random life hack from the life hack list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your fact: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a life hack, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};
