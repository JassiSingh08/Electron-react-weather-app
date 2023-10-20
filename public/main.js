const {
  app,
  BrowserWindow,
  Menu,
  dialog,
  MenuItem,
  ipcMain,
  Tray,
  globalShortcut
} = require("electron");
const path = require("path");
const { Notification } = require("electron");

const createExpressServer = require("./exp");

let win;
let tray = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadURL("http://localhost:5000");
  // win.loadFile(path.join(__dirname, "../build/index.html"));
  // win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
  // win.webContents.openDevTools();

  createExpressServer(() => {
    console.log("Express server is running.");
  });
  // checkForUpdates();
};

// =======================
// Function to check for updates
// let Loading = null;
const checkForUpdates = () => {
  // Loading = false;
  fetch("http://localhost:5000/app/version")
    .then((response) => response.json())
    .then((data) => {
      const latestVersion = data.version;
      const currentVersion = "1.1.0";

      if (latestVersion > currentVersion) {
        Updates = true;
        showinfoDialog(
          "A new version is ready to be installed.",
          "Update Available"
        );
        notifyUser(
          "Update Available",
          "A new version is ready to be installed."
        );
      }
    })
    .catch((error) => {
      console.error("Error checking for updates:", error);
    });
};

const notifyUser = (title, message) => {
  new Notification({
    title,
    body: message,
  }).show();
};
// =======================

app.whenReady().then(() => {
  const imagePath = path.join(__dirname, "trayicon.png");

  tray = new Tray(imagePath);
  tray.setToolTip("ElectronReactApp");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Check for Updates",
      click: () => checkForUpdates(),
    },
    { label: "Quit", click: () => app.quit() },
  ]);

  tray.setContextMenu(contextMenu);

  globalShortcut.register('CommandOrControl+Shift+I', () => {
    win.webContents.openDevTools();
  });  
});

//about modal
const showAboutDialog = () => {
  dialog.showMessageBox({
    type: "info",
    title: "About Weather and Quotes Desktop App",
    message:
      "Welcome to the Weather and Quotes Desktop App, your source for daily inspiration and weather updates!",
    buttons: ["OK"],
  });
};

//info dialogue
const showinfoDialog = (text, author) => {
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
  });
  childWindow.loadURL("https://www.google.com/");
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
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "togglefullscreen" },
      ],
    },
    {
      label: "Updates",
      submenu: [
        {
          label: "Check for Updates",
          click: () => {
            checkForUpdates();
            /* Loading = true;
            Loading && showinfoDialog("Checking for Updates..", "Updates");
            setTimeout(checkForUpdates, 5000); */
          },
        },
      ],
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
      submenu: [{ role: "reload" }, { role: "forceReload" }],
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

app.on("window-all-closed", () => {
  //mac
  if (process.platform !== "darwin") {
    app.quit();
  }
});

//unregister global shortcuts
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});


ipcMain.handle("open-Window", async (event, args) => {
  const { text, author } = args.randomQuote;

  showinfoDialog(text, author);
  console.log("I am from main process", args, "1");
  return {
    message:
      "MAIN HERE : I am invoking a browser window on click of a button from renderer",
  };
});
