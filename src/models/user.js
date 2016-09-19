/**
 * Created by timur on 9/9/16.
 */

import mongoose from 'mongoose'


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

const User = mongoose.model('User', UserSchema)

export default User
