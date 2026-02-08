const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  navigateTo: (page) => ipcRenderer.send('navigate-to', page),
  minimizeWin: () => ipcRenderer.send('minimize-Window'),
  closeWin: () => ipcRenderer.send('close-Window'),
  reloadWin: () => ipcRenderer.send('reload-Window')
});