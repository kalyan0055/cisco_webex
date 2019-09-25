var qs = require("querystring");
var http = require("https");

var options = {
  "method": "POST",
  "hostname": "idbroker.webex.com",
  "port": null,
  "path": "/idb/oauth2/v1/access_token",
  "headers": {
    "authorization": "Basic Qzk2ZDM4OWQ2MzJjOTZkMDM4ZDhmNDA0YzM1OTA0YjUxMDg5ODhiZDZkNjAxZDRiNDdmNGVlYzg4YTU2OWQ1ZGI6YjExYzNlOTZhMGQ1MWY2NmZmOTY4NjIyMGI3NGUyYzBmNmM2Yzc2MzZiYmE5OGI3MWNhNWRiYmY1ZDY4OTZkNg==",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://teams.webex.com",
    "referer": "https://teams.webex.com/create-password",
    "trackingid": "web-client_06f44fda-3d86-4c60-9955-06ea4135a9de_10",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
    "cache-control": "no-cache",
    "postman-token": "7387c164-7745-417c-83fd-4dc3148b27c5"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(qs.stringify({ grant_type: 'client_credentials',
  scope: 'webexsquare:admin',
  self_contained_token: 'true' }));
req.end();