const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
	destroyWindow: () => ipcRenderer.invoke('destroy-window'),
	downloadUpdate: () => ipcRenderer.invoke('download'),
	installUpdate: () => ipcRenderer.invoke('install')
});