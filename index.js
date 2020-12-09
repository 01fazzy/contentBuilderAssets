const express = require("express");
const app = express();
const path = require('path');
var http = require('http');
const port = process.env.PORT || 3000
var request = require('request');
const { stringify } = require("querystring");

app.get("*", (req,res) => {
      const FirstPage = path.join(__dirname, 'public', 'index.html');
      res.sendFile(FirstPage);
});
app.use(express.urlencoded({
  extended: true
}))



app.post('/stack', (req, res) => {
  var SourceClientID = req.body.SourceClientID;
  var SourceClientSecret = req.body.SourceClientSecret;
  var SourceAuthBaseURI = req.body.SourceAuthBaseURI;
  var SourceMID = req.body.SourceMID;

  var DestinationClientID = req.body.DestinationClientID;
  var DestinationClientSecret = req.body.DestinationClientSecret;
  var DestinationAuthBaseURI = req.body.DestinationAuthBaseURI;
  var DestinationMID = req.body.DestinationMID;

  var FirstNext = req.body.FirstNext;
  console.log("FirstNext : " + FirstNext);
      
  request.post({
    headers: {'content-type' : 'application/json'},
    url: SourceAuthBaseURI + '/v2/token',
    body:{
          'client_id': SourceClientID, //pass Client ID
          'client_secret': SourceClientSecret, //pass Client Secret
          'grant_type': 'client_credentials',
          'account_id':SourceMID
    },
    json: true
  }, 
  function(error, response, body){
    console.log("Source Access : "+body.access_token);
    //console.log("body" + body); 
  });


  request.post({
    headers: {'content-type' : 'application/json'},
    url: DestinationAuthBaseURI + '/v2/token',
    body:{
          'client_id': DestinationClientID, //pass Client ID
          'client_secret': DestinationClientSecret, //pass Client Secret
          'grant_type': 'client_credentials',
          'account_id':DestinationMID
    },
    json: true
  }, 
  function(error, response, body){
    console.log("Destination Access : "+body.access_token);
    //console.log("body" + body); 
  });


  const SecondPage = path.join(__dirname, 'public', 'SecondPage.html');
  res.sendFile(SecondPage);


  //return res.redirect('/SecondPage.html');
  //res.writeHead(301,
  //  {Location: 'http://www.google.com'}
  //);
  //res.end();

})












app.listen(port, () => {
   console.log('Example app is listening on port http://localhost:${port}');
});