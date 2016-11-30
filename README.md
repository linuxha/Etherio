# Etherio Readme

## Description

A very simple node.js module for use with and Elexol Ether IO 24 R board. It support turning a pin on and off.

## Background

This is another scratch an itch project (and while I'm at it lets learn some interesting technology). I have a rather old sprinkler system that is a pain to have to reset eveytime the power goes out. It's also quite limited in what it can do. My wife doesn't really want to replace it as it does just work but it's old and liable to give up the ghost at any minute (even if I need to help it). So I decided to learn to create a node.js module and this is it. The rather odd interface is because of the method I used in the node-irrigation app to keep track of the which nodes to turn on and off. I hope to add more and perhaps create a node-red module. First baby steps.

At this time I am using this module in my node.js node-irrigation app.

# Usage

```js
var Etherio = require('Etherio');
//
var eio = new Etherio("etherio24.uucp", 2424);

// There are 3 ports on the Ether IO 24 board, A, B, & C
// each port has 8 pins 0 thru 7
var z = {};
z.port = "A";
z.pin  = 7;

// Pass them as a JSON object
e.on(z);

//
e.off(z);

// This doesn't really work yet
e.ping();

```
### Etherio(host, port)
Creates a new `Etherio`. The parameter `host` can be an IP address or a FQDN. The `port` is the UDP port number the Ether IO device islistening on. Only works with `new`:

```js
var Etherio = require('Etherio');
//
var eio = new Etherio("etherio24.uucp", 2424);
```

## on(z)
Turn on a pin `z` is an JSON object consisting of a `port` ('A', 'B, or 'C') and `pin` (0 thru 7).

```js
var z  = {};
z.port = "A";
z.pin  = 7;

//
e.on(z);
```

## off(z)
Turn off a pin `z` is an JSON object consisting of a `port` ('A', 'B, or 'C') and `pin` (0 thru 7).

```js
var z  = {};
z.port = "A";
z.pin  = 7;

//
e.off(z);
```

## ping()
Ping device

# Notes
- https://www.elexol.com/
- https://www.elexol.com/IO_Modules/Ether_IO_24.php
- https://www.elexol.com/IO_Modules/USB_IO_24.php