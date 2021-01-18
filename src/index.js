// const { BrowserWindow } = require('electron').remote;
const path = require('path');
const axios = require('axios')
const { ipcRenderer } = require('electron')

const notifyBtn = document.getElementById('notifyBtn');
const targetPrice = document.getElementById('targetPrice');
const price = document.querySelector('h1');

// function getBTC(){
//     axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=NGN')
//     .then(res => {
//         const cryptos = res.data.BTC.NGN
//         console.log(res)
//         price.innerText = `$${cryptos.toLocaleString('en')}`
//     })

//     // try{
//     // const res = await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=NGN')
//     // const cryptos = res.data.BTC.NGN
//     // console.log(res)
//     // price.innerText = `$${cryptos.toLocaleString('en')}`
//     // }catch(e){
//     //     console.log(e)
//     // }
// }

// getBTC()
// setInterval(getBTC, 30000)

function openWindow () {
    const modalPath = path.join('file://', __dirname, 'add.html')

    // Create the browser window.
    const win = new BrowserWindow({
      width: 400,
      height: 200,
      frame:false,
      alwaysOnTop:true,
      transparent:true,
      hasShadow: true,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      }
    })
      // // win.on('close', function() { win = null})

    // and load the index.html of the app.
    win.loadURL(modalPath)  
// win.once('ready-to-show', () => {
    //     win.show()
    //   })
  }
notifyBtn.addEventListener('click', async()=> {
    const openWin = await ipcRenderer.invoke('open')
})