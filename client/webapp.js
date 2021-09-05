const electron = require('electron')
const {app} = electron
const {BrowserWindow} = electron

let win
function createWindow () {
	  win = new BrowserWindow({
    	width : 1040, height : 650,
		resizable : false,
		center : true,
		backgroundColor : "#FFFFFF",
		alwaysOnTop : false
  	})
  	win.loadURL(`file://${__dirname}/template/main.html`)

  	win.on('closed', () => {
    	win = null
  	})
  	win.setMenu(null)
	win.webContents.openDevTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  	if (process.platform != 'darwin') {
    	app.quit()
  	}
})

app.on('activate', () => {
  	if (win === null) {
    	createWindow()
  	}
})