'use strict';
var mongooose = require('mongoose');
var userSchema = mongooose.Schema;

const user = new userSchema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
})

const users = mongooose.model('users',user);
module.exports = users;
 
