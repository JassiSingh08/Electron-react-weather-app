console.log("preload.js");

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myApp", {
  sayHello: (arg) => {
    ipcRenderer.invoke("message-say-hello", arg).then((result) => {
      console.log(result, "PRELOAD CONSOLE");
    });
  },
});

console.log("Success");
