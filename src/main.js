/**
 * Created by timur on 9/4/16.
 */

import { app, BrowserWindow, ipcMain } from 'electron'
import mongoose from 'mongoose'
import log from 'gutil-color-log'
import User from './models/user'


mongoose.connect('mongodb://localhost:27017/adventure-game')
const db = mongoose.connection
db.on('error', e => log('red', e))

const windows = []


function createWindow(name = 'game', width = 960, height = 480, resizable, frame) {
  
  let window = new BrowserWindow({ width, height, resizable, frame })
  
  window.loadURL(`file://${__dirname}/windows/${name}.html`)
  
  window.webContents.openDevTools()
  
  window.on('closed', () => {
    window = null
  })
  
  windows.push(window)
  
  return window
}

app.on('ready', () => {
  
  let signup
  
  let login = createWindow('login', 600, 400, false, true)
  
  windows.push(login)
  
  ipcMain.on('signup', () => {
    
    signup = createWindow('signup', 400, 520, false, true)
    windows.push(signup)
  })
  
  ipcMain.on('new-user', (event, data) => {
    
    const { name, email, password } = data
    
    log('cyan', `username ${name}`)
    log('cyan', `email ${email}`)
    log('cyan', `password ${password}`)
    
    signup.close()
  })
  
  ipcMain.on('start-game', () => {
    
    login.close()
    windows.push(createWindow('game', 960, 580, true, true))
  })
  
})

app.on('window-all-closed', () => {
  
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  
  windows
    .filter(x => x === null)
    .forEach(x => createWindow())
})
