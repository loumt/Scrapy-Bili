let path = require('path')
let {app, nativeImage, ipcMain} = require('electron')
let MainWindow = require('./windows/MainWindow')
let TrayElement = require('./windows/TrayElement')
let gotTheLock = app.requestSingleInstanceLock()


if (!gotTheLock) {
  app.quit()
} else {
  app.on('ready', () => {
    let mainWindow = new MainWindow();
    let tray = new TrayElement({app, mainWindow});
    let server = null;
    ipcMain.on('start', (e, args) => {

      if (process.env.ENV === 'development') {
        server = require('../backend/app.js')
      } else {
        let exeDir = path.dirname(app.getPath('exe'))
        server = require(path.join(exeDir, '..', 'web', 'app.js'))
      }

      server.on('server-success', () => {
        mainWindow.hide()
      })
      server.on('server-error', msg => {
        mainWindow.send('server-error', msg)
      })
      server.createServer();
    })

    tray.on("exit", ()=>{
      process.exit(0)
    })
  });

  app.on('will-quit', () => {
    console.log(`app will quit!`)
  })

}
