var portastic = require('portastic');
var express                     = require('express');
var app                         = express();
var http                        = require('http').Server(app);
var port                        = process.env.PORT || 3000;
var fs                          = require('fs-extra');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/getFreePort', function(req,res){
        portastic.find({
    min: 10000,
    max: 12000
  })
  .then(function(ports){
    res.send(ports[0].toString());
  });
});

app.post('/writeKey', function(req,res){
console.log(req.body);
fs.readFile('/home/master/.ssh/authorized_keys', 'utf8', function(err,data){
  var newKeySet = data + "\n" + req.body.key;
fs.writeFile('/home/master/.ssh/authorized_keys', newKeySet, function (err) {
      if (err) { throw err; }
      console.log('Success');
        res.send('Success');
    });

});
});

http.listen(port, function(){
	console.log('Magic happens at port *' + port);
});