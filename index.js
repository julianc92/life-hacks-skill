'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
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
        var speechOutput = "You can say tell me a space fact, or, you can say exit... What can I help you with?";
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