'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const ciscoSchema  = new Schema({
    teamName:{
        type:String,
        required:true
    },
    teamId:{
        type:String,
        required:true,
        trim:true
    },
    teamMembershipId:{
        type:String,
        default:null
     },
    teamMemberships:[{
        type:String,
        required:true        
    }],
    roomName:{
        type:String,
        default:null
    },
    roomId:{
        type:String,
        default:null
    }
}) 

const cisco_stuff = mongoose.model('cisco_stuff',ciscoSchema)
module.exports = cisco_stuff;