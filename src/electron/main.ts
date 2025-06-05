import { app, BrowserWindow } from 'electron';
import { startApplication } from '../index';

let mainWindow: BrowserWindow | null = null;
let serverStarted = false;

async function createWindow() {
  if (!serverStarted) {
    try {
      await startApplication();
      serverStarted = true;
      console.log('Server started successfully');
    } catch (error) {
      console.error('Failed to start server:', error);
    }
  }

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Moon Home Theater',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true
    },
    show: false
  });

  const serverUrl = `http://${process.moon.server.host}:${process.moon.server.port}`;

  setTimeout(() => {
    mainWindow?.loadURL(serverUrl);
    mainWindow?.show();
  }, 1000);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
