const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    phone: String,
    email: String,
    password: String,
    photo: String,
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
