const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const ClientSchema=mongoose.Schema({
    clientname:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required:true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    token:{
        type: String,
        required: false,
        default: ""
    }
});

ClientSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id }, 'mimamamemimamucho', { expiresIn: '2y' });
    user.token = token;
    await user.save();
    return user;

}

const ClientModel = mongoose.model('client',ClientSchema);

module.exports = ClientModel;