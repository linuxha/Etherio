exports = module.exports = Etherio;
// ----------------------------------------------------------------------------

/**
** Etherio constructor - for accessing the Etherio IO24R 24 port digital IO device
**
** Returns a new etherio object for the Elexol Etherio24R
**
** @param	ip host identifier (ip address or FQDN)
** @param	port number to communicate with the etherio device (default 2424)
**
** @returns	new etherio object
*/
function Etherio(ip, port) {
    var dgram = require('dgram');

    this.ip   = ip;             // Can be name or ipv4 address
    this.port = typeof b !== 'undefined' ? port : 2424;         // port number

    // this turns this into a public properties
    this.zone = []; // new Array();

    this.zone.A = 0; // this.zone['A'] = 0;
    this.zone.B = 0;
    this.zone.C = 0;

    // Note that we haven't connected to the device yet
    this.client = dgram.createSocket("udp4");

    // http://stackoverflow.com/questions/6475842/node-js-udp-dgram-handling-error-from-dns-resolution
    // listen for the error (hopefully this will resolve the issue of the uncaught dns error)
    this.client.on("error", function (err) {
	console.error("Socket error: " + err);
    });

    //
    this.client.on('message', function (message, remote) {
        console.info("The packet came back: " + message.toString('ascii', 0, rinfo.size));
    });

    // Technically, since it's UDP, we never connect to the device but when a
    // packet is sent it's done in the on, off and ping methods

    /*
    ** TODO: Need to add the device init sequence here.
    **
    ** set the IO ports to Out
    **
    ** # 0 for output
    ** # 1 for input
    ** #
    ** # echo -e '!A\x00!B\x00!C\x00' | nc -w 2 -u etherio24.uucp 2424 | od -x
    ** 0000000
    ** send A\x00 B\x00 C\x00
    ** recv nothing
    ** # echo -e '!a!b!c' | nc -w 2 -u etherio24.uucp 2424 | od -x
    ** 0000000 0a43 4121 2100 0042 4321 0000
    ** 0000013
    ** A = 41
    */
}

/**
** on - turns on a particular Elexol EtherIO port/pin combination
**
** @param	zone object
**
** @returns	nothing
**
** TODO Eventually I'll turn this into a Node.js module
**
** var Etherio = require('./Etherio'); // At the moment I need to give it the full path, don't know why ./Etherio doesn't work
** var e = new Etherio('ettherio.uucp', 2424);
**
** var z = {};
** z.name = "Program 1";
** z.zone = 8;
** z.port = "A";
** z.pin  = 7;
** 
** e.on(z);
**
** Okay now how do we assign the pins?
**
**
*/
Etherio.prototype.on = function(zone) {
    var val              = (1<<zone.pin);              // Ex. Pin 3 becomes 0000 0100 or 0x04
    val                  = this.zone[zone.port] | val; // Turn on the bit and leave on the existing bits
    this.zone[zone.port] = val;                        // Turn on the bit and leave on the existing bits

    data = new Buffer(3);

    data.write(zone.port, 0);
    //* @FIXED: When we send an 80 (1000 0000) we get a C2 (1100 0010)
    data.write(String.fromCharCode(val&0x00FF), 1, "binary");
    data.write('\n', 2);

    this.client.send(data, 0, data.length, this.port, this.ip);
}

/**
** off - turns on a particular Elexol EtherIO port/pin combination
**
** @param	zone object
**
** @returns	nothing
**
*/
Etherio.prototype.off = function(zone) {
    var val              = ((~(1<<(zone.pin))) & 0x00FF);
    val                  = this.zone[zone.port] & val;  // Turn off the bit and leave on the existing bits
    this.zone[zone.port] = val;                         // Turn off the bit and leave on the existing bits

    data = new Buffer(3);

    data.write(zone.port, 0);
    data.write(String.fromCharCode(val&0x00FF), 1, "binary");
    data.write('\n', 2);

    this.client.send(data, 0, data.length, this.port, this.ip);
}

/**
** ping - validates that the Elexol Ether IO device is available 
**
** @param	none
**
** @returns	true if we get a proper ping repsonse, false othewise
**
*/
Etherio.prototype.ping = function() {
	// in addition to sending a UDP request
	// we need to 'wait' for a UDP response
	// TODO: build send and receive logic/code
	return true;
};

// ----------------------------------------------------------------------------
