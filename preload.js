const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
	destroyWindow: () => ipcRenderer.invoke('destroy-window')
});