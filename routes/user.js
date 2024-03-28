const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const plm = require("passport-local-mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/ttms");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    category:String
});

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);


