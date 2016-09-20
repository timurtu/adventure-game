/**
 * Created by timur on 9/19/16.
 */

import path from 'path'
import { BrowserWindow } from 'electron'


export let windows = []

export const addWindow = (name, width = 960, height = 480, resizable, frame) => {
  
  let window = new BrowserWindow({ width, height, resizable, frame })
  
  window.loadURL(`file://${path.join(path.resolve('dist/browser/windows'), name)}.html`)
  
  window.webContents.openDevTools()
  
  window.on('closed', () => {
    window = null
  })
  
  windows = [...windows, { window, name }]
  
  return window
}
