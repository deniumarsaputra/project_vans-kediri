mongoose = require('mongoose')

const schema = new mongoose.Schema({
    fristname : String,
    lastname: String,
    username: String,
    email: String,
    password: String,
    nohp: String,
    address: String,
    isActive: {type: Boolean, default: true},
    statusDelete: {type: Boolean, default: false}
})

module.exports = mongoose.model("User", schema)