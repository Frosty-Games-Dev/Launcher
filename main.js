const { app, ipcMain } = require("electron");
//const { autoUpdater } = require('electron-updater'); /* Non utile pour le moment */
const path = require("path");

const LaunchingWindow = require("./src/panels/launching/js/windowUpdate.js");


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