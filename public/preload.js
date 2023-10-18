// Preload (Isolated World)

console.log("preload.js");

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  OpenWindow: () => {
    console.log("message");
    ipcRenderer.send("messager", message);
  },
});
console.log("Success");
