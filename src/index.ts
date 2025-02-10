import { app, ipcMain } from 'electron';
import started from 'electron-squirrel-startup';
import {
  checkIdleTime,
  pauseTimer,
  resumeTimer,
  resetTimer,
  startTimer,
  handleAuthEvents,
} from './lib/timer';
import { isMac } from './lib/config';
import { createMainWindow, createTray } from './lib/system';

if (started) app.quit();

app.on('ready', () => {
  // Create main window and tray
  const mainWindow = createMainWindow();
  const tray = createTray(app, mainWindow);

  // App features
  startTimer(mainWindow, tray);
  checkIdleTime(mainWindow);
  handleAuthEvents(mainWindow, tray);

  // Event listeners
  mainWindow.on('close', (e) => {
    e.preventDefault();
    mainWindow.hide();
    if (isMac) app.dock.hide();
  });
  ipcMain.handle('timer:resume', () => resumeTimer(mainWindow, tray));
  ipcMain.handle('timer:pause', () => pauseTimer(mainWindow));
  ipcMain.handle('timer:reset', () => resetTimer(mainWindow, tray));

  // App settings
  app.setLoginItemSettings({ openAtLogin: true, path: app.getPath('exe') });
});
