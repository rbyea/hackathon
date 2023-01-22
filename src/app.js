import './styles.css'

import { ContextMenu } from './menu.js'
import { BackgroundModule } from './modules/background.module'
import { ClicksModule } from './modules/clicks.module'
import { TimerModule } from './modules/timer.module'
import { ShapeModule } from './modules/shape.module'
import { RandomSoundModule } from './modules/random-sound.module'
import { CustomMsg } from './modules/customMsg'
import { PizzasModule } from './modules/pizzas.module'
import { PhotosUnsplash } from './modules/photosUnsplash.module'
import {Touch} from "./modules/touch";

// следующие модули

const backgroundModule = new BackgroundModule('background', 'Поменять цвет')
const clicksModule = new ClicksModule('clicks', 'Считать клики')
const timerModule = new TimerModule('timer', 'Создать таймер')
const shapeModule = new ShapeModule('shape', 'Создать фигуру')
const randomSoundModule = new RandomSoundModule('sound', 'Случайный звук')
const customMsg = new CustomMsg('msg', 'Кастомное сообщение')
const pizzasModule = new PizzasModule('pizza', 'Пиццы')
const photosUnsplash = new PhotosUnsplash('photo', 'Поиск фотографий')
const touch = new Touch('touch', 'не нажимай!')

// следующие модули

const contextMenu = new ContextMenu('.menu')

contextMenu.add(backgroundModule)
contextMenu.add(clicksModule)
contextMenu.add(timerModule)
contextMenu.add(shapeModule)
contextMenu.add(randomSoundModule)
contextMenu.add(customMsg)
contextMenu.add(pizzasModule)
contextMenu.add(photosUnsplash)
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
    if (menuItem.dataset.type === 'timer') {
      timerModule.trigger()
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
    if (menuItem.dataset.type === 'pizza') {
      pizzasModule.trigger()
      contextMenu.close()
    }
    if (menuItem.dataset.type === 'photo') {
      photosUnsplash.trigger()
      contextMenu.close()
    }
    if (menuItem.dataset.type === 'touch') {
      touch.trigger()
      contextMenu.close()
    }
    // следующие модули
  }
})
