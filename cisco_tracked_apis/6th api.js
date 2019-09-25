var qs = require("querystring");
var http = require("https");

var options = {
  "method": "POST",
  "hostname": "idbroker.webex.com",
  "port": null,
  "path": "/idb/oauth2/v1/access_token",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://teams.webex.com",
    "referer": "https://web.ciscospark.com/activate?email=testuser4229%40hotmail.com&vt=i&t=BcHJEoIgAADQD%2BqgpS0cEXPBBdTJyWO4WykjCE5f33swC5EE98Dzp6G9pdhkV4bn8Bcm8jI4fRMX9NUL9wycRx0sUSGoZfT%2BdPTYil1b73EUf2B7QrqMgrXki2GOttRdjVT9RtXY9p5iqhFdebDIc86jUI6gwowUc6dRqojHIHb2DHwFn0DJJdwmtVY00agGkAwbRzT%2FAw%3D%3D",
    "trackingid": "web-client_06f44fda-3d86-4c60-9955-06ea4135a9de_6",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
    "cache-control": "no-cache",
    "postman-token": "d418c31a-81fc-4819-3e13-4c7a6914742f"
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

req.write(qs.stringify({ grant_type: 'urn:cisco:oauth:grant-type:scope-reduction',
  token: 'eyJhbGciOiJSUzI1NiJ9.eyJjbHVzdGVyIjoiUEY4NCIsInByaXZhdGUiOiJleUpqZEhraU9pSktWMVFpTENKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMklpd2lZV3huSWpvaVpHbHlJbjAuLmtIakYwYTFxNVV2QjE5OG95Q2Z5aEEub1k4ZUxpUHMzSThxSjZWLTRhbDNEbE9yVlVNZmF2bDBHdS1GWC13aGE4bXg3d1ctOVlzdVhlNU44T1pPaTNLaUMxUFBpNmVCU3N4a1VhXzI0cng5RnNlTk0xNzdHTmRhQ1l4V0FRRkdNUjFUZXlLMURZd1gzTEZKalYzMEVQOUFYanNkb3F5aWduWEFOTVhFb1VLeGZXMlJwMm85UXpMY0lEak0wM3RYcDNCaXUweURsM3pPSEdGUWRRMXcyeFhLalI0OTFFRGZIZzVjaEI5aUJYU0w0VmpyZ0VEZTRfdGdVS1d6SFJ2Rm5hbVBDV3ZFVFBGZmpjREc3cTBsVFJla3QtQVlvcEV0MlZjcEx0QkZkbjk3OUVEaF9vazVDYS1wTDVacjVZTGRRZ2lnR0VJelU1VDVWOWRQcWZ6dmE3cTdwZGFOVmx3RmlyYVhJWVJoanMyOG4wQzdpYzEzR1MyN29zcE95R3lmaFJadzJrZ0dEbDEycnBZRFpPU1U0R3d2SlhmTTNvd2RzbUkydnZZX3dweGNlZzc0LTNDSzhCRU5UQ3BEZ1Z5ZDVNTS41LVM4SkRpNGNOVm5PM00wbVVKcnp3IiwidXNlcl90eXBlIjoidXNlciIsInRva2VuX2lkIjoiQWFaM3IwWVRjeFptSXhZall0WXpZNE1pMDBOVFJoTFdKalpqVXRNekZoWldGak0yWmxabVV6TVRRelpHWmxNek10WWpFMSIsInJlZmVyZW5jZV9pZCI6ImVkYzg2ODZmLWE1NzgtNGM4OC1iNTVmLTBhODY3MmY5ZTZlYiIsImlzcyI6Imh0dHBzOlwvXC9pZGJyb2tlci53ZWJleC5jb21cL2lkYiIsInVzZXJfbW9kaWZ5X3RpbWVzdGFtcCI6IjIwMTkwODAyMDc0NjMzLjcyMFoiLCJyZWFsbSI6ImE3OGEzNTBmLWE4NDgtNDFkYy1hOWUxLWY5ZTc0YzQwZDNjMCIsImNpc191dWlkIjoiZDk1ZDc2MTQtZjkzNS00NzZhLTk2NTctZTc3ZDFkMTIyY2JjIiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImV4cGlyeV90aW1lIjoxNTY0NzYwNTIxMTU1LCJjbGllbnRfaWQiOiJDOTZkMzg5ZDYzMmM5NmQwMzhkOGY0MDRjMzU5MDRiNTEwODk4OGJkNmQ2MDFkNGI0N2Y0ZWVjODhhNTY5ZDVkYiJ9.b5JgWPslSTsYtAyMD5d_ZjHuUvwhNn8yyC7M7sdV8x3HZ88gL48In7N_bfwbiQ0GTSuKjSbHbBdVk0aje9e2n8JVuxxK5Bqfdy5KP_RkFbtGA98nobkU_i3raGfwjHrgmeUv3nQOcV5Nuj82uWqYeg6xMIBsblx-HRX_VizebOopNWodoPcmo_REZtIt1y5QgtkM7yYP9TTXThzGymzxxdsN96UikkdQ_F-Nu22rUv-iw2M2x0fwznhlD0q5aUACjKoEZbR7dzxdMDtoI5UD3Y7_IEjNXRfZ52rSrzd_svJsKmGOmOjAtiOyDO7N78R0PFUG0n-gKCszxeypIVZoow',
  scope: 'Identity:SCIM spark:memberships_read spark:memberships_write spark:messages_read spark:messages_write spark:people_read spark:rooms_read spark:rooms_write webexsquare:get_conversation',
  client_id: 'C96d389d632c96d038d8f404c35904b5108988bd6d601d4b47f4eec88a569d5db' }));
req.end();