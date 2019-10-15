'use strict'
const http = require('http');
const {EventEmitter} = require('events');
const serverConfig = require('./configure/app.config');
const express = require('express');
const debug = require('debug')('bili:server')
const router = express.Router();
const session = require('express-session')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path')
const compression = require('compression')
const {resJson} = require('./middleware/ResponseJsonMiddleware')
require('./models')

const app = express();
app.use(compression())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', './img/icon.jpg')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.use(resJson)
app.use(session({
  name: 'scrapy-sid',
  secret: 'scrapy',
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 1000
  }
}))

//routers-files
require('./routers')(router);

//router inject
app.use(router);

//not found
app.use((req, res, next) => {
  debug(`[URL Not Found] ${req.url}`)
  res.status(200).json({
    success: false,
    code: 1000,
    message: '请确认请求url是否正确..'
  })
})

/**
 * Server App
 * Obj Method  #createServer()#
 * Events:
 *  server-start
 *  server-error
 *  server-success
 *
 *  sync-user-start
 *  sync-user-error
 *  sync-user-success (status)  =404= 离线  else error
 */
class ServerApp extends EventEmitter {
  constructor(app) {
    super();
    this.app = app;
    this.server = null;
    this.port = this.normalizePort(serverConfig.port || '8181')
    this.initApp();
  }

  normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  }

  initApp() {
    debug(`port : ${this.port}`);
    this.app.set('port', this.port);
  }


  createServer() {
    this.onStart();
    this.server = http.createServer(this.app);
    this.server.listen(this.port);

    this.server.on('error', this.onServerError.bind(this));
    this.server.on('listening', this.onServerListening.bind(this));
  }

  onStart() {
    this.emit('server-start')
  }

  onServerError(e) {
    let msg = '';
    if (e.code === 'EADDRINUSE') {
      msg = `${e.port}端口占用`
    } else {
      msg = `${e.code}`
    }
    this.emit('server-error', msg)
  }

  onServerListening() {
    this.emit('server-success')

    //定时器
    require('./schedule')
  }

  onSyncError(msg) {
    this.emit('sync-user-error');
  }

  onSyncSuccess(status) {
    this.emit('sync-user-success', status);
  }

  onSyncStart() {
    this.emit('sync-user-start');
  }
}

let server = new ServerApp(app);

server.on('server-success', () => {
  debug(`Server Run ......... `)
})
server.on('server-error', msg => {
  debug(`Server Error ......... `)
  debug(msg)
})
server.createServer();