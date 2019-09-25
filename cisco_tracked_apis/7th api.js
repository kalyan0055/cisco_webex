var http = require("https");

var options = {
  "method": "POST",
  "hostname": "metrics-a.wbx2.com",
  "port": null,
  "path": "/metrics/api/v1/clientmetrics",
  "headers": {
    "accept": "application/json",
    "authorization": "Bearer eyJhbGciOiJSUzI1NiJ9.eyJjbHVzdGVyIjoiUEY4NCIsInByaXZhdGUiOiJleUpqZEhraU9pSktWMVFpTENKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMklpd2lZV3huSWpvaVpHbHlJbjAuLnhvMllqRjktbmJ6QzZ1dktDUVp5LUEuRU5JY1NERVNLenpmMVdzVDhpdkZnU2ZzWldHQUotSTJqQk1YcHhvTUItOW53bDZNR0tIY1pXSldUZzN0alZkb3RIX0VxNjJpX3FKX2RSY05VU3FyNFVqTmRxOUJwOHhEQktuTkdnRDhHZG5OWnNDRFF2UTg1UWl2MjFRaTRybkpPbDFUSy1yeHQ2RC1QUVpWQnlzTktncGpiaWkzb0Z4QkVhTGJuM2piazRJZWVmQWR3RzE0NmpvSC1GNHdxdmZQZFJyMm8xcmRFakd3U09rMmk1SndyVG5KTmg4b1RKcVdMZHZyVHQxMG84SVVhOEpkN3V4RjRZcUM5Mm1uOWNueGhIMGZjNzdGTVJjYTdLaGpvcURkX3JGcUJEUG5HbkstSEJrUXRhYlVRdTZadE1CMl9xVzJrRERvSnlWUTBaMGVWTFRHeGhOaWVZRFZ2dUtsX1Q2V0pYM3AzZEtyV1BjMDNaZkVEUkk2bEZ6a1hfZUNIVmk4NWd4SFdnWmlkVmlrT0o4Q3ZSNl9BNDNHZ2lnYzd1SjZndy5sYnFrSjd1cXdHQUR2eTVCYk1HQ1Z3IiwidXNlcl90eXBlIjoidXNlciIsInRva2VuX2lkIjoiQWFaM3IwTWpobE5qWTRORGd0WVRGbVpDMDBNREF6TFdGa04ySXRaamswWkRRMU4yUTJNek0zWTJRMk5UYzVObU10TnpFeiIsInJlZmVyZW5jZV9pZCI6ImVkYzg2ODZmLWE1NzgtNGM4OC1iNTVmLTBhODY3MmY5ZTZlYiIsImlzcyI6Imh0dHBzOlwvXC9pZGJyb2tlci53ZWJleC5jb21cL2lkYiIsInVzZXJfbW9kaWZ5X3RpbWVzdGFtcCI6IjIwMTkwODAyMDc0NjMzLjcyMFoiLCJyZWFsbSI6ImE3OGEzNTBmLWE4NDgtNDFkYy1hOWUxLWY5ZTc0YzQwZDNjMCIsImNpc191dWlkIjoiZDk1ZDc2MTQtZjkzNS00NzZhLTk2NTctZTc3ZDFkMTIyY2JjIiwidG9rZW5fdHlwZSI6IkJlYXJlciIsImV4cGlyeV90aW1lIjoxNTY0NzYxODQ5OTgyLCJjbGllbnRfaWQiOiJDOTZkMzg5ZDYzMmM5NmQwMzhkOGY0MDRjMzU5MDRiNTEwODk4OGJkNmQ2MDFkNGI0N2Y0ZWVjODhhNTY5ZDVkYiJ9.J5AIbSka2bSryFWfU8BY0zqORWOQXeuSabVwBmone5KT-OCjwxBeJ1FS2BZnK24kcOyV3ngeB-6hRt6-SwcUwtwk9RApmkClEBLPhZ4TRU20w3qc_Ex684W0M-RZiMDNC11THRnYNC1Nse4s8ffH-8HCEAg4HrtH2vtAQNyaohXehZUj-Kc2HU8mF5G1M5ZneRYA0VF4MqA7sNWyFnhnLQYmuOzmZCBREozXGJo6w5LuDdUBLOtjbrXgkV7k4dXNdCW4WIDJZjuqola4InPiuxEeGze9Y9OjAtNob1-ltkWGnainETEmueXFwra_AJKe9T3wwugUVhXpEDNLwOJHgQ",
    "cisco-no-http-redirect": "true",
    "content-type": "application/json",
    "origin": "https://teams.webex.com",
    "referer": "https://web.ciscospark.com/activate?email=testuser4229%40hotmail.com&vt=i&t=BcHJEoIgAADQD%2BqgpS0cEXPBBdTJyWO4WykjCE5f33swC5EE98Dzp6G9pdhkV4bn8Bcm8jI4fRMX9NUL9wycRx0sUSGoZfT%2BdPTYil1b73EUf2B7QrqMgrXki2GOttRdjVT9RtXY9p5iqhFdebDIc86jUI6gwowUc6dRqojHIHb2DHwFn0DJJdwmtVY00agGkAwbRzT%2FAw%3D%3D",
    "spark-user-agent": "webex-js-sdk/1.72.2 (web)",
    "trackingid": "web-client_06f44fda-3d86-4c60-9955-06ea4135a9de_7",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
    "cache-control": "no-cache",
    "postman-token": "750a0b7c-f1a9-9243-fd71-a0289c31e2b8"
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
   [ { metricName: 'Ob Activation Processed',
       tags: 
        { success: true,
          teamsDomain: 'teams.webex.com',
          project: 'Teams Web Client',
          version: '2.1367.0',
          testuser: false },
       fields: {},
       type: 'behavioral',
       context: 
        { browser: 'Chrome',
          browserVersion: '75.0',
          operatingSystem: 'Windows',
          platform: 'Web' },
       timestamp: 1564633809649 } ] }));
req.end();