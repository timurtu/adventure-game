/**
 * Created by timur on 9/9/16.
 */

import mongoose from 'mongoose'
import Promise from 'bluebird'
import log from 'gutil-color-log'
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))


const UserSchema = new mongoose.Schema({
  
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  
  password: {
    type: String,
    required: true
  }
})

// hash password before saving
UserSchema.pre('save', function (next) {
  
  const user = this
  // let loaded = 0
  
  bcrypt.genSaltAsync(10)
    .then(salt => bcrypt.hashAsync(user.password, salt, () => {
      // log('cyan', `progress ${loaded++}`))
    }))
    .then(hash => {
      user.password = hash
      next(user)
    })
    .catch(e => log('red', e))
})

const User = mongoose.model('User', UserSchema)

export default User
