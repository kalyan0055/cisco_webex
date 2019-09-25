'use strict'
var path = require('path');
const fs = require('fs');

//  var ciscoModel = require('./models/cisco_token.model');
 const directoryPath = path.resolve(__dirname, 'models');
 var t = fs.readdir(directoryPath, async function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(async function  (file) {
        // Do whatever you want to do with the file
        console.log('./models/'+file); 
        await require('./models/cisco_token.model');
    });
});
 

module.exports = t;
 