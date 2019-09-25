'use strict';
var mongoose = require('mongoose');
var tokenSchema = mongoose.Schema;


var cisco_token = new tokenSchema({
     access_token:{
         type:String,
         required:'Please supply valid access_token',
         trim:true
     },
     expires_in :{
         type:Number,
         required:'Please supply valid seconds',
     },
     refresh_token:{
         type:String,
         required:'Please supply valid access_token',
         trim:true
     },
     refresh_token_expires_in:{
        type:Number,
        required:'Please supply valid seconds',
     },
     created_by:{
        type:String,
        default:null
    },
    created_date:{
        type: Date,
        default: Date.now
    }
});
const cisco_tokens =  mongoose.model('cisco_token',cisco_token)
module.exports = cisco_tokens;