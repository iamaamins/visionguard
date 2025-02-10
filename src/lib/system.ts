import path from 'node:path';
import { App, BrowserWindow, Menu, Tray } from 'electron';
import { resetTimer, stopTimers } from './timer';
import { isMac } from './config';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export function createMainWindow(app: App) {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    icon: path.join(app.getAppPath(), 'src', 'assets', 'icon.png'),
    webPreferences: { preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  return mainWindow;
}

export function createTray(app: App, mainWindow: BrowserWindow) {
  const tray = new Tray(
    path.join(
      app.getAppPath(),
      'src',
      'assets',
      isMac ? 'trayIconTemplate.png' : 'trayIcon.png'
    )
  );

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open App',
      click: () => {
        mainWindow.show();
        if (isMac) app.dock.show();
      },
    },
    { label: 'Reset', click: () => resetTimer(mainWindow, tray) },
    {
      label: 'Quit',
      click: () => {
        mainWindow.removeAllListeners();
        tray.removeAllListeners();
        stopTimers();
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip('Eye Care');

  return tray;
}
