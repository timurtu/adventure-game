/**
 * Created by timur on 9/19/16.
 */

import test from 'ava'
import {Application} from 'spectron'
import deepFreeze from 'deep-freeze'

import { createWindow, destroyWindow } from '../../dist/main/windows'

// test('create a new list of windows', t => {
//
//   const windows = []
//   const windowsAfter = [{
//     name: 'login'
//   }]
//
//   deepFreeze(windows)
//
//   t.is(createWindow(windows), windowsAfter)
// })

test.beforeEach(async t => {
  t.context.app = new Application({
    path: './dist/app/MyApp.app/Contents/MacOS/MyApp'
  })
  
  await t.context.app.start()
})

test.afterEach.always(async t => {
  await t.context.app.stop()
})

test(async t => {
  const app = t.context.app
  await app.client.waitUntilWindowLoaded()
  
  const win = app.browserWindow
  t.is(await app.client.getWindowCount(), 1)
  t.false(await win.isMinimized())
  t.false(await win.isDevToolsOpened())
  t.true(await win.isVisible())
  t.true(await win.isFocused())
  
  const {width, height} = await win.getBounds()
  t.true(width > 0)
  t.true(height > 0)
})
