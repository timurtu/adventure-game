/**
 * Created by timur on 9/7/16.
 */

import dom from 'domali'
import { ipcRenderer } from 'electron'


dom.getId('signup-form').onsubmit = function (event) {
  
  event.preventDefault()
  
  const user = Array.prototype.map.call(event.target, targ => {
    
    switch (targ.value.trim()) {
      
      // Ignore this preset value
      case 'Sign up':
        return null
        break
      
      // The user left a field blank
      case '':
        blame(targ, `The ${targ.get('id')} field is required.`)
        return
        break
      
      default:
        targ.style.borderLeft = 'none'
        return targ.value
    }
  })
    .filter(x => x !== null && x !== undefined)
  
  // The user didn't fill out all fields
  if (user.length < 4) {
    return
  }
  
  const [ name, email, password, confirmPassword ] = user
  
  const passwordsMatch = password === confirmPassword
  const nameCriteria = name.length >= 6 && name.length <= 12
  const passwordCriteria = password.length >= 6 && password.length <= 20
  
  if (!nameCriteria) {
    alert('Username must be 6 characters to 12 characters!')
    return
  } else if (!passwordCriteria) {
    alert('Password must be 6 characters to 20 characters!')
    return
  } else if (!passwordsMatch) {
    alert('Passwords must match!')
    return
  }
  
  const userData = { name, email, password }
  
  ipcRenderer.send('new-user', userData)
}

function blame(targ, msg) {
  targ.style.borderLeft = 'rgb(255, 60, 60) solid .25em'
  alert(msg)
}

ipcRenderer.on('server-error', (event, arg) => {
  
  const { code, message } = arg.err
  const { name, email } = arg.userData
  
  switch (code) {
    
    // duplicate key error collection
    case 11000:
      
      const nameRegexp = new RegExp(name)
      const emailRegexp = new RegExp(email)
      
      if (nameRegexp.test(message)) {
        blame(dom.getId('username'), 'This username is taken.')
      } else if (emailRegexp.test(message)) {
        blame(dom.getId('email'), 'This email is taken.')
      }
      
      break
    
    default:
      console.log('code', arg.err)
  }
})

ipcRenderer.on('user-created', (event, name) => {
  alert(`New user account ${name} created successfully!`)
  ipcRenderer.send('user-created-confirmed')
})
