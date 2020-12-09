const express = require("express");
const app = express();
const path = require('path');
var http = require('http');
const port = process.env.PORT || 3000
var request = require('request');
const { stringify } = require("querystring");

app.get("*", (req,res) => {
      const ind=path.join(__dirname, 'public', 'index.html');
      res.sendFile(ind);
});
app.use(express.urlencoded({
  extended: true
}))


app.post('/stack',function(req,res){

  var SourceClientID = req.body.SourceClientID;
  var SourceClientSecret = req.body.SourceClientSecret;
  var SourceAuthBaseURI = req.body.SourceAuthBaseURI;
  var SourceMID = req.body.SourceMID;

  var DestinationClientID = req.body.DestinationClientID;
  var DestinationClientSecret = req.body.DestinationClientSecret;
  var DestinationAuthBaseURI = req.body.DestinationAuthBaseURI;
  var DestinationMID = req.body.DestinationMID;

  

  request.post({
    headers: {'content-type' : 'application/json'},
    url:     SourceAuthBaseURI + '/v2/token',
    body:JSON.stringify({
          'client_id': SourceClientID, //pass Client ID
          'client_secret': SourceClientSecret, //pass Client Secret
          'grant_type': 'client_credentials',
          'account_id': SourceMID
    })

  },function(error, response, body){
      //const ind2=path.join(__dirname, 'public', 'SFMC-DE.html');
      //res.sendFile(ind2);
      //console.log("body : " + JSON.stringify(body));
      console.log("body.access_token : " + JSON.stringify(body.access_token));
      console.log("body.access_token : " + stringify(body.access_token));
      console.log("body.access_token : " + body.access_token);
      console.log("body : " + JSON.stringify(body));
      console.log("body : " + stringify(body));
      console.log("body : " + body);
      //console.log("response.body.access_token : " + JSON.stringify(response.body.access_token));
      //console.log("response : " + JSON.stringify(response));
      //console.log("error : " + JSON.stringify(error));


  });


})







app.listen(port, () => {
   console.log('Example app is listening on port http://localhost:${port}');
});