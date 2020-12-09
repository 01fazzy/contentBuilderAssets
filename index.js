const express = require("express");
const app = express();
const path = require('path');
var http = require('http');
const port = process.env.PORT || 3000
var request = require('request');

app.get("*", (req,res) => {
      const ind=path.join(__dirname, 'public', 'index.html');
      res.sendFile(ind);
});
app.use(express.urlencoded({
  extended: true
}))


app.post('/stack',function(req,res){
  var tmp = req.body.SourceClientID;
  var tmp1 = req.body.SourceClientSecret;
  var tmp2 = req.body.SourceMID;

  console.log(tmp)  // stackoverflow0
  console.log(tmp1)  // stackoverflow1
  console.log(tmp2)
})







app.listen(port, () => {
   console.log('Example app is listening on port http://localhost:${port}');
});