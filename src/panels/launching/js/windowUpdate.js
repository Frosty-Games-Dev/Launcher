const { BrowserWindow } = require("electron");
const path = require("path");

let winUpdate = undefined;

function destroyWindow() {
    if (!winUpdate) return;
    winUpdate.close();
    winUpdate = undefined;
}

function createWindow() {
    destroyWindow();
    winUpdate = new BrowserWindow({
        width: 400,
        height: 490,
        resizable: false,
        transparent: true,
        frame: false,
        icon: path.join(__dirname, '../../../assets/logo/logo_frost_017.png'),
        webPreferences: {
            preload: path.join(__dirname, '../../../../preload.js')
        }
    });

    winUpdate.loadFile(path.join(__dirname, '../../../panels/launching/html/update.html'));
    winUpdate.setMenuBarVisibility(false);
    winUpdate.webContents.openDevTools({ mode: 'detach' });
}

module.exports = {
    createWindow,
    destroyWindow
};