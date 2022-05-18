let path = require('path')
let fs =require('fs')
let ImageTool = require('./../tools/ImageTool')
let {BrowserWindow} = require('electron')
let {EventEmitter} = require('events')
let electronLocalShortcut = require('electron-localshortcut')


class LoadWindow extends EventEmitter{
    constructor() {
        super();
        this.createLoadWindow();
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

    createLoadWindow() {
        this.loadWindow = new BrowserWindow(this.getOptions())
        this.loadWindow.loadURL(`file://${path.join(__dirname, './../views/loading.html')}`);

    }


    initWindowShortCut() {}

    initWindowEvent(){
        this.loadWindow.on('show', ()=>{
            console.log('load show.....')
        })
        this.loadWindow.on('hide', ()=>{
            console.log('laod hide.....')
        })
    }

    hide(){
        this.loadWindow.hide()
    }

    close() {
        this.loadWindow.close()
    }

    send(opcode, data) {
        this.loadWindow.webContents.send(opcode, data)
    }
}


module.exports = LoadWindow;