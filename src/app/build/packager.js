'use strict'
const path = require('path')
process.env.NODE_ENV = 'production'
const packager= require('electron-packager')
const packagerOptions = require('./packager.config')
const FsUtil = require('./fsutil.js')

bundleApp()

function bundleApp() {
  packagerOptions.mode = 'production'
  packager(packagerOptions).then(appPaths => {
    console.log(`Exe Build In : \n   ${appPaths}`)
    console.log('Package Success!')
  }).catch(error => {
    console.log(error)
    console.log(`Package Failure! \n ${error.code}`)
  })
}
