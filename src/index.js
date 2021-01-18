const { BrowserWindow } = require('electron').remote;
const path = require('path');
// const BrowserWindow = electron.remote.BrowserWindow

const notifyBtn = document.getElementById('notifyBtn');

notifyBtn.addEventListener('click', function(e){
    const modalPath = path.join('file://', __dirname, 'add.html')
    const win = new BrowserWindow({ 
        width:400, 
        height:200,
        frame:false, 
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        }
    })
    // win.on('close', function() { win = null})
    win.loadURL(modalPath)
    // win.once('ready-to-show', () => {
    //     win.show()
    //   })
})