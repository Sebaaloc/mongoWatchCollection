const insertService = require('../services/mongoDBinsert');
const error =  require('../errors/errors');
const constants = require('../constants');

exports.insert = async (req, res, next) => {
    try {
        let provider;
        for(let i = 0; i < 1000; i++){
            provider = await insertService.insertProvider();
        }
        if(provider === false){
            throw error(constants.BAD_REQUEST, 'Err: Provider not created in MongoDB');
        }
        if(provider.hasOwnProperty('error')){
            throw error(constants.BAD_REQUEST, `Err: ${provider.error}`);
        }
        res.send(provider);
    } catch(err){
        next(err);
    }
}