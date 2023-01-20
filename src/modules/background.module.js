import { Module } from '../core/module'
import { getRandomColor } from '../utils.js'

export class BackgroundModule extends Module {
  trigger() {
    document.body.style.backgroundColor = getRandomColor()
  }
}
