// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const os = require('os')

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }


  const userInfo = `User Info: ${JSON.stringify(os.userInfo())}  <br>
  Platform: ${os.platform()}<br>
  User home directory: ${os.homedir()} <br> 
  OS Architecture:  ${os.arch()}  <br>`;

  console.log(os.userInfo().username)

  const doc = document.getElementById('os')

  doc.innerHTML = userInfo
})
