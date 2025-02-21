import {
  BrowserWindow,
  ipcMain,
  Notification,
  powerMonitor,
  Tray,
} from 'electron';
import { BREAK_TIME, IDLE_THRESHOLD, WORK_TIME } from './config';

let mainTimer: NodeJS.Timeout | null = null;
let idleTimer: NodeJS.Timeout | null = null;
const state = { isPaused: false, isBreakTime: false, timeRemaining: WORK_TIME };

// Utils
const notify = (title: string, body: string) =>
  new Notification({ title, body }).show();

const formatTime = (time: number) => time.toString().padStart(2, '0');

// Start the timers
export function startTimers(mainWindow: BrowserWindow, tray: Tray) {
  if (mainTimer) clearInterval(mainTimer);
  if (idleTimer) clearInterval(idleTimer);

  mainTimer = setInterval(() => {
    if (state.isPaused) return;

    state.timeRemaining--;

    if (state.timeRemaining <= 0) {
      if (!state.isBreakTime) {
        notify('Break Time!', 'Look 20 feet further for 20 seconds');
        state.timeRemaining = BREAK_TIME;
        state.isBreakTime = true;
      } else {
        notify('Work Time!', 'Back to work! Next break in 20 minutes');
        state.timeRemaining = WORK_TIME;
        state.isBreakTime = false;
      }
    }

    const minutes = Math.floor(state.timeRemaining / 60);
    const seconds = Math.floor(state.timeRemaining % 60);
    tray.setTitle(
      `${state.isBreakTime ? 'Break' : 'Work'}: ${formatTime(
        minutes,
      )}:${formatTime(seconds)}`,
    );

    mainWindow.webContents.send('timer:update', state);
  }, 1000);

  idleTimer = setInterval(() => {
    const idleTime = powerMonitor.getSystemIdleTime();
    if (idleTime >= IDLE_THRESHOLD && !state.isPaused) state.isPaused = true;
    if (idleTime < IDLE_THRESHOLD && state.isPaused) state.isPaused = false;
  }, 10 * 1000);
}

export function stopTimers() {
  if (mainTimer) clearInterval(mainTimer);
  mainTimer = null;

  if (idleTimer) clearInterval(idleTimer);
  idleTimer = null;

  resetMainTimer();
}

export function resetMainTimer() {
  state.isPaused = false;
  state.isBreakTime = false;
  state.timeRemaining = WORK_TIME;
}

export function handleEvents(mainWindow: BrowserWindow, tray: Tray) {
  ipcMain.handle('timer:reset', () => resetMainTimer());
  powerMonitor.on('lock-screen', () => stopTimers());
  powerMonitor.on('shutdown', () => stopTimers());
  powerMonitor.on('unlock-screen', () => startTimers(mainWindow, tray));
}
