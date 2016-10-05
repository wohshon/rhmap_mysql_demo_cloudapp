var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fh = require('fh-mbaas-api');

function helloRoute() {
  var hello = new express.Router();
  hello.use(cors());
  hello.use(bodyParser());


  hello.get('/', function(req, res) {
    console.log(new Date(), 'In hello route GET / req.query=', req.query);
    var world = req.query && req.query.hello ? req.query.hello : '';
   fh.service({
      guid: "fnl6hxm3u6zb565kcnbgthnh",
      path: "/cloud/mysql",
      method: "POST",
      "params": {
          "query": "select * from demodb.customers where name like '%"+world+"%'"
      },
    }, function (error, response, body) {
      if (error) {
        return console.error('An error occured:', error);
      }
      console.log('Server responded with:', body);
      // see http://expressjs.com/4x/api.html#res.json
      var strResponse='';
      if (response.rows) {
        
        console.log(Object.keys(response)+'----------------------');
        strResponse='<table style="width:100%"><tr><th>ID</th><th>Name</th><th>Email</th></tr>';
        for (var i=0; i < response.rows.length;i++) {
            strResponse+='<tr>';
            strResponse+='<td>'+response.rows[i].id+'</td>';
            strResponse+='<td>'+response.rows[i].name+'</td>';
            strResponse+='<td>'+response.rows[i].email+'</td>';            
            strResponse+='</tr>';
        }
        strResponse+='</table>';
        if (response.rows.length==0) {
          strResponse='No matching records: '+world;
        }
      }
      else if (!response.rows || response.rows.length==0) {
        strResponse='No matching records: '+world;
      }
      res.json({msg: strResponse});
    });
  });

  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware
  hello.post('/', function(req, res) {
    console.log(new Date(), 'In hello route POST / req.body=', req.body);
    var world = req.body && req.body.hello ? req.body.hello : 'World';

    // see http://expressjs.com/4x/api.html#res.json
    res.json({msg: 'Hello ' + world});
  });

  return hello;
}

module.exports = helloRoute;
