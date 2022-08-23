let path = require('path')
let fs = require('fs')
let ImageTool = require('./../tools/ImageTool')
let {BrowserWindow, app} = require('electron')
let {EventEmitter} = require('events')
let electronLocalShortcut = require('electron-localshortcut')


class MainWindow extends EventEmitter {
    constructor() {
        super();
        this.createMainWindow();
        this.initWindowShortCut();
        this.initWindowEvent();
    }

    getOptions() {
        return {
            title: 'BiliBili',
            width: 1240,
            height: 780,
            minHeight: 760,
            minWidth: 650,
            resizable: false,
            fullscreen: false,
            maximizable: true,
            minimizable: false,
            center: true,
            show: false,
            movable: true,
            alwaysOnTop: false,
            darkTheme: true,
            skipTaskbar: true,
            // parent:top,
            // modal:true,
            // opacity:0.9,
            // backgroundColor: '#2e2c29',
            transparent: false,
            frame: true,
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
    }


    initWindowShortCut() {
        electronLocalShortcut.register(this.mainWindow, 'Esc', () => {
            this.close()
            app.quit()
        })

        electronLocalShortcut.register(this.mainWindow, 'F12', () => {
            this.mainWindow.webContents.openDevTools()
        })
    }

    initWindowEvent() {
        this.mainWindow.on('show', () => {
            this.mainWindow.loadURL(`http://localhost:8080`);
        })
        this.mainWindow.on('hide', () => {
            console.log('hide.....')
        })
        this.mainWindow.on('close', () => {
            app.quit();
        })
        this.mainWindow.webContents.on("did-finish-load", () => {
            const css = ".el-table td{padding: 0px 0px!important}";
            this.mainWindow.webContents.insertCSS(css);
        });
    }

    hide() {
        this.mainWindow.hide()
    }

    show() {
        this.mainWindow.show()
    }

    close() {
        this.mainWindow.close()
    }

    send(opcode, data) {
        this.mainWindow.webContents.send(opcode, data)
    }

}


module.exports = MainWindow;