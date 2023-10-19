const {
  app,
  BrowserWindow,
  Menu,
  dialog,
  MenuItem,
  ipcMain,
} = require("electron");
const path = require("path");
const { eventNames } = require("process");
let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
};

//about child modal

const AboutChild = () => {
  const child = new BrowserWindow({
    width: 400,
    height: 200,
    parent: win,
    modal: true,
    show: false,
  });
  child.loadURL("http://localhost:3000");
  child.once("ready-to-show", () => {
    child.show();
  });
};

//about dialogue
const showAboutDialog = (text, author) => {
  dialog.showMessageBox({
    type: "info",
    title: `By ${author}`,
    message: text,
    buttons: ["OK"],
  });
};

//child window
const createChildWindow = () => {
  childWindow = new BrowserWindow({
    width: 400,
    height: 400,
    parent: win,
    modal: true,
    // webPreferences: {
    //   nodeIntegration: true,
    //   contextIsolation: true,
    //   preload: path.join(__dirname, "preload.js"),
    // },
  });
  childWindow.loadURL("http://localhost:3000");
  childWindow.once("ready-to-show", () => {
    childWindow.show();
  });
};

app.whenReady().then(() => {
  createWindow();

  //MENU
  const menuTemplate = [
    {
      label: "File",
      submenu: [
        {
          label: "New file",
          click: () => {
            console.log("new file clicked!");
          },
          label: "OpenChildWindow",
          click: () => {
            createChildWindow();
          },
        },

        {
          label: "Close",
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: "About",
      click: () => {
        showAboutDialog();
      },
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  //CONTEXT MENU
  const ContextMenu = new Menu();
  ContextMenu.append(
    new MenuItem({
      label: "Hello",
      click: () => {
        console.log("CONTEXT MENU CLICKED ");
      },
    })
  );
  ContextMenu.append(
    new MenuItem({
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
      ],
    })
  );

  win.webContents.on("context-menu", (e, params) => {
    ContextMenu.popup(win, params.x, params.y);
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

ipcMain.handle("loadContent", (e) => {
  return loadContent();
});

//mac
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("message-say-hello", async (event, args) => {
  const { text, author } = args.randomQuote;

  showAboutDialog(text,author)
  console.log("I am from main process", args, "1")
  return { message: "MAIN HERE : I am invoking a browser window on click of a button from renderer" };
});
