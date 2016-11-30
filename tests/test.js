var assert  = require('assert'),
    Etherio = require('../Etherio');

// Test
// construct
// on
// off
// ping
describe('Etherio tests', function(){
    var eio = new Etherio('127.0.0.1', 2424); // It's UDP & we're not expecting a response
    var z  = {};
    z.port = "A";		// We don't need the rest here
    z.pin  = 7;

    it('Constructor test', function(done){
	assert(eio);

	done();
    });

    it('on function test', function(done){
	assert(eio.on(z));

	done();
    });
});
