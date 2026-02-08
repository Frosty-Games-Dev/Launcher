const { ipcRenderer } = require('electron');

function minimizeWindowLogin() {
    ipcRenderer.send('window-minimize-login');
}

function closeWindowLogin() {
    ipcRenderer.send('window-close-login');
}