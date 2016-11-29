var assert  = require('assert'),
    Etherio = require('../Etherio');

// Test
// construct
// on
// off
// ping
describe('Etherio tests', function(){
    it('should not fail', function(done){
	var eio = Etherio('127.0.0.1', 2424); // It's UDP & we're not expecting a response
	assert(eio);
	var z = {};
	z.port = "A";		// We don't need the rest here
	z.pin  = 7;

	assert.strictEqual(eio.on(z), undefined);
	done();
    });

/*
  it('should subtract', function(done){
    assert.strictEqual(math.subtract(1,1), 0);
    assert.strictEqual(math.subtract(10,5), 5);
    assert.strictEqual(math.subtract(1,-1), 2);
    done();
  });
*/
});
