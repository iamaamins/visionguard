import { contextBridge, ipcRenderer } from 'electron';
import { TimerState } from './types';

contextBridge.exposeInMainWorld('timer', {
  onUpdate: (callback: (state: TimerState) => void) => {
    ipcRenderer.on('timer:update', (_, state: TimerState) => callback(state));
  },
  pause: () => ipcRenderer.invoke('timer:pause'),
  resume: () => ipcRenderer.invoke('timer:resume'),
  reset: () => ipcRenderer.invoke('timer:reset'),
});
