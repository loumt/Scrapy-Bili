'use strict'

const ResultCode = require('./../constants/ResultCode');
const CryptoUtil = require('./../utils/CryptoUtil');
const UserController = require('./../controllers/UserController');


async function validateToken(req,res){
  let {authorization} = req.headers;
  // console.log(authorization)
  if(authorization === "" || authorization === null || authorization === 'undefined')  return res.status(401).json(ResultCode.MUST_LOGIN);
  let tokenParse = CryptoUtil.parseToken(authorization);
  return await UserController.validateToken(tokenParse.id, tokenParse.username, tokenParse.expireTimes)
}

module.exports = async function(req,res,next){
  if(req.headers['user-agent'] === 'fm-client-takeout-Electron'){
    next();
  }

  let access = await validateToken(req,res)
  if(access) {
    next();
  }else{
    res.status(401).json(ResultCode.MUST_LOGIN);
  }

}