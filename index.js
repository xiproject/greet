var xal = require('../../xal-javascript');
var _ = require('underscore');

var toleranceMinutes = 0.1;
var lastSeen = 0;
var lastPresenceValue = false;

xal.on('xi.event.inform.user.presence', function(state,next){
    var value = _.reduce(state.get('xi.event.inform.user.presence'), function(memo, dest) {
        return memo || dest.value ;
    },false);

    if(!lastPresenceValue && value){
        xal.log.info('this is true');
        var currentTime = new Date();
        // TODO: Figure out if this is necessary
        if(true || Math.abs(currentTime - lastSeen) > toleranceMinutes * 1000 * 60){
            xal.createEvent('xi.event.output.text', function(state, done){
                state.put('xi.event.output.text', 'Hello, human.');
                done(state);
            });
        }
        lastSeen = currentTime;
    }

    lastPresenceValue = value;

});


xal.start({name: 'Greet'}, function(){
    xal.createEvent('xi.event.ask.user.presence', function(state, done){
        state.put('xi.event.ask.user.presence', '?');
        done(state);
    });

    //initialize lastSeen
});
