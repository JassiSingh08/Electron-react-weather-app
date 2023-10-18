// Preload (Isolated World)

console.log("preload.js");

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myApp", {
  sayHello: (arg) => {
    ipcRenderer.invoke("message-say-hello", arg).then((result) => {
      console.log(result, "2");
    });
  },
});

console.log("Success");
