import './styles.css'

import { ContextMenu } from './menu.js'

import { BackgroundModule } from './modules/background.module'
import { ClicksModule } from './modules/clicks.module'
import { ShapeModule } from './modules/shape.module'
import { CustomMsg } from "./modules/customMsg"
// следующие модули

const backgroundModule = new BackgroundModule('background', 'Поменять цвет')
const clicksModule = new ClicksModule('clicks', 'Считать клики (3 сек)')
const shapeModule = new ShapeModule('shape', 'Создать фигуру')
const customMsg = new CustomMsg('msg', 'Кастомное сообщение')
// следующие модули

const contextMenu = new ContextMenu('.menu')

contextMenu.add(backgroundModule)
contextMenu.add(clicksModule)
contextMenu.add(shapeModule)
contextMenu.add(customMsg)
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
    if (menuItem.dataset.type === 'msg') {
      customMsg.trigger()
      contextMenu.close()
    }
    // следующие модули
  }
})
