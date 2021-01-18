// Modules to control application life and create native browser window
const {app, BrowserWindow, Notification, ipcMain, nativeTheme, Menu, shell} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'assets/images/favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('src/index.html')  

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


  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  const menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        { 
          label: 'Adjust Notification Value' },
        { 
          label: 'CoinMarketCap',
          click() {
            shell.openExternal('http://coinmarketcap.com')
          }
        },
        { type: 'separator'},
        { 
          label: 'Exit', 
          click() {
            app.quit()
          } 
        }
      ]
    },
    {
      label: 'Info'
    }
  ])
  Menu.setApplicationMenu(menu)
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
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
