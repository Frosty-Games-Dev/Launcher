const { app, ipcMain, BrowserWindow } = require("electron");
//const { autoUpdater } = require('electron-updater'); /* Non utile pour le moment */
const path = require("path");

let winLogin = undefined;
let winHome = undefined;

// Une idée de test pour régler la fenêtre en fonction de la taille de l'écran de l'utilisateur (pas encore essayé)
/*let winLiteWidth = undefined;
let winLiteHeight = undefined;
let winBigWidth = undefined;
let winBigHeight = undefined;*/

// Fenêtre pour la partie "login"
function createWinLogin() {
    winLogin = new BrowserWindow({
        width: 1280,
        height: 720,
        resizable: false,
        transparent: true,
        frame: false,
        icon: path.join(__dirname, 'src/assets/logo/logo_frost_017.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    });

    winLogin.loadFile("src/panels/connection/html/login.html");
    winLogin.setMenuBarVisibility(false);
    winLogin.webContents.openDevTools({ mode: 'detach' });
}

// Fenêtre pour la partie principale
function createWinHome() {
    winHome = new BrowserWindow({
        width: 1280,
        height: 720,
        resizable: false,
        transparent: true,
        frame: false,
        icon: path.join(__dirname, 'src/assets/logo/logo_frost_017.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    winHome.loadFile("src/panels/home/html/home.html");
    winHome.setMenuBarVisibility(false);
    winHome.webContents.openDevTools({ mode: 'detach' });
}

// Partie pour gérer le lancement de l'application
app.on('ready', () => {
    createWinLogin();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWinLogin();
    });
});

// Fermer l'application si aucune fenêtre n'est ouverte (pas utile pour MacOS)
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

ipcMain.on('window-minimize-login', () => winLogin.minimize());
ipcMain.on('window-close-login', () => winLogin.close());

ipcMain.on('navigate-to', (event, page) => {
    winHome.loadFile(page);
});
ipcMain.on('minimize-Window', () => {
    winHome.minimize();
});
ipcMain.on('close-Window', () => {
    winHome.close();
});
ipcMain.on('reload-Window', () => {
    winHome.reload();
});