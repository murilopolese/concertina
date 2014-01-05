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
        console.log('Started');
        App.blink([
            // C Major scale
            60, 62, 64, 65, 67, 69, 71,
            72, 74, 76, 77, 79, 81, 83, 
            84, 86, 88, 89, 91, 93, 95
            ]);
    }
)
