const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    stock: Number,
})

module.exports = mongoose.model("Produk", schema)