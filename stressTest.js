'use strict';

var request = require('request');

for(var i = 5664; i <= 5684; i++) {
  var url = 'http://localhost:3000/hdoj/' + i;
  console.log(url);
  request.get(url);
}
