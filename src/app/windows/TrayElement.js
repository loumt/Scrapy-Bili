let ImageTool = require('./../tools/ImageTool')
let { Menu, Tray} = require('electron')
let {EventEmitter} = require('events')

class TrayElement extends EventEmitter{
  constructor({app, mainWindow}){
    super();
    this.app = app
    this.mainWindow = mainWindow
    this.createTray()
    this.initEvent()
  }

  createTray(){
    let image = ImageTool.getTrayIcon()
    image.setTemplateImage(true)

    this.tray = new Tray(image)
    this.contextMenu = Menu.buildFromTemplate(this.getLabels())
    this.tray.setContextMenu(this.contextMenu)
  }

  getLabels(){
    return [
      {
        label: `退出`,
        icon: ImageTool.getExitIcon(),
        click: () => {
          this.emit('exit')
        }
      }
    ]
  }

  initEvent(){
    this.tray.on("double-click", ()=>{
      this.mainWindow.show()
    })
  }

  get(){
    return this.tray;
  }

  destroy(){
    this.tray.destroy()
  }

}

module.exports = TrayElement;