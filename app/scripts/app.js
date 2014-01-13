define(
    [
        'jquery',
        'underscore',
        'backbone'
    ],
    function($, _, Backbone) {
        var loop = false;
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
        var setLoop = function(val) {
            if(val == undefined) {
                val = true;
            }
            loop = val;
        }
        var blinkNote = function(midi, duration) {
            turnOn(midiToClass(midi));
            setTimeout(function() {
                turnOff(midiToClass(midi));
            }, duration-10);
        };
        var blinkNotes = function(midi, duration) {
            _.each(midi, function(note, i) {
                setTimeout(function() {
                    blinkNote(note, duration);
                }, duration*i);
            })
        };
        var blinkChord = function(chord, duration) {
            _.each(chord, function(note, i) {
                blinkNote(note, duration);
            });
        };
        var blinkChords = function(chords, duration) {
                _.each(chords, function(chord, i) {
                    setTimeout(function() {
                        if(chord instanceof Array) {
                            blinkChord(chord, duration);
                        } else {
                            blinkNote(chord, duration);
                        }
                    }, duration*i)
                });
                if(loop) {
                    setInterval(function() {
                       _.each(chords, function(chord, i) {
                            setTimeout(function() {
                                if(chord instanceof Array) {
                                    blinkChord(chord, duration);
                                } else {
                                    blinkNote(chord, duration);
                                }
                            }, duration*i)
                        }) 
                    }, chords.length*duration);
                }
        };
        var blink = function(midi, duration) {
            if(duration == undefined) {
                duration = 500;
            }
            if(midi instanceof Array) {
                blinkChords(midi, duration);
            } else {
                blinkNote(midi, duration);
            }
        };

        var generateKeys = function(octaveNumbers) {
            if(octaveNumbers == undefined) {
                octaveNumbers = 10;
            }
            var n = {};
            for(var octave = 0; octave < octaveNumbers; octave++) {
                n['C'+octave] = 0 + (octave * 12);
                n['C#'+octave] = 1 + (octave * 12);
                n['D'+octave] = 2 + (octave * 12);
                n['D#'+octave] = 3 + (octave * 12);
                n['E'+octave] = 4 + (octave * 12);
                n['F'+octave] = 5 + (octave * 12);
                n['F#'+octave] = 6 + (octave * 12);
                n['G'+octave] = 7 + (octave * 12);
                n['G#'+octave] = 8 + (octave * 12);
                n['A'+octave] = 9 + (octave * 12);
                n['A#'+octave] = 10 + (octave * 12);
                n['B'+octave] = 11 + (octave * 12);
            }
            return n;
        };

        var major = function(midi) {
            return [midi, midi+4, midi+7, midi+12];
        };
        var minor = function(midi) {
            return [midi, midi+3, midi+7, midi+12];
        };
        var major7 = function(midi) {
            return [midi, midi+4, midi+7, midi+10];
        };
        var minor7 = function(midi) {
            return [midi, midi+3, midi+7, midi+10];
        }

        var concertinaDiagram = {
            push: {
                'leftHand': [
                    ['D#4', '', ''],
                    ['F#4', 'C#4', 'F#4'],
                    ['F4', 'G4', 'A#4'],
                    ['D4', 'E4', 'D5'],
                    ['A#3', 'C4', 'B4'],
                    ['A#2', 'G3', 'A4'],
                    ['F4', 'C3', 'A2'],
                    ['D4', 'E4', 'D3'] 
                ],
                'rightHand': [
                    ['F4', '', ''],
                    ['C5', 'G#4', 'E4'],
                    ['F#5', 'G4', 'A4'],
                    ['A5', 'C5', 'G#5'],
                    ['B5', 'E5', 'A#4'],
                    ['D6', 'G5', 'D5'],
                    ['G6', 'C6', 'F5'],
                    ['F6', 'E6', 'A#5'] ,
                    ['D#5', 'B4', 'C#6'],
                    ['', '', 'D#6']
                ]
            },
            pull: {
                'leftHand': [
                    ['A#4', '', ''],
                    ['F#4', 'A3', 'G#4'],
                    ['G4', 'A4', 'A#4'],
                    ['D#4', 'F4', 'E5'],
                    ['C4', 'D4', 'C5'],
                    ['F3', 'B3', 'G#4'],
                    ['D#3', 'G2', 'C#4'],
                    ['C3', 'D2', 'F#4'] 
                ],
                'rightHand': [
                    ['D#4', '', ''],
                    ['C#6', 'G4', 'F4'],
                    ['E5', 'A#4', 'A#5'],
                    ['F#5', 'B4', 'C#5'],
                    ['G#5', 'D5', 'A4'],
                    ['C6', 'F5', 'C6'],
                    ['D#6', 'A5', 'D#5'],
                    ['F6', 'B5', 'G4'] ,
                    ['E6', 'D6', 'A5'],
                    ['', '', 'G6']
                ]
            },
            keys: generateKeys()
        };
        var template = _.template(
            $('#app-template3').html(),
            concertinaDiagram
        );
        var render = function() {
            $('#app').html(template);
        };

        return {
            blink: blink,
            keys: generateKeys(),
            render: render,
            setLoop: setLoop,
            major: major,
            minor: minor,
            major7: major7,
            minor7: minor7
        };
    }
);