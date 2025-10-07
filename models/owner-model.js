
const mongoose = require('mongoose');
const ownerSchema=mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String,
    isadmin: Boolean,
    picture: String,
});
module.exports = mongoose.model('owners', ownerSchema);