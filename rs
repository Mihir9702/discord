warning: LF will be replaced by CRLF in packages/controller/package.json.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in packages/client/src/graphql.ts.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in packages/client/src/graphql.ts.
The file will have its original line endings in your working directory
[1mdiff --git a/packages/client/.vscode/launch.json b/packages/client/.vscode/launch.json[m
[1mnew file mode 100644[m
[1mindex 0000000..0bd21e9[m
[1m--- /dev/null[m
[1m+++ b/packages/client/.vscode/launch.json[m
[36m@@ -0,0 +1,40 @@[m
[32m+[m[32m{[m
[32m+[m[32m  // Use IntelliSense to learn about possible attributes.[m
[32m+[m[32m  // Hover to view descriptions of existing attributes.[m
[32m+[m[32m  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387[m
[32m+[m[32m  "version": "0.2.0",[m
[32m+[m[32m  "configurations": [[m
[32m+[m[32m    {[m
[32m+[m[32m      "name": "Nextron: Main",[m
[32m+[m[32m      "type": "node",[m
[32m+[m[32m      "request": "attach",[m
[32m+[m[32m      "protocol": "inspector",[m
[32m+[m[32m      "port": 9292,[m
[32m+[m[32m      "skipFiles": ["<node_internals>/**"],[m
[32m+[m[32m      "sourceMapPathOverrides": {[m
[32m+[m[32m        "webpack:///./~/*": "${workspaceFolder}/node_modules/*",[m
[32m+[m[32m        "webpack:///./*": "${workspaceFolder}/*",[m
[32m+[m[32m        "webpack:///*": "*"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    {[m
[32m+[m[32m      "name": "Nextron: Renderer",[m
[32m+[m[32m      "type": "chrome",[m
[32m+[m[32m      "request": "attach",[m
[32m+[m[32m      "port": 5858,[m
[32m+[m[32m      "timeout": 10000,[m
[32m+[m[32m      "urlFilter": "http://localhost:*",[m
[32m+[m[32m      "webRoot": "${workspaceFolder}/app",[m
[32m+[m[32m      "sourceMapPathOverrides": {[m
[32m+[m[32m        "webpack:///./src/*": ""[m
[32m+[m[32m      }[m
[32m+[m[32m    }[m
[32m+[m[32m  ],[m
[32m+[m[32m  "compounds": [[m
[32m+[m[32m    {[m
[32m+[m[32m      "name": "Nextron: All",[m
[32m+[m[32m      "preLaunchTask": "dev",[m
[32m+[m[32m      "configurations": ["Nextron: Main", "Nextron: Renderer"][m
[32m+[m[32m    }[m
[32m+[m[32m  ][m
[32m+[m[32m}[m
[1mdiff --git a/packages/client/.vscode/tasks.json b/packages/client/.vscode/tasks.json[m
[1mnew file mode 100644[m
[1mindex 0000000..5729039[m
[1m--- /dev/null[m
[1m+++ b/packages/client/.vscode/tasks.json[m
[36m@@ -0,0 +1,21 @@[m
[32m+[m[32m{[m
[32m+[m[32m  "version": "2.0.0",[m
[32m+[m[32m  "tasks": [[m
[32m+[m[32m    {[m
[32m+[m[32m      "type": "npm",[m
[32m+[m[32m      "script": "dev",[m
[32m+[m[32m      "isBackground": true,[m
[32m+[m[32m      "problemMatcher": {[m
[32m+[m[32m        "owner": "custom",[m
[32m+[m[32m        "pattern": {[m
[32m+[m[32m          "regexp": ""[m
[32m+[m[32m        },[m
[32m+[m[32m        "background": {[m
[32m+[m[32m          "beginsPattern": "started server",[m
[32m+[m[32m          "endsPattern": "Debugger listening on"[m
[32m+[m[32m        }[m
[32m+[m[32m      },[m
[32m+[m[32m      "label": "dev"[m
[32m+[m[32m    }[m
[32m+[m[32m  ][m
[32m+[m[32m}[m
[1mdiff --git a/packages/client/README.md b/packages/client/README.md[m
[1mnew file mode 100644[m
[1mindex 0000000..9a4fed8[m
[1m--- /dev/null[m
[1m+++ b/packages/client/README.md[m
[36m@@ -0,0 +1,25 @@[m
[32m+[m[32m<p align="center"><img src="https://i.imgur.com/a9QWW0v.png"></p>[m
[32m+[m
[32m+[m[32m## About[m
[32m+[m
[32m+[m[32mUsing Nextjs and Tailwind to create a discord clone in electron.[m
[32m+[m
[32m+[m[32m### Install Dependencies[m
[32m+[m
[32m+[m[32m```[m
[32m+[m[32m# using yarn or npm[m
[32m+[m[32m$ yarn (or `npm install`)[m
[32m+[m
[32m+[m[32m# using pnpm[m
[32m+[m[32m$ pnpm install --shamefully-hoist[m
[32m+[m[32m```[m
[32m+[m
[32m+[m[32m### Use it[m
[32m+[m
[32m+[m[32m```[m
[32m+[m[32m# development mode[m
[32m+[m[32m$ yarn dev (or `npm run dev` or `pnpm run dev`)[m
[32m+[m
[32m+[m[32m# production build[m
[32m+[m[32m$ yarn build (or `npm run build` or `pnpm run build`)[m
[32m+[m[32m```[m
[1mdiff --git a/packages/client/assets/icon.icns b/packages/client/assets/icon.icns[m
[1mnew file mode 100644[m
[1mindex 0000000..4e91309[m
Binary files /dev/null and b/packages/client/assets/icon.icns differ
[1mdiff --git a/packages/client/assets/icon.ico b/packages/client/assets/icon.ico[m
[1mnew file mode 100644[m
[1mindex 0000000..502f78c[m
Binary files /dev/null and b/packages/client/assets/icon.ico differ
[1mdiff --git a/packages/client/core/background.ts b/packages/client/core/background.ts[m
[1mnew file mode 100644[m
[1mindex 0000000..e2c2003[m
[1m--- /dev/null[m
[1m+++ b/packages/client/core/background.ts[m
[36m@@ -0,0 +1,36 @@[m
[32m+[m[32mimport { app } from 'electron'[m
[32m+[m[32mimport serve from 'electron-serve'[m
[32m+[m[32mimport { createWindow } from './helpers'[m
[32m+[m
[32m+[m[32mconst isProd: boolean = process.env.NODE_ENV === 'production'[m
[32m+[m
[32m+[m[32mif (isProd) {[m
[32m+[m[32m  serve({ directory: 'app' })[m
[32m+[m[32m} else {[m
[32m+[m[32m  app.setPath('userData', `${app.getPath('userData')} (development)`)[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m;(async () => {[m
[32m+[m[32m  await app.whenReady()[m
[32m+[m
[32m+[m[32m  const mainWindow = createWindow('main', {[m
[32m+[m[32m    width: 1024,[m
[32m+[m[32m    height: 600,[m
[32m+[m[32m    minWidth: 960,[m
[32m+[m[32m    minHeight: 512,[m
[32m+[m[32m  })[m
[32m+[m
[32m+[m[32m  mainWindow.webContents.session.clearStorageData()[m
[32m+[m
[32m+[m[32m  if (isProd) {[m
[32m+[m[32m    await mainWindow.loadURL('app://./home.html')[m
[32m+[m[32m  } else {[m
[32m+[m[32m    const port = process.argv[2][m
[32m+[m[32m    await mainWindow.loadURL(`http://localhost:${port}/`)[m
[32m+[m[32m    // mainWindow.webContents.openDevTools();[m
[32m+[m[32m  }[m
[32m+[m[32m})()[m
[32m+[m
[32m+[m[32mapp.on('window-all-closed', () => {[m
[32m+[m[32m  app.quit()[m
[32m+[m[32m})[m
[1mdiff --git a/packages/client/core/helpers/createWindow.ts b/packages/client/core/helpers/createWindow.ts[m
[1mnew file mode 100644[m
[1mindex 0000000..6744328[m
[1m--- /dev/null[m
[1m+++ b/packages/client/core/helpers/createWindow.ts[m
[36m@@ -0,0 +1,87 @@[m
[32m+[m[32mimport { screen, BrowserWindow, BrowserWindowConstructorOptions } from 'electron'[m
[32m+[m[32mimport Store from 'electron-store'[m
[32m+[m
[32m+[m[32minterface Window {[m
[32m+[m[32m  x: number[m
[32m+[m[32m  y: number[m
[32m+[m[32m  width: number[m
[32m+[m[32m  height: number[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mexport default (windowName: string, options: BrowserWindowConstructorOptions): BrowserWindow => {[m
[32m+[m[32m  const key = 'window-state'[m
[32m+[m[32m  const name = `window-state-${windowName}`[m
[32m+[m[32m  const store = new Store({ name })[m
[32m+[m[32m  const defaultSize = {[m
[32m+[m[32m    width: options.width,[m
[32m+[m[32m    height: options.height,[m
[32m+[m[32m  }[m
[32m+[m[32m  let state = {}[m
[32m+[m[32m  let win: BrowserWindow[m
[32m+[m
[32m+[m[32m  const restore = () => store.get(key, defaultSize)[m
[32m+[m
[32m+[m[32m  const getCurrentPosition = () => {[m
[32m+[m[32m    const position = win.getPosition()[m
[32m+[m[32m    const size = win.getSize()[m
[32m+[m[32m    return {[m
[32m+[m[32m      x: position[0],[m
[32m+[m[32m      y: position[1],[m
[32m+[m[32m      width: size[0],[m
[32m+[m[32m      height: size[1],[m
[32m+[m[32m    }[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  const windowWithinBounds = (windowState: Window, bounds: Window) => {[m
[32m+[m[32m    return ([m
