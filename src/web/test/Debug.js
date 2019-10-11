process.env.debug = "bili:*"
const debug = require('debug')("bili:info")
debug.color =3;
debug('Hello')
