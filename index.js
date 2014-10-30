var xal = require('../../xal-javascript');
var _ = require('underscore');

var toleranceMinutes = 1;
var lastSeen = new Date(new Date() - toleranceMinutes * 60 * 1000);
xal.on('xi.event.inform.user.presence', function(state,next){
    var value = _.reduce(state.get('xi.inform.user.presence'), function(memo, dest) {
        return memo || dest.value ;
    },false);
    if(value){
        var currentTime = new Date();
        if(Math.abs(currentTime - lastSeen) > toleranceMinutes * 1000 * 60){
            xal.createEvent('xi.event.output.text', function(state, done){
                state.put('xi.event.output.text', 'Hello Mihir');
                done(state);
            });
        }
        lastSeen = currentTime;
    }
});




xal.start({name: 'Greet'}, function(){
    xal.createEvent('xi.event.ask.user.presence', function(state, done){
        state.put('xi.event.ask.user.presence', '?');
        done(state);
    });

    //initialize lastSeen
});
