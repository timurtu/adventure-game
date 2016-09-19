/**
 * Created by timur on 9/7/16.
 */

import dom from 'domali'
import { ipcRenderer } from 'electron'


dom.getId('signup-form').onsubmit = function (event) {
  
  event.preventDefault()
  
  const user = Array.prototype.map.call(event.target, function (targ) {
    switch (targ.value) {
      case 'Sign up':
        return null
        break
      case '':
        targ.style.borderLeft = 'rgb(255, 60, 60) solid .25em'
        alert(`The ${targ.get('id')} field is required.`)
        return
        break
      default:
        targ.style.borderLeft = 'none'
        return targ.value
    }
  })
    .filter(x => x !== null && x !== undefined)
  
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
  
  alert('New user account created successfully!')
  ipcRenderer.send('new-user', userData)
}

