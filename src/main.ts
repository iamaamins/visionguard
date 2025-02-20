import { app, ipcMain } from 'electron';
import started from 'electron-squirrel-startup';
import { resetTimer, startTimers, handleAuthEvents } from './lib/timer';
import { isMac } from './lib/config';
import {
  createMainWindow,
  createTray,
  createApplicationMenu,
} from './lib/system';
import { setApplicationAsLoginItem } from './lib/utils';

if (started) app.quit();

app.on('ready', async () => {
  // System functions
  const mainWindow = createMainWindow(app);
  const tray = createTray(app, mainWindow);
  createApplicationMenu(app);
  await setApplicationAsLoginItem(app);

  // Start main and idle timers
  startTimers(mainWindow, tray);

  // Event listeners
  mainWindow.on('close', (e) => {
    e.preventDefault();
    mainWindow.hide();
    if (isMac) app.dock.hide();
  });
  handleAuthEvents(mainWindow, tray);
  ipcMain.handle('timer:reset', () => resetTimer(mainWindow, tray));
});
