/**
 * Created by timur on 9/19/16.
 */

import mongoose from 'mongoose'
import log from 'gutil-color-log'

mongoose.connect('mongodb://localhost:27017/adventure-game')
const db = mongoose.connection
db.on('error', e => log('red', e))

export default db
