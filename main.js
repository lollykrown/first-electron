// Modules to control application life and create native browser window
const {app, BrowserWindow, Notification, ipcMain, nativeTheme, dialog} = require('electron')
const path = require('path')

const fs = require('fs')
// const root = fs.readdirSync('/users/agboola_kayode/Documents/Github/first-electron')
// console.log(root)


function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'favicon.ico'),
    // //remove frame
    // frame:false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // open dialog
  // console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')  

  // // or load url
  // mainWindow.loadURL('https://lollykrown.xyz')

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSouce = 'system'
  })


  // Event handler for asynchronous incoming messages
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)

  // Event emitter for sending asynchronous messages
  event.sender.send('asynchronous-reply', 'async pong from main.js')
})

// Event handler for synchronous incoming messages
ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) 

  // Synchronous event emmision
  event.returnValue = 'sync pong from main.js'
})

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}


// Show notification from the main process
function showNotification () {
  const notification = {
    title: 'Lollykrown',
    body: 'Notification from the Main process'
  }
  new Notification(notification).show()
}
 

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  showNotification()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

app.on('quit', function (event, exitCode) {
  event.preventDefault()
  console.log('ready to quit');
  app.quit(exitCode)
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
