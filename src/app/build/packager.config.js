const path = require('path')
const pck = require('./../package.json')
let iconPath = path.join(__dirname, 'logo32.ico');

module.exports = {
  "asar": true,
  appVersion: pck.version,
  buildVersion: pck.version,
  "app-bundle-id": '1sb231a-y1ab-ge87-a5ws-w6t3542d5s2t',
  dir: path.join(__dirname, '../'),
  electronVersion: "3.0.10",
  icon: iconPath,
  ignore: /(^\/(test$|docs$|log$))|package-lock.json|README.md/i,
  out: path.join(__dirname, '../dist'),
  overwrite: true,
  win32metadata: {
    FileDescription: pck.description,
    CompanyName: 'BiliBili'
  },
  appname: pck.productName,
  platform: process.env.PTF_TARGET || "all",
  arch: process.env.ARCH || ''
}