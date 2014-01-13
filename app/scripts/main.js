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
        modernizr:          'modernizr/modernizr',
        underscore:         'underscore/underscore',
        backbone:           'backbone/backbone'
    }
});

require(['scripts/app.js'], 
    function(App) {
        // Expose app to users
        window.App = App;
        App.render();
        App.setLoop();
        App.blink([
            App.major(App.keys['C4'])
        ], 7*500);
        App.blink([
            // C Major scale
            App.keys['C5'], App.keys['D5'], App.keys['E5'], App.keys['F5'], 
            App.keys['G5'], App.keys['A5'], App.keys['B5']
        ], 500);
    }
)
