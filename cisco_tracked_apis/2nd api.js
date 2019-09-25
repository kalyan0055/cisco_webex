var http = require("https");

var options = {
  "method": "POST",
  "hostname": "atlas-a.wbx2.com",
  "port": null,
  "path": "/admin/api/v1/users/activations",
  "headers": {
    "accept": "application/json",
    "authorization": "Bearer eyJhbGciOiJSUzI1NiJ9.eyJjbHVzdGVyIjoiUEY4NCIsInByaXZhdGUiOiJleUpqZEhraU9pSktWMVFpTENKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMklpd2lZV3huSWpvaVpHbHlJbjAuLk9jb0QwcWc2UG1idC1sUHUza2d1MHcuUFVIQnV4YkZRSVM5ZzVxUmZVdGNoUnFyYlM5Z2lHTnAyLWktOGx5UmxGR2psbENOc2NMcS1nQmhvcHB1SXUzbk1YcEpId2pOcjQ0dUF1ZWlOc3d1d1pzM1Z0eVFyQnJmUjZKOUlObDZmY1EuaEt0TE1kQUNjZHVvcEl4WWxnVVVqQSIsInRva2VuX2lkIjoiQWFaM3IwT1RWbU9XWTNZMkl0TXpneFlTMDBNR1V6TFRsbVptUXRNVFUyTkRjNFpXSTBaVEprWmpNeVlXVTNObUV0TlRObSIsImlzcyI6Imh0dHBzOlwvXC9pZGJyb2tlci53ZWJleC5jb21cL2lkYiIsInJlYWxtIjoiXC8iLCJ0b2tlbl90eXBlIjoiQmVhcmVyIiwiZXhwaXJ5X3RpbWUiOjE1NjQ3NDE2NzA4NzEsImNsaWVudF9pZCI6IkM5NmQzODlkNjMyYzk2ZDAzOGQ4ZjQwNGMzNTkwNGI1MTA4OTg4YmQ2ZDYwMWQ0YjQ3ZjRlZWM4OGE1NjlkNWRiIn0.HESuNveaFSRlaWjP-nVTBIRKERua7wztQUZ2mu0IveGNGxM0paOtgBIoah6-2a7fVFZDnlBMq-flo_OB8o_CF6vQujufhkQjVTguLFAw3X3Flovav1O3GqgcMqHCu5LOiyUJA_TTLQhjjTmKIo_IG9o0SdqhrEzQlPV4Qzq1ujaePJNYJRiqyT_GnmRljSTyfa0BPLbDLuagxavtDqtUlnwhs-W0qsabMp5hBJ8neQtgYviiy6ZR-JSNgMVaUTRPXyntHHXDatLPcb1fhEV3TPoi96Jr0buJSpO0gaTDx3iZ-1pT7Ma9kex-VqSpU5lCM4USxoFMR3nyAQayGf_8bw",
    "cisco-no-http-redirect": "true",
    "content-type": "application/json",
    "origin": "https://teams.webex.com",
    "referer": "https://web.ciscospark.com/activate?email=testuser4229%40hotmail.com&vt=i&t=BcHJEoIgAADQD%2BqgpS0cEXPBBdTJyWO4WykjCE5f33swC5EE98Dzp6G9pdhkV4bn8Bcm8jI4fRMX9NUL9wycRx0sUSGoZfT%2BdPTYil1b73EUf2B7QrqMgrXki2GOttRdjVT9RtXY9p5iqhFdebDIc86jUI6gwowUc6dRqojHIHb2DHwFn0DJJdwmtVY00agGkAwbRzT%2FAw%3D%3D",
    "spark-user-agent": "webex-js-sdk/1.72.2 (web)",
    "trackingid": "web-client_20c690a9-17fe-4e39-9dc5-049d09a48ef6_2",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
    "x-prelogin-userid": "undefined",
    "cache-control": "no-cache",
    "postman-token": "b8e012ff-1765-1084-8aa6-73cba4376480"
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

req.write(JSON.stringify({ email: 'testuser4229@hotmail.com',
  reqId: 'WEBCLIENT',
  suppressEmail: true }));
req.end();