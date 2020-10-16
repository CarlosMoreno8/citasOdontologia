const mongoose = require("mongoose");

const ClientSchema=mongoose.Schema({
    clientname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique: true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const ClientModel = mongoose.model('client',ClientSchema);

module.exports = ClientModel;