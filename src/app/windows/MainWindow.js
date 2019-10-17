let path = require('path')
let fs =require('fs')
let ImageTool = require('./../tools/ImageTool')
let {BrowserWindow} = require('electron')
let {EventEmitter} = require('events')
let electronLocalShortcut = require('electron-localshortcut')


class MainWindow extends EventEmitter{
  constructor() {
    super();
    this.createMainWindow();
    this.initWindowShortCut();
    this.initWindowEvent();
  }

  getOptions() {
    return {
      title: 'BiliBili',
      width: 230,
      height: 85,
      minHeight: 150,
      minWidth: 50,
      resizable: false,
      fullscreen: false,
      maximizable: true,
      minimizable: false,
      center: true,
      show: true,
      movable: true,
      alwaysOnTop: false,
      darkTheme: true,
      skipTaskbar: true,
      // parent:top,
      // modal:true,
      // opacity:0.9,
      // backgroundColor: '#2e2c29',
      transparent: true,
      frame: false,
      icon: ImageTool.getWindowIcon(),
      autoHideMenuBar: true,
      titleBarStyle: 'hidden-inset',
      webPreferences: {
        javascript: true,
        plugins: true,
        nodeIntegration: true,
        webSecurity: false,
        // preload: path.join(__dirname, './preload.js')
      }
    }
  }

  createMainWindow() {
    this.mainWindow = new BrowserWindow(this.getOptions())
    this.mainWindow.loadURL(`file://${path.join(__dirname, './../views/loading.html')}`);

  }


  initWindowShortCut() {
    electronLocalShortcut.register(this.mainWindow, 'Esc', () => {
      this.mainWindow.close()
    })

    electronLocalShortcut.register(this.mainWindow, 'F12', () => {
      this.mainWindow.webContents.openDevTools()
    })
  }

  initWindowEvent(){
    this.mainWindow.on('show', ()=>{
      console.log('show.....')
    })
    this.mainWindow.on('hide', ()=>{
      console.log('hide.....')
    })
  }

  hide(){
    this.mainWindow.hide()
  }

  close() {
    this.mainWindow.close()
  }

  send(opcode, data) {
    this.mainWindow.webContents.send(opcode, data)
  }
}


module.exports = MainWindow;