const fs = require('fs');
const path = require('path')
const logger = require('./../utils/log4js').database()
const {mysql} = require('./../configure/app.config')


//db对象
let db = {};

const MODULES_SPEAD = {
  BASE:['Uper'],
  ASSOCIATED:[]
}

fs.readdirSync(path.join(__dirname)).forEach(pojo => {
  if (pojo !== path.basename(__filename)) {
    let model = require(path.join(__dirname, pojo));
    db[model.name] = model;
  }
})

if(mysql.init){
  let baseTableInitPromises = []
  for(let modelName of MODULES_SPEAD.BASE){
    baseTableInitPromises.push(db[modelName].sync({force: true}))
  }

  Promise.all(baseTableInitPromises).then(()=>{
    let associatedTableInitPromises = []
    for(let modelName of MODULES_SPEAD.ASSOCIATED){
      associatedTableInitPromises.push(db[modelName].sync({force: true}))
    }
    return Promise.all(associatedTableInitPromises)
  }).then(()=>{
    logger.info('**********DATA BASE***********')
    logger.info('********** Success ***********')
    logger.info('******************************')
  }).catch(err=>{
    logger.info('**********DATA BASE***********')
    logger.info('********** Failure ***********')
    console.error(err)
    logger.info('******************************')
    process.exit(0)
  })
}

module.exports = db;