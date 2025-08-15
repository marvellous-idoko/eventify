const mongoose = require("mongoose");

const transaction = mongoose.Schema({
    access_code: String,
    reference: String,
    trxn__id:String,
    completed:Boolean,
    amount:String
})
module.exports = mongoose.model("transaction", transaction);
