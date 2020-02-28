/* eslint-disable no-undef */
const dotenv = require('dotenv');
dotenv.config();

const config = {
    common: {
    database: {
      route: process.env.MONGO_ROUTE,
      collection: process.env.COLL_NAME
    },
    port: process.env.PORT    
    },
    pusher: {
      appId: process.env.APPID,
      key: process.env.KEY,
      secret: process.env.SECRET,
      cluster: process.env.CLUSTER
    }
};

module.exports = config;