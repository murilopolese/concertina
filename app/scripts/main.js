require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        }
    },
    baseUrl: '/bower_components',
    paths: {
        jquery:             'jquery/jquery',
        serializeObject:    '../scripts/lib/serializeObject',
        modernizr:          'modernizr/modernizr',
        underscore:         'underscore/underscore',
        backbone:           'backbone/backbone'
    }
});

require(['scripts/app.js'], 
    function(App) {
        App.render();
        App.blink([
            // C Major scale
            App.keys['C4'], App.keys['D4'], App.keys['E4'], App.keys['F4'], 
            App.keys['G4'], App.keys['A4'], App.keys['B4'],
            App.keys['C5'], App.keys['D5'], App.keys['E5'], App.keys['F5'], 
            App.keys['G5'], App.keys['A5'], App.keys['B5'],
            App.keys['C6'], App.keys['D6'], App.keys['E6'], App.keys['F6'], 
            App.keys['G6'], App.keys['A6'], App.keys['B6'] 
        ]);
    }
)
