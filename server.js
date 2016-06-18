var portastic = require('portastic');
var express			= require('express');
var app				= express();
var http			= require('http').Server(app);
var port			= process.env.PORT || 3000;

app.get('/getFreePort', function(req,res){
	portastic.find({
    min: 10000,
    max: 12000
  })
  .then(function(ports){
    res.send(ports[0].toString());
  });
});

http.listen(port, function(){
	console.log('Magic happens at port *' + port);
});