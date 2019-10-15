process.env.debug = "bili:*"
const debug = require('debug')("bili:info")
debug.color =3;
debug('Hello')


console.log(typeof JSON.parse('{"name": 111}'))

