const { app, BrowserWindow } = require("electron");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        hasShadow: 600,
        webPreferences:{
            nodeIntegration:false,
            contextIsolation:false
        },
    })
    win.loadURL("http://localhost:3000")
}

app.whenReady().then(()=>{
    createWindow()

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0){
            createWindow()
        }
    })
})


//mac
app.on('window-all-closed', () => {
    if(process.platform!=='darwin'){
        app.quit()
    }
})