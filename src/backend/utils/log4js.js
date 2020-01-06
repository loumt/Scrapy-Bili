const log4js = require('log4js')

const logFolder = process.platform === 'win32' ?  './log' : '/var/log/bilibili'

let logConfig =  {
  appenders: {
    console: { type: 'console' },
    access: {
      category: "access",
      type: "dateFile",
      filename: `${logFolder}/access.log`,//您要写入日志文件的路径
      alwaysIncludePattern: true,//（默认为false） - 将模式包含在当前日志文件的名称以及备份中
      //compress : true,//（默认为false） - 在滚动期间压缩备份文件（备份文件将具有.gz扩展名）
      pattern: "-yyyy-MM-dd.log",//（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
      encoding: 'utf-8'//default "utf-8"，文件的编码
    },
    system: {
      type: 'dateFile',
      filename: `${logFolder}/system.log`,
      alwaysIncludePattern: true,
      pattern: "-yyyy-MM-dd.log",
      encoding: 'utf-8',
    },
    api: {
      type: 'dateFile',
      filename: `${logFolder}/api.log`,
      alwaysIncludePattern: true,
      pattern: "-yyyy-MM-dd.log",
      encoding: 'utf-8',
    },
    schedule: {
      type: 'dateFile',
      filename: `${logFolder}/schedule.log`,
      alwaysIncludePattern: true,
      pattern: "-yyyy-MM-dd.log",
      encoding: 'utf-8',
    },
    database: {
      type: 'file',
      filename: `${logFolder}/database.log`,
      encoding: 'utf-8'
    }
  },
  categories: {
    default: {
      appenders: ['console'], level: 'debug'
    },
    system: {
      appenders: ['system','console'], level: 'debug'
    },
    api: {
      appenders: ['api','console'], level: 'debug'
    },
    access: {
      appenders: ['access','console'], level: 'debug'
    },
    database: {
      appenders: ['database'], level: 'debug'
    },
    schedule: {
      appenders: ['schedule'], level: 'debug'
    }
  }
}


log4js.configure(logConfig);

module.exports = {
  access: ()=>{
    return log4js.connectLogger(
      log4js.getLogger('access'),
      { level: 'auto', format: ':method :url :status :response-time ms' }
    )
  },
  system: ()=>{
    return log4js.getLogger('system');
  },
  api: ()=>{
    return log4js.getLogger('api');
  },
  database: ()=>{
    return log4js.getLogger('databse')
  },
  schedule: ()=>{
    return log4js.getLogger("schedule")
  }
}