import { app, ipcMain } from 'electron';
import started from 'electron-squirrel-startup';
import {
  checkIdleTime,
  resetTimer,
  startTimer,
  handleAuthEvents,
} from './lib/timer';
import { isMac } from './lib/config';
import {
  createMainWindow,
  createTray,
  createApplicationMenu,
} from './lib/system';
import { launchAppOnLogin } from './lib/utils';

if (started) app.quit();

app.on('ready', () => {
  // System functions
  const mainWindow = createMainWindow(app);
  const tray = createTray(app, mainWindow);
  createApplicationMenu();

  // App features
  startTimer(mainWindow, tray);
  checkIdleTime(mainWindow);
  handleAuthEvents(mainWindow, tray);

  // Launch app on login
  launchAppOnLogin();

  // Event listeners
  mainWindow.on('close', (e) => {
    e.preventDefault();
    mainWindow.hide();
    if (isMac) app.dock.hide();
  });
  ipcMain.handle('timer:reset', () => resetTimer(mainWindow, tray));
});
