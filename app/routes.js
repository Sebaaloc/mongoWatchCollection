const express = require('express');
const router = express.Router();
const mongoController = require('./controllers/mongoDBinsert');

router.post("/insert", mongoController.insert);

module.exports = router;