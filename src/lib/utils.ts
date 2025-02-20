import { App } from 'electron';
import path from 'node:path';
import { isDev, isMac } from './config';
import AutoLaunch from 'auto-launch';

export function getTrayIconPath(app: App) {
  const icon = isMac ? 'trayIconTemplate.png' : 'trayIcon.png';

  if (!isDev) return path.join(process.resourcesPath, 'assets', icon);

  return path.join(app.getAppPath(), 'src', 'assets', icon);
}

export async function setApplicationAsLoginItem(app: App) {
  const autoLauncher = new AutoLaunch({ name: app.name });

  try {
    const isEnabled = await autoLauncher.isEnabled();
    if (!isEnabled) await autoLauncher.enable();
  } catch (err) {
    console.error('Error enabling auto launch');
  }
}
