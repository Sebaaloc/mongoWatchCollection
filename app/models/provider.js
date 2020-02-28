const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const providerSchema = Schema({
    firstName: String,
    lastName: String,
});

module.exports = mongoose.model('provider', providerSchema);