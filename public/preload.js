console.log("preload.js");

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myApp", {
  openWindow: (arg) => {
    ipcRenderer.invoke("open-Window", arg).then((result) => {
      console.log(result, "PRELOAD CONSOLE");
    });
  },
});

/* contextBridge.exposeInMainWorld("Ubridge", {
  Updatebridge: (arg) => {
    ipcRenderer.invoke("updateMessage", arg).then((result) => {
      console.log(result, "PRELOAD update CONSOLE");
    });
  },
});
 */

console.log("Success");
