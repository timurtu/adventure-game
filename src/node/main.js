/**
 * Created by timur on 9/4/16.
 */

import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'

import User from './models/user'
import db from './db'
import { addWindow } from './windows'


app.on('ready', () => {
  
  let loginWindow = () => addWindow('login', 600, 420, false, true)
  let signupWindow = () => addWindow('signup', 400, 540, false, true)
  
  let login = loginWindow()
  
  ipcMain.on('signup', () => {
    
    login.close()
    let signup = signupWindow()
    
    ipcMain.on('user-created-confirmed', () => {
      signup.close()
    })
    
    signup.on('closed', () => {
      login = loginWindow()
    })
  })
})

ipcMain.on('new-user', (event, userData) => {
  
  User.create(userData, err => {
    
    if (err) {
      event.sender.send('server-error', { userData, err })
    } else {
      event.sender.send('user-created', userData.name)
    }
  })
})

ipcMain.on('start-game', () => {
  
  createWindow('game', 960, 580, true, true)
})

app.on('window-all-closed', () => {
  
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  
  window = addWindow()
})
