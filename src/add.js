const { ipcRenderer } = require('electron')

const closeBtn = document.getElementById('closeBtn');

closeBtn.addEventListener('click', function(e){
    console.log('close btn clicked')
    const openWin = await ipcRenderer.invoke('close')
})