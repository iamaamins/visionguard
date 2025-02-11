import { app } from 'electron';
import path from 'node:path';
import { isDev, isMac } from './config';

export function getTrayIconPath() {
  const icon = isMac ? 'trayIconTemplate.png' : 'trayIcon.png';

  if (!isDev) return path.join(process.resourcesPath, 'assets', icon);

  return path.join(app.getAppPath(), 'src', 'assets', icon);
}
