// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { ipcRenderer } = require('electron')

// Synchronous message emmiter and handler
console.log(ipcRenderer.sendSync('synchronous-message', 'sync ping from renderer')) 

// Async message handler
ipcRenderer.on('asynchronous-reply', (event, arg) => {
   console.log(arg)
})

// Async message sender
ipcRenderer.send('asynchronous-message', 'async ping from renderer')


//change background
document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await ipcRenderer.invoke('dark-mode:toggle')
    console.log('Dark/light mode toggle clicked')
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
  })
  
  document.getElementById('reset-to-system').addEventListener('click', async () => {
    console.log(dialog)

  })



// Notification from the renderer process
const myNotification = new Notification('Lollykrown', {
    body: 'Notification from renderer'
  })
  
  myNotification.onclick = () => {
    console.log('Notification clicked in renderer')
  }
