const express = require('express');
const bodyParser = require('body-parser');
const errorMW = require('./app/middlewares/error');
const dotenv = require('dotenv');
const config = require('./config/index');
const routes = require('./app/routes');
const logger = require('./app/logger/logger');
const pusher = require('./config/pusher');
const mongoose = require('./config/dbConnection');
const db = mongoose.connection;
const app = express();

dotenv.config();

app.set('port', config.common.port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', routes);
app.use(errorMW.handle);



db.once('open', () => {
    app.listen(app.get('port'), () => {
        logger.info(`server on port ${app.get('port')}`)
    })
  
    const taskCollection = db.collection(config.common.database.collection);
    const changeStream = taskCollection.watch();
      
    changeStream.on('change', (change) => {
      
      if(change.operationType === 'insert') {
        logger.info(
          {
          id: change._id._data,
          operation: change.fullDocument,
          information: change.ns
        });
        pusher.trigger(
          config.common.database.collection,
          {
            id: change._id._data,
            operation: change.fullDocument,
            information: change.ns
          }
        );  
      }
    });
  });
  


module.exports=app;


