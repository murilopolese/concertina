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
        //  C   D   E   F   G   A   B   C
            72, 74, 76, 77, 79, 81, 83, 84 
            ]);
    }
)
