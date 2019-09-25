// let spark;
'use strict';
 
 var http = require('http');
 var spark = require('ciscospark');
// // First, let's wire our form fields up to localStorage so we don't have to
// // retype things everytime we reload the page.

// [
//   'access-token',
//   'invitee'
// ].forEach((id) => {
//   const el = document.getElementById(id);

//   el.value = localStorage.getItem(id);
//   el.addEventListener('change', (event) => {
//     localStorage.setItem(id, event.target.value);
//   });
// });

// // There's a few different events that'll let us know we should initialize
// // CiscoSpark and start listening for incoming calls, so we'll wrap a few things
// // up in a function.
// function connect() {
//   if (!spark) {
//     spark = ciscospark.init({
//       config: {
//         phone: {
//           // Turn on group calling; there's a few minor breaking changes with
//           // regards to how single-party calling works (hence, the opt-in), but
//           // this is how things are going to work in 2.0 and if you plan on
//           // doing any group calls, you'll need this turned on for your entire
//           // app anyway.
//           enableExperimentalGroupCallingSupport: true
//         }
//       },
//       credentials: {
//         access_token: document.getElementById('access-token').value
//       }
//     });
//   }

//   if (!spark.phone.registered) {
//     // we want to start listening for incoming calls *before* registering with
//     // the cloud so that we can join any calls that may already be in progress.
//     spark.phone.on('call:incoming', (call) => {
//       Promise.resolve()
//         .then(() => {
//           // Let's render the name of the person calling us. Note that calls
//           // from external sources (some SIP URIs, PSTN numbers, etc) may not
//           // have personIds, so we can't assume that field will exist.
//           if (call.from && call.from.personId) {
//             // In production, you'll want to cache this so you don't have to do
//             // a fetch on every incoming call.
//             return spark.people.get(call.from.personId);
//           }

//           return Promise.resolve();
//         })
//         .then((person) => {
//           const str = person ? `Anwser incoming call from ${person.displayName}` : 'Answer incoming call';

//           if (confirm(str)) {
//             call.answer();
//             bindCallEvents(call);
//           }
//           else {
//             call.decline();
//           }
//         })
//         .catch((err) => {
//           console.error(err);
//           alert(err);
//         });
//     });

//     return spark.r()
//       .then(() => {
//         // This is just a little helper for our selenium tests and doesn't
//         // really matter for the example
//         document.body.classList.add('listening');

//         document.getElementById('connection-status').innerHTML = 'connected';
//       })
//       // This is a terrible way to handle errors, but anything more specific is
//       // going to depend a lot on your app
//       .catch((err) => {
//         console.error(err);
//         alert(err.stack);
//         // we'll rethrow here since we didn't really *handle* the error, we just
//         // reported it
//         throw err;
//       });
//   }

//   return Promise.resolve();
// }
 
document.getElementById('credentials').addEventListener('submit', (event) => {
    // let's make sure we don't reload the page when we submit the form
    event.preventDefault();
    $.getJSON('/token_Access' ,function(data){
        console.log(data,'FROM TOKEN ACCESS FUNCTION');
        document.getElementById('connection-status').innerHTML = data.result;
    })
});

document.getElementById('create_team').onclick = function() {
    // let's make sure we don't reload the page when we submit the form
    // event.preventDefault();
    $.getJSON('/createTeam' ,function(data){
        console.log(data,'FROM TOKEN ACCESS FUNCTION');
        document.getElementById('team_status').innerHTML = data.message;
    })
};
document.getElementById('team_list').onclick = function() {
    // let's make sure we don't reload the page when we submit the form
    // event.preventDefault();
    $.getJSON('/getTeams' ,function(data){
        console.log(data,'FROM TOKEN ACCESS FUNCTION');
        // document.getElementById('team_status').innerHTML = data.message;
    })
};
document.getElementById('teams').onchange = function() {
    alert('test');
    // let's make sure we don't reload the page when we submit the form
    // event.preventDefault();
    let params = {id:document.getElementById('teams').value}
    alert(document.getElementById('teams').value);
    $.getJSON('/getDetailsBySelection' ,params,function(data){
        console.log(data,'FROM TOKEN ACCESS FUNCTION');
        // document.getElementById('team_status').innerHTML = data.message;
    })
};
 
 