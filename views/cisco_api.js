var express = require('express');
var ciscoRouter = express.Router();
var mongoose = require('mongoose');
var cisco_token = require('../models/cisco_token.model');
var Users = require('../models/cisco_user.model');
var cisco_stuff = require('../models/cisco_stuff.model');
var Request = require("request");
var path = require('path');
var authorizeObject = {
    response_type: "code", client_id: "C78ad21af720c8e03b53bcc84fdfdc9536106b550113a089fe1a92d10816f50bf", redirect_uri: "https://tracktechllc.com/", scope: "scope:all", state: "aszxqw",
    client_secret: '95ded01f711b71ec9a5be90afb8fab2a4fe48f4242129d8deec96ab102bf7f1a'
}

ciscoRouter.get('/adduser', async (req,res) =>{
    // console.log(req)
    let temp = {name:'test2',mobile:8987366677,email:'test2@gmail.com'}
    let userS = new Users(temp)
    userS.save(function(err){
        if(err){
            return res.send({
                status:false,
                data:[]
            })
        } else {
            return res.send({
                status:true,
                data:userS
            })
        }
    })
})


ciscoRouter.get('/receiveCiscoToken', async (req, res) => {
    let code = req.query.code;
    let pmid =  req.query.pmid;
    console.log(code,'---',pmid)
       if(code && pmid){
            // HERE WE ARE USING AUTHORIZAION CODE FROM ABOVE API and PASS THAT CODE TO GENERATE ACCESS TOKEN
          //   let code = JSON.parse(body);
          Request.post({
              "headers": {"Content-Type": "application/x-www-form-urlencoded"},
              "url": "https://api.ciscospark.com/v1/access_token",
              "body": `grant_type=authorization_code&client_id=${authorizeObject.client_id}&client_secret=${authorizeObject.client_secret}&code=${code}&redirect_uri=${authorizeObject.redirect_uri}`
          }, async (error, result, apibody) => {
              console.log(apibody, ' ACCESS TOKEN');
              if (error) {
                  // console.log(apibody, ' AERRROR');
                  return res.status(400).send({
                      Valid: false,
                      Msg: error
                  })
              } else {
                  // HERE WE ARE SAVING ACCESS TOKEN IN DATABASE
                  console.log( ' sucesssssssss');
                  let apiData = apibody; 
                  let savingAccessToken = await saveAccessToken_toDB(apiData,pmid);
                  let isSaved = JSON.parse(savingAccessToken);
                  console.log(isSaved,'Test')
                  if(isSaved.Valid){                                    
                      let header = { "Content-Type": "application/json","Authorization":"Bearer "+isSaved.Item.ciscoToken.access_token }
                      let newTeam = await creatTeam(header,{name:isSaved.Item.pmName +' Room'})
                      console.log(newTeam,'newTeam before parse');
                      let teamId = JSON.parse(newTeam);
                      let newRoom = await creatRooom(header,{teamId:teamId.id,title:isSaved.Item.pmName})
                      let rooomId = JSON.parse(newRoom);
                      console.log(rooomId,'rooomId after parse');
                  //     let splitMembers = isSaved.Item.participants.toString();
                  //    let tM = req.body.teamMembers.split(',');
                      let tM = isSaved.Item.teamMemberships;
                      var memberShips = []
                     console.log(tM,'TMM');
                     for (let i = 0; i < tM.length; i++) {
                         const element = tM[i];
                         let newTeamMemberShips = await creatTeamMemberships(header,{teamId:teamId.id,personEmail:tM[i],isModerator:true});
                         memberShips.push(newTeamMemberShips);
                         console.log(newTeamMemberShips,'TMM'+i);
                     }
                     let ciscoStuff = {teamName:teamId.name,teamId:teamId.id,roomName:rooomId.title,roomId:rooomId.id,teamMemberships:tM,pmId:pmid};
                     // ciscoStuff = {...ciscoStuff,teamId,rooomId,teamMemberships:tM};
                     console.log(ciscoStuff,'ciscoStuff')
                     
                      if((teamId.id) && (rooomId.id) && (tM.length == memberShips.length)){
                          return res.status(200).send({
                              Valid: true,
                              Item: ciscoStuff
                          })
                         } else {
                          return res.status(400).send({
                              Valid: false,
                              Msg: 'Room or Team is not created'
                          }) 
                         }
                        
                  //    })
                  }else{
                      return res.status(400).send({
                          Valid: false,
                          Msg: savingAccessToken
                      
                      })
                  }
               }
          });
          
       }else {
          return res.status(200).send({
              Valid: false,
              Msg: 'Not specified and Code or pmId in query params'
          
          })
       }

});



function saveAccessToken_toDB(apiData,pmid){
  return new Promise((resolve,reject)=>{
      Request.post({
          "headers": { "Content-Type": "application/json" },
          "url": "http://devapi.tracktechllc.com/tracktech//api/DeviceData/UpdateCiscoToken?pmId="+pmid ,
          "body": apiData
      }, async (error, result, accessToken) => {
          console.log(accessToken, 'ACCESS TOKEN IN DATABASE');
          if (error) {
              reject(error)
          } else {
              resolve(accessToken);
           }
      });
  })
  
}

function creatTeam(header,body){
  return new Promise((resolve, reject) => {
      Request.post({
          "headers": header,
          "url": "https://api.ciscospark.com/v1/teams",
          "body": JSON.stringify(body)
      }, async (error, result, body) => {
          console.log(body, 'res server');
          if (error) {
              return  reject(error);
          } else {
              return  resolve(body);
          }
      });
  })
}

function creatTeamMemberships(header,body){
return new Promise((resolve, reject) => {
  Request.post({
      "headers": header,
      "url": "https://api.ciscospark.com/v1/team/memberships",
      "body": JSON.stringify(body)
  }, async (error, result, body) => {
      console.log(body, 'res server');
      if (error) {
          return  reject(error);
      } else {
          return  resolve(body);
      }
  });
})
}
function creatRooom(header,body){
return new Promise((resolve, reject) => {
  Request.post({
      "headers": header,
      "url": "https://api.ciscospark.com/v1/rooms",
      "body": JSON.stringify(body)
  }, async (error, result, body) => {
      console.log(body, 'res server');
      if (error) {
          return  reject(error);
      } else {
          return  resolve(body);
      }
  });
})
}


ciscoRouter.get('/createCiscoStuff', (req, res) => {
  res.render('cisco_accept')
});

// Getting Latest Access Token from Database
ciscoRouter.get('/getaccessToken', (req, res) => {
  console.log(req.query)
  let pmId = req.query.pmId

  if (pmId) {
      Request.get({
          "headers": { "Content-Type": "application/json" },
          "url": "http://devapi.tracktechllc.com/tracktech/api/devicedata/GetCiscoRoomInfo?pmId="+pmId,
      }, async (error, result, body) => {
           console.log(error, 'res server');
           console.log(body, 'boy');

          if (error) {
              return res.status(400).json({
                  success: false,
                  jwtToken: body
              })
          } else if (body === 'null') {
              return res.status(400).json({
                  success: false,
                  jwtToken: body
              })
          } else {
              return res.status(200).json({
                  success: true,
                  jwtToken: body
              });
          }
      });

  }else {
      return res.status(400).json({
          success: false,
          message: 'Invalid Url'
      });
  }

});

ciscoRouter.get('/createRefreshToken', async (req, res) => {
  let refreshToken = req.query.refreshToken;
 console.log(refreshToken,'refreshToken');
  let newRefreshedToken = await creatAccessToken(refreshToken);
 console.log(newRefreshedToken,'newRefreshedToken');
// return res.send({ success :true , data: imei});
 try {
  if(newRefreshedToken){
      return res.send(
          newRefreshedToken
      )
 } else {
  return res.send({
      Valid: false,
      Item: null
  })
 }
     
 } catch (error) {
  return res.send({
      Valid: false,
      Item: error
  }) 
 }

});

function creatAccessToken(refreshToken) {
  return new Promise((resolve, reject) => {
      Request.post({
          "headers": { "Content-Type": "application/x-www-form-urlencoded" },
          "url": "https://api.ciscospark.com/v1/access_token",
          "body": `grant_type=refresh_token&client_id=${authorizeObject.client_id}&client_secret=${authorizeObject.client_secret}&refresh_token=${refreshToken}`
      }, async (error, result, body) => {
          console.log(error,'error');
          console.log(body,'body');
          if (error) {
              return reject(error);
          } else {
              return resolve(body);
          }
      });
  })
}


module.exports = ciscoRouter;




// grant_type=authorization_code&client_id=C78ad21af720c8e03b53bcc84fdfdc9536106b550113a089fe1a92d10816f50bf&client_secret=95ded01f711b71ec9a5be90afb8fab2a4fe48f4242129d8deec96ab102bf7f1a&code=NzgyM2NhYWQtNzc4OS00YjhhLTllYTctMDQzZmUyNThiZjEzNTljYjc2YTEtZDQ4_PF84_consumer&redirect_uri=https://tracktechllc.com/


// ciscoRouter.get('/testUrl', (req, res) => {
//     res.redirect(301, 'http://httpbin.org/ip')
// });

// To check whethere the user firstTime or not
// ciscoRouter.get('/verifyUser', (req, res) => {
//     console.log(req.query.username, 'rewusflsafdata');
//     userModel.find({ username: req.query.username }).sort({ _id: -1 }).limit(1).exec(async function (err, User) {
//         if (err) {
//             return res.status(400).send({
//                 status: false,
//                 data: [],
//                 message: errorHandler.getErrorMessage(err)
//             })
//         } else if (!User || User.length <= 0) {
//             console.log('comes to else if ');
//             let todayDate = new Date();
//             todayDate.toUTCString();
//             let tempUser = new userModel({ username: req.query.username, mobile: '9876987698', created_Date: todayDate.toUTCString() })
//             tempUser.save(function (err, result) {
//                 if (err) {
//                     return res.status(400).send({
//                         status: false,
//                         message: err,
//                         data: []
//                     })
//                 } else {
//                     let login = 'https://idbroker.webex.com/idb/saml2/jsp/doSSO.jsp?type=login&goto=https%3A%2F%2Fidbroker.webex.com%2Fidb%2Foauth2%2Fv1%2Fauthorize%3Fresponse_type%3Dcode%26client_id%3DCf3925e941f38aa743f42ab770ffaf1a522271d2994848c696ac0a107d6a89227%26redirect_uri%3Dhttps%253A%252F%252Fdeveloper.webex.com%252Fauth%252Fcode%26scope%3Dspark%253Aall%2520spark%253Aapplications_read%2520spark%253Aapplications_write%2520spark%253Abots_read%2520spark%253Abots_write%2520spark%253Acall_commands_write%2520spark%253Acalls_write%2520spark%253Adevices_read%2520spark%253Adevices_write%2520spark%253Amemberships_read%2520spark%253Amemberships_write%2520spark%253Amessages_read%2520spark%253Amessages_write%2520spark%253Aplaces_read%2520spark%253Apeople_read%2520spark%253Apeople_write%2520spark%253Arooms_read%2520spark%253Arooms_write%2520spark%253Asubscriptions_read%2520spark%253Asubscriptions_write%2520spark%253Ateam_memberships_read%2520spark%253Ateam_memberships_write%2520spark%253Ateams_read%2520spark%253Ateams_write%2520spark%253Axapi%2520spark-admin%253Acall_memberships_read%2520spark-admin%253Acall_qualities_read%2520spark-admin%253Acalls_read%2520spark-admin%253Acalls_write%2520spark-admin%253Adevices_read%2520spark-admin%253Adevices_write%2520spark-admin%253Ahybrid_connectors_read%2520spark-admin%253Ahybrid_clusters_read%2520spark-admin%253Alicenses_read%2520spark-admin%253Ametrics_read%2520spark-admin%253Aorganizations_read%2520spark-admin%253Apeople_read%2520spark-admin%253Apeople_write%2520spark-admin%253Aplaces_read%2520spark-admin%253Aplaces_write%2520spark-admin%253Apolicies_read%2520spark-admin%253Apolicies_write%2520spark-admin%253Aresource_group_memberships_read%2520spark-admin%253Aresource_group_memberships_write%2520spark-admin%253Aresource_groups_read%2520spark-admin%253Aroles_read%2520spark-compliance%253Aevents_read%2520spark-compliance%253Amessages_write%2520spark-compliance%253Amemberships_read%2520spark-compliance%253Amemberships_write%2520spark-compliance%253Amessages_read%2520spark-compliance%253Arooms_read%2520spark-compliance%253Ateam_memberships_read%2520spark-compliance%253Ateam_memberships_write%2520spark-compliance%253Ateams_read%2520audit%253Aevents_read%2520meeting%253Apreferences_read%2520meeting%253Apreferences_write%2520meeting%253Apreferences_read_write%2520meeting%253Arecordings_read%2520meeting%253Arecordings_write%2520meeting%253Arecordings_read_write%2520meeting%253Aschedules_read%2520meeting%253Aschedules_write%2520meeting%253Aschedules_read_write%2520identity%253Aplaceonetimepassword_create%2520Identity%253ASCIM%2520Identity%253AOAuthClient%2520%26cisService%3Dcommon%26state%3D851%26email%3D&cisService=common';
//                     // return res.status(200).send({
//                     //     status: true,
//                     //     message: req.body.username + 'added to DB`',
//                     //     data: result
//                     // })
//                     res.redirect(login)
//                 }

//             })

//         } else {
//             // res.render('cisco_accept')
//             let url = `https://api.ciscospark.com/v1/authorize?client_id=C5cac4dbf79e793fa53cbd70a7129d522049e633533b7c2e5e497781b156125c4&response_type=code&redirect_uri=http%3A%2F%2Fdevapi.tracktechllc.com%2Ftracktech%2F%2Fapi%2FDeviceData%2FUpdateCiscoCode&scope=spark%3Aall%20spark%3Akms&state=set_state_here`;

//             res.redirect(url)
//         }

//     });

// });



// ciscoRouter.get('/receiveCiscoToken', (req, res) => {
//     let code = req.query.code;
//     // HERE WE ARE  GETTING THE LATEST AUTHORIZAION CODE FROM DATABASE
//     //   Request.get({
//     //     "headers": { "Content-Type": "application/json" },
//     //     "url": "http://devapi.tracktechllc.com/tracktech//api/DeviceData/GetCiscoCode",
//     //        }, async (error, result, body) => {
//     //     console.log(body, 'AUTHORIZAION CODE'); 
//     //      if(error){
//     //         return res.status(400).send({
//     //             status: false,
//     //             data: [],
//     //             message: error
//     //         })
//     //      }else{
//     // HERE WE ARE USING AUTHORIZAION CODE FROM ABOVE API and PASS THAT CODE TO GENERATE ACCESS TOKEN
//     //   let code = JSON.parse(body);
//     Request.post({
//         "headers": { "Content-Type": "application/x-www-form-urlencoded" },
//         "url": "https://api.ciscospark.com/v1/access_token",
//         "body": `grant_type=authorization_code&client_id=${authorizeObject.client_id}&client_secret=${authorizeObject.client_secret}&code=${code}&redirect_uri=${authorizeObject.redirect_uri}`
//     }, async (error, result, apibody) => {
//         console.log(apibody, ' ACCESS TOKEN');
//         if (error) {
//             return res.status(400).send({
//                 status: false,
//                 message: error

//             })
//         } else {
//             // HERE WE ARE SAVING ACCESS TOKEN IN DATABASE
//             let apiData = apibody;
//             // let savingAccessToken = await saveAccessToken_toDB(apiData);
//             let isSaved = JSON.parse(apiData);
//             if (isSaved.access_token) {
//                 return res.status(200).send({
//                     status: true,
//                     data: apiData
//                 })
//             } else {
//                 return res.status(400).send({
//                     status: false,
//                     message: apiData

//                 })
//             }
//         }
//     });

//     //  }
//     // });
// });


// function saveAccessToken_toDB(apiData) {
//     return new Promise((resolve, reject) => {
//         Request.post({
//             "headers": { "Content-Type": "application/json" },
//             "url": "http://devapi.tracktechllc.com/tracktech//api/DeviceData/UpdateCiscoToken",
//             "body": apiData
//         }, async (error, result, accessToken) => {
//             console.log(accessToken, 'ACCESS TOKEN IN DATABASE');
//             if (error) {
//                 reject(error)
//             } else {
//                 resolve(accessToken);
//             }
//         });
//     })

// }

// function get_LatestAccessToken() {
//     return new Promise((resolve, reject) => {
//         Request.get({
//             "headers": { "Content-Type": "application/json" },
//             "url": "http://devapi.tracktechllc.com/tracktech//api/DeviceData/GetCiscoToken",
//         }, async (error, result, accessToken) => {
//             console.log(accessToken, 'Latest ACCESS TOKEN from DATABASE');
//             if (error) {
//                 reject(error)
//             } else {
//                 resolve(accessToken);
//             }
//         });
//     })

// }
// ciscoRouter.get('/createCiscoStuff', (req, res) => {
//     res.render('cisco_accept')
// });

// ciscoRouter.get('/createRefreshToken', async(req, res) => {
//     let refreshToken = req.query.refreshToken
//    let newRefreshedToken = await creatAccessToken(refreshToken)
//    if(newRefreshedToken){
//         return res.sendStatus(200).send({
//             Valid: true,
//             Item: newRefreshedToken
//         })
//    } else {
//     return res.sendStatus(400).send({
//         Valid: false,
//         Item: null
//     })
//    }
// });

// function creatAccessToken(tokenData) {
//     return new Promise((resolve, reject) => {
//         Request.post({
//             "headers": { "Content-Type": "application/x-www-form-urlencoded" },
//             "url": "https://api.ciscospark.com/v1/access_token",
//             "body": "grant_type=refresh_token&client_id=${}&client_secret=3e470b2e22ca4e2a2dc359d0404d206465f933153b113f41b854086c2c36b7cd&refresh_token=YWUzNDczZDUtZTBhMy00OGZiLWFmZWQtMmQ0ZjZhODgxZDdmYTg3ZThmODMtYzJi_PF84_consumer"
//         }, async (error, result, body) => {
//             console.log(body, 'res server');
//             if (error) {
//                 return reject(error);
//             } else {
//                 return resolve(body);
//             }
//         });
//     })
// }

// ciscoRouter.get('/acceptCiscoTerms', (request, res) => {
//     console.log(request.query, 'query');

//     let username = null;
//     username = request.query.username;
//     cisco_token.find({}).sort({ _id: -1 }).limit(1).exec(async function (err, [Stngs]) {
//         if (err) {
//             return res.status(400).send({
//                 status: false,
//                 data: [],
//                 message: err
//             })
//         } else {
//             let refreshToken = await creatAccessToken(Stngs);
//             console.log(refreshToken, 'Refreshtoken');
//             let tt = JSON.parse(refreshToken)
//             let temp = { ...tt, created_by: username }
//             let saveToken1 = await saveAccessToken(temp);
//             console.log(saveToken1, 'saveToken1');
//             return res.status(200).send({
//                 status: true,
//                 data: refreshToken,
//                 data1: saveToken1
//             })

//         }
//     });
// });

// function saveAccessToken(tokenData) {
//     console.log(tokenData, 'tokenData');
//     return new Promise((resolve, reject) => {
//         let refreshToken = new cisco_token(tokenData);
//         refreshToken.save(function (err, result) {
//             console.log(result, 'saveAccessToken');
//             if (err) {
//                 return reject(err)
//             } else {
//                 return resolve(result)
//             }

//         })
//     });
// }



// // Creating TEAMS, TEAM MEMBERSHIPS AND ROOMS by getting Latest Access Token from Database
// ciscoRouter.post('/cisco_stuff', async (req, res) => {
//     console.log(req.body, 'sssssss')
//     // cisco_token.find({}).sort({ _id: -1 }).limit(1).exec(async function (err, [accessToken]) {
//     //     if (err) {
//     //         return res.status(400).send({
//     //             status: false,
//     //             data: [],
//     //             message: err
//     //         })
//     //     }
//     let latestAccessToken = await get_LatestAccessToken();
//     let latest = JSON.parse(latestAccessToken);
//     if (!latest.access_token) {
//         return res.status(200).send({
//             status: true,
//             data: latest
//         })
//     } else {
//         let header = { "Content-Type": "application/json", "Authorization": "Bearer " + latest.access_token }
//         let newTeam = await creatTeam(header, { name: req.body.teamName })
//         console.log(newTeam, 'newTeam before parse');
//         let teamId = JSON.parse(newTeam);
//         let newRoom = await creatRooom(header, { teamId: teamId.id, title: req.body.roomName })
//         let rooomId = JSON.parse(newRoom);
//         console.log(rooomId, 'rooomId after parse');
//         let tM = req.body.teamMembers.split(',');
//         console.log(tM, 'TMM');
//         for (let i = 0; i < tM.length; i++) {
//             const element = tM[i];
//             let newTeamMemberShips = await creatTeamMemberships(header, { teamId: teamId.id, personEmail: tM[i], isModerator: true });
//             console.log(newTeamMemberShips, 'TMM' + i);
//         }
//         let ciscoStuff = { teamName: teamId.name, teamId: teamId.id, roomName: rooomId.title, roomId: rooomId.id, teamMemberships: tM };
//         // ciscoStuff = {...ciscoStuff,teamId,rooomId,teamMemberships:tM};
//         console.log(ciscoStuff, 'ciscoStuff')
//         //  let newTeamMemberShips = await creatTeamMemberships(header,req.body)
//         let saveCiscoStuff = new cisco_stuff(ciscoStuff);
//         console.log(saveCiscoStuff, 'saveCiscoStuff')
//         saveCiscoStuff.save(function (err, result) {
//             console.log(result, 'result')
//             if (err) {
//                 return res.status(400).send({
//                     status: false,
//                     data: []
//                 })
//             }
//             return res.status(200).send({
//                 status: true,
//                 data: result
//             })
//         })

//     }

// });


// function creatTeam(header, body) {
//     return new Promise((resolve, reject) => {
//         Request.post({
//             "headers": header,
//             "url": "https://api.ciscospark.com/v1/teams",
//             "body": JSON.stringify(body)
//         }, async (error, result, body) => {
//             console.log(body, 'res server');
//             if (error) {
//                 return reject(error);
//             } else {
//                 return resolve(body);
//             }
//         });
//     })
// }

// function creatTeamMemberships(header, body) {
//     return new Promise((resolve, reject) => {
//         Request.post({
//             "headers": header,
//             "url": "https://api.ciscospark.com/v1/team/memberships",
//             "body": JSON.stringify(body)
//         }, async (error, result, body) => {
//             console.log(body, 'res server');
//             if (error) {
//                 return reject(error);
//             } else {
//                 return resolve(body);
//             }
//         });
//     })
// }
// function creatRooom(header, body) {
//     return new Promise((resolve, reject) => {
//         Request.post({
//             "headers": header,
//             "url": "https://api.ciscospark.com/v1/rooms",
//             "body": JSON.stringify(body)
//         }, async (error, result, body) => {
//             console.log(body, 'res server');
//             if (error) {
//                 return reject(error);
//             } else {
//                 return resolve(body);
//             }
//         });
//     })
// }
// // Getting Latest Access Token from Database
// ciscoRouter.get('/getaccessToken', (req, res) => {
//     console.log(req.query)
//     let pmId = req.query.pmId

//     if (pmId) {
//         Request.get({
//             "headers": { "Content-Type": "application/json" },
//             "url": "http://devapi.tracktechllc.com/tracktech/api/devicedata/GetCiscoRoomInfo?pmId="+pmId,
//         }, async (error, result, body) => {
//              console.log(error, 'res server');
//              console.log(body, 'boy');

//             if (error) {
//                 return res.status(400).json({
//                     success: false,
//                     jwtToken: body
//                 })
//             } else if (body === 'null') {
//                 return res.status(400).json({
//                     success: false,
//                     jwtToken: body
//                 })
//             } else {
//                 return res.status(200).json({
//                     success: true,
//                     jwtToken: body
//                 });
//             }
//         });

//     }else {
//         return res.status(400).json({
//             success: false,
//             message: 'Invalid Url'
//         });
//     }

// });



module.exports = ciscoRouter;