$(document).ready(function() {
    console.log('Ready to go.');

    /*
     * Compile templates
     */
    var mainTemplate = Handlebars.compile($('#keys-template').html());
    var musicalAssets = {
        keys: [
            { midi: 48, note: 'C' },
            { midi: 49, note: 'C#' },
            { midi: 50, note: 'D' },
            { midi: 51, note: 'D#' },
            { midi: 52, note: 'E' },
            { midi: 53, note: 'F' },
            { midi: 54, note: 'F#' },
            { midi: 55, note: 'G' },
            { midi: 56, note: 'G#' },
            { midi: 57, note: 'A' },
            { midi: 58, note: 'A#' },
            { midi: 59, note: 'B' },
            { midi: 60, note: 'C' },
            { midi: 61, note: 'C#' },
            { midi: 62, note: 'D' },
            { midi: 63, note: 'D#' },
            { midi: 64, note: 'E' },
            { midi: 65, note: 'F' },
            { midi: 66, note: 'F#' },
            { midi: 67, note: 'G' },
            { midi: 68, note: 'G#' },
            { midi: 69, note: 'A' },
            { midi: 70, note: 'A#' },
            { midi: 71, note: 'B' },
            { midi: 72, note: 'C' },
            { midi: 73, note: 'C#' },
            { midi: 74, note: 'D' },
            { midi: 75, note: 'D#' },
            { midi: 76, note: 'E' }

        ],
        chords: []
    }

    /*
     * Render templates
     */
    var html = mainTemplate(musicalAssets);
    $('#app').html(html);

    /*
     * Backbone Events
     */
    concertinaEvents = {

        playNote: function(note, action) {
            if(action == 'press') {
                $('.key-'+note).addClass('btn-info');
            } else {
                $('.key-'+note).removeClass('btn-info');
            }
        },
        blinkNote: function(note, time) {
            concertinaEvents.playNote(note, 'press');
            var timeout = setTimeout(function() {
                concertinaEvents.playNote(note, 'release');
            }, time);
        },
        playChord: function(chord, action) {
            _.each(musicalAssets.chords[chord], function(item) {
                if(action == 'press') {
                    concertinaEvents.playNote(item, 'press');
                } else {
                    concertinaEvents.playNote(item, 'release');
                }
            });
        },
        blinkChord: function(chord, time) {
            concertinaEvents.playChord(chord, 'press');
            var timeout = setTimeout(function() {
                concertinaEvents.playChord(chord, 'release');
            }, time);
        }
    };

    // Music synth
    // var synth = T("OscGen", {wave:"saw", mul:0.25}).play();

    var synth = T("SynthDef").play();

    synth.def = function(opts) {
        var osc1;
        var table = [0.8, [0, 1500]];
        osc1 = T("sin", {freq:opts.freq * 1.6818, mul:0.5});
        env  = T("env", {table:table}, osc1);
        return env.on("ended", opts.doneAction).bang();
    };

    var keydict = T("ndict.key");
    var midicps = T("midicps");

    T("keyboard").on("keydown", function(e) {
      var midi = keydict.at(e.keyCode);
      if (midi) {
        var freq = midicps.at(midi);
        synth.noteOnWithFreq(freq, 100);
        concertinaEvents.playNote(midi, 'press');
      }
    }).on("keyup", function(e) {
      var midi = keydict.at(e.keyCode);
      if (midi) {
        synth.noteOff(midi, 100);
        concertinaEvents.playNote(midi, 'release');
      }
    }).start();

})