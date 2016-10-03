var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

function helloRoute() {
  var hello = new express.Router();
  hello.use(cors());
  hello.use(bodyParser());


// GET REST endpoint - query params may or may not be populated
 hello.get('/', function(req, res) {
   console.log(new Date(), 'In hello route GET / req.query=', req.query);
   var world = req.query && req.query.hello ? req.query.hello : 'World';
  fh.service({
     guid: "fnl6hxm3u6zb565kcnbgthnh",
     path: "/cloud/mysql",
     method: "POST",
     "params": {
         "query": "select * from demodb.customers"
     },
   }, function (error, response, body) {
     if (error) {
       return console.error('An error occured:', error);
     }
     console.log('Server responded with:', body);
     // see http://expressjs.com/4x/api.html#res.json
     res.json({msg: response});
   });
 });

  return hello;
}

module.exports = helloRoute;
