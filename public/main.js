const { app, BrowserWindow, Menu, dialog, MenuItem, ipcMain } = require("electron");
const path = require("path");
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
//   win.webContents.openDevTools();
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
const showAboutDialog = () => {
  dialog.showMessageBox({
    type: "info",
    title: "About Us",
    message: "Welcome to our company.",
    detail:
      " We are dedicated to providing high-quality products and services to our customers. Our mission is to make the world a better place through innovation and excellence. If you have any questions or would like to get in touch with us, please feel free to contact us at:\n\nEmail: info@yourcompany.com\nPhone: +1 (123) 456-7890",
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
