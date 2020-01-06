const RequestHandler = require('./../../utils/RequestHander')
const logger = require('./../../utils/log4js').schedule()
const SendRequestService = require('./../../services/SendRequestService')
const CommonURLConfigure = require('./../../constants/CommonURLConfigure')
class BaseSchedule{
  constructor(){
    this.RequestHandler = function(){
      let args = Array.from(arguments)
      args.push(SendRequestService.TYPE.SCHEDULE)
      return RequestHandler(...args)
    };
    this.logger = logger;
    this.CommonURLConfigure = CommonURLConfigure;
  }
}

module.exports = BaseSchedule