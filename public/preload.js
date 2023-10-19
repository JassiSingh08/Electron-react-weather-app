console.log("preload.js");

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myApp", {
  openWindow: (arg) => {
    ipcRenderer.invoke("open-Window", arg).then((result) => {
      console.log(result, "PRELOAD CONSOLE");
    });
  },
});

console.log("Success");
