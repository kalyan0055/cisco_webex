var http = require("https");

var options = {
  "method": "POST",
  "hostname": "metrics.a6.ciscospark.com",
  "port": null,
  "path": "/metrics/api/v1/clientmetrics-prelogin",
  "headers": {
    "accept": "application/json",
    "authorization": "Bearer eyJhbGciOiJSUzI1NiJ9.eyJjbHVzdGVyIjoiUEY4NCIsInByaXZhdGUiOiJleUpqZEhraU9pSktWMVFpTENKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMklpd2lZV3huSWpvaVpHbHlJbjAuLnR2RHZIZlp1R0JhcjlPcnVRVjh2c3cuQ1Q4TXpHalE0QnJfQUlkazUwaDdlU1ZWZElfZFp2V3g2eTVCVXppYmM3RGVxMk1FdXBrUnlmT2Z1dnBCaGlVajBPTGRKZll6YU1JZmNuMUs4VEdXbDVQaXdEOEtUZjIya2pqSmNRRzc3VGMuY3NWdm9XdnpDbklWbXBNNGRhd0QxUSIsInRva2VuX2lkIjoiQWFaM3IwTWpBNU5qVXlNRGN0WkdJME55MDBNbVU1TFRsaFpUVXROekV3Wm1aa01qVTVNR1F3TVRkak5qZGhOemN0TlRjMSIsImlzcyI6Imh0dHBzOlwvXC9pZGJyb2tlci53ZWJleC5jb21cL2lkYiIsInJlYWxtIjoiXC8iLCJ0b2tlbl90eXBlIjoiQmVhcmVyIiwiZXhwaXJ5X3RpbWUiOjE1NjQ3NjMzMzM0OTMsImNsaWVudF9pZCI6IkM5NmQzODlkNjMyYzk2ZDAzOGQ4ZjQwNGMzNTkwNGI1MTA4OTg4YmQ2ZDYwMWQ0YjQ3ZjRlZWM4OGE1NjlkNWRiIn0.LDKuB0l-qTRdLitKray60bR3amDQ_rRgW1xfEhKOW3_VuEBJj6aw_ZRc9xfq6Kw82Fq8LDtnli7YaHmkjOkR_K1paR5zL2uTVYM5BPq6RPh48khgvVMDLw30ciJI7ZF8eaKCtRXie1jV_4vZxVgyM8iUflKn6VrmjT0EwS8jB0Yqp-eR7UxECc3kqGLAHB0eHbDBeaZPBzOCCLPqXAc-zj8Vdazvd8Tm1mMZi0GvQyNfP83XQRfZkpLdMqpEF8BeWkH2NQ7PCbzy9sMzqzJh9zWuN91oo9U_HDErhFFFYopW6XtX3zbMffpMrC4j3xZPtAgwkdGZ6joA9PkgZctx7g",
    "cisco-device-url": "https://wdm-a.wbx2.com/wdm/api/v1/devices/8b4e2b9e-a51a-41a3-8b40-cf2335d9c0d5",
    "cisco-no-http-redirect": "true",
    "content-type": "application/json",
    "origin": "https://teams.webex.com",
    "referer": "https://teams.webex.com/create-password",
    "spark-user-agent": "webex-js-sdk/1.72.2 (web)",
    "trackingid": "web-client_115737b8-4578-4d08-8de4-3087cb5b3a88_13",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
    "x-prelogin-userid": "a0d1ee58-a191-44f0-87a8-c299b8263193",
    "cache-control": "no-cache",
    "postman-token": "19c3c118-eaf7-e0a8-60be-ddd15cf15226"
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

req.write(JSON.stringify({ metrics: 
   [ { metricName: 'Ob Entered Email',
       tags: 
        { success: true,
          wasUserCreated: false,
          orgHasDirectorySync: false,
          isSSOEnabled: false,
          usingThirdPartyOAuth: false,
          hasPassword: false,
          wasVerificationEmailTriggered: false,
          isSignUp: true,
          teamsDomain: 'teams.webex.com',
          project: 'Teams Web Client',
          version: '2.1370.0',
          testuser: false },
       fields: {},
       type: 'behavioral',
       context: 
        { browser: 'Chrome',
          browserVersion: '75.0',
          operatingSystem: 'Windows',
          platform: 'Web' },
       timestamp: 1564738212448 } ] }));
req.end();