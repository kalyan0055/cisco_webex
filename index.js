const ciscospark = require(`ciscospark`);

var express = require('express');
const bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var cors = require('cors');
var app = express();
var Request = require("request");
var jwt = require('jsonwebtoken');
var moment = require('moment');
var jwtBuilder = require( 'jwt-builder' );
var mongoose = require('mongoose');
const fs = require('fs');
 
// var modelsList = require('./models_list');
// console.log(modelsList,'looo')
  var ciscoRoutes = require('./views/cisco_api');
 
// var db = mongoose.connect('mongodb://127.0.0.1:27017/testDB',{ useNewUrlParser: true },function(err){
//     if(err) console.log('Couldnot connect to Db');
    
// })
var db = mongoose.connect("mongodb+srv://kalyan:sachin12@cluster0-08cqo.mongodb.net/knfcc?retryWrites=true&w=majority",{ useNewUrlParser: true },function(err){
    if(err) console.log('Couldnot connect to Db', err);
    
})
// Set up the path for the quickstart.
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const multer = require('multer')()
var frontEnd = path.join(__dirname, './views');
console.log(frontEnd, 'frontEnd');

app.use('/views', express.static(frontEnd));
app.use('/*.js', express.static(frontEnd));
// app.use(function(req, res, next){
//     console.log("Start");
//     req.setTimeout(0);
// 	  next();
//  });
// app.use(modelsList);
app.use(ciscoRoutes);

var ciscoObject;
var spark;
var guestValue;
var imei;
var actualToken;
var cisco_accessToken;

// app.use(function(req, res, next) {
//      spark = ciscospark.init({
//         config: {
//             phone: {
//               enableExperimentalGroupCallingSupport: true
//             }
//           },
//           credentials: {
//             access_token: "Bearer MGE1ZjlhMmMtYTQ3YS00M2U0LTljYTktYTM4NTllYjhmZmRlMWY3MTg4MjItMGI1_PF84_a78a350f-a848-41dc-a9e1-f9e74c40d3c0"
//           }
//     });

//      spark.once(`ready`, next);
//   });


 
 
 

app.get('/file', function (req, response) {
    // response.send('hello worlds');
    imei = req.query.imei;
    response.render('widget')
});

app.get('/', function (req, res) {
    // res.sendFile(frontEnd + '/index.html');
    // return a new array with value [2, 4]
    // guestValue = req.query.name;
    var id = req.query.id;
    console.log(req.query.id);




    let data3 = 'C96d389d632c96d038d8f404c35904b5108988bd6d601d4b47f4eec88a569d5db';
    let buff1 = new Buffer(data3, 'base64');
    let text = buff1.toString('ascii');


    console.log('"' + data3 + '" converted from Base64 to ASCII is "' + text + '"');

    let data2 = text;
    let buff = new Buffer.from(data2);
    let base64data = buff.toString('base64');

    console.log('"' + data2 + '" converted to Base64 is "' + base64data + '"');

    var data = [{
        "id": 1234, "fname": "Enter your first name?", "lname": "Enter your first name?", "mobile": "Enter your mobile",
        "email": "Enter your valid email", "addressline1": "Enter Address line 1", "addressline2": "Enter Address Line2",
        "zipcode": "Enter your zipcode", "country": "Enter your country name", "medical_plan_question": 'Choose below plans',
        "medical_plan_type": "free", "medical_plans": ['General', 'Ortho']
    },
    {
        id: 1235, fname: "Enter your first name?", lname: "Enter your first name?", mobile: "Enter your mobile",
        email: "Enter your valid email", addressline1: "Enter Address line 1", addressline2: "Enter Address Line2",
        zipcode: "Enter your zipcode", country: "Enter your country name", medical_plan_question: 'Choose below plans',
        medical_plan_type: "premium", medical_plans: ['General', 'Ortho', 'Dental', 'Gastro', 'Heart']
    }, {
        id: 1236,
        fname: "Enter your first name?", lname: "Enter your first name?", mobile: "Enter your mobile",
        email: "Enter your valid email", addressline1: "Enter Address line 1", addressline2: "Enter Address Line2",
        zipcode: "Enter your zipcode", country: "Enter your country name", medical_plan_question: 'Choose below plans',
        medical_plan_type: "both", medical_plans: ['General', 'Ortho', 'Dental', 'Gastro']
    }];
    var filterOne = data.filter(items => items.id == id);
    if (filterOne) {
        res.send({ success: true, data: text, data1: base64data })
    } else {
        res.send({ success: false, data: [] })
    }

});

app.get('/testings',function(req,res){  
console.log( 'TEST')

//   let d= res.redirect(301,'https://idbroker.webex.com/idb/saml2/jsp/doSSO.jsp?type=login&goto=https%3A%2F%2Fidbroker.webex.com%2Fidb%2Foauth2%2Fv1%2Fauthorize%3Fresponse_type%3Dcode%26client_id%3DCf3925e941f38aa743f42ab770ffaf1a522271d2994848c696ac0a107d6a89227%26redirect_uri%3Dhttps%253A%252F%252Fdeveloper.webex.com%252Fauth%252Fcode%26scope%3Dspark%253Aall%2520spark%253Aapplications_read%2520spark%253Aapplications_write%2520spark%253Abots_read%2520spark%253Abots_write%2520spark%253Acall_commands_write%2520spark%253Acalls_write%2520spark%253Adevices_read%2520spark%253Adevices_write%2520spark%253Amemberships_read%2520spark%253Amemberships_write%2520spark%253Amessages_read%2520spark%253Amessages_write%2520spark%253Aplaces_read%2520spark%253Apeople_read%2520spark%253Apeople_write%2520spark%253Arooms_read%2520spark%253Arooms_write%2520spark%253Asubscriptions_read%2520spark%253Asubscriptions_write%2520spark%253Ateam_memberships_read%2520spark%253Ateam_memberships_write%2520spark%253Ateams_read%2520spark%253Ateams_write%2520spark%253Axapi%2520spark-admin%253Acall_memberships_read%2520spark-admin%253Acall_qualities_read%2520spark-admin%253Acalls_read%2520spark-admin%253Acalls_write%2520spark-admin%253Adevices_read%2520spark-admin%253Adevices_write%2520spark-admin%253Ahybrid_connectors_read%2520spark-admin%253Ahybrid_clusters_read%2520spark-admin%253Alicenses_read%2520spark-admin%253Ametrics_read%2520spark-admin%253Aorganizations_read%2520spark-admin%253Apeople_read%2520spark-admin%253Apeople_write%2520spark-admin%253Aplaces_read%2520spark-admin%253Aplaces_write%2520spark-admin%253Apolicies_read%2520spark-admin%253Apolicies_write%2520spark-admin%253Aresource_group_memberships_read%2520spark-admin%253Aresource_group_memberships_write%2520spark-admin%253Aresource_groups_read%2520spark-admin%253Aroles_read%2520spark-compliance%253Aevents_read%2520spark-compliance%253Amessages_write%2520spark-compliance%253Amemberships_read%2520spark-compliance%253Amemberships_write%2520spark-compliance%253Amessages_read%2520spark-compliance%253Arooms_read%2520spark-compliance%253Ateam_memberships_read%2520spark-compliance%253Ateam_memberships_write%2520spark-compliance%253Ateams_read%2520audit%253Aevents_read%2520meeting%253Apreferences_read%2520meeting%253Apreferences_write%2520meeting%253Apreferences_read_write%2520meeting%253Arecordings_read%2520meeting%253Arecordings_write%2520meeting%253Arecordings_read_write%2520meeting%253Aschedules_read%2520meeting%253Aschedules_write%2520meeting%253Aschedules_read_write%2520identity%253Aplaceonetimepassword_create%2520Identity%253ASCIM%2520Identity%253AOAuthClient%2520%26cisService%3Dcommon%26state%3D931%26email%3D&cisService=common');
// console.log(d,'TEST')
  
        res.render('cisco_accept')
 
})

app.get('/guestUserToken', function (req, res) {
    guestValue = req.query.name;
    console.log(guestValue);
    var spark = ciscospark.init();
    var HEADER = {
        "alg": "HS256",
        "typ": "JWT"
    };
    var PAYLOAD = {
        "sub": "test",
        "name": guestValue,
        "iss": "Y2lzY29zcGFyazovL3VzL09SR0FOSVpBVElPTi8zMzFiNTNmYS01ZGNmLTQwYjUtYTMyMy0zYjVmZjEyMTM0NGY"
    }

    var secret = `bj4uJQ5iCsEfDOxVIibHlJXoAZkIt9UgwhZHeE5wsPA=`;
    var test = new Buffer.from(secret, 'base64')
    var token = jwt.sign(
        PAYLOAD,
        test
    );
    actualToken = token;
    console.log(token, 'real token');
    if (token) {
        res.send({
            success: true,
            jwtToken: token
        })
    } else {
        res.send({
            success: false,
            jwtToken: null
        })
    }

    // var token = 'your.guest.token.here';bj4uJQ5iCsEfDOxVIibHlJXoAZkIt9UgwhZHeE5wsPA=
    // wait until the SDK is loaded and ready
    // spark.once(`ready`, function () {
    //     spark.authorization.requestAccessTokenFromJwt({ jwt: token })
    //         .then((testToken) => {

    //             console.log(testToken, 'testToken');

    //             // if (token) {
    //             // Request.post({
    //             //     "headers": { "Authorization":`Bearer ${token}` },
    //             //     "url": "https://api.ciscospark.com/v1/messages",
    //             //     "body":JSON.stringify({roomId:"Y2lzY29zcGFyazovL3VzL1JPT00vYmNkNTcyMzAtNWI3Zi0xMWU5LWE3YTItYTlhYzYwZTY2MDMy",text: "This is message sent  by guest user" })
    //             //     }, (error, res, body) => {
    //             //         console.log(res , 'res server');
    //             //         if (error) {
    //             //             return false;
    //             //         } else {
    //             //             let data = JSON.parse(res.body);
    //             //             // if(data.Valid){
    //             //             return res.send({ notes: data, date: new Date(), status: true });
    //             //             // } else {
    //             //             //   return response.send({notes:'no active records found in userDevice for this imei', date:new Date(), status:false});
    //             //             // }

    //             //         }
    //             //     });
    //             // } else {
    //             //     res.send({ tok: 'Token not created' })
    //             // }
    //         })
    // });
});


app.get('/addNotes', function (req, res) {
    console.log(req.query.Notes, 'addNotes');
    console.log(imei, 'addNotes');
    Request.post({
        "headers": { "content-type": "application/json" },
        "url": "http://devapi.tracktechllc.com/tracktech/api/devicedata/UpdateNotes",
        "body": JSON.stringify({ Notes: req.query.Notes, imei: imei })
    }, (error, response, body) => {
        console.log(body);
        if (error) {
            return false;
        } else {
            return res.send(true);
        }
    });
});
app.get('/getNotes', function (req, res) {
    console.log(req.query.Notes, 'GetNotes');
    console.log(imei, 'GetNotes');

    Request.get({
        "headers": { "content-type": "application/json" },
        "url": "http://devapi.tracktechllc.com/tracktech/api/devicedata/GetAllVTCNotes?imei=" + imei,
    }, (error, response, body) => {
        console.log(res.body, 'res server');
        if (error) {
            return false;
        } else {
            let data = JSON.parse(response.body);
            if (data.Valid) {
                let prev_notes = []
                data.Items.forEach(item => {
                    prev_notes.push({ notes: item.Notes, date: item.DateTimeStamp })
                });
                return res.send({ notes: prev_notes, date: new Date(), status: true });
            } else {
                return res.send({ notes: 'no active records found in userDevice for this imei', date: new Date(), status: false });
            }

        }
    });
});


app.get('/getGoogleFormsData', function (req, res) {
    console.log(req.query.p_id, 'GetNotes');
    console.log(imei, 'GetNotes');
    var data = [{
        id: 1234,
        fname: "Enter your first name?",
        lname: "Enter your first name?",
        mobile: "Enter your mobile",
        email: "Enter your valid email",
        addressline1: "Enter Address line 1",
        addressline2: "Enter Address Line2",
        zipcode: "Enter your zipcode",
        country: "Enter your country name",
        medical_plan_question: 'Choose below plans',
        medical_plan_type: "free",
        medical_plans: ['General', 'Ortho']
    },
    {
        id: 1235,
        fname: "Enter your first name?",
        lname: "Enter your first name?",
        mobile: "Enter your mobile",
        email: "Enter your valid email",
        addressline1: "Enter Address line 1",
        addressline2: "Enter Address Line2",
        zipcode: "Enter your zipcode",
        country: "Enter your country name",
        medical_plan_question: 'Choose below plans',
        medical_plan_type: "premium",
        medical_plans: ['General', 'Ortho', 'Dental', 'Gastro', 'Heart']
    }, {
        id: 1236,
        fname: "Enter your first name?",
        lname: "Enter your first name?",
        mobile: "Enter your mobile",
        email: "Enter your valid email",
        addressline1: "Enter Address line 1",
        addressline2: "Enter Address Line2",
        zipcode: "Enter your zipcode",
        country: "Enter your country name",
        medical_plan_question: 'Choose below plans',
        medical_plan_type: "both",
        medical_plans: ['General', 'Ortho', 'Dental', 'Gastro']
    }];
    Request.get({
        "headers": { "content-type": "application/json" },
        "url": "http://devapi.tracktechllc.com/tracktech/api/devicedata/GetAllVTCNotes?imei=" + imei,
    }, (error, response, body) => {
        console.log(res.body, 'res server');
        if (error) {
            return false;
        } else {
            let data = JSON.parse(response.body);
            if (data.Valid) {
                let prev_notes = []
                data.Items.forEach(item => {
                    prev_notes.push({ notes: item.Notes, date: item.DateTimeStamp })
                });
                return res.send({ notes: prev_notes, date: new Date(), status: true });
            } else {
                return res.send({ notes: 'no active records found in userDevice for this imei', date: new Date(), status: false });
            }

        }
    });
});


app.get('/token_Access', function (req, res) {
    ciscoObject = ciscospark.init({
        credentials: {
            access_token: 'Bearer MGE1ZjlhMmMtYTQ3YS00M2U0LTljYTktYTM4NTllYjhmZmRlMWY3MTg4MjItMGI1_PF84_a78a350f-a848-41dc-a9e1-f9e74c40d3c0'
        }
    });
    console.log(ciscoObject, 'ciscoObject');

    if (ciscoObject) {
        res.send({
            status: true,
            event: ciscoObject.sessionId,
            result: 'Connected'
        });
    } else {
        res.send({
            status: false,
            event: 'Button click works',
            result: 'Disconnected'
        });
    }
});


app.get('/createTeam', function (req, res) {
    ciscoObject.teams.create({ name: 'someteam' }).then(team => {
        console.log(team, 'is created team');
        return res.send({
            status: true,
            message: 'Team Created'
        })
    }).catch((err) => {
        if (err) {
            res.send({
                status: false,
                message: err
            })
        }
    })
})
// // iscospark.teams.list({max: 3});
// app.get('/getTeams', function (req, res) {
//     ciscoObject.teams.list({ max: 10 }).then(function (teams) {
//         console.log(teams, 'list of teams');
//         res.send({
//             status: true,
//             message: 'list of teams',
//             data: teams
//         })
//     }).catch((err) => {
//         if (err) {
//             res.send({
//                 status: false,
//                 message: err,
//                 data: []
//             })
//         }
//     });
// })


app.get('/getTeams1', function (request, response) {
    Request.get({
        "headers": { "Authorization": 'Bearer ODEzMDAzYzgtMjM5Yi00OTI5LWEwNmYtOTIyMDc1NjFmODYwNTI5NzU0MmQtMWMx_PF84_a78a350f-a848-41dc-a9e1-f9e74c40d3c0' },
        "url": "https://api.ciscospark.com/v1/teams"
        // "body": JSON.stringify({Notes:request.query.Notes,imei:userRoom})
    }, (error, res, body) => {
        console.log(res.body, 'res server');
        if (error) {
            return false;
        } else {
            let data = JSON.parse(res.body);
            // if(data.Valid){
            return response.render('index', { data: data, date: new Date(), status: true })
            //  response.send({ notes: data, date: new Date(), status: true });
            // } else {
            //   return response.send({notes:'no active records found in userDevice for this imei', date:new Date(), status:false});
            // }

        }
    });
});

app.get('/createTeam', async function (request, response) {
    // var response = await ciscoWeb_ApiCall('https://api.ciscospark.com/v1/teams', 'POST', { name: 'TEST_TEAM3' })
    Request.post({
        "headers": { "Content-type": "Application/json", "Authorization": 'Bearer ODEzMDAzYzgtMjM5Yi00OTI5LWEwNmYtOTIyMDc1NjFmODYwNTI5NzU0MmQtMWMx_PF84_a78a350f-a848-41dc-a9e1-f9e74c40d3c0' },
        "url": "https://api.ciscospark.com/v1/teams",
        "body": JSON.stringify({ name: 'TEST_TEAM3' })
    }, (error, res, body) => {
        console.log(res.body, 'res server');
        if (error) {
            return false;
        } else {
            let data = JSON.parse(res.body);
            // if(data.Valid){

            return response.send({ notes: data, date: new Date(), status: true });
            // } else {
            //   return response.send({notes:'no active records found in userDevice for this imei', date:new Date(), status:false});
            // }

        }
    });
});

app.get('/getTeams', async function (request, response) {
    // var response = await ciscoWeb_ApiCall('https://api.ciscospark.com/v1/teams', 'POST', { name: 'TEST_TEAM3' })
    Request.get({
        "headers": { "Content-type": "Application/json", "Authorization": 'Bearer MGE1ZjlhMmMtYTQ3YS00M2U0LTljYTktYTM4NTllYjhmZmRlMWY3MTg4MjItMGI1_PF84_a78a350f-a848-41dc-a9e1-f9e74c40d3c0' },
        "url": "https://api.ciscospark.com/v1/teams"
    }, (error, res, body) => {
        console.log(res.body, 'res server');
        if (error) {
            return false;
        } else {
            let team = JSON.parse(res.body);
            // response.render('index', { data: data.items, date: new Date(), status: true })
            Request.get({
                "headers": { "Content-type": "Application/json", "Authorization": 'Bearer MGE1ZjlhMmMtYTQ3YS00M2U0LTljYTktYTM4NTllYjhmZmRlMWY3MTg4MjItMGI1_PF84_a78a350f-a848-41dc-a9e1-f9e74c40d3c0' },
                "url": "https://api.ciscospark.com/v1/team/memberships?teamId=Y2lzY29zcGFyazovL3VzL1RFQU0vNWE2ZjBiNDAtNWY1MC0xMWU5LTlhYzMtMzNmOGJmMGJhOGVm",
            }, (error, res, body) => {
                console.log(res.body, 'res server');
                if (error) {
                    return false;
                } else {
                    let team_members = JSON.parse(res.body);
                    Request.get({
                        "headers": { "Content-type": "Application/json", "Authorization": 'Bearer MGE1ZjlhMmMtYTQ3YS00M2U0LTljYTktYTM4NTllYjhmZmRlMWY3MTg4MjItMGI1_PF84_a78a350f-a848-41dc-a9e1-f9e74c40d3c0' },
                        "url": "https://api.ciscospark.com/v1/rooms?teamId=Y2lzY29zcGFyazovL3VzL1RFQU0vNWE2ZjBiNDAtNWY1MC0xMWU5LTlhYzMtMzNmOGJmMGJhOGVm"
                    }, (error, res, body) => {
                        console.log(res.body, 'res server');
                        if (error) {
                            return false;
                        } else {
                            let room = JSON.parse(res.body);
                            // if(data.Valid){
                            return response.render('index', {
                                team: team.items,
                                team_members: team_members.items,
                                room: room.items,
                                date: new Date(),
                                status: true
                            })
                            // return response.send({
                            //      team: team.items,
                            //      team_members:team_members.items,
                            //      room :room.items,
                            //      date: new Date(),
                            //       status: true });
                        }
                    });

                }
            });
            // return response.send({ notes: data, date: new Date(), status: true });
            // } else {
            //   return response.send({notes:'no active records found in userDevice for this imei', date:new Date(), status:false});
            // }

        }
    });
});

app.get('/getDetailsBySelection', async function (request, response) {
    // var response = await ciscoWeb_ApiCall('https://api.ciscospark.com/v1/teams', 'POST', { name: 'TEST_TEAM3' })
    console.log(request.query);

    let jsid = request.query.id;
    var team_members;
    var room;
    await Request.get({
        "headers": { "Content-type": "Application/json", "Authorization": 'Bearer MGE1ZjlhMmMtYTQ3YS00M2U0LTljYTktYTM4NTllYjhmZmRlMWY3MTg4MjItMGI1_PF84_a78a350f-a848-41dc-a9e1-f9e74c40d3c0' },
        "url": "https://api.ciscospark.com/v1/teams"
    }, async (error, res, body) => {
        console.log(res.body, 'res server');
        if (error) {
            return false;
        } else {
            let team = JSON.parse(res.body);
            let teamId;
            // response.render('index', { data: data.items, date: new Date(), status: true })
            if (team.items) {
                teamId = team.items.filter(item => item.id == jsid);
                var url = "https://api.ciscospark.com/v1/team/memberships?teamId=" + teamId;
                var userDetails;
                var retData = initialize(url);

                retData.then(function (result) {
                    userDetails = result;
                    if (userDetails.errors.length > 0) {
                        team_members = [];

                        return response.render('index', {
                            team: (team.items) ? team.items : [],
                            team_members: [],
                            room: [],
                            date: new Date(),
                            status: true
                        })
                    }
                    console.log("Initialized user details");
                    // Use user details from here
                    console.log(userDetails)

                }, function (err) {
                    console.log(err);
                })

            }

        }
    });
});
function initialize(url) {
    // Setting URL and headers for request
    var options = {
        "headers": { "Content-type": "Application/json", "Authorization": 'Bearer MGE1ZjlhMmMtYTQ3YS00M2U0LTljYTktYTM4NTllYjhmZmRlMWY3MTg4MjItMGI1_PF84_a78a350f-a848-41dc-a9e1-f9e74c40d3c0' },
        "url": url
    };
    // Return new promise 
    return new Promise(function (resolve, reject) {
        // Do async job
        Request.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })

}

function main(url) {
    var initializePromise = initialize(url);
    initializePromise.then(function (result) {
        userDetails = result;

        console.log("Initialized user details");
        // Use user details from here
        console.log(userDetails)
        return userDetails;
    }, function (err) {
        console.log(err);
    })
}
app.get('/getTeamMemberships', async function (request, response) {
    // var response = await ciscoWeb_ApiCall('https://api.ciscospark.com/v1/teams', 'POST', { name: 'TEST_TEAM3' })
    console.log(request.query, 'query');

    Request.get({
        "headers": { "Content-type": "Application/json", "Authorization": 'Bearer MGE1ZjlhMmMtYTQ3YS00M2U0LTljYTktYTM4NTllYjhmZmRlMWY3MTg4MjItMGI1_PF84_a78a350f-a848-41dc-a9e1-f9e74c40d3c0' },
        "url": "https://api.ciscospark.com/v1/team/memberships?teamId=Y2lzY29zcGFyazovL3VzL1RFQU0vNWE2ZjBiNDAtNWY1MC0xMWU5LTlhYzMtMzNmOGJmMGJhOGVm",
    }, (error, res, body) => {
        console.log(res.body, 'res server');
        if (error) {
            return false;
        } else {
            let data = JSON.parse(res.body);
            // if(data.Valid){
            return response.send({ notes: data, date: new Date(), status: true });
            // } else {
            //   return response.send({notes:'no active records found in userDevice for this imei', date:new Date(), status:false});
            // }

        }
    });
});

app.get('/getRooms', async function (request, response) {
    // var response = await ciscoWeb_ApiCall('https://api.ciscospark.com/v1/teams', 'POST', { name: 'TEST_TEAM3' })
    Request.get({
        "headers": { "Content-type": "Application/json", "Authorization": 'Bearer MGE1ZjlhMmMtYTQ3YS00M2U0LTljYTktYTM4NTllYjhmZmRlMWY3MTg4MjItMGI1_PF84_a78a350f-a848-41dc-a9e1-f9e74c40d3c0' },
        "url": "https://api.ciscospark.com/v1/rooms",
        // "body": JSON.stringify({ name: 'TEST_TEAM3' })
    }, (error, res, body) => {
        console.log(res.body, 'res server');
        if (error) {
            return false;
        } else {
            let data = JSON.parse(res.body);
            // if(data.Valid){
            return response.send({ notes: data, date: new Date(), status: true });
            // } else {
            //   return response.send({notes:'no active records found in userDevice for this imei', date:new Date(), status:false});
            // }
        }
    });
});


function ciscoWeb_ApiCall(url, method, body) {
    switch (method) {
        case 'POST':
            Request.post({
                "headers": { "Authorization": 'Bearer ODEzMDAzYzgtMjM5Yi00OTI5LWEwNmYtOTIyMDc1NjFmODYwNTI5NzU0MmQtMWMx_PF84_a78a350f-a848-41dc-a9e1-f9e74c40d3c0' },
                "url": url,
                "body": JSON.stringify(body)
            }, (error, res, body) => {
                console.log(res.body, 'res server');
                if (error) {
                    return false;
                } else {
                    let data = JSON.parse(res.body);
                    return data;
                }
            });
            break;
        case 'GET':
            Request.get({
                "headers": { "Authorization": 'Bearer ODEzMDAzYzgtMjM5Yi00OTI5LWEwNmYtOTIyMDc1NjFmODYwNTI5NzU0MmQtMWMx_PF84_a78a350f-a848-41dc-a9e1-f9e74c40d3c0' },
                "url": url
            }, (error, res, body) => {
                console.log(res.body, 'res server');
                if (error) {
                    return false;
                } else {
                    let data = JSON.parse(res.body);
                    return data;
                }
            });
            break;
        default:
            break;
    }
}

app.get('/testCall', function (req, res) {
    // ciscoObject = ciscospark.init({
    //     credentials: {
    //         access_token: 'Bearer MGE1ZjlhMmMtYTQ3YS00M2U0LTljYTktYTM4NTllYjhmZmRlMWY3MTg4MjItMGI1_PF84_a78a350f-a848-41dc-a9e1-f9e74c40d3c0'
    //     }
    // });
    // console.log(ciscoObject, 'ciscoObject');
    connect();
    if (ciscoObject) {
        res.send({
            status: true,
            event: ciscoObject.sessionId,
            result: 'Connected'
        });
    } else {
        res.send({
            status: false,
            event: 'Button click works',
            result: 'Disconnected'
        });
    }
});

app.post('/callback', function (req, res) {
    // res.send('hello worlds');
    console.log(req.body, 'from FITBIT');
    res.send({
        success: true,
        jwtToken: '12345'
    })
});

function connect() {
    console.log('Connect calling')
    if (!spark) {
        spark = ciscospark.init({
            config: {
                phone: {
                    enableExperimentalGroupCallingSupport: true
                }
            },
            credentials: {
                access_token: "Bearer MGE1ZjlhMmMtYTQ3YS00M2U0LTljYTktYTM4NTllYjhmZmRlMWY3MTg4MjItMGI1_PF84_a78a350f-a848-41dc-a9e1-f9e74c40d3c0"
            }
        });
        console.log('first if')
    }

    if (!spark.phone.registered) {
        console.log('second if')
        spark.phone.on('call:incoming', (call) => {
            Promise.resolve()
                .then(() => {
                    if (call.from && call.from.personId) {
                        console.log('second if inner', call)
                        return spark.people.get(call.from.personId);
                    }

                    return Promise.resolve();
                })
                .then((person) => {
                    const str = person ? `Anwser incoming call from ${person.displayName}` : 'Answer incoming call';

                    if (confirm(str)) {
                        call.answer();
                        bindCallEvents(call);
                    }
                    else {
                        call.decline();
                    }
                })
                .catch((err) => {
                    console.error(err);
                    alert(err);
                });
        });

        return spark.phone.register()
            .then(() => {
                // document.body.classList.add('listening');

                // document.getElementById('connection-status').innerHTML = 'connected';
            })
            .catch((err) => {
                console.error(err);
                alert(err.stack);
                throw err;
            });
    }

    return Promise.resolve();
}


app.get('/Dailer', async function (request, response) {
    // Dailer()
    let builder = jwtBuilder()
                .nbf()             // can't be used before current time
                .exp( 3600 )       // expire in 1 hour
                .algorithm( 'HS256' )
                .secret( '2WZICT7VBYFJU5AP9Y0GGQJMXZJ4FEKYBK052K0K19WYLD75L8YRAZ2NONGDYM39PB5YG217AOWNDVC0110DV5534WPVXA7LVWBTAH5J82WEXXORHZMDIJ4YR53K3YLHUY5TIFYK0OE9V4RI2DSAQJ8TOANKX6A4O5M34QFN1WG2OGAQO9NU5IMU5BHOZ6G34DUSJLSQY0PU065ZUXJ61X6CMIS58CGHJ66BYOMVJ6HPCFI2VG77QUSEQC4KRF5Z6LLZ5TB3YV8ZOIEH1LA7PIZPX400RKJHJ6CLJNOEGC6IM37XAX2SLAJXUJNNMVKO75PLBSR4XIA4PWU528B2JT' );

                let tokenUser1 = builder.claims( {
                    apikey:'e1d49e83-569a-4820-a123-fa67942a1963',
                    aud: 'ram',
                    iss: 'https://api.webex.com/gapi/registerapikey'
                }).headers( {
                    typ: 'JWT'
                }).build();


    let d = new Date();
    console.log(moment(d).add(moment.duration(2,'hours')).format('x'));
    console.log(moment(d).add(moment.duration(4,'hours')).format('x'));
var secret = "tttttttttttttttttssssf";
    moment().format();
    var referer = "https://web.ciscospark.com/activate?email=testuser4229%40hotmail.com&vt=i&t=BcHJEkMwAADQD3KwtCmOaGKZWoIIbtVoMWYapJr6%2Br7n4NATNgyQPw29leUXEY5HFhBmmI0kHVmBtzQKkZsJ9KvVh1hbWxkhtWlp3onWRfDp7FtJqYlSud2pSOr6tcIxNqqAO1zelGw3YTKSua4ZFtMZqBvzDA1BZRlAeny5r84c0xIFXnGie8L1z1K5NtsfsIh%2B8bvo%2FT8%3D";
    var urlDecode = decodeURI(referer);
 
    // (new URL(document.location)).searchParams;
let params =  decodeURI(referer)
  .replace('?', '&')
  .split('&')
  .map(param => param.split('='))
  .reduce((values, [ key, value ]) => {
    values[ key ] = value
    return values
  }, {})
    console.log(urlDecode)   
    response.send({
        data:params.t,
        decodedData:decodeURIComponent(params.t),
        email:decodeURIComponent(params.email),
        token:tokenUser1
    })
});



function Dailer() {
    const call = spark.phone.dial('Y2lzY29zcGFyazovL3VzL1JPT00vOTZmODkwMjAtNWY1Mi0xMWU5LWIzNDYtZDNlNTA3OTcyNTE5');
    // Call our helper function for binding events to calls
    bindCallEvents(call);
}


function bindCallEvents(call) {
    console.log('bindCallEvents', call)
    call.on('error', (err) => {
        console.error(err);
        alert(err.stack);
    });
    call.once('localMediaStream:change', () => {
        // document.getElementById('self-view').srcObject = call.localMediaStream;
    });

    call.on('remoteMediaStream:change', () => {
        [
            'audio',
            'video'
        ].forEach((kind) => {
            if (call.remoteMediaStream) {
                const track = call.remoteMediaStream.getTracks().find((t) => t.kind === kind);

                if (track) {
                    //   document.getElementById(`remote-view-${kind}`).srcObject = new MediaStream([track]);
                }
            }
        });
    });

    // Once the call ends, we'll want to clean up our UI a bit
    call.on('inactive', () => {
        // Remove the streams from the UI elements
        // document.getElementById('self-view').srcObject = undefined;
        // document.getElementById('remote-view-audio').srcObject = undefined;
        // document.getElementById('remote-view-video').srcObject = undefined;
    });

    // Of course, we'd also like to be able to end the call:
    // document.getElementById('hangup').addEventListener('click', () => {
    //   call.hangup();
    // });
}


app.get('/createPerson', async function (req, response) {
    // var response = await ciscoWeb_ApiCall('https://api.ciscospark.com/v1/teams', 'POST', { name: 'TEST_TEAM3' })
    guestValue = req.query.name;
    console.log(guestValue);

    var spark = ciscospark.init();


    var HEADER = {
        "alg": "HS256",
        "typ": "JWT"
    };
    var PAYLOAD = {
        "sub": "test",
        "name": guestValue,
        "iss": "Y2lzY29zcGFyazovL3VzL09SR0FOSVpBVElPTi8zMzFiNTNmYS01ZGNmLTQwYjUtYTMyMy0zYjVmZjEyMTM0NGY"
    }

    var secret = `bj4uJQ5iCsEfDOxVIibHlJXoAZkIt9UgwhZHeE5wsPA=`;
    var test = new Buffer.from(secret, 'base64')
    var token = jwt.sign(
        PAYLOAD,
        test
    );
    actualToken = token;
    var token1 = actualToken;
    // wait until the SDK is loaded and ready
    spark.once(`ready`, function () {
        spark.authorization.requestAccessTokenFromJwt({ jwt: token1 })
            .then((res) => {
                console.log(res, 'res server');
                // the user is now authenticated with a guest token (JWT)
                // proceed with your app logic
                // Request.post({
                //     "headers": { "Content-type": "Application/json", "Authorization": `Bearer ${actualToken}` },
                //     "url": "https://api.ciscospark.com/v1/people",
                //     "body": JSON.stringify({ emails: 'rambabu90@yahoo.com',displayName:'RB',firstName:'ram',lastName:'emandi',avatar:null,orgId:null,roles:null,licenses:null })
                // }, (error, res, body) => {
                //     console.log(res.body, 'res server');
                //     if (error) {
                //         return false;
                //     } else {
                //         let data = JSON.parse(res.body);
                //         return response.send({ notes: data, date: new Date(), status: true });
                //     }
                // });
            })
    });

});

app.get('/createUsers',async function(req,res){
     console.log(req.body);
     
    Request.post({
        "headers":
        {
        "Authorization": "Bearer MzNjYjMxZDgtZWYxNy00ZGZkLThkMjUtZWQ4NWFiMGFjODc1MjUwYWJmNzQtMGVm_PF84_a78a350f-a848-41dc-a9e1-f9e74c40d3c0",
        "content-type": "application/json"
        },
        "url": "https://api.ciscospark.com/v1/people",
        "body": JSON.stringify({
            "emails":"testuser4229@gmail.com",
            "displayName":"GU",
            "firstName":"Gmail",
            "lastName":"User"
            })
    }, (error, resesponse, body) => {
        if (error) {
            console.log(error, 'cisco error');
            return false;
        } else {
            console.log(JSON.stringify(resesponse));
            return  res.send({
                status:200,
                response: resesponse
            })
        }
    })
})
app.post('/activateUser', function (req, res) {
    var tempToken;
    var tempToken1;
    let d = new Date();
    var referer = "https://web.ciscospark.com/activate?email=testuser4229%40gmail.com&vt=i&t=BcFJFoIgAADQA7nICdOlU%2BAsgqUuU54maS%2FHuH3%2F2zhwN8tHNzgOzExjj%2B0kdXdkgNFBpGiSZE1C3qnaYC1rSCuZ5dkQ9Qy%2FeRQv4vKJeQvMswpmZTfuD6LVDBfIqv1cTyZgC4fTqW91uEHJX78w0umcdUcmb7%2F5qCkR0qs8FU110JXbYMNmEzxRKJn77FkKgaIVJcR%2F";
    var params =  decodeURI(referer)
    .replace('?', '&')
    .split('&')
    .map(param => param.split('='))
    .reduce((values, [ key, value ]) => {
      values[ key ] = value
      return values
    }, {})
    // console.log(params.t)                                                                         
    // 1st api call
    Request.post({
        "headers":
        {
            "authorization": "Basic Qzk2ZDM4OWQ2MzJjOTZkMDM4ZDhmNDA0YzM1OTA0YjUxMDg5ODhiZDZkNjAxZDRiNDdmNGVlYzg4YTU2OWQ1ZGI6YjExYzNlOTZhMGQ1MWY2NmZmOTY4NjIyMGI3NGUyYzBmNmM2Yzc2MzZiYmE5OGI3MWNhNWRiYmY1ZDY4OTZkNg==",
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://teams.webex.com",
            "referer": referer,
            "trackingid":"web-client_20c690a9-17fe-4e39-9dc5-049d09a48ef6_1",
            "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
        },
        "url": "https://idbroker.webex.com/idb/oauth2/v1/access_token",
        "body": "grant_type=client_credentials&scope=webexsquare%3Aadmin&self_contained_token=true"
    }, (error, resesponse, body) => {
        if (error) {
            console.log(error, 'cisco error');
            return false;
        } else {
            let data = JSON.parse(resesponse.body);
            console.log(JSON.stringify(data));
            // 2nd api call
            Request.post({
                "headers":
                {
                    "authorization": "Bearer " + data.access_token,
                    "Content-Type": "application/json",
                    "Origin": "https://teams.webex.com",
                    "Referer": referer,
                    "trackingid": "web-client_fe622da5-52f4-4197-b616-ac6e5468ca06_1",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36"
                },
                "url": "https://atlas-a.wbx2.com/admin/api/v1/users/activations",
                "body": JSON.stringify({
                    "email": decodeURIComponent(params.email),
                    "reqId": "WEBCLIENT",
                    "suppressEmail": true
                })

            }, (error, resesponse, body) => {
                if (error) {
                    console.log(error, 'cisco error');
                    return false;
                } else {
                    // 3rd api call
                    let data = JSON.parse(resesponse.body);
                    console.log(JSON.stringify(data),'2ND API CALL RESULT')
                    Request.post({
                        "headers":
                        {
                            "authorization": "Basic Qzk2ZDM4OWQ2MzJjOTZkMDM4ZDhmNDA0YzM1OTA0YjUxMDg5ODhiZDZkNjAxZDRiNDdmNGVlYzg4YTU2OWQ1ZGI6YjExYzNlOTZhMGQ1MWY2NmZmOTY4NjIyMGI3NGUyYzBmNmM2Yzc2MzZiYmE5OGI3MWNhNWRiYmY1ZDY4OTZkNg==",
                            "content-type": "application/x-www-form-urlencoded",
                            "origin": "https://teams.webex.com",
                            "referer": referer,
                            "trackingid": "web-client_06f44fda-3d86-4c60-9955-06ea4135a9de_1",
                            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
                        },
                        "url": "https://idbroker.webex.com/idb/oauth2/v1/access_token",
                        "body": "grant_type=client_credentials&scope=webexsquare%3Aadmin&self_contained_token=true"

                    }, (error, resesponse, body) => {
                        if (error) {
                            console.log(error, 'cisco error');
                            return false;
                        } else {
                             
                    let data = JSON.parse(resesponse.body);
                    console.log(JSON.stringify(data),'3RD API CALL RESULT')
                            // 4th api call
                            Request.post({
                                "headers":
                                {
                                    "accept": "application/json",
                                    "authorization": "Basic Qzk2ZDM4OWQ2MzJjOTZkMDM4ZDhmNDA0YzM1OTA0YjUxMDg5ODhiZDZkNjAxZDRiNDdmNGVlYzg4YTU2OWQ1ZGI6YjExYzNlOTZhMGQ1MWY2NmZmOTY4NjIyMGI3NGUyYzBmNmM2Yzc2MzZiYmE5OGI3MWNhNWRiYmY1ZDY4OTZkNg==",
                                    "cisco-no-http-redirect": "true",
                                    "content-type": "application/json",
                                    "origin": "https://teams.webex.com",
                                    "referer": referer,
                                    "spark-user-agent": "webex-js-sdk/1.72.2 (web)",
                                    // "trackingid": "web-client_06f44fda-3d86-4c60-9955-06ea4135a9de_3",
                                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
                                },
                                "url": "https://idbroker.webex.com/idb/token/v1/actions/UserActivation/invoke",
                                "body": JSON.stringify({
                                    "scope": "webexsquare:get_conversation Identity:SCIM spark:kms spark:people_read spark:rooms_read spark:rooms_write spark:memberships_read spark:memberships_write spark:messages_read spark:messages_write",
                                    "verificationToken": decodeURIComponent(params.t)
                                })

                            }, (error, resesponse, body) => {
                                if (error) {
                                    console.log(error, 'cisco error');
                                    return false;
                                } else {
                                    // 5th api call
                                    let data = JSON.parse(resesponse.body);
                                    console.log(JSON.stringify(data),'4th api call result');
                                    console.log(JSON.stringify(data.tokenData.refresh_token,'4th api call result'));
                                    
                                    Request.post({
                                        "headers":
                                        {
                                            "authorization": "Basic Qzk2ZDM4OWQ2MzJjOTZkMDM4ZDhmNDA0YzM1OTA0YjUxMDg5ODhiZDZkNjAxZDRiNDdmNGVlYzg4YTU2OWQ1ZGI6YjExYzNlOTZhMGQ1MWY2NmZmOTY4NjIyMGI3NGUyYzBmNmM2Yzc2MzZiYmE5OGI3MWNhNWRiYmY1ZDY4OTZkNg==",
                                            "content-type": "application/x-www-form-urlencoded",
                                            "origin": "https://teams.webex.com",
                                            "referer": referer,
                                            // "trackingid": "web-client_06f44fda-3d86-4c60-9955-06ea4135a9de_4",
                                            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
                                        },
                                        "url": "https://idbroker.webex.com/idb/oauth2/v1/access_token",
                                        "body":"grant_type=refresh_token&redirect_uri=https%3A%2F%2Fteams.webex.com&refresh_token="+data.tokenData.refresh_token
                                        
                                           // PREVIOUS RESULT REFRESH TOKEN 
                                    }, (error, resesponse, body) => {
                                        if (error) {
                                            console.log(error, 'cisco error');
                                            return false;
                                        } else {
                                            // 6th api call 
                                            let data = JSON.parse(resesponse.body);
                                            console.log(JSON.stringify(data),'5th api call result');
                                            Request.post({
                                                "headers":
                                                {
                                                    "content-type": "application/x-www-form-urlencoded",
                                                    "origin": "https://teams.webex.com",
                                                    "referer": referer,
                                                 //   "trackingid": "web-client_06f44fda-3d86-4c60-9955-06ea4135a9de_6",
                                                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
                                                },
                                                "url": "https://idbroker.webex.com/idb/oauth2/v1/access_token",
                                                "body": "grant_type=urn%3Acisco%3Aoauth%3Agrant-type%3Ascope-reduction&token="+data.access_token+"&scope=Identity%3ASCIM%20spark%3Amemberships_read%20spark%3Amemberships_write%20spark%3Amessages_read%20spark%3Amessages_write%20spark%3Apeople_read%20spark%3Arooms_read%20spark%3Arooms_write%20webexsquare%3Aget_conversation&client_id=C96d389d632c96d038d8f404c35904b5108988bd6d601d4b47f4eec88a569d5db"
                                                // JSON.stringify({
                                                //     "grant_type": "urn:cisco:oauth:grant-type:scope-reduction",
                                                //     "token": data.access_token,
                                                //     "scope": "Identity:SCIM spark:memberships_read spark:memberships_write spark:messages_read spark:messages_write spark:people_read spark:rooms_read spark:rooms_write webexsquare:get_conversation",
                                                //     "client_id": "C96d389d632c96d038d8f404c35904b5108988bd6d601d4b47f4eec88a569d5db"
                                                // })   // PREVIOUS RESULT REFRESH TOKEN 

                                            }, (error, resesponse, body) => {
                                                if (error) {
                                                    console.log(error, 'cisco error');
                                                    return false;
                                                } else {
                                                    // 7th api call 
                                                    let data = JSON.parse(resesponse.body);
                                                    tempToken = data.access_token; 
                                                    console.log(JSON.stringify(data),'6th api call result');

                                                    Request.post({
                                                        "headers":
                                                        {
                                                            "accept": "application/json",
                                                            "authorization": "Bearer " + data.access_token,
                                                            "cisco-no-http-redirect": "true",
                                                            "content-type": "application/json",
                                                            "origin": "https://teams.webex.com",
                                                            "referer": referer,
                                                            "spark-user-agent": "webex-js-sdk/1.72.2 (web)",
                                                        //  "trackingid": "web-client_06f44fda-3d86-4c60-9955-06ea4135a9de_7",
                                                            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
                                                        },
                                                        "url": "https://metrics-a.wbx2.com/metrics/api/v1/clientmetrics",
                                                        "body": JSON.stringify({ "metrics": [{ "metricName": "Ob Activation Processed", "tags": { "success": true, "teamsDomain": "teams.webex.com", "project": "Teams Web Client", "version": "2.1370.0", "testuser": false }, "fields": {}, "type": "behavioral", "context": { "browser": "Chrome", "browserVersion": "75.0", "operatingSystem": "Windows", "platform": "Web" }, "timestamp": 1564738201288 }] })   // PREVIOUS RESULT REFRESH TOKEN 

                                                    }, (error, resesponse, body) => {
                                                        if (error) {
                                                            console.log(error, 'cisco error');
                                                            return false;
                                                        } else {
                                                            // 8th api call  
                                                            // let data = JSON.parse(resesponse.body);
                                                            // console.log(JSON.stringify(resesponse.body),'7th api call result');
                                                            // let data = JSON.parse(resesponse.body);
                                                              console.log('7th api call result');
                                                            Request.post({
                                                                "headers":
                                                                {
                                                                    "accept": "application/json",
                                                                    "authorization": "Bearer " + tempToken,
                                                                    "cisco-no-http-redirect": "true",
                                                                    "content-type": "application/json",
                                                                    "origin": "https://teams.webex.com",
                                                                    "referer": referer,
                                                                    "spark-user-agent": "webex-js-sdk/1.72.2 (web)",
                                                            //        "trackingid": "web-client_06f44fda-3d86-4c60-9955-06ea4135a9de_7",
                                                                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
                                                                },
                                                                "url": "https://wdm-a.wbx2.com/wdm/api/v1/devices",
                                                                "body": JSON.stringify({ "name": "browser", "deviceType": "WEB", "model": "DESKTOP", "localizedModel": "DESKTOP", "systemName": "DESKTOP", "systemVersion": "2.1370.0", "capabilities": { "sdpSupported": true, "groupCallSupported": true } })   // PREVIOUS RESULT REFRESH TOKEN 

                                                            }, (error, resesponse, body) => {
                                                                if (error) {
                                                                    console.log(error, 'cisco error');
                                                                    return false;
                                                                } else {
                                                                    // 9th api call 
                                                                    let data = JSON.parse(resesponse.body);
                                                                    console.log(JSON.stringify(resesponse.body),'8th api call result');
                                                                     
                                                                    Request.get({
                                                                        "headers":
                                                                        {
                                                                            "authorization": "Bearer " + tempToken,
                                                                            "cisco-no-http-redirect": "true",
                                                                            "content-type": "application/json",
                                                                            "origin": "https://teams.webex.com",
                                                                            "referer": referer,
                                                                            "spark-user-agent": "webex-js-sdk/1.72.2 (web)",
                                                                        //    "trackingid": "web-client_06f44fda-3d86-4c60-9955-06ea4135a9de_7",
                                                                            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
                                                                        },
                                                                        "url": "https://conv.a6.ciscospark.com/conversation/api/v1/users"
                                                                         

                                                                    }, (error, resesponse, body) => {
                                                                        if (error) {
                                                                            console.log(error, 'cisco error');
                                                                            return false;
                                                                        } else {
                                                                            // 10th CALL
                                                                            let data = JSON.parse(resesponse.body);
                                                                            console.log(JSON.stringify(resesponse.body),'9th api call result');
                                                                            Request.post({
                                                                                "headers":
                                                                                {
                                                                                    "authorization": "Bearer " + tempToken,
                                                                                    "cisco-no-http-redirect": "true",
                                                                                    "content-type": "application/json",
                                                                                    "origin": "https://teams.webex.com",
                                                                                    "referer": referer,
                                                                                    "spark-user-agent": "webex-js-sdk/1.72.2 (web)",
                                                                                //    "trackingid": "web-client_06f44fda-3d86-4c60-9955-06ea4135a9de_7",
                                                                                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
                                                                                },
                                                                                "url": "https://atlas-a.wbx2.com/admin/api/v1/users/activations",
                                                                                "body":JSON.stringify({"reqId":"WEBCLIENT","email":decodeURIComponent(params.email),"preloginId":"null"})
                                                                                 
        
                                                                            }, (error, resesponse, body) => {
                                                                                if (error) {
                                                                                    console.log(error, 'cisco error');
                                                                                    return false;
                                                                                } else {
        // 11th CALL
        let data = JSON.parse(resesponse.body);
        console.log(JSON.stringify(resesponse.body),'10th api call result');
        Request.post({
            "headers":
            {
            "authorization": "Basic Qzk2ZDM4OWQ2MzJjOTZkMDM4ZDhmNDA0YzM1OTA0YjUxMDg5ODhiZDZkNjAxZDRiNDdmNGVlYzg4YTU2OWQ1ZGI6YjExYzNlOTZhMGQ1MWY2NmZmOTY4NjIyMGI3NGUyYzBmNmM2Yzc2MzZiYmE5OGI3MWNhNWRiYmY1ZDY4OTZkNg==",
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://teams.webex.com",
            "referer": "https://teams.webex.com/create-password",
            // "trackingid": "web-client_06f44fda-3d86-4c60-9955-06ea4135a9de_10",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
            },
            "url": "https://idbroker.webex.com/idb/oauth2/v1/access_token",
            "body":"grant_type=client_credentials&scope=webexsquare%3Aadmin&self_contained_token=true"
             

        }, (error, resesponse, body) => {
            if (error) {
                console.log(error, 'cisco error');
                return false;
            } else {
                // 12th api call
                let data = JSON.parse(resesponse.body);
                tempToken1 = data.access_token;
                console.log(JSON.stringify(resesponse.body),'11th api call result');
                Request.post({
                    "headers":
                    {
                    "content-type": "application/json; charset=utf-8",
                    "origin": "https://teams.webex.com",
                    "referer": "https://teams.webex.com/create-password",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
                    },
                    "url": "https://people.webex.com/app/webex/exchange",
                    "body":JSON.stringify(
                        {"access_token":tempToken,"expires_at":moment(d).add(moment.duration(4,'hours')).format('x')}
                    )
                    
        
                }, (error, resesponse, body) => {
                    if (error) {
                        console.log(error, 'cisco error');
                        return false;
                    } else {
                        // 13th api call
                        let data = JSON.parse(resesponse.body);
                        console.log(JSON.stringify(resesponse.body),'12th api call result');
                        Request.post({
                            "headers":
                            {
                                "accept": "application/json",
                                "authorization": "Bearer "+ tempToken,
                                "cisco-device-url": "https://wdm-a.wbx2.com/wdm/api/v1/devices/8b4e2b9e-a51a-41a3-8b40-cf2335d9c0d5",
                                "cisco-no-http-redirect": "true",
                                "content-type": "application/json",
                                "origin": "https://teams.webex.com",
                                "referer": "https://teams.webex.com/create-password",
                                "spark-user-agent": "webex-js-sdk/1.72.2 (web)",
                                // "trackingid": "web-client_115737b8-4578-4d08-8de4-3087cb5b3a88_11",
                                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
                                "x-prelogin-userid": "",
                            },
                            "url": "https://metrics.a6.ciscospark.com/metrics/api/v1/clientmetrics?alias=true",
                            "body":""
                             
                
                        }, (error, resesponse, body) => {
                            if (error) {
                                console.log(error, 'cisco error');
                                return false;
                            } else {
                                // 14th api call
                                // let data = JSON.parse(resesponse.body);
                                console.log('13th api call result');
                                Request.post({
                                    "headers":
                                    {
                                        "accept": "application/json",
                                        "authorization": "Bearer "+ tempToken,
                                        "cisco-device-url": "https://wdm-a.wbx2.com/wdm/api/v1/devices/8b4e2b9e-a51a-41a3-8b40-cf2335d9c0d5",
                                        "cisco-no-http-redirect": "true",
                                        "content-type": "application/json",
                                        "origin": "https://teams.webex.com",
                                        "referer": "https://teams.webex.com/create-password",
                                        "spark-user-agent": "webex-js-sdk/1.72.2 (web)",
                                        // "trackingid": "web-client_115737b8-4578-4d08-8de4-3087cb5b3a88_11",
                                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
                                        "x-prelogin-userid": "",
                                    },
                                    "url": "https://metrics.a6.ciscospark.com/metrics/api/v1/clientmetrics",
                                    "body":JSON.stringify({"metrics":[{"metricName":"Ob Viewed Create Password","tags":{"teamsDomain":"teams.webex.com","project":"Teams Web Client","version":"2.1370.0","testuser":false},"fields":{},"type":"behavioral","context":{"browser":"Chrome","browserVersion":"75.0","operatingSystem":"Windows","platform":"Web"},"timestamp":moment(d).add(moment.duration(4,'hours')).format('x')}]})
                                     
                        
                                }, (error, resesponse, body) => {
                                    if (error) {
                                        console.log(error, 'cisco error');
                                        return false;
                                    } else {
                                        // 15th api call
                                        // let data = JSON.parse(resesponse.body);
                                        console.log('14th api call result');
                                        Request.post({
                                            "headers":
                                            {
                                                "accept": "application/json",
                                                "authorization": "Bearer "+ tempToken1,
                                                "cisco-device-url": "https://wdm-a.wbx2.com/wdm/api/v1/devices/8b4e2b9e-a51a-41a3-8b40-cf2335d9c0d5",
                                                "cisco-no-http-redirect": "true",
                                                "content-type": "application/json",
                                                "origin": "https://teams.webex.com",
                                                "referer": "https://teams.webex.com/create-password",
                                                "spark-user-agent": "webex-js-sdk/1.72.2 (web)",
                                                // "trackingid": "web-client_115737b8-4578-4d08-8de4-3087cb5b3a88_11",
                                                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
                                                "x-prelogin-userid": "",
                                            },
                                            "url": "https://metrics.a6.ciscospark.com/metrics/api/v1/clientmetrics-prelogin",
                                            "body":JSON.stringify({"metrics":[{"metricName":"Ob Entered Email","tags":{"success":true,"wasUserCreated":false,"orgHasDirectorySync":false,"isSSOEnabled":false,"usingThirdPartyOAuth":false,"hasPassword":false,"wasVerificationEmailTriggered":false,"isSignUp":true,"teamsDomain":"teams.webex.com","project":"Teams Web Client","version":"2.1370.0","testuser":false},"fields":{},"type":"behavioral","context":{"browser":"Chrome","browserVersion":"75.0","operatingSystem":"Windows","platform":"Web"},"timestamp":moment(d).add(moment.duration(4,'hours')).format('x')}]})
                                             
                                
                                        }, (error, resesponse, body) => {
                                            if (error) {
                                                console.log(error, 'cisco error');
                                                return false;
                                            } else {
                                                // PASSWORD CALLS
                                                //16th api
                                                console.log('15th api call result');
                                                Request.post({
                                                    "headers":
                                                    {
                                                        "accept": "application/json",
                                                        "authorization": "Bearer "+ tempToken,
                                                        "cisco-device-url": "https://wdm-a.wbx2.com/wdm/api/v1/devices/8b4e2b9e-a51a-41a3-8b40-cf2335d9c0d5",
                                                        "cisco-no-http-redirect": "true",
                                                        "content-type": "application/json",
                                                        "origin": "https://teams.webex.com",
                                                        "referer": "https://teams.webex.com/create-password",
                                                        "spark-user-agent": "webex-js-sdk/1.72.2 (web)",
                                                        // "trackingid": "web-client_115737b8-4578-4d08-8de4-3087cb5b3a88_15",
                                                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
                                                        "x-prelogin-userid": "undefined",
                                                    },
                                                    "url": "https://atlas-a.wbx2.com/admin/api/v1/users/activations",
                                                    "body":JSON.stringify({"reqId":"WEBCLIENT","email":decodeURIComponent(params.email),"suppressEmail":true})
                                                }, (error, resesponse, body) => {
                                                    if (error) {
                                                        console.log(error, 'cisco error');
                                                        return false;
                                                    } else {
                                        // PASSWORD CALLS
                                                //17th api
                                                let data = JSON.parse(resesponse.body);
                                                console.log(JSON.stringify(resesponse.body),'16th api call result');
                                                let id = data.id;
                                                Request.patch({
                                                    "headers":
                                                    {
                                                        "accept": "application/json",
                                                        "authorization": "Bearer "+ tempToken,
                                                        "cisco-device-url": "https://wdm-a.wbx2.com/wdm/api/v1/devices/8b4e2b9e-a51a-41a3-8b40-cf2335d9c0d5",
                                                        "cisco-no-http-redirect": "true",
                                                        "content-type": "application/json",
                                                        "origin": "https://teams.webex.com",
                                                        "referer": "https://teams.webex.com/create-password",
                                                        "spark-user-agent": "webex-js-sdk/1.72.2 (web)",
                                                        // "trackingid": "web-client_115737b8-4578-4d08-8de4-3087cb5b3a88_15",
                                                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
                                                        "x-prelogin-userid": "undefined",
                                                    },
                                                    "url": "https://identity.webex.com/identity/scim/v1/Users/"+id,
                                                    "body":JSON.stringify({"schemas":["urn:scim:schemas:core:1.0","urn:scim:schemas:extension:cisco:commonidentity:1.0"],"password":"Techno@12"})
                                                }, (error, resesponse, body) => {
                                                    if (error) {
                                                        console.log(error, 'cisco error');
                                                        return false;
                                                    } else {
                                                        console.log('17th call');
                                                        let data = JSON.parse(resesponse.body);
                                                        console.log(data, '17th call');
                                                            
                                                    }
                                                });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

var server = http.createServer(app);
var port = process.env.PORT || 3002;
server.listen(port, function () {
    var datetime = new Date();
    console.log(datetime.toISOString());
    console.log('Express server running on *:' + port);
});