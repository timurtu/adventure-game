/**
 * Created by timur on 9/8/16.
 */

import dom from 'domali'
import hp from './hp'


export default dom.create('div').set({ class: 'hud' })
  .push(hp)