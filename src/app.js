import './styles.css'

import { ContextMenu } from './menu.js'
import { BackgroundModule } from './modules/background.module'
import { ClicksModule } from './modules/clicks.module'
import { ShapeModule } from './modules/shape.module'
import { RandomSoundModule } from './modules/random-sound.module'
import { CustomMsg } from "./modules/customMsg"
import {Touch} from "./modules/touch";
// следующие модули

const backgroundModule = new BackgroundModule('background', 'Поменять цвет')
const clicksModule = new ClicksModule('clicks', 'Считать клики (3 сек)')
const shapeModule = new ShapeModule('shape', 'Создать фигуру')
const randomSoundModule = new RandomSoundModule('sound', 'Случайный звук')
const customMsg = new CustomMsg('msg', 'Кастомное сообщение')
const touch = new Touch('touch', 'не нажимай!')
// следующие модули

const contextMenu = new ContextMenu('.menu')

contextMenu.add(backgroundModule)
contextMenu.add(clicksModule)
contextMenu.add(shapeModule)
contextMenu.add(randomSoundModule)
contextMenu.add(customMsg)
contextMenu.add(touch)
// следующие модули

document.addEventListener('contextmenu', event => {
  event.preventDefault()
  contextMenu.open(event)
})

const menu = document.querySelector('.menu')
menu.addEventListener('click', event => {
  const menuItem = event.target.closest('.menu-item')
  if (menuItem) {
    if (menuItem.dataset.type === 'background') {
      backgroundModule.trigger()
      contextMenu.close()
    }
    if (menuItem.dataset.type === 'clicks') {
      clicksModule.trigger()
      contextMenu.close()
    }
    if (menuItem.dataset.type === 'shape') {
      shapeModule.trigger()
      contextMenu.close()
    }
    if (menuItem.dataset.type === 'sound') {
      randomSoundModule.trigger()
      contextMenu.close()
    }
    if (menuItem.dataset.type === 'msg') {
      customMsg.trigger()
      contextMenu.close()
    }
    if (menuItem.dataset.type === 'touch') {
      touch.trigger()
      contextMenu.close()
    }
    // следующие модули
  }
})
