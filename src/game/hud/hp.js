/**
 * Created by timur on 9/9/16.
 */

import dom from 'domali'


const maxHP = 100
const hp = 27

const hpPercent = hp / maxHP * 100
const bgColor = (hpPercent > 25) ? '#4cce75' : '#ff4455'

export default dom.create('div').set({ class: 'hp' }).text('HP')
  .push(dom.create('div').set({ class: 'hp-bar-container' })
    .push(dom.create('div').set({
      class: 'hp-bar',
      style: `width:${hpPercent}%; background-color:${bgColor};`
    })))
