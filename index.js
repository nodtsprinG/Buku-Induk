const { app, BrowserWindow, protocol } = require('electron');
const url = require("url");
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "Buku Induk",
        width: 1000,
        height: 600,
        webPreferences: {webSecurity: false}
    })

    const startUrl = url.format({   
        pathname: path.join(__dirname, "./bukuinduk/build/index.html"),
        protocol: "file" 
    }) 

    //Nyalakan kalau perlu
    //mainWindow.webContents.openDevTools()
    
mainWindow.loadURL("http://localhost:3000")

}
app.whenReady().then(createMainWindow)