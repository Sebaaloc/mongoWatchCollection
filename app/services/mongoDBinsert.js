const provider = require('../models/provider');
let chance = require('chance');
chance = new chance();

exports.insertProvider = _ => {
    const providerToSave = new provider({
        firstName: chance.name(),
        lastName: chance.name(),
    });
    return providerToSave.save()
    .then(true)
    .catch(false);
}