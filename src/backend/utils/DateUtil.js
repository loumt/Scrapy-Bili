const dateformat = require('dateformat')


exports.now = times =>{
  return times ? dateformat(new Date(times), 'yyyy-mm-dd HH:MM:ss'): dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss')
}

exports.yet = () =>{
  return  dateformat(new Date(), 'yyyy-mm-dd-') + new Date().getTime()
}