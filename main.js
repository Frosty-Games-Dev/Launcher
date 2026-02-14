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
    console.log('checking-for-update');
});

autoUpdater.on('update-available', () => {
    console.log('update-available');
});

autoUpdater.on('update-not-available', () => {
    console.log('update-not-available');
});

autoUpdater.on('error', (err) => {
    console.log('error');
});

/*autoUpdater.on('download-progress', (progressObj) => {
    winUpdate.webContents.send('download-progress', progressObj);
});*/

autoUpdater.on('update-downloaded', () => {
    console.log('update-downloaded');
});

ipcMain.handle('download', () => {
    console.log('download');
    autoUpdater.downloadUpdate();
});

ipcMain.handle('install', () => {
    console.log('install');
    autoUpdater.quitAndInstall();
});