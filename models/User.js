const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    familyname: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        default: 'Antananarivo',
    },
    date: {
        type: Date,
        default : Date.now()
    },
});
const User = mongoose.model("User" , UserSchema);

module.exports = User;
