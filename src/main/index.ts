import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";
import basedir from "../basepath";
import NAME from "../common/common";

// tslint:disable-next-line:no-console
console.log("NAMES is " + NAME);

let mainWindow: Electron.BrowserWindow;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(basedir, __dirname, "../renderer/index.html"),
    protocol: "file:",
    slashes: true,
  }));

  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null as any;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
