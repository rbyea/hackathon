import { Module } from '../core/module'

export class ClicksModule extends Module {
  trigger() {
    console.log('click module')
  }
}
