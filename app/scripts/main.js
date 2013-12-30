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
        App.blink(1);
        App.blink(3);
        App.blink([2, 4, 5, 6]);
    }
)
