var express = require('express');
var expressWs = require('express-ws');
const debug = require('debug')('bili:ws')

var router = express.Router();
expressWs(router);


router.ws('/channel', function (ws, req) {
  ws.on('open', () => {debug('channel open');});
  ws.on('error', (err) => {
    debug('ws err' + err);
  });

  ws.on('message', message => {
    debug('Received -', message);
    ws.send(`M: ${message}`);
  });

  ws.on('close', () => {
    console.log('ws close');
  });
})

module.exports = router;