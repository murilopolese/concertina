define(
    [
        'jquery',
        'underscore',
        'backbone'
    ],
    function($, _, Backbone) {
        var onClass = 'btn-info';
        var turnOn = function(selector) {
            $(selector).addClass(onClass);
        };
        var turnOff = function(selector) {
            $(selector).removeClass(onClass);
        };
        var midiToClass = function(midi) {
            return '.midi-'+midi;
        };
        var blinkNote = function(midi, duration) {
            turnOn(midiToClass(midi));
            setTimeout(function() {
                turnOff(midiToClass(midi));
            }, duration);
        };
        var blinkNotes = function(midi, duration) {
            _.each(midi, function(note, i) {
                setTimeout(function() {
                    blinkNote(note, duration);
                }, duration*i);
            })
        };
        var blink = function(midi, duration) {
            if(duration == undefined) {
                duration = 500;
            }
            if(midi instanceof Array) {
                blinkNotes(midi, duration);
            } else {
                blinkNote(midi, duration);
            }
        }
        return {
            blink: blink
        }
    }
)