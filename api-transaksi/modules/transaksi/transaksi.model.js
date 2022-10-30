const mongoose = require('mongoose')
const ObjectID = mongoose.SchemaTypes.ObjectId


const schema = new mongoose.Schema({
    users: {type: ObjectID, ref: "User"},
    order_id: String,
    gross_amount: Number,
    payment_type: String,
    status: String,
    tanggal: String,
    payment_details: {
        transaction_id: String,
        transaction_time: String,
        transaction_status: String,
        va_numbers: Array,
        currency: String,
        fraud_status: String,
        merchant_id: String,
        signature_key: String
    },customer_details: {
        first_name: String,
        last_name: String,
        email: String,
        phone: String,
        address: String
    },item_details:[{
        id: String,
        price: Number,
        quantity: Number,
        name: String
    }]
})

module.exports = mongoose.model("Transaction", schema)