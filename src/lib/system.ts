import path from 'node:path';
import {
  App,
  BrowserWindow,
  Menu,
  Tray,
  shell,
  MenuItemConstructorOptions,
} from 'electron';
import { resetTimer, stopTimers } from './timer';
import { isMac } from './config';
import { getTrayIconPath } from './utils';

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
  const tray = new Tray(getTrayIconPath());

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open Vision Guard',
      click: () => {
        mainWindow.show();
        if (isMac) app.dock.show();
      },
    },
    { label: 'Reset Timer', click: () => resetTimer(mainWindow, tray) },
    {
      label: 'Quit Vision Guard',
      click: () => {
        mainWindow.removeAllListeners();
        tray.removeAllListeners();
        stopTimers();
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip('Vision Guard');

  return tray;
}

export function createApplicationMenu() {
  const windowSubmenuItemOptions: MenuItemConstructorOptions[] = isMac
    ? [{ type: 'separator' }, { role: 'front' }]
    : [{ role: 'close' }];

  const menuItemOptions: MenuItemConstructorOptions[] = [
    {
      role: 'appMenu',
      label: 'Vision Guard',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      role: 'fileMenu',
      label: 'File',
      submenu: [isMac ? { role: 'close' } : { role: 'quit' }],
    },
    {
      role: 'viewMenu',
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      role: 'windowMenu',
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...windowSubmenuItemOptions,
      ],
    },
    {
      role: 'help',
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click: async () =>
            await shell.openExternal('https://www.visionguard.app'),
        },
      ],
    },
  ];

  const updatedMenu = Menu.buildFromTemplate(menuItemOptions);
  Menu.setApplicationMenu(updatedMenu);
}
