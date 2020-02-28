const Pusher = require('pusher');
const config = require('./index').pusher;

const pusher = new Pusher({
    appId: config.appId,
    key: config.key,
    secret: config.secret,
    cluster: config.cluster,
    encrypted: true
});

module.exports = pusher;