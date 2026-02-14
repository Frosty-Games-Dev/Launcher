const { app, ipcMain } = require("electron");
const { autoUpdater } = require('electron-updater'); /* Non utile pour le moment */
const path = require("path");

const LaunchingWindow = require("./src/panels/launching/js/windowUpdate.js");
const winUpdate = LaunchingWindow.getWindow();


// Partie pour gérer le lancement de l'application
app.on('ready', () => {
    LaunchingWindow.createWindow()
});

// Fermer l'application si aucune fenêtre n'est ouverte (pas utile pour MacOS)
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
});

ipcMain.handle('destroy-window', () => {
    LaunchingWindow.destroyWindow()
});

autoUpdater.autoDownload = false;

autoUpdater.checkForUpdates();

autoUpdater.on('checking-for-update', () => {
    winUpdate.webContents.send('message', 'Checking for updates...');
});

autoUpdater.on('update-available', () => {
    winUpdate.webContents.send('update-available');
});

autoUpdater.on('update-not-available', () => {
    winUpdate.webContents.send('message', 'No update available.');
});

autoUpdater.on('error', (err) => {
    winUpdate.webContents.send('message', `Error: ${err}`);
});

autoUpdater.on('download-progress', (progressObj) => {
    winUpdate.webContents.send('download-progress', progressObj);
});

autoUpdater.on('update-downloaded', () => {
    winUpdate.webContents.send('update-downloaded');
});

ipcMain.handle('download', () => {
    console.log('download');
    autoUpdater.downloadUpdate();
});

ipcMain.handle('install', () => {
    console.log('install');
    autoUpdater.quitAndInstall();
});